import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import YearWisePerformanceTrends from '../components/YearWisePerformanceTrends';


const AdminStudentProfilePage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [classInfo, setClassInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');


  useEffect(() => {
    let foundStudent = null;
    let foundClass = null;
    
    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) {
        foundClass = classData;
        break;
      }
    }
    
    setStudent(foundStudent);
    setClassInfo(foundClass);
  }, [studentId]);


  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden p-6 flex items-center justify-center">
        {/* Premium Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-2xl border-2 border-slate-200/60 dark:border-gray-700/50 p-16 text-center max-w-md">
          <div className="relative inline-block mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-red-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-32 h-32 bg-gradient-to-br from-slate-100 to-rose-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center border-4 border-rose-200 dark:border-rose-700 shadow-2xl">
              <svg className="w-16 h-16 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100 mb-4">Student Not Found</h3>
          <p className="text-slate-600 dark:text-gray-400 mb-10 font-medium">The student you're looking for doesn't exist or has been removed from the system.</p>
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
          >
            <svg className="w-6 h-6 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }


  // Calculate student metrics
  const totalAssignments = student.assignments?.length || 0;
  const completedAssignments = student.assignments?.filter(a => a.grade !== null).length || 0;
  const averageGrade = totalAssignments > 0 
    ? (student.assignments.reduce((sum, a) => sum + (a.grade || 0), 0) / completedAssignments).toFixed(1)
    : 'N/A';
  const attendance = student.details?.attendance || 'N/A';


  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'academics', name: 'Academics', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', gradient: 'from-purple-500 to-pink-500' },
    { id: 'attendance', name: 'Attendance', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4', gradient: 'from-emerald-500 to-teal-500' },
    { id: 'performance', name: 'Performance', icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6', gradient: 'from-amber-500 to-orange-500' },
    { id: 'documents', name: 'Documents', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', gradient: 'from-rose-500 to-pink-500' },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Premium Enhanced Header */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border-b-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <button
              onClick={() => navigate(-1)}
              className="group px-6 py-3 bg-white/90 dark:bg-gray-700/90 backdrop-blur-xl text-slate-700 dark:text-gray-300 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-x-2 flex items-center gap-3 border-2 border-slate-200 dark:border-gray-600 font-extrabold hover:text-slate-900 dark:hover:text-gray-100 hover:border-blue-300 dark:hover:border-blue-600"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Students
            </button>
            
            <div className="flex items-center gap-3 flex-wrap">
              <button className="group px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl hover:shadow-2xl transition-all font-extrabold flex items-center gap-3 hover:scale-105 border-2 border-white/20">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
              <button className="group px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl hover:shadow-2xl transition-all font-extrabold flex items-center gap-3 hover:scale-105 border-2 border-white/20">
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>


      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-6">
        {/* Premium Student Header Card */}
        <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl overflow-hidden hover:shadow-2xl transition-all">
          {/* Premium Cover Image with Animation */}
          <div className="h-56 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-30">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl -mr-48 -mt-48 animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full blur-3xl -ml-40 -mb-40 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-white rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>


          <div className="px-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-24">
              {/* Premium Profile Picture */}
              <div className="relative group/avatar">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-44 h-44 rounded-3xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-2 shadow-2xl group-hover/avatar:scale-105 transition-transform">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-full h-full rounded-2xl object-cover bg-white"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl border-4 border-white dark:border-gray-800 flex items-center justify-center shadow-2xl animate-bounce" style={{ animationDuration: '3s' }}>
                  <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>


              {/* Premium Student Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <h1 className="text-5xl font-extrabold text-slate-900 dark:text-gray-100 mb-3">{student.name}</h1>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="px-5 py-2 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-600 dark:text-blue-400 rounded-xl text-sm font-extrabold border-2 border-blue-300 dark:border-blue-700 flex items-center gap-2 shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        {classInfo?.className || 'N/A'}
                      </span>
                      <span className="px-5 py-2 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-600 dark:text-purple-400 rounded-xl text-sm font-extrabold border-2 border-purple-300 dark:border-purple-700 flex items-center gap-2 shadow-sm">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        Student ID: {student.id}
                      </span>
                      <span className={`px-5 py-2 rounded-xl text-sm font-extrabold border-2 flex items-center gap-2 shadow-sm ${
                        student.status === 'Active' 
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700' 
                          : 'bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-700'
                      }`}>
                        <span className={`w-2.5 h-2.5 rounded-full ${student.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'} animate-pulse`}></span>
                        {student.status || 'Active'}
                      </span>
                    </div>
                  </div>
                </div>


                {/* Premium Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                  <div className="group/stat bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-5 border-2 border-blue-300 dark:border-blue-700 hover:shadow-xl transition-all hover:scale-105">
                    <p className="text-xs font-extrabold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Avg Grade</p>
                    <p className="text-4xl font-extrabold text-blue-600 dark:text-blue-400">{averageGrade}</p>
                  </div>
                  <div className="group/stat bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-5 border-2 border-emerald-300 dark:border-emerald-700 hover:shadow-xl transition-all hover:scale-105">
                    <p className="text-xs font-extrabold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Attendance</p>
                    <p className="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">{attendance}</p>
                  </div>
                  <div className="group/stat bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-5 border-2 border-purple-300 dark:border-purple-700 hover:shadow-xl transition-all hover:scale-105">
                    <p className="text-xs font-extrabold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Assignments</p>
                    <p className="text-4xl font-extrabold text-purple-600 dark:text-purple-400">{completedAssignments}/{totalAssignments}</p>
                  </div>
                  <div className="group/stat bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl p-5 border-2 border-amber-300 dark:border-amber-700 hover:shadow-xl transition-all hover:scale-105">
                    <p className="text-xs font-extrabold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Rank</p>
                    <p className="text-4xl font-extrabold text-amber-600 dark:text-amber-400">#{Math.floor(Math.random() * 20) + 1}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* Premium Tab Navigation */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-2">
          <div className="flex items-center gap-2 overflow-x-auto custom-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`group flex-1 min-w-fit px-6 py-4 rounded-xl font-extrabold text-sm transition-all duration-300 flex items-center justify-center gap-3 ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl scale-105 border-2 border-white/20`
                    : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700/50 hover:scale-102'
                }`}
              >
                <svg className={`w-5 h-5 ${activeTab === tab.id ? '' : 'opacity-70'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                </svg>
                {tab.name}
              </button>
            ))}
          </div>
        </div>


        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Student Information Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Premium Personal Information */}
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Personal Information</h2>
                </div>
                <div className="relative space-y-4">
                  {[
                    { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', label: 'Email', value: student.details?.email || 'N/A' },
                    { icon: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z', label: 'Phone', value: student.details?.phone || 'N/A' },
                    { icon: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z', label: 'Address', value: student.details?.address || 'N/A' },
                    { icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', label: 'Parent/Guardian', value: student.details?.parents || 'N/A' }
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-gray-700/30 rounded-xl border-2 border-slate-200 dark:border-gray-600 hover:shadow-md transition-all">
                      <span className="text-sm font-extrabold text-slate-600 dark:text-gray-400 flex items-center gap-3">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                        </svg>
                        {item.label}
                      </span>
                      <span className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>


              {/* Premium Academic Overview */}
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Academic Overview</h2>
                </div>
                <div className="relative space-y-5">
                  <div className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-blue-300 dark:border-blue-700">
                    <p className="text-sm font-extrabold text-slate-600 dark:text-gray-400 mb-3">Current GPA</p>
                    <div className="flex items-baseline gap-3">
                      <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">{averageGrade !== 'N/A' ? (averageGrade / 10).toFixed(2) : 'N/A'}</p>
                      <span className="text-xl font-extrabold text-blue-400 dark:text-blue-500">/10</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 hover:scale-105 transition-transform">
                      <p className="text-xs font-extrabold text-slate-600 dark:text-gray-400 mb-2">Completed</p>
                      <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">{completedAssignments}</p>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-purple-300 dark:border-purple-700 hover:scale-105 transition-transform">
                      <p className="text-xs font-extrabold text-slate-600 dark:text-gray-400 mb-2">Pending</p>
                      <p className="text-3xl font-extrabold text-purple-600 dark:text-purple-400">{totalAssignments - completedAssignments}</p>
                    </div>
                  </div>
                  <div className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-2xl border-2 border-amber-300 dark:border-amber-700">
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-extrabold text-slate-600 dark:text-gray-400">Completion Rate</p>
                      <p className="text-sm font-extrabold text-amber-600 dark:text-amber-400">
                        {totalAssignments > 0 ? ((completedAssignments / totalAssignments) * 100).toFixed(1) : 0}%
                      </p>
                    </div>
                    <div className="h-3 bg-amber-100 dark:bg-amber-900/30 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full transition-all duration-500"
                        style={{ width: `${totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {activeTab === 'academics' && (
          <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Academic Records & Assignments</h2>
            </div>


            {student.assignments && student.assignments.length > 0 ? (
              <div className="relative overflow-x-auto rounded-2xl border-2 border-slate-200 dark:border-gray-700 custom-scrollbar">
                <table className="min-w-full divide-y-2 divide-slate-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50">
                    <tr>
                      <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Assignment</th>
                      <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Grade</th>
                      <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Max Grade</th>
                      <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Percentage</th>
                      <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-slate-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {student.assignments.map((assignment, index) => {
                      const percentage = assignment.grade ? ((assignment.grade / assignment.maxGrade) * 100).toFixed(1) : 'N/A';
                      return (
                        <tr key={index} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-colors">
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{assignment.name}</span>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400">{assignment.grade !== null ? assignment.grade : '-'}</span>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className="text-sm font-extrabold text-slate-600 dark:text-gray-400">{assignment.maxGrade}</span>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className={`text-sm font-extrabold ${
                              percentage !== 'N/A' && parseFloat(percentage) >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                              percentage !== 'N/A' && parseFloat(percentage) >= 75 ? 'text-blue-600 dark:text-blue-400' :
                              percentage !== 'N/A' && parseFloat(percentage) >= 50 ? 'text-amber-600 dark:text-amber-400' :
                              'text-rose-600 dark:text-rose-400'
                            }`}>
                              {percentage !== 'N/A' ? `${percentage}%` : 'N/A'}
                            </span>
                          </td>
                          <td className="px-6 py-5 whitespace-nowrap">
                            <span className={`px-4 py-2 rounded-xl text-xs font-extrabold border-2 ${
                              assignment.grade !== null 
                                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700' 
                                : 'bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700'
                            }`}>
                              {assignment.grade !== null ? 'Graded' : 'Pending'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="relative text-center py-20 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border-2 border-slate-200 dark:border-gray-700">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-20 animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-xl">
                    <svg className="w-12 h-12 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">No Assignments Yet</p>
                <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Assignments will appear here once they are added</p>
              </div>
            )}
          </div>
        )}


        {activeTab === 'attendance' && (
          <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Attendance Records</h2>
            </div>


            <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="group/card bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-7 border-2 border-emerald-300 dark:border-emerald-700 hover:shadow-xl transition-all hover:scale-105">
                <p className="text-sm font-extrabold text-slate-600 dark:text-gray-400 mb-3">Overall Attendance</p>
                <p className="text-5xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-3">{attendance}</p>
                <div className="h-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                    style={{ width: attendance }}
                  ></div>
                </div>
              </div>
              
              <div className="group/card bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-7 border-2 border-blue-300 dark:border-blue-700 hover:shadow-xl transition-all hover:scale-105">
                <p className="text-sm font-extrabold text-slate-600 dark:text-gray-400 mb-3">Days Present</p>
                <p className="text-5xl font-extrabold text-blue-600 dark:text-blue-400">{Math.floor(Math.random() * 150) + 100}</p>
                <p className="text-xs text-slate-600 dark:text-gray-400 mt-3 font-bold">Out of 180 days</p>
              </div>
              
              <div className="group/card bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-2xl p-7 border-2 border-rose-300 dark:border-rose-700 hover:shadow-xl transition-all hover:scale-105">
                <p className="text-sm font-extrabold text-slate-600 dark:text-gray-400 mb-3">Days Absent</p>
                <p className="text-5xl font-extrabold text-rose-600 dark:text-rose-400">{Math.floor(Math.random() * 20) + 5}</p>
                <p className="text-xs text-slate-600 dark:text-gray-400 mt-3 font-bold">Including sick leaves</p>
              </div>
            </div>


            <div className="relative text-center py-16 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border-2 border-slate-200 dark:border-gray-700">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-20 animate-pulse"></div>
                <div className="relative w-20 h-20 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center shadow-xl">
                  <svg className="w-10 h-10 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">Detailed Attendance Calendar</p>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Coming soon with day-by-day breakdown</p>
            </div>
          </div>
        )}


        {activeTab === 'performance' && (
          <div className="space-y-6">
            <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-4 mb-7">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Performance Trends & Analytics</h2>
              </div>
              
              <div className="relative">
                <YearWisePerformanceTrends 
                  studentsData={[student]} 
                  classPerformance={{}}
                />
              </div>
            </div>
          </div>
        )}


        {activeTab === 'documents' && (
          <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Documents & Files</h2>
            </div>


            <div className="relative text-center py-20 bg-gradient-to-r from-slate-50 to-amber-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border-2 border-slate-200 dark:border-gray-700">
              <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 rounded-2xl blur opacity-20 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-slate-100 to-amber-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-12 h-12 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-gray-100 mb-3">No Documents Available</p>
              <p className="text-sm text-slate-600 dark:text-gray-400 mb-8 font-bold max-w-md mx-auto">Upload important documents like report cards, certificates, and more</p>
              <button className="group/btn inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-xl hover:shadow-2xl transition-all hover:scale-110 border-2 border-white/20">
                <svg className="w-6 h-6 group-hover/btn:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                </svg>
                Upload Document
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};


export default AdminStudentProfilePage;


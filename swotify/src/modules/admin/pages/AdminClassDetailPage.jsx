import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import AnalyticsGraph from '../../student/components/AnalyticsGraph';


const AdminClassDetailPage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');


  useEffect(() => {
    const foundClass = mockClasses.find(c => c.id === classId);
    setClassData(foundClass);
  }, [classId]);


  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden p-6 flex items-center justify-center">
        {/* Premium Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-slate-200/60 dark:border-gray-700/50 p-12 text-center max-w-md">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-28 h-28 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100 mb-3">Class Not Found</h3>
          <p className="text-slate-600 dark:text-gray-400 mb-8 font-medium">The class you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }


  // Dummy year-wise performance for this specific class
  const classYearlyPerformance = {
    'class1': { data: [70, 75, 78, 80, 82], labels: ['2020', '2021', '2022', '2023', '2024'] },
    'class2': { data: [65, 68, 70, 72, 75], labels: ['2020', '2021', '2022', '2023', '2024'] },
    'class3': { data: [80, 82, 85, 87, 88], labels: ['2020', '2021', '2022', '2023', '2024'] },
  };
  const currentClassTrends = classYearlyPerformance[classId] || { data: [], labels: [] };


  // Calculate class statistics
  const calculateClassStats = () => {
    const students = classData.students;
    const totalStudents = students.length;
    
    let totalScore = 0;
    let totalMaxScore = 0;
    let totalAttendance = 0;
    let validAttendanceCount = 0;
    
    students.forEach(student => {
      if (student.assignments) {
        student.assignments.forEach(assignment => {
          if (assignment.grade !== null && assignment.maxGrade > 0) {
            totalScore += assignment.grade;
            totalMaxScore += assignment.maxGrade;
          }
        });
      }
      
      const attendance = student.details?.attendance;
      if (attendance && attendance !== 'N/A') {
        const attendanceValue = parseFloat(attendance.replace('%', ''));
        if (!isNaN(attendanceValue)) {
          totalAttendance += attendanceValue;
          validAttendanceCount++;
        }
      }
    });
    
    const avgScore = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;
    const avgAttendance = validAttendanceCount > 0 ? totalAttendance / validAttendanceCount : 0;
    const passedStudents = students.filter(s => {
      let studentScore = 0;
      let studentMaxScore = 0;
      if (s.assignments) {
        s.assignments.forEach(assignment => {
          if (assignment.grade !== null && assignment.maxGrade > 0) {
            studentScore += assignment.grade;
            studentMaxScore += assignment.maxGrade;
          }
        });
      }
      const studentAvg = studentMaxScore > 0 ? (studentScore / studentMaxScore) * 100 : 0;
      return studentAvg >= 50;
    }).length;
    
    return {
      avgScore,
      avgAttendance,
      passRate: totalStudents > 0 ? (passedStudents / totalStudents) * 100 : 0,
      passedStudents,
      totalStudents
    };
  };


  const stats = calculateClassStats();


  // Filter and sort students
  const filteredStudents = classData.students
    .filter(student => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'email') return a.details.email.localeCompare(b.details.email);
      return 0;
    });


  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };


  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'bg-blue-50 border-blue-200';
    if (score >= 50) return 'bg-amber-50 border-amber-200';
    return 'bg-rose-50 border-rose-200';
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Sticky Premium Header */}
      <div className="sticky top-0 z-40 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border-b-2 border-slate-200/60 dark:border-gray-700/50 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 px-5 py-3 text-slate-600 dark:text-gray-300 hover:text-slate-900 dark:hover:text-gray-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 rounded-xl transition-all duration-300 font-bold border-2 border-transparent hover:border-blue-200/50"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Reports
            </button>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-xl font-extrabold shadow-2xl ring-4 ring-white/50">
                  {classData.grade.charAt(classData.grade.length - 1)}{classData.section}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">{classData.className}</h1>
                <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">{classData.grade} • Section {classData.section}</p>
              </div>
            </div>
            
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-6">
        {/* Premium Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Students */}
          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wide">Total Students</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">{stats.totalStudents}</p>
              <p className="text-xs text-slate-500 dark:text-gray-500 font-bold">Enrolled in {classData.className}</p>
            </div>
          </div>

          {/* Average Score */}
          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wide">Average Score</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p className={`text-4xl font-extrabold mb-3 ${getScoreColor(stats.avgScore)}`}>
                {stats.avgScore.toFixed(1)}%
              </p>
              <div className="h-2 bg-slate-100 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${Math.min(stats.avgScore, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Pass Rate */}
          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wide">Pass Rate</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">{stats.passRate.toFixed(1)}%</p>
              <p className="text-xs text-slate-500 dark:text-gray-500 font-bold">{stats.passedStudents} of {stats.totalStudents} passed</p>
            </div>
          </div>

          {/* Attendance */}
          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-600 dark:text-gray-400 uppercase tracking-wide">Avg Attendance</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">{stats.avgAttendance.toFixed(1)}%</p>
              <p className="text-xs text-slate-500 dark:text-gray-500 font-bold">Class attendance rate</p>
            </div>
          </div>
        </div>

        {/* Premium Tab Navigation */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`group flex-1 px-6 py-4 rounded-xl font-extrabold transition-all duration-300 ${
                selectedTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl scale-105 border-2 border-white/20'
                  : 'text-slate-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:scale-105'
              }`}
            >
              <span className={selectedTab === 'overview' ? 'animate-pulse' : ''}>Overview</span>
            </button>
            <button
              onClick={() => setSelectedTab('students')}
              className={`group flex-1 px-6 py-4 rounded-xl font-extrabold transition-all duration-300 ${
                selectedTab === 'students'
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl scale-105 border-2 border-white/20'
                  : 'text-slate-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:scale-105'
              }`}
            >
              <span className={selectedTab === 'students' ? 'animate-pulse' : ''}>Students ({stats.totalStudents})</span>
            </button>
            <button
              onClick={() => setSelectedTab('performance')}
              className={`group flex-1 px-6 py-4 rounded-xl font-extrabold transition-all duration-300 ${
                selectedTab === 'performance'
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl scale-105 border-2 border-white/20'
                  : 'text-slate-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:scale-105'
              }`}
            >
              <span className={selectedTab === 'performance' ? 'animate-pulse' : ''}>Performance History</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Premium Class Information Card */}
            <div className="lg:col-span-1">
              <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5"></div>
                <div className="relative text-center mb-6">
                  <div className="relative inline-block mb-4">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
                    <div className="relative w-32 h-32 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1 rounded-2xl shadow-2xl">
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center text-white text-6xl font-extrabold">
                        {classData.grade.charAt(classData.grade.length - 1)}{classData.section}
                      </div>
                    </div>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">{classData.className}</h2>
                  <p className="text-slate-600 dark:text-gray-400 text-sm font-bold">{classData.grade} - Section {classData.section}</p>
                </div>

                <div className="relative space-y-3 pt-4 border-t-2 border-slate-200 dark:border-gray-700">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg transition-all hover:scale-105">
                    <span className="text-sm text-slate-600 dark:text-gray-400 flex items-center gap-2 font-bold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      Students Enrolled
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-gray-100 text-lg">{stats.totalStudents}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-2 border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-lg transition-all hover:scale-105">
                    <span className="text-sm text-slate-600 dark:text-gray-400 flex items-center gap-2 font-bold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      Average Score
                    </span>
                    <span className={`font-extrabold text-lg ${getScoreColor(stats.avgScore)}`}>
                      {stats.avgScore.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200/50 dark:border-amber-700/50 hover:shadow-lg transition-all hover:scale-105">
                    <span className="text-sm text-slate-600 dark:text-gray-400 flex items-center gap-2 font-bold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      Pass Rate
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-gray-100 text-lg">{stats.passRate.toFixed(1)}%</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl border-2 border-rose-200/50 dark:border-rose-700/50 hover:shadow-lg transition-all hover:scale-105">
                    <span className="text-sm text-slate-600 dark:text-gray-400 flex items-center gap-2 font-bold">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      Avg Attendance
                    </span>
                    <span className="font-extrabold text-slate-900 dark:text-gray-100 text-lg">{stats.avgAttendance.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Quick Stats and Performance */}
            <div className="lg:col-span-2 space-y-6">
              {/* Premium Performance Distribution */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                  Performance Distribution
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="group relative p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-xl text-center hover:shadow-2xl transition-all hover:scale-110 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="relative text-3xl font-extrabold text-emerald-600 mb-2">
                      {classData.students.filter(s => {
                        let score = 0, maxScore = 0;
                        s.assignments?.forEach(a => {
                          if (a.grade !== null && a.maxGrade > 0) {
                            score += a.grade;
                            maxScore += a.maxGrade;
                          }
                        });
                        return maxScore > 0 && (score / maxScore) * 100 >= 90;
                      }).length}
                    </p>
                    <p className="relative text-xs text-emerald-700 dark:text-emerald-400 font-extrabold">Excellent (90%+)</p>
                  </div>
                  <div className="group relative p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-700 rounded-xl text-center hover:shadow-2xl transition-all hover:scale-110 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="relative text-3xl font-extrabold text-blue-600 mb-2">
                      {classData.students.filter(s => {
                        let score = 0, maxScore = 0;
                        s.assignments?.forEach(a => {
                          if (a.grade !== null && a.maxGrade > 0) {
                            score += a.grade;
                            maxScore += a.maxGrade;
                          }
                        });
                        const avg = maxScore > 0 ? (score / maxScore) * 100 : 0;
                        return avg >= 75 && avg < 90;
                      }).length}
                    </p>
                    <p className="relative text-xs text-blue-700 dark:text-blue-400 font-extrabold">Good (75-89%)</p>
                  </div>
                  <div className="group relative p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-xl text-center hover:shadow-2xl transition-all hover:scale-110 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="relative text-3xl font-extrabold text-amber-600 mb-2">
                      {classData.students.filter(s => {
                        let score = 0, maxScore = 0;
                        s.assignments?.forEach(a => {
                          if (a.grade !== null && a.maxGrade > 0) {
                            score += a.grade;
                            maxScore += a.maxGrade;
                          }
                        });
                        const avg = maxScore > 0 ? (score / maxScore) * 100 : 0;
                        return avg >= 50 && avg < 75;
                      }).length}
                    </p>
                    <p className="relative text-xs text-amber-700 dark:text-amber-400 font-extrabold">Average (50-74%)</p>
                  </div>
                  <div className="group relative p-5 bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 border-2 border-rose-200 dark:border-rose-700 rounded-xl text-center hover:shadow-2xl transition-all hover:scale-110 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <p className="relative text-3xl font-extrabold text-rose-600 mb-2">
                      {classData.students.filter(s => {
                        let score = 0, maxScore = 0;
                        s.assignments?.forEach(a => {
                          if (a.grade !== null && a.maxGrade > 0) {
                            score += a.grade;
                            maxScore += a.maxGrade;
                          }
                        });
                        return maxScore > 0 && (score / maxScore) * 100 < 50;
                      }).length}
                    </p>
                    <p className="relative text-xs text-rose-700 dark:text-rose-400 font-extrabold">Needs Support</p>
                  </div>
                </div>
              </div>

              {/* Premium Top Performers */}
              <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all">
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                  <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                  Top 3 Performers
                </h3>
                <div className="space-y-4">
                  {classData.students
                    .map(student => {
                      let score = 0, maxScore = 0;
                      student.assignments?.forEach(a => {
                        if (a.grade !== null && a.maxGrade > 0) {
                          score += a.grade;
                          maxScore += a.maxGrade;
                        }
                      });
                      return { ...student, avgScore: maxScore > 0 ? (score / maxScore) * 100 : 0 };
                    })
                    .sort((a, b) => b.avgScore - a.avgScore)
                    .slice(0, 3)
                    .map((student, index) => (
                      <div 
                        key={student.id} 
                        className="group flex items-center gap-4 p-5 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-slate-200/50 dark:border-gray-700/50 hover:shadow-2xl transition-all cursor-pointer hover:scale-105"
                        onClick={() => navigate(`/admin-dashboard/student-profile/${student.id}`)}
                      >
                        <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg shadow-2xl ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-500 text-white' :
                          index === 1 ? 'bg-gradient-to-br from-slate-300 via-slate-400 to-gray-400 text-white' :
                          'bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white'
                        }`}>
                          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
                          <span className="relative text-2xl">{index === 0 && '🥇'}{index === 1 && '🥈'}{index === 2 && '🥉'}</span>
                        </div>
                        <div className="relative w-14 h-14 rounded-xl shadow-xl group-hover:scale-110 transition-transform">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-50"></div>
                          <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-0.5 rounded-xl">
                            <img
                              src={student.photo}
                              alt={student.name}
                              className="w-full h-full rounded-xl object-cover"
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{student.name}</p>
                          <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{student.details.email}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-3xl font-extrabold ${getScoreColor(student.avgScore)}`}>
                            {student.avgScore.toFixed(1)}%
                          </p>
                          <p className="text-xs text-slate-500 dark:text-gray-500 font-bold">{student.details.attendance}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'students' && (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl overflow-hidden">
            <div className="p-6 border-b-2 border-slate-200 dark:border-gray-700">
              <div className="flex items-center gap-4 mb-6">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-50"></div>
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Student Roster</h2>
              </div>

              {/* Premium Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity"></div>
                  <input
                    type="text"
                    placeholder="Search students by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="relative w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-gray-700/50 border-2 border-slate-200 dark:border-gray-600 rounded-xl text-slate-900 dark:text-gray-100 placeholder-slate-400 dark:placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all font-medium shadow-sm"
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-6 py-4 bg-slate-50 dark:bg-gray-700/50 border-2 border-slate-200 dark:border-gray-600 rounded-xl text-slate-900 dark:text-gray-100 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all cursor-pointer font-bold shadow-sm"
                >
                  <option value="name">Sort by Name</option>
                  <option value="email">Sort by Email</option>
                </select>
              </div>

              <p className="text-sm text-slate-600 dark:text-gray-400 mt-4 font-bold">
                Showing <span className="font-extrabold text-slate-900 dark:text-gray-100">{filteredStudents.length}</span> of <span className="font-extrabold text-slate-900 dark:text-gray-100">{stats.totalStudents}</span> students
              </p>
            </div>

            {/* Premium Student Table */}
            <div className="overflow-x-auto custom-scrollbar">
              <table className="min-w-full divide-y-2 divide-slate-200 dark:divide-gray-700">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50">
                  <tr>
                    <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">#</th>
                    <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Attendance</th>
                    <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-200 dark:divide-gray-700">
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="group hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-sm font-extrabold text-slate-600 dark:text-gray-400">{index + 1}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="relative w-12 h-12 group-hover:scale-110 transition-transform">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-0.5 rounded-xl shadow-lg">
                              <img
                                src={student.photo}
                                alt={student.name}
                                className="w-full h-full rounded-xl object-cover"
                              />
                            </div>
                          </div>
                          <span className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-sm text-slate-600 dark:text-gray-400 font-bold">{student.details.email}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-slate-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 text-sm font-extrabold text-slate-700 dark:text-gray-300 border-2 border-slate-200 dark:border-gray-600">
                          {student.details.grade}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-sm text-slate-600 dark:text-gray-400 font-extrabold">{student.details.attendance}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/admin-dashboard/student-profile/${student.id}`)}
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white text-sm font-extrabold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Premium Empty State */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-16">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg className="w-12 h-12 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                  </div>
                </div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">No students found</p>
                <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'performance' && (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-50"></div>
                <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">{classData.className} Performance History</h2>
            </div>
            {currentClassTrends.data.length > 0 ? (
              <div className="relative bg-gradient-to-br from-blue-50/50 via-purple-50/50 to-pink-50/50 dark:from-blue-900/10 dark:via-purple-900/10 dark:to-pink-900/10 rounded-2xl p-8 border-2 border-slate-200/50 dark:border-gray-700/50">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl"></div>
                <div className="relative">
                  <AnalyticsGraph 
                    title="5-Year Performance Trend" 
                    graphData={currentClassTrends.data} 
                    labels={currentClassTrends.labels} 
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center shadow-xl">
                    <svg className="w-12 h-12 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">No historical data available</p>
                <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Performance trends will appear here once data is collected</p>
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
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


export default AdminClassDetailPage;

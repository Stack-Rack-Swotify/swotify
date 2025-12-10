import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockStaff from '../../../data/mockStaff';

const StaffProfilePage = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();
  const [staff, setStaff] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const foundStaff = mockStaff.find(s => s.id === staffId);
    setStaff(foundStaff);
  }, [staffId]);

  if (!staff) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 p-6 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/60 p-12 text-center max-w-md">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-2xl animate-pulse opacity-20"></div>
            <div className="absolute inset-2 bg-white rounded-xl flex items-center justify-center">
              <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Staff Member Not Found</h3>
          <p className="text-slate-600 mb-6">The staff member you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const getRoleConfig = (role) => {
    const configs = {
      'Teacher': { 
        gradient: 'from-blue-500 to-cyan-500', 
        bg: 'bg-blue-500', 
        light: 'bg-blue-50', 
        border: 'border-blue-200', 
        text: 'text-blue-600',
        icon: '👨‍🏫'
      },
      'Principal': { 
        gradient: 'from-orange-500 to-red-500', 
        bg: 'bg-orange-500', 
        light: 'bg-orange-50', 
        border: 'border-orange-200', 
        text: 'text-orange-600',
        icon: '🎓'
      },
      'Admin': { 
        gradient: 'from-emerald-500 to-teal-500', 
        bg: 'bg-emerald-500', 
        light: 'bg-emerald-50', 
        border: 'border-emerald-200', 
        text: 'text-emerald-600',
        icon: '⚙️'
      },
      'Librarian': { 
        gradient: 'from-purple-500 to-pink-500', 
        bg: 'bg-purple-500', 
        light: 'bg-purple-50', 
        border: 'border-purple-200', 
        text: 'text-purple-600',
        icon: '📚'
      },
      'Counselor': { 
        gradient: 'from-teal-500 to-emerald-500', 
        bg: 'bg-teal-500', 
        light: 'bg-teal-50', 
        border: 'border-teal-200', 
        text: 'text-teal-600',
        icon: '🧠'
      },
      'Accountant': { 
        gradient: 'from-indigo-500 to-purple-500', 
        bg: 'bg-indigo-500', 
        light: 'bg-indigo-50', 
        border: 'border-indigo-200', 
        text: 'text-indigo-600',
        icon: '💼'
      },
      'Nurse': { 
        gradient: 'from-pink-500 to-rose-500', 
        bg: 'bg-pink-500', 
        light: 'bg-pink-50', 
        border: 'border-pink-200', 
        text: 'text-pink-600',
        icon: '⚕️'
      },
      'IT Administrator': { 
        gradient: 'from-slate-600 to-slate-700', 
        bg: 'bg-slate-600', 
        light: 'bg-slate-50', 
        border: 'border-slate-200', 
        text: 'text-slate-600',
        icon: '💻'
      },
      'Staff': { 
        gradient: 'from-gray-500 to-gray-600', 
        bg: 'bg-gray-500', 
        light: 'bg-gray-50', 
        border: 'border-gray-200', 
        text: 'text-gray-600',
        icon: '👤'
      },
    };
    return configs[role] || configs['Staff'];
  };

  const roleConfig = getRoleConfig(staff.role);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Header with Cover */}
      <div className={`relative h-48 bg-gradient-to-r ${roleConfig.gradient} overflow-hidden`}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full -mr-48 -mt-48"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-white rounded-full -ml-40 -mb-40"></div>
        </div>
        
        {/* Back Button */}
        <div className="relative max-w-7xl mx-auto px-6 pt-6">
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-all duration-300 flex items-center gap-2 font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Staff
          </button>
        </div>
      </div>

      {/* Profile Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-6 text-center">
              {/* Profile Photo */}
              <div className="relative inline-block mb-4">
                <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${roleConfig.gradient} p-1 shadow-2xl`}>
                  <img
                    src={staff.photo || `https://placehold.co/150/000000/FFFFFF?text=${staff.name.charAt(0)}`}
                    alt={staff.name}
                    className="w-full h-full rounded-3xl object-cover bg-white"
                  />
                </div>
                {/* Role Badge */}
                <div className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-1.5 bg-gradient-to-r ${roleConfig.gradient} rounded-full border-4 border-white shadow-lg`}>
                  <span className="text-xs text-white font-bold whitespace-nowrap flex items-center gap-1">
                    <span>{roleConfig.icon}</span>
                    {staff.role}
                  </span>
                </div>
              </div>

              {/* Name & Status */}
              <h2 className="text-2xl font-bold text-slate-900 mb-2 mt-4">{staff.name}</h2>
              <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 shadow-sm ${
                  staff.status === 'Active' 
                    ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                    : 'bg-rose-50 text-rose-600 border-rose-200'
                }`}>
                  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                    staff.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                  }`}></span>
                  {staff.status || 'Active'}
                </span>
                {staff.subject && (
                  <span className={`${roleConfig.light} ${roleConfig.text} px-3 py-1 rounded-full text-xs font-semibold border ${roleConfig.border} shadow-sm`}>
                    📚 {staff.subject}
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex gap-2 mb-6">
                <button className={`flex-1 px-4 py-3 bg-gradient-to-r ${roleConfig.gradient} text-white rounded-xl font-semibold text-sm hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Message
                </button>
                <button className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold text-sm transition-all duration-300 hover:shadow-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                  </svg>
                </button>
              </div>

              {/* Contact Information */}
              <div className="space-y-3 text-left">
                <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <div className="w-1 h-4 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  Contact Information
                </h3>
                
                <div className={`flex items-start gap-3 p-3 rounded-xl border ${roleConfig.light} ${roleConfig.border} transition-all hover:shadow-md`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleConfig.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 font-semibold mb-1">Email Address</p>
                    <p className="text-sm font-bold text-slate-900 truncate" title={staff.email}>{staff.email}</p>
                  </div>
                </div>

                <div className={`flex items-start gap-3 p-3 rounded-xl border ${roleConfig.light} ${roleConfig.border} transition-all hover:shadow-md`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleConfig.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-600 font-semibold mb-1">Phone Number</p>
                    <p className="text-sm font-bold text-slate-900">{staff.details?.phone || '+1 (555) 123-4567'}</p>
                  </div>
                </div>

                <div className={`flex items-start gap-3 p-3 rounded-xl border ${roleConfig.light} ${roleConfig.border} transition-all hover:shadow-md`}>
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${roleConfig.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs text-slate-600 font-semibold mb-1">Address</p>
                    <p className="text-sm font-bold text-slate-900">{staff.details?.address || '123 School St, Education City'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 p-2">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`flex-1 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'overview'
                      ? `bg-gradient-to-r ${roleConfig.gradient} text-white shadow-lg`
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'details'
                      ? `bg-gradient-to-r ${roleConfig.gradient} text-white shadow-lg`
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('performance')}
                  className={`flex-1 px-6 py-3 rounded-2xl font-semibold text-sm transition-all duration-300 ${
                    activeTab === 'performance'
                      ? `bg-gradient-to-r ${roleConfig.gradient} text-white shadow-lg`
                      : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Performance
                </button>
              </div>
            </div>

            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Quick Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-5 text-center hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-3xl font-extrabold text-emerald-600 mb-1">98%</h4>
                    <p className="text-xs text-slate-600 font-semibold">Attendance</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-5 text-center hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h4 className="text-3xl font-extrabold text-blue-600 mb-1">12</h4>
                    <p className="text-xs text-slate-600 font-semibold">Classes</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-5 text-center hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </div>
                    <h4 className="text-3xl font-extrabold text-orange-600 mb-1">4.8</h4>
                    <p className="text-xs text-slate-600 font-semibold">Rating</p>
                  </div>

                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-5 text-center hover:scale-105 transition-all duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-3xl font-extrabold text-purple-600 mb-1">5</h4>
                    <p className="text-xs text-slate-600 font-semibold">Years</p>
                  </div>
                </div>

                {/* Biography */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                    Biography
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {staff.details?.bio || `${staff.name} is a dedicated ${staff.role.toLowerCase()} at our institution, bringing years of experience and passion to their role. ${staff.subject ? `Specializing in ${staff.subject}, they` : 'They'} have consistently demonstrated excellence in their field and commitment to educational excellence. Known for their innovative approach and dedication to student success, they continue to make significant contributions to our academic community.`}
                  </p>
                </div>
              </>
            )}

            {/* Details Tab */}
            {activeTab === 'details' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
                  Professional Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl border border-blue-200">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>🎓</span> Academic Year
                    </label>
                    <p className="text-slate-900 font-bold text-lg">{staff.academicYear || '2024-2025'}</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>🆔</span> Employee ID
                    </label>
                    <p className="text-slate-900 font-bold text-lg">{staff.id}</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl border border-orange-200">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>📅</span> Joining Date
                    </label>
                    <p className="text-slate-900 font-bold text-lg">{staff.details?.joiningDate || 'Sept 1, 2020'}</p>
                  </div>
                  
                  <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-200">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>🏢</span> Department
                    </label>
                    <p className="text-slate-900 font-bold text-lg">{staff.details?.department || staff.subject || 'General'}</p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl border border-cyan-200">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>💰</span> Salary Grade
                    </label>
                    <p className="text-slate-900 font-bold text-lg">{staff.details?.salaryGrade || 'Grade A'}</p>
                  </div>

                  <div className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-200">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <span>📋</span> Contract Type
                    </label>
                    <p className="text-slate-900 font-bold text-lg">{staff.details?.contractType || 'Full-time'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Performance Tab */}
            {activeTab === 'performance' && (
              <>
                {/* Performance Metrics */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                    Performance Metrics
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">Teaching Quality</span>
                        <span className="text-sm font-bold text-emerald-600">95%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" style={{ width: '95%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">Student Engagement</span>
                        <span className="text-sm font-bold text-blue-600">88%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: '88%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">Administrative Tasks</span>
                        <span className="text-sm font-bold text-purple-600">92%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" style={{ width: '92%' }}></div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-slate-700">Professional Development</span>
                        <span className="text-sm font-bold text-orange-600">90%</span>
                      </div>
                      <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Achievements */}
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                    <div className="w-1 h-6 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full"></div>
                    Recent Achievements
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-lg">🏆</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Best Teacher Award 2024</p>
                        <p className="text-xs text-slate-600 mt-1">Recognized for outstanding teaching excellence</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl border border-blue-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-lg">📚</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">Published Research Paper</p>
                        <p className="text-xs text-slate-600 mt-1">Contributed to educational methodology research</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl border border-emerald-200">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                        <span className="text-lg">🎓</span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">100% Pass Rate</p>
                        <p className="text-xs text-slate-600 mt-1">All students passed final examinations</p>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfilePage;

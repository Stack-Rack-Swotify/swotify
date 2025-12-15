import React from 'react';
import StudentMarks from './StudentMarks';
import PerformanceAnalysis from './PerformanceAnalysis';

const StudentProfile = ({ student }) => {
  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden flex items-center justify-center p-6">
        {/* Premium Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative text-center p-12 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-gray-700">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-28 h-28 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <p className="text-slate-600 dark:text-gray-400 font-semibold text-lg">No student data provided.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto p-6 space-y-6">
        {/* Premium Profile Header Card */}
        <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Premium Profile Picture */}
            <div className="flex-shrink-0 relative group/avatar">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
              <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1.5 shadow-2xl">
                <img
                  className="w-full h-full rounded-full object-cover bg-white border-4 border-white dark:border-gray-700"
                  src={student.photo}
                  alt={student.name}
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-full p-3 shadow-2xl border-4 border-white dark:border-gray-800 group-hover/avatar:scale-110 transition-transform">
                <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
            </div>

            {/* Premium Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                {student.name}
              </h4>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
                <span className="group/badge bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-cyan-900/30 dark:to-blue-900/30 text-cyan-600 dark:text-cyan-400 px-5 py-2 rounded-xl text-sm font-semibold border-2 border-cyan-300 dark:border-cyan-700 shadow-lg hover:scale-110 transition-transform">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    {student.id}
                  </span>
                </span>
                <span className="group/badge bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 text-emerald-600 dark:text-emerald-400 px-5 py-2 rounded-xl text-sm font-semibold border-2 border-emerald-300 dark:border-emerald-700 shadow-lg hover:scale-110 transition-transform">
                  <span className="flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {student.details.grade}
                  </span>
                </span>
                {student.academicYear && (
                  <span className="group/badge bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 text-purple-600 dark:text-purple-400 px-5 py-2 rounded-xl text-sm font-semibold border-2 border-purple-300 dark:border-purple-700 shadow-lg hover:scale-110 transition-transform">
                    <span className="flex items-center gap-2">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {student.academicYear}
                    </span>
                  </span>
                )}
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-center md:justify-start gap-3 p-4 bg-gradient-to-r from-slate-50 to-white dark:from-gray-800 dark:to-gray-700 rounded-xl border-2 border-slate-200 dark:border-gray-600 hover:shadow-lg transition-all hover:scale-105">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-gray-300">Program:</span>
                  <span className="text-slate-900 dark:text-gray-100 font-medium">{student.details.program || 'N/A'}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-3 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-2 border-emerald-300 dark:border-emerald-700 hover:shadow-lg transition-all hover:scale-105">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                    </svg>
                  </div>
                  <span className="font-semibold text-slate-700 dark:text-gray-300">GPA:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold text-xl">{student.details.gpa || 'N/A'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Contact Information */}
        <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur opacity-50 animate-pulse"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-gray-100">Contact Information</h4>
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Email */}
            <div className="group/card bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-5 rounded-xl border-2 border-cyan-200 dark:border-cyan-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wide">Email</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-gray-100 break-all">{student.details.email}</p>
            </div>

            {/* Phone */}
            <div className="group/card bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-5 rounded-xl border-2 border-emerald-200 dark:border-emerald-700 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wide">Phone</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-gray-100">{student.details.phone || 'N/A'}</p>
            </div>

            {/* Address */}
            <div className="group/card bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-5 rounded-xl border-2 border-orange-200 dark:border-orange-700 md:col-span-2 hover:shadow-xl transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wide">Address</span>
              </div>
              <p className="text-sm font-semibold text-slate-900 dark:text-gray-100">{student.details.address || 'N/A'}</p>
            </div>
          </div>
        </div>

        {/* Premium Additional Information */}
        <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur opacity-50 animate-pulse"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-gray-100">Additional Information</h4>
          </div>
          
          <div className="relative space-y-4">
            {/* Enrollment Date */}
            <div className="group/info bg-gradient-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border-2 border-slate-200 dark:border-gray-600 hover:shadow-lg transition-all hover:scale-105">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover/info:rotate-12 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wide mb-2">Enrollment Date</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-gray-100">{student.details.enrollmentDate || 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Bio */}
            <div className="group/info bg-gradient-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-700 p-5 rounded-xl border-2 border-slate-200 dark:border-gray-600 hover:shadow-lg transition-all hover:scale-105">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg group-hover/info:rotate-12 transition-transform">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-slate-700 dark:text-gray-300 uppercase tracking-wide mb-2">Bio</p>
                  <p className="text-sm text-slate-900 dark:text-gray-100 leading-relaxed">{student.details.bio || 'N/A'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Academic Overview */}
        <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative flex items-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-500 rounded-xl blur opacity-50 animate-pulse"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 via-blue-600 to-emerald-600 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
            </div>
            <h4 className="text-xl font-bold text-slate-900 dark:text-gray-100">Academic Overview</h4>
          </div>
          
          <div className="relative bg-gradient-to-br from-cyan-50/50 via-blue-50/50 to-emerald-50/50 dark:from-cyan-900/10 dark:via-blue-900/10 dark:to-emerald-900/10 p-6 rounded-xl border-2 border-cyan-200 dark:border-cyan-800">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <p className="text-sm text-slate-900 dark:text-gray-100 leading-relaxed">
                A concise summary of <span className="font-semibold text-cyan-600 dark:text-cyan-400">{student.name}</span>'s academic performance. Detailed analysis can be found in the dedicated reports section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

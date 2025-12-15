import React from 'react';
import { Link } from 'react-router-dom';

const TeacherHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl shadow-2xl p-8 mb-8 text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
          <div className="relative flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-semibold mb-3">Welcome Back, Teacher!</h1>
              <p className="text-white/90 font-medium">Ready to inspire and educate today's students</p>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl"></div>
              <div className="relative w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/30 shadow-xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 mb-8 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center">
            <span className="w-1.5 h-8 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full mr-3"></span>
            Teacher Dashboard Overview
          </h2>
          
          <p className="text-slate-700 leading-relaxed mb-8 font-medium">
            Welcome to your comprehensive Teacher Dashboard! This is your central hub for managing classes, 
            tracking student progress, and staying organized throughout the academic year.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur-lg opacity-30"></div>
                  <div className="relative w-14 h-14 bg-blue-200 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-7 h-7 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Quick Class Access</h3>
                  <p className="text-sm text-slate-700 font-medium">Manage your classes, view rosters, and track attendance with ease</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100/50 p-6 rounded-xl border-2 border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-emerald-500 rounded-xl blur-lg opacity-30"></div>
                  <div className="relative w-14 h-14 bg-emerald-200 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-7 h-7 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Assignments & Deadlines</h3>
                  <p className="text-sm text-slate-700 font-medium">View upcoming assignments and manage submission deadlines</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 rounded-xl border-2 border-amber-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-amber-500 rounded-xl blur-lg opacity-30"></div>
                  <div className="relative w-14 h-14 bg-amber-200 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-7 h-7 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Performance Monitoring</h3>
                  <p className="text-sm text-slate-700 font-medium">Monitor student performance trends and academic progress</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 p-6 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                  <div className="absolute inset-0 bg-purple-500 rounded-xl blur-lg opacity-30"></div>
                  <div className="relative w-14 h-14 bg-purple-200 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-7 h-7 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                    </svg>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Important Announcements</h3>
                  <p className="text-sm text-slate-700 font-medium">Receive and manage school-wide and class-specific updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Guide */}
        <div className="bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50/50 rounded-2xl border-2 border-purple-200 p-8 shadow-lg">
          <div className="flex items-start gap-4 mb-8">
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30"></div>
              <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Quick Navigation Guide</h3>
              <p className="text-slate-700 mb-4 font-medium">
                Use the navigation menu on the left to access all features and manage your teaching resources efficiently.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/teacher-dashboard/class"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors shadow-sm">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">Classes</p>
                <p className="text-xs text-slate-600 font-medium">Manage your classes</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/teacher-dashboard/students"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center group-hover:bg-emerald-200 transition-colors shadow-sm">
                <svg className="w-6 h-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">Students</p>
                <p className="text-xs text-slate-600 font-medium">View all students</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/teacher-dashboard/attendance"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-amber-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors shadow-sm">
                <svg className="w-6 h-6 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 group-hover:text-amber-700 transition-colors">Attendance</p>
                <p className="text-xs text-slate-600 font-medium">Track attendance</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/teacher-dashboard/events"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors shadow-sm">
                <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 group-hover:text-purple-700 transition-colors">Events</p>
                <p className="text-xs text-slate-600 font-medium">Manage events</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/teacher-dashboard/ptm-history"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-pink-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors shadow-sm">
                <svg className="w-6 h-6 text-pink-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 group-hover:text-pink-700 transition-colors">PTM History</p>
                <p className="text-xs text-slate-600 font-medium">View meetings</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-pink-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/teacher-dashboard/ai-chatbot"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-colors shadow-sm">
                <svg className="w-6 h-6 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">AI Assistant</p>
                <p className="text-xs text-slate-600 font-medium">Get AI help</p>
              </div>
              <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHomePage;

import React from 'react';
import { Link } from 'react-router-dom';

const TeacherHomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <div className="bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] rounded-2xl shadow-lg p-8 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome Back, Teacher!</h1>
              <p className="text-white/90">Ready to inspire and educate today's students</p>
            </div>
            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8 hover:shadow-lg transition-all duration-300">
          <h2 className="text-2xl font-bold text-[#0F172A] mb-6 flex items-center">
            <span className="w-1 h-8 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-3"></span>
            Teacher Dashboard Overview
          </h2>
          
          <p className="text-[#64748B] leading-relaxed mb-6">
            Welcome to your comprehensive Teacher Dashboard! This is your central hub for managing classes, 
            tracking student progress, and staying organized throughout the academic year.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <div className="bg-gradient-to-br from-[#0EA5E9]/5 to-[#0EA5E9]/10 p-5 rounded-xl border border-[#0EA5E9]/20 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Quick Class Access</h3>
                  <p className="text-sm text-[#64748B]">Manage your classes, view rosters, and track attendance with ease</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#22C55E]/5 to-[#22C55E]/10 p-5 rounded-xl border border-[#22C55E]/20 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#22C55E]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Assignments & Deadlines</h3>
                  <p className="text-sm text-[#64748B]">View upcoming assignments and manage submission deadlines</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#F97316]/5 to-[#F97316]/10 p-5 rounded-xl border border-[#F97316]/20 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#F97316]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Performance Monitoring</h3>
                  <p className="text-sm text-[#64748B]">Monitor student performance trends and academic progress</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-[#0F172A]/5 to-[#64748B]/10 p-5 rounded-xl border border-[#0F172A]/20 hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#0F172A]/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-[#0F172A] mb-1">Important Announcements</h3>
                  <p className="text-sm text-[#64748B]">Receive and manage school-wide and class-specific updates</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Guide */}
        <div className="bg-gradient-to-br from-[#0EA5E9]/5 via-[#22C55E]/5 to-[#F97316]/5 rounded-2xl border border-[#0EA5E9]/20 p-8">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-[#0EA5E9] to-[#22C55E] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">Quick Navigation Guide</h3>
              <p className="text-[#64748B] mb-4">
                Use the navigation menu on the left to access all features and manage your teaching resources efficiently.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/teacher-dashboard/class"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#0EA5E9]/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0EA5E9]/20 transition-colors">
                <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F172A] group-hover:text-[#0EA5E9] transition-colors">Classes</p>
                <p className="text-xs text-[#64748B]">Manage your classes</p>
              </div>
              <svg className="w-5 h-5 text-[#64748B] group-hover:text-[#0EA5E9] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/teacher-dashboard/students"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#22C55E]/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#22C55E]/20 transition-colors">
                <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F172A] group-hover:text-[#22C55E] transition-colors">Students</p>
                <p className="text-xs text-[#64748B]">View all students</p>
              </div>
              <svg className="w-5 h-5 text-[#64748B] group-hover:text-[#22C55E] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/teacher-dashboard/attendance"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#F97316]/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#F97316]/10 rounded-lg flex items-center justify-center group-hover:bg-[#F97316]/20 transition-colors">
                <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F172A] group-hover:text-[#F97316] transition-colors">Attendance</p>
                <p className="text-xs text-[#64748B]">Track attendance</p>
              </div>
              <svg className="w-5 h-5 text-[#64748B] group-hover:text-[#F97316] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/teacher-dashboard/events"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#0EA5E9]/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0EA5E9]/20 transition-colors">
                <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F172A] group-hover:text-[#0EA5E9] transition-colors">Events</p>
                <p className="text-xs text-[#64748B]">Manage events</p>
              </div>
              <svg className="w-5 h-5 text-[#64748B] group-hover:text-[#0EA5E9] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/teacher-dashboard/ptm-history"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#22C55E]/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#22C55E]/20 transition-colors">
                <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F172A] group-hover:text-[#22C55E] transition-colors">PTM History</p>
                <p className="text-xs text-[#64748B]">View meetings</p>
              </div>
              <svg className="w-5 h-5 text-[#64748B] group-hover:text-[#22C55E] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>

            <Link
              to="/teacher-dashboard/ai-chatbot"
              className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100 hover:border-[#F97316]/30 hover:shadow-md transition-all duration-300 group"
            >
              <div className="w-10 h-10 bg-[#F97316]/10 rounded-lg flex items-center justify-center group-hover:bg-[#F97316]/20 transition-colors">
                <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-[#0F172A] group-hover:text-[#F97316] transition-colors">AI Assistant</p>
                <p className="text-xs text-[#64748B]">Get AI help</p>
              </div>
              <svg className="w-5 h-5 text-[#64748B] group-hover:text-[#F97316] group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherHomePage;

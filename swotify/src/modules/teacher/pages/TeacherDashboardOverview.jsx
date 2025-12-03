import React from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import mockEvents from '../../../data/mockEvents';
import mockPTMHistory from '../../../data/mockPTMHistory';

const TeacherDashboardOverview = () => {
  // --- Students Overview ---
  const totalStudents = mockClasses.reduce((acc, cls) => acc + cls.totalStudents, 0);
  const recentStudents = mockClasses.flatMap(cls => cls.students).slice(0, 5); // Get 5 recent students

  // --- Classes Overview ---
  const totalClasses = mockClasses.length;
  const classesWithHighAttendance = mockClasses.filter(cls => {
    // Assuming attendance data is accessible or summarized
    // For now, just a placeholder logic
    return Math.random() > 0.5; // Placeholder
  }).slice(0, 3);

  // --- Events Overview ---
  const upcomingEvents = mockEvents.filter(event => new Date(event.date) >= new Date()).slice(0, 3);
  const totalEvents = mockEvents.length;

  // --- PTM History Overview ---
  const recentPTMs = mockPTMHistory.slice(0, 3);
  const totalPTMs = mockPTMHistory.length;

  return (
    <div className="bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Teacher Dashboard Overview</h1>
          <p className="text-[#64748B] text-sm">Welcome back! Here's what's happening with your classes today.</p>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-[#64748B] font-medium mb-1">Total Students</p>
            <p className="text-3xl font-bold text-[#0EA5E9]">{totalStudents}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-[#64748B] font-medium mb-1">Total Classes</p>
            <p className="text-3xl font-bold text-[#22C55E]">{totalClasses}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-[#64748B] font-medium mb-1">Upcoming Events</p>
            <p className="text-3xl font-bold text-[#F97316]">{upcomingEvents.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0F172A]/10 to-[#64748B]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-[#64748B] font-medium mb-1">Recent PTMs</p>
            <p className="text-3xl font-bold text-[#0F172A]">{recentPTMs.length}</p>
          </div>
        </div>

        {/* Combined Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Students */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-3"></span>
              Recent Students
            </h2>
            <ul className="space-y-3 mb-4">
              {recentStudents.length > 0 ? (
                recentStudents.map(student => (
                  <li key={student.id} className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-[#0EA5E9]/20 hover:shadow-sm transition-all duration-200">
                    <div className="relative flex-shrink-0">
                      <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#0EA5E9]" />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-[#0F172A] truncate">{student.name}</p>
                      <p className="text-sm text-[#64748B]">{student.details?.grade || 'N/A'}</p>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-[#64748B] text-sm">No recent students to display.</p>
                </div>
              )}
            </ul>
            <Link 
              to="/teacher-dashboard/students" 
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22C55E]/10 text-[#0EA5E9] hover:from-[#0EA5E9] hover:to-[#22C55E] hover:text-white rounded-xl transition-all duration-300 font-semibold text-sm border border-[#0EA5E9]/20 hover:border-transparent"
            >
              View All Students
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#F97316] to-[#0EA5E9] rounded-full mr-3"></span>
              Upcoming Events
            </h2>
            <ul className="space-y-3 mb-4">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <li key={event.id} className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-[#F97316]/20 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#0F172A]">{event.title}</p>
                        <p className="text-sm text-[#64748B]">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-[#64748B] text-sm">No upcoming events.</p>
                </div>
              )}
            </ul>
            <Link 
              to="/teacher-dashboard/events" 
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#F97316]/10 to-[#0EA5E9]/10 text-[#F97316] hover:from-[#F97316] hover:to-[#0EA5E9] hover:text-white rounded-xl transition-all duration-300 font-semibold text-sm border border-[#F97316]/20 hover:border-transparent"
            >
              View All Events
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Recent PTMs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#22C55E] to-[#0EA5E9] rounded-full mr-3"></span>
              Recent PTMs
            </h2>
            <ul className="space-y-3 mb-4">
              {recentPTMs.length > 0 ? (
                recentPTMs.map(ptm => (
                  <li key={ptm.id} className="p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 hover:border-[#22C55E]/20 hover:shadow-sm transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-[#0F172A]">PTM with {ptm.studentName}</p>
                        <p className="text-sm text-[#64748B]">{ptm.date} • Grade: <span className="font-semibold text-[#22C55E]">{ptm.performanceSummary.overallGrade}</span></p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center py-8">
                  <svg className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-[#64748B] text-sm">No recent PTMs.</p>
                </div>
              )}
            </ul>
            <Link 
              to="/teacher-dashboard/ptm-history" 
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#22C55E]/10 to-[#0EA5E9]/10 text-[#22C55E] hover:from-[#22C55E] hover:to-[#0EA5E9] hover:text-white rounded-xl transition-all duration-300 font-semibold text-sm border border-[#22C55E]/20 hover:border-transparent"
            >
              View PTM History
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* AI Chatbot Quick Access */}
          <div className="bg-gradient-to-br from-[#0EA5E9]/5 via-[#22C55E]/5 to-[#F97316]/5 rounded-2xl shadow-sm border border-[#0EA5E9]/20 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-[#0F172A] mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-3"></span>
              AI Chatbot Assistant
            </h2>
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-[#0EA5E9] to-[#22C55E] rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-[#0F172A] mb-2 leading-relaxed">
                  Get quick answers about student performance, class schedules, and more from your AI assistant.
                </p>
                <ul className="space-y-1 text-sm text-[#64748B]">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Student performance insights
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Class schedule assistance
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Assignment recommendations
                  </li>
                </ul>
              </div>
            </div>
            <Link 
              to="/teacher-dashboard/ai-chatbot" 
              className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 text-sm"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Launch AI Chatbot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardOverview;

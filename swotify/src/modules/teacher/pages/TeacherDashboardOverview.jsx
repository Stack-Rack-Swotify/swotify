import React from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import mockEvents from '../../../data/mockEvents';
import mockPTMHistory from '../../../data/mockPTMHistory';
import mockAIRecommendations from '../../../data/mockAIRecommendations';

const TeacherDashboardOverview = ({ teacherName }) => {
  // --- Students Overview ---
  const totalStudents = mockClasses.reduce((acc, cls) => acc + cls.totalStudents, 0);
  const recentStudents = mockClasses.flatMap(cls => cls.students).slice(0, 5);

  // --- Classes Overview ---
  const totalClasses = mockClasses.length;
  const classesWithHighAttendance = mockClasses.filter(cls => {
    return Math.random() > 0.5;
  }).slice(0, 3);

  // --- Events Overview ---
  const upcomingEvents = mockEvents.filter(event => new Date(event.date) >= new Date()).slice(0, 3);
  const totalEvents = mockEvents.length;

  // --- PTM History Overview ---
  const recentPTMs = mockPTMHistory.slice(0, 3);
  const totalPTMs = mockPTMHistory.length;

  // --- Approvals Overview ---
  const pendingApprovals = mockAIRecommendations.filter(rec => rec.status === 'Pending');
  const recentPendingApprovals = pendingApprovals.slice(0, 3);

  return (
    <div className="bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Welcome, {teacherName}!
          </h1>
          <p className="text-slate-600 text-sm font-medium">Here's what's happening with your classes today.</p>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-slate-600 font-semibold mb-2">Total Students</p>
            <p className="text-3xl font-semibold text-blue-600">{totalStudents}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-slate-600 font-semibold mb-2">Total Classes</p>
            <p className="text-3xl font-semibold text-emerald-600">{totalClasses}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-slate-600 font-semibold mb-2">Upcoming Events</p>
            <p className="text-3xl font-semibold text-amber-600">{upcomingEvents.length}</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-slate-600 font-semibold mb-2">Recent PTMs</p>
            <p className="text-3xl font-semibold text-purple-600">{recentPTMs.length}</p>
          </div>

          {/* New Approvals Stat */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl flex items-center justify-center shadow-md">
                <svg className="w-7 h-7 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-slate-600 font-semibold mb-2">Pending Approvals</p>
            <p className="text-3xl font-semibold text-cyan-600">{pendingApprovals.length}</p>
          </div>
        </div>

        {/* Combined Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Students */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
              <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full mr-3"></span>
              Recent Students
            </h2>
            <ul className="space-y-3 mb-5">
              {recentStudents.length > 0 ? (
                recentStudents.map(student => (
                  <li key={student.id} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50/30 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-30"></div>
                      <img 
                        src={student.photo} 
                        alt={student.name} 
                        className="relative w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg ring-2 ring-blue-200" 
                      />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-600 rounded-full border-2 border-white shadow-md"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-900 truncate">{student.name}</p>
                      <p className="text-sm text-slate-600 font-medium">{student.details?.grade || 'N/A'}</p>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <p className="text-slate-600 text-sm font-medium">No recent students to display.</p>
                </div>
              )}
            </ul>
            <Link 
              to="/teacher-dashboard/students" 
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-xl rounded-xl transition-all duration-300 font-semibold text-sm hover:scale-105"
            >
              View All Students
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Pending Approvals Widget */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
              <span className="w-1.5 h-7 bg-gradient-to-b from-cyan-600 to-blue-600 rounded-full mr-3"></span>
              Pending Approvals
            </h2>
            <ul className="space-y-3 mb-5">
              {recentPendingApprovals.length > 0 ? (
                recentPendingApprovals.map(rec => (
                  <li key={rec.id} className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-cyan-50/30 border border-slate-200 hover:border-cyan-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-100 to-cyan-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-6 h-6 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">{rec.studentName}</p>
                        <p className="text-sm text-slate-600 font-medium truncate">{rec.recommendation}</p>
                        <span className="text-xs font-bold text-cyan-600 bg-cyan-50 px-2 py-0.5 rounded border border-cyan-100 mt-1 inline-block">{rec.category}</span>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center py-12">
                   <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                   </svg>
                  <p className="text-slate-600 text-sm font-medium">No pending approvals.</p>
                </div>
              )}
            </ul>
            <Link 
              to="/teacher-dashboard/approval" 
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:shadow-xl rounded-xl transition-all duration-300 font-semibold text-sm hover:scale-105"
            >
              Review All Approvals
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
              <span className="w-1.5 h-7 bg-gradient-to-b from-amber-600 to-blue-600 rounded-full mr-3"></span>
              Upcoming Events
            </h2>
            <ul className="space-y-3 mb-5">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <li key={event.id} className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-amber-50/30 border border-slate-200 hover:border-amber-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900">{event.title}</p>
                        <p className="text-sm text-slate-600 font-medium">{event.date} at {event.time}</p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-slate-600 text-sm font-medium">No upcoming events.</p>
                </div>
              )}
            </ul>
            <Link 
              to="/teacher-dashboard/events" 
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-amber-600 to-blue-600 text-white hover:shadow-xl rounded-xl transition-all duration-300 font-semibold text-sm hover:scale-105"
            >
              View All Events
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Recent PTMs */}
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
              <span className="w-1.5 h-7 bg-gradient-to-b from-emerald-600 to-blue-600 rounded-full mr-3"></span>
              Recent PTMs
            </h2>
            <ul className="space-y-3 mb-5">
              {recentPTMs.length > 0 ? (
                recentPTMs.map(ptm => (
                  <li key={ptm.id} className="p-4 rounded-xl bg-gradient-to-r from-slate-50 to-emerald-50/30 border border-slate-200 hover:border-emerald-300 hover:shadow-md transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                        <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900">PTM with {ptm.studentName}</p>
                        <p className="text-sm text-slate-600 font-medium">{ptm.date} • Grade: <span className="font-semibold text-emerald-600">{ptm.performanceSummary.overallGrade}</span></p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <div className="text-center py-12">
                  <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <p className="text-slate-600 text-sm font-medium">No recent PTMs.</p>
                </div>
              )}
            </ul>
            <Link 
              to="/teacher-dashboard/ptm-history" 
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white hover:shadow-xl rounded-xl transition-all duration-300 font-semibold text-sm hover:scale-105"
            >
              View PTM History
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* AI Chatbot Quick Access */}
          <div className="bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-2xl shadow-lg border-2 border-purple-200 p-6 hover:shadow-2xl transition-all duration-300">
            <h2 className="text-xl font-semibold text-slate-900 mb-5 flex items-center">
              <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full mr-3"></span>
              AI Chatbot Assistant
            </h2>
            <div className="flex items-start gap-4 mb-6">
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-lg opacity-40"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-9 h-9 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1">
                <p className="text-slate-900 mb-3 leading-relaxed font-medium">
                  Get quick answers about student performance, class schedules, and more from your AI assistant.
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Student performance insights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Class schedule assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Assignment recommendations</span>
                  </li>
                </ul>
              </div>
            </div>
            <Link 
              to="/teacher-dashboard/ai-chatbot" 
              className="flex items-center justify-center gap-2 w-full px-5 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 text-sm hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
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

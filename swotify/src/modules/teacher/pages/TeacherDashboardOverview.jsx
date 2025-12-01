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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Teacher Dashboard Overview</h1>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <p className="text-sm text-[#827979] font-medium">Total Students</p>
              <p className="text-3xl font-bold text-[#ff7300]">{totalStudents}</p>
            </div>
            <svg className="w-10 h-10 text-[#ff7300]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <p className="text-sm text-[#827979] font-medium">Total Classes</p>
              <p className="text-3xl font-bold text-[#9000ff]">{totalClasses}</p>
            </div>
            <svg className="w-10 h-10 text-[#9000ff]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <p className="text-sm text-[#827979] font-medium">Upcoming Events</p>
              <p className="text-3xl font-bold text-[#ff7300]">{upcomingEvents.length}</p>
            </div>
            <svg className="w-10 h-10 text-[#ff7300]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-center justify-between hover:shadow-lg transition-all duration-300">
            <div>
              <p className="text-sm text-[#827979] font-medium">Recent PTMs</p>
              <p className="text-3xl font-bold text-[#9000ff]">{recentPTMs.length}</p>
            </div>
            <svg className="w-10 h-10 text-[#9000ff]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
        </div>

        {/* Combined Information Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Students */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
              Recent Students
            </h2>
            <ul className="space-y-3">
              {recentStudents.length > 0 ? (
                recentStudents.map(student => (
                  <li key={student.id} className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <p className="font-medium text-gray-800">{student.name}</p>
                      <p className="text-sm text-[#827979]">{student.grade} - {student.section}</p>
                    </div>
                  </li>
                ))
              ) : (
                <p className="text-gray-600 text-sm">No recent students to display.</p>
              )}
            </ul>
            <Link 
              to="/teacher-dashboard/students" 
              className="mt-4 block text-center text-[#ff7300] hover:text-[#9000ff] transition-colors font-medium text-sm"
            >
              View All Students
            </Link>
          </div>

          {/* Upcoming Events */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
              Upcoming Events
            </h2>
            <ul className="space-y-3">
              {upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                  <li key={event.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="font-medium text-gray-800">{event.title}</p>
                    <p className="text-sm text-[#827979]">{event.date} at {event.time}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-600 text-sm">No upcoming events.</p>
              )}
            </ul>
            <Link 
              to="/teacher-dashboard/events" 
              className="mt-4 block text-center text-[#ff7300] hover:text-[#9000ff] transition-colors font-medium text-sm"
            >
              View All Events
            </Link>
          </div>

          {/* Recent PTMs */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
              Recent PTMs
            </h2>
            <ul className="space-y-3">
              {recentPTMs.length > 0 ? (
                recentPTMs.map(ptm => (
                  <li key={ptm.id} className="p-3 rounded-xl bg-gray-50 border border-gray-100">
                    <p className="font-medium text-gray-800">PTM with {ptm.studentName}</p>
                    <p className="text-sm text-[#827979]">{ptm.date} - Grade: {ptm.performanceSummary.overallGrade}</p>
                  </li>
                ))
              ) : (
                <p className="text-gray-600 text-sm">No recent PTMs.</p>
              )}
            </ul>
            <Link 
              to="/teacher-dashboard/ptm-history" 
              className="mt-4 block text-center text-[#ff7300] hover:text-[#9000ff] transition-colors font-medium text-sm"
            >
              View PTM History
            </Link>
          </div>

          {/* AI Chatbot Quick Access */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
              AI Chatbot
            </h2>
            <p className="text-gray-600 mb-4 text-sm">
              Get quick answers about student performance, class schedules, and more from your AI assistant.
            </p>
            <Link 
              to="/teacher-dashboard/ai-chatbot" 
              className="block w-full text-center px-4 py-2 bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white font-semibold rounded-xl text-sm hover:shadow-md transition-all duration-300"
            >
              Launch AI Chatbot
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboardOverview;
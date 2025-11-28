import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnalyticsGraph from '../components/AnalyticsGraph';

const HomePage = () => {
  // Dummy data for attendance overview
  const dummyAttendance = {
    totalClasses: 100,
    attendedClasses: 92,
    attendancePercentage: 92,
  };

  // Dummy data for subject-wise performance
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  const subjectPerformanceData = {
    'Mathematics': { score: 90, trend: 'up', graphData: [65, 70, 75, 80, 90] },
    'Physics': { score: 78, trend: 'flat', graphData: [70, 75, 72, 78, 78] },
    'Chemistry': { score: 85, trend: 'up', graphData: [75, 80, 82, 83, 85] },
    'Biology': { score: 92, trend: 'up', graphData: [80, 85, 88, 90, 92] },
    'Computer Science': { score: 88, trend: 'down', graphData: [90, 89, 87, 88, 88] },
  };

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const currentSubjectPerformance = subjectPerformanceData[selectedSubject];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-gray-800 mb-2">Student Dashboard</h3>
        <p className="text-gray-500 text-sm">Overview of your academic performance</p>
      </div>

      {/* Attendance Overview */}
      <div className="mb-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
        <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
          Attendance Overview
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#ff7300]/10 to-[#ff7300]/5 p-5 rounded-xl border border-[#ff7300]/20 hover:border-[#ff7300]/40 transition-all duration-300">
            <p className="text-xs font-medium text-[#827979] uppercase tracking-wide mb-2">Total Classes</p>
            <p className="text-3xl font-bold text-[#ff7300]">{dummyAttendance.totalClasses}</p>
          </div>
          <div className="bg-gradient-to-br from-[#9000ff]/10 to-[#9000ff]/5 p-5 rounded-xl border border-[#9000ff]/20 hover:border-[#9000ff]/40 transition-all duration-300">
            <p className="text-xs font-medium text-[#827979] uppercase tracking-wide mb-2">Attended</p>
            <p className="text-3xl font-bold text-[#9000ff]">{dummyAttendance.attendedClasses}</p>
          </div>
          <div className="bg-gradient-to-br from-[#827979]/10 to-[#827979]/5 p-5 rounded-xl border border-[#827979]/20 hover:border-[#827979]/40 transition-all duration-300">
            <p className="text-xs font-medium text-[#827979] uppercase tracking-wide mb-2">Percentage</p>
            <p className="text-3xl font-bold text-[#827979]">{dummyAttendance.attendancePercentage}%</p>
          </div>
        </div>
      </div>

      {/* Performance Analysis with Subject Dropdown */}
      <div className="mb-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
        <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
          Subject Performance Analysis
        </h4>
        
        <div className="mb-5">
          <label htmlFor="subject-select-home" className="block text-sm font-medium text-[#827979] mb-2">
            Select Subject
          </label>
          <select
            id="subject-select-home"
            className="w-full md:w-64 px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] bg-white text-gray-800 rounded-xl transition-all duration-200 hover:border-[#ff7300]/50"
            value={selectedSubject}
            onChange={handleSubjectChange}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {currentSubjectPerformance && (
          <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h5 className="text-base font-semibold text-gray-800 mb-3">{selectedSubject}</h5>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-[#827979] mb-1">Score</p>
                    <p className="text-2xl font-bold text-[#ff7300]">{currentSubjectPerformance.score}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#827979] mb-1">Trend</p>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                      currentSubjectPerformance.trend === 'up' 
                        ? 'bg-[#9000ff]/10 text-[#9000ff]' 
                        : currentSubjectPerformance.trend === 'down'
                        ? 'bg-[#ff7300]/10 text-[#ff7300]'
                        : 'bg-[#827979]/10 text-[#827979]'
                    }`}>
                      {currentSubjectPerformance.trend === 'up' ? '↑' : currentSubjectPerformance.trend === 'down' ? '↓' : '→'} {currentSubjectPerformance.trend}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <AnalyticsGraph 
              title={`${selectedSubject} Performance Trend`} 
              graphData={currentSubjectPerformance.graphData} 
            />
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
        <h4 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#827979] to-[#9000ff] rounded-full mr-3"></span>
          Quick Actions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="../report" 
            className="group bg-gradient-to-br from-[#ff7300] to-[#ff7300]/90 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-white">Generate Report</p>
              <p className="text-xs text-white/70 mt-1">Create academic summary</p>
            </div>
          </Link>
          
          <Link 
            to="../events" 
            className="group bg-gradient-to-br from-[#9000ff] to-[#9000ff]/90 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-white">View Events</p>
              <p className="text-xs text-white/70 mt-1">Check upcoming activities</p>
            </div>
          </Link>
          
          <Link 
            to="../chatbot" 
            className="group bg-gradient-to-br from-[#827979] to-[#827979]/90 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-white">Ask AI Chatbot</p>
              <p className="text-xs text-white/70 mt-1">Get instant help</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
  
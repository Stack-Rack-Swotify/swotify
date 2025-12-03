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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h3 className="text-3xl font-bold text-[#0F172A] mb-2">Student Dashboard</h3>
        <p className="text-[#64748B] text-sm">Overview of your academic performance</p>
      </div>

      {/* Attendance Overview */}
      <div className="mb-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
        <h4 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
          Attendance Overview
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 p-5 rounded-xl border border-[#0EA5E9]/20 hover:border-[#0EA5E9]/40 transition-all duration-300">
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-2">Total Classes</p>
            <p className="text-3xl font-bold text-[#0EA5E9]">{dummyAttendance.totalClasses}</p>
          </div>
          <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 p-5 rounded-xl border border-[#22C55E]/20 hover:border-[#22C55E]/40 transition-all duration-300">
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-2">Attended</p>
            <p className="text-3xl font-bold text-[#22C55E]">{dummyAttendance.attendedClasses}</p>
          </div>
          <div className="bg-gradient-to-br from-[#0F172A]/10 to-[#64748B]/5 p-5 rounded-xl border border-[#0F172A]/20 hover:border-[#0F172A]/40 transition-all duration-300">
            <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-2">Percentage</p>
            <p className="text-3xl font-bold text-[#0F172A]">{dummyAttendance.attendancePercentage}%</p>
          </div>
        </div>
      </div>

      {/* Performance Analysis with Subject Dropdown */}
      <div className="mb-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
        <h4 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
          Subject Performance Analysis
        </h4>
        
        <div className="mb-5">
          <label htmlFor="subject-select-home" className="block text-sm font-medium text-[#64748B] mb-2">
            Select Subject
          </label>
          <select
            id="subject-select-home"
            className="w-full md:w-64 px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#0EA5E9]/50"
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
                <h5 className="text-base font-semibold text-[#0F172A] mb-3">{selectedSubject}</h5>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-[#64748B] mb-1">Score</p>
                    <p className="text-2xl font-bold text-[#0EA5E9]">{currentSubjectPerformance.score}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] mb-1">Trend</p>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${
                      currentSubjectPerformance.trend === 'up' 
                        ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20' 
                        : currentSubjectPerformance.trend === 'down'
                        ? 'bg-[#E11D48]/10 text-[#E11D48] border-[#E11D48]/20'
                        : 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20'
                    }`}>
                      {currentSubjectPerformance.trend === 'up' ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      ) : currentSubjectPerformance.trend === 'down' ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14" />
                        </svg>
                      )}
                      {currentSubjectPerformance.trend.charAt(0).toUpperCase() + currentSubjectPerformance.trend.slice(1)}
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
        <h4 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
          Quick Actions
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link 
            to="../report" 
            className="group bg-gradient-to-br from-[#0EA5E9] to-[#0EA5E9]/90 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-white">Generate Report</p>
              <p className="text-xs text-white/80 mt-1">Create academic summary</p>
            </div>
          </Link>
          
          <Link 
            to="../events" 
            className="group bg-gradient-to-br from-[#22C55E] to-[#22C55E]/90 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-white">View Events</p>
              <p className="text-xs text-white/80 mt-1">Check upcoming activities</p>
            </div>
          </Link>
          
          <Link 
            to="../chatbot" 
            className="group bg-gradient-to-br from-[#0F172A] to-[#0F172A]/90 p-6 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-base font-semibold text-white">Ask AI Chatbot</p>
              <p className="text-xs text-white/80 mt-1">Get instant help</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

import React, { useState } from 'react';
import AnalyticsGraph from './AnalyticsGraph';

const PerformanceAnalysis = () => {
  // Dummy data for overall performance metrics
  const dummyPerformanceData = {
    overallScore: 85,
    lastMonthImprovement: 7,
    strongestSubject: 'Mathematics',
    weakestSubject: 'Physics',
    attendanceRate: 92,
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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#0F172A] mb-2 flex items-center">
          <span className="w-1 h-7 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
          Performance Analysis
        </h3>
        <p className="text-[#64748B] text-sm">Comprehensive overview of your academic performance</p>
      </div>
      
      {/* Summary of Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Overall Score */}
        <div className="bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 p-5 rounded-xl border border-[#0EA5E9]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-1">Overall Score</p>
          <p className="text-3xl font-bold text-[#0EA5E9]">{dummyPerformanceData.overallScore}%</p>
        </div>

        {/* Improvement */}
        <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 p-5 rounded-xl border border-[#22C55E]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#22C55E]/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <span className="text-xs font-medium text-[#22C55E] bg-[#22C55E]/10 px-2 py-1 rounded-full border border-[#22C55E]/20">
              Trending Up
            </span>
          </div>
          <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-1">Last Month Improvement</p>
          <p className="text-3xl font-bold text-[#22C55E]">+{dummyPerformanceData.lastMonthImprovement}%</p>
        </div>

        {/* Strongest Subject */}
        <div className="bg-gradient-to-br from-[#0EA5E9]/10 via-[#0F172A]/5 to-[#0EA5E9]/5 p-5 rounded-xl border border-[#0EA5E9]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9]/20 to-[#0F172A]/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-1">Strongest Subject</p>
          <p className="text-xl font-bold text-[#0EA5E9]">{dummyPerformanceData.strongestSubject}</p>
        </div>

        {/* Weakest Subject */}
        <div className="bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 p-5 rounded-xl border border-[#F97316]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#F97316]/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <span className="text-xs font-medium text-[#F97316] bg-[#F97316]/10 px-2 py-1 rounded-full border border-[#F97316]/20">
              Focus Area
            </span>
          </div>
          <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-1">Needs Improvement</p>
          <p className="text-xl font-bold text-[#F97316]">{dummyPerformanceData.weakestSubject}</p>
        </div>

        {/* Attendance Rate */}
        <div className="bg-gradient-to-br from-[#0EA5E9]/10 to-[#0F172A]/5 p-5 rounded-xl border border-[#0EA5E9]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide mb-2">Attendance Rate</p>
          <div className="flex items-end gap-3">
            <p className="text-3xl font-bold text-[#0EA5E9]">{dummyPerformanceData.attendanceRate}%</p>
            <div className="flex-1 mb-2">
              <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] rounded-full transition-all duration-500"
                  style={{ width: `${dummyPerformanceData.attendanceRate}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-wise Performance Section */}
      <div className="mt-6 p-6 border border-gray-100 rounded-xl bg-gradient-to-br from-gray-50 to-white">
        <h4 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
          Subject-wise Performance
        </h4>
        
        <div className="mb-5">
          <label htmlFor="subject-select" className="block text-sm font-medium text-[#64748B] mb-2">
            Select Subject
          </label>
          <select
            id="subject-select"
            className="w-full md:w-64 px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#0EA5E9]/50"
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
          <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-5">
              <div>
                <h5 className="text-lg font-bold text-[#0F172A] mb-3">{selectedSubject}</h5>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs text-[#64748B] mb-1">Current Score</p>
                    <p className="text-3xl font-bold text-[#0EA5E9]">{currentSubjectPerformance.score}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#64748B] mb-1">Performance Trend</p>
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
            <div className="mt-5">
              <AnalyticsGraph 
                title={`${selectedSubject} Performance Trend`} 
                graphData={currentSubjectPerformance.graphData} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Insights Section */}
      <div className="mt-6 p-6 border border-gray-100 rounded-xl bg-gradient-to-br from-[#0EA5E9]/5 via-white to-[#0F172A]/5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9]/20 to-[#0F172A]/20 rounded-xl flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-[#0F172A] mb-2">Performance Insights</h4>
            <p className="text-sm text-[#64748B] leading-relaxed">
              Detailed insights into your performance are displayed here, utilizing various data points and analytical models. Your overall performance shows a positive trend with consistent improvement across most subjects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;

import React, { useState, useEffect } from 'react';
import AnalyticsGraph from './AnalyticsGraph';
import mockClasses from '../../../data/mockClasses';

const PerformanceAnalysis = ({ studentId = 's1' }) => {
  const [studentPerformance, setStudentPerformance] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  useEffect(() => {
    let foundStudent = null;
    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) break;
    }

    if (foundStudent && foundStudent.performance) {
        setStudentPerformance(foundStudent.performance);
    } else {
        setStudentPerformance(null);
    }
  }, [studentId]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  if (!studentPerformance) {
      return (
        <div className="p-8 text-center bg-white/90 rounded-2xl shadow-xl border-2 border-slate-200/60">
            <p className="text-slate-500">No performance data available for analysis.</p>
        </div>
      );
  }

  const subjects = Object.keys(studentPerformance);
  const currentSubject = subjects.includes(selectedSubject) ? selectedSubject : subjects[0];
  const currentSubjectPerformance = studentPerformance[currentSubject];

  // Calculate Overall Score (simple average of current scores for now)
  const overallScore = Math.round(Object.values(studentPerformance).reduce((acc, curr) => acc + curr.score, 0) / subjects.length);
  
  // Find strongest and weakest subjects
  let strongestSubject = subjects[0];
  let weakestSubject = subjects[0];
  subjects.forEach(sub => {
      if (studentPerformance[sub].score > studentPerformance[strongestSubject].score) strongestSubject = sub;
      if (studentPerformance[sub].score < studentPerformance[weakestSubject].score) weakestSubject = sub;
  });

  return (
    <div className="group relative bg-white/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Premium Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Premium Header */}
      <div className="relative mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur opacity-50 animate-pulse"></div>
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Performance Analysis
            </h3>
            <p className="text-slate-600 text-sm mt-1 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
              Comprehensive overview of your academic performance
            </p>
          </div>
        </div>
      </div>
      
      {/* Premium KPI Cards Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Overall Score */}
        <div className="group/card relative bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-xl border-2 border-cyan-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <p className="relative text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Overall Score</p>
          <p className="relative text-4xl font-bold text-cyan-600">{overallScore}%</p>
        </div>

        {/* Strongest Subject */}
        <div className="group/card relative bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-purple-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
          </div>
          <p className="relative text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Strongest Subject</p>
          <p className="relative text-xl font-bold text-purple-600">{strongestSubject}</p>
        </div>

        {/* Weakest Subject */}
        <div className="group/card relative bg-gradient-to-br from-orange-50 to-red-50 p-5 rounded-xl border-2 border-orange-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 to-red-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            </div>
            <span className="relative text-xs font-semibold text-orange-600 bg-orange-100 px-3 py-1.5 rounded-full border-2 border-orange-300 shadow-sm">
              Focus Area
            </span>
          </div>
          <p className="relative text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Needs Improvement</p>
          <p className="relative text-xl font-bold text-orange-600">{weakestSubject}</p>
        </div>
      </div>

      {/* Premium Subject-wise Performance Section */}
      <div className="relative p-6 border-2 border-slate-200 rounded-2xl bg-gradient-to-br from-slate-50/50 via-white/50 to-slate-50/50 backdrop-blur-sm shadow-lg mb-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 bg-gradient-to-b from-cyan-500 via-blue-500 to-purple-500 rounded-full"></div>
          <h4 className="text-xl font-bold text-slate-900">
            Subject-wise Performance
          </h4>
        </div>
        
        {/* Premium Select Dropdown */}
        <div className="mb-6">
          <label htmlFor="subject-select" className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
            <svg className="w-5 h-5 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Select Subject
          </label>
          <div className="relative">
            <select
              id="subject-select"
              className="w-full md:w-80 px-5 py-4 text-sm border-2 border-slate-200 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 bg-white text-slate-900 rounded-xl transition-all duration-300 hover:border-cyan-300 appearance-none cursor-pointer font-medium shadow-sm"
              value={currentSubject}
              onChange={handleSubjectChange}
            >
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            <svg className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {currentSubjectPerformance && (
          <div className="bg-white/90 backdrop-blur-sm p-6 rounded-2xl border-2 border-slate-200 shadow-lg">
            <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-6">
              <div>
                <h5 className="text-xl font-bold text-slate-900 mb-4">{currentSubject}</h5>
                <div className="flex flex-wrap items-start gap-6">
                  <div className="p-4 rounded-xl bg-gradient-to-br from-cyan-50 to-blue-50 border-2 border-cyan-300 shadow-lg">
                    <p className="text-xs text-slate-600 font-semibold mb-2">Current Score</p>
                    <p className="text-3xl font-bold text-cyan-600">{currentSubjectPerformance.score}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 font-semibold mb-3">Performance Trend</p>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border-2 shadow-lg ${
                      currentSubjectPerformance.trend === 'up' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-300' 
                        : currentSubjectPerformance.trend === 'down'
                        ? 'bg-rose-50 text-rose-600 border-rose-300'
                        : 'bg-orange-50 text-orange-600 border-orange-300'
                    }`}>
                      {currentSubjectPerformance.trend === 'up' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      ) : currentSubjectPerformance.trend === 'down' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      )}
                      {currentSubjectPerformance.trend.charAt(0).toUpperCase() + currentSubjectPerformance.trend.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <AnalyticsGraph 
                title={`${currentSubject} Performance Trend`} 
                graphData={currentSubjectPerformance.graphData} 
              />
            </div>
          </div>
        )}
      </div>

      {/* Premium Insights Section */}
      <div className="relative p-6 border-2 border-slate-200 rounded-2xl bg-gradient-to-br from-cyan-50/50 via-blue-50/50 to-purple-50/50 backdrop-blur-sm shadow-lg">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur opacity-50 animate-pulse"></div>
            <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Performance Insights</h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              Detailed insights into your performance are displayed here, utilizing various data points and analytical models. Your overall performance shows a positive trend with consistent improvement across most subjects.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalysis;
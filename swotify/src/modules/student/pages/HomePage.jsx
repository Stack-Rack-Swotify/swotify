import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnalyticsGraph from '../components/AnalyticsGraph';
import mockClasses from '../../../data/mockClasses';

const HomePage = ({ studentId = 's1' }) => {
  const [studentData, setStudentData] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  useEffect(() => {
    let foundStudent = null;
    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) break;
    }
    setStudentData(foundStudent);
  }, [studentId]);

  if (!studentData) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="section-card px-8 py-6 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border-2 border-[#ea580c] border-t-transparent rounded-full animate-spin"></div>
            <span className="text-slate-600 font-medium">Loading student data...</span>
          </div>
        </div>
      </div>
    );
  }

  const attendancePercentage = parseInt(studentData.details?.attendance?.replace('%', '') || '0');
  const dummyAttendance = {
    totalClasses: 100,
    attendedClasses: Math.round(100 * (attendancePercentage / 100)),
    attendancePercentage: attendancePercentage,
  };

  const subjectPerformanceData = studentData.performance || {};
  const subjects = Object.keys(subjectPerformanceData);

  const currentSubject = subjects.includes(selectedSubject) ? selectedSubject : subjects[0];
  const currentSubjectPerformance = subjectPerformanceData[currentSubject];

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ea580c] flex items-center justify-center shadow-lg">
            <span className="text-xl">👋</span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-800">
              Welcome back, <span className="text-[#ea580c]">{studentData.name.split(' ')[0]}!</span>
            </h3>
            <p className="text-slate-500 text-sm font-medium">Overview of your academic performance</p>
          </div>
        </div>
      </div>

      {/* Attendance Overview Card */}
      <div className="section-card p-6 hover:shadow-lg transition-shadow duration-300">
        {/* Card Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#334155] flex items-center justify-center shadow">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-slate-800">Attendance Overview</h4>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Total Classes */}
          <div className="stat-card hover-lift">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Total Classes</p>
            <p className="text-3xl font-bold text-[#334155]">{dummyAttendance.totalClasses}</p>
          </div>

          {/* Attended */}
          <div className="stat-card hover-lift">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#334155]"></div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Attended</p>
            <p className="text-3xl font-bold text-[#1e293b]">{dummyAttendance.attendedClasses}</p>
          </div>

          {/* Percentage */}
          <div className="stat-card hover-lift">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-[#ea580c]"></div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Percentage</p>
            <p className="text-3xl font-bold text-[#ea580c]">{dummyAttendance.attendancePercentage}%</p>
          </div>
        </div>
      </div>

      {/* Performance Analysis Card */}
      <div className="section-card p-6 hover:shadow-lg transition-shadow duration-300">
        {/* Card Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#ea580c] flex items-center justify-center shadow">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-slate-800">Subject Performance Analysis</h4>
        </div>

        {/* Subject Selector */}
        <div className="mb-5">
          <label htmlFor="subject-select-home" className="block text-sm font-semibold text-slate-600 mb-2">
            Select Subject
          </label>
          <select
            id="subject-select-home"
            className="w-full md:w-72 px-4 py-2.5 text-sm font-medium border border-slate-200 rounded-xl bg-white text-slate-800 focus:border-[#ea580c] focus:ring-2 focus:ring-orange-100 transition-all cursor-pointer"
            value={currentSubject}
            onChange={handleSubjectChange}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>{subject}</option>
            ))}
          </select>
        </div>

        {currentSubjectPerformance ? (
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-4">
              <div>
                <h5 className="text-base font-bold text-slate-800 mb-3">{currentSubject}</h5>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Score</p>
                    <p className="text-2xl font-bold text-[#ea580c]">{currentSubjectPerformance.score}%</p>
                  </div>
                  <div className="w-px h-12 bg-slate-200"></div>
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Trend</p>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold border ${currentSubjectPerformance.trend === 'up'
                      ? 'bg-green-50 text-green-600 border-green-200'
                      : currentSubjectPerformance.trend === 'down'
                        ? 'bg-red-50 text-red-600 border-red-200'
                        : 'bg-orange-50 text-[#ea580c] border-orange-200'
                      }`}>
                      {currentSubjectPerformance.trend === 'up' ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                      ) : currentSubjectPerformance.trend === 'down' ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                        </svg>
                      )}
                      {currentSubjectPerformance.trend.charAt(0).toUpperCase() + currentSubjectPerformance.trend.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <AnalyticsGraph
              title={`${currentSubject} Performance Trend`}
              graphData={currentSubjectPerformance.graphData}
            />
          </div>
        ) : (
          <div className="bg-slate-50 p-6 text-center rounded-xl border border-slate-100">
            <p className="text-slate-500 font-medium">No performance data available for this student.</p>
          </div>
        )}
      </div>

      {/* Quick Actions Card */}
      <div className="section-card p-6 hover:shadow-lg transition-shadow duration-300">
        {/* Card Header */}
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-[#ea580c] flex items-center justify-center shadow">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-slate-800">Quick Actions</h4>
        </div>

        {/* Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Generate Report */}
          <Link
            to="../report"
            className="group p-5 bg-[#334155] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-600/50"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-base font-bold text-white mb-0.5">Generate Report</p>
              <p className="text-sm text-white/80">Create academic summary</p>
            </div>
          </Link>

          {/* View Events */}
          <Link
            to="../events"
            className="group p-5 bg-[#1e293b] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-slate-700/50"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-base font-bold text-white mb-0.5">View Events</p>
              <p className="text-sm text-white/80">Check upcoming activities</p>
            </div>
          </Link>

          {/* AI Chatbot */}
          <Link
            to="../chatbot"
            className="group p-5 bg-[#ea580c] rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-orange-400/50"
          >
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform shadow">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-base font-bold text-white mb-0.5">Ask AI Chatbot</p>
              <p className="text-sm text-white/80">Get instant help</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
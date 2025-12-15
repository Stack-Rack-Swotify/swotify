import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AnalyticsGraph from '../components/AnalyticsGraph';
import mockClasses from '../../../data/mockClasses';

const HomePage = ({ studentId = 's1' }) => { // Accept studentId prop
  const [studentData, setStudentData] = useState(null);
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  // Fetch student data when studentId changes
  useEffect(() => {
    let foundStudent = null;
    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) break;
    }
    setStudentData(foundStudent);
  }, [studentId]);

  if (!studentData) {
    return <div className="p-6 text-center text-slate-600 dark:text-gray-400">Loading student data...</div>;
  }

  // Derive attendance data (Mock logic or use data if available)
  // Since 'details.attendance' is a string "95%", we can parse it.
  const attendancePercentage = parseInt(studentData.details?.attendance?.replace('%', '') || '0');
  const dummyAttendance = {
    totalClasses: 100, // Assuming a fixed total for now or could be mocked
    attendedClasses: Math.round(100 * (attendancePercentage / 100)),
    attendancePercentage: attendancePercentage,
  };

  // Get subject performance data
  const subjectPerformanceData = studentData.performance || {};
  const subjects = Object.keys(subjectPerformanceData);
  
  // Ensure selected subject is valid
  const currentSubject = subjects.includes(selectedSubject) ? selectedSubject : subjects[0];
  const currentSubjectPerformance = subjectPerformanceData[currentSubject];

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Premium Header */}
      <div className="mb-10">
        <h3 className="text-4xl font-semibold bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Welcome back, {studentData.name.split(' ')[0]}!
        </h3>
        <p className="text-slate-600 dark:text-gray-400 text-base">Overview of your academic performance</p>
      </div>

      {/* Premium Attendance Overview */}
      <div className="group mb-8 p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl blur opacity-50 animate-pulse"></div>
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shadow-2xl">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h4 className="text-2xl font-semibold text-slate-900 dark:text-gray-100">Attendance Overview</h4>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="group/card bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-6 rounded-2xl border-2 border-cyan-300 dark:border-cyan-700 hover:border-cyan-400 dark:hover:border-cyan-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <p className="text-xs font-medium text-slate-600 dark:text-gray-400 uppercase tracking-wide mb-3">Total Classes</p>
            <p className="text-4xl font-semibold text-cyan-600 dark:text-cyan-400">{dummyAttendance.totalClasses}</p>
          </div>
          <div className="group/card bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-6 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <p className="text-xs font-medium text-slate-600 dark:text-gray-400 uppercase tracking-wide mb-3">Attended</p>
            <p className="text-4xl font-semibold text-emerald-600 dark:text-emerald-400">{dummyAttendance.attendedClasses}</p>
          </div>
          <div className="group/card bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-6 rounded-2xl border-2 border-purple-300 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-600 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <p className="text-xs font-medium text-slate-600 dark:text-gray-400 uppercase tracking-wide mb-3">Percentage</p>
            <p className="text-4xl font-semibold text-purple-600 dark:text-purple-400">{dummyAttendance.attendancePercentage}%</p>
          </div>
        </div>
      </div>

      {/* Premium Performance Analysis */}
      <div className="group mb-8 p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl blur opacity-50 animate-pulse"></div>
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-2xl">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <h4 className="text-2xl font-semibold text-slate-900 dark:text-gray-100">Subject Performance Analysis</h4>
        </div>
        
        <div className="relative mb-6">
          <label htmlFor="subject-select-home" className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-3">
            Select Subject
          </label>
          <select
            id="subject-select-home"
            className="w-full md:w-80 px-5 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-cyan-500/20 focus:border-cyan-500 dark:focus:border-cyan-400 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 rounded-xl transition-all duration-200 hover:border-cyan-400 dark:hover:border-cyan-500"
            value={currentSubject}
            onChange={handleSubjectChange}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {currentSubjectPerformance ? (
          <div className="relative bg-gradient-to-br from-slate-50 to-white dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl border-2 border-slate-200 dark:border-gray-600">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-6">
              <div>
                <h5 className="text-xl font-semibold text-slate-900 dark:text-gray-100 mb-4">{currentSubject}</h5>
                <div className="flex items-center gap-8">
                  <div>
                    <p className="text-xs text-slate-600 dark:text-gray-400 mb-2">Score</p>
                    <p className="text-3xl font-semibold text-cyan-600 dark:text-cyan-400">{currentSubjectPerformance.score}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-600 dark:text-gray-400 mb-2">Trend</p>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border-2 ${
                      currentSubjectPerformance.trend === 'up' 
                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700' 
                        : currentSubjectPerformance.trend === 'down'
                        ? 'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-700'
                        : 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-700'
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
            <AnalyticsGraph 
              title={`${currentSubject} Performance Trend`} 
              graphData={currentSubjectPerformance.graphData} 
            />
          </div>
        ) : (
          <div className="p-4 text-center text-slate-500">No performance data available for this student.</div>
        )}
      </div>

      {/* Premium Quick Actions */}
      <div className="group p-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        
        <div className="relative flex items-center gap-4 mb-8">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-amber-500 rounded-2xl blur opacity-50 animate-pulse"></div>
            <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-600 to-amber-600 flex items-center justify-center shadow-2xl">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          <h4 className="text-2xl font-semibold text-slate-900 dark:text-gray-100">Quick Actions</h4>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link 
            to="../report" 
            className="group/action bg-gradient-to-br from-cyan-600 to-blue-600 dark:from-cyan-700 dark:to-blue-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/action:opacity-100 transition-opacity"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover/action:scale-110 group-hover/action:rotate-6 transition-all duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-white mb-2">Generate Report</p>
              <p className="text-sm text-white/80">Create academic summary</p>
            </div>
          </Link>
          
          <Link 
            to="../events" 
            className="group/action bg-gradient-to-br from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/action:opacity-100 transition-opacity"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover/action:scale-110 group-hover/action:rotate-6 transition-all duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-white mb-2">View Events</p>
              <p className="text-sm text-white/80">Check upcoming activities</p>
            </div>
          </Link>
          
          <Link 
            to="../chatbot" 
            className="group/action bg-gradient-to-br from-purple-600 to-indigo-600 dark:from-purple-700 dark:to-indigo-700 p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/action:opacity-100 transition-opacity"></div>
            <div className="relative flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 group-hover/action:scale-110 group-hover/action:rotate-6 transition-all duration-300 shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <p className="text-lg font-semibold text-white mb-2">Ask AI Chatbot</p>
              <p className="text-sm text-white/80">Get instant help</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
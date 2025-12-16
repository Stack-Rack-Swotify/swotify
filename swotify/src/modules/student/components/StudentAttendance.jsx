import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses';

const StudentAttendance = ({ studentId = 's1' }) => {
  const [attendanceData, setAttendanceData] = useState(null);

  useEffect(() => {
    let foundStudent = null;
    // Find the student in mockClasses
    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) break;
    }

    if (foundStudent) {
        // Parse attendance percentage from string "95%" to integer 95
        const percentage = parseInt(foundStudent.details.attendance.replace('%', ''));
        setAttendanceData({
            totalClasses: 100, // Mock total
            attendedClasses: percentage, // Mock attended based on percentage
            absentClasses: 100 - percentage,
            attendancePercentage: percentage,
            lastMonthPercentage: percentage - 2, // Mock last month
        });
    }
  }, [studentId]);

  if (!attendanceData) {
      return <div className="p-4 text-center text-slate-500">Loading attendance data...</div>;
  }

  return (
    <div className="group relative bg-white/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Premium Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Premium Header */}
      <div className="relative mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-500 rounded-xl blur opacity-50 animate-pulse"></div>
            <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-600 via-blue-600 to-emerald-600 flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Student Attendance
            </h3>
            <p className="text-slate-600 text-sm mt-1 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
              Your attendance record and statistics are summarized below
            </p>
          </div>
        </div>
      </div>
      
      {/* Premium Attendance Cards Grid */}
      <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
        {/* Total Classes */}
        <div className="group/card relative bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-xl border-2 border-cyan-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <p className="relative text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Total Classes</p>
          <p className="relative text-4xl font-bold text-cyan-600">{attendanceData.totalClasses}</p>
        </div>

        {/* Attended Classes */}
        <div className="group/card relative bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border-2 border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="relative text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Attended Classes</p>
          <p className="relative text-4xl font-bold text-emerald-600">{attendanceData.attendedClasses}</p>
        </div>

        {/* Absent Classes */}
        <div className="group/card relative bg-gradient-to-br from-rose-50 to-red-50 p-5 rounded-xl border-2 border-rose-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-red-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <p className="relative text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Absent Classes</p>
          <p className="relative text-4xl font-bold text-rose-600">{attendanceData.absentClasses}</p>
        </div>

        {/* Attendance Percentage */}
        <div className="group/card relative bg-gradient-to-br from-blue-50 to-purple-50 p-5 rounded-xl border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:scale-105 lg:col-span-2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <span className="relative text-sm font-semibold text-blue-600 bg-blue-100 px-4 py-2 rounded-full border-2 border-blue-300 shadow-sm">
              Current
            </span>
          </div>
          <p className="relative text-xs font-semibold text-slate-700 uppercase tracking-wide mb-3">Attendance Percentage</p>
          <div className="relative flex items-end gap-4">
            <p className="text-5xl font-bold text-blue-600">{attendanceData.attendancePercentage}%</p>
            <div className="flex-1 mb-3">
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${attendanceData.attendancePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Month's Performance */}
        <div className="group/card relative bg-gradient-to-br from-slate-50 to-gray-50 p-5 rounded-xl border-2 border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-500/10 to-gray-500/10 opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-slate-600 to-gray-600 rounded-lg flex items-center justify-center shadow-lg group-hover/card:rotate-12 transition-transform">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            {attendanceData.lastMonthPercentage > attendanceData.attendancePercentage ? (
              <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                </svg>
              </div>
            ) : (
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            )}
          </div>
          <p className="relative text-xs font-semibold text-slate-700 uppercase tracking-wide mb-2">Last Month</p>
          <p className="relative text-4xl font-bold text-slate-900">{attendanceData.lastMonthPercentage}%</p>
        </div>
      </div>
      
      {/* Premium Insights Section */}
      <div className="relative p-6 border-2 border-slate-200 rounded-2xl bg-gradient-to-br from-slate-50/50 via-white/50 to-slate-50/50 backdrop-blur-sm shadow-lg">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-500 rounded-xl blur opacity-50 animate-pulse"></div>
            <div className="relative w-14 h-14 bg-gradient-to-br from-cyan-600 via-blue-600 to-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-bold text-slate-900 mb-2">Attendance Summary</h4>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              This is a summary of your attendance records. You're maintaining a strong attendance rate of {attendanceData.attendancePercentage}%.
            </p>
            {attendanceData.attendancePercentage >= 90 ? (
              <div className="flex items-center gap-3 text-emerald-600 bg-gradient-to-r from-emerald-50 to-teal-50 px-4 py-3 rounded-xl inline-flex border-2 border-emerald-300 shadow-lg hover:scale-105 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold">Excellent Attendance!</span>
              </div>
            ) : attendanceData.attendancePercentage >= 75 ? (
              <div className="flex items-center gap-3 text-orange-600 bg-gradient-to-r from-orange-50 to-amber-50 px-4 py-3 rounded-xl inline-flex border-2 border-orange-300 shadow-lg hover:scale-105 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold">Good Attendance</span>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-rose-600 bg-gradient-to-r from-rose-50 to-red-50 px-4 py-3 rounded-xl inline-flex border-2 border-rose-300 shadow-lg hover:scale-105 transition-transform">
                <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-red-500 rounded-lg flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <span className="text-sm font-semibold">Needs Improvement</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAttendance;
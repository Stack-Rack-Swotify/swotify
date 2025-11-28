import React from 'react';

const StudentAttendance = () => {
  // Dummy data for student attendance
  const dummyAttendance = {
    totalClasses: 100,
    attendedClasses: 92,
    absentClasses: 8,
    attendancePercentage: 92,
    lastMonthPercentage: 95,
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2 flex items-center">
          <span className="w-1 h-7 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
          Student Attendance
        </h3>
        <p className="text-[#827979] text-sm">Your attendance record and statistics are summarized below</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Total Classes */}
        <div className="bg-gradient-to-br from-[#ff7300]/10 to-[#ff7300]/5 p-5 rounded-xl border border-[#ff7300]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#ff7300]/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
          </div>
          <p className="text-xs font-medium text-[#827979] uppercase tracking-wide mb-1">Total Classes</p>
          <p className="text-3xl font-bold text-[#ff7300]">{dummyAttendance.totalClasses}</p>
        </div>

        {/* Attended Classes */}
        <div className="bg-gradient-to-br from-[#9000ff]/10 to-[#9000ff]/5 p-5 rounded-xl border border-[#9000ff]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#9000ff]/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-xs font-medium text-[#827979] uppercase tracking-wide mb-1">Attended Classes</p>
          <p className="text-3xl font-bold text-[#9000ff]">{dummyAttendance.attendedClasses}</p>
        </div>

        {/* Absent Classes */}
        <div className="bg-gradient-to-br from-[#827979]/10 to-[#827979]/5 p-5 rounded-xl border border-[#827979]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#827979]/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          </div>
          <p className="text-xs font-medium text-[#827979] uppercase tracking-wide mb-1">Absent Classes</p>
          <p className="text-3xl font-bold text-[#827979]">{dummyAttendance.absentClasses}</p>
        </div>

        {/* Attendance Percentage */}
        <div className="bg-gradient-to-br from-[#ff7300]/10 via-[#9000ff]/5 to-[#ff7300]/5 p-5 rounded-xl border border-[#ff7300]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#ff7300]/20 to-[#9000ff]/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-[#9000ff] bg-[#9000ff]/10 px-3 py-1 rounded-full border border-[#9000ff]/20">
                Current
              </span>
            </div>
          </div>
          <p className="text-xs font-medium text-[#827979] uppercase tracking-wide mb-1">Attendance Percentage</p>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-bold text-[#ff7300]">{dummyAttendance.attendancePercentage}%</p>
            <div className="flex-1">
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#ff7300] to-[#9000ff] rounded-full transition-all duration-500"
                  style={{ width: `${dummyAttendance.attendancePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Month's Performance */}
        <div className="bg-gradient-to-br from-[#9000ff]/10 to-[#827979]/5 p-5 rounded-xl border border-[#9000ff]/20 hover:shadow-md transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#9000ff]/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            {dummyAttendance.lastMonthPercentage > dummyAttendance.attendancePercentage ? (
              <svg className="w-5 h-5 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
              </svg>
            )}
          </div>
          <p className="text-xs font-medium text-[#827979] uppercase tracking-wide mb-1">Last Month</p>
          <p className="text-3xl font-bold text-[#9000ff]">{dummyAttendance.lastMonthPercentage}%</p>
        </div>
      </div>
      
      {/* Insights Section */}
      <div className="mt-6 p-6 border border-gray-200 rounded-xl bg-gradient-to-br from-gray-50 to-white">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#ff7300]/10 to-[#9000ff]/10 rounded-lg flex items-center justify-center flex-shrink-0">
            <svg className="w-6 h-6 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div className="flex-1">
            <h4 className="text-base font-semibold text-gray-800 mb-2">Attendance Summary</h4>
            <p className="text-sm text-[#827979] leading-relaxed mb-3">
              This is a summary of your attendance records. You're maintaining a strong attendance rate of {dummyAttendance.attendancePercentage}%.
            </p>
            {dummyAttendance.attendancePercentage >= 90 ? (
              <div className="flex items-center gap-2 text-[#9000ff] bg-[#9000ff]/10 px-3 py-2 rounded-lg inline-flex border border-[#9000ff]/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold">Excellent Attendance!</span>
              </div>
            ) : dummyAttendance.attendancePercentage >= 75 ? (
              <div className="flex items-center gap-2 text-[#ff7300] bg-[#ff7300]/10 px-3 py-2 rounded-lg inline-flex border border-[#ff7300]/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-semibold">Good Attendance</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-[#827979] bg-[#827979]/10 px-3 py-2 rounded-lg inline-flex border border-[#827979]/20">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
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

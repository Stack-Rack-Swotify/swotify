// swotify/src/modules/student/components/StudentAttendance.jsx
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
    <div className="p-4 bg-teal-900 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-100 mb-4">Student Attendance</h3>
      <p className="text-gray-300 mb-6">Your attendance record and statistics are summarized below.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-sky-800/30 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-sky-200">Total Classes</p>
          <p className="text-2xl font-bold text-sky-100">{dummyAttendance.totalClasses}</p>
        </div>
        <div className="bg-emerald-800/30 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-emerald-200">Attended Classes</p>
          <p className="text-2xl font-bold text-emerald-100">{dummyAttendance.attendedClasses}</p>
        </div>
        <div className="bg-rose-800/30 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-rose-200">Absent Classes</p>
          <p className="text-2xl font-bold text-rose-100">{dummyAttendance.absentClasses}</p>
        </div>
        <div className="bg-cyan-800/30 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-cyan-200">Attendance Percentage</p>
          <p className="text-2xl font-bold text-cyan-100">{dummyAttendance.attendancePercentage}%</p>
        </div>
        <div className="bg-amber-800/30 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-amber-200">Last Month's Performance</p>
          <p className="text-2xl font-bold text-amber-100">{dummyAttendance.lastMonthPercentage}%</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 border border-teal-800 rounded-lg bg-teal-800/30">
        <p className="text-gray-300">
          This is a summary of your attendance records. Detailed attendance logs or calendar views could be implemented here.
        </p>
      </div>
    </div>
  );
};

export default StudentAttendance;

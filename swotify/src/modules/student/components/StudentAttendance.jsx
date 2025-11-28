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
    <div className="p-4 bg-black/20 backdrop-blur-lg rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-white mb-4">Student Attendance</h3>
      <p className="text-gray-300 mb-6">Your attendance record and statistics are summarized below.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-900/50 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-blue-200">Total Classes</p>
          <p className="text-2xl font-bold text-blue-100">{dummyAttendance.totalClasses}</p>
        </div>
        <div className="bg-green-900/50 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-green-200">Attended Classes</p>
          <p className="text-2xl font-bold text-green-100">{dummyAttendance.attendedClasses}</p>
        </div>
        <div className="bg-red-900/50 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-red-200">Absent Classes</p>
          <p className="text-2xl font-bold text-red-100">{dummyAttendance.absentClasses}</p>
        </div>
        <div className="bg-purple-900/50 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-purple-200">Attendance Percentage</p>
          <p className="text-2xl font-bold text-purple-100">{dummyAttendance.attendancePercentage}%</p>
        </div>
        <div className="bg-yellow-900/50 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-yellow-200">Last Month's Performance</p>
          <p className="text-2xl font-bold text-yellow-100">{dummyAttendance.lastMonthPercentage}%</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 border border-white/10 rounded-lg bg-black/20">
        <p className="text-gray-300">
          This is a summary of your attendance records. Detailed attendance logs or calendar views could be implemented here.
        </p>
      </div>
    </div>
  );
};

export default StudentAttendance;

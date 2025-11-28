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
    <div className="p-4 bg-white rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Student Attendance</h3>
      <p className="text-gray-600 mb-6">Your attendance record and statistics are summarized below.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-100 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-blue-800">Total Classes</p>
          <p className="text-2xl font-bold text-blue-900">{dummyAttendance.totalClasses}</p>
        </div>
        <div className="bg-green-100 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-green-800">Attended Classes</p>
          <p className="text-2xl font-bold text-green-900">{dummyAttendance.attendedClasses}</p>
        </div>
        <div className="bg-red-100 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-red-800">Absent Classes</p>
          <p className="text-2xl font-bold text-red-900">{dummyAttendance.absentClasses}</p>
        </div>
        <div className="bg-indigo-100 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-indigo-800">Attendance Percentage</p>
          <p className="text-2xl font-bold text-indigo-900">{dummyAttendance.attendancePercentage}%</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-yellow-800">Last Month's Performance</p>
          <p className="text-2xl font-bold text-yellow-900">{dummyAttendance.lastMonthPercentage}%</p>
        </div>
      </div>
      
      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-600">
          This is a summary of your attendance records. Detailed attendance logs or calendar views could be implemented here.
        </p>
      </div>
    </div>
  );
};

export default StudentAttendance;

// swotify/src/modules/student/components/StudentAttendance.jsx
import React from 'react';

const StudentAttendance = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Attendance</h3>
      <p className="text-gray-700">Your attendance record and statistics will be shown here.</p>
      {/* Placeholder for attendance calendar/summary */}
      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-600">Attendance data goes here (e.g., present days, absent days, percentage).</p>
      </div>
    </div>
  );
};

export default StudentAttendance;

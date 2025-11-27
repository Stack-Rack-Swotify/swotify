// swotify/src/modules/student/components/StudentMarks.jsx
import React from 'react';

const StudentMarks = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Student Marks</h3>
      <p className="text-gray-700">All your academic marks and grades will be listed here.</p>
      {/* Placeholder for marks table/list */}
      <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <p className="text-gray-600">Marks data goes here (e.g., subject-wise scores, total percentage).</p>
      </div>
    </div>
  );
};

export default StudentMarks;

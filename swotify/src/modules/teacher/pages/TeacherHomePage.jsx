import React from 'react';

const TeacherHomePage = () => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">Teacher Dashboard Overview</h2>
      <p className="text-gray-600">
        Welcome to your Teacher Dashboard!
      </p>
      <ul className="mt-4 text-gray-600 list-disc list-inside">
        <li>Quick access to class management.</li>
        <li>View upcoming assignments and deadlines.</li>
        <li>Monitor student performance trends.</li>
        <li>Receive important announcements.</li>
      </ul>
      <p className="mt-4 text-gray-600">
        Use the navigation on the left to manage your classes, students, and other resources.
      </p>
    </div>
  );
};

export default TeacherHomePage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses'; // Import the new mock data

const ClassPage = () => {
  const [selectedClassId, setSelectedClassId] = useState(mockClasses[0]?.id || '');
  const [currentClass, setCurrentClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const classData = mockClasses.find(c => c.id === selectedClassId);
    setCurrentClass(classData);
    setSelectedStudent(null); // Clear selected student when class changes
  }, [selectedClassId]);

  if (!currentClass) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">No classes available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/teacher-dashboard" className="text-blue-600 hover:underline mb-4 block">
        &larr; Back to Dashboard
      </Link>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Class Management
      </h1>

      {/* Class Selector Dropdown */}
      <div className="mb-6">
        <label htmlFor="class-select" className="block text-lg font-medium text-gray-700 mb-2">
          Select Class:
        </label>
        <select
          id="class-select"
          value={selectedClassId}
          onChange={(e) => setSelectedClassId(e.target.value)}
          className="block w-full md:w-1/2 lg:w-1/3 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {mockClasses.map(classItem => (
            <option key={classItem.id} value={classItem.id}>
              {classItem.className}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-3xl font-semibold text-gray-800 mb-6">
        {currentClass.className}
      </h2>

      {/* Class Analysis Section */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">Class Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-xl font-bold text-blue-800">{currentClass.totalStudents}</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Average Score</p>
            <p className="text-xl font-bold text-green-800">{currentClass.classPerformance.averageScore}%</p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Pass Rate</p>
            <p className="text-xl font-bold text-yellow-800">{currentClass.classPerformance.passRate}</p>
          </div>
          <div className="bg-red-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">Highest Score</p>
            <p className="text-xl font-bold text-red-800">{currentClass.classPerformance.highestScore}%</p>
          </div>
        </div>
      </div>

      {/* Student List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-2xl font-semibold text-gray-700 mb-4">Students List</h3>
          <ul className="space-y-4">
            {currentClass.students.map((student) => (
              <li
                key={student.id}
                className={`flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedStudent?.id === student.id ? 'bg-blue-100' : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedStudent(student)}
              >
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-300"
                />
                <Link to={`/teacher/student/${student.id}`} className="text-lg font-medium text-blue-600 hover:underline">
                  {student.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Selected Student Basic Details (optional, as full details are on StudentDetailPage) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          {selectedStudent ? (
            <div>
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                Selected Student: {selectedStudent.name}
              </h3>
              <div className="flex flex-col items-center mb-6">
                <img
                  src={selectedStudent.photo}
                  alt={selectedStudent.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 mb-4"
                />
                <p className="text-xl font-bold text-gray-800">{selectedStudent.name}</p>
              </div>
              <p className="text-gray-700">
                  <span className="font-semibold">Email:</span> {selectedStudent.details.email}
              </p>
              <p className="text-gray-700">
                  <span className="font-semibold">Grade:</span> {selectedStudent.details.grade}
              </p>
              <p className="text-gray-700">
                  <span className="font-semibold">Attendance:</span> {selectedStudent.details.attendance}
              </p>
              <Link
                to={`/teacher/student/${selectedStudent.id}`}
                className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                View Full Details & Grades
              </Link>
            </div>
          ) : (
            <p className="text-gray-600 text-center text-lg mt-10">
              Select a student from the list to view their basic details, or click their name to view full details and grades.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassPage;
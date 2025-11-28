import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses'; // Import the mock data

const AllStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Flatten all students from all classes into a single array
  const allStudents = mockClasses.flatMap(classData => classData.students);

  // Filter students based on search term
  const filteredStudents = allStudents.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">All Students</h1>

      {/* Search Bar */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search students by name..."
          className="w-full md:w-1/2 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Student List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Student List */}
        <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Students ({filteredStudents.length})</h2>
          {filteredStudents.length > 0 ? (
            <ul className="space-y-4">
              {filteredStudents.map((student) => (
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
          ) : (
            <p className="text-gray-600">No students found matching your search.</p>
          )}
        </div>

        {/* Selected Student Basic Details (optional preview) */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
          {selectedStudent ? (
            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                Selected Student: {selectedStudent.name}
              </h2>
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

export default AllStudentsPage;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses'; // Import the mock data

const AllStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All'); // State for selected grade
  const [selectedSection, setSelectedSection] = useState('All'); // State for selected section
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Extract unique grades and sections from mockClasses
  const grades = ['All', ...new Set(mockClasses.map(cls => cls.grade))];
  const sections = ['All', ...new Set(mockClasses.map(cls => cls.section))];

  // Flatten all students from all classes into a single array, adding class info to each student
  const allStudentsWithClassInfo = mockClasses.flatMap(classData =>
    classData.students.map(student => ({
      ...student,
      grade: classData.grade,
      section: classData.section,
    }))
  );

  // Filter students based on search term, selected grade, and selected section
  const filteredStudents = allStudentsWithClassInfo.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    const matchesSection = selectedSection === 'All' || student.section === selectedSection;
    return matchesSearch && matchesGrade && matchesSection;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">All Students</h1>

      <div className="flex flex-wrap gap-4 mb-6">
        {/* Grade Dropdown */}
        <div>
          <label htmlFor="grade-select" className="block text-sm font-medium text-gray-700">Grade</label>
          <select
            id="grade-select"
            value={selectedGrade}
            onChange={(e) => {
              setSelectedGrade(e.target.value);
              setSelectedSection('All'); // Reset section when grade changes
              setSelectedStudent(null);
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
          >
            {grades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
        </div>

        {/* Section Dropdown */}
        <div>
          <label htmlFor="section-select" className="block text-sm font-medium text-gray-700">Section</label>
          <select
            id="section-select"
            value={selectedSection}
            onChange={(e) => {
              setSelectedSection(e.target.value);
              setSelectedStudent(null);
            }}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md text-gray-900"
          >
            {sections.map(section => (
              <option key={section} value={section}>{section}</option>
            ))}
          </select>
        </div>

        {/* Search Bar */}
        <div className="flex-grow">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">Search Name</label>
          <input
            id="search"
            type="text"
            placeholder="Search students by name..."
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-gray-900"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedStudent(null);
            }}
          />
        </div>
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
                  <div>
                    <Link to={`/teacher/student/${student.id}`} className="text-lg font-medium text-blue-600 hover:underline">
                      {student.name}
                    </Link>
                    <p className="text-sm text-gray-500">{student.grade} - {student.section}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600">No students found matching your criteria.</p>
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
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses'; // Reusing mock student data

const AdminStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');

  // Extract unique grades and sections from mockClasses
  const grades = ['All', ...new Set(mockClasses.map(cls => cls.grade))];
  const sections = ['All', ...new Set(mockClasses.map(cls => cls.section))];

  // Flatten all students from all classes into a single array
  const allStudentsWithClassInfo = mockClasses.flatMap(classData =>
    classData.students.map(student => ({
      ...student,
      grade: classData.grade,
      section: classData.section,
      className: classData.className, // Include class name for display
    }))
  );

  // Filter students based on search term, selected grade, and selected section
  const filteredStudents = allStudentsWithClassInfo.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    const matchesSection = selectedSection === 'All' || student.section === selectedSection;
    return matchesSearch && matchesGrade && matchesSection;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Management</h1>
        <p className="text-[#827979] text-sm">Manage and view information for all students</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
          Search & Filter Students
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Grade Dropdown */}
          <div>
            <label htmlFor="grade-select" className="block text-sm font-medium text-[#827979] mb-2">
              Grade
            </label>
            <div className="relative">
              <select
                id="grade-select"
                value={selectedGrade}
                onChange={(e) => {
                  setSelectedGrade(e.target.value);
                  setSelectedSection('All'); // Reset section when grade changes
                }}
                className="w-full px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] bg-white text-gray-800 rounded-xl transition-all duration-200 hover:border-[#ff7300]/50 appearance-none cursor-pointer"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#827979] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Section Dropdown */}
          <div>
            <label htmlFor="section-select" className="block text-sm font-medium text-[#827979] mb-2">
              Section
            </label>
            <div className="relative">
              <select
                id="section-select"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9000ff]/50 focus:border-[#9000ff] bg-white text-gray-800 rounded-xl transition-all duration-200 hover:border-[#9000ff]/50 appearance-none cursor-pointer"
              >
                {sections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#827979] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-[#827979] mb-2">
              Search Name or Email
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search students..."
                className="w-full px-4 py-3 pl-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#827979]/50 focus:border-[#827979] transition-all duration-200 hover:border-[#827979]/50 text-gray-800 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
            Students Directory
          </h2>
          <span className="bg-gradient-to-r from-[#ff7300]/10 to-[#9000ff]/10 text-[#ff7300] px-4 py-2 rounded-full text-sm font-semibold border border-[#ff7300]/20 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {filteredStudents.length} {filteredStudents.length === 1 ? 'Student' : 'Students'}
          </span>
        </div>
      </div>

      {/* Student Cards Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <Link
              key={student.id}
              to={`/admin-dashboard/student-profile/${student.id}`} // Placeholder for detailed profile page
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              {/* Student Photo */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff7300] to-[#9000ff] p-1">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                {/* Grade Badge */}
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#9000ff] rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                  <span className="text-xs text-white font-bold">
                    {student.grade.slice(-2)}
                  </span>
                </div>
              </div>

              {/* Student Name */}
              <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#ff7300] transition-colors">
                {student.name}
              </h3>

              {/* Class Info */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-gradient-to-r from-[#ff7300]/10 to-[#9000ff]/10 text-[#ff7300] px-3 py-1 rounded-full text-xs font-semibold border border-[#ff7300]/20">
                  {student.grade}
                </span>
                <span className="bg-gradient-to-r from-[#9000ff]/10 to-[#ff7300]/10 text-[#9000ff] px-3 py-1 rounded-full text-xs font-semibold border border-[#9000ff]/20">
                  Section {student.section}
                </span>
              </div>

              {/* Quick Info */}
              <div className="w-full space-y-2 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#827979] flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </span>
                  <span className="text-gray-800 font-medium truncate ml-2 max-w-[120px]" title={student.details.email}>
                    {student.details.email.split('@')[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#827979] flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Attendance
                  </span>
                  <span className="text-gray-800 font-medium">{student.details.attendance}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#ff7300]/10 to-[#9000ff]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#ff7300]/20">
            <svg className="w-12 h-12 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Students Found</h3>
          <p className="text-[#827979] text-sm max-w-md mx-auto mb-6">
            We couldn't find any students matching your criteria. Try adjusting your filters or search term.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGrade('All');
              setSelectedSection('All');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminStudentsPage;
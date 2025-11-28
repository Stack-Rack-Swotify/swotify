import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';

const AllStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Extract unique grades and sections from mockClasses
  const grades = ['All', ...new Set(mockClasses.map(cls => cls.grade))];
  const sections = ['All', ...new Set(mockClasses.map(cls => cls.section))];

  // Flatten all students from all classes into a single array
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">All Students</h1>
        <p className="text-[#827979] text-sm">Manage and view student information</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
          Search & Filter
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Grade Dropdown */}
          <div>
            <label htmlFor="grade-select" className="block text-sm font-medium text-[#827979] mb-2">
              Grade
            </label>
            <select
              id="grade-select"
              value={selectedGrade}
              onChange={(e) => {
                setSelectedGrade(e.target.value);
                setSelectedSection('All');
                setSelectedStudent(null);
              }}
              className="w-full px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] bg-white text-gray-800 rounded-xl transition-all duration-200 hover:border-[#ff7300]/50"
            >
              {grades.map(grade => (
                <option key={grade} value={grade}>{grade}</option>
              ))}
            </select>
          </div>

          {/* Section Dropdown */}
          <div>
            <label htmlFor="section-select" className="block text-sm font-medium text-[#827979] mb-2">
              Section
            </label>
            <select
              id="section-select"
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setSelectedStudent(null);
              }}
              className="w-full px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#9000ff]/50 focus:border-[#9000ff] bg-white text-gray-800 rounded-xl transition-all duration-200 hover:border-[#9000ff]/50"
            >
              {sections.map(section => (
                <option key={section} value={section}>{section}</option>
              ))}
            </select>
          </div>

          {/* Search Bar */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-[#827979] mb-2">
              Search Name
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search students..."
                className="w-full px-4 py-3 pl-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#827979]/50 focus:border-[#827979] transition-all duration-200 hover:border-[#827979]/50 text-gray-800"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setSelectedStudent(null);
                }}
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Student List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-gray-800 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
              Students
            </h2>
            <span className="bg-[#ff7300]/10 text-[#ff7300] px-3 py-1 rounded-full text-sm font-semibold border border-[#ff7300]/20">
              {filteredStudents.length}
            </span>
          </div>
          
          {filteredStudents.length > 0 ? (
            <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                    selectedStudent?.id === student.id 
                      ? 'bg-gradient-to-r from-[#ff7300]/10 to-[#9000ff]/10 border-[#ff7300]/30 shadow-sm' 
                      : 'hover:bg-gray-50 border-transparent hover:border-gray-200'
                  }`}
                  onClick={() => setSelectedStudent(student)}
                >
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#ff7300]/20"
                  />
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/teacher/student/${student.id}`} 
                      className="text-sm font-semibold text-gray-800 hover:text-[#ff7300] transition-colors block truncate"
                    >
                      {student.name}
                    </Link>
                    <p className="text-xs text-[#827979]">{student.grade} - {student.section}</p>
                  </div>
                  <svg className="w-5 h-5 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-[#827979]/30 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              <p className="text-[#827979] text-sm">No students found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Selected Student Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
          {selectedStudent ? (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#827979] to-[#9000ff] rounded-full mr-3"></span>
                Student Details
              </h2>
              
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#ff7300] to-[#9000ff] p-1">
                    <img
                      src={selectedStudent.photo}
                      alt={selectedStudent.name}
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-[#9000ff] text-white rounded-full p-2 shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-1">{selectedStudent.name}</h3>
                <span className="bg-gradient-to-r from-[#ff7300]/10 to-[#9000ff]/10 text-[#827979] px-4 py-1 rounded-full text-sm font-medium border border-[#ff7300]/20">
                  {selectedStudent.grade} - Section {selectedStudent.section}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-[#ff7300]/10 to-[#ff7300]/5 p-5 rounded-xl border border-[#ff7300]/20 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#ff7300]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-[#827979] uppercase tracking-wide">Email</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{selectedStudent.details.email}</p>
                </div>

                <div className="bg-gradient-to-br from-[#9000ff]/10 to-[#9000ff]/5 p-5 rounded-xl border border-[#9000ff]/20 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#9000ff]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-[#827979] uppercase tracking-wide">Grade</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{selectedStudent.details.grade}</p>
                </div>

                <div className="bg-gradient-to-br from-[#827979]/10 to-[#827979]/5 p-5 rounded-xl border border-[#827979]/20 md:col-span-2 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#827979]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-[#827979] uppercase tracking-wide">Attendance</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-800">{selectedStudent.details.attendance}</p>
                </div>
              </div>

              <Link
                to={`/teacher/student/${selectedStudent.id}`}
                className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                View Full Details & Grades
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-[#ff7300]/10 to-[#9000ff]/10 rounded-full flex items-center justify-center mb-6 border-2 border-[#ff7300]/20">
                <svg className="w-12 h-12 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">No Student Selected</h3>
              <p className="text-[#827979] text-sm text-center max-w-md">
                Select a student from the list to view their basic details, or click their name to view full details and grades.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ff7300;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #9000ff;
        }
      `}</style>
    </div>
  );
};

export default AllStudentsPage;

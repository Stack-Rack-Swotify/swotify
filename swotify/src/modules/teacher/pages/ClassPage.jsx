import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';

const ClassPage = () => {
  const [selectedClassId, setSelectedClassId] = useState(mockClasses[0]?.id || '');
  const [currentClass, setCurrentClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const classData = mockClasses.find(c => c.id === selectedClassId);
    setCurrentClass(classData);
    setSelectedStudent(null);
  }, [selectedClassId]);

  if (!currentClass) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#0EA5E9]/20">
            <svg className="w-12 h-12 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <p className="text-xl font-semibold text-[#0F172A] mb-2">No Classes Available</p>
          <p className="text-[#64748B]">Please contact administration to add classes.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Class Management</h1>
        <p className="text-[#64748B] text-sm">Manage students and monitor class performance</p>
      </div>

      {/* Class Selector */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <label htmlFor="class-select" className="block text-sm font-semibold text-[#0F172A] mb-3 flex items-center">
          <svg className="w-5 h-5 text-[#0EA5E9] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          Select Class
        </label>
        <div className="relative">
          <select
            id="class-select"
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            className="w-full md:w-1/2 lg:w-1/3 px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#0EA5E9]/50 appearance-none cursor-pointer font-medium"
          >
            {mockClasses.map(classItem => (
              <option key={classItem.id} value={classItem.id}>
                {classItem.className}
              </option>
            ))}
          </select>
          <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none md:right-[calc(50%-12px)] lg:right-[calc(33.33%-12px)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Class Header */}
      <div className="bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] rounded-2xl shadow-lg p-8 mb-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-2">{currentClass.className}</h2>
            <p className="text-white/90 text-sm">Grade {currentClass.grade} - Section {currentClass.section}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </div>

      {/* Class Analysis Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <h3 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
          Class Analysis
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 p-5 rounded-xl border border-[#0EA5E9]/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Total Students</span>
              <div className="w-8 h-8 bg-[#0EA5E9]/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#0EA5E9]">{currentClass.totalStudents}</p>
          </div>

          <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 p-5 rounded-xl border border-[#22C55E]/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Average Score</span>
              <div className="w-8 h-8 bg-[#22C55E]/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#22C55E]">{currentClass.classPerformance.averageScore}%</p>
          </div>

          <div className="bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 p-5 rounded-xl border border-[#F97316]/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Pass Rate</span>
              <div className="w-8 h-8 bg-[#F97316]/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#F97316]">{currentClass.classPerformance.passRate}</p>
          </div>

          <div className="bg-gradient-to-br from-[#0F172A]/10 to-[#64748B]/5 p-5 rounded-xl border border-[#0F172A]/20 hover:shadow-md transition-all duration-300">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Highest Score</span>
              <div className="w-8 h-8 bg-gradient-to-r from-[#0EA5E9]/20 to-[#22C55E]/20 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-[#0F172A]">{currentClass.classPerformance.highestScore}%</p>
          </div>
        </div>
      </div>

      {/* Student List and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student List */}
        <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-lg font-semibold text-[#0F172A] flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-3"></span>
              Students
            </h3>
            <span className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#22C55E]/10 text-[#0EA5E9] px-3 py-1 rounded-full text-sm font-semibold border border-[#0EA5E9]/20">
              {currentClass.students.length}
            </span>
          </div>
          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            {currentClass.students.map((student) => (
              <div
                key={student.id}
                className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 border ${
                  selectedStudent?.id === student.id 
                    ? 'bg-gradient-to-r from-[#0EA5E9]/10 to-[#22C55E]/10 border-[#0EA5E9]/30 shadow-sm' 
                    : 'hover:bg-gray-50 border-transparent hover:border-gray-100'
                }`}
                onClick={() => setSelectedStudent(student)}
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#0EA5E9]"
                  />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#22C55E] rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1 min-w-0">
                  <Link 
                    to={`/teacher-dashboard/student-profile/${student.id}`} 
                    className="text-sm font-semibold text-[#0F172A] hover:text-[#0EA5E9] transition-colors block truncate"
                  >
                    {student.name}
                  </Link>
                  <p className="text-xs text-[#64748B]">View Details</p>
                </div>
                <svg className="w-5 h-5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        {/* Selected Student Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
          {selectedStudent ? (
            <div>
              <h3 className="text-xl font-semibold text-[#0F172A] mb-6 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#0F172A] to-[#64748B] rounded-full mr-3"></span>
                Student Details
              </h3>
              
              <div className="flex flex-col items-center mb-8">
                <div className="relative mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#22C55E] p-1">
                    <img
                      src={selectedStudent.photo}
                      alt={selectedStudent.name}
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-[#0EA5E9] text-white rounded-full p-2 shadow-lg">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                    </svg>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-[#0F172A] mb-2">{selectedStudent.name}</h4>
                <span className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#22C55E]/10 text-[#0EA5E9] px-4 py-1.5 rounded-full text-sm font-medium border border-[#0EA5E9]/20">
                  {currentClass.className}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-6">
                <div className="bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 p-5 rounded-xl border border-[#0EA5E9]/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#0EA5E9]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Email</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">{selectedStudent.details.email}</p>
                </div>

                <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 p-5 rounded-xl border border-[#22C55E]/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#22C55E]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Grade</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">{selectedStudent.details.grade}</p>
                </div>

                <div className="bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 p-5 rounded-xl border border-[#F97316]/20">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-[#F97316]/20 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Attendance</span>
                  </div>
                  <p className="text-sm font-semibold text-[#0F172A]">{selectedStudent.details.attendance}</p>
                </div>
              </div>

              <Link
                to={`/teacher-dashboard/student-profile/${selectedStudent.id}`}
                className="group w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
              >
                View Full Details & Grades
                <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#0EA5E9]/20">
                <svg className="w-12 h-12 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#0F172A] mb-2">No Student Selected</h3>
              <p className="text-[#64748B] text-sm text-center max-w-md">
                Select a student from the list to view their basic details, or click their name to view full details and grades.
              </p>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #0EA5E9 0%, #22C55E 100%);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #22C55E 0%, #0EA5E9 100%);
        }
      `}</style>
    </div>
  );
};

export default ClassPage;

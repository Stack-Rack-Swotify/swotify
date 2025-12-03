import React, { useState } from 'react';
import mockClasses from '../../../data/mockClasses';
import mockStaff from '../../../data/mockStaff';

const SchoolManagementPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState({ type: '', visible: false });
  
  const [assignments, setAssignments] = useState(() => {
    // Initial assignments from mock data
    const initial = {};
    mockClasses.forEach(cls => {
      initial[cls.id] = {
        teachers: [],
        students: cls.students.map(s => s.id),
      };
    });
    return initial;
  });

  const availableTeachers = mockStaff.filter(member => member.role === 'Teacher');
  const allStudents = mockClasses.flatMap(cls => cls.students);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedTeacher('');
    setSelectedStudent('');
    setShowSuccessMessage({ type: '', visible: false });
  };

  const handleAssignTeacher = () => {
    if (selectedClass && selectedTeacher) {
      setAssignments(prev => {
        const newAssignments = { ...prev };
        if (!newAssignments[selectedClass]) {
          newAssignments[selectedClass] = { teachers: [], students: [] };
        }
        if (!newAssignments[selectedClass].teachers.includes(selectedTeacher)) {
          newAssignments[selectedClass].teachers.push(selectedTeacher);
        }
        return newAssignments;
      });
      setShowSuccessMessage({ type: 'teacher', visible: true });
      setSelectedTeacher('');
      setTimeout(() => setShowSuccessMessage({ type: '', visible: false }), 3000);
    }
  };

  const handleAssignStudent = () => {
    if (selectedClass && selectedStudent) {
      setAssignments(prev => {
        const newAssignments = { ...prev };
        if (!newAssignments[selectedClass]) {
          newAssignments[selectedClass] = { teachers: [], students: [] };
        }
        if (!newAssignments[selectedClass].students.includes(selectedStudent)) {
          newAssignments[selectedClass].students.push(selectedStudent);
        }
        return newAssignments;
      });
      setShowSuccessMessage({ type: 'student', visible: true });
      setSelectedStudent('');
      setTimeout(() => setShowSuccessMessage({ type: '', visible: false }), 3000);
    }
  };

  const handleRemoveTeacher = (teacherId) => {
    setAssignments(prev => {
      const newAssignments = { ...prev };
      newAssignments[selectedClass].teachers = newAssignments[selectedClass].teachers.filter(id => id !== teacherId);
      return newAssignments;
    });
  };

  const handleRemoveStudent = (studentId) => {
    setAssignments(prev => {
      const newAssignments = { ...prev };
      newAssignments[selectedClass].students = newAssignments[selectedClass].students.filter(id => id !== studentId);
      return newAssignments;
    });
  };

  const getClassDetails = (classId) => mockClasses.find(cls => cls.id === classId);
  const getTeacher = (teacherId) => availableTeachers.find(t => t.id === teacherId);
  const getStudent = (studentId) => allStudents.find(s => s.id === studentId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">School Management</h1>
          <p className="text-[#64748B] text-sm">Assign teachers and students to classes efficiently</p>
        </div>

        {/* Success Messages */}
        {showSuccessMessage.visible && (
          <div className="mb-6 bg-gradient-to-r from-[#22C55E]/10 to-[#0EA5E9]/10 border border-[#22C55E]/30 rounded-xl p-4 flex items-center gap-3 animate-fade-in shadow-sm">
            <div className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">
                {showSuccessMessage.type === 'teacher' ? 'Teacher assigned successfully!' : 'Student assigned successfully!'}
              </p>
              <p className="text-xs text-[#64748B]">The assignment has been saved to the system.</p>
            </div>
          </div>
        )}

        {/* Class Selection */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-[#0F172A]">Select Class</h2>
          </div>
          <div className="relative">
            <select
              value={selectedClass}
              onChange={handleClassChange}
              className="w-full px-4 py-3 pl-12 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] transition-all duration-200 text-[#0F172A] bg-white appearance-none cursor-pointer hover:border-[#0EA5E9]/50"
            >
              <option value="">-- Select a Class --</option>
              {mockClasses.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.className} • Grade {cls.grade} • Section {cls.section}</option>
              ))}
            </select>
            <svg className="absolute left-4 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <svg className="absolute right-4 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {selectedClass && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Assign Teacher Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-[#0F172A]">Assign Teacher</h2>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <select
                    value={selectedTeacher}
                    onChange={(e) => setSelectedTeacher(e.target.value)}
                    className="w-full px-4 py-3 pl-12 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316] transition-all duration-200 text-[#0F172A] bg-white appearance-none cursor-pointer hover:border-[#F97316]/50"
                  >
                    <option value="">-- Select a Teacher --</option>
                    {availableTeachers.map(teacher => (
                      <option key={teacher.id} value={teacher.id}>
                        {teacher.name} • {teacher.subject}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute left-4 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <svg className="absolute right-4 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <button
                  onClick={handleAssignTeacher}
                  disabled={!selectedTeacher}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#F97316] to-[#F97316]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Assign Teacher
                </button>
              </div>

              {/* Assigned Teachers List */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-4">
                  Assigned Teachers ({assignments[selectedClass]?.teachers.length || 0})
                </h3>
                {assignments[selectedClass]?.teachers.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {assignments[selectedClass].teachers.map(teacherId => {
                      const teacher = getTeacher(teacherId);
                      return teacher ? (
                        <div key={teacherId} className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#F97316]/5 to-white rounded-xl border border-gray-100 hover:border-[#F97316]/30 transition-all">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#F97316]/90 p-0.5">
                            <img
                              src={teacher.photo}
                              alt={teacher.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#0F172A] truncate">{teacher.name}</p>
                            <p className="text-xs text-[#64748B]">{teacher.subject}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveTeacher(teacherId)}
                            className="p-2 text-[#E11D48] hover:bg-[#E11D48]/10 rounded-lg transition-colors"
                            title="Remove teacher"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-gray-100">
                      <svg className="w-8 h-8 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#64748B]">No teachers assigned yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Assign Student Section */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold text-[#0F172A]">Assign Student</h2>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <select
                    value={selectedStudent}
                    onChange={(e) => setSelectedStudent(e.target.value)}
                    className="w-full px-4 py-3 pl-12 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] transition-all duration-200 text-[#0F172A] bg-white appearance-none cursor-pointer hover:border-[#22C55E]/50"
                  >
                    <option value="">-- Select a Student --</option>
                    {allStudents.map(student => (
                      <option key={student.id} value={student.id}>
                        {student.name}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute left-4 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <svg className="absolute right-4 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>

                <button
                  onClick={handleAssignStudent}
                  disabled={!selectedStudent}
                  className="w-full px-6 py-3 bg-gradient-to-r from-[#22C55E] to-[#22C55E]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Assign Student
                </button>
              </div>

              {/* Assigned Students List */}
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h3 className="text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-4">
                  Assigned Students ({assignments[selectedClass]?.students.length || 0})
                </h3>
                {assignments[selectedClass]?.students.length > 0 ? (
                  <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar">
                    {assignments[selectedClass].students.map(studentId => {
                      const student = getStudent(studentId);
                      return student ? (
                        <div key={studentId} className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#22C55E]/5 to-white rounded-xl border border-gray-100 hover:border-[#22C55E]/30 transition-all">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#22C55E] to-[#22C55E]/90 p-0.5">
                            <img
                              src={student.photo}
                              alt={student.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#0F172A] truncate">{student.name}</p>
                            <p className="text-xs text-[#64748B]">{student.details?.email || 'No email'}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveStudent(studentId)}
                            className="p-2 text-[#E11D48] hover:bg-[#E11D48]/10 rounded-lg transition-colors"
                            title="Remove student"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : null;
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-gray-100">
                      <svg className="w-8 h-8 text-[#94A3B8]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-[#64748B]">No students assigned yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
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

export default SchoolManagementPage;

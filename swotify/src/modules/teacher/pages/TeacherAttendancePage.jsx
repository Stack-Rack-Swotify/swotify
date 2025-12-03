import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses';

const TeacherAttendancePage = () => {
  const [selectedClassId, setSelectedClassId] = useState('');
  const [currentClassStudents, setCurrentClassStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // { studentId: { date: status } }
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    // Flatten all students from all classes initially to get all possible student IDs
    const allStudents = mockClasses.flatMap(classData =>
      classData.students.map(student => ({
        ...student,
        classId: classData.id,
        className: classData.className,
      }))
    );

    // Load attendance from local storage or initialize
    const storedAttendance = JSON.parse(localStorage.getItem('attendance')) || {};
    setAttendance(storedAttendance);

    // Set initial selected class if available
    if (mockClasses.length > 0) {
      setSelectedClassId(mockClasses[0].id);
    }
  }, []);

  useEffect(() => {
    const classData = mockClasses.find(c => c.id === selectedClassId);
    if (classData) {
      setCurrentClassStudents(classData.students);
    } else {
      setCurrentClassStudents([]);
    }
  }, [selectedClassId]);

  const handleMarkAttendance = (studentId, status) => {
    setAttendance(prevAttendance => {
      const newAttendance = {
        ...prevAttendance,
        [studentId]: {
          ...prevAttendance[studentId],
          [selectedDate]: status,
        },
      };
      localStorage.setItem('attendance', JSON.stringify(newAttendance));
      return newAttendance;
    });
  };

  const getAttendanceStatus = (studentId) => {
    return attendance[studentId]?.[selectedDate] || 'unmarked';
  };

  // Calculate attendance stats for the selected date
  const getAttendanceStats = () => {
    let present = 0;
    let absent = 0;
    let unmarked = 0;

    currentClassStudents.forEach(student => {
      const status = getAttendanceStatus(student.id);
      if (status === 'present') present++;
      else if (status === 'absent') absent++;
      else unmarked++;
    });

    return { present, absent, unmarked, total: currentClassStudents.length };
  };

  const stats = getAttendanceStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Student Attendance</h1>
          <p className="text-[#64748B] text-sm">Mark daily attendance for your students</p>
        </div>

        {/* Controls: Class Selector and Date Picker */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
            Select Class & Date
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Selector */}
            <div>
              <label htmlFor="class-select" className="block text-sm font-medium text-[#64748B] mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Select Class
              </label>
              <div className="relative">
                <select
                  id="class-select"
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] transition-all duration-200 text-[#0F172A] bg-white appearance-none cursor-pointer"
                >
                  {mockClasses.map(classItem => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.className}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label htmlFor="date-picker" className="block text-sm font-medium text-[#64748B] mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Select Date
              </label>
              <input
                type="date"
                id="date-picker"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] transition-all duration-200 text-[#0F172A] bg-white"
              />
            </div>
          </div>
        </div>

        {/* Attendance Statistics */}
        {currentClassStudents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase tracking-wide font-medium">Total</p>
                  <p className="text-2xl font-bold text-[#0F172A]">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase tracking-wide font-medium">Present</p>
                  <p className="text-2xl font-bold text-[#22C55E]">{stats.present}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#E11D48]/10 to-[#E11D48]/5 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#E11D48]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase tracking-wide font-medium">Absent</p>
                  <p className="text-2xl font-bold text-[#E11D48]">{stats.absent}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 rounded-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-[#64748B] uppercase tracking-wide font-medium">Unmarked</p>
                  <p className="text-2xl font-bold text-[#F97316]">{stats.unmarked}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Student List for Attendance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-3"></span>
            Students in {mockClasses.find(c => c.id === selectedClassId)?.className}
          </h2>
          
          {currentClassStudents.length > 0 ? (
            <div className="space-y-3">
              {currentClassStudents.map(student => {
                const status = getAttendanceStatus(student.id);
                return (
                  <div 
                    key={student.id} 
                    className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                      status === 'present' 
                        ? 'bg-gradient-to-r from-[#22C55E]/5 to-[#22C55E]/10 border-[#22C55E]/20'
                        : status === 'absent'
                        ? 'bg-gradient-to-r from-[#E11D48]/5 to-[#E11D48]/10 border-[#E11D48]/20'
                        : 'bg-gray-50 border-gray-100 hover:border-gray-200'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img 
                          src={student.photo} 
                          alt={student.name} 
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" 
                        />
                        {status === 'present' && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#22C55E] rounded-full border-2 border-white flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        {status === 'absent' && (
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#E11D48] rounded-full border-2 border-white flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-[#0F172A] block">{student.name}</span>
                        <span className="text-xs text-[#64748B]">ID: {student.id}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'present')}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                          status === 'present'
                            ? 'bg-[#22C55E] text-white shadow-md hover:shadow-lg'
                            : 'bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20 border border-[#22C55E]/20'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'absent')}
                        className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                          status === 'absent'
                            ? 'bg-[#E11D48] text-white shadow-md hover:shadow-lg'
                            : 'bg-[#E11D48]/10 text-[#E11D48] hover:bg-[#E11D48]/20 border border-[#E11D48]/20'
                        }`}
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Absent
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#0EA5E9]/20">
                <svg className="w-10 h-10 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-[#64748B] font-medium">No students in this class.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendancePage;

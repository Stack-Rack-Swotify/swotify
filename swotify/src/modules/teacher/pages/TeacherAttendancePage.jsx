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
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Student Attendance
          </h1>
          <p className="text-slate-600 text-sm font-medium">Mark daily attendance for your students</p>
        </div>

        {/* Controls: Class Selector and Date Picker */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 mb-6 hover:shadow-xl transition-all duration-300">
          <h2 className="text-lg font-semibold text-slate-900 mb-5 flex items-center">
            <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full mr-3"></span>
            Select Class & Date
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Class Selector */}
            <div>
              <label htmlFor="class-select" className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Select Class
              </label>
              <div className="relative">
                <select
                  id="class-select"
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 font-medium bg-white appearance-none cursor-pointer"
                >
                  {mockClasses.map(classItem => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.className}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-4 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Date Picker */}
            <div>
              <label htmlFor="date-picker" className="block text-sm font-semibold text-slate-700 mb-3 flex items-center gap-2">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Select Date
              </label>
              <input
                type="date"
                id="date-picker"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-slate-900 font-medium bg-white"
              />
            </div>
          </div>
        </div>

        {/* Attendance Statistics */}
        {currentClassStudents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Total</p>
                  <p className="text-2xl font-semibold text-slate-900">{stats.total}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Present</p>
                  <p className="text-2xl font-semibold text-emerald-600">{stats.present}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-rose-200 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Absent</p>
                  <p className="text-2xl font-semibold text-rose-600">{stats.absent}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-slate-200/60 p-5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-200 rounded-xl flex items-center justify-center shadow-md">
                  <svg className="w-7 h-7 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-600 uppercase tracking-wider font-semibold">Unmarked</p>
                  <p className="text-2xl font-semibold text-amber-600">{stats.unmarked}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Student List for Attendance */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
          <h2 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
            <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full mr-3"></span>
            Students in {mockClasses.find(c => c.id === selectedClassId)?.className}
          </h2>
          
          {currentClassStudents.length > 0 ? (
            <div className="space-y-3">
              {currentClassStudents.map(student => {
                const status = getAttendanceStatus(student.id);
                return (
                  <div 
                    key={student.id} 
                    className={`flex items-center justify-between p-5 rounded-xl border-2 transition-all duration-200 ${
                      status === 'present' 
                        ? 'bg-gradient-to-r from-emerald-50 to-emerald-100 border-emerald-300'
                        : status === 'absent'
                        ? 'bg-gradient-to-r from-rose-50 to-rose-100 border-rose-300'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:shadow-md'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-md opacity-20"></div>
                        <img 
                          src={student.photo} 
                          alt={student.name} 
                          className="relative w-14 h-14 rounded-full object-cover border-2 border-white shadow-lg ring-2 ring-purple-200" 
                        />
                        {status === 'present' && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                        )}
                        {status === 'absent' && (
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-rose-600 rounded-full border-2 border-white flex items-center justify-center shadow-md">
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </div>
                        )}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900 block text-base">{student.name}</span>
                        <span className="text-xs text-slate-600 font-medium">ID: {student.id}</span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'present')}
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                          status === 'present'
                            ? 'bg-emerald-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                            : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-2 border-emerald-300'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Present
                      </button>
                      <button
                        onClick={() => handleMarkAttendance(student.id, 'absent')}
                        className={`px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 flex items-center gap-2 ${
                          status === 'absent'
                            ? 'bg-rose-600 text-white shadow-lg hover:shadow-xl hover:scale-105'
                            : 'bg-rose-100 text-rose-700 hover:bg-rose-200 border-2 border-rose-300'
                        }`}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Absent
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-20"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-full flex items-center justify-center border-2 border-purple-200 shadow-lg">
                  <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-slate-600 font-medium text-lg">No students in this class.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendancePage;

import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import { archivedDataByYear } from '../../../data/mockArchivedData';

const ClassPage = () => {
  const currentAcademicYear = '2024-2025'; // Define the current academic year
  const [selectedYear, setSelectedYear] = useState(currentAcademicYear); 
  
  // Determine which classes to show based on selectedYear
  const getClassesSource = () => {
    if (selectedYear === currentAcademicYear) {
      return mockClasses;
    } else {
      return archivedDataByYear[selectedYear] || [];
    }
  };

  const currentSource = getClassesSource();
  const [selectedClassId, setSelectedClassId] = useState(''); 
  const [currentClass, setCurrentClass] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showAttendance, setShowAttendance] = useState(false);
  const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendance, setAttendance] = useState({});

  // Reset/Set selection when year changes
  useEffect(() => {
    const source = getClassesSource();
    if (source.length > 0) {
      setSelectedClassId(source[0].id);
    } else {
      setSelectedClassId('');
      setCurrentClass(null);
    }
  }, [selectedYear]); // Depend on selectedYear

  // Update currentClass when selectedClassId changes
  useEffect(() => {
    const source = getClassesSource();
    const classData = source.find(c => c.id === selectedClassId);
    setCurrentClass(classData || null);
    setSelectedStudent(null);
    
    if (classData && classData.students) {
      const initialAttendance = {};
      classData.students.forEach(student => {
        initialAttendance[student.id] = 'present';
      });
      setAttendance(initialAttendance);
    }
  }, [selectedClassId, selectedYear]); // Depend on selectedYear too

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const saveAttendance = () => {
    console.log('Saving attendance:', {
      classId: selectedClassId,
      date: attendanceDate,
      attendance: attendance
    });
    alert('Attendance saved successfully!');
    setShowAttendance(false);
  };

  const getAttendanceStats = () => {
    const total = Object.keys(attendance).length;
    const present = Object.values(attendance).filter(status => status === 'present').length;
    const absent = Object.values(attendance).filter(status => status === 'absent').length;
    const late = Object.values(attendance).filter(status => status === 'late').length;
    
    return { total, present, absent, late };
  };

  const stats = getAttendanceStats();
  // Combine current and archived years for the dropdown
  const allAvailableYears = [currentAcademicYear, ...Object.keys(archivedDataByYear)].sort().reverse();

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            Class Management
          </h1>
          <p className="text-slate-600 text-sm">Manage students and monitor class performance</p>
        </div>
        
        {/* Year Selector Dropdown */}
        <div className="w-full md:w-auto">
          <label htmlFor="year-select" className="sr-only">Academic Year</label>
          <div className="relative">
            <select
              id="year-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="px-4 py-2.5 text-sm font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer bg-white hover:border-purple-300 transition-colors pr-10"
            >
              {allAvailableYears.map(year => (
                <option key={year} value={year}>
                  {year === currentAcademicYear ? `Current Year (${year})` : `Archived Year (${year})`}
                </option>
              ))}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {selectedYear === currentAcademicYear && (
          <button
            onClick={() => setShowAttendance(!showAttendance)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
            {showAttendance ? 'View Class Info' : 'Take Attendance'}
          </button>
        )}
      </div>

      {!currentClass ? (
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-xl p-12 text-center max-w-md mx-auto mt-10">
          <p className="text-xl font-bold text-slate-900 mb-2">No Records Found</p>
          <p className="text-slate-600">No data available for the selected year.</p>
        </div>
      ) : (
        <>
          {/* Controls Section: Class Select */}
          <div className="bg-white rounded-xl border border-slate-200/60 shadow-lg p-5 mb-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              
              {/* Class Dropdown */}
              <div className="w-full">
                <label htmlFor="class-select" className="block text-sm font-bold text-slate-700 mb-2">
                  Select Class
                </label>
                <div className="relative">
                  <select
                    id="class-select"
                    value={selectedClassId}
                    onChange={(e) => setSelectedClassId(e.target.value)}
                    className="w-full px-4 py-3 text-sm font-semibold border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 appearance-none cursor-pointer bg-white hover:border-purple-300 transition-colors"
                  >
                    {currentSource.map(classItem => (
                      <option key={classItem.id} value={classItem.id}>
                        {classItem.className}
                      </option>
                    ))}
                  </select>
                  <svg className="absolute right-3 top-3.5 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          {/* Class Header */}
          <div className={`rounded-2xl p-8 mb-6 text-white shadow-2xl relative overflow-hidden ${
            selectedYear === currentAcademicYear 
              ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600'
              : 'bg-gradient-to-r from-slate-700 via-gray-600 to-zinc-600'
          }`}>
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full blur-2xl"></div>
            </div>
            <div className="relative flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">{currentClass.className}</h2>
                <p className="text-white/90 text-sm font-semibold">
                  {selectedYear === currentAcademicYear
                    ? `Grade ${currentClass.grade} - Section ${currentClass.section}`
                    : `Archived Record • ${selectedYear}`
                  }
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          {showAttendance && selectedYear === currentAcademicYear ? (
            /* Attendance View (Only for Current Classes) */
            <div>
               {/* ... (Existing Attendance Code) ... */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Stats Cards */}
                <div className="bg-white rounded-xl border border-slate-200/60 shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Total Students</p>
                  <p className="text-3xl font-bold text-slate-900">{stats.total}</p>
                </div>
                {/* ... other stats ... */}
                <div className="bg-white rounded-xl border border-emerald-200/60 shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Present</p>
                  <p className="text-3xl font-bold text-emerald-600">{stats.present}</p>
                </div>
                <div className="bg-white rounded-xl border border-rose-200/60 shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Absent</p>
                  <p className="text-3xl font-bold text-rose-600">{stats.absent}</p>
                </div>
                <div className="bg-white rounded-xl border border-amber-200/60 shadow-lg p-6 hover:shadow-xl transition-all hover:scale-105">
                  <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3">Late</p>
                  <p className="text-3xl font-bold text-amber-600">{stats.late}</p>
                </div>
              </div>

              {/* Date Selector */}
              <div className="bg-white rounded-xl border border-slate-200/60 shadow-lg p-5 mb-6">
                <label className="block text-sm font-bold text-slate-700 mb-3">Attendance Date</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="px-4 py-3 text-sm font-semibold border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 hover:border-purple-300 transition-colors"
                />
              </div>

              {/* Attendance List */}
              <div className="bg-white rounded-xl border border-slate-200/60 shadow-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-5">Mark Attendance</h3>
                <div className="space-y-3">
                  {currentClass.students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-4">
                        <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-full object-cover border-2 border-purple-400" />
                        <span className="text-sm font-bold text-slate-900">{student.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {['present', 'absent', 'late'].map(status => (
                          <button
                            key={status}
                            onClick={() => handleAttendanceChange(student.id, status)}
                            className={`px-4 py-2 text-xs font-bold rounded-lg capitalize transition-all ${
                              attendance[student.id] === status
                                ? status === 'present' ? 'bg-emerald-600 text-white' : status === 'absent' ? 'bg-rose-600 text-white' : 'bg-amber-600 text-white'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex gap-4">
                <button onClick={() => setShowAttendance(false)} className="flex-1 px-6 py-4 bg-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-300">Cancel</button>
                <button onClick={saveAttendance} className="flex-1 px-6 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl">Save Attendance</button>
              </div>
            </div>
          ) : (
            /* Class Info / Archive View */
            <div>
              {/* Class Analysis (Simplified for archive) */}
              <div className="bg-white rounded-xl border border-slate-200/60 shadow-lg p-6 mb-6">
                <h3 className="text-lg font-bold text-slate-900 mb-5">Class Performance Analysis</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-200">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Total Students</p>
                    <p className="text-3xl font-bold text-blue-700">{currentClass.totalStudents}</p>
                  </div>
                  <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border-2 border-emerald-200">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Average Score</p>
                    <p className="text-3xl font-bold text-emerald-700">{currentClass.classPerformance?.averageScore}%</p>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border-2 border-amber-200">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Pass Rate</p>
                    <p className="text-3xl font-bold text-amber-700">{currentClass.classPerformance?.passRate}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-5 rounded-xl border-2 border-purple-200">
                    <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Highest Score</p>
                    <p className="text-3xl font-bold text-purple-700">{currentClass.classPerformance?.highestScore}%</p>
                  </div>
                </div>
              </div>

              {/* Student List */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 bg-white rounded-xl border border-slate-200/60 shadow-lg p-6">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-lg font-bold text-slate-900">Students</h3>
                    <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold shadow-md">
                      {currentClass.students.length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                    {currentClass.students.map((student) => (
                      <div
                        key={student.id}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border-2 ${
                          selectedStudent?.id === student.id 
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-purple-300 shadow-md scale-105' 
                            : 'hover:bg-slate-50 border-transparent hover:border-slate-200'
                        }`}
                        onClick={() => setSelectedStudent(student)}
                      >
                        <img src={student.photo} alt={student.name} className="w-11 h-11 rounded-full object-cover border-2 border-purple-400 shadow-sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900 truncate">{student.name}</p>
                          {/* Status Badge for Archive View */}
                          {student.status && (
                            <span className={`inline-block mt-1 px-2 py-0.5 text-[10px] rounded-md font-bold uppercase tracking-wide ${
                              student.status === 'Passed Out' 
                                ? 'bg-rose-100 text-rose-600' 
                                : 'bg-emerald-100 text-emerald-600'
                            }`}>
                              {student.status}
                            </span>
                          )}
                        </div>
                        <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Student Details */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200/60 shadow-lg p-6">
                  {selectedStudent ? (
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 mb-6">Student Details</h3>
                      
                      <div className="flex flex-col items-center mb-8">
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-lg opacity-30"></div>
                          <img src={selectedStudent.photo} alt={selectedStudent.name} className="relative w-28 h-28 rounded-full object-cover border-4 border-purple-400 shadow-xl" />
                        </div>
                        <h4 className="text-2xl font-bold text-slate-900 mb-2">{selectedStudent.name}</h4>
                        <div className="flex gap-2">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1.5 rounded-lg text-sm font-bold shadow-md">
                            {currentClass.className}
                          </span>
                          {/* Status Badge in Details */}
                          {selectedStudent.status && (
                            <span className={`px-4 py-1.5 rounded-lg text-sm font-bold shadow-md ${
                              selectedStudent.status === 'Passed Out' 
                                ? 'bg-rose-500 text-white' 
                                : 'bg-emerald-500 text-white'
                            }`}>
                              {selectedStudent.status}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-5 rounded-xl border-2 border-blue-200">
                          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Email</p>
                          <p className="text-sm font-bold text-slate-900">{selectedStudent.details.email}</p>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-5 rounded-xl border-2 border-emerald-200">
                          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Final Grade</p>
                          <p className="text-sm font-bold text-slate-900">{selectedStudent.details.grade}</p>
                        </div>
                        <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-5 rounded-xl border-2 border-amber-200">
                          <p className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-1">Attendance</p>
                          <p className="text-sm font-bold text-slate-900">{selectedStudent.details.attendance}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-24">
                      <div className="relative w-24 h-24 bg-gradient-to-br from-slate-50 to-blue-50 rounded-full flex items-center justify-center shadow-lg mb-6">
                        <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-bold text-slate-900 mb-2">No Student Selected</h3>
                      <p className="text-slate-600 text-sm text-center max-w-md">Select a student from the list to view their details.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ClassPage;
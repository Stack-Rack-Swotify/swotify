import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import { archivedDataByYear } from '../../../data/mockArchivedData';

const ClassPage = () => {
  const currentAcademicYear = '2024-2025';
  const [selectedYear, setSelectedYear] = useState(currentAcademicYear);

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

  useEffect(() => {
    const source = getClassesSource();
    if (source.length > 0) {
      setSelectedClassId(source[0].id);
    } else {
      setSelectedClassId('');
      setCurrentClass(null);
    }
  }, [selectedYear]);

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
  }, [selectedClassId, selectedYear]);

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
  const allAvailableYears = [currentAcademicYear, ...Object.keys(archivedDataByYear)].sort().reverse();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Class Management</h1>
            <p className="text-slate-500 text-sm">Manage students and monitor class performance</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* Year Selector */}
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {allAvailableYears.map(year => (
              <option key={year} value={year}>
                {year === currentAcademicYear ? `Current (${year})` : year}
              </option>
            ))}
          </select>

          {selectedYear === currentAcademicYear && (
            <button
              onClick={() => setShowAttendance(!showAttendance)}
              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              {showAttendance ? 'View Class' : 'Attendance'}
            </button>
          )}
        </div>
      </div>

      {!currentClass ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No Records Found</h3>
          <p className="text-slate-500 text-sm">No data available for the selected year.</p>
        </div>
      ) : (
        <>
          {/* Class Selector */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1">
                <label className="block text-sm font-medium text-slate-700 mb-2">Select Class</label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {currentSource.map(classItem => (
                    <option key={classItem.id} value={classItem.id}>
                      {classItem.className}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Class Header Card */}
          <div className={`rounded-xl p-6 text-white ${selectedYear === currentAcademicYear
              ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400'
              : 'bg-gradient-to-r from-slate-600 to-slate-500'
            }`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">{currentClass.className}</h2>
                <p className="text-white/80 text-sm">
                  {selectedYear === currentAcademicYear
                    ? `Grade ${currentClass.grade} - Section ${currentClass.section}`
                    : `Archived Record • ${selectedYear}`
                  }
                </p>
              </div>
              <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
          </div>

          {showAttendance && selectedYear === currentAcademicYear ? (
            /* Attendance View */
            <div className="space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{stats.total}</p>
                      <p className="text-xs text-slate-500">Total</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-green-600">{stats.present}</p>
                      <p className="text-xs text-slate-500">Present</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-red-600">{stats.absent}</p>
                      <p className="text-xs text-slate-500">Absent</p>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                      <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-orange-600">{stats.late}</p>
                      <p className="text-xs text-slate-500">Late</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Selector */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Attendance Date</label>
                <input
                  type="date"
                  value={attendanceDate}
                  onChange={(e) => setAttendanceDate(e.target.value)}
                  className="px-4 py-3 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Attendance List */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Mark Attendance</h3>
                <div className="space-y-3">
                  {currentClass.students.map((student) => (
                    <div key={student.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center gap-4">
                        <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                        <span className="text-sm font-medium text-slate-800">{student.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {['present', 'absent', 'late'].map(status => (
                          <button
                            key={status}
                            onClick={() => handleAttendanceChange(student.id, status)}
                            className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${attendance[student.id] === status
                                ? status === 'present' ? 'bg-green-500 text-white' : status === 'absent' ? 'bg-red-500 text-white' : 'bg-orange-500 text-white'
                                : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
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

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button onClick={() => setShowAttendance(false)} className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition-colors">
                  Cancel
                </button>
                <button onClick={saveAttendance} className="flex-1 px-6 py-3 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors">
                  Save Attendance
                </button>
              </div>
            </div>
          ) : (
            /* Class Info View */
            <div className="space-y-6">
              {/* Performance Stats */}
              <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Class Performance</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                    <p className="text-xs text-slate-500 mb-1">Total Students</p>
                    <p className="text-2xl font-bold text-blue-600">{currentClass.totalStudents}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                    <p className="text-xs text-slate-500 mb-1">Average Score</p>
                    <p className="text-2xl font-bold text-green-600">{currentClass.classPerformance?.averageScore}%</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                    <p className="text-xs text-slate-500 mb-1">Pass Rate</p>
                    <p className="text-2xl font-bold text-orange-600">{currentClass.classPerformance?.passRate}</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                    <p className="text-xs text-slate-500 mb-1">Highest Score</p>
                    <p className="text-2xl font-bold text-purple-600">{currentClass.classPerformance?.highestScore}%</p>
                  </div>
                </div>
              </div>

              {/* Student List & Details */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student List */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-800">Students</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-xs font-medium">
                      {currentClass.students.length}
                    </span>
                  </div>
                  <div className="space-y-2 max-h-[500px] overflow-y-auto">
                    {currentClass.students.map((student) => (
                      <div
                        key={student.id}
                        className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${selectedStudent?.id === student.id
                            ? 'bg-blue-50 border border-blue-200'
                            : 'hover:bg-slate-50 border border-transparent'
                          }`}
                        onClick={() => setSelectedStudent(student)}
                      >
                        <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-800 truncate">{student.name}</p>
                          {student.status && (
                            <span className={`inline-block mt-0.5 px-2 py-0.5 text-[10px] rounded font-medium ${student.status === 'Passed Out'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-green-100 text-green-600'
                              }`}>
                              {student.status}
                            </span>
                          )}
                        </div>
                        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Student Details */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                  {selectedStudent ? (
                    <div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-6">Student Details</h3>

                      <div className="flex flex-col items-center mb-6">
                        <img src={selectedStudent.photo} alt={selectedStudent.name} className="w-24 h-24 rounded-full object-cover border-2 border-slate-200 mb-4" />
                        <h4 className="text-xl font-bold text-slate-800 mb-2">{selectedStudent.name}</h4>
                        <div className="flex gap-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">
                            {currentClass.className}
                          </span>
                          {selectedStudent.status && (
                            <span className={`px-3 py-1 rounded-lg text-sm font-medium ${selectedStudent.status === 'Passed Out'
                                ? 'bg-red-100 text-red-600'
                                : 'bg-green-100 text-green-600'
                              }`}>
                              {selectedStudent.status}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                          <p className="text-xs text-slate-500 mb-1">Email</p>
                          <p className="text-sm font-medium text-slate-800">{selectedStudent.details.email}</p>
                        </div>
                        <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                          <p className="text-xs text-slate-500 mb-1">Final Grade</p>
                          <p className="text-sm font-medium text-slate-800">{selectedStudent.details.grade}</p>
                        </div>
                        <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                          <p className="text-xs text-slate-500 mb-1">Attendance</p>
                          <p className="text-sm font-medium text-slate-800">{selectedStudent.details.attendance}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">No Student Selected</h3>
                      <p className="text-slate-500 text-sm text-center">Select a student from the list to view details</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ClassPage;
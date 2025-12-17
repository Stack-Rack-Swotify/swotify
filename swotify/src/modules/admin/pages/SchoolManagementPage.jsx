import React, { useState } from 'react';
import mockClasses from '../../../data/mockClasses';
import mockStaff from '../../../data/mockStaff';

const SchoolManagementPage = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTeacher, setSearchTeacher] = useState('');
  const [searchStudent, setSearchStudent] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [activeTab, setActiveTab] = useState('teachers');

  const [assignments, setAssignments] = useState(() => {
    const initial = {};
    mockClasses.forEach(cls => {
      initial[cls.id] = { teachers: [], students: cls.students.map(s => s.id) };
    });
    return initial;
  });

  const availableTeachers = mockStaff.filter(member => member.role === 'Teacher');
  const allStudents = mockClasses.flatMap(cls => cls.students);
  const subjects = ['all', ...new Set(availableTeachers.map(t => t.subject))];

  const handleAssignTeachers = () => {
    if (selectedClass && selectedTeachers.length > 0) {
      setAssignments(prev => {
        const newAssignments = { ...prev };
        if (!newAssignments[selectedClass]) {
          newAssignments[selectedClass] = { teachers: [], students: [] };
        }
        selectedTeachers.forEach(teacherId => {
          if (!newAssignments[selectedClass].teachers.includes(teacherId)) {
            newAssignments[selectedClass].teachers.push(teacherId);
          }
        });
        return newAssignments;
      });
      setSelectedTeachers([]);
    }
  };

  const handleAssignStudents = () => {
    if (selectedClass && selectedStudents.length > 0) {
      setAssignments(prev => {
        const newAssignments = { ...prev };
        if (!newAssignments[selectedClass]) {
          newAssignments[selectedClass] = { teachers: [], students: [] };
        }
        selectedStudents.forEach(studentId => {
          if (!newAssignments[selectedClass].students.includes(studentId)) {
            newAssignments[selectedClass].students.push(studentId);
          }
        });
        return newAssignments;
      });
      setSelectedStudents([]);
    }
  };

  const toggleTeacherSelection = (teacherId) => {
    setSelectedTeachers(prev =>
      prev.includes(teacherId) ? prev.filter(id => id !== teacherId) : [...prev, teacherId]
    );
  };

  const toggleStudentSelection = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
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

  const filteredTeachers = availableTeachers.filter(teacher =>
    teacher.name.toLowerCase().includes(searchTeacher.toLowerCase()) &&
    (filterSubject === 'all' || teacher.subject === filterSubject)
  );

  const filteredStudents = allStudents.filter(student =>
    student.name.toLowerCase().includes(searchStudent.toLowerCase())
  );

  const classDetails = selectedClass ? getClassDetails(selectedClass) : null;
  const totalAssignedTeachers = Object.values(assignments).reduce((sum, a) => sum + a.teachers.length, 0);
  const totalAssignedStudents = Object.values(assignments).reduce((sum, a) => sum + a.students.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">School Management</h1>
            <p className="text-slate-500 text-sm">Assign teachers & students to classes</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
            {totalAssignedTeachers} Teachers
          </div>
          <div className="px-4 py-2 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
            {totalAssignedStudents} Students
          </div>
        </div>
      </div>

      {/* Step 1: Select Class */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
          <h2 className="text-lg font-semibold text-slate-800">Select a Class</h2>
          {selectedClass && (
            <button onClick={() => setSelectedClass('')} className="ml-auto text-sm text-red-500 hover:text-red-700">
              × Clear
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {mockClasses.map(cls => (
            <button
              key={cls.id}
              onClick={() => setSelectedClass(cls.id)}
              className={`px-4 py-2 rounded-lg border-2 transition-all text-sm font-medium ${selectedClass === cls.id
                  ? 'bg-blue-500 border-blue-500 text-white'
                  : 'bg-white border-slate-200 hover:border-blue-300 text-slate-700'
                }`}
            >
              {cls.grade} - {cls.section}
              {assignments[cls.id]?.teachers.length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 bg-orange-400 text-white text-xs rounded">
                  {assignments[cls.id].teachers.length}T
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Step 2: Assign (Only show when class is selected) */}
      {selectedClass && classDetails && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
            <h2 className="text-lg font-semibold text-slate-800">
              Manage {classDetails.className}
            </h2>
            <span className="ml-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
              {assignments[selectedClass]?.teachers.length || 0} Teachers • {assignments[selectedClass]?.students.length || 0} Students
            </span>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setActiveTab('teachers')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'teachers'
                  ? 'bg-orange-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              👨‍🏫 Teachers
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${activeTab === 'students'
                  ? 'bg-green-500 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
            >
              👨‍🎓 Students
            </button>
          </div>

          {/* Teachers Tab */}
          {activeTab === 'teachers' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Select Teachers */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Select Teachers to Add</h3>

                <div className="space-y-3 mb-4">
                  <input
                    type="text"
                    placeholder="Search teachers..."
                    value={searchTeacher}
                    onChange={(e) => setSearchTeacher(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <select
                    value={filterSubject}
                    onChange={(e) => setFilterSubject(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    {subjects.map(s => <option key={s} value={s}>{s === 'all' ? 'All Subjects' : s}</option>)}
                  </select>
                </div>

                <div className="border border-slate-100 rounded-lg max-h-60 overflow-y-auto mb-4">
                  {filteredTeachers.map(teacher => (
                    <label
                      key={teacher.id}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 border-b border-slate-50 last:border-0 ${selectedTeachers.includes(teacher.id) ? 'bg-orange-50' : ''
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedTeachers.includes(teacher.id)}
                        onChange={() => toggleTeacherSelection(teacher.id)}
                        className="w-5 h-5 text-orange-500 rounded"
                      />
                      <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-bold">
                        {teacher.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{teacher.name}</p>
                        <p className="text-xs text-slate-500">{teacher.subject}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleAssignTeachers}
                  disabled={selectedTeachers.length === 0}
                  className="w-full px-4 py-3 bg-orange-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-600 transition-colors"
                >
                  Add {selectedTeachers.length} Teacher{selectedTeachers.length !== 1 ? 's' : ''} →
                </button>
              </div>

              {/* Right: Assigned Teachers */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">
                  Assigned Teachers ({assignments[selectedClass]?.teachers.length || 0})
                </h3>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {assignments[selectedClass]?.teachers.length > 0 ? (
                    assignments[selectedClass].teachers.map(teacherId => {
                      const teacher = getTeacher(teacherId);
                      return teacher ? (
                        <div key={teacherId} className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">
                              {teacher.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-slate-800">{teacher.name}</p>
                              <p className="text-xs text-slate-500">{teacher.subject}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveTeacher(teacherId)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      <p>No teachers assigned yet</p>
                      <p className="text-xs mt-1">Select teachers from the left and click Add</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Students Tab */}
          {activeTab === 'students' && (
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Select Students */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">Select Students to Add</h3>

                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchStudent}
                    onChange={(e) => setSearchStudent(e.target.value)}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                  />
                </div>

                <div className="border border-slate-100 rounded-lg max-h-60 overflow-y-auto mb-4">
                  {filteredStudents.map(student => (
                    <label
                      key={student.id}
                      className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-slate-50 border-b border-slate-50 last:border-0 ${selectedStudents.includes(student.id) ? 'bg-green-50' : ''
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student.id)}
                        onChange={() => toggleStudentSelection(student.id)}
                        className="w-5 h-5 text-green-500 rounded"
                      />
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-600 flex items-center justify-center font-bold">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-800">{student.name}</p>
                        {student.details?.email && <p className="text-xs text-slate-500">{student.details.email}</p>}
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  onClick={handleAssignStudents}
                  disabled={selectedStudents.length === 0}
                  className="w-full px-4 py-3 bg-green-500 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-600 transition-colors"
                >
                  Add {selectedStudents.length} Student{selectedStudents.length !== 1 ? 's' : ''} →
                </button>
              </div>

              {/* Right: Assigned Students */}
              <div className="border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-800 mb-3">
                  Assigned Students ({assignments[selectedClass]?.students.length || 0})
                </h3>

                <div className="space-y-2 max-h-72 overflow-y-auto">
                  {assignments[selectedClass]?.students.length > 0 ? (
                    assignments[selectedClass].students.map(studentId => {
                      const student = getStudent(studentId);
                      return student ? (
                        <div key={studentId} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">
                              {student.name.charAt(0)}
                            </div>
                            <p className="text-sm font-medium text-slate-800">{student.name}</p>
                          </div>
                          <button
                            onClick={() => handleRemoveStudent(studentId)}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-lg"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      ) : null;
                    })
                  ) : (
                    <div className="text-center py-8 text-slate-400">
                      <p>No students assigned yet</p>
                      <p className="text-xs mt-1">Select students from the left and click Add</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!selectedClass && (
        <div className="bg-slate-50 rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Select a Class to Get Started</h3>
          <p className="text-slate-500 text-sm">Choose a class from above to assign teachers and students</p>
        </div>
      )}
    </div>
  );
};

export default SchoolManagementPage;

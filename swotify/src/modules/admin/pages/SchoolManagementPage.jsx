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
  const [teacherDropdownOpen, setTeacherDropdownOpen] = useState(false);
  const [studentDropdownOpen, setStudentDropdownOpen] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState({ show: false, message: '', type: '' });
  
  const [assignments, setAssignments] = useState(() => {
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
  const subjects = ['all', ...new Set(availableTeachers.map(t => t.subject))];

  const showToast = (message, type) => {
    setShowSuccessToast({ show: true, message, type });
    setTimeout(() => setShowSuccessToast({ show: false, message: '', type: '' }), 3000);
  };

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
      
      showToast(`✨ ${selectedTeachers.length} teacher(s) assigned successfully!`, 'teacher');
      setSelectedTeachers([]);
      setTeacherDropdownOpen(false);
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
      
      showToast(`✨ ${selectedStudents.length} student(s) assigned successfully!`, 'student');
      setSelectedStudents([]);
      setStudentDropdownOpen(false);
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
      newAssignments[selectedClass].teachers = 
        newAssignments[selectedClass].teachers.filter(id => id !== teacherId);
      return newAssignments;
    });
    showToast('Teacher removed successfully', 'remove');
  };

  const handleRemoveStudent = (studentId) => {
    setAssignments(prev => {
      const newAssignments = { ...prev };
      newAssignments[selectedClass].students = 
        newAssignments[selectedClass].students.filter(id => id !== studentId);
      return newAssignments;
    });
    showToast('Student removed successfully', 'remove');
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

  // Calculate statistics
  const totalAssignedTeachers = Object.values(assignments).reduce((sum, a) => sum + a.teachers.length, 0);
  const totalAssignedStudents = Object.values(assignments).reduce((sum, a) => sum + a.students.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Success Toast */}
      {showSuccessToast.show && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div className={`rounded-2xl shadow-2xl p-4 flex items-center gap-3 backdrop-blur-xl border-2 ${
            showSuccessToast.type === 'teacher' 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 border-orange-300'
              : showSuccessToast.type === 'student'
              ? 'bg-gradient-to-r from-emerald-500 to-teal-500 border-emerald-300'
              : 'bg-gradient-to-r from-slate-600 to-slate-700 border-slate-400'
          }`}>
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-white font-semibold text-sm">{showSuccessToast.message}</p>
          </div>
        </div>
      )}

      {/* Modern Header */}
      <div className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  School Management
                </h1>
                <p className="text-sm text-slate-600 mt-0.5">Assign teachers & students to classes</p>
              </div>
            </div>

            {/* Stats Pills */}
            <div className="hidden md:flex items-center gap-3">
              <div className="px-5 py-2.5 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-full flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{totalAssignedTeachers}</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">Teachers</span>
              </div>
              <div className="px-5 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-full flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{totalAssignedStudents}</span>
                </div>
                <span className="text-sm font-semibold text-slate-700">Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Enhanced Class Selection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Select Class</h2>
                <p className="text-sm text-slate-600 mt-0.5">Choose a class to manage assignments</p>
              </div>
            </div>
            {selectedClass && (
              <button
                onClick={() => setSelectedClass('')}
                className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all"
              >
                Clear Selection
              </button>
            )}
          </div>

          {/* Class Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockClasses.map(cls => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className={`group relative p-5 rounded-2xl border-2 transition-all duration-300 ${
                  selectedClass === cls.id
                    ? 'bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 border-transparent shadow-2xl scale-110 transform'
                    : 'bg-white border-slate-200 hover:border-blue-400 hover:shadow-xl hover:scale-105'
                }`}
              >
                <div className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-3 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg transition-all ${
                    selectedClass === cls.id
                      ? 'bg-white/20 text-white backdrop-blur-sm'
                      : 'bg-gradient-to-br from-blue-50 to-purple-50 text-slate-900 group-hover:from-blue-100 group-hover:to-purple-100'
                  }`}>
                    {cls.grade.charAt(cls.grade.length - 1)}{cls.section}
                  </div>
                  <h3 className={`font-bold text-sm truncate ${
                    selectedClass === cls.id ? 'text-white' : 'text-slate-900'
                  }`}>
                    {cls.section}
                  </h3>
                  <p className={`text-xs mt-1 ${
                    selectedClass === cls.id ? 'text-white/80' : 'text-slate-600'
                  }`}>
                    {cls.students.length} students
                  </p>
                </div>

                {/* Selected Badge */}
                {selectedClass === cls.id && (
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full shadow-xl flex items-center justify-center animate-bounce-slow">
                    <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Assignment Badge */}
                {assignments[cls.id]?.teachers.length > 0 && (
                  <div className="absolute -top-2 -left-2 px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-lg shadow-lg">
                    {assignments[cls.id].teachers.length} 👨‍🏫
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Class Details */}
          {selectedClass && classDetails && (
            <div className="mt-6 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 rounded-2xl border border-blue-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {classDetails.grade.charAt(classDetails.grade.length - 1)}{classDetails.section}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{classDetails.className}</h3>
                    <p className="text-sm text-slate-600">{classDetails.grade} • Section {classDetails.section}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center px-4 py-2 bg-white rounded-xl shadow-sm">
                    <p className="text-2xl font-bold text-blue-600">{classDetails.students.length}</p>
                    <p className="text-xs text-slate-600">Students</p>
                  </div>
                  <div className="text-center px-4 py-2 bg-white rounded-xl shadow-sm">
                    <p className="text-2xl font-bold text-orange-600">{assignments[selectedClass]?.teachers.length || 0}</p>
                    <p className="text-xs text-slate-600">Teachers</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Assignment Sections */}
        {selectedClass && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Teachers Assignment Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg overflow-hidden">
              {/* Gradient Header */}
              <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
                </div>
                <div className="relative flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Assign Teachers</h3>
                    <p className="text-white/80 text-sm mt-0.5">Multi-select with advanced filters</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Enhanced Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setTeacherDropdownOpen(!teacherDropdownOpen)}
                    className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl text-left text-sm focus:outline-none focus:border-orange-500 transition-all flex items-center justify-between hover:border-orange-400 hover:shadow-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        selectedTeachers.length > 0
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                          : 'bg-slate-100 text-slate-400 group-hover:bg-orange-50 group-hover:text-orange-500'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold">
                          {selectedTeachers.length > 0 
                            ? `${selectedTeachers.length} Teacher${selectedTeachers.length > 1 ? 's' : ''} Selected`
                            : 'Select Teachers'}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">Click to choose from list</p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${teacherDropdownOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {teacherDropdownOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-white border-2 border-orange-500 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                      {/* Search & Filter Section */}
                      <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 space-y-3">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTeacher}
                            onChange={(e) => setSearchTeacher(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 text-sm border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <select
                          value={filterSubject}
                          onChange={(e) => setFilterSubject(e.target.value)}
                          className="w-full px-4 py-3 text-sm border-2 border-orange-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all cursor-pointer bg-white"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {subjects.map(subject => (
                            <option key={subject} value={subject}>
                              {subject === 'all' ? '🎓 All Subjects' : `📚 ${subject}`}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Teachers List */}
                      <div className="max-h-72 overflow-y-auto custom-scrollbar">
                        {filteredTeachers.length > 0 ? (
                          filteredTeachers.map((teacher, index) => (
                            <label
                              key={teacher.id}
                              className={`flex items-center px-5 py-4 hover:bg-orange-50 cursor-pointer transition-all ${
                                index !== filteredTeachers.length - 1 ? 'border-b border-slate-100' : ''
                              } ${selectedTeachers.includes(teacher.id) ? 'bg-orange-50' : ''}`}
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={selectedTeachers.includes(teacher.id)}
                                  onChange={() => toggleTeacherSelection(teacher.id)}
                                  className="w-5 h-5 text-orange-600 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 cursor-pointer"
                                />
                                {selectedTeachers.includes(teacher.id) && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-bold text-slate-900">{teacher.name}</p>
                                  {selectedTeachers.includes(teacher.id) && (
                                    <span className="px-2 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">✓</span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600 mt-0.5">{teacher.subject}</p>
                              </div>
                              <div className="ml-2">
                                <span className="px-3 py-1 text-xs font-bold bg-orange-100 text-orange-700 rounded-full">
                                  {Object.values(assignments).filter(a => a.teachers.includes(teacher.id)).length} classes
                                </span>
                              </div>
                            </label>
                          ))
                        ) : (
                          <div className="py-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                              </svg>
                            </div>
                            <p className="text-sm font-semibold text-slate-900">No teachers found</p>
                            <p className="text-xs text-slate-600 mt-1">Try adjusting your search</p>
                          </div>
                        )}
                      </div>

                      {/* Action Footer */}
                      <div className="p-4 border-t-2 border-orange-100 bg-gradient-to-r from-orange-50 to-red-50 flex gap-3">
                        <button
                          onClick={() => {
                            setSelectedTeachers([]);
                            setTeacherDropdownOpen(false);
                            setSearchTeacher('');
                            setFilterSubject('all');
                          }}
                          className="flex-1 px-4 py-3 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAssignTeachers}
                          disabled={selectedTeachers.length === 0}
                          className="flex-1 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Assign {selectedTeachers.length > 0 && `(${selectedTeachers.length})`}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assigned Teachers */}
                {assignments[selectedClass]?.teachers.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                        Assigned Teachers
                      </h4>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">
                        {assignments[selectedClass].teachers.length}
                      </span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                      {assignments[selectedClass].teachers.map(teacherId => {
                        const teacher = getTeacher(teacherId);
                        return teacher ? (
                          <div 
                            key={teacherId} 
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl group hover:shadow-lg transition-all hover:scale-102"
                          >
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-bold shadow-lg">
                                {teacher.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-bold text-slate-900">{teacher.name}</p>
                                <p className="text-xs text-slate-600 mt-0.5">{teacher.subject}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveTeacher(teacherId)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                              title="Remove teacher"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Students Assignment Card - Similar Structure */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg overflow-hidden">
              {/* Gradient Header */}
              <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-6 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
                </div>
                <div className="relative flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Assign Students</h3>
                    <p className="text-white/80 text-sm mt-0.5">Multi-select with search functionality</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Enhanced Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                    className="w-full px-5 py-4 bg-white border-2 border-slate-200 rounded-2xl text-left text-sm focus:outline-none focus:border-emerald-500 transition-all flex items-center justify-between hover:border-emerald-400 hover:shadow-lg group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all ${
                        selectedStudents.length > 0
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                          : 'bg-slate-100 text-slate-400 group-hover:bg-emerald-50 group-hover:text-emerald-500'
                      }`}>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-900 font-semibold">
                          {selectedStudents.length > 0 
                            ? `${selectedStudents.length} Student${selectedStudents.length > 1 ? 's' : ''} Selected`
                            : 'Select Students'}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">Click to choose from list</p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${studentDropdownOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {studentDropdownOpen && (
                    <div className="absolute z-20 w-full mt-2 bg-white border-2 border-emerald-500 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                      {/* Search Section */}
                      <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchStudent}
                            onChange={(e) => setSearchStudent(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 text-sm border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all bg-white"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>

                      {/* Students List */}
                      <div className="max-h-72 overflow-y-auto custom-scrollbar">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((student, index) => (
                            <label
                              key={student.id}
                              className={`flex items-center px-5 py-4 hover:bg-emerald-50 cursor-pointer transition-all ${
                                index !== filteredStudents.length - 1 ? 'border-b border-slate-100' : ''
                              } ${selectedStudents.includes(student.id) ? 'bg-emerald-50' : ''}`}
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={selectedStudents.includes(student.id)}
                                  onChange={() => toggleStudentSelection(student.id)}
                                  className="w-5 h-5 text-emerald-600 border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                                />
                                {selectedStudents.includes(student.id) && (
                                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                  </div>
                                )}
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-bold text-slate-900">{student.name}</p>
                                  {selectedStudents.includes(student.id) && (
                                    <span className="px-2 py-0.5 bg-emerald-500 text-white text-xs font-bold rounded-full">✓</span>
                                  )}
                                </div>
                                {student.details?.email && (
                                  <p className="text-xs text-slate-600 mt-0.5">{student.details.email}</p>
                                )}
                              </div>
                            </label>
                          ))
                        ) : (
                          <div className="py-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                              </svg>
                            </div>
                            <p className="text-sm font-semibold text-slate-900">No students found</p>
                            <p className="text-xs text-slate-600 mt-1">Try adjusting your search</p>
                          </div>
                        )}
                      </div>

                      {/* Action Footer */}
                      <div className="p-4 border-t-2 border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 flex gap-3">
                        <button
                          onClick={() => {
                            setSelectedStudents([]);
                            setStudentDropdownOpen(false);
                            setSearchStudent('');
                          }}
                          className="flex-1 px-4 py-3 text-sm font-semibold text-slate-700 bg-white border-2 border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAssignStudents}
                          disabled={selectedStudents.length === 0}
                          className="flex-1 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          Assign {selectedStudents.length > 0 && `(${selectedStudents.length})`}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assigned Students */}
                {assignments[selectedClass]?.students.length > 0 && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                        Assigned Students
                      </h4>
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-bold">
                        {assignments[selectedClass].students.length}
                      </span>
                    </div>
                    <div className="space-y-2 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                      {assignments[selectedClass].students.map(studentId => {
                        const student = getStudent(studentId);
                        return student ? (
                          <div 
                            key={studentId} 
                            className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-xl group hover:shadow-lg transition-all hover:scale-102"
                          >
                            <div className="flex items-center gap-3 flex-1 min-w-0">
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0">
                                {student.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-slate-900 truncate">{student.name}</p>
                                {student.details?.email && (
                                  <p className="text-xs text-slate-600 mt-0.5 truncate">{student.details.email}</p>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveStudent(studentId)}
                              className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all opacity-0 group-hover:opacity-100 flex-shrink-0"
                              title="Remove student"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(-10%);
            animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
          }
          50% {
            transform: translateY(0);
            animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        .animate-bounce-slow {
          animation: bounce-slow 2s infinite;
        }
        .hover\:scale-102:hover {
          transform: scale(1.02);
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3B82F6 0%, #10B981 100%);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #10B981 0%, #3B82F6 100%);
        }
      `}</style>
    </div>
  );
};

export default SchoolManagementPage;

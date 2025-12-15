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

  const totalAssignedTeachers = Object.values(assignments).reduce((sum, a) => sum + a.teachers.length, 0);
  const totalAssignedStudents = Object.values(assignments).reduce((sum, a) => sum + a.students.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Premium Success Toast */}
      {showSuccessToast.show && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div className={`bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl flex items-center gap-4 border-2 overflow-hidden ${
            showSuccessToast.type === 'teacher' 
              ? 'border-orange-300 dark:border-orange-700'
              : showSuccessToast.type === 'student'
              ? 'border-emerald-300 dark:border-emerald-700'
              : 'border-slate-400 dark:border-slate-600'
          }`}>
            <div className="absolute inset-0 bg-gradient-to-r opacity-10" style={{
              background: showSuccessToast.type === 'teacher' 
                ? 'linear-gradient(to right, rgb(249 115 22), rgb(239 68 68))'
                : showSuccessToast.type === 'student'
                ? 'linear-gradient(to right, rgb(16 185 129), rgb(20 184 166))'
                : 'linear-gradient(to right, rgb(71 85 105), rgb(51 65 85))'
            }}></div>
            <div className={`relative w-12 h-12 rounded-xl flex items-center justify-center shadow-lg animate-bounce ${
              showSuccessToast.type === 'teacher'
                ? 'bg-gradient-to-br from-orange-500 to-red-500'
                : showSuccessToast.type === 'student'
                ? 'bg-gradient-to-br from-emerald-500 to-teal-500'
                : 'bg-gradient-to-br from-slate-600 to-slate-700'
            }`} style={{ animationDuration: '2s' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="relative text-slate-900 dark:text-gray-100 font-extrabold text-sm">{showSuccessToast.message}</p>
          </div>
        </div>
      )}

      {/* Premium Enhanced Header */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border-b-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  School Management
                </h1>
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-1 font-bold">Assign teachers & students to classes</p>
              </div>
            </div>

            {/* Stats Pills */}
            <div className="flex items-center gap-3 flex-wrap">
              <div className="px-6 py-3 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-300 dark:border-orange-700 rounded-xl flex items-center gap-3 shadow-lg hover:scale-105 transition-transform">
                <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-extrabold">{totalAssignedTeachers}</span>
                </div>
                <span className="text-sm font-extrabold text-slate-900 dark:text-gray-100">Teachers</span>
              </div>
              <div className="px-6 py-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-300 dark:border-emerald-700 rounded-xl flex items-center gap-3 shadow-lg hover:scale-105 transition-transform">
                <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm font-extrabold">{totalAssignedStudents}</span>
                </div>
                <span className="text-sm font-extrabold text-slate-900 dark:text-gray-100">Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-6">
        {/* Premium Class Selection */}
        <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-between mb-7">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Select Class</h2>
                <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Choose a class to manage assignments</p>
              </div>
            </div>
            {selectedClass && (
              <button
                onClick={() => setSelectedClass('')}
                className="px-6 py-3 text-sm font-extrabold text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-100 bg-slate-100 dark:bg-gray-700 hover:bg-slate-200 dark:hover:bg-gray-600 rounded-xl transition-all shadow-sm hover:shadow-lg hover:scale-105"
              >
                Clear Selection
              </button>
            )}
          </div>

          {/* Premium Class Grid */}
          <div className="relative grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {mockClasses.map(cls => (
              <button
                key={cls.id}
                onClick={() => setSelectedClass(cls.id)}
                className={`group/card relative p-6 rounded-2xl border-2 transition-all duration-300 ${
                  selectedClass === cls.id
                    ? 'bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 border-transparent shadow-2xl scale-110 transform'
                    : 'bg-white dark:bg-gray-700 border-slate-200 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl hover:scale-105'
                }`}
              >
                <div className="text-center">
                  <div className={`w-20 h-20 mx-auto mb-4 rounded-2xl flex items-center justify-center text-3xl font-extrabold shadow-xl transition-all ${
                    selectedClass === cls.id
                      ? 'bg-white/20 text-white backdrop-blur-sm'
                      : 'bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-slate-900 dark:text-gray-100 group-hover/card:from-blue-100 group-hover/card:to-purple-100 dark:group-hover/card:from-blue-800/30 dark:group-hover/card:to-purple-800/30'
                  }`}>
                    {cls.grade.charAt(cls.grade.length - 1)}{cls.section}
                  </div>
                  <h3 className={`font-extrabold text-sm truncate mb-1 ${
                    selectedClass === cls.id ? 'text-white' : 'text-slate-900 dark:text-gray-100'
                  }`}>
                    Section {cls.section}
                  </h3>
                  <p className={`text-xs font-bold ${
                    selectedClass === cls.id ? 'text-white/90' : 'text-slate-600 dark:text-gray-400'
                  }`}>
                    {cls.students.length} students
                  </p>
                </div>

                {/* Selected Badge */}
                {selectedClass === cls.id && (
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center animate-bounce-slow">
                    <svg className="w-6 h-6 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}

                {/* Assignment Badge */}
                {assignments[cls.id]?.teachers.length > 0 && (
                  <div className="absolute -top-2 -left-2 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-extrabold rounded-xl shadow-xl">
                    {assignments[cls.id].teachers.length} 👨‍🏫
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Premium Selected Class Details */}
          {selectedClass && classDetails && (
            <div className="relative mt-7 pt-7 border-t-2 border-slate-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20 rounded-2xl border-2 border-blue-300 dark:border-blue-700 shadow-lg">
                <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl shadow-xl">
                    {classDetails.grade.charAt(classDetails.grade.length - 1)}{classDetails.section}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-gray-100">{classDetails.className}</h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">{classDetails.grade} • Section {classDetails.section}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-center px-6 py-3 bg-white dark:bg-gray-700 rounded-xl shadow-lg border-2 border-blue-300 dark:border-blue-700">
                    <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">{classDetails.students.length}</p>
                    <p className="text-xs text-slate-600 dark:text-gray-400 font-bold mt-1">Students</p>
                  </div>
                  <div className="text-center px-6 py-3 bg-white dark:bg-gray-700 rounded-xl shadow-lg border-2 border-orange-300 dark:border-orange-700">
                    <p className="text-3xl font-extrabold text-orange-600 dark:text-orange-400">{assignments[selectedClass]?.teachers.length || 0}</p>
                    <p className="text-xs text-slate-600 dark:text-gray-400 font-bold mt-1">Teachers</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Premium Assignment Sections */}
        {selectedClass && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Premium Teachers Assignment Card */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl overflow-hidden">
              {/* Gradient Header */}
              <div className="relative bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 p-7 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
                </div>
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-xl">Assign Teachers</h3>
                    <p className="text-white/90 text-sm mt-1 font-bold">Multi-select with advanced filters</p>
                  </div>
                </div>
              </div>

              <div className="p-7 space-y-5">
                {/* Enhanced Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setTeacherDropdownOpen(!teacherDropdownOpen)}
                    className="w-full px-6 py-5 bg-white dark:bg-gray-700 border-2 border-slate-200 dark:border-gray-600 rounded-2xl text-left text-sm focus:outline-none focus:border-orange-500 dark:focus:border-orange-600 transition-all flex items-center justify-between hover:border-orange-400 dark:hover:border-orange-700 hover:shadow-xl group shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg ${
                        selectedTeachers.length > 0
                          ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                          : 'bg-slate-100 dark:bg-gray-600 text-slate-400 dark:text-gray-400 group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20 group-hover:text-orange-500 dark:group-hover:text-orange-400'
                      }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-gray-100 font-extrabold">
                          {selectedTeachers.length > 0 
                            ? `${selectedTeachers.length} Teacher${selectedTeachers.length > 1 ? 's' : ''} Selected`
                            : 'Select Teachers'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-gray-500 mt-1 font-bold">Click to choose from list</p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${teacherDropdownOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-6 h-6 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {teacherDropdownOpen && (
                    <div className="absolute z-20 w-full mt-3 bg-white dark:bg-gray-800 border-2 border-orange-500 dark:border-orange-600 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                      {/* Search & Filter Section */}
                      <div className="p-5 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 space-y-4">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchTeacher}
                            onChange={(e) => setSearchTeacher(e.target.value)}
                            className="w-full pl-12 pr-5 py-4 text-sm border-2 border-orange-200 dark:border-orange-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-600 transition-all bg-white dark:bg-gray-700 font-bold text-slate-900 dark:text-gray-100 shadow-sm"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-400 dark:text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                        <select
                          value={filterSubject}
                          onChange={(e) => setFilterSubject(e.target.value)}
                          className="w-full px-5 py-4 text-sm border-2 border-orange-200 dark:border-orange-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-orange-500/20 focus:border-orange-500 dark:focus:border-orange-600 transition-all cursor-pointer bg-white dark:bg-gray-700 font-bold text-slate-900 dark:text-gray-100 shadow-sm"
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
                              className={`flex items-center px-6 py-5 hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer transition-all ${
                                index !== filteredTeachers.length - 1 ? 'border-b-2 border-slate-100 dark:border-gray-700' : ''
                              } ${selectedTeachers.includes(teacher.id) ? 'bg-orange-50 dark:bg-orange-900/20' : ''}`}
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={selectedTeachers.includes(teacher.id)}
                                  onChange={() => toggleTeacherSelection(teacher.id)}
                                  className="w-6 h-6 text-orange-600 border-2 border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-orange-500 cursor-pointer"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{teacher.name}</p>
                                  {selectedTeachers.includes(teacher.id) && (
                                    <span className="px-3 py-1 bg-orange-500 text-white text-xs font-extrabold rounded-full shadow-lg">✓</span>
                                  )}
                                </div>
                                <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 font-bold">{teacher.subject}</p>
                              </div>
                              <div className="ml-2">
                                <span className="px-4 py-1.5 text-xs font-extrabold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full shadow-sm">
                                  {Object.values(assignments).filter(a => a.teachers.includes(teacher.id)).length} classes
                                </span>
                              </div>
                            </label>
                          ))
                        ) : (
                          <div className="py-16 text-center">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <svg className="w-10 h-10 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                              </svg>
                            </div>
                            <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">No teachers found</p>
                            <p className="text-xs text-slate-600 dark:text-gray-400 mt-2 font-bold">Try adjusting your search</p>
                          </div>
                        )}
                      </div>

                      {/* Action Footer */}
                      <div className="p-5 border-t-2 border-orange-100 dark:border-orange-900/30 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 flex gap-4">
                        <button
                          onClick={() => {
                            setSelectedTeachers([]);
                            setTeacherDropdownOpen(false);
                            setSearchTeacher('');
                            setFilterSubject('all');
                          }}
                          className="flex-1 px-5 py-4 text-sm font-extrabold text-slate-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-slate-200 dark:border-gray-600 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-600 hover:border-slate-300 dark:hover:border-gray-500 transition-all shadow-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAssignTeachers}
                          disabled={selectedTeachers.length === 0}
                          className="flex-1 px-5 py-4 text-sm font-extrabold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg border-2 border-white/20"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Assign {selectedTeachers.length > 0 && `(${selectedTeachers.length})`}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assigned Teachers */}
                {assignments[selectedClass]?.teachers.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold text-slate-700 dark:text-gray-300 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse"></div>
                        Assigned Teachers
                      </h4>
                      <span className="px-4 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-xs font-extrabold shadow-sm">
                        {assignments[selectedClass].teachers.length}
                      </span>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                      {assignments[selectedClass].teachers.map(teacherId => {
                        const teacher = getTeacher(teacherId);
                        return teacher ? (
                          <div 
                            key={teacherId} 
                            className="flex items-center justify-between p-5 bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 border-2 border-orange-200 dark:border-orange-700 rounded-2xl group hover:shadow-xl transition-all hover:scale-102"
                          >
                            <div className="flex items-center gap-4 flex-1">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center text-white font-extrabold text-lg shadow-xl">
                                {teacher.name.charAt(0)}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{teacher.name}</p>
                                <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 font-bold">{teacher.subject}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveTeacher(teacherId)}
                              className="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-all opacity-0 group-hover:opacity-100 hover:scale-110"
                              title="Remove teacher"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

            {/* Premium Students Assignment Card - Similar Structure */}
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl overflow-hidden">
              {/* Gradient Header */}
              <div className="relative bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 p-7 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32"></div>
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white rounded-full -ml-24 -mb-24"></div>
                </div>
                <div className="relative flex items-center gap-4">
                  <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-white font-extrabold text-xl">Assign Students</h3>
                    <p className="text-white/90 text-sm mt-1 font-bold">Multi-select with search functionality</p>
                  </div>
                </div>
              </div>

              <div className="p-7 space-y-5">
                {/* Enhanced Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setStudentDropdownOpen(!studentDropdownOpen)}
                    className="w-full px-6 py-5 bg-white dark:bg-gray-700 border-2 border-slate-200 dark:border-gray-600 rounded-2xl text-left text-sm focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-600 transition-all flex items-center justify-between hover:border-emerald-400 dark:hover:border-emerald-700 hover:shadow-xl group shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg ${
                        selectedStudents.length > 0
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                          : 'bg-slate-100 dark:bg-gray-600 text-slate-400 dark:text-gray-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:text-emerald-500 dark:group-hover:text-emerald-400'
                      }`}>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-slate-900 dark:text-gray-100 font-extrabold">
                          {selectedStudents.length > 0 
                            ? `${selectedStudents.length} Student${selectedStudents.length > 1 ? 's' : ''} Selected`
                            : 'Select Students'}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-gray-500 mt-1 font-bold">Click to choose from list</p>
                      </div>
                    </div>
                    <div className={`transform transition-transform duration-300 ${studentDropdownOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-6 h-6 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {studentDropdownOpen && (
                    <div className="absolute z-20 w-full mt-3 bg-white dark:bg-gray-800 border-2 border-emerald-500 dark:border-emerald-600 rounded-2xl shadow-2xl overflow-hidden animate-scale-in">
                      {/* Search Section */}
                      <div className="p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search by name..."
                            value={searchStudent}
                            onChange={(e) => setSearchStudent(e.target.value)}
                            className="w-full pl-12 pr-5 py-4 text-sm border-2 border-emerald-200 dark:border-emerald-700 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-600 transition-all bg-white dark:bg-gray-700 font-bold text-slate-900 dark:text-gray-100 shadow-sm"
                            onClick={(e) => e.stopPropagation()}
                          />
                          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400 dark:text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                        </div>
                      </div>

                      {/* Students List */}
                      <div className="max-h-72 overflow-y-auto custom-scrollbar">
                        {filteredStudents.length > 0 ? (
                          filteredStudents.map((student, index) => (
                            <label
                              key={student.id}
                              className={`flex items-center px-6 py-5 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 cursor-pointer transition-all ${
                                index !== filteredStudents.length - 1 ? 'border-b-2 border-slate-100 dark:border-gray-700' : ''
                              } ${selectedStudents.includes(student.id) ? 'bg-emerald-50 dark:bg-emerald-900/20' : ''}`}
                            >
                              <div className="relative">
                                <input
                                  type="checkbox"
                                  checked={selectedStudents.includes(student.id)}
                                  onChange={() => toggleStudentSelection(student.id)}
                                  className="w-6 h-6 text-emerald-600 border-2 border-slate-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 cursor-pointer"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{student.name}</p>
                                  {selectedStudents.includes(student.id) && (
                                    <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-extrabold rounded-full shadow-lg">✓</span>
                                  )}
                                </div>
                                {student.details?.email && (
                                  <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 font-bold">{student.details.email}</p>
                                )}
                              </div>
                            </label>
                          ))
                        ) : (
                          <div className="py-16 text-center">
                            <div className="w-20 h-20 bg-slate-100 dark:bg-gray-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                              <svg className="w-10 h-10 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                              </svg>
                            </div>
                            <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">No students found</p>
                            <p className="text-xs text-slate-600 dark:text-gray-400 mt-2 font-bold">Try adjusting your search</p>
                          </div>
                        )}
                      </div>

                      {/* Action Footer */}
                      <div className="p-5 border-t-2 border-emerald-100 dark:border-emerald-900/30 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 flex gap-4">
                        <button
                          onClick={() => {
                            setSelectedStudents([]);
                            setStudentDropdownOpen(false);
                            setSearchStudent('');
                          }}
                          className="flex-1 px-5 py-4 text-sm font-extrabold text-slate-700 dark:text-gray-300 bg-white dark:bg-gray-700 border-2 border-slate-200 dark:border-gray-600 rounded-xl hover:bg-slate-50 dark:hover:bg-gray-600 hover:border-slate-300 dark:hover:border-gray-500 transition-all shadow-sm"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleAssignStudents}
                          disabled={selectedStudents.length === 0}
                          className="flex-1 px-5 py-4 text-sm font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-lg border-2 border-white/20"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Assign {selectedStudents.length > 0 && `(${selectedStudents.length})`}
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Assigned Students */}
                {assignments[selectedClass]?.students.length > 0 && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-extrabold text-slate-700 dark:text-gray-300 flex items-center gap-2">
                        <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        Assigned Students
                      </h4>
                      <span className="px-4 py-1.5 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-extrabold shadow-sm">
                        {assignments[selectedClass].students.length}
                      </span>
                    </div>
                    <div className="space-y-3 max-h-64 overflow-y-auto custom-scrollbar pr-2">
                      {assignments[selectedClass].students.map(studentId => {
                        const student = getStudent(studentId);
                        return student ? (
                          <div 
                            key={studentId} 
                            className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border-2 border-emerald-200 dark:border-emerald-700 rounded-2xl group hover:shadow-xl transition-all hover:scale-102"
                          >
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-white font-extrabold text-lg shadow-xl flex-shrink-0">
                                {student.name.charAt(0)}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100 truncate">{student.name}</p>
                                {student.details?.email && (
                                  <p className="text-xs text-slate-600 dark:text-gray-400 mt-1 truncate font-bold">{student.details.email}</p>
                                )}
                              </div>
                            </div>
                            <button
                              onClick={() => handleRemoveStudent(studentId)}
                              className="p-2.5 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 rounded-xl transition-all opacity-0 group-hover:opacity-100 flex-shrink-0 hover:scale-110"
                              title="Remove student"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

      <style>{`
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
            transform: translateY(-15%);
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
        .hover\\:scale-102:hover {
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

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import mockParents from '../../../data/mockParents';

const AdminStudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('All');
  const [viewMode, setViewMode] = useState('grid');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isAddingNewParent, setIsAddingNewParent] = useState(false);
  const [newParentFormData, setNewParentFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    grade: 'Grade 10',
    section: 'A',
    status: 'Active',
    academicYear: '2024-2025',
    parentId: '',
    phone: '',
  });

  const [parentsList, setParentsList] = useState(mockParents);

  const grades = ['All', ...new Set(mockClasses.map(cls => cls.grade))];
  const sections = ['All', ...new Set(mockClasses.map(cls => cls.section))];
  const classes = ['All', ...mockClasses.map(cls => cls.className)];

  const initialStudents = mockClasses.flatMap(classData =>
    classData.students.map(student => {
      const parent = parentsList.find(p => p.childrenIds.includes(student.id));
      return {
        ...student,
        grade: classData.grade,
        section: classData.section,
        className: classData.className, 
        status: student.status || 'Active',
        academicYear: student.academicYear || '2024-2025',
        parentId: parent ? parent.id : '',
        parentName: parent ? parent.name : 'N/A',
        details: {
          ...student.details,
          phone: student.details.phone || 'N/A',
        }
      };
    })
  );

  const [studentList, setStudentList] = useState(initialStudents);

  const filteredStudents = studentList.filter(student => {
    const matchesSearch = searchTerm === '' || 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.details.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.details.phone.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (selectedClass !== 'All') {
      return matchesSearch && student.className === selectedClass && 
        (selectedAcademicYear === 'All' || student.academicYear === selectedAcademicYear);
    }

    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    const matchesSection = selectedSection === 'All' || student.section === selectedSection;
    const matchesAcademicYear = selectedAcademicYear === 'All' || student.academicYear === selectedAcademicYear;
    return matchesSearch && matchesGrade && matchesSection && matchesAcademicYear;
  });

  const selectedClassData = selectedClass !== 'All' 
    ? mockClasses.find(cls => cls.className === selectedClass)
    : null;

  const totalStudents = studentList.length;
  const activeStudents = studentList.filter(s => s.status === 'Active').length;
  const gradeDistribution = studentList.reduce((acc, student) => {
    acc[student.grade] = (acc[student.grade] || 0) + 1;
    return acc;
  }, {});

  const handleAdd = () => {
    setCurrentStudent(null);
    setFormData({
      name: '',
      email: '',
      grade: 'Grade 10',
      section: 'A',
      status: 'Active',
      academicYear: '2024-2025',
      parentId: '',
      phone: '',
    });
    setNewParentFormData({ name: '', email: '', phone: '' });
    setIsAddingNewParent(false);
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setCurrentStudent(student);
    setFormData({
      name: student.name,
      email: student.details?.email || student.email,
      grade: student.grade,
      section: student.section,
      status: student.status || 'Active',
      academicYear: student.academicYear || '2024-2025',
      parentId: student.parentId || '',
      phone: student.details?.phone || '',
    });
    setNewParentFormData({ name: '', email: '', phone: '' });
    setIsAddingNewParent(false);
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const confirmDelete = (student) => {
    setCurrentStudent(student);
    setIsDeleteModalOpen(true);
    setActiveMenuId(null);
  };

  const handleDelete = () => {
    if (currentStudent) {
      setStudentList(prev => prev.filter(s => s.id !== currentStudent.id));
      setIsDeleteModalOpen(false);
      setCurrentStudent(null);
    }
  };

  const handleNewParentFormChange = (e) => {
    const { name, value } = e.target;
    setNewParentFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    let finalParentId = formData.parentId;

    if (isAddingNewParent) {
      const newParentId = `p${Date.now()}`;
      const newParent = {
        id: newParentId,
        name: newParentFormData.name,
        email: newParentFormData.email,
        phone: newParentFormData.phone,
        username: newParentFormData.email,
        password: newParentFormData.phone,
        childrenIds: [],
      };
      setParentsList(prev => [...prev, newParent]);
      finalParentId = newParentId;
    }

    if (currentStudent) {
      setStudentList(prev => prev.map(s => {
        if (s.id === currentStudent.id) {
          if (s.parentId && s.parentId !== finalParentId) {
            setParentsList(pList => pList.map(p => p.id === s.parentId ? 
              {...p, childrenIds: p.childrenIds.filter(cid => cid !== s.id)} : p));
          }
          if (finalParentId && s.parentId !== finalParentId) {
            setParentsList(pList => pList.map(p => p.id === finalParentId ? 
              {...p, childrenIds: [...p.childrenIds, s.id]} : p));
          }

          return {
            ...s,
            name: formData.name,
            email: formData.email,
            grade: formData.grade,
            section: formData.section,
            status: formData.status,
            academicYear: formData.academicYear,
            className: `${formData.grade} - Section ${formData.section}`,
            details: { ...s.details, email: formData.email, phone: formData.phone },
            parentId: finalParentId,
            parentName: parentsList.find(p => p.id === finalParentId)?.name || 'N/A',
          };
        }
        return s;
      }));
    } else {
      const newStudentId = `s${Date.now()}`;
      const newStudent = {
        id: newStudentId,
        name: formData.name,
        email: formData.email,
        grade: formData.grade,
        section: formData.section,
        status: formData.status,
        academicYear: formData.academicYear,
        className: `${formData.grade} - Section ${formData.section}`,
        photo: `https://placehold.co/150/000000/FFFFFF?text=${formData.name.charAt(0)}`,
        details: {
          email: formData.email,
          phone: formData.phone,
          attendance: 'N/A',
          grade: 'N/A',
          parents: 'N/A',
        },
        assignments: [],
        parentId: finalParentId,
        parentName: parentsList.find(p => p.id === finalParentId)?.name || 'N/A',
      };
      setStudentList(prev => [newStudent, ...prev]);

      if (finalParentId) {
        setParentsList(pList => pList.map(p => p.id === finalParentId ? 
          {...p, childrenIds: [...p.childrenIds, newStudentId]} : p));
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Premium Enhanced Header */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border-b-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Student Management
                </h1>
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-1 flex items-center gap-2 font-bold">
                  <span className="relative w-2.5 h-2.5 bg-emerald-500 rounded-full">
                    <span className="absolute inset-0 bg-emerald-500 rounded-full animate-ping"></span>
                  </span>
                  {totalStudents} Total Students • {activeStudents} Active
                </p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3 border-2 border-white/20"
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add New Student
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-6">
        {/* Premium Quick Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: 'Total Students', value: totalStudents, sub: 'Across all grades', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z', gradient: 'from-blue-500 to-cyan-500', textColor: 'text-blue-600 dark:text-blue-400' },
            { label: 'Active Students', value: activeStudents, sub: `${((activeStudents/totalStudents)*100).toFixed(1)}% enrollment`, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', gradient: 'from-emerald-500 to-teal-500', textColor: 'text-emerald-600 dark:text-emerald-400' },
            { label: 'Total Classes', value: mockClasses.length, sub: `${Object.keys(gradeDistribution).length} different grades`, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', gradient: 'from-purple-500 to-pink-500', textColor: 'text-purple-600 dark:text-purple-400' },
            { label: 'Avg Per Class', value: Math.round(totalStudents/mockClasses.length), sub: 'Students per class', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', gradient: 'from-amber-500 to-orange-500', textColor: 'text-amber-600 dark:text-amber-400' }
          ].map((stat, idx) => (
            <div key={idx} className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl p-6 border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-extrabold text-slate-600 dark:text-gray-400 uppercase tracking-wider">{stat.label}</span>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                  </svg>
                </div>
              </div>
              <p className={`text-4xl font-extrabold ${stat.textColor} mb-2`}>{stat.value}</p>
              <p className="text-xs font-bold text-slate-500 dark:text-gray-500">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Premium Enhanced Filters */}
        <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all">
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Search & Filter Students</h2>
            </div>
            <div className="flex items-center gap-2">
              {['grid', 'list'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-3 rounded-xl transition-all ${viewMode === mode ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105' : 'bg-slate-100 dark:bg-gray-700 text-slate-600 dark:text-gray-400 hover:bg-slate-200 dark:hover:bg-gray-600'}`}
                  title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} view`}
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d={mode === 'grid' ? "M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" : "M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"} />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5">
            {[
              { label: 'Academic Year', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', value: selectedAcademicYear, onChange: setSelectedAcademicYear, options: ['All', '2023-2024', '2024-2025', '2025-2026'], color: 'blue', disabled: false },
              { label: 'Class', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', value: selectedClass, onChange: (val) => { setSelectedClass(val); if (val !== 'All') { setSelectedGrade('All'); setSelectedSection('All'); } }, options: classes, color: 'purple', disabled: false },
              { label: 'Grade', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2', value: selectedGrade, onChange: (val) => { setSelectedGrade(val); setSelectedSection('All'); setSelectedClass('All'); }, options: grades, color: 'emerald', disabled: selectedClass !== 'All' },
              { label: 'Section', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', value: selectedSection, onChange: (val) => { setSelectedSection(val); setSelectedClass('All'); }, options: sections, color: 'amber', disabled: selectedClass !== 'All' }
            ].map((filter, idx) => (
              <div key={idx}>
                <label className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                  <svg className={`w-4 h-4 text-${filter.color}-600 dark:text-${filter.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d={filter.icon} />
                  </svg>
                  {filter.label}
                </label>
                <select
                  value={filter.value}
                  onChange={(e) => filter.onChange(e.target.value)}
                  disabled={filter.disabled}
                  className={`w-full px-5 py-4 bg-white dark:bg-gray-700 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-${filter.color}-500/20 focus:border-${filter.color}-500 transition-all text-slate-900 dark:text-gray-100 cursor-pointer shadow-sm hover:border-${filter.color}-300 dark:hover:border-${filter.color}-600 font-bold ${filter.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {(filter.options || [filter.value]).map((opt, oidx) => (
                    <option key={oidx} value={opt}>{opt === 'All' ? `All ${filter.label}s` : opt}</option>
                  ))}
                </select>
              </div>
            ))}

            <div>
              <label className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-5 py-4 pl-12 bg-white dark:bg-gray-700 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all text-slate-900 dark:text-gray-100 shadow-sm hover:border-rose-300 dark:hover:border-rose-600 font-bold"
                />
                <svg className="absolute left-4 top-4.5 w-5 h-5 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-4 top-4.5 text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Class Performance Summary */}
        {selectedClassData && (
          <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 animate-fade-in hover:shadow-2xl transition-all overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center gap-4 mb-7">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">{selectedClassData.className} Performance Overview</h2>
            </div>
            <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { label: 'Average Score', value: `${selectedClassData.classPerformance.averageScore}%`, gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20', border: 'border-blue-300 dark:border-blue-700', text: 'text-blue-600 dark:text-blue-400' },
                { label: 'Highest Score', value: `${selectedClassData.classPerformance.highestScore}%`, gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20', border: 'border-emerald-300 dark:border-emerald-700', text: 'text-emerald-600 dark:text-emerald-400' },
                { label: 'Lowest Score', value: `${selectedClassData.classPerformance.lowestScore}%`, gradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20', border: 'border-amber-300 dark:border-amber-700', text: 'text-amber-600 dark:text-amber-400' },
                { label: 'Pass Rate', value: selectedClassData.classPerformance.passRate, gradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20', border: 'border-purple-300 dark:border-purple-700', text: 'text-purple-600 dark:text-purple-400' }
              ].map((perf, idx) => (
                <div key={idx} className={`bg-gradient-to-br ${perf.gradient} rounded-2xl p-6 border-2 ${perf.border} hover:scale-105 transition-transform`}>
                  <p className="text-sm font-extrabold text-slate-600 dark:text-gray-400 mb-2 uppercase tracking-wider">{perf.label}</p>
                  <p className={`text-4xl font-extrabold ${perf.text}`}>{perf.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100 flex items-center gap-3">
            <span className="w-2 h-10 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></span>
            Students Directory
          </h2>
          <div className="flex items-center gap-3 flex-wrap">
            <span className="px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-slate-900 dark:text-gray-100 rounded-xl text-sm font-extrabold border-2 border-blue-300 dark:border-blue-700 shadow-sm">
              Showing {filteredStudents.length} of {totalStudents} students
            </span>
            {(searchTerm || selectedClass !== 'All' || selectedGrade !== 'All' || selectedSection !== 'All' || selectedAcademicYear !== 'All') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedGrade('All');
                  setSelectedSection('All');
                  setSelectedClass('All');
                  setSelectedAcademicYear('All');
                }}
                className="group px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl text-sm font-extrabold hover:shadow-2xl transition-all shadow-lg flex items-center gap-3 hover:scale-105 border-2 border-white/20"
              >
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset All
              </button>
            )}
          </div>
        </div>

        {/* Student Cards/List */}
        {filteredStudents.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredStudents.map((student) => (
                <div
                  key={student.id}
                  className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 flex flex-col items-center text-center hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  {/* Three Dots Menu */}
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === student.id ? null : student.id);
                      }}
                      className="p-2 text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-gray-100 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-xl transition-all focus:outline-none"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {activeMenuId === student.id && (
                      <div className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-gray-700 overflow-hidden z-20 animate-scale-in">
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEdit(student); }}
                          className="w-full text-left px-5 py-4 text-sm font-extrabold text-slate-700 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:text-blue-600 dark:hover:text-blue-400 transition-colors flex items-center gap-3"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Student
                        </button>
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); confirmDelete(student); }}
                          className="w-full text-left px-5 py-4 text-sm font-extrabold text-slate-700 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-colors flex items-center gap-3"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <Link to={`/admin-dashboard/student-profile/${student.id}`} className="relative flex flex-col items-center w-full">
                    {/* Student Photo */}
                    <div className="relative mb-5 group/avatar">
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-50 animate-pulse"></div>
                      <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1.5 shadow-2xl group-hover/avatar:scale-110 transition-transform">
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      </div>
                      {/* Grade Badge */}
                      <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-3 border-white dark:border-gray-800 flex items-center justify-center shadow-xl">
                        <span className="text-xs text-white font-extrabold">
                          {student.grade.slice(-2)}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-4">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-extrabold border-2 ${
                        student.status === 'Active' 
                          ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700' 
                          : 'bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-700'
                      }`}>
                        {student.status}
                      </span>
                    </div>

                    {/* Student Name */}
                    <h3 className="text-lg font-extrabold text-slate-900 dark:text-gray-100 mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {student.name}
                    </h3>

                    {/* Class Info */}
                    <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
                      <span className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-blue-600 dark:text-blue-400 px-3 py-1.5 rounded-full text-xs font-extrabold border-2 border-blue-300 dark:border-blue-700">
                        {student.grade}
                      </span>
                      <span className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded-full text-xs font-extrabold border-2 border-emerald-300 dark:border-emerald-700">
                        Section {student.section}
                      </span>
                      <span className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded-full text-xs font-extrabold border-2 border-purple-300 dark:border-purple-700">
                        {student.academicYear}
                      </span>
                    </div>

                    {student.parentName && student.parentName !== 'N/A' && (
                      <div className="mb-4">
                        <span className="bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 text-pink-700 dark:text-pink-400 px-4 py-1.5 rounded-full text-xs font-extrabold border-2 border-pink-300 dark:border-pink-700 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          {student.parentName}
                        </span>
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className="w-full space-y-3 mt-5 pt-5 border-t-2 border-slate-100 dark:border-gray-700">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 dark:text-gray-400 flex items-center gap-2 font-extrabold">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email
                        </span>
                        <span className="text-slate-900 dark:text-gray-100 font-extrabold truncate ml-2 max-w-[120px]" title={student.details.email}>
                          {student.details.email.split('@')[0]}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 dark:text-gray-400 flex items-center gap-2 font-extrabold">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Phone
                        </span>
                        <span className="text-slate-900 dark:text-gray-100 font-extrabold">{student.details.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            /* Premium List View */
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl overflow-hidden">
              <table className="min-w-full divide-y-2 divide-slate-200 dark:divide-gray-700">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50">
                  <tr>
                    {['Student', 'Grade/Section', 'Parent', 'Contact', 'Status', 'Actions'].map((header, idx) => (
                      <th key={idx} className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y-2 divide-slate-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all">
                      <td className="px-6 py-5 whitespace-nowrap">
                        <Link to={`/admin-dashboard/student-profile/${student.id}`} className="flex items-center gap-4">
                          <div className="relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 shadow-lg hover:scale-110 transition-transform">
                            <img
                              src={student.photo}
                              alt={student.name}
                              className="w-full h-full rounded-full object-cover bg-white"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{student.name}</p>
                            <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{student.details.email}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex flex-col gap-2">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 text-sm font-extrabold text-blue-600 dark:text-blue-400 border-2 border-blue-300 dark:border-blue-700">
                            {student.grade}
                          </span>
                          <span className="inline-flex items-center px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-sm font-extrabold text-emerald-600 dark:text-emerald-400 border-2 border-emerald-300 dark:border-emerald-700">
                            Section {student.section}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className="text-sm font-extrabold text-slate-700 dark:text-gray-300">{student.parentName}</span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="text-slate-600 dark:text-gray-400 font-extrabold">{student.details.phone || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <span className={`inline-flex items-center px-4 py-2 rounded-xl text-xs font-extrabold border-2 ${
                          student.status === 'Active' 
                            ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700' 
                            : 'bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-700'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-5 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="p-2.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all hover:scale-110"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => confirmDelete(student)}
                            className="p-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all hover:scale-110"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          /* Premium Empty State */
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-20 text-center">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur opacity-20 animate-pulse"></div>
              <div className="relative w-32 h-32 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center border-4 border-blue-300 dark:border-blue-700 shadow-2xl">
                <svg className="w-16 h-16 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100 mb-4">No Students Found</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm max-w-md mx-auto mb-10 font-medium">
              We couldn't find any students matching your criteria. Try adjusting your filters or search term, or add a new student.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedGrade('All');
                setSelectedSection('All');
                setSelectedClass('All');
                setSelectedAcademicYear('All');
              }}
              className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
            >
              <svg className="w-6 h-6 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Premium Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden animate-scale-in my-8 border-2 border-slate-200 dark:border-gray-700">
            <div className="px-7 py-6 border-b-2 border-slate-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-pink-900/20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">
                  {currentStudent ? 'Edit Student Information' : 'Add New Student'}
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 text-slate-400 dark:text-gray-500 hover:text-slate-900 dark:hover:text-gray-100 hover:bg-slate-100 dark:hover:bg-gray-700 rounded-xl transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-7 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {/* Student Information Section */}
              <div className="space-y-5">
                <h4 className="text-base font-extrabold text-slate-900 dark:text-gray-100 flex items-center gap-2 pb-3 border-b-2 border-slate-200 dark:border-gray-700">
                  <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Student Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-5 py-4 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-700 font-bold"
                      placeholder="e.g. Alice Johnson"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-5 py-4 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-700 font-bold"
                      placeholder="e.g. alice@school.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-5 py-4 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-700 font-bold"
                    placeholder="e.g. 555-123-4567"
                  />
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-5">
                <h4 className="text-base font-extrabold text-slate-900 dark:text-gray-100 flex items-center gap-2 pb-3 border-b-2 border-slate-200 dark:border-gray-700">
                  <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Academic Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {[
                    { label: 'Grade *', value: formData.grade, onChange: (val) => setFormData({...formData, grade: val}), options: grades.filter(g => g !== 'All') },
                    { label: 'Section *', value: formData.section, onChange: (val) => setFormData({...formData, section: val}), options: sections.filter(s => s !== 'All') },
                    { label: 'Academic Year *', value: formData.academicYear, onChange: (val) => setFormData({...formData, academicYear: val}), options: ['2023-2024', '2024-2025', '2025-2026'] },
                    { label: 'Status *', value: formData.status, onChange: (val) => setFormData({...formData, status: val}), options: ['Active', 'Inactive'] }
                  ].map((field, idx) => (
                    <div key={idx}>
                      <label className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2">{field.label}</label>
                      <select
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value)}
                        className="w-full px-5 py-4 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-gray-100 cursor-pointer bg-white dark:bg-gray-700 font-bold"
                      >
                        {field.options.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>

              {/* Parent Association Section */}
              <div className="space-y-5">
                <h4 className="text-base font-extrabold text-slate-900 dark:text-gray-100 flex items-center gap-2 pb-3 border-b-2 border-slate-200 dark:border-gray-700">
                  <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Parent Association
                </h4>

                <div className="flex items-center gap-4 p-5 bg-slate-50 dark:bg-gray-700/50 rounded-xl border-2 border-slate-200 dark:border-gray-600">
                  {['existing', 'new'].map((option) => (
                    <label key={option} className="inline-flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="w-5 h-5 text-blue-600"
                        name="parent-option"
                        value={option}
                        checked={option === 'new' ? isAddingNewParent : !isAddingNewParent}
                        onChange={() => setIsAddingNewParent(option === 'new')}
                      />
                      <span className="ml-2 text-sm font-extrabold text-slate-900 dark:text-gray-100">
                        {option === 'existing' ? 'Select Existing Parent' : 'Create New Parent'}
                      </span>
                    </label>
                  ))}
                </div>

                {!isAddingNewParent ? (
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2">Select Parent</label>
                    <select
                      value={formData.parentId}
                      onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                      className="w-full px-5 py-4 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-gray-100 cursor-pointer bg-white dark:bg-gray-700 font-bold"
                    >
                      <option value="">Select a Parent (Optional)</option>
                      {parentsList.map(parent => (
                        <option key={parent.id} value={parent.id}>
                          {parent.name} ({parent.email})
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-4 bg-gradient-to-r from-pink-50 to-rose-50 dark:from-pink-900/20 dark:to-rose-900/20 p-5 rounded-xl border-2 border-pink-300 dark:border-pink-700">
                    <p className="text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-4">New Parent Details</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        { label: 'Parent Name *', name: 'name', placeholder: 'John Doe' },
                        { label: 'Parent Email *', name: 'email', placeholder: 'john@example.com', type: 'email' },
                        { label: 'Parent Phone *', name: 'phone', placeholder: '555-123-4567', type: 'tel' }
                      ].map((field, idx) => (
                        <div key={idx}>
                          <label className="block text-xs font-extrabold text-slate-700 dark:text-gray-300 mb-2">{field.label}</label>
                          <input
                            type={field.type || 'text'}
                            required
                            value={newParentFormData[field.name]}
                            onChange={handleNewParentFormChange}
                            name={field.name}
                            className="w-full px-4 py-3 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-pink-500/20 focus:border-pink-500 transition-all text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-700 font-bold"
                            placeholder={field.placeholder}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="pt-5 flex gap-4 border-t-2 border-slate-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-8 py-4 border-2 border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 font-extrabold rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-xl hover:shadow-2xl transition-all hover:scale-105 border-2 border-white/20"
                >
                  {currentStudent ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Premium Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-2xl p-10 text-center animate-scale-in border-2 border-slate-200 dark:border-gray-700">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 to-pink-500 rounded-full blur opacity-50 animate-pulse"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-full flex items-center justify-center border-4 border-rose-300 dark:border-rose-700 shadow-2xl">
                <svg className="w-12 h-12 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100 mb-4">Delete Student?</h3>
            <p className="text-slate-600 dark:text-gray-400 text-sm mb-10 font-medium">
              Are you sure you want to delete <span className="font-extrabold text-slate-900 dark:text-gray-100">{currentStudent?.name}</span>? 
              This action cannot be undone and will remove all associated data.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-8 py-4 border-2 border-slate-300 dark:border-gray-600 text-slate-700 dark:text-gray-300 font-extrabold rounded-xl hover:bg-slate-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold rounded-xl hover:shadow-2xl transition-all hover:scale-105 border-2 border-white/20"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.2s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default AdminStudentsPage;


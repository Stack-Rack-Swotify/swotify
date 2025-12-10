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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Enhanced Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  Student Management
                </h1>
                <p className="text-sm text-slate-600 mt-0.5 flex items-center gap-2">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  {totalStudents} Total Students • {activeStudents} Active
                </p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              Add New Student
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Quick Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/60 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Total Students</span>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-slate-900">{totalStudents}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Across all grades</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/60 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Active Students</span>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-emerald-600">{activeStudents}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{((activeStudents/totalStudents)*100).toFixed(1)}% enrollment</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/60 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Total Classes</span>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-purple-600">{mockClasses.length}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">{Object.keys(gradeDistribution).length} different grades</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-5 border border-white/60 shadow-lg hover:shadow-xl transition-all hover:scale-105 cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-slate-600 uppercase tracking-wider">Avg Per Class</span>
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-extrabold text-amber-600">{Math.round(totalStudents/mockClasses.length)}</p>
            <p className="text-xs font-semibold text-slate-500 mt-1">Students per class</p>
          </div>
        </div>

        {/* Enhanced Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">Search & Filter Students</h2>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-blue-500 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                title="Grid view"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-blue-500 text-white shadow-lg' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                title="List view"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Academic Year
              </label>
              <select
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 cursor-pointer shadow-sm hover:border-blue-300"
              >
                <option value="All">All Years</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                Class
              </label>
              <select
                value={selectedClass}
                onChange={(e) => {
                  setSelectedClass(e.target.value);
                  if (e.target.value !== 'All') {
                    setSelectedGrade('All');
                    setSelectedSection('All');
                  }
                }}
                className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 cursor-pointer shadow-sm hover:border-purple-300"
              >
                {classes.map(cls => (
                  <option key={cls} value={cls}>{cls === 'All' ? 'All Classes' : cls}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Grade
              </label>
              <select
                value={selectedGrade}
                onChange={(e) => {
                  setSelectedGrade(e.target.value);
                  setSelectedSection('All');
                  setSelectedClass('All');
                }}
                disabled={selectedClass !== 'All'}
                className={`w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900 cursor-pointer shadow-sm hover:border-emerald-300 ${selectedClass !== 'All' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                </svg>
                Section
              </label>
              <select
                value={selectedSection}
                onChange={(e) => {
                  setSelectedSection(e.target.value);
                  setSelectedClass('All');
                }}
                disabled={selectedClass !== 'All'}
                className={`w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all text-slate-900 cursor-pointer shadow-sm hover:border-amber-300 ${selectedClass !== 'All' ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {sections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 pl-10 bg-white border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent transition-all text-slate-900 shadow-sm hover:border-rose-300"
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
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
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6 animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{selectedClassData.className} Performance Overview</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200">
                <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-wider">Average Score</p>
                <p className="text-3xl font-extrabold text-blue-600">{selectedClassData.classPerformance.averageScore}%</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border-2 border-emerald-200">
                <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-wider">Highest Score</p>
                <p className="text-3xl font-extrabold text-emerald-600">{selectedClassData.classPerformance.highestScore}%</p>
              </div>
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200">
                <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-wider">Lowest Score</p>
                <p className="text-3xl font-extrabold text-amber-600">{selectedClassData.classPerformance.lowestScore}%</p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border-2 border-purple-200">
                <p className="text-sm font-bold text-slate-600 mb-1 uppercase tracking-wider">Pass Rate</p>
                <p className="text-3xl font-extrabold text-purple-600">{selectedClassData.classPerformance.passRate}</p>
              </div>
            </div>
          </div>
        )}

        {/* Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <span className="w-1.5 h-8 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></span>
            Students Directory
          </h2>
          <div className="flex items-center gap-3">
            <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-slate-900 rounded-xl text-sm font-bold border-2 border-blue-200 shadow-sm">
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
                className="px-4 py-2 bg-rose-500 text-white rounded-xl text-sm font-bold hover:bg-rose-600 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
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
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl border-2 border-white/60 shadow-lg p-6 flex flex-col items-center text-center hover:shadow-2xl hover:border-blue-300 transition-all duration-300 transform hover:-translate-y-2 relative"
                >
                  {/* Three Dots Menu */}
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === student.id ? null : student.id);
                      }}
                      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all focus:outline-none"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {activeMenuId === student.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border-2 border-slate-200 overflow-hidden z-20 animate-fade-in">
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEdit(student); }}
                          className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-colors flex items-center gap-3"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Student
                        </button>
                        <button 
                          onClick={(e) => { e.preventDefault(); e.stopPropagation(); confirmDelete(student); }}
                          className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-red-50 hover:text-red-600 transition-colors flex items-center gap-3"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  <Link to={`/admin-dashboard/student-profile/${student.id}`} className="flex flex-col items-center w-full">
                    {/* Student Photo */}
                    <div className="relative mb-4">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-1 shadow-xl">
                        <img
                          src={student.photo}
                          alt={student.name}
                          className="w-full h-full rounded-full object-cover bg-white"
                        />
                      </div>
                      {/* Grade Badge */}
                      <div className="absolute -bottom-2 -right-2 w-9 h-9 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full border-3 border-white flex items-center justify-center shadow-xl">
                        <span className="text-xs text-white font-extrabold">
                          {student.grade.slice(-2)}
                        </span>
                      </div>
                    </div>

                    {/* Status Badge */}
                    <div className="mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${
                        student.status === 'Active' 
                          ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                          : 'bg-rose-50 text-rose-600 border-rose-200'
                      }`}>
                        {student.status}
                      </span>
                    </div>

                    {/* Student Name */}
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                      {student.name}
                    </h3>

                    {/* Class Info */}
                    <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
                      <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-bold border-2 border-blue-200">
                        {student.grade}
                      </span>
                      <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold border-2 border-emerald-200">
                        Section {student.section}
                      </span>
                      <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold border-2 border-purple-200">
                        {student.academicYear}
                      </span>
                    </div>

                    {student.parentName && student.parentName !== 'N/A' && (
                      <div className="mb-3">
                        <span className="bg-gradient-to-r from-pink-50 to-rose-50 text-pink-700 px-3 py-1 rounded-full text-xs font-bold border-2 border-pink-200 flex items-center gap-1">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                          {student.parentName}
                        </span>
                      </div>
                    )}

                    {/* Quick Info */}
                    <div className="w-full space-y-2 mt-4 pt-4 border-t-2 border-slate-100">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 flex items-center gap-1 font-semibold">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email
                        </span>
                        <span className="text-slate-900 font-bold truncate ml-2 max-w-[120px]" title={student.details.email}>
                          {student.details.email.split('@')[0]}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-600 flex items-center gap-1 font-semibold">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          Phone
                        </span>
                        <span className="text-slate-900 font-bold">{student.details.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            /* List View */
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-gradient-to-r from-slate-50 to-blue-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Grade/Section</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Parent</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50 transition-all">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Link to={`/admin-dashboard/student-profile/${student.id}`} className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-0.5 shadow-lg">
                            <img
                              src={student.photo}
                              alt={student.name}
                              className="w-full h-full rounded-full object-cover bg-white"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{student.name}</p>
                            <p className="text-xs text-slate-600">{student.details.email}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1">
                          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-blue-50 text-sm font-bold text-blue-600 border border-blue-200">
                            {student.grade}
                          </span>
                          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-emerald-50 text-sm font-bold text-emerald-600 border border-emerald-200">
                            Section {student.section}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-slate-700">{student.parentName}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col gap-1 text-xs">
                          <span className="text-slate-600 font-semibold">{student.details.phone || 'N/A'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1.5 rounded-xl text-xs font-bold border-2 ${
                          student.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                            : 'bg-rose-50 text-rose-600 border-rose-200'
                        }`}>
                          {student.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(student)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => confirmDelete(student)}
                            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                            title="Delete"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
          /* Empty State */
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-16 text-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-blue-200">
              <svg className="w-16 h-16 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">No Students Found</h3>
            <p className="text-slate-600 text-sm max-w-md mx-auto mb-8">
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
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-scale-in my-8">
            <div className="px-6 py-5 border-b-2 border-slate-200 flex justify-between items-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {currentStudent ? 'Edit Student Information' : 'Add New Student'}
                </h3>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="p-6 space-y-5 max-h-[70vh] overflow-y-auto">
              {/* Student Information Section */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b-2 border-slate-200">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Student Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                      placeholder="e.g. Alice Johnson"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                      placeholder="e.g. alice@school.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                    placeholder="e.g. 555-123-4567"
                  />
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b-2 border-slate-200">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  Academic Information
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Grade *</label>
                    <select
                      value={formData.grade}
                      onChange={(e) => setFormData({...formData, grade: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 cursor-pointer"
                    >
                      {grades.filter(g => g !== 'All').map(grade => (
                        <option key={grade} value={grade}>{grade}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Section *</label>
                    <select
                      value={formData.section}
                      onChange={(e) => setFormData({...formData, section: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 cursor-pointer"
                    >
                      {sections.filter(s => s !== 'All').map(section => (
                        <option key={section} value={section}>{section}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Academic Year *</label>
                    <select
                      value={formData.academicYear}
                      onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 cursor-pointer"
                    >
                      <option value="2023-2024">2023-2024</option>
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Status *</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 cursor-pointer"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Parent Association Section */}
              <div className="space-y-4">
                <h4 className="text-base font-bold text-slate-900 flex items-center gap-2 pb-2 border-b-2 border-slate-200">
                  <svg className="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Parent Association
                </h4>

                <div className="flex items-center gap-4 mb-4 bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className="w-4 h-4 text-blue-600"
                      name="parent-option"
                      value="existing"
                      checked={!isAddingNewParent}
                      onChange={() => setIsAddingNewParent(false)}
                    />
                    <span className="ml-2 text-sm font-bold text-slate-900">Select Existing Parent</span>
                  </label>
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="radio"
                      className="w-4 h-4 text-blue-600"
                      name="parent-option"
                      value="new"
                      checked={isAddingNewParent}
                      onChange={() => setIsAddingNewParent(true)}
                    />
                    <span className="ml-2 text-sm font-bold text-slate-900">Create New Parent</span>
                  </label>
                </div>

                {!isAddingNewParent ? (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Select Parent</label>
                    <select
                      value={formData.parentId}
                      onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900 cursor-pointer"
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
                  <div className="space-y-4 bg-gradient-to-r from-pink-50 to-rose-50 p-4 rounded-xl border-2 border-pink-200">
                    <p className="text-sm font-semibold text-slate-700 mb-3">New Parent Details</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Parent Name *</label>
                        <input
                          type="text"
                          required
                          value={newParentFormData.name}
                          onChange={handleNewParentFormChange}
                          name="name"
                          className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-slate-900"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Parent Email *</label>
                        <input
                          type="email"
                          required
                          value={newParentFormData.email}
                          onChange={handleNewParentFormChange}
                          name="email"
                          className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-slate-900"
                          placeholder="john@example.com"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-2">Parent Phone *</label>
                        <input
                          type="tel"
                          required
                          value={newParentFormData.phone}
                          onChange={handleNewParentFormChange}
                          name="phone"
                          className="w-full px-3 py-2 border-2 border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-slate-900"
                          placeholder="555-123-4567"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="pt-4 flex gap-3 border-t-2 border-slate-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
                >
                  {currentStudent ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 text-center animate-scale-in">
            <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-rose-200">
              <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-3">Delete Student?</h3>
            <p className="text-slate-600 text-sm mb-8">
              Are you sure you want to delete <span className="font-bold text-slate-900">{currentStudent?.name}</span>? 
              This action cannot be undone and will remove all associated data.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-6 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 bg-rose-500 text-white font-bold rounded-xl hover:bg-rose-600 hover:shadow-xl transition-all hover:scale-105"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
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
      `}</style>
    </div>
  );
};

export default AdminStudentsPage;

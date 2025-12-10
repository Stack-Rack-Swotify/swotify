import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import mockParents from '../../../data/mockParents';

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('All');
  const [showFilters, setShowFilters] = useState(false);

  // Modal State
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

  const initialStudents = mockClasses.flatMap(classData =>
    classData.students.map(student => {
      const parent = parentsList.find(p => p.childrenIds.includes(student.id));
      return {
        ...student,
        grade: classData.grade,
        section: classData.section,
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
    const matchesSearch = searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.details.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.details.phone.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    const matchesSection = selectedSection === 'All' || student.section === selectedSection;
    const matchesAcademicYear = selectedAcademicYear === 'All' || student.academicYear === selectedAcademicYear;
    return matchesSearch && matchesGrade && matchesSection && matchesAcademicYear;
  });

  // Check if any filter is active (excluding search)
  const hasActiveFilters = selectedGrade !== 'All' || selectedSection !== 'All' || selectedAcademicYear !== 'All';

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
    setNewParentFormData({
      name: '',
      email: '',
      phone: '',
    });
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
            setParentsList(pList => pList.map(p => p.id === s.parentId ? {...p, childrenIds: p.childrenIds.filter(cid => cid !== s.id)} : p));
          }
          if (finalParentId && s.parentId !== finalParentId) {
            setParentsList(pList => pList.map(p => p.id === finalParentId ? {...p, childrenIds: [...p.childrenIds, s.id]} : p));
          }

          const updatedStudent = {
            ...s,
            name: formData.name,
            email: formData.email,
            grade: formData.grade,
            section: formData.section,
            status: formData.status,
            academicYear: formData.academicYear,
            details: { ...s.details, email: formData.email, phone: formData.phone },
            parentId: finalParentId,
            parentName: parentsList.find(p => p.id === finalParentId)?.name || 'N/A',
          };
          return updatedStudent;
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
        photo: `https://placehold.co/150/3b82f6/FFFFFF?text=${formData.name.charAt(0)}`,
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
        setParentsList(pList => pList.map(p => p.id === finalParentId ? {...p, childrenIds: [...p.childrenIds, newStudentId]} : p));
      }
    }
    setIsModalOpen(false);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedGrade('All');
    setSelectedSection('All');
    setSelectedAcademicYear('All');
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">All Students</h1>
          <p className="text-slate-600 text-sm mt-1">Manage and view student information</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-5 py-2.5 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add Student
        </button>
      </div>

      {/* Search Bar with Filter Button */}
      <div className="bg-white rounded-lg border border-slate-200 p-3 mb-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search students by name, email, or phone..."
              className="w-full px-4 py-2 pl-10 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`relative px-4 py-2 font-medium rounded-lg transition-colors flex items-center gap-2 ${
              showFilters 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            )}
          </button>
        </div>
      </div>

      {/* Collapsible Filters */}
      {showFilters && (
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-4 animate-in slide-in-from-top duration-200">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-slate-900">Advanced Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={() => {
                  setSelectedGrade('All');
                  setSelectedSection('All');
                  setSelectedAcademicYear('All');
                }}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                Clear Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Academic Year */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Academic Year</label>
              <select
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="All">All Years</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
              </select>
            </div>

            {/* Grade */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Grade</label>
              <select
                value={selectedGrade}
                onChange={(e) => {
                  setSelectedGrade(e.target.value);
                  setSelectedSection('All');
                }}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
            </div>

            {/* Section */}
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Section</label>
              <select
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {sections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Student Cards */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-lg border border-slate-200 p-5 hover:shadow-md transition-shadow relative"
            >
              {/* Menu */}
              <div className="absolute top-4 right-4">
                <button 
                  onClick={() => setActiveMenuId(activeMenuId === student.id ? null : student.id)}
                  className="p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                {activeMenuId === student.id && (
                  <div className="absolute right-0 mt-1 w-36 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-10">
                    <Link 
                      to={`/teacher-dashboard/student-profile/${student.id}`}
                      className="block px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      View Profile
                    </Link>
                    <button 
                      onClick={() => handleEdit(student)}
                      className="w-full text-left px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => confirmDelete(student)}
                      className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <Link to={`/teacher-dashboard/student-profile/${student.id}`} className="flex flex-col items-center text-center">
                {/* Photo - No Grade Badge */}
                <div className="mb-3">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
                  />
                </div>

                {/* Status */}
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium mb-2 ${
                  student.status === 'Active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {student.status}
                </span>

                {/* Name */}
                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {student.name}
                </h3>

                {/* Badges */}
                <div className="flex flex-wrap items-center justify-center gap-1.5 mb-3">
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-[11px] font-medium">
                    {student.grade}
                  </span>
                  <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[11px] font-medium">
                    Sec {student.section}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded text-[11px] font-medium">
                    {student.academicYear}
                  </span>
                </div>

                {/* Info */}
                <div className="w-full space-y-1.5 pt-3 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Email</span>
                    <span className="text-slate-700 font-medium truncate ml-2 max-w-[140px]">
                      {student.details?.email?.split('@')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Phone</span>
                    <span className="text-slate-700 font-medium">{student.details?.phone || 'N/A'}</span>
                  </div>
                  {student.parentName !== 'N/A' && (
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-500">Parent</span>
                      <span className="text-slate-700 font-medium truncate ml-2 max-w-[140px]">{student.parentName}</span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-1">No Students Found</h3>
          <p className="text-slate-600 text-sm mb-4">
            Try adjusting your filters or search term
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-lg shadow-xl max-h-[90vh] overflow-y-auto">
            <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center sticky top-0 bg-white">
              <h3 className="text-lg font-semibold text-slate-900">{currentStudent ? 'Edit Student' : 'Add New Student'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. Alice Johnson"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. alice@school.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="e.g. 555-123-4567"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Grade</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {grades.filter(g => g !== 'All').map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {sections.filter(s => s !== 'All').map(section => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Academic Year</label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>

              {/* Parent Section */}
              <div className="pt-3 border-t border-slate-200">
                <h4 className="text-sm font-semibold text-slate-900 mb-2">Parent Association</h4>
                <div className="flex gap-4 mb-3">
                  <label className="flex items-center text-sm">
                    <input
                      type="radio"
                      className="mr-2"
                      checked={!isAddingNewParent}
                      onChange={() => setIsAddingNewParent(false)}
                    />
                    <span className="text-slate-700">Select Existing</span>
                  </label>
                  <label className="flex items-center text-sm">
                    <input
                      type="radio"
                      className="mr-2"
                      checked={isAddingNewParent}
                      onChange={() => setIsAddingNewParent(true)}
                    />
                    <span className="text-slate-700">Create New</span>
                  </label>
                </div>

                {!isAddingNewParent ? (
                  <div>
                    <select
                      value={formData.parentId}
                      onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select a Parent</option>
                      {parentsList.map(parent => (
                        <option key={parent.id} value={parent.id}>{parent.name} ({parent.email})</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <input
                      type="text"
                      required
                      value={newParentFormData.name}
                      onChange={handleNewParentFormChange}
                      name="name"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Parent Name"
                    />
                    <input
                      type="email"
                      required
                      value={newParentFormData.email}
                      onChange={handleNewParentFormChange}
                      name="email"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Parent Email"
                    />
                    <input
                      type="tel"
                      required
                      value={newParentFormData.phone}
                      onChange={handleNewParentFormChange}
                      name="phone"
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Parent Phone"
                    />
                  </div>
                )}
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  {currentStudent ? 'Save Changes' : 'Add Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full max-w-sm shadow-xl p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Delete Student?</h3>
            <p className="text-slate-600 text-sm mb-5">
              Are you sure you want to delete <span className="font-semibold">{currentStudent?.name}</span>? This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2 border border-slate-200 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 transition-colors text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentsPage;


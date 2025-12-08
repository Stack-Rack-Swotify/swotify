import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import mockParents from '../../../data/mockParents'; // Import mock parents

const StudentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('All');
  const [selectedSection, setSelectedSection] = useState('All');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('All');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [isAddingNewParent, setIsAddingNewParent] = useState(false); // State to toggle between existing/new parent
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
    parentId: '', // Link to existing parent
  });

  // Local state for parents to enable adding new ones
  const [parentsList, setParentsList] = useState(mockParents);

  // Extract unique grades and sections from mockClasses
  const grades = ['All', ...new Set(mockClasses.map(cls => cls.grade))];
  const sections = ['All', ...new Set(mockClasses.map(cls => cls.section))];

  // Flatten all students from all classes into a single array and add default status and academic year
  // Also link to parent data
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
        details: { // Ensure phone is present
          ...student.details,
          phone: student.details.phone || 'N/A', // Default phone if not present
        }
      };
    })
  );

  const [studentList, setStudentList] = useState(initialStudents);

  // Filter students based on search term, selected grade, and selected section
  const filteredStudents = studentList.filter(student => {
    const matchesSearch = searchTerm === '' || student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.details.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.details.phone.toLowerCase().includes(searchTerm.toLowerCase()); // Include phone in search
    const matchesGrade = selectedGrade === 'All' || student.grade === selectedGrade;
    const matchesSection = selectedSection === 'All' || student.section === selectedSection;
    const matchesAcademicYear = selectedAcademicYear === 'All' || student.academicYear === selectedAcademicYear;
    return matchesSearch && matchesGrade && matchesSection && matchesAcademicYear;
  });

  // Handlers
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
      phone: '', // Add phone to formData
    });
    setNewParentFormData({
      name: '',
      email: '',
      phone: '',
    });
    setIsAddingNewParent(false); // Default to selecting existing parent
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
      phone: student.details?.phone || '', // Add phone to formData
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
      // Create new parent
      const newParentId = `p${Date.now()}`;
      const newParent = {
        id: newParentId,
        name: newParentFormData.name,
        email: newParentFormData.email,
        phone: newParentFormData.phone,
        username: newParentFormData.email, // Default username
        password: newParentFormData.phone, // Default password
        childrenIds: [],
      };
      setParentsList(prev => [...prev, newParent]);
      finalParentId = newParentId;
    }

    if (currentStudent) {
      // Edit Student
      setStudentList(prev => prev.map(s => {
        if (s.id === currentStudent.id) {
          // Update parent's childrenIds if parent is changed
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
            details: { ...s.details, email: formData.email, phone: formData.phone }, // Update phone in details
            parentId: finalParentId,
            parentName: parentsList.find(p => p.id === finalParentId)?.name || 'N/A',
          };
          return updatedStudent;
        }
        return s;
      }));
    } else {
      // Add Student
      const newStudentId = `s${Date.now()}`;
      const newStudent = {
        id: newStudentId,
        name: formData.name,
        email: formData.email,
        grade: formData.grade,
        section: formData.section,
        status: formData.status,
        academicYear: formData.academicYear,
        photo: `https://placehold.co/150/000000/FFFFFF?text=${formData.name.charAt(0)}`,
        details: {
          email: formData.email,
          phone: formData.phone, // Add phone to details
          attendance: 'N/A',
          grade: 'N/A',
          parents: 'N/A',
        },
        assignments: [],
        parentId: finalParentId,
        parentName: parentsList.find(p => p.id === finalParentId)?.name || 'N/A',
      };
      setStudentList(prev => [newStudent, ...prev]);

      // Update parent's childrenIds
      if (finalParentId) {
        setParentsList(pList => pList.map(p => p.id === finalParentId ? {...p, childrenIds: [...p.childrenIds, newStudentId]} : p));
      }
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6 relative">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">All Students</h1>
          <p className="text-[#64748B] text-sm">Manage and view student information</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Student
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
          Search & Filter
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Academic Year Dropdown */}
          <div>
            <label htmlFor="year-select" className="block text-sm font-medium text-[#64748B] mb-2">
              Year
            </label>
            <div className="relative">
              <select
                id="year-select"
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#0EA5E9]/50 appearance-none cursor-pointer"
              >
                <option value="All">All Years</option>
                <option value="2023-2024">2023-2024</option>
                <option value="2024-2025">2024-2025</option>
                <option value="2025-2026">2025-2026</option>
              </select>
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Grade Dropdown */}
          <div>
            <label htmlFor="grade-select" className="block text-sm font-medium text-[#64748B] mb-2">
              Grade
            </label>
            <div className="relative">
              <select
                id="grade-select"
                value={selectedGrade}
                onChange={(e) => {
                  setSelectedGrade(e.target.value);
                  setSelectedSection('All');
                }}
                className="w-full px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#0EA5E9]/50 appearance-none cursor-pointer"
              >
                {grades.map(grade => (
                  <option key={grade} value={grade}>{grade}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Section Dropdown */}
          <div>
            <label htmlFor="section-select" className="block text-sm font-medium text-[#64748B] mb-2">
              Section
            </label>
            <div className="relative">
              <select
                id="section-select"
                value={selectedSection}
                onChange={(e) => setSelectedSection(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#22C55E]/50 appearance-none cursor-pointer"
              >
                {sections.map(section => (
                  <option key={section} value={section}>{section}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div>
            <label htmlFor="search" className="block text-sm font-medium text-[#64748B] mb-2">
              Search Name
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search students..."
                className="w-full px-4 py-3 pl-10 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316] transition-all duration-200 hover:border-[#F97316]/50 text-[#0F172A] bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-[#0F172A] flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
            Students Directory
          </h2>
          <span className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#22C55E]/10 text-[#0EA5E9] px-4 py-2 rounded-full text-sm font-semibold border border-[#0EA5E9]/20 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {filteredStudents.length} {filteredStudents.length === 1 ? 'Student' : 'Students'}
          </span>
        </div>
      </div>

      {/* Student Cards Grid */}
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStudents.map((student) => (
            <div
              key={student.id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative"
            >
              {/* Three Dots Menu */}
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setActiveMenuId(activeMenuId === student.id ? null : student.id);
                  }}
                  className="p-1.5 text-gray-400 hover:text-[#0F172A] hover:bg-gray-100 rounded-full transition-all focus:outline-none"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </button>
                {activeMenuId === student.id && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden animate-fade-in">
                    <Link 
                      to={`/teacher-dashboard/student-profile/${student.id}`}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#0EA5E9]/10 hover:text-[#0EA5E9] transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View Profile
                    </Link>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEdit(student); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#0EA5E9]/10 hover:text-[#0EA5E9] transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button 
                      onClick={(e) => { e.preventDefault(); e.stopPropagation(); confirmDelete(student); }}
                      className="w-full text-left px-4 py-2.5 text-sm text-[#64748B] hover:bg-red-50 hover:text-red-500 transition-colors flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <Link to={`/teacher-dashboard/student-profile/${student.id}`} className="flex flex-col items-center w-full">
                {/* Student Photo */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#22C55E] p-1">
                    <img
                      src={student.photo}
                      alt={student.name}
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                  {/* Grade Badge */}
                  <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#0EA5E9] rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                    <span className="text-xs text-white font-bold">
                      {student.grade.slice(-2)}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    student.status === 'Active' 
                      ? 'bg-green-50 text-green-600 border-green-200' 
                      : 'bg-red-50 text-red-600 border-red-200'
                  }`}>
                    {student.status}
                  </span>
                </div>

                {/* Student Name */}
                <h3 className="text-lg font-bold text-[#0F172A] mb-1 group-hover:text-[#0EA5E9] transition-colors">
                  {student.name}
                </h3>

                {/* Class Info */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#0EA5E9]/5 text-[#0EA5E9] px-3 py-1 rounded-full text-xs font-semibold border border-[#0EA5E9]/20">
                    {student.grade}
                  </span>
                  <span className="bg-gradient-to-r from-[#22C55E]/10 to-[#22C55E]/5 text-[#22C55E] px-3 py-1 rounded-full text-xs font-semibold border border-[#22C55E]/20">
                    Section {student.section}
                  </span>
                  <span className="bg-gradient-to-r from-[#6366f1]/10 to-[#6366f1]/5 text-[#6366f1] px-3 py-1 rounded-full text-xs font-semibold border border-[#6366f1]/20">
                    {student.academicYear}
                  </span>
                  {student.parentName && (
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold border border-purple-200">
                      Parent: {student.parentName}
                    </span>
                  )}
                </div>

                {/* Quick Info */}
                <div className="w-full space-y-2 mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B] flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </span>
                    <span className="text-[#0F172A] font-medium truncate ml-2 max-w-[120px]" title={student.details?.email}>
                      {student.details?.email?.split('@')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B] flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Phone
                    </span>
                    <span className="text-[#0F172A] font-medium">{student.details?.phone || 'N/A'}</span>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#0EA5E9]/20">
            <svg className="w-12 h-12 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-2">No Students Found</h3>
          <p className="text-[#64748B] text-sm max-w-md mx-auto mb-6">
            We couldn't find any students matching your search criteria. Try adjusting your filters or search term.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedGrade('All');
              setSelectedSection('All');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Filters
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-gray-50 to-white">
              <h3 className="text-lg font-bold text-[#0F172A]">{currentStudent ? 'Edit Student' : 'Add New Student'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#64748B] hover:text-[#0F172A] transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                  placeholder="e.g. Alice Johnson"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                  placeholder="e.g. alice@school.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Grade</label>
                  <select
                    value={formData.grade}
                    onChange={(e) => setFormData({...formData, grade: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                  >
                    {grades.filter(g => g !== 'All').map(grade => (
                      <option key={grade} value={grade}>{grade}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Section</label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData({...formData, section: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                  >
                    {sections.filter(s => s !== 'All').map(section => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Academic Year</label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                  >
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                    <option value="2025-2026">2025-2026</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#0F172A] mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                  placeholder="e.g. 555-123-4567"
                />
              </div>

              {/* Parent Association Section */}
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-base font-semibold text-[#0F172A] mb-3">Associate Parent</h4>
                <div className="flex items-center gap-4 mb-3">
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#0EA5E9]"
                      name="parent-option"
                      value="existing"
                      checked={!isAddingNewParent}
                      onChange={() => setIsAddingNewParent(false)}
                    />
                    <span className="ml-2 text-sm text-[#0F172A]">Select Existing Parent</span>
                  </label>
                  <label className="inline-flex items-center">
                    <input
                      type="radio"
                      className="form-radio text-[#0EA5E9]"
                      name="parent-option"
                      value="new"
                      checked={isAddingNewParent}
                      onChange={() => setIsAddingNewParent(true)}
                    />
                    <span className="ml-2 text-sm text-[#0F172A]">Create New Parent</span>
                  </label>
                </div>

                {!isAddingNewParent ? (
                  // Select Existing Parent
                  <div>
                    <label htmlFor="parent-select" className="block text-sm font-semibold text-[#0F172A] mb-1">Parent</label>
                    <select
                      id="parent-select"
                      value={formData.parentId}
                      onChange={(e) => setFormData({...formData, parentId: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                    >
                      <option value="">Select a Parent</option>
                      {parentsList.map(parent => (
                        <option key={parent.id} value={parent.id}>{parent.name} ({parent.email})</option>
                      ))}
                    </select>
                  </div>
                ) : (
                  // Create New Parent
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-1">Parent Name</label>
                      <input
                        type="text"
                        required
                        value={newParentFormData.name}
                        onChange={handleNewParentFormChange}
                        name="name"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                        placeholder="e.g. John Doe (Parent)"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-1">Parent Email</label>
                      <input
                        type="email"
                        required
                        value={newParentFormData.email}
                        onChange={handleNewParentFormChange}
                        name="email"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                        placeholder="e.g. parent@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-[#0F172A] mb-1">Parent Phone</label>
                      <input
                        type="tel"
                        required
                        value={newParentFormData.phone}
                        onChange={handleNewParentFormChange}
                        name="phone"
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                        placeholder="e.g. 555-123-4567"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-4 py-2.5 border border-gray-200 text-[#64748B] font-semibold rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2.5 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl hover:shadow-lg transition-all"
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
          <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center animate-scale-in">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Delete Student?</h3>
            <p className="text-[#64748B] text-sm mb-6">
              Are you sure you want to delete <span className="font-semibold text-[#0F172A]">{currentStudent?.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-4 py-2.5 border border-gray-200 text-[#64748B] font-semibold rounded-xl hover:bg-gray-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 hover:shadow-lg transition-all"
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
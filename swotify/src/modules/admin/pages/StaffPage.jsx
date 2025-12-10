import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockStaff from '../../../data/mockStaff';

const StaffPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('All'); 
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentStaff, setCurrentStaff] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null); 
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Staff',
    subject: '',
    phone: '',
    status: 'Active',
    academicYear: '2024-2025', 
  });

  const getInitialStaffList = () => {
    return mockStaff.map(s => ({
      ...s,
      status: s.status || 'Active',
      academicYear: s.academicYear || '2024-2025',
      details: {
        ...s.details,
        phone: s.details?.phone || 'N/A'
      }
    }));
  };
  const [staffList, setStaffList] = useState(getInitialStaffList);

  const roles = ['All', ...new Set(staffList.map(staff => staff.role))].sort();
  const academicYears = ['All', ...new Set(staffList.map(staff => staff.academicYear))].sort();
  const availableRoles = ['Teacher', 'Principal', 'Admin', 'Librarian', 'Counselor', 'Accountant', 'Nurse', 'IT Administrator', 'Staff'];

  const filteredStaff = staffList.filter(staff => {
    const matchesSearch = searchTerm === '' || staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || staff.role === selectedRole;
    const matchesAcademicYear = selectedAcademicYear === 'All' || staff.academicYear === selectedAcademicYear;
    return matchesSearch && matchesRole && matchesAcademicYear;
  });

  const getRoleConfig = (role) => {
    const configs = {
      'Teacher': { 
        gradient: 'from-blue-500 to-cyan-500', 
        bg: 'bg-blue-500', 
        light: 'bg-blue-50', 
        border: 'border-blue-200', 
        text: 'text-blue-600',
        icon: '👨‍🏫'
      },
      'Principal': { 
        gradient: 'from-orange-500 to-red-500', 
        bg: 'bg-orange-500', 
        light: 'bg-orange-50', 
        border: 'border-orange-200', 
        text: 'text-orange-600',
        icon: '🎓'
      },
      'Admin': { 
        gradient: 'from-emerald-500 to-teal-500', 
        bg: 'bg-emerald-500', 
        light: 'bg-emerald-50', 
        border: 'border-emerald-200', 
        text: 'text-emerald-600',
        icon: '⚙️'
      },
      'Librarian': { 
        gradient: 'from-purple-500 to-pink-500', 
        bg: 'bg-purple-500', 
        light: 'bg-purple-50', 
        border: 'border-purple-200', 
        text: 'text-purple-600',
        icon: '📚'
      },
      'Counselor': { 
        gradient: 'from-teal-500 to-emerald-500', 
        bg: 'bg-teal-500', 
        light: 'bg-teal-50', 
        border: 'border-teal-200', 
        text: 'text-teal-600',
        icon: '🧠'
      },
      'Accountant': { 
        gradient: 'from-indigo-500 to-purple-500', 
        bg: 'bg-indigo-500', 
        light: 'bg-indigo-50', 
        border: 'border-indigo-200', 
        text: 'text-indigo-600',
        icon: '💼'
      },
      'Nurse': { 
        gradient: 'from-pink-500 to-rose-500', 
        bg: 'bg-pink-500', 
        light: 'bg-pink-50', 
        border: 'border-pink-200', 
        text: 'text-pink-600',
        icon: '⚕️'
      },
      'IT Administrator': { 
        gradient: 'from-slate-600 to-slate-700', 
        bg: 'bg-slate-600', 
        light: 'bg-slate-50', 
        border: 'border-slate-200', 
        text: 'text-slate-600',
        icon: '💻'
      },
      'Staff': { 
        gradient: 'from-gray-500 to-gray-600', 
        bg: 'bg-gray-500', 
        light: 'bg-gray-50', 
        border: 'border-gray-200', 
        text: 'text-gray-600',
        icon: '👤'
      },
    };
    return configs[role] || configs['Staff'];
  };

  const handleAdd = () => {
    setCurrentStaff(null);
    setFormData({
      name: '',
      email: '',
      role: 'Staff',
      subject: '',
      phone: '',
      status: 'Active',
      academicYear: '2024-2025', 
    });
    setIsModalOpen(true);
  };

  const handleEdit = (staff) => {
    setCurrentStaff(staff);
    setFormData({
      name: staff.name,
      email: staff.email,
      role: staff.role,
      subject: staff.subject || '',
      phone: staff.details?.phone || '',
      status: staff.status || 'Active',
      academicYear: staff.academicYear || '2024-2025', 
    });
    setIsModalOpen(true);
    setActiveMenuId(null);
  };

  const confirmDelete = (staff) => {
    setCurrentStaff(staff);
    setIsDeleteModalOpen(true);
    setActiveMenuId(null);
  };

  const handleDelete = () => {
    if (currentStaff) {
      setStaffList(prev => prev.filter(s => s.id !== currentStaff.id));
      setIsDeleteModalOpen(false);
      setCurrentStaff(null);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (currentStaff) {
      setStaffList(prev => prev.map(s => s.id === currentStaff.id ? {
        ...s,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        subject: formData.role === 'Teacher' ? formData.subject : undefined,
        status: formData.status,
        academicYear: formData.academicYear,
        details: { ...s.details, phone: formData.phone }
      } : s));
    } else {
      const newStaff = {
        id: `new_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        subject: formData.role === 'Teacher' ? formData.subject : undefined,
        status: formData.status,
        academicYear: formData.academicYear,
        photo: `https://placehold.co/150/000000/FFFFFF?text=${formData.name.charAt(0)}`,
        details: {
          phone: formData.phone,
          address: 'N/A'
        }
      };
      setStaffList(prev => [newStaff, ...prev]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 p-6">
      {/* Modern Header with Gradient */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                Staff Directory
              </h1>
              <p className="text-slate-600 text-sm mt-1">Manage and view all school staff members</p>
            </div>
          </div>
          <button
            onClick={handleAdd}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Add New Staff
          </button>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-4 hover:scale-105 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{staffList.length}</p>
                <p className="text-xs text-slate-600 font-semibold">Total Staff</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-4 hover:scale-105 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {staffList.filter(s => s.status === 'Active').length}
                </p>
                <p className="text-xs text-slate-600 font-semibold">Active</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-4 hover:scale-105 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {staffList.filter(s => s.role === 'Teacher').length}
                </p>
                <p className="text-xs text-slate-600 font-semibold">Teachers</p>
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-4 hover:scale-105 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">
                  {roles.length - 1}
                </p>
                <p className="text-xs text-slate-600 font-semibold">Departments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Filters Section */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
            Search & Filter
          </h2>
          
          {/* View Toggle */}
          <div className="flex items-center gap-2 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'grid' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="Grid View"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-all ${
                viewMode === 'list' 
                  ? 'bg-white shadow-sm text-blue-600' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
              title="List View"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-1">
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name or email..."
                className="w-full pl-11 pr-4 py-3 text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900 bg-white hover:border-emerald-300"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Role Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Role
            </label>
            <div className="relative">
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 text-sm border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-slate-900 rounded-xl transition-all hover:border-blue-300 appearance-none cursor-pointer"
              >
                {roles.map(role => (
                  <option key={role} value={role}>
                    {role === 'All' ? '🔍 All Roles' : `${getRoleConfig(role).icon} ${role}`}
                  </option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Academic Year Filter */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Academic Year
            </label>
            <div className="relative">
              <select
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="w-full px-4 py-3 text-sm border-2 border-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white text-slate-900 rounded-xl transition-all hover:border-purple-300 appearance-none cursor-pointer"
              >
                <option value="All">📅 All Years</option>
                {academicYears.filter(y => y !== 'All').map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {(selectedRole !== 'All' || selectedAcademicYear !== 'All' || searchTerm) && (
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-600">Active Filters:</span>
              {selectedRole !== 'All' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  Role: {selectedRole}
                  <button onClick={() => setSelectedRole('All')} className="ml-1 hover:text-blue-900">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {selectedAcademicYear !== 'All' && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  Year: {selectedAcademicYear}
                  <button onClick={() => setSelectedAcademicYear('All')} className="ml-1 hover:text-purple-900">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              {searchTerm && (
                <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  Search: "{searchTerm}"
                  <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-900">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedRole('All');
                  setSelectedAcademicYear('All');
                }}
                className="px-3 py-1 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-full transition-all"
              >
                Clear All
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/60 p-4 mb-6 flex items-center justify-between">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Showing Results
        </h3>
        <span className="px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 text-slate-900 rounded-xl text-sm font-bold border border-blue-200 shadow-sm">
          {filteredStaff.length} {filteredStaff.length === 1 ? 'Staff Member' : 'Staff Members'}
        </span>
      </div>

      {/* Staff Display */}
      {filteredStaff.length > 0 ? (
        viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStaff.map((staff) => {
              const roleConfig = getRoleConfig(staff.role);
              return (
                <div
                  key={staff.id}
                  onClick={() => navigate(`/admin-dashboard/staff-profile/${staff.id}`)}
                  className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-white/60 p-6 flex flex-col items-center text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer relative"
                >
                  {/* Menu Button */}
                  <div className="absolute top-4 right-4 z-10">
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setActiveMenuId(activeMenuId === staff.id ? null : staff.id);
                      }}
                      className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                      </svg>
                    </button>
                    {activeMenuId === staff.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-slate-200 z-20 overflow-hidden">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEdit(staff);
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Profile
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            confirmDelete(staff);
                          }}
                          className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Profile Photo */}
                  <div className="relative mb-4">
                    <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${roleConfig.gradient} p-1 shadow-2xl`}>
                      <img
                        src={staff.photo}
                        alt={staff.name}
                        className="w-full h-full rounded-3xl object-cover bg-white"
                      />
                    </div>
                    {/* Role Badge */}
                    <div className={`absolute -bottom-2 -right-2 px-3 py-1 bg-gradient-to-r ${roleConfig.gradient} rounded-full border-4 border-white shadow-xl flex items-center justify-center`}>
                      <span className="text-xs text-white font-bold whitespace-nowrap">
                        {roleConfig.icon}
                      </span>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <div className="mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 shadow-sm ${
                      staff.status === 'Active' 
                        ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                        : 'bg-rose-50 text-rose-600 border-rose-200'
                    }`}>
                      <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                        staff.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                      }`}></span>
                      {staff.status || 'Active'}
                    </span>
                  </div>

                  {/* Staff Name */}
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {staff.name}
                  </h3>

                  {/* Role & Year */}
                  <div className="flex items-center gap-2 mb-4 flex-wrap justify-center">
                    <span className={`${roleConfig.light} ${roleConfig.text} px-3 py-1 rounded-full text-xs font-bold border ${roleConfig.border} shadow-sm`}>
                      {staff.role}
                    </span>
                    {staff.subject && (
                      <span className="bg-orange-50 text-orange-600 px-3 py-1 rounded-full text-xs font-bold border border-orange-200 shadow-sm">
                        {staff.subject}
                      </span>
                    )}
                  </div>

                  <span className="bg-purple-50 text-purple-600 px-3 py-1 rounded-full text-xs font-bold border border-purple-200 shadow-sm mb-4">
                    📅 {staff.academicYear}
                  </span>

                  {/* Contact Info */}
                  <div className="w-full space-y-2 pt-4 border-t border-slate-200">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-semibold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </span>
                      <span className="text-slate-900 font-bold truncate ml-2 max-w-[120px]" title={staff.email}>
                        {staff.email.split('@')[0]}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600 font-semibold flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Phone
                      </span>
                      <span className="text-slate-900 font-bold">{staff.details.phone || 'N/A'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // List View
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-blue-50 border-b border-slate-200">
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Staff Member</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Subject/Department</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Academic Year</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-bold text-slate-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {filteredStaff.map((staff) => {
                  const roleConfig = getRoleConfig(staff.role);
                  return (
                    <tr
                      key={staff.id}
                      onClick={() => navigate(`/admin-dashboard/staff-profile/${staff.id}`)}
                      className="hover:bg-blue-50/50 transition-all cursor-pointer"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${roleConfig.gradient} p-0.5 shadow-lg flex-shrink-0`}>
                            <img
                              src={staff.photo}
                              alt={staff.name}
                              className="w-full h-full rounded-xl object-cover bg-white"
                            />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900">{staff.name}</p>
                            <p className="text-xs text-slate-600">{staff.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-3 py-1 ${roleConfig.light} ${roleConfig.text} rounded-full text-xs font-bold border ${roleConfig.border}`}>
                          <span>{roleConfig.icon}</span>
                          {staff.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-slate-900">
                          {staff.subject || staff.details?.department || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-slate-900">{staff.academicYear}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-slate-900">{staff.details.phone || 'N/A'}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border-2 ${
                          staff.status === 'Active' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' 
                            : 'bg-rose-50 text-rose-600 border-rose-200'
                        }`}>
                          <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                            staff.status === 'Active' ? 'bg-emerald-500' : 'bg-rose-500'
                          }`}></span>
                          {staff.status || 'Active'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right">
                        <div className="relative inline-block">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(activeMenuId === staff.id ? null : staff.id);
                            }}
                            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                          {activeMenuId === staff.id && (
                            <div className="absolute right-0 mt-2 w-40 bg-white rounded-2xl shadow-2xl border border-slate-200 z-20 overflow-hidden">
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEdit(staff);
                                }}
                                className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition-all flex items-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Edit
                              </button>
                              <button 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  confirmDelete(staff);
                                }}
                                className="w-full text-left px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center gap-2"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )
      ) : (
        // Empty State
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center mx-auto mb-6 border-2 border-blue-200">
            <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">No Staff Found</h3>
          <p className="text-slate-600 text-sm max-w-md mx-auto mb-6">
            We couldn't find any staff members matching your criteria. Try adjusting your filters or search term.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRole('All');
              setSelectedAcademicYear('All');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset All Filters
          </button>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-scale-in">
            <div className="px-6 py-5 border-b border-slate-200 flex justify-between items-center bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50">
              <h3 className="text-xl font-bold text-slate-900">{currentStaff ? '✏️ Edit Staff Member' : '✨ Add New Staff'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleFormSubmit} className="p-6 space-y-4 max-h-[600px] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-slate-900"
                    placeholder="e.g. John Doe"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all text-slate-900"
                    placeholder="e.g. john.doe@school.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                    Role *
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all text-slate-900 cursor-pointer"
                  >
                    {availableRoles.map(role => (
                      <option key={role} value={role}>{getRoleConfig(role).icon} {role}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    Status *
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all text-slate-900 cursor-pointer"
                  >
                    <option value="Active">✅ Active</option>
                    <option value="Inactive">❌ Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-indigo-500 rounded-full"></span>
                    Academic Year *
                  </label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all text-slate-900 cursor-pointer"
                  >
                    {academicYears.filter(y => y !== 'All').map(year => (
                      <option key={year} value={year}>📅 {year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all text-slate-900"
                    placeholder="e.g. +1 (555) 123-4567"
                  />
                </div>
                {formData.role === 'Teacher' && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-slate-900"
                      placeholder="e.g. Mathematics, Physics, English"
                    />
                  </div>
                )}
              </div>
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
                >
                  {currentStaff ? '💾 Save Changes' : '✨ Add Staff'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl p-8 text-center animate-scale-in">
            <div className="w-20 h-20 bg-gradient-to-br from-rose-100 to-red-100 rounded-3xl flex items-center justify-center mx-auto mb-4 border-2 border-rose-200">
              <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Delete Staff Member?</h3>
            <p className="text-slate-600 text-sm mb-6">
              Are you sure you want to delete <span className="font-bold text-slate-900">{currentStaff?.name}</span>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="flex-1 px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-rose-500 to-red-500 text-white font-bold rounded-xl hover:shadow-xl transition-all hover:scale-105"
              >
                🗑️ Delete
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
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3B82F6 0%, #8B5CF6 100%);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #8B5CF6 0%, #3B82F6 100%);
        }
      `}</style>
    </div>
  );
};

export default StaffPage;

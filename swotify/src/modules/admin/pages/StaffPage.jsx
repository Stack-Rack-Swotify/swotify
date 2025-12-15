import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockStaff from '../../../data/mockStaff';

const StaffPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('All'); 
  const [viewMode, setViewMode] = useState('grid');
  
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
        light: 'bg-blue-50 dark:bg-blue-900/20', 
        border: 'border-blue-300 dark:border-blue-700', 
        text: 'text-blue-600 dark:text-blue-400',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
      },
      'Principal': { 
        gradient: 'from-orange-500 to-red-500', 
        bg: 'bg-orange-500', 
        light: 'bg-orange-50 dark:bg-orange-900/20', 
        border: 'border-orange-300 dark:border-orange-700', 
        text: 'text-orange-600 dark:text-orange-400',
        icon: 'M12 14l9-5-9-5-9 5 9 5z M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z'
      },
      'Admin': { 
        gradient: 'from-emerald-500 to-teal-500', 
        bg: 'bg-emerald-500', 
        light: 'bg-emerald-50 dark:bg-emerald-900/20', 
        border: 'border-emerald-300 dark:border-emerald-700', 
        text: 'text-emerald-600 dark:text-emerald-400',
        icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
      },
      'Librarian': { 
        gradient: 'from-purple-500 to-pink-500', 
        bg: 'bg-purple-500', 
        light: 'bg-purple-50 dark:bg-purple-900/20', 
        border: 'border-purple-300 dark:border-purple-700', 
        text: 'text-purple-600 dark:text-purple-400',
        icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253'
      },
      'Counselor': { 
        gradient: 'from-teal-500 to-emerald-500', 
        bg: 'bg-teal-500', 
        light: 'bg-teal-50 dark:bg-teal-900/20', 
        border: 'border-teal-300 dark:border-teal-700', 
        text: 'text-teal-600 dark:text-teal-400',
        icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
      },
      'Accountant': { 
        gradient: 'from-indigo-500 to-purple-500', 
        bg: 'bg-indigo-500', 
        light: 'bg-indigo-50 dark:bg-indigo-900/20', 
        border: 'border-indigo-300 dark:border-indigo-700', 
        text: 'text-indigo-600 dark:text-indigo-400',
        icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      },
      'Nurse': { 
        gradient: 'from-pink-500 to-rose-500', 
        bg: 'bg-pink-500', 
        light: 'bg-pink-50 dark:bg-pink-900/20', 
        border: 'border-pink-300 dark:border-pink-700', 
        text: 'text-pink-600 dark:text-pink-400',
        icon: 'M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z'
      },
      'IT Administrator': { 
        gradient: 'from-slate-600 to-slate-700', 
        bg: 'bg-slate-600', 
        light: 'bg-slate-50 dark:bg-slate-900/20', 
        border: 'border-slate-300 dark:border-slate-700', 
        text: 'text-slate-600 dark:text-slate-400',
        icon: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
      },
      'Staff': { 
        gradient: 'from-gray-500 to-gray-600', 
        bg: 'bg-gray-500', 
        light: 'bg-gray-50 dark:bg-gray-900/20', 
        border: 'border-gray-300 dark:border-gray-700', 
        text: 'text-gray-600 dark:text-gray-400',
        icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 p-6">
        {/* Premium Enhanced Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-18 h-18 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Staff Directory
                </h1>
                <p className="text-slate-600 dark:text-gray-400 text-sm mt-1 font-bold">Manage and view all school staff members</p>
              </div>
            </div>
            <button
              onClick={handleAdd}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3 border-2 border-white/20"
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Add New Staff
            </button>
          </div>

          {/* Premium Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { label: 'Total Staff', value: staffList.length, icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', gradient: 'from-blue-500 to-cyan-500' },
              { label: 'Active', value: staffList.filter(s => s.status === 'Active').length, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', gradient: 'from-emerald-500 to-teal-500' },
              { label: 'Teachers', value: staffList.filter(s => s.role === 'Teacher').length, icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', gradient: 'from-orange-500 to-red-500' },
              { label: 'Departments', value: roles.length - 1, icon: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', gradient: 'from-purple-500 to-pink-500' }
            ].map((stat, idx) => (
              <div key={idx} className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 p-6 hover:shadow-2xl hover:scale-105 transition-all">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg`}>
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                    </svg>
                  </div>
                  <div>
                    <p className="text-3xl font-extrabold text-slate-900 dark:text-gray-100">{stat.value}</p>
                    <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{stat.label}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Premium Enhanced Filters Section */}
        <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 p-7 mb-6 hover:shadow-2xl transition-all overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-center justify-between mb-7">
            <div className="flex items-center gap-3">
              <div className="w-2 h-10 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-gray-100">Search & Filter</h2>
            </div>
            
            {/* View Toggle */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-gray-700 rounded-xl p-1 shadow-inner">
              {['grid', 'list'].map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`p-3 rounded-lg transition-all ${viewMode === mode ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-105' : 'text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-gray-100'}`}
                  title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} View`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={mode === 'grid' ? 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z' : 'M4 6h16M4 10h16M4 14h16M4 18h16'} />
                  </svg>
                </button>
              ))}
            </div>
          </div>
          
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Search Bar */}
            <div className="md:col-span-1">
              <label className="block text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  className="w-full pl-12 pr-4 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 dark:focus:border-emerald-600 transition-all text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-700 hover:border-emerald-300 dark:hover:border-emerald-700 font-bold shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500 hover:text-slate-600 dark:hover:text-gray-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Role Filter */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Role
              </label>
              <div className="relative">
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="w-full px-4 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 rounded-xl transition-all hover:border-blue-300 dark:hover:border-blue-700 appearance-none cursor-pointer font-bold shadow-sm"
                >
                  {roles.map(role => (
                    <option key={role} value={role}>
                      {role === 'All' ? '🔍 All Roles' : role}
                    </option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Academic Year Filter */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider mb-3 flex items-center gap-2">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Academic Year
              </label>
              <div className="relative">
                <select
                  value={selectedAcademicYear}
                  onChange={(e) => setSelectedAcademicYear(e.target.value)}
                  className="w-full px-4 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 rounded-xl transition-all hover:border-purple-300 dark:hover:border-purple-700 appearance-none cursor-pointer font-bold shadow-sm"
                >
                  <option value="All">📅 All Years</option>
                  {academicYears.filter(y => y !== 'All').map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-gray-500 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(selectedRole !== 'All' || selectedAcademicYear !== 'All' || searchTerm) && (
            <div className="relative mt-6 pt-6 border-t-2 border-slate-200 dark:border-gray-700">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="text-xs font-extrabold text-slate-600 dark:text-gray-400">Active Filters:</span>
                {selectedRole !== 'All' && (
                  <span className="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-extrabold flex items-center gap-2 shadow-sm border-2 border-blue-300 dark:border-blue-700">
                    Role: {selectedRole}
                    <button onClick={() => setSelectedRole('All')} className="ml-1 hover:text-blue-900 dark:hover:text-blue-300">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {selectedAcademicYear !== 'All' && (
                  <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-full text-xs font-extrabold flex items-center gap-2 shadow-sm border-2 border-purple-300 dark:border-purple-700">
                    Year: {selectedAcademicYear}
                    <button onClick={() => setSelectedAcademicYear('All')} className="ml-1 hover:text-purple-900 dark:hover:text-purple-300">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </span>
                )}
                {searchTerm && (
                  <span className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-extrabold flex items-center gap-2 shadow-sm border-2 border-emerald-300 dark:border-emerald-700">
                    Search: "{searchTerm}"
                    <button onClick={() => setSearchTerm('')} className="ml-1 hover:text-emerald-900 dark:hover:text-emerald-300">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
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
                  className="px-4 py-2 text-xs font-extrabold text-rose-600 dark:text-rose-400 hover:text-rose-700 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-full transition-all shadow-sm"
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Header */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 p-5 mb-6 flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-gray-100 flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse"></div>
            Showing Results
          </h3>
          <span className="px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-slate-900 dark:text-gray-100 rounded-xl text-sm font-extrabold border-2 border-blue-300 dark:border-blue-700 shadow-lg">
            {filteredStaff.length} {filteredStaff.length === 1 ? 'Staff Member' : 'Staff Members'}
          </span>
        </div>

        {/* Continued in next response due to length... */}
      </div>
    </div>
  );
};

export default StaffPage;


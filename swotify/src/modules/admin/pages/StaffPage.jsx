import React, { useState, useEffect } from 'react'; // Added useEffect for potential future use or debugging
import mockStaff from '../../../data/mockStaff';

const StaffPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');
  const [selectedAcademicYear, setSelectedAcademicYear] = useState('All'); 
  
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

  // Ensure mockStaff has default status and academicYear
  const getInitialStaffList = () => {
    return mockStaff.map(s => ({
      ...s,
      status: s.status || 'Active',
      academicYear: s.academicYear || '2024-2025',
      details: {
        ...s.details,
        phone: s.details?.phone || 'N/A' // Ensure phone is handled
      }
    }));
  };
  const [staffList, setStaffList] = useState(getInitialStaffList);

  // Extract unique roles and academic years dynamically from current staffList
  const roles = ['All', ...new Set(staffList.map(staff => staff.role))].sort();
  const academicYears = ['All', ...new Set(staffList.map(staff => staff.academicYear))].sort();
  const availableRoles = ['Teacher', 'Principal', 'Admin', 'Librarian', 'Counselor', 'Accountant', 'Nurse', 'IT Administrator', 'Staff'];

  // Filter staff members based on search term, selected role and academic year
  const filteredStaff = staffList.filter(staff => {
    const matchesSearch = searchTerm === '' || staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || staff.role === selectedRole;
    const matchesAcademicYear = selectedAcademicYear === 'All' || staff.academicYear === selectedAcademicYear;
    return matchesSearch && matchesRole && matchesAcademicYear;
  });

  // Role color mapping (unchanged, seems fine)
  const getRoleColor = (role) => {
    const roleColors = {
      'Teacher': { bg: 'bg-[#0EA5E9]', light: 'bg-[#0EA5E9]/10', border: 'border-[#0EA5E9]/20', text: 'text-[#0EA5E9]' },
      'Principal': { bg: 'bg-[#F97316]', light: 'bg-[#F97316]/10', border: 'border-[#F97316]/20', text: 'text-[#F97316]' },
      'Admin': { bg: 'bg-[#22C55E]', light: 'bg-[#22C55E]/10', border: 'border-[#22C55E]/20', text: 'text-[#22C55E]' },
      'Librarian': { bg: 'bg-sky-500', light: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-500' },
      'Counselor': { bg: 'bg-emerald-500', light: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-500' },
      'Accountant': { bg: 'bg-purple-500', light: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-500' },
      'Nurse': { bg: 'bg-pink-500', light: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-500' },
      'IT Administrator': { bg: 'bg-teal-500', light: 'bg-teal-500/10', border: 'border-teal-500/20', text: 'text-teal-500' },
      'Staff': { bg: 'bg-[#94A3B8]', light: 'bg-[#94A3B8]/10', border: 'border-[#94A3B8]/20', text: 'text-[#94A3B8]' },
    };
    return roleColors[role] || { bg: 'bg-[#64748B]', light: 'bg-[#64748B]/10', border: 'border-[#64748B]/20', text: 'text-[#64748B]' };
  };

  // Handlers
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
      // Edit
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
      // Add
      const newStaff = {
        id: `new_${Date.now()}`,
        name: formData.name,
        email: formData.email,
        role: formData.role,
        subject: formData.role === 'Teacher' ? formData.subject : undefined,
        status: formData.status,
        academicYear: formData.academicYear,
        photo: `https://placehold.co/150/000000/FFFFFF?text=${formData.name.charAt(0)}`, // Simple placeholder
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
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6 relative">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Staff Directory</h1>
          <p className="text-[#64748B] text-sm">Manage and view information for all school staff</p>
        </div>
        <button
          onClick={handleAdd}
          className="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Staff
        </button>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <h2 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-3"></span>
          Search & Filter Staff
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Academic Year Dropdown */}
          <div>
            <label htmlFor="year-select" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Year
            </label>
            <div className="relative">
              <select
                id="year-select"
                value={selectedAcademicYear}
                onChange={(e) => setSelectedAcademicYear(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#6366f1]/50 focus:border-[#6366f1] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#6366f1]/50 appearance-none cursor-pointer"
              >
                <option value="All">All Years</option>
                {academicYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Role Dropdown */}
          <div>
            <label htmlFor="role-select" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Role
            </label>
            <div className="relative">
              <select
                id="role-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#0EA5E9]/50 appearance-none cursor-pointer"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="md:col-span-1">
            <label htmlFor="search" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
              <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search Name or Email
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search staff members..."
                className="w-full px-4 py-3 pl-10 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] transition-all duration-200 hover:border-[#22C55E]/50 text-[#0F172A] bg-white"
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
            <span className="w-1 h-6 bg-gradient-to-b from-[#F97316] to-[#0EA5E9] rounded-full mr-3"></span>
            Staff Directory
          </h2>
          <span className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#22C55E]/10 text-[#0EA5E9] px-4 py-2 rounded-full text-sm font-semibold border border-[#0EA5E9]/20 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {filteredStaff.length} {filteredStaff.length === 1 ? 'Staff Member' : 'Staff Members'}
          </span>
        </div>
      </div>

      {/* Staff Cards Grid */}
      {filteredStaff.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((staff) => {
            const roleColor = getRoleColor(staff.role);
            return (
              <div
                key={staff.id}
                className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-xl hover:border-[#0EA5E9]/30 transition-all duration-300 transform hover:-translate-y-2 relative"
              >
                {/* Three Dots Menu */}
                <div className="absolute top-4 right-4">
                  <button 
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveMenuId(activeMenuId === staff.id ? null : staff.id);
                    }}
                    className="p-1.5 text-gray-400 hover:text-[#0F172A] hover:bg-gray-100 rounded-full transition-all focus:outline-none"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                    </svg>
                  </button>
                  {activeMenuId === staff.id && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-xl border border-gray-100 z-10 overflow-hidden animate-fade-in">
                      <button 
                        onClick={() => handleEdit(staff)}
                        className="w-full text-left px-4 py-2.5 text-sm text-[#64748B] hover:bg-[#0EA5E9]/10 hover:text-[#0EA5E9] transition-colors flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit
                      </button>
                      <button 
                        onClick={() => confirmDelete(staff)}
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

                {/* Staff Photo */}
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#22C55E] p-1">
                    <img
                      src={staff.photo}
                      alt={staff.name}
                      className="w-full h-full rounded-full object-cover bg-white"
                    />
                  </div>
                  {/* Role Badge */}
                  <div className={`absolute -bottom-2 -right-2 px-2.5 py-1 ${roleColor.bg} rounded-full border-2 border-white flex items-center justify-center shadow-lg`}>
                    <span className="text-xs text-white font-bold whitespace-nowrap">
                      {staff.role}
                    </span>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="mb-3">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                    staff.status === 'Active' 
                      ? 'bg-green-50 text-green-600 border-green-200' 
                      : 'bg-red-50 text-red-600 border-red-200'
                  }`}>
                    {staff.status || 'Active'}
                  </span>
                </div>

                {/* Staff Name */}
                <h3 className="text-lg font-bold text-[#0F172A] mb-1 group-hover:text-[#0EA5E9] transition-colors">
                  {staff.name}
                </h3>

                {/* Staff Info */}
                <div className="flex items-center gap-2 mb-3 flex-wrap justify-center">
                  {staff.subject && (
                    <span className="bg-[#F97316]/10 text-[#F97316] px-3 py-1 rounded-full text-xs font-semibold border border-[#F97316]/20">
                      {staff.subject}
                    </span>
                  )}
                  <span className="bg-gradient-to-r from-[#6366f1]/10 to-[#6366f1]/5 text-[#6366f1] px-3 py-1 rounded-full text-xs font-semibold border border-[#6366f1]/20">
                    {staff.academicYear}
                  </span>
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
                    <span className="text-[#0F172A] font-medium truncate ml-2 max-w-[120px]" title={staff.email}>
                      {staff.email.split('@')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#64748B] flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Phone
                    </span>
                    <span className="text-[#0F172A] font-medium">{staff.details.phone || 'N/A'}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#0EA5E9]/20">
            <svg className="w-12 h-12 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-2">No Staff Found</h3>
          <p className="text-[#64748B] text-sm max-w-md mx-auto mb-6">
            We couldn't find any staff members matching your criteria. Try adjusting your filters or search term.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRole('All');
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
              <h3 className="text-lg font-bold text-[#0F172A]">{currentStaff ? 'Edit Staff Member' : 'Add New Staff'}</h3>
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
                  placeholder="e.g. John Doe"
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
                  placeholder="e.g. john@school.com"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Role</label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({...formData, role: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                  >
                    {availableRoles.map(role => (
                      <option key={role} value={role}>{role}</option>
                    ))}
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
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Academic Year</label>
                  <select
                    value={formData.academicYear}
                    onChange={(e) => setFormData({...formData, academicYear: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                  >
                    {academicYears.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                    placeholder="e.g. 555-0123"
                  />
                </div>
              </div>
              {formData.role === 'Teacher' && (
                <div>
                  <label className="block text-sm font-semibold text-[#0F172A] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all text-[#0F172A]"
                    placeholder="e.g. Mathematics"
                  />
                </div>
              )}
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
                  {currentStaff ? 'Save Changes' : 'Add Staff'}
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
            <h3 className="text-xl font-bold text-[#0F172A] mb-2">Delete Staff Member?</h3>
            <p className="text-[#64748B] text-sm mb-6">
              Are you sure you want to delete <span className="font-semibold text-[#0F172A]">{currentStaff?.name}</span>? This action cannot be undone.
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

export default StaffPage;

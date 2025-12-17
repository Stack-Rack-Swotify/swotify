import React, { useState } from 'react';

const SchoolAndSystemManagementPage = () => {
  // --- State Management ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState('All');

  const [schools, setSchools] = useState([
    { id: 1, name: 'Greenwood High', principal: 'Mr. John Smith', email: 'principal@greenwood.edu', students: 1200, teachers: 80, status: 'Active' },
    { id: 2, name: 'Sunnydale Academy', principal: 'Mrs. Sarah Jones', email: 'principal@sunnydale.edu', students: 850, teachers: 60, status: 'Active' },
    { id: 3, name: 'Oakridge International', principal: 'Dr. Michael Brown', email: 'principal@oakridge.edu', students: 1500, teachers: 110, status: 'Active' },
    { id: 4, name: 'Riverside Public School', principal: 'Ms. Emily Davis', email: 'principal@riverside.edu', students: 950, teachers: 65, status: 'Inactive' },
  ]);

  const [newSchool, setNewSchool] = useState({
    name: '', principal: '', email: '', password: '', confirmPassword: '', address: '', phone: ''
  });

  const [formError, setFormError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchool(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError('');

    if (name === 'password') {
      if (value.length < 6) setPasswordStrength('weak');
      else if (value.length < 10) setPasswordStrength('medium');
      else setPasswordStrength('strong');
    }
  };

  const handleAddSchool = (e) => {
    e.preventDefault();
    if (newSchool.password !== newSchool.confirmPassword) {
      setFormError('Passwords do not match!');
      return;
    }
    if (newSchool.password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }

    const school = {
      id: schools.length + 1,
      name: newSchool.name,
      principal: newSchool.principal,
      email: newSchool.email,
      students: 0,
      teachers: 0,
      status: 'Active'
    };

    setSchools([...schools, school]);
    setShowAddModal(false);
    setNewSchool({ name: '', principal: '', email: '', password: '', confirmPassword: '', address: '', phone: '' });
    setFormError('');
    setPasswordStrength('');

    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  const handleRemoveSchool = (id) => {
    if (window.confirm('Are you sure you want to remove this school?')) {
      setSchools(schools.filter(school => school.id !== id));
    }
  };

  const filteredSchools = schools.filter(school => {
    const matchesSearch = school.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.principal.toLowerCase().includes(searchTerm.toLowerCase()) ||
      school.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || school.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalStudents = schools.reduce((sum, s) => sum + s.students, 0);
  const totalTeachers = schools.reduce((sum, s) => sum + s.teachers, 0);
  const activeSchools = schools.filter(s => s.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-20 right-6 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">School Added Successfully!</p>
              <p className="text-xs text-slate-500">Login credentials have been created.</p>
            </div>
            <button onClick={() => setShowSuccessToast(false)} className="p-1 hover:bg-slate-100 rounded-lg">
              <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">School Management</h1>
            <p className="text-slate-500 text-sm">Manage registered schools and system configurations.</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add School
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{activeSchools} Active</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{schools.length}</p>
          <p className="text-sm text-slate-500">Total Schools</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+150</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalStudents.toLocaleString()}</p>
          <p className="text-sm text-slate-500">Total Students</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalTeachers}</p>
          <p className="text-sm text-slate-500">Total Staff</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">Online</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">98%</p>
          <p className="text-sm text-slate-500">System Health</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-3 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search schools by name, principal, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`px-4 py-3 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${isFilterOpen ? 'bg-blue-500 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
            {statusFilter !== 'All' && <span className="w-2 h-2 bg-orange-400 rounded-full"></span>}
          </button>
        </div>

        {isFilterOpen && (
          <div className="mt-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Status</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => { setSearchTerm(''); setStatusFilter('All'); }}
                  className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium"
                >
                  Reset All
                </button>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Schools Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">Registered Schools</h2>
          <p className="text-sm text-slate-500">{filteredSchools.length} school{filteredSchools.length !== 1 ? 's' : ''} found</p>
        </div>

        {filteredSchools.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">School</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Principal</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Email</th>
                  <th className="text-center py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Students</th>
                  <th className="text-center py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Status</th>
                  <th className="text-center py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school) => (
                  <tr key={school.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                          </svg>
                        </div>
                        <span className="font-semibold text-slate-800">{school.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{school.principal}</td>
                    <td className="py-4 px-6 text-sm text-slate-600 font-mono">{school.email}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                        {school.students.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${school.status === 'Active'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-red-100 text-red-700'
                        }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${school.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                        {school.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-1">
                        <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                        <button className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors" title="Edit">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleRemoveSchool(school.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Remove"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
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
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-1">No schools found</h3>
            <p className="text-sm text-slate-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add School
            </button>
          </div>
        )}
      </div>

      {/* Add School Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between sticky top-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Add New School</h2>
                  <p className="text-sm text-slate-500">Create school account with login credentials</p>
                </div>
              </div>
              <button
                onClick={() => { setShowAddModal(false); setFormError(''); }}
                className="p-2 hover:bg-slate-100 rounded-lg"
              >
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleAddSchool} className="p-6 space-y-4">
              {formError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-red-700 font-medium">{formError}</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">School Name *</label>
                  <input
                    type="text" name="name" required
                    value={newSchool.name} onChange={handleInputChange}
                    placeholder="Enter school name"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Principal Name *</label>
                  <input
                    type="text" name="principal" required
                    value={newSchool.principal} onChange={handleInputChange}
                    placeholder="Enter principal name"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Login Email *</label>
                  <input
                    type="email" name="email" required
                    value={newSchool.email} onChange={handleInputChange}
                    placeholder="admin@school.com"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel" name="phone"
                    value={newSchool.phone} onChange={handleInputChange}
                    placeholder="+91-1234567890"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
                  <input
                    type="password" name="password" required
                    value={newSchool.password} onChange={handleInputChange}
                    placeholder="Min. 6 characters"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {passwordStrength && newSchool.password && (
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className={`h-full transition-all ${passwordStrength === 'weak' ? 'w-1/3 bg-red-500' :
                            passwordStrength === 'medium' ? 'w-2/3 bg-orange-500' : 'w-full bg-green-500'
                          }`} />
                      </div>
                      <span className={`text-xs font-medium ${passwordStrength === 'weak' ? 'text-red-600' :
                          passwordStrength === 'medium' ? 'text-orange-600' : 'text-green-600'
                        }`}>{passwordStrength}</span>
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password *</label>
                  <input
                    type="password" name="confirmPassword" required
                    value={newSchool.confirmPassword} onChange={handleInputChange}
                    placeholder="Re-enter password"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-1">Address</label>
                  <textarea
                    name="address" rows="2"
                    value={newSchool.address} onChange={handleInputChange}
                    placeholder="Enter complete school address"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => { setShowAddModal(false); setFormError(''); }}
                  className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
                >
                  Create School
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolAndSystemManagementPage;

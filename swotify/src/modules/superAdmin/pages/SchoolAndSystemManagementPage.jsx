import React, { useState } from 'react';

const SchoolAndSystemManagementPage = () => {
  // --- State Management ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [schools, setSchools] = useState([
    { id: 1, name: 'Greenwood High', principal: 'Mr. John Smith', email: 'principal@greenwood.edu', students: 1200, status: 'Active' },
    { id: 2, name: 'Sunnydale Academy', principal: 'Mrs. Sarah Jones', email: 'principal@sunnydale.edu', students: 850, status: 'Active' },
  ]);
  
  const [newSchool, setNewSchool] = useState({
    name: '',
    principal: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    logo: null
  });

  // Inline validation and feedback
  const [formError, setFormError] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchool(prev => ({
      ...prev,
      [name]: value
    }));

    if (formError) setFormError('');

    if (name === 'password') {
      if (value.length < 6) setPasswordStrength('weak');
      else if (value.length < 10) setPasswordStrength('medium');
      else setPasswordStrength('strong');
    }

    if (name === 'confirmPassword' || name === 'password') {
      const pwd = name === 'password' ? value : newSchool.password;
      const confirmPwd = name === 'confirmPassword' ? value : newSchool.confirmPassword;
      
      if (confirmPwd && pwd !== confirmPwd) {
        setFormError('Passwords do not match');
      } else if (formError === 'Passwords do not match') {
        setFormError('');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2000000) {
      setFormError('Logo file size must be less than 2MB');
      return;
    }
    setNewSchool(prev => ({ ...prev, logo: file }));
    setFormError('');
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
      status: 'Active'
    };
    
    setSchools([...schools, school]);
    setShowAddModal(false);
    setNewSchool({ name: '', principal: '', email: '', password: '', confirmPassword: '', address: '', phone: '', logo: null });
    setFormError('');
    setPasswordStrength('');
    
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  const handleViewSchool = (id) => {
    console.log('View school:', id);
    alert(`Viewing details for school ID: ${id}`);
  };

  const handleEditSchool = (id) => {
    console.log('Edit school:', id);
    alert(`Edit functionality for school ID: ${id}`);
  };

  const handleRemoveSchool = (id) => {
    if (window.confirm('Are you sure you want to remove this school? This will delete all logins and details associated with the school.')) {
      setSchools(schools.filter(school => school.id !== id));
    }
  };

  const stats = [
    { label: 'Total Schools', value: schools.length, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Active Schools', value: schools.filter(s => s.status === 'Active').length, icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Total Students', value: schools.reduce((sum, s) => sum + s.students, 0).toLocaleString(), icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', gradient: 'from-purple-500 to-pink-500' },
    { label: 'System Health', value: '98%', icon: 'M13 10V3L4 14h7v7l9-11h-7z', gradient: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white p-6 animate-fade-in">
      
      {/* Premium Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right-5 duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-emerald-200 p-5 flex items-start gap-4 max-w-md">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">School Added Successfully!</p>
              <p className="text-xs text-slate-600 mt-1 font-medium">Login credentials have been created and sent via email.</p>
            </div>
            <button onClick={() => setShowSuccessToast(false)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        
        {/* Premium Header */}
        <div className="mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 shadow-2xl border-2 border-slate-700/50">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative">
              <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-3">
                School Management
                <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 text-xs font-bold rounded-lg shadow-lg">
                  {schools.length} SCHOOLS
                </span>
              </h1>
              <p className="text-slate-300 text-sm font-medium">Manage registered schools and system configurations</p>
            </div>
          </div>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-200/60 hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-600 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="space-y-6 animate-in fade-in duration-300">
          <div className="flex justify-end">
            <button 
              onClick={() => setShowAddModal(true)}
              className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20"
            >
              <svg className="w-5 h-5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add School & Login
            </button>
          </div>

          {/* Premium Schools Table */}
          <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-2xl overflow-hidden">
            <div className="p-6 border-b-2 border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Registered Schools</h2>
                  <p className="text-sm text-slate-600 mt-1 font-bold">{schools.length} school{schools.length !== 1 ? 's' : ''} registered in the system</p>
                </div>
              </div>
            </div>

            {schools.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 border-b-2 border-slate-700">
                      <th className="text-left py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">School Name</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Principal / Admin</th>
                      <th className="text-left py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Login Email</th>
                      <th className="text-center py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Students</th>
                      <th className="text-center py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Status</th>
                      <th className="text-center py-4 px-6 text-xs font-bold text-white uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {schools.map((school, index) => (
                      <tr key={school.id} className={`border-b-2 border-slate-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all group ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                        <td className="py-4 px-6">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform shadow-sm">
                              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                              </svg>
                            </div>
                            <span className="font-bold text-slate-900">{school.name}</span>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-slate-600 font-bold">{school.principal}</td>
                        <td className="py-4 px-6 text-sm text-slate-600 font-mono font-bold">{school.email}</td>
                        <td className="py-4 px-6 text-center">
                          <span className="px-3 py-1.5 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-lg text-sm font-bold border-2 border-purple-200/50">
                            {school.students}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-bold border-2 ${
                            school.status === 'Active' 
                              ? 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200/50' 
                              : 'bg-gradient-to-r from-red-100 to-rose-100 text-red-700 border-red-200/50'
                          }`}>
                            <span className={`w-2 h-2 rounded-full mr-2 ${school.status === 'Active' ? 'bg-emerald-500' : 'bg-red-500'} animate-pulse`}></span>
                            {school.status}
                          </span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center justify-center gap-2">
                            {/* View Button */}
                            <button 
                              onClick={() => handleViewSchool(school.id)}
                              className="group/btn p-2.5 text-blue-600 hover:bg-gradient-to-br hover:from-blue-50 hover:to-cyan-50 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-blue-200 hover:scale-110"
                              title="View Details"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>

                            {/* Edit Button */}
                            <button 
                              onClick={() => handleEditSchool(school.id)}
                              className="group/btn p-2.5 text-amber-600 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-amber-200 hover:scale-110"
                              title="Edit School"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>

                            {/* Remove Button */}
                            <button 
                              onClick={() => handleRemoveSchool(school.id)}
                              className="group/btn p-2.5 text-red-600 hover:bg-gradient-to-br hover:from-red-50 hover:to-rose-50 rounded-xl transition-all duration-200 border-2 border-transparent hover:border-red-200 hover:scale-110"
                              title="Remove School"
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
            ) : (
              /* Premium Empty State */
              <div className="flex flex-col items-center justify-center py-20 px-6">
                <div className="relative w-24 h-24 mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur-xl opacity-30 animate-pulse"></div>
                  <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 flex items-center justify-center border-2 border-slate-200">
                    <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 mb-3 tracking-tight">No schools registered yet</h3>
                <p className="text-sm text-slate-600 mb-8 text-center max-w-md font-medium">
                  Get started by adding your first school to the system. You'll be able to manage their access and monitor their activity.
                </p>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl transition-all hover:scale-105 border-2 border-white/20"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  Add Your First School
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Premium Add School Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8 animate-in zoom-in duration-300 border-4 border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
              
              {/* Premium Modal Header */}
              <div className="p-6 border-b-2 border-slate-100 sticky top-0 bg-gradient-to-r from-slate-50 to-blue-50 z-10 rounded-t-2xl">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Add New School</h2>
                      <p className="text-sm text-slate-600 mt-1 font-medium">Create school account with login credentials</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      setShowAddModal(false);
                      setFormError('');
                      setPasswordStrength('');
                    }} 
                    className="group p-2.5 rounded-xl hover:bg-slate-100 transition-all hover:scale-110"
                  >
                    <svg className="w-6 h-6 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              <form onSubmit={handleAddSchool} className="p-6 space-y-6">
                
                {/* Inline Error Alert */}
                {formError && (
                  <div className="rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 p-4 flex items-start gap-3 animate-in slide-in-from-top duration-200 shadow-lg">
                    <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-bold text-red-800">{formError}</p>
                    </div>
                  </div>
                )}
                
                {/* School Logo */}
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    School Logo
                    <span className="text-xs text-slate-500 font-normal">(Max 2MB)</span>
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="group flex flex-col items-center justify-center w-full h-36 border-3 border-blue-300 border-dashed rounded-xl cursor-pointer bg-gradient-to-br from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 transition-all shadow-sm hover:shadow-lg">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-16 h-16 mb-3 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-sm text-slate-700 font-bold"><span className="text-blue-600">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-slate-500 mt-1 font-medium">PNG, JPG, GIF up to 2MB</p>
                      </div>
                      <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                  </div>
                  {newSchool.logo && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1.5 mt-2 font-bold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {newSchool.logo.name} uploaded successfully
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      School Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={newSchool.name}
                      onChange={handleInputChange}
                      placeholder="Enter school name"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-sm font-medium shadow-sm hover:shadow-md"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      Principal Name *
                    </label>
                    <input
                      type="text"
                      name="principal"
                      required
                      value={newSchool.principal}
                      onChange={handleInputChange}
                      placeholder="Enter principal name"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all text-sm font-medium shadow-sm hover:shadow-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Login Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={newSchool.email}
                      onChange={handleInputChange}
                      placeholder="admin@school.com"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all text-sm font-mono font-medium shadow-sm hover:shadow-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={newSchool.phone}
                      onChange={handleInputChange}
                      placeholder="+91-1234567890"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-amber-500 focus:ring-4 focus:ring-amber-500/20 outline-none transition-all text-sm font-medium shadow-sm hover:shadow-md"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                      Password *
                    </label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={newSchool.password}
                      onChange={handleInputChange}
                      placeholder="Min. 6 characters"
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all text-sm font-medium shadow-sm hover:shadow-md"
                    />
                    {passwordStrength && newSchool.password && (
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 ${
                              passwordStrength === 'weak' ? 'w-1/3 bg-gradient-to-r from-red-500 to-red-600' :
                              passwordStrength === 'medium' ? 'w-2/3 bg-gradient-to-r from-yellow-500 to-amber-500' :
                              'w-full bg-gradient-to-r from-emerald-500 to-teal-500'
                            }`}
                          />
                        </div>
                        <span className={`text-xs font-bold ${
                          passwordStrength === 'weak' ? 'text-red-600' :
                          passwordStrength === 'medium' ? 'text-yellow-600' :
                          'text-emerald-600'
                        }`}>
                          {passwordStrength.toUpperCase()}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      value={newSchool.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Re-enter password"
                      className={`w-full px-4 py-3.5 rounded-xl border-2 outline-none transition-all text-sm font-medium shadow-sm hover:shadow-md ${
                        newSchool.confirmPassword && newSchool.password === newSchool.confirmPassword
                          ? 'border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 bg-emerald-50'
                          : 'border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 bg-white'
                      }`}
                    />
                    {newSchool.confirmPassword && newSchool.password === newSchool.confirmPassword && (
                      <p className="text-xs text-emerald-600 flex items-center gap-1.5 mt-1 font-bold">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        Passwords match perfectly!
                      </p>
                    )}
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      Address
                    </label>
                    <textarea
                      name="address"
                      value={newSchool.address}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Enter complete school address with city and postal code..."
                      className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none resize-none transition-all text-sm font-medium shadow-sm hover:shadow-md"
                    ></textarea>
                  </div>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row justify-end gap-3 border-t-2 border-slate-100">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setFormError('');
                      setPasswordStrength('');
                    }}
                    className="group px-8 py-3.5 rounded-xl text-slate-700 font-bold hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200 transition-all duration-300 border-2 border-slate-200 hover:border-slate-300 hover:scale-105 shadow-sm"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </span>
                  </button>
                  <button
                    type="submit"
                    className="group px-10 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Create School & Login
                    </span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
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

export default SchoolAndSystemManagementPage;

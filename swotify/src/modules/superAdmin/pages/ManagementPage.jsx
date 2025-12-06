import React, { useState } from 'react';

const ManagementPage = () => {
  const [activeTab, setActiveTab] = useState('list');
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchool(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setNewSchool(prev => ({
      ...prev,
      logo: e.target.files[0]
    }));
  };

  const handleAddSchool = (e) => {
    e.preventDefault();
    if (newSchool.password !== newSchool.confirmPassword) {
        alert("Passwords do not match!");
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
    alert('School registered successfully with login details!');
  };

  const handleRemoveSchool = (id) => {
    if (window.confirm('Are you sure you want to remove this school? This will delete all logins and details associated with the school.')) {
      setSchools(schools.filter(school => school.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">System Management</h1>
          <p className="text-[#64748B] text-sm mt-1">Manage schools, logins, and system configurations.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add School & Login
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-[#0F172A]">Registered Schools</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-left py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">School Name</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Principal / Admin</th>
                <th className="text-left py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Login Email</th>
                <th className="text-center py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Status</th>
                <th className="text-right py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {schools.map((school) => (
                <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-4 px-6 font-semibold text-[#0F172A]">{school.name}</td>
                  <td className="py-4 px-6 text-sm text-[#64748B]">{school.principal}</td>
                  <td className="py-4 px-6 text-sm text-[#64748B]">{school.email}</td>
                  <td className="py-4 px-6 text-center">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${school.status === 'Active' ? 'bg-[#22C55E]/10 text-[#22C55E]' : 'bg-red-100 text-red-600'}`}>
                      {school.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => handleRemoveSchool(school.id)}
                      className="text-red-500 hover:text-red-700 transition-colors text-sm font-medium"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {schools.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-[#64748B]">No schools registered.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add School Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h2 className="text-xl font-bold text-[#0F172A]">Add New School & Login Details</h2>
              <button onClick={() => setShowAddModal(false)} className="text-[#64748B] hover:text-[#0F172A]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleAddSchool} className="p-6 space-y-6">
              
              {/* School Logo */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#334155]">School Logo</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="text-xs text-gray-500"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    </div>
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#334155]">School Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={newSchool.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#334155]">Principal Name</label>
                  <input
                    type="text"
                    name="principal"
                    required
                    value={newSchool.principal}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#334155]">Login Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={newSchool.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-medium text-[#334155]">Phone</label>
                   <input
                    type="tel"
                    name="phone"
                    value={newSchool.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#334155]">Password</label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={newSchool.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-[#334155]">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={newSchool.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-[#334155]">Address</label>
                  <textarea
                    name="address"
                    value={newSchool.address}
                    onChange={handleInputChange}
                    rows="2"
                    className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none"
                  ></textarea>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 rounded-xl text-[#64748B] font-semibold hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl hover:shadow-lg"
                >
                  Create School & Login
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManagementPage;
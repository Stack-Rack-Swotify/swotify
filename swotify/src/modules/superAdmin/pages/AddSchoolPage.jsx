import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddSchoolPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    schoolName: '',
    principalName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
    logo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({
      ...prev,
      logo: e.target.files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your backend
    console.log('School Registration Data:', formData);
    
    // Simulate success and redirect
    alert('School registered successfully!');
    navigate('/super-admin-dashboard/schools');
  };

  return (
    <div className="max-w-4xl mx-auto animate-fade-in-up pb-10">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-[#64748B]"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Register New School</h1>
          <p className="text-[#64748B] text-sm mt-1">Onboard a new school to the platform.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* School Information Section */}
          <div>
            <h2 className="text-lg font-semibold text-[#0F172A] mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center text-[#0EA5E9]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              School Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#334155]">School Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="schoolName"
                  required
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="e.g. Greenwood High School"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#334155]">School Logo</label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all">
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
              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-medium text-[#334155]">Address <span className="text-red-500">*</span></label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Complete school address"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 outline-none transition-all bg-gray-50 focus:bg-white resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Admin/Principal Contact Section */}
          <div>
             <h2 className="text-lg font-semibold text-[#0F172A] mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#22C55E]/10 rounded-lg flex items-center justify-center text-[#22C55E]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              Administrator / Principal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#334155]">Principal Name <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="principalName"
                  required
                  value={formData.principalName}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#334155]">Official Email <span className="text-red-500">*</span></label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="principal@school.edu"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#334155]">Contact Phone <span className="text-red-500">*</span></label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#22C55E] focus:ring-2 focus:ring-[#22C55E]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          <hr className="border-gray-100" />

           {/* Account Security Section */}
          <div>
             <h2 className="text-lg font-semibold text-[#0F172A] mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#F97316]/10 rounded-lg flex items-center justify-center text-[#F97316]">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              Account Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#334155]">Password <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-[#334155]">Confirm Password <span className="text-red-500">*</span></label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 outline-none transition-all bg-gray-50 focus:bg-white"
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3 rounded-xl text-[#64748B] font-semibold hover:bg-gray-50 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-[#0EA5E9]/90 hover:to-[#22C55E]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9] transform hover:-translate-y-0.5 transition-all"
            >
              Register School
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddSchoolPage;

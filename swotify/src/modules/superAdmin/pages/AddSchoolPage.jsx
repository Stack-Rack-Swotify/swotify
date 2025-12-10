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

  const [formError, setFormError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (formError) setFormError('');

    // Password strength indicator
    if (name === 'password') {
      if (value.length < 6) setPasswordStrength('weak');
      else if (value.length < 10) setPasswordStrength('medium');
      else setPasswordStrength('strong');
    }

    // Real-time password match validation
    if (name === 'confirmPassword' || name === 'password') {
      const pwd = name === 'password' ? value : formData.password;
      const confirmPwd = name === 'confirmPassword' ? value : formData.confirmPassword;
      
      if (confirmPwd && pwd !== confirmPwd) {
        setFormError('Passwords do not match');
      } else if (formError === 'Passwords do not match') {
        setFormError('');
      }
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2000000) { // 2MB limit
      setFormError('Logo file size must be less than 2MB');
      return;
    }
    setFormData(prev => ({
      ...prev,
      logo: file
    }));
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }

    // Here you would typically send the data to your backend
    console.log('School Registration Data:', formData);
    
    // Show success modal
    setShowSuccessModal(true);
    
    // Redirect after 2 seconds
    setTimeout(() => {
      navigate('/super-admin-dashboard/schools');
    }, 2000);
  };

  return (
    <>
      <div className="max-w-5xl mx-auto animate-fade-in-up pb-10">
        {/* Header with Gradient Background */}
        <div className="mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-6 shadow-2xl border border-slate-700/50">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative flex items-center gap-4">
              <button 
                onClick={() => navigate(-1)}
                className="group p-3 hover:bg-white/10 rounded-xl transition-all duration-300 text-white hover:scale-110 backdrop-blur-sm border border-white/20"
              >
                <svg className="w-6 h-6 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="flex-1">
                <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3">
                  Register New School
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 text-xs font-bold rounded-lg shadow-lg animate-pulse">
                    NEW
                  </span>
                </h1>
                <p className="text-slate-300 text-sm mt-2 font-medium">Onboard a new institution to the Swotify platform</p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-bold">Active Session</span>
              </div>
            </div>
          </div>
        </div>

        {/* Form Card with Premium Design */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-200/60 p-8 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-emerald-500/5 to-teal-500/5 rounded-full blur-2xl"></div>

          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            
            {/* Inline Error Alert */}
            {formError && (
              <div className="rounded-xl bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 p-4 flex items-start gap-3 animate-in slide-in-from-top duration-300 shadow-lg">
                <div className="w-10 h-10 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-red-800">{formError}</p>
                </div>
                <button onClick={() => setFormError('')} className="text-red-400 hover:text-red-600 transition-colors">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            )}

            {/* School Information Section */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-100 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  School Information
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    School Name 
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    required
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. Greenwood High School"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all bg-white font-medium shadow-sm hover:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">School Logo</label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-3 border-blue-300 border-dashed rounded-xl cursor-pointer bg-white hover:bg-blue-50 transition-all shadow-sm hover:shadow-lg group">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="w-12 h-12 mb-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                        </div>
                        <p className="text-xs text-slate-600 font-bold"><span className="text-blue-600">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-slate-500 mt-1">PNG, JPG (MAX. 2MB)</p>
                      </div>
                      <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                    </label>
                  </div>
                  {formData.logo && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1.5 mt-2 font-bold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      {formData.logo.name} uploaded successfully
                    </p>
                  )}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    Address 
                    <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows="3"
                    placeholder="Complete school address with city, state, and postal code"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 outline-none transition-all bg-white resize-none font-medium shadow-sm hover:shadow-md"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Admin/Principal Contact Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 border-2 border-emerald-100 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Administrator / Principal Details
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    Principal Name 
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="principalName"
                    required
                    value={formData.principalName}
                    onChange={handleChange}
                    placeholder="e.g. Dr. John Doe"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all bg-white font-medium shadow-sm hover:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    Official Email 
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="principal@school.edu"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all bg-white font-medium shadow-sm hover:shadow-md"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    Contact Phone 
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 outline-none transition-all bg-white font-medium shadow-sm hover:shadow-md"
                  />
                </div>
              </div>
            </div>

            {/* Account Security Section */}
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-6 border-2 border-orange-100 shadow-lg">
              <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
                  Account Security
                </span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    Password 
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    className="w-full px-4 py-3.5 rounded-xl border-2 border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 outline-none transition-all bg-white font-medium shadow-sm hover:shadow-md"
                  />
                  {passwordStrength && formData.password && (
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
                    Confirm Password 
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Re-enter password"
                    className={`w-full px-4 py-3.5 rounded-xl border-2 outline-none transition-all font-medium shadow-sm hover:shadow-md ${
                      formData.confirmPassword && formData.password === formData.confirmPassword
                        ? 'border-emerald-500 focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/20 bg-emerald-50'
                        : 'border-slate-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 bg-white'
                    }`}
                  />
                  {formData.confirmPassword && formData.password === formData.confirmPassword && (
                    <p className="text-xs text-emerald-600 flex items-center gap-1.5 mt-2 font-bold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Passwords match perfectly!
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Actions with Premium Buttons */}
            <div className="pt-6 flex items-center justify-end gap-4 border-t-2 border-slate-100">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="group px-8 py-3.5 rounded-xl text-slate-700 font-bold hover:bg-gradient-to-r hover:from-slate-100 hover:to-slate-200 transition-all duration-300 border-2 border-slate-200 hover:border-slate-300 hover:scale-105 shadow-sm hover:shadow-lg"
              >
                <span className="flex items-center gap-2">
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
                <span className="flex items-center gap-2">
                  <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Register School
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in zoom-in duration-300 border-4 border-emerald-500">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center animate-pulse shadow-2xl">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">School Registered Successfully!</h3>
              <p className="text-slate-600 mb-6">Login credentials have been sent via email.</p>
              <div className="flex gap-2 justify-center">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out;
        }
      `}</style>
    </>
  );
};

export default AddSchoolPage;

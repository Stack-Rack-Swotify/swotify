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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formError) setFormError('');

    if (name === 'password') {
      if (value.length < 6) setPasswordStrength('weak');
      else if (value.length < 10) setPasswordStrength('medium');
      else setPasswordStrength('strong');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2000000) {
      setFormError('Logo file size must be less than 2MB');
      return;
    }
    setFormData(prev => ({ ...prev, logo: file }));
    setFormError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setFormError('Passwords do not match!');
      return;
    }

    if (formData.password.length < 6) {
      setFormError('Password must be at least 6 characters long');
      return;
    }

    console.log('School Registration Data:', formData);
    setShowSuccessModal(true);

    setTimeout(() => {
      navigate('/super-admin-dashboard/management');
    }, 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Register New School</h1>
          <p className="text-slate-500 text-sm">Onboard a new institution to the Swotify platform.</p>
        </div>
      </div>

      {/* Form Card */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Error Alert */}
          {formError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-red-500 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm font-medium text-red-700 flex-1">{formError}</p>
              <button type="button" onClick={() => setFormError('')} className="p-1 hover:bg-red-100 rounded">
                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          )}

          {/* School Information Section */}
          <div className="border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-800">School Information</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">School Name *</label>
                <input
                  type="text"
                  name="schoolName"
                  required
                  value={formData.schoolName}
                  onChange={handleChange}
                  placeholder="e.g. Greenwood High School"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">School Logo</label>
                <div className="flex items-center gap-3">
                  <label className="flex-1 flex items-center justify-center px-4 py-2.5 border border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50 transition-colors">
                    <svg className="w-5 h-5 text-slate-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    <span className="text-sm text-slate-600">{formData.logo ? formData.logo.name : 'Upload logo'}</span>
                    <input type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                  </label>
                </div>
                {formData.logo && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Uploaded successfully
                  </p>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
                <textarea
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Complete school address with city, state, and postal code"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Administrator Details Section */}
          <div className="border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Administrator Details</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Principal Name *</label>
                <input
                  type="text"
                  name="principalName"
                  required
                  value={formData.principalName}
                  onChange={handleChange}
                  placeholder="e.g. Dr. John Doe"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Official Email *</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="principal@school.edu"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Contact Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91-1234567890"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Account Security Section */}
          <div className="pb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h2 className="text-lg font-semibold text-slate-800">Account Security</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Password *</label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {passwordStrength && formData.password && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${passwordStrength === 'weak' ? 'w-1/3 bg-red-500' :
                          passwordStrength === 'medium' ? 'w-2/3 bg-orange-500' :
                            'w-full bg-green-500'
                        }`} />
                    </div>
                    <span className={`text-xs font-medium ${passwordStrength === 'weak' ? 'text-red-600' :
                        passwordStrength === 'medium' ? 'text-orange-600' :
                          'text-green-600'
                      }`}>{passwordStrength}</span>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter password"
                  className={`w-full px-4 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 ${formData.confirmPassword && formData.password === formData.confirmPassword
                      ? 'bg-green-50 border-green-300 focus:ring-green-500'
                      : 'bg-slate-50 border-slate-200 focus:ring-blue-500'
                    }`}
                />
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Passwords match
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Register School
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">School Registered Successfully!</h3>
            <p className="text-slate-500 mb-4">Login credentials have been created and sent via email.</p>
            <div className="flex gap-2 justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddSchoolPage;

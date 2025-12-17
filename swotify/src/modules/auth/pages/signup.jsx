// swotify/src/modules/auth/pages/signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import mockUsers from '../../../data/users.json';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const roles = [
    { value: 'Student', label: 'Student', icon: '🎓' },
    { value: 'Teacher', label: 'Teacher', icon: '👨‍🏫' },
    { value: 'Admin', label: 'Admin', icon: '⚙️' },
    { value: 'Developer', label: 'Developer', icon: '💻' }
  ];

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setIsDropdownOpen(false);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!selectedRole) {
      setError('Please select your role.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    // Check if email already exists
    const existingUsers = JSON.parse(localStorage.getItem('swotify_users') || '[]');
    const allUsers = [...mockUsers, ...existingUsers];

    if (allUsers.some(user => user.email === email)) {
      setError('Email already registered. Please sign in instead.');
      return;
    }

    const newId = `user_${Date.now()}`;

    const newUser = {
      id: newId,
      email,
      password,
      role: selectedRole,
    };

    // Save to localStorage
    localStorage.setItem('swotify_users', JSON.stringify([...existingUsers, newUser]));

    // Store logged in user
    localStorage.setItem('swotify_current_user', JSON.stringify(newUser));

    // Auto-login: Navigate directly to the appropriate dashboard
    if (selectedRole === 'Student') navigate('/student-dashboard');
    else if (selectedRole === 'Teacher') navigate('/teacher-dashboard');
    else if (selectedRole === 'Admin') navigate('/admin-dashboard');
    else if (selectedRole === 'Developer') navigate('/super-admin-dashboard');
    else navigate('/student-dashboard');
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-orange-500 items-center justify-center p-12">
        <div className="text-center space-y-8 max-w-md">
          {/* Logo */}
          <div className="w-40 h-40 mx-auto mb-8">
            <img
              src="/logo.png"
              alt="Swotify Logo"
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          <h1 className="text-4xl font-bold text-white">Join Swotify</h1>
          <p className="text-lg text-white/80">
            AI-powered school management with smart insights for principals, teachers, students, and parents
          </p>

          {/* Features */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>
              <span className="text-white font-medium">Quick and easy registration</span>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <span className="text-white font-medium">Secure data with encryption</span>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <span className="text-white font-medium">Instant access to all features</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4">
              <img src="/logo.png" alt="Swotify Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Signup Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
            {/* Header */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Create Account</h2>
              <p className="text-slate-500 text-sm">Join Swotify today - no separate login needed!</p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-4 text-sm flex items-center gap-2">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  School email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@school.edu"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="Enter password (min 6 characters)"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  placeholder="Confirm password"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Role Dropdown */}
              <div className="relative">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Select Role <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full px-4 py-3 text-sm border rounded-xl text-left flex items-center justify-between transition-all bg-white ${isDropdownOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-slate-300'
                    }`}
                >
                  <span className={selectedRole ? 'text-slate-800' : 'text-slate-400'}>
                    {selectedRole ? (
                      <span className="flex items-center gap-2">
                        <span>{roles.find(r => r.value === selectedRole)?.icon}</span>
                        {selectedRole}
                      </span>
                    ) : 'Choose your role'}
                  </span>
                  <svg className={`w-5 h-5 text-slate-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isDropdownOpen && (
                  <div className="absolute z-20 w-full mt-2 bg-white rounded-xl border border-slate-200 shadow-lg overflow-hidden">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => handleRoleSelect(role.value)}
                        className={`w-full px-4 py-3 text-sm text-left flex items-center justify-between hover:bg-slate-50 transition-all ${selectedRole === role.value ? 'bg-blue-50' : ''
                          }`}
                      >
                        <span className="flex items-center gap-3 text-slate-700 font-medium">
                          <span className="text-lg">{role.icon}</span>
                          {role.label}
                        </span>
                        {selectedRole === role.value && (
                          <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
              >
                Create Account & Sign In
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-500 text-sm">
                Already have an account?{' '}
                <Link to="/login" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Sign in
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mt-6 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure 256-bit encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;

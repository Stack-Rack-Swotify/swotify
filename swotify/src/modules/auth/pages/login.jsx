// src/modules/auth/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockUsers from '../../../data/users.json';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const roles = [
    { value: 'Student', label: 'Student' },
    { value: 'Teacher', label: 'Teacher' },
    { value: 'Admin', label: 'Admin' },
    { value: 'Super Admin', label: 'Super Admin' }
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

    const user = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      if (user.role === selectedRole) {
        console.log('Login successful for:', user.email, 'as', user.role);
        if (user.role === 'Student') {
          navigate('/student-dashboard');
        } else if (user.role === 'Teacher') {
          navigate('/teacher-dashboard');
        } else if (user.role === 'Admin') {
          navigate('/admin-dashboard');
        } else if (user.role === 'Super Admin') {
          navigate('/super-admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else if (selectedRole === 'Super Admin' && user.role === 'Super Admin') {
          // Special case for Developer logging in via Super Admin button
          console.log('Login successful for:', user.email, 'as', user.role);
          navigate('/super-admin-dashboard');
      } else {
        setError('Role mismatch. Please select the correct role.');
      }
    } else {
      setError('Invalid email or password.');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-gray-50 to-white">
      {/* Left Side - Branding (60%) - DARK THEME */}
      <div className="hidden lg:flex lg:w-[60%] items-center justify-center p-6 xl:p-8 bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#6366f1]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
        
        <div className="text-center space-y-5 max-w-2xl relative z-10">
          {/* Logo */}
          <div className="w-64 h-64 xl:w-72 xl:h-72 mx-auto">
            <img
              src="/logo.png"
              alt="Swotify Logo"
              className="w-full h-full object-contain drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]"
            />
          </div>

          {/* Tagline */}
          <p className="text-base xl:text-lg text-[#94a3b8] font-medium leading-relaxed max-w-xl mx-auto px-4">
            AI-powered school management with smart insights for principals,
            teachers, students, and parents
          </p>

          {/* Feature highlights */}
          <div className="space-y-2.5 pt-4 max-w-lg mx-auto">
            <div className="flex items-center text-left space-x-3 bg-[#334155]/50 backdrop-blur-md rounded-xl p-3.5 hover:bg-[#334155] transition-all duration-300 border border-[#475569]/50 hover:scale-105 transform hover:border-[#6366f1]/50">
              <div className="flex-shrink-0 w-8 h-8 bg-[#6366f1]/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-sm xl:text-base text-[#f1f5f9] font-medium">
                AI-driven attendance and performance analytics
              </span>
            </div>
            
            <div className="flex items-center text-left space-x-3 bg-[#334155]/50 backdrop-blur-md rounded-xl p-3.5 hover:bg-[#334155] transition-all duration-300 border border-[#475569]/50 hover:scale-105 transform hover:border-[#8b5cf6]/50">
              <div className="flex-shrink-0 w-8 h-8 bg-[#8b5cf6]/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#8b5cf6]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <span className="text-sm xl:text-base text-[#f1f5f9] font-medium">
                Smart alerts for at-risk students and trends
              </span>
            </div>
            
            <div className="flex items-center text-left space-x-3 bg-[#334155]/50 backdrop-blur-md rounded-xl p-3.5 hover:bg-[#334155] transition-all duration-300 border border-[#475569]/50 hover:scale-105 transform hover:border-[#a78bfa]/50">
              <div className="flex-shrink-0 w-8 h-8 bg-[#a78bfa]/20 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#a78bfa]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <span className="text-sm xl:text-base text-[#f1f5f9] font-medium">
                Unified management dashboard
              </span>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex items-center justify-center gap-8 pt-6">
            <div className="text-center">
              <div className="text-2xl xl:text-3xl font-bold text-[#f1f5f9]">10K+</div>
              <div className="text-xs xl:text-sm text-[#94a3b8]">Active Users</div>
            </div>
            <div className="w-px h-12 bg-[#475569]"></div>
            <div className="text-center">
              <div className="text-2xl xl:text-3xl font-bold text-[#f1f5f9]">500+</div>
              <div className="text-xs xl:text-sm text-[#94a3b8]">Schools</div>
            </div>
            <div className="w-px h-12 bg-[#475569]"></div>
            <div className="text-center">
              <div className="text-2xl xl:text-3xl font-bold text-[#f1f5f9]">99.9%</div>
              <div className="text-xs xl:text-sm text-[#94a3b8]">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form (40%) - WHITE THEME */}
      <div className="flex w-full lg:w-[40%] items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-5">
            <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-3">
              <img
                src="/logo.png"
                alt="Swotify Logo"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <p className="text-[#64748b] text-xs">
              Your intelligent school management platform
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-5 sm:p-6">
            {/* Welcome Header */}
            <div className="mb-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#1e293b] mb-1">
                Welcome back
              </h2>
              <p className="text-[#64748b] text-xs sm:text-sm">
                Sign in to access your dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-lg mb-3 text-xs sm:text-sm" role="alert">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-3.5" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-semibold text-[#334155] mb-1.5"
                >
                  School email <span className="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="username"
                  placeholder="name@school.edu"
                  className="w-full px-3 py-2 sm:py-2.5 text-sm rounded-lg border border-gray-300 bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1] transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs sm:text-sm font-semibold text-[#334155] mb-1.5"
                >
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 sm:py-2.5 text-sm rounded-lg border border-gray-300 bg-white text-[#1e293b] placeholder:text-[#94a3b8] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1] transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between py-1">
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-3.5 w-3.5 sm:h-4 sm:w-4 rounded border-gray-300 text-[#6366f1] focus:ring-[#6366f1]"
                  />
                  <label htmlFor="remember" className="text-xs sm:text-sm text-[#64748b]">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-xs sm:text-sm font-semibold text-[#8b5cf6] hover:text-[#7c3aed] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Role Dropdown Selection */}
              <div className="relative">
                <label
                  htmlFor="role"
                  className="block text-xs sm:text-sm font-semibold text-[#334155] mb-1.5"
                >
                  Select Role <span className="text-red-500">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full px-3 py-2 sm:py-2.5 text-sm rounded-lg border ${
                    isDropdownOpen ? 'border-[#6366f1] ring-2 ring-[#6366f1]/20' : 'border-gray-300'
                  } bg-white text-left text-[#1e293b] focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:border-[#6366f1] transition-all flex items-center justify-between`}
                >
                  <span className={selectedRole ? 'text-[#1e293b]' : 'text-[#94a3b8]'}>
                    {selectedRole || 'Choose your role'}
                  </span>
                  <svg
                    className={`w-4 h-4 text-[#64748b] transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-xl max-h-48 overflow-y-auto">
                    {roles.map((role) => (
                      <button
                        key={role.value}
                        type="button"
                        onClick={() => handleRoleSelect(role.value)}
                        className={`w-full px-3 py-2.5 text-sm text-left hover:bg-[#6366f1]/5 transition-colors flex items-center justify-between ${
                          selectedRole === role.value ? 'bg-[#6366f1]/10' : ''
                        }`}
                      >
                        <span className="text-[#1e293b] font-medium">{role.label}</span>
                        {selectedRole === role.value && (
                          <svg
                            className="w-4 h-4 text-[#6366f1]"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
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
                className="w-full py-2.5 sm:py-3 px-4 bg-[#6366f1] text-white font-semibold rounded-lg shadow-lg text-sm hover:bg-[#5558e3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6366f1] transform hover:-translate-y-0.5 transition-all"
              >
                Sign in to Swotify
              </button>
            </form>

            {/* Security Badge */}
            <div className="mt-5 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-[#64748b]">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-[#6366f1]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secure 256-bit encryption</span>
              </div>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-4 space-y-2">
            <div className="flex items-center gap-2 text-[#64748b] text-xs sm:text-sm bg-white/80 backdrop-blur-sm rounded-lg p-2.5 border border-gray-200">
              <div className="w-1.5 h-1.5 bg-[#6366f1] rounded-full"></div>
              <span>AI analytics & insights</span>
            </div>
            <div className="flex items-center gap-2 text-[#64748b] text-xs sm:text-sm bg-white/80 backdrop-blur-sm rounded-lg p-2.5 border border-gray-200">
              <div className="w-1.5 h-1.5 bg-[#8b5cf6] rounded-full"></div>
              <span>Smart alerts & notifications</span>
            </div>
            <div className="flex items-center gap-2 text-[#64748b] text-xs sm:text-sm bg-white/80 backdrop-blur-sm rounded-lg p-2.5 border border-gray-200">
              <div className="w-1.5 h-1.5 bg-[#a78bfa] rounded-full"></div>
              <span>Unified management dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
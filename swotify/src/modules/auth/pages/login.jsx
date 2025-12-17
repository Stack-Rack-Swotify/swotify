// src/modules/auth/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import mockUsers from '../../../data/users.json';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const roles = [
    { value: 'Student', label: 'Student', icon: '🎓' },
    { value: 'Teacher', label: 'Teacher', icon: '👨‍🏫' },
    { value: 'Admin', label: 'Admin', icon: '⚙️' },
    { value: 'Super Admin', label: 'Super Admin', icon: '👑' }
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

    const localUsers = JSON.parse(localStorage.getItem('swotify_users') || '[]');
    const allUsers = [...mockUsers, ...localUsers];

    const user = allUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      if (user.role === selectedRole || (selectedRole === 'Super Admin' && user.role === 'Developer')) {
        // Store logged in user
        localStorage.setItem('swotify_current_user', JSON.stringify(user));

        if (user.role === 'Student') navigate('/student-dashboard');
        else if (user.role === 'Teacher') navigate('/teacher-dashboard');
        else if (user.role === 'Admin') navigate('/admin-dashboard');
        else if (user.role === 'Super Admin' || user.role === 'Developer') navigate('/super-admin-dashboard');
        else navigate('/student-dashboard');
      } else {
        setError('Role mismatch. Please select the correct role.');
      }
    } else {
      setError('Invalid email or password. If you have not signed up, please create an account first.');
    }
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

          <h1 className="text-4xl font-bold text-white">Welcome Back!</h1>
          <p className="text-lg text-white/80">
            AI-powered school management with smart insights for principals, teachers, students, and parents
          </p>

          {/* Features */}
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <span className="text-white font-medium">AI-driven attendance and performance analytics</span>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <span className="text-white font-medium">Smart alerts for at-risk students</span>
            </div>

            <div className="flex items-center gap-4 bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <span className="text-white font-medium">Unified management dashboard</span>
            </div>
          </div>

          {/* Stats */}
          <div className="flex items-center justify-center gap-6 pt-6">
            <div className="text-center bg-white/10 backdrop-blur rounded-xl px-6 py-4">
              <div className="text-3xl font-bold text-white">10K+</div>
              <div className="text-sm text-white/70">Active Users</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur rounded-xl px-6 py-4">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-white/70">Schools</div>
            </div>
            <div className="text-center bg-white/10 backdrop-blur rounded-xl px-6 py-4">
              <div className="text-3xl font-bold text-white">99.9%</div>
              <div className="text-sm text-white/70">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="w-24 h-24 mx-auto mb-4">
              <img src="/logo.png" alt="Swotify Logo" className="w-full h-full object-contain" />
            </div>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
            {/* Header */}
            <div className="mb-6 text-center">
              <h2 className="text-2xl font-bold text-slate-800 mb-2">Sign In</h2>
              <p className="text-slate-500 text-sm">Access your dashboard</p>
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
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 text-sm border border-slate-300 rounded-xl text-slate-800 placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all bg-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Remember & Forgot */}
              <div className="flex items-center justify-between py-1">
                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-blue-500 focus:ring-blue-500" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
                  Forgot password?
                </button>
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
                Sign in to Swotify
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-slate-500 text-sm">
                Don't have an account?{' '}
                <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                  Sign up
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

export default Login;
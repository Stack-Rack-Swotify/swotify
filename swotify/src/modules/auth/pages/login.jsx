// src/modules/auth/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import mockUsers from '../../../data/users.json';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState(null);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
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
        } else if (user.role === 'Super Admin' || user.role === 'Developer') {
          navigate('/super-admin-dashboard');
        } else {
          navigate('/student-dashboard');
        }
      } else if (selectedRole === 'Super Admin' && (user.role === 'Super Admin' || user.role === 'Developer')) {
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
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
        <div className="text-center space-y-8 max-w-xl">
          {/* Logo */}
          <div className="w-56 h-56 mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <img
              src="/logo.jpg"
              alt="Swotify Logo"
              className="w-full h-full object-contain drop-shadow-lg"
            />
          </div>

          {/* App Name */}
          <h1 className="text-5xl font-bold text-white tracking-tight">
            Swotify
          </h1>

          {/* Tagline */}
          <p className="text-xl text-gray-300 font-medium leading-relaxed max-w-md mx-auto">
            AI-powered school management with smart insights for principals,
            teachers, students, and parents
          </p>

          {/* Feature highlights */}
          <div className="space-y-4 pt-8">
            <div className="flex items-start text-left space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-2 h-2 mt-2 bg-[#0EA5E9] rounded-full flex-shrink-0"></div>
              <span className="text-base text-gray-300">
                AI-driven attendance and performance analytics
              </span>
            </div>
            <div className="flex items-start text-left space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-2 h-2 mt-2 bg-[#22C55E] rounded-full flex-shrink-0"></div>
              <span className="text-base text-gray-300">
                Smart alerts for at-risk students and trends
              </span>
            </div>
            <div className="flex items-start text-left space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-2 h-2 mt-2 bg-[#F97316] rounded-full flex-shrink-0"></div>
              <span className="text-base text-gray-300">
                Unified management dashboard
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#0EA5E9]/10 to-[#0F172A]/10 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-gray-100">
              <img
                src="/logo.jpg"
                alt="Swotify Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
              Swotify
            </h1>
            <p className="text-[#64748B] text-sm">
              Your intelligent school management platform
            </p>
          </div>

          {/* Login Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 lg:p-10">
            {/* Welcome Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-[#0F172A] mb-2">
                Welcome back
              </h2>
              <p className="text-[#64748B]">
                Sign in to access your school dashboard
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-[#E11D48]/10 border border-[#E11D48]/30 text-[#E11D48] px-4 py-3 rounded-xl mb-6 text-sm" role="alert">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-[#0F172A] mb-2"
                >
                  School email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@school.edu"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] focus:bg-white transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-[#0F172A] mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] focus:bg-white transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-200 text-[#0EA5E9] focus:ring-[#0EA5E9]"
                  />
                  <label htmlFor="remember" className="text-sm text-[#64748B]">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm font-semibold text-[#0EA5E9] hover:text-[#0F172A] transition-colors"
                >
                  Forgot password?
                </button>
              </div>

              {/* Role Selection Section */}
              <div className="mb-6 mt-4">
                <h3 className="text-sm font-semibold text-[#0F172A] mb-3">I am a:</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`py-3 px-4 bg-gray-50 text-[#64748B] font-semibold rounded-xl transition-all text-sm border ${selectedRole === 'Student' ? 'ring-2 ring-[#0EA5E9] bg-[#0EA5E9]/10 border-[#0EA5E9] text-[#0EA5E9]' : 'border-gray-100 hover:bg-gray-100 hover:text-[#0F172A]'}`}
                    onClick={() => handleRoleSelect('Student')}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 bg-gray-50 text-[#64748B] font-semibold rounded-xl transition-all text-sm border ${selectedRole === 'Teacher' ? 'ring-2 ring-[#22C55E] bg-[#22C55E]/10 border-[#22C55E] text-[#22C55E]' : 'border-gray-100 hover:bg-gray-100 hover:text-[#0F172A]'}`}
                    onClick={() => handleRoleSelect('Teacher')}
                  >
                    Teacher
                  </button>
                  <button
                    type="button"
                    className={`py-3 px-4 bg-gray-50 text-[#64748B] font-semibold rounded-xl transition-all text-sm border ${selectedRole === 'Admin' ? 'ring-2 ring-[#F97316] bg-[#F97316]/10 border-[#F97316] text-[#F97316]' : 'border-gray-100 hover:bg-gray-100 hover:text-[#0F172A]'}`}
                    onClick={() => handleRoleSelect('Admin')}
                  >
                    Admin
                  </button>
                   <button
                    type="button"
                    className={`py-3 px-4 bg-gray-50 text-[#64748B] font-semibold rounded-xl transition-all text-sm border ${selectedRole === 'Super Admin' ? 'ring-2 ring-[#8B5CF6] bg-[#8B5CF6]/10 border-[#8B5CF6] text-[#8B5CF6]' : 'border-gray-100 hover:bg-gray-100 hover:text-[#0F172A]'}`}
                    onClick={() => handleRoleSelect('Super Admin')}
                  >
                    Super Admin
                  </button>
                </div>
              </div>

              {/* Submit Button - Primary CTA Gradient */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-[#0EA5E9]/90 hover:to-[#22C55E]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0EA5E9] transform hover:-translate-y-0.5 transition-all"
              >
                Sign in to Swotify
              </button>
            </form>

            {/* Security Badge */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-sm text-[#64748B]">
                <svg
                  className="w-5 h-5 text-[#22C55E]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Secure 256-bit encrypted access</span>
              </div>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-8 space-y-3">
            <div className="flex items-center gap-3 text-[#64748B] text-sm bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100">
              <div className="w-1.5 h-1.5 bg-[#0EA5E9] rounded-full"></div>
              <span>AI analytics & insights</span>
            </div>
            <div className="flex items-center gap-3 text-[#64748B] text-sm bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100">
              <div className="w-1.5 h-1.5 bg-[#22C55E] rounded-full"></div>
              <span>Smart alerts & notifications</span>
            </div>
            <div className="flex items-center gap-3 text-[#64748B] text-sm bg-white/80 backdrop-blur-sm rounded-xl p-3 border border-gray-100">
              <div className="w-1.5 h-1.5 bg-[#F97316] rounded-full"></div>
              <span>Unified management dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;


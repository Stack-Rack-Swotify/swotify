// swotify/src/modules/auth/pages/signup.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import mockUsers from '../../../data/users.json';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
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

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (mockUsers.some(user => user.email === email)) {
      setError('Email already registered.');
      return;
    }

    const newId = (mockUsers.length + 1).toString();

    const newUser = {
      id: newId,
      email,
      password,
      role: selectedRole,
    };

    mockUsers.push(newUser); 
    console.log('New user registered (mock):', newUser);
    console.log('Current mock users:', mockUsers);

    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-sky-50">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 items-center justify-center p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <div className="text-center space-y-8 max-w-xl">
          {/* Logo */}
          <div className="w-56 h-56 mx-auto bg-white/10 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <img
              src="/logo.jpg"
              alt="Swotify Logo"
              className="w-full h-full object-contain"
            />
          </div>

          {/* App Name */}
          <h1 className="text-4xl font-bold text-gray-100 tracking-tight">
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
              <div className="w-2 h-2 mt-2 bg-sky-400 rounded-full flex-shrink-0"></div>
              <span className="text-base text-gray-300">
                AI-driven attendance and performance analytics
              </span>
            </div>
            <div className="flex items-start text-left space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-2 h-2 mt-2 bg-rose-400 rounded-full flex-shrink-0"></div>
              <span className="text-base text-gray-300">
                Smart alerts for at-risk students and trends
              </span>
            </div>
            <div className="flex items-start text-left space-x-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-colors border border-white/10">
              <div className="w-2 h-2 mt-2 bg-sky-300 rounded-full flex-shrink-0"></div>
              <span className="text-base text-gray-300">
                Unified management dashboard
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-10">
            <div className="w-32 h-32 mx-auto bg-gray-900/10 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-gray-200">
              <img
                src="/logo.jpg"
                alt="Swotify Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Swotify
            </h1>
            <p className="text-gray-500 text-sm">
              Your intelligent school management platform
            </p>
          </div>

          {/* Signup Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 lg:p-10">
            {/* Welcome Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                Create Your Account
              </h2>
              <p className="text-gray-500">
                Join Swotify and start your journey
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-rose-50 border border-rose-400 text-rose-700 px-4 py-3 rounded-lg mb-6 text-sm" role="alert">
                {error}
              </div>
            )}

            {/* Form */}
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  School email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="name@school.edu"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white transition-all"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white transition-all"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password Field */}
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-semibold text-gray-800 mb-2"
                >
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  required
                  placeholder="Confirm your password"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-gray-50 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent focus:bg-white transition-all"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Role Selection Section */}
              <div className="mb-6 mt-4">
                <h3 className="text-sm font-semibold text-gray-800 mb-2">
                  I am a:
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    className={`py-2.5 px-3 bg-gray-100 text-gray-700 font-semibold rounded-lg transition-colors text-sm border ${selectedRole === 'Student' ? 'ring-2 ring-sky-500 bg-sky-50 border-sky-300' : 'border-gray-200 hover:bg-gray-200'}`}
                    onClick={() => handleRoleSelect('Student')}
                  >
                    Student
                  </button>
                  <button
                    type="button"
                    className={`py-2.5 px-3 bg-gray-100 text-gray-700 font-semibold rounded-lg transition-colors text-sm border ${selectedRole === 'Teacher' ? 'ring-2 ring-sky-500 bg-sky-50 border-sky-300' : 'border-gray-200 hover:bg-gray-200'}`}
                    onClick={() => handleRoleSelect('Teacher')}
                  >
                    Teacher
                  </button>
                  <button
                    type="button"
                    className={`py-2.5 px-3 bg-gray-100 text-gray-700 font-semibold rounded-lg transition-colors text-sm border ${selectedRole === 'Admin' ? 'ring-2 ring-sky-500 bg-sky-50 border-sky-300' : 'border-gray-200 hover:bg-gray-200'}`}
                    onClick={() => handleRoleSelect('Admin')}
                  >
                    Admin
                  </button>
                  <button
                    type="button"
                    className={`py-2.5 px-3 bg-gray-100 text-gray-700 font-semibold rounded-lg transition-colors text-sm border ${selectedRole === 'Developer' ? 'ring-2 ring-sky-500 bg-sky-50 border-sky-300' : 'border-gray-200 hover:bg-gray-200'}`}
                    onClick={() => handleRoleSelect('Developer')}
                  >
                    Developer
                  </button>
                </div>
              </div>

              {/* Submit Button - Primary CTA Gradient */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-gray-900 to-sky-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:from-gray-800 hover:to-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 transform hover:-translate-y-0.5 transition-all"
              >
                Sign Up for Swotify
              </button>
            </form>

            {/* Link to Login */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-500">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-sky-600 hover:text-sky-700 transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Security Badge */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-500">Secure 256-bit encrypted access</span>
              </div>
            </div>
          </div>

          {/* Mobile Features */}
          <div className="lg:hidden mt-8 space-y-3">
            <div className="flex items-center gap-3 text-gray-600 text-sm bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
              <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
              <span className="text-sm text-gray-600">AI analytics & insights</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-sm bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
              <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Smart alerts & notifications</span>
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-sm bg-white/60 backdrop-blur-sm rounded-lg p-3 border border-gray-200">
              <div className="w-1.5 h-1.5 bg-sky-400 rounded-full"></div>
              <span className="text-sm text-gray-600">Unified management dashboard</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;


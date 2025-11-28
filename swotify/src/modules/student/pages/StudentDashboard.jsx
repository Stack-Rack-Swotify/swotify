// src/modules/student/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Outlet, Routes, Route, Navigate } from 'react-router-dom';

// Sub‑components (imported for routing)
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import StudentMarks from '../components/StudentMarks';
import StudentAttendance from '../components/StudentAttendance';
import AIChatbot from '../components/AIChatbot';
import ReportPage from './ReportPage';
import StudentProfile from '../components/StudentProfile';
import SettingsPage from './SettingsPage';
import HomePage from './HomePage';
import EventsPage from './EventsPage';

// Initialise theme from localStorage (client‑side only)
const useTheme = () => {
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
};

const StudentDashboard = () => {
  useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const userAvatar =
    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationOpen(false);
  };
  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsDropdownOpen(false);
  };
  const handleLogout = () => {
    alert('Logging out...');
    // TODO: clear auth tokens & redirect to /login
  };
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const navItems = [
    { to: 'home', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { to: 'profile', label: 'Student Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { to: 'chatbot', label: 'AI Chatbot', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-7 7-7-7z' },
    { to: 'report', label: 'Report', icon: 'M9 17h6m-3 3v-6m-3-10h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2z' },
    { to: 'events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  ];

  return (
    <div className="flex min-h-screen bg-white text-gray-900 relative overflow-hidden">


      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-white backdrop-blur-lg border-r border-gray-100 p-4 flex flex-col transition-all duration-300 ease-in-out overflow-hidden`}
      >
        <div className="flex items-center justify-center h-16 mb-8">
          {isSidebarOpen ? (
            <div className="text-2xl font-bold text-primary">Swotify</div>
          ) : (
            <img src="/logo.jpg" alt="Swotify" className="h-10 w-10 object-contain" />
          )}
        </div>
        <nav className="flex-1 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg transition-colors transform hover:scale-105 hover:translate-x-2 duration-200 ${isActive ? 'bg-primary text-champagne' : 'text-muted hover:bg-muted'}`
              }
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg className="w-6 h-6 flex-shrink-0 text-champagne" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
              </svg>
              {isSidebarOpen && <span className="ml-3">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Main area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header */}
        <header className="w-full p-4 bg-white backdrop-blur-lg flex justify-between items-center border-b border-gray-200">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-info transition-transform"
          >
            <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-4">
            {/* Notification */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="p-2 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-info"
              >
                <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold text-white bg-error rounded-full">1</span>
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg py-1 z-40 text-gray-900">
                  <div className="px-4 py-2 text-sm">
                    <p className="font-semibold">Important Update!</p>
                    <p className="text-gray-700">Your Math assignment is due tomorrow.</p>
                  </div>
                </div>
              )}
            </div>
            {/* User dropdown */}
            <div className="relative">
              <button onClick={toggleDropdown} className="flex items-center space-x-2 focus:outline-none">
                <img className="h-10 w-10 rounded-full object-cover border-2 border-gray-300" src={userAvatar} alt="User Avatar" />
                <svg className={`w-4 h-4 text-gray-700 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-2 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-40">
                  <NavLink to="profile" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100">Manage Profile</NavLink>
                  <NavLink to="settings" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100">Manage Settings</NavLink>
                  <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Logout</a>
                </div>
              )}
            </div>
            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-info"
              aria-label="Toggle dark mode"
            >
              <svg className="w-5 h-5 text-champagne" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 0l.71.71a1 1 0 11-1.42 1.42l-.71-.71a1 1 0 010-1.42zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4 9a1 1 0 110 2H3a1 1 0 110-2h1zm1.34-4.95a1 1 0 010 1.42l-.71.71A1 1 0 113.5 5.16l.71-.71a1 1 0 011.42 0zM10 14a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-10 text-gray-900 h-full">
            <Routes>
              <Route path="/" element={<Navigate to="home" replace />} />
              <Route path="home" element={<HomePage />} />
              <Route path="profile" element={<StudentProfile />} />
              <Route path="chatbot" element={<AIChatbot />} />
              <Route path="report" element={<ReportPage />} />
              <Route path="settings" element={<SettingsPage />} />
              <Route path="events" element={<EventsPage />} />
            </Routes>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;
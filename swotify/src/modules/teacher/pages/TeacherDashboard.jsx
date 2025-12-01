import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';

import AllStudentsPage from './AllStudentsPage';
import ClassPage from './ClassPage';
import TeacherEventsPage from './TeacherEventsPage';
import TeacherStudentProfilePage from './TeacherStudentProfilePage';
import TeacherAttendancePage from './TeacherAttendancePage';
import AIChatbot from '../../student/components/AIChatbot'; // Import AIChatbot
import PTMHistoryPage from './PTMHistoryPage';
import TeacherDashboardOverview from './TeacherDashboardOverview'; // Import TeacherDashboardOverview
import ReportPage from '../../student/pages/ReportPage'; // Import ReportPage
import TeacherSettingsPage from './TeacherSettingsPage'; // Import TeacherSettingsPage


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

const TeacherDashboard = () => {
  useTheme();
  const navigate = useNavigate();
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
    // TODO: clear auth tokens
    navigate('/signup'); // Redirect to signup page after logout
  };
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  return (
    <div className="flex min-h-screen bg-white text-gray-900 relative overflow-hidden">
      <TeacherSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
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
                    <p className="text-gray-700">New assignment due for Math Class.</p>
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
                  <NavLink to="settings" onClick={() => setIsDropdownOpen(false)} className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100">Manage Profile</NavLink>
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
        <main className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<TeacherDashboardOverview />} />
            <Route path="/students" element={<AllStudentsPage />} />
            <Route path="/class" element={<ClassPage />} />
            <Route path="/events" element={<TeacherEventsPage />} />
            <Route path="/student-profile/:studentId" element={<TeacherStudentProfilePage />} />
            <Route path="/attendance" element={<TeacherAttendancePage />} />
            <Route path="/ai-chatbot" element={<AIChatbot />} />
            <Route path="/ptm-history" element={<PTMHistoryPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/settings" element={<TeacherSettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
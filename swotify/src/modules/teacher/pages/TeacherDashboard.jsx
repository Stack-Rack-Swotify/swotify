import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';

import StudentsPage from './StudentsPage';
import ClassPage from './ClassPage';
import TeacherEventsPage from './TeacherEventsPage';
import TeacherStudentProfilePage from './TeacherStudentProfilePage';
import TeacherAttendancePage from './TeacherAttendancePage';
import AIChatbot from '../../student/components/AIChatbot'; // Import AIChatbot
import PTMHistoryPage from './PTMHistoryPage';
import TeacherDashboardOverview from './TeacherDashboardOverview'; // Import TeacherDashboardOverview
import ReportPage from '../../student/pages/ReportPage'; // Import ReportPage
import TeacherSettingsPage from './TeacherSettingsPage'; // Import TeacherSettingsPage
import PerformanceReportPage from '../../admin/pages/PerformanceReportPage'; // Import PerformanceReportPage

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
    <div className="flex min-h-screen bg-white text-[#0F172A] relative overflow-hidden">
      <TeacherSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        {/* Header */}
        <header className="w-full p-4 bg-white backdrop-blur-lg flex justify-between items-center border-b border-gray-100 shadow-sm">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#0EA5E9]/10 hover:to-[#0EA5E9]/5 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all duration-200"
          >
            <svg className="w-6 h-6 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center space-x-3">
            {/* Notification */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#22C55E]/10 hover:to-[#22C55E]/5 focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 transition-all duration-200 relative"
              >
                <svg className="w-6 h-6 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute top-1 right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-[#E11D48] rounded-full border-2 border-white">
                  1
                </span>
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-[#0F172A] flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                      </svg>
                      Notifications
                    </h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-50">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-[#0F172A]">Important Update!</p>
                          <p className="text-xs text-[#64748B] mt-1">New assignment due for Math Class.</p>
                          <p className="text-xs text-[#94A3B8] mt-1">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-100">
                    <button className="text-xs text-[#0EA5E9] hover:text-[#22C55E] font-medium transition-colors">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* User dropdown */}
            <div className="relative">
              <button 
                onClick={toggleDropdown} 
                className="flex items-center space-x-2 focus:outline-none p-2 rounded-xl hover:bg-gray-50 transition-all duration-200"
              >
                <img 
                  className="h-10 w-10 rounded-full object-cover border-2 border-gradient-to-r from-[#0EA5E9] to-[#22C55E]" 
                  src={userAvatar} 
                  alt="User Avatar" 
                />
                <svg 
                  className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-semibold text-[#0F172A]">Teacher Account</p>
                    <p className="text-xs text-[#64748B]">teacher@school.com</p>
                  </div>
                  <NavLink 
                    to="settings" 
                    onClick={() => setIsDropdownOpen(false)} 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gradient-to-r hover:from-[#0EA5E9]/10 hover:to-[#0EA5E9]/5 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Manage Profile
                  </NavLink>
                  <NavLink 
                    to="settings" 
                    onClick={() => setIsDropdownOpen(false)} 
                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-[#0F172A] hover:bg-gradient-to-r hover:from-[#22C55E]/10 hover:to-[#22C55E]/5 transition-all duration-200"
                  >
                    <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Manage Settings
                  </NavLink>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-[#E11D48] hover:bg-gradient-to-r hover:from-[#E11D48]/10 hover:to-[#E11D48]/5 transition-all duration-200"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 0l.71.71a1 1 0 11-1.42 1.42l-.71-.71a1 1 0 010-1.42zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4 9a1 1 0 110 2H3a1 1 0 110-2h1zm1.34-4.95a1 1 0 010 1.42l-.71.71A1 1 0 113.5 5.16l.71-.71a1 1 0 011.42 0zM10 14a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </button>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 bg-gradient-to-br from-white via-gray-50 to-white">
          <Routes>
            <Route path="/" element={<TeacherDashboardOverview />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route path="/class" element={<ClassPage />} />
            <Route path="/events" element={<TeacherEventsPage />} />
            <Route path="/student-profile/:studentId" element={<TeacherStudentProfilePage />} />
            <Route path="/attendance" element={<TeacherAttendancePage />} />
            <Route path="/ai-chatbot" element={<AIChatbot />} />
            <Route path="/ptm-history" element={<PTMHistoryPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/settings" element={<TeacherSettingsPage />} />
            <Route path="/performance-report" element={<PerformanceReportPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;

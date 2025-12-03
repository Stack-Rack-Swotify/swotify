import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
// Reuse admin pages for now
import StaffPage from '../../admin/pages/StaffPage';
import AdminSettingsPage from '../../admin/pages/AdminSettingsPage';
import AdminStudentsPage from '../../admin/pages/AdminStudentsPage';
import PerformanceReportPage from '../../admin/pages/PerformanceReportPage';
import AppSettingsPage from '../../admin/pages/AppSettingsPage';

// Initialize theme from localStorage (client-side only)
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

const SuperAdminDashboard = () => {
  useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New School Added', message: 'Greenwood High has been onboarded.', time: '5 minutes ago', unread: true },
    { id: 2, title: 'System Alert', message: 'High server load detected.', time: '15 minutes ago', unread: true },
  ]);

  const userAvatar =
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

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
    navigate('/signup');
  };
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const SuperAdminOverview = () => (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Super Admin Dashboard</h1>
          <p className="text-[#64748B] text-sm">Global system overview and management.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2 py-1 rounded-full">+3</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-1">12</h3>
            <p className="text-sm text-[#64748B]">Total Schools</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#0EA5E9] bg-[#0EA5E9]/10 px-2 py-1 rounded-full">+150</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-1">15,400</h3>
            <p className="text-sm text-[#64748B]">Total Students</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
             <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
               <span className="text-xs font-semibold text-[#F97316] bg-[#F97316]/10 px-2 py-1 rounded-full">+8%</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-1">$1.2M</h3>
            <p className="text-sm text-[#64748B]">Total Revenue</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#0F172A]/10 to-[#64748B]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#22C55E] bg-[#22C55E]/10 px-2 py-1 rounded-full">Stable</span>
            </div>
            <h3 className="text-2xl font-bold text-[#0F172A] mb-1">99.9%</h3>
            <p className="text-sm text-[#64748B]">System Uptime</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-white via-gray-50 to-white relative overflow-hidden">
      <SuperAdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        {/* Header */}
        <header className="sticky top-0 z-10 w-full p-4 bg-white/90 backdrop-blur-lg flex justify-between items-center border-b border-gray-100 shadow-sm">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#0EA5E9]/10 hover:to-[#22C55E]/10 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all duration-200 group"
          >
            <svg className="w-6 h-6 text-[#64748B] group-hover:text-[#0EA5E9] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="relative p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#0EA5E9]/10 hover:to-[#22C55E]/10 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all duration-200 group"
              >
                <svg className="w-6 h-6 text-[#64748B] group-hover:text-[#0EA5E9] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] rounded-full border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] px-4 py-3">
                    <h3 className="text-white font-semibold text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer ${
                          notif.unread ? 'bg-[#0EA5E9]/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.unread ? 'bg-[#0EA5E9]' : 'bg-gray-300'}`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-[#0F172A] mb-1">{notif.title}</p>
                            <p className="text-xs text-[#64748B] mb-1">{notif.message}</p>
                            <p className="text-xs text-[#64748B]">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-center border-t border-gray-100">
                    <button className="text-sm font-medium text-[#0EA5E9] hover:text-[#22C55E] transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 0l.71.71a1 1 0 11-1.42 1.42l-.71-.71a1 1 0 010-1.42zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4 9a1 1 0 110 2H3a1 1 0 110-2h1zm1.34-4.95a1 1 0 010 1.42l-.71.71A1 1 0 113.5 5.16l.71-.71a1 1 0 011.42 0zM10 14a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </button>

            {/* User Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleDropdown} 
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#22C55E] p-0.5">
                  <img className="w-full h-full rounded-full object-cover" src={userAvatar} alt="Admin Avatar" />
                </div>
                <svg className={`w-4 h-4 text-[#64748B] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 overflow-hidden">
                  <NavLink 
                    to="settings" 
                    onClick={() => setIsDropdownOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-[#0F172A] hover:bg-gradient-to-r hover:from-[#0EA5E9]/10 hover:to-[#22C55E]/10 hover:text-[#0EA5E9] transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Manage Profile
                  </NavLink>
                  <hr className="my-2 border-gray-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#E11D48] hover:bg-[#E11D48]/10 transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<SuperAdminOverview />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="students" element={<AdminStudentsPage />} />
            <Route path="reports" element={<PerformanceReportPage />} />
            <Route path="app-settings" element={<AppSettingsPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;

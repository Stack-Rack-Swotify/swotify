import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import SuperAdminSidebar from '../components/SuperAdminSidebar';
import AddSchoolPage from './AddSchoolPage';
import SuperAdminReportPage from './SuperAdminReportPage';
import SuperAdminMainPage from './SuperAdminMainPage';
import SchoolAndSystemManagementPage from './SchoolAndSystemManagementPage';
import AIChatbotPage from './AIChatbotPage';
import FilesPage from './FilesPage';
import SuperAdminSettingsPage from './SuperAdminSettingsPage';

// Initialize theme from localStorage
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
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New School Added', message: 'Greenwood High has been onboarded.', time: '5 minutes ago', unread: true, type: 'success' },
    { id: 2, title: 'System Alert', message: 'High server load detected.', time: '15 minutes ago', unread: true, type: 'warning' },
    { id: 3, title: 'Report Generated', message: 'Monthly analytics report is ready.', time: '1 hour ago', unread: true, type: 'info' },
    { id: 4, title: 'User Activity', message: '150+ new student registrations today.', time: '2 hours ago', unread: true, type: 'success' },
    { id: 5, title: 'Backup Complete', message: 'Daily backup completed successfully.', time: '3 hours ago', unread: true, type: 'info' },
  ]);

  const userAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80';

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

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => notif.id === id ? { ...notif, unread: false } : notif)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(notif => ({ ...notif, unread: false })));
    setUnreadCount(0);
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
      case 'warning':
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center flex-shrink-0 shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <SuperAdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'} relative z-10`}>
        
        {/* Premium Enhanced Header */}
        <header className="sticky top-0 z-40 w-full px-6 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl flex justify-between items-center border-b-2 border-slate-200/60 dark:border-gray-700/50 shadow-lg">
          
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="group p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:scale-110 border-2 border-transparent hover:border-blue-200/50"
              aria-label="Toggle sidebar"
            >
              <svg className="w-6 h-6 text-slate-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Premium Search Bar */}
            <div className="hidden md:flex relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity"></div>
              <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search schools, reports, analytics..."
                className="relative w-64 lg:w-96 pl-12 pr-4 py-3 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-700/50 dark:to-gray-800/50 border-2 border-slate-200 dark:border-gray-600 text-sm font-medium text-slate-900 dark:text-gray-100 placeholder:text-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all shadow-sm hover:shadow-md"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3">
            
            {/* Premium Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="group p-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-2xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 border-2 border-white/20"
              aria-label="Toggle dark mode"
            >
              <svg className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 0l.71.71a1 1 0 11-1.42 1.42l-.71-.71a1 1 0 010-1.42zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4 9a1 1 0 110 2H3a1 1 0 110-2h1zm1.34-4.95a1 1 0 010 1.42l-.71.71A1 1 0 113.5 5.16l.71-.71a1 1 0 011.42 0zM10 14a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </button>

            {/* Premium Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="group relative p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:scale-110 border-2 border-transparent hover:border-blue-200/50"
                aria-label="Notifications"
              >
                <svg className="w-6 h-6 text-slate-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg border-2 border-white animate-pulse">
                      {unreadCount}
                    </span>
                    <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500/30 rounded-full animate-ping"></span>
                  </>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-[28rem] bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-gray-700 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                  
                  {/* Premium Header */}
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-6 py-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                          </svg>
                        </div>
                        <div>
                          <h3 className="text-white font-extrabold text-lg">Notifications</h3>
                          <p className="text-white/80 text-xs font-medium">Stay updated with latest activities</p>
                        </div>
                      </div>
                      {unreadCount > 0 && (
                        <button
                          onClick={markAllAsRead}
                          className="px-3 py-1.5 bg-white/20 backdrop-blur-sm rounded-lg text-xs font-bold text-white hover:bg-white/30 transition-all border border-white/30"
                        >
                          Mark all read
                        </button>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-h-[32rem] overflow-y-auto custom-scrollbar">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        onClick={() => markAsRead(notif.id)}
                        className={`px-6 py-5 border-b-2 border-slate-100 dark:border-gray-700 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all cursor-pointer group ${
                          notif.unread ? 'bg-gradient-to-r from-blue-50/50 to-purple-50/50 dark:from-blue-900/10 dark:to-purple-900/10' : ''
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          {getNotificationIcon(notif.type)}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <p className="text-sm font-bold text-slate-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors">
                                {notif.title}
                              </p>
                              {notif.unread && (
                                <div className="w-3 h-3 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex-shrink-0 mt-1 shadow-lg animate-pulse"></div>
                              )}
                            </div>
                            <p className="text-sm text-slate-600 dark:text-gray-400 mb-3 font-medium">{notif.message}</p>
                            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-gray-500 font-bold">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              {notif.time}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50 text-center border-t-2 border-slate-200 dark:border-gray-700">
                    <button className="text-sm font-bold text-blue-600 hover:text-purple-600 transition-colors hover:underline">
                      View All Notifications →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="h-10 w-px bg-gradient-to-b from-transparent via-slate-300 to-transparent dark:via-gray-700"></div>

            {/* Premium User Dropdown */}
            <div className="relative">
              <button 
                onClick={toggleDropdown} 
                className="group flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 border-2 border-transparent hover:border-blue-200/50"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-50 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-0.5 ring-4 ring-transparent group-hover:ring-blue-500/20 transition-all shadow-lg">
                    <img className="w-full h-full rounded-xl object-cover" src={userAvatar} alt="Admin Avatar" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
                </div>
                <div className="hidden lg:block text-left">
                  <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100 tracking-tight">Super Admin</p>
                  <p className="text-xs text-slate-500 dark:text-gray-400 font-bold">admin@swotify.com</p>
                </div>
                <svg className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-gray-700 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
                  
                  {/* Premium User Info */}
                  <div className="px-5 py-4 border-b-2 border-slate-100 dark:border-gray-700 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-0.5 shadow-lg">
                        <img className="w-full h-full rounded-xl object-cover" src={userAvatar} alt="Admin" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">Super Admin</p>
                        <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">admin@swotify.com</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold rounded-lg">
                        Premium
                      </span>
                      <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-bold rounded-lg border border-emerald-200">
                        Verified
                      </span>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    <NavLink 
                      to="settings" 
                      onClick={() => setIsDropdownOpen(false)} 
                      className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 hover:text-blue-600 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <span>Manage Profile</span>
                    </NavLink>
                    <button className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 hover:text-purple-600 transition-all group">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <span>Preferences</span>
                    </button>
                  </div>

                  {/* Premium Logout */}
                  <div className="border-t-2 border-slate-100 dark:border-gray-700 mt-2 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-5 py-3 text-sm font-bold text-red-600 dark:text-red-400 hover:bg-gradient-to-r hover:from-red-50 hover:to-rose-50 dark:hover:from-red-900/20 dark:hover:to-rose-900/20 transition-all group"
                    >
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<SuperAdminMainPage />} />

            <Route path="management" element={<SchoolAndSystemManagementPage />} />
            <Route path="add-school" element={<AddSchoolPage />} />
            <Route path="reports-feedback" element={<SuperAdminReportPage />} />
            <Route path="files" element={<FilesPage />} />
            <Route path="ai-chatbot" element={<AIChatbotPage />} />
            <Route path="settings" element={<SuperAdminSettingsPage />} />
          </Routes>
        </main>
      </div>

      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default SuperAdminDashboard;

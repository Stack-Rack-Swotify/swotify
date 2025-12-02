import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import StaffPage from './StaffPage';
import AdminSettingsPage from './AdminSettingsPage';
import AdminStudentsPage from './AdminStudentsPage';
import AIChatbot from '../../student/components/AIChatbot';
import PerformanceReportPage from './PerformanceReportPage';
import SchoolManagementPage from './SchoolManagementPage';


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

const AdminDashboard = () => {
  useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(5); // Add this line
  const [notifications, setNotifications] = useState([ // Add this line
    { id: 1, title: 'New student registration', message: 'John Doe has been registered.', time: '5 minutes ago', unread: true },
    { id: 2, title: 'Staff member updated profile', message: 'Jane Smith updated her profile.', time: '15 minutes ago', unread: true },
    { id: 3, title: 'New class created', message: 'A new class "Grade 10 Maths" has been created.', time: '1 hour ago', unread: false },
    { id: 4, title: 'Performance report generated', message: 'The weekly performance report is ready.', time: '2 hours ago', unread: true },
    { id: 5, title: 'System update', message: 'The system will be updated tonight at 10 PM.', time: '1 day ago', unread: false },
  ]);

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

  const AdminOverview = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-[#827979] text-sm">Welcome back! Manage your school system from here.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff7300]/10 to-[#ff7300]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#ff7300] bg-[#ff7300]/10 px-2 py-1 rounded-full">+12%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">1,234</h3>
            <p className="text-sm text-[#827979]">Total Students</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#9000ff]/10 to-[#9000ff]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#9000ff] bg-[#9000ff]/10 px-2 py-1 rounded-full">+5%</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">89</h3>
            <p className="text-sm text-[#827979]">Staff Members</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#827979]/10 to-[#827979]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#827979] bg-[#827979]/10 px-2 py-1 rounded-full">32</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">45</h3>
            <p className="text-sm text-[#827979]">Active Classes</p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-[#ff7300]/10 via-[#9000ff]/5 to-[#ff7300]/5 rounded-xl flex items-center justify-center">
                <svg className="w-6 h-6 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-[#ff7300] bg-[#ff7300]/10 px-2 py-1 rounded-full">This Week</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-1">8</h3>
            <p className="text-sm text-[#827979]">Upcoming Events</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
              Quick Actions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <NavLink 
                to="staff" 
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#ff7300]/5 to-white rounded-xl border border-gray-200 hover:shadow-md hover:border-[#ff7300]/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff7300] to-[#ff7300]/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#ff7300] transition-colors">Manage Staff</h3>
                  <p className="text-xs text-[#827979]">Add, edit or remove staff</p>
                </div>
              </NavLink>

              <NavLink 
                to="students" 
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#9000ff]/5 to-white rounded-xl border border-gray-200 hover:shadow-md hover:border-[#9000ff]/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#9000ff] to-[#9000ff]/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#9000ff] transition-colors">Manage Students</h3>
                  <p className="text-xs text-[#827979]">View and manage students</p>
                </div>
              </NavLink>

              <NavLink 
                to="performance-report" 
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#827979]/5 to-white rounded-xl border border-gray-200 hover:shadow-md hover:border-[#827979]/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#827979] to-[#827979]/80 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#827979] transition-colors">View Reports</h3>
                  <p className="text-xs text-[#827979]">Performance analytics</p>
                </div>
              </NavLink>

              <NavLink 
                to="settings" 
                className="flex items-center gap-4 p-4 bg-gradient-to-br from-[#ff7300]/5 via-[#9000ff]/5 to-white rounded-xl border border-gray-200 hover:shadow-md hover:border-[#ff7300]/50 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff7300] to-[#9000ff] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 group-hover:text-[#ff7300] transition-colors">System Settings</h3>
                  <p className="text-xs text-[#827979]">Configure system</p>
                </div>
              </NavLink>
            </div>
          </div>

          {/* System Status */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
              System Status
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Database</span>
                </div>
                <span className="text-xs font-semibold text-green-600">Online</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">API Server</span>
                </div>
                <span className="text-xs font-semibold text-green-600">Running</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-700">Backup</span>
                </div>
                <span className="text-xs font-semibold text-blue-600">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#827979] to-[#9000ff] rounded-full mr-3"></span>
            Recent Activity
          </h2>
          <div className="space-y-3">
            {[
              { action: 'New student registration', user: 'John Doe', time: '5 minutes ago', color: 'ff7300' },
              { action: 'Staff member updated profile', user: 'Jane Smith', time: '15 minutes ago', color: '9000ff' },
              { action: 'New class created', user: 'Admin', time: '1 hour ago', color: '827979' },
              { action: 'Performance report generated', user: 'System', time: '2 hours ago', color: 'ff7300' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className={`w-10 h-10 bg-gradient-to-br from-[#${activity.color}]/10 to-[#${activity.color}]/5 rounded-full flex items-center justify-center`}>
                  <svg className={`w-5 h-5 text-[#${activity.color}]`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{activity.action}</p>
                  <p className="text-xs text-[#827979]">{activity.user} • {activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        {/* Header */}
        <header className="sticky top-0 z-10 w-full p-4 bg-white/80 backdrop-blur-lg flex justify-between items-center border-b border-gray-200 shadow-sm">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#ff7300]/10 hover:to-[#9000ff]/10 focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 transition-all duration-200 group"
          >
            <svg className="w-6 h-6 text-[#827979] group-hover:text-[#ff7300] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="relative p-2 rounded-xl hover:bg-gradient-to-r hover:from-[#ff7300]/10 hover:to-[#9000ff]/10 focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 transition-all duration-200 group"
              >
                <svg className="w-6 h-6 text-[#827979] group-hover:text-[#ff7300] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-[#ff7300] to-[#9000ff] rounded-full border-2 border-white">
                    {unreadCount}
                  </span>
                )}
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-[#ff7300] to-[#9000ff] px-4 py-3">
                    <h3 className="text-white font-semibold text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors cursor-pointer ${
                          notif.unread ? 'bg-[#ff7300]/5' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.unread ? 'bg-[#ff7300]' : 'bg-gray-300'}`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 mb-1">{notif.title}</p>
                            <p className="text-xs text-[#827979] mb-1">{notif.message}</p>
                            <p className="text-xs text-[#827979]">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-center">
                    <button className="text-sm font-medium text-[#ff7300] hover:text-[#9000ff] transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gradient-to-r from-[#ff7300] to-[#9000ff] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 transition-all duration-200 group"
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
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff7300] to-[#9000ff] p-0.5">
                  <img className="w-full h-full rounded-full object-cover" src={userAvatar} alt="Admin Avatar" />
                </div>
                <svg className={`w-4 h-4 text-[#827979] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 overflow-hidden">
                  <NavLink 
                    to="settings" 
                    onClick={() => setIsDropdownOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#ff7300]/10 hover:to-[#9000ff]/10 hover:text-[#ff7300] transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Manage Profile
                  </NavLink>
                  <NavLink 
                    to="settings" 
                    onClick={() => setIsDropdownOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gradient-to-r hover:from-[#ff7300]/10 hover:to-[#9000ff]/10 hover:text-[#ff7300] transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Manage Settings
                  </NavLink>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all"
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
            <Route path="/" element={<AdminOverview />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="students" element={<AdminStudentsPage />} />
            <Route path="ai-chatbot" element={<AIChatbot />} />
            <Route path="performance-report" element={<PerformanceReportPage />} />
            <Route path="school-management" element={<SchoolManagementPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import AdminSidebar from '../components/AdminSidebar';
import StaffPage from './StaffPage';
import StaffProfilePage from './StaffProfilePage';
import AdminSettingsPage from './AdminSettingsPage';
import AdminStudentsPage from './AdminStudentsPage';
import AnalyticsGraph from '../../student/components/AnalyticsGraph';
import PerformanceReportPage from './PerformanceReportPage';
import SchoolManagementPage from './SchoolManagementPage';
import AppSettingsPage from './AppSettingsPage';
import mockEvents from '../../../data/mockEvents';
import AdminEventsPage from './AdminEventsPage';
import AdminEventDetailPage from './AdminEventDetailPage';
import AdminStudentProfilePage from './AdminStudentProfilePage';
import AdminClassDetailPage from './AdminClassDetailPage';
import AdminAIChatbotPage from './AdminAIChatbotPage';


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
  const [unreadCount, setUnreadCount] = useState(5);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New student registration', message: 'John Doe has been registered.', time: '5 minutes ago', unread: true, type: 'success' },
    { id: 2, title: 'Staff member updated profile', message: 'Jane Smith updated her profile.', time: '15 minutes ago', unread: true, type: 'info' },
    { id: 3, title: 'New class created', message: 'A new class "Grade 10 Maths" has been created.', time: '1 hour ago', unread: false, type: 'success' },
    { id: 4, title: 'Performance report generated', message: 'The weekly performance report is ready.', time: '2 hours ago', unread: true, type: 'warning' },
    { id: 5, title: 'System update', message: 'The system will be updated tonight at 10 PM.', time: '1 day ago', unread: false, type: 'info' },
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


  const AdminOverview = () => (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Premium Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-gray-100 mb-3">Admin Dashboard</h1>
          <p className="text-slate-600 dark:text-gray-400 text-base font-medium">Welcome back! Manage your school system from here.</p>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full border-2 border-emerald-200 dark:border-emerald-700">+12%</span>
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">1,234</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Total Students</p>
            </div>
          </div>

          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full border-2 border-blue-200 dark:border-blue-700">+5%</span>
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">89</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Staff Members</p>
            </div>
          </div>

          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <span className="text-xs font-extrabold text-purple-600 bg-purple-50 dark:bg-purple-900/20 px-3 py-1.5 rounded-full border-2 border-purple-200 dark:border-purple-700">32</span>
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">45</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Active Classes</p>
            </div>
          </div>

          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-extrabold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1.5 rounded-full border-2 border-blue-200 dark:border-blue-700">This Week</span>
              </div>
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">8</h3>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Upcoming Events</p>
            </div>
          </div>
        </div>

        {/* Premium School Performance Overview (Full Width) */}
        <div 
          onClick={() => navigate('performance-report')}
          className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 mb-8 hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
              School Performance Overview
            </h2>
            
            <div className="flex justify-between items-start mb-6">
              <div>
                 <p className="text-sm text-slate-600 dark:text-gray-400 mb-2 font-bold">Average Score</p>
                 <div className="flex items-center gap-4">
                   <p className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">85%</p>
                   <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-extrabold bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 border-2 border-emerald-200 dark:border-emerald-700">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      Up 5%
                   </span>
                 </div>
              </div>
            </div>
            
            <div onClick={(e) => e.stopPropagation()}>
              <AnalyticsGraph 
                title="Overall Performance Trend" 
                graphData={[75, 78, 80, 82, 85]} 
              />
            </div>
          </div>
        </div>

        {/* Main Content Grid (Quick Actions & Recent Activity vs Events) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (Span 2) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Premium Quick Actions */}
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <NavLink 
                  to="staff" 
                  className="group flex items-center gap-4 p-5 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border-2 border-blue-200/50 dark:border-blue-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur opacity-50"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-gray-100 group-hover:text-blue-600 transition-colors mb-1">Manage Staff</h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">Add, edit or remove staff</p>
                  </div>
                </NavLink>

                <NavLink 
                  to="students" 
                  className="group flex items-center gap-4 p-5 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border-2 border-purple-200/50 dark:border-purple-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl blur opacity-50"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-gray-100 group-hover:text-purple-600 transition-colors mb-1">Manage Students</h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">View and manage students</p>
                  </div>
                </NavLink>

                <NavLink 
                  to="performance-report" 
                  className="group flex items-center gap-4 p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-2 border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl blur opacity-50"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-gray-100 group-hover:text-emerald-600 transition-colors mb-1">View Reports</h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">Performance analytics</p>
                  </div>
                </NavLink>

                <NavLink 
                  to="settings" 
                  className="group flex items-center gap-4 p-5 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200/50 dark:border-amber-700/50 hover:shadow-2xl hover:scale-105 transition-all duration-300"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl blur opacity-50"></div>
                    <div className="relative w-14 h-14 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-slate-900 dark:text-gray-100 group-hover:text-amber-600 transition-colors mb-1">System Settings</h3>
                    <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">Configure system</p>
                  </div>
                </NavLink>
              </div>
            </div>

            {/* Premium Recent Activity */}
            <div className="relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-gray-100 mb-6 flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 via-pink-500 to-rose-500 rounded-full shadow-lg"></div>
                Recent Activity
              </h2>
              <div className="space-y-3">
                {[
                  { action: 'New student registration', user: 'John Doe', time: '5 minutes ago', gradient: 'from-blue-500 to-cyan-500' },
                  { action: 'Staff member updated profile', user: 'Jane Smith', time: '15 minutes ago', gradient: 'from-purple-500 to-pink-500' },
                  { action: 'New class created', user: 'Admin', time: '1 hour ago', gradient: 'from-emerald-500 to-teal-500' },
                  { action: 'Performance report generated', user: 'System', time: '2 hours ago', gradient: 'from-amber-500 to-orange-500' },
                ].map((activity, index) => (
                  <div key={index} className="group flex items-center gap-4 p-4 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-slate-800/50 dark:to-blue-900/20 rounded-xl border-2 border-slate-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-200">
                    <div className={`w-12 h-12 bg-gradient-to-br ${activity.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100 truncate">{activity.action}</p>
                      <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{activity.user} • {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Premium Events Column */}
          <div className="lg:col-span-1 relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 h-fit">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-gray-100 mb-6 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full shadow-lg"></div>
                Upcoming Events
              </div>
              <NavLink to="events" className="text-xs text-blue-600 dark:text-blue-400 hover:text-purple-600 dark:hover:text-purple-400 font-extrabold transition-colors hover:underline">
                View All
              </NavLink>
            </h2>
            <div className="space-y-4">
              {mockEvents.slice(0, 5).map((event) => (
                <div key={event.id} className="group relative bg-white dark:bg-gray-800 rounded-xl border-2 border-slate-200 dark:border-gray-700 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="relative h-28 overflow-hidden">
                    <img 
                      src={event.thumbnail} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-extrabold text-slate-900 dark:text-gray-100 mb-2 line-clamp-1 group-hover:text-amber-600 transition-colors">{event.title}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-gray-400 mb-2 font-bold">
                      <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-gray-400 font-bold">
                      <div className="w-5 h-5 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      {event.location}
                    </div>
                  </div>
                </div>
              ))}
              {mockEvents.length === 0 && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-8 h-8 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">No upcoming events.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );


  return (
    <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <AdminSidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-16'} relative z-10`}>
        {/* Premium Enhanced Header */}
        <header className="sticky top-0 z-40 w-full px-6 py-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl flex justify-between items-center border-b-2 border-slate-200/60 dark:border-gray-700/50 shadow-lg">
          <button
            onClick={toggleSidebar}
            className="group p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:scale-110 border-2 border-transparent hover:border-blue-200/50"
          >
            <svg className="w-6 h-6 text-slate-600 dark:text-gray-300 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center gap-3">
            {/* Premium Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="group relative p-3 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 hover:scale-110 border-2 border-transparent hover:border-blue-200/50"
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

            {/* Premium Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="group p-3 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-2xl hover:scale-110 focus:outline-none focus:ring-4 focus:ring-purple-500/20 transition-all duration-300 border-2 border-white/20"
            >
              <svg className="w-5 h-5 text-white group-hover:rotate-180 transition-transform duration-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4.22 2.03a1 1 0 011.42 0l.71.71a1 1 0 11-1.42 1.42l-.71-.71a1 1 0 010-1.42zM18 9a1 1 0 110 2h-1a1 1 0 110-2h1zM4 9a1 1 0 110 2H3a1 1 0 110-2h1zm1.34-4.95a1 1 0 010 1.42l-.71.71A1 1 0 113.5 5.16l.71-.71a1 1 0 011.42 0zM10 14a4 4 0 100-8 4 4 0 000 8z" />
              </svg>
            </button>

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
                <svg className={`w-5 h-5 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border-2 border-slate-200 dark:border-gray-700 py-2 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300">
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
                  <NavLink 
                    to="app-settings" 
                    onClick={() => setIsDropdownOpen(false)} 
                    className="flex items-center gap-3 px-5 py-3 text-sm font-bold text-slate-700 dark:text-gray-300 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 dark:hover:from-purple-900/20 dark:hover:to-pink-900/20 hover:text-purple-600 transition-all group"
                  >
                    <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span>App Settings</span>
                  </NavLink>
                  <hr className="my-2 border-slate-200 dark:border-gray-700" />
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
              )}
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 p-6 overflow-auto">
          <Routes>
            <Route path="/" element={<AdminOverview />} />
            <Route path="staff" element={<StaffPage />} />
            <Route path="staff-profile/:staffId" element={<StaffProfilePage />} />
            <Route path="settings" element={<AdminSettingsPage />} />
            <Route path="students" element={<AdminStudentsPage />} />
            <Route path="ai-chatbot" element={<AdminAIChatbotPage />} />
            <Route path="performance-report" element={<PerformanceReportPage />} />
            <Route path="school-management" element={<SchoolManagementPage />} />
            <Route path="app-settings" element={<AppSettingsPage />} />
            <Route path="events" element={<AdminEventsPage />} />
            <Route path="events/:id" element={<AdminEventDetailPage />} />
            <Route path="student-profile/:studentId" element={<AdminStudentProfilePage />} />
            <Route path="class-detail/:classId" element={<AdminClassDetailPage />} />
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


export default AdminDashboard;

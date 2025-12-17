import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom';
import StaffPage from './StaffPage';
import StaffProfilePage from './StaffProfilePage';
import AdminSettingsPage from './AdminSettingsPage';
import AdminStudentsPage from './AdminStudentsPage';
import PerformanceReportPage from './PerformanceReportPage';
import SchoolManagementPage from './SchoolManagementPage';
import AppSettingsPage from './AppSettingsPage';
import AdminEventsPage from './AdminEventsPage';
import AdminEventDetailPage from './AdminEventDetailPage';
import AdminStudentProfilePage from './AdminStudentProfilePage';
import AdminClassDetailPage from './AdminClassDetailPage';
import AdminAIChatbotPage from './AdminAIChatbotPage';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const adminName = "Admin User";
  const adminEmail = "admin@swotify.com";
  const userAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=80&auto=format&fit=crop';

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => navigate('/signup');

  const navItems = [
    { to: '', label: 'Dashboard', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
    { to: 'staff', label: 'Staff', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
    { to: 'students', label: 'Students', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' },
    { to: 'school-management', label: 'Classes', icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' },
    { to: 'events', label: 'Events', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
    { to: 'performance-report', label: 'Reports', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
    { to: 'ai-chatbot', label: 'AI Assistant', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
    { to: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z' },
  ];

  const notifications = [
    { id: 1, title: 'New Registration', message: 'John Doe has been registered', time: '5m ago', unread: true },
    { id: 2, title: 'Staff Update', message: 'Jane Smith updated profile', time: '15m ago', unread: true },
    { id: 3, title: 'Report Ready', message: 'Weekly report generated', time: '1h ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  // Simple Admin Overview Component
  const AdminOverview = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back! Manage your school system.</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">1,234</p>
          <p className="text-sm text-slate-500">Total Students</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">+5%</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">89</p>
          <p className="text-sm text-slate-500">Staff Members</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <span className="text-xs font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-full">32</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">45</p>
          <p className="text-sm text-slate-500">Active Classes</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">This Week</span>
          </div>
          <p className="text-2xl font-bold text-slate-800">8</p>
          <p className="text-sm text-slate-500">Upcoming Events</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <NavLink to="staff" className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-2 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-blue-700">Staff</p>
          </NavLink>
          <NavLink to="students" className="p-4 bg-purple-50 border border-purple-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-2 bg-purple-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-purple-700">Students</p>
          </NavLink>
          <NavLink to="school-management" className="p-4 bg-green-50 border border-green-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-green-700">Classes</p>
          </NavLink>
          <NavLink to="events" className="p-4 bg-orange-50 border border-orange-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-2 bg-orange-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-orange-700">Events</p>
          </NavLink>
          <NavLink to="performance-report" className="p-4 bg-pink-50 border border-pink-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-2 bg-pink-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-pink-700">Reports</p>
          </NavLink>
          <NavLink to="ai-chatbot" className="p-4 bg-cyan-50 border border-cyan-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
            <div className="w-10 h-10 mx-auto mb-2 bg-cyan-500 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <p className="text-sm font-semibold text-cyan-700">AI Chat</p>
          </NavLink>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Overview */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Attendance Overview</h2>
            <NavLink to="performance-report" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</NavLink>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Present Today</p>
                  <p className="text-xs text-slate-500">1,156 students</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-green-600">94%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Absent Today</p>
                  <p className="text-xs text-slate-500">78 students</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-red-600">6%</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Staff Attendance</p>
                  <p className="text-xs text-slate-500">85 of 89 present</p>
                </div>
              </div>
              <span className="text-2xl font-bold text-orange-600">95%</span>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Upcoming Events</h2>
            <NavLink to="events" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</NavLink>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Annual Sports Day', date: 'Dec 20', time: '9:00 AM', color: 'blue' },
              { title: 'Science Exhibition', date: 'Dec 22', time: '10:00 AM', color: 'green' },
              { title: 'Parent-Teacher Meet', date: 'Dec 25', time: '2:00 PM', color: 'purple' },
              { title: 'Winter Vacation Begins', date: 'Dec 28', time: 'All Day', color: 'orange' },
            ].map((event, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className={`w-12 h-12 bg-${event.color}-100 rounded-lg flex flex-col items-center justify-center`}>
                  <span className="text-xs font-bold text-slate-600">{event.date.split(' ')[0]}</span>
                  <span className="text-sm font-bold text-slate-800">{event.date.split(' ')[1]}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-800">{event.title}</p>
                  <p className="text-xs text-slate-500">{event.time}</p>
                </div>
                <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers & AI Assistant */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Performing Students */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-800">Top Performing Students</h2>
            <NavLink to="students" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</NavLink>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[
              { name: 'Alice Johnson', grade: 'A+', class: '10-A', rank: 1 },
              { name: 'Bob Smith', grade: 'A+', class: '10-B', rank: 2 },
              { name: 'Carol White', grade: 'A', class: '9-A', rank: 3 },
              { name: 'David Brown', grade: 'A', class: '10-A', rank: 4 },
              { name: 'Emma Davis', grade: 'A', class: '9-B', rank: 5 },
            ].map((student, index) => (
              <div key={index} className="text-center p-4 bg-slate-50 rounded-xl hover:shadow-md transition-shadow">
                <div className="relative inline-block mb-2">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {student.name.charAt(0)}
                  </div>
                  <span className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${student.rank === 1 ? 'bg-yellow-500' : student.rank === 2 ? 'bg-slate-400' : student.rank === 3 ? 'bg-orange-400' : 'bg-blue-500'
                    }`}>
                    {student.rank}
                  </span>
                </div>
                <p className="text-sm font-semibold text-slate-800 truncate">{student.name}</p>
                <p className="text-xs text-slate-500">{student.class} • {student.grade}</p>
              </div>
            ))}
          </div>
        </div>

        {/* AI Assistant Quick Access */}
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl p-6 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
            <div>
              <h2 className="text-lg font-bold">AI Assistant</h2>
              <p className="text-sm text-white/80">Get instant help</p>
            </div>
          </div>
          <p className="text-sm mb-4 text-white/90">
            Ask me about student performance, attendance analytics, or generate reports instantly.
          </p>
          <NavLink
            to="ai-chatbot"
            className="block w-full py-3 bg-white text-purple-600 text-center font-semibold rounded-lg hover:bg-white/90 transition-colors"
          >
            Start Chatting →
          </NavLink>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
          <span className="text-sm text-slate-500">Last 24 hours</span>
        </div>
        <div className="space-y-3">
          {[
            { action: 'New student registration', user: 'John Doe', time: '5 minutes ago', icon: 'M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z', color: 'blue' },
            { action: 'Staff member updated profile', user: 'Jane Smith', time: '15 minutes ago', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', color: 'purple' },
            { action: 'New event created', user: 'Admin', time: '1 hour ago', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'orange' },
            { action: 'Performance report generated', user: 'System', time: '2 hours ago', icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', color: 'green' },
            { action: 'Class schedule updated', user: 'Principal', time: '3 hours ago', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'pink' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
              <div className={`w-10 h-10 bg-${activity.color}-100 rounded-lg flex items-center justify-center`}>
                <svg className={`w-5 h-5 text-${activity.color}-600`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={activity.icon} />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{activity.action}</p>
                <p className="text-xs text-slate-500">{activity.user} • {activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Top Navbar */}
      <nav className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-200 z-50">
        <div className="h-full px-4 flex items-center justify-between">
          {/* Left: Hamburger + Logo */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center">
                <img src="/logo.png" alt="Swotify" className="h-5 w-5 object-contain" />
              </div>
              <div>
                <span className="text-lg font-bold text-slate-800">Swotify</span>
                <span className="text-xs text-slate-500 ml-2 hidden sm:inline">Admin Portal</span>
              </div>
            </div>
          </div>

          {/* Right: Notifications + Profile */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => { setIsNotificationOpen(!isNotificationOpen); setIsProfileOpen(false); }}
                className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg relative"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg border border-slate-200 shadow-xl overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200 font-semibold text-slate-800">
                    Notifications
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div key={notif.id} className={`px-4 py-3 border-b border-slate-100 hover:bg-slate-50 cursor-pointer ${notif.unread ? 'bg-blue-50' : ''}`}>
                        <p className="text-sm font-medium text-slate-800">{notif.title}</p>
                        <p className="text-xs text-slate-500">{notif.message}</p>
                        <p className="text-xs text-slate-400 mt-1">{notif.time}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => { setIsProfileOpen(!isProfileOpen); setIsNotificationOpen(false); }}
                className="flex items-center gap-2 p-1.5 hover:bg-slate-100 rounded-lg"
              >
                <img src={userAvatar} alt={adminName} className="w-8 h-8 rounded-full object-cover border border-slate-200" />
                <span className="hidden sm:block text-sm font-medium text-slate-700">Admin</span>
                <svg className="hidden sm:block w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg border border-slate-200 shadow-xl overflow-hidden">
                  <div className="px-4 py-3 bg-slate-50 border-b border-slate-200">
                    <p className="font-semibold text-slate-800">{adminName}</p>
                    <p className="text-xs text-slate-500">{adminEmail}</p>
                  </div>
                  <NavLink to="settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    Manage Profile
                  </NavLink>
                  <NavLink to="app-settings" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    App Settings
                  </NavLink>
                  <div className="border-t border-slate-200">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 bottom-0 w-64 bg-white border-r border-slate-200 z-40
        transform transition-transform duration-200
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:top-16
      `}>
        {/* Mobile Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 lg:hidden">
          <span className="text-lg font-bold text-slate-800">Menu</span>
          <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="h-[calc(100%-4rem)] lg:h-full flex flex-col overflow-hidden">

          {/* Navigation */}
          <nav className="flex-1 p-4 overflow-y-auto">
            <p className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase">Menu</p>
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.to}>
                  <NavLink
                    to={item.to}
                    end={item.to === ''}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium ${isActive ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-slate-200">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="p-4 sm:p-6">
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
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;

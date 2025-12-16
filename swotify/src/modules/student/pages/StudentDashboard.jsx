// src/modules/student/pages/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

// Sub-components (imported for routing)
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import StudentMarks from '../components/StudentMarks';
import StudentAttendance from '../components/StudentAttendance';
import AIChatbot from '../components/AIChatbot';
import ReportPage from './ReportPage';
import SettingsPage from './SettingsPage';
import HomePage from './HomePage';
import EventsPage from './EventsPage';
import EventDetailPage from './EventDetailPage';
import MyProfilePage from './MyProfilePage';

// Mock Data
import mockParents from '../../../data/mockParents';
import mockClasses from '../../../data/mockClasses';

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

const StudentDashboard = () => {
  useTheme();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  // Parent/Child Switching Logic
  const [currentParent] = useState(mockParents[0]); // Simulate logged-in parent
  const [selectedStudentId, setSelectedStudentId] = useState(currentParent.childrenIds[0]);
  const [isChildSwitcherOpen, setIsChildSwitcherOpen] = useState(false);

  // Helper to get student data from mockClasses
  const getStudentData = (studentId) => {
    for (const cls of mockClasses) {
      const student = cls.students.find(s => s.id === studentId);
      if (student) return student;
    }
    return { name: 'Unknown Student', photo: '' }; // Fallback
  };

  const currentStudent = getStudentData(selectedStudentId);

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
    navigate('/signup');
  };
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
    const isDark = document.documentElement.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  };

  const navItems = [
    { 
      to: 'home', 
      label: 'Home', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      color: 'blue'
    },
    { 
      to: 'my-profile', 
      label: 'My Profile', 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      color: 'emerald'
    },
    { 
      to: 'chatbot', 
      label: 'AI Chatbot', 
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      color: 'pink',
      badge: 'AI'
    },
    { 
      to: 'report', 
      label: 'Report', 
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      color: 'amber'
    },
    { 
      to: 'events', 
      label: 'Events', 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'rose'
    },
  ];

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Assignment Due', message: 'Your Math assignment is due tomorrow.', time: '2 hours ago', unread: true },
    { id: 2, title: 'Grade Posted', message: 'Your Science exam grade has been posted.', time: '5 hours ago', unread: false },
    { id: 3, title: 'New Event', message: 'Sports Day scheduled for next Friday.', time: '1 day ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const getColorClasses = (color, isActive) => {
    if (isActive) {
      return 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl';
    }
    
    const colors = {
      blue: 'hover:bg-blue-50 hover:text-blue-600',
      emerald: 'hover:bg-emerald-50 hover:text-emerald-600',
      purple: 'hover:bg-purple-50 hover:text-purple-600',
      pink: 'hover:bg-pink-50 hover:text-pink-600',
      amber: 'hover:bg-amber-50 hover:text-amber-600',
      cyan: 'hover:bg-cyan-50 hover:text-cyan-600',
      rose: 'hover:bg-rose-50 hover:text-rose-600',
      slate: 'hover:bg-slate-50 hover:text-slate-600',
    };
    
    return `text-slate-600 ${colors[color] || colors.blue}`;
  };

  return (
    <div className="flex min-h-screen bg-white relative overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 ${
          isSidebarOpen ? 'w-72' : 'w-20'
        } bg-gradient-to-br from-white via-slate-50/50 to-white border-r border-slate-200/60 flex flex-col transition-all duration-300 ease-in-out shadow-2xl overflow-hidden`}
      >
        {/* Logo Section */}
        <div className={`${isSidebarOpen ? 'h-20' : 'h-20'} flex items-center ${isSidebarOpen ? 'px-6' : 'justify-center'} border-b-2 border-slate-100 bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 flex-shrink-0 relative overflow-hidden`}>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
          </div>
          
          {isSidebarOpen ? (
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl blur-md opacity-50"></div>
                <img 
                  src="/logo.jpg" 
                  alt="Swotify" 
                  className="relative h-12 w-12 object-contain rounded-xl ring-2 ring-white/40 bg-white/10 backdrop-blur-sm p-1" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-white tracking-tight">
                  Swotify
                </span>
                <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">Student Portal</span>
              </div>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl blur-md opacity-50"></div>
              <img 
                src="/logo.jpg" 
                alt="Swotify" 
                className="relative h-11 w-11 object-contain rounded-xl ring-2 ring-white/40 bg-white/10 backdrop-blur-sm p-1" 
              />
            </div>
          )}
        </div>

        {/* User Profile Section (Expanded only) */}
        {isSidebarOpen && (
          <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="relative">
              <div 
                className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-md transition-all"
                onClick={() => setIsChildSwitcherOpen(!isChildSwitcherOpen)}
              >
                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-blue-200">
                  <img className="w-full h-full object-cover" src={currentStudent.photo || "https://via.placeholder.com/150"} alt="Student Avatar" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{currentStudent.name}</p>
                  <p className="text-xs text-slate-600 truncate">Grade: {currentStudent.details?.grade}</p>
                </div>
                <svg className={`w-4 h-4 text-slate-400 transition-transform ${isChildSwitcherOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>

              {/* Child Switcher Dropdown */}
              {isChildSwitcherOpen && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-20 animate-fade-in">
                  <div className="p-2 bg-slate-50 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Switch Child</p>
                  </div>
                  {currentParent.childrenIds.map(childId => {
                    const child = getStudentData(childId);
                    return (
                      <button
                        key={childId}
                        onClick={() => {
                          setSelectedStudentId(childId);
                          setIsChildSwitcherOpen(false);
                        }}
                        className={`w-full flex items-center gap-3 p-3 text-left hover:bg-blue-50 transition-colors ${
                          selectedStudentId === childId ? 'bg-blue-50' : ''
                        }`}
                      >
                        <div className="w-8 h-8 rounded-lg overflow-hidden border border-slate-200">
                          <img className="w-full h-full object-cover" src={child.photo || "https://via.placeholder.com/150"} alt={child.name} />
                        </div>
                        <div>
                          <p className={`text-sm font-bold ${selectedStudentId === childId ? 'text-blue-600' : 'text-slate-700'}`}>
                            {child.name}
                          </p>
                        </div>
                        {selectedStudentId === childId && (
                          <svg className="w-4 h-4 text-blue-600 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 ${isSidebarOpen ? 'p-4' : 'px-2 py-3'} space-y-2 overflow-y-auto custom-scrollbar`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative flex items-center ${isSidebarOpen ? 'gap-3 px-4 py-3.5' : 'justify-center py-3'} rounded-xl transition-all duration-300 ${getColorClasses(item.color, isActive)} ${isActive ? 'scale-105' : 'hover:scale-105'}`
              }
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsSidebarOpen(false);
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <div className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`}>
                    <svg 
                      className={`${isSidebarOpen ? 'w-6 h-6' : 'w-6 h-6'} transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      strokeWidth="2.5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  {isSidebarOpen && (
                    <span className={`font-bold text-sm whitespace-nowrap flex-1 ${isActive ? 'text-white' : ''}`}>
                      {item.label}
                    </span>
                  )}
                  {isSidebarOpen && item.badge && (
                    <span className={`px-2 py-1 text-xs font-bold rounded-lg ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-pink-100 text-pink-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isSidebarOpen && isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
                  )}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-6 px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-2xl">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 bg-pink-500 text-white text-xs rounded-md">{item.badge}</span>
                      )}
                      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 border-[6px] border-transparent border-r-slate-900"></div>
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Section */}
        <div className={`${isSidebarOpen ? 'p-4' : 'px-2 py-3'} border-t-2 border-slate-100 bg-gradient-to-r from-slate-50 to-blue-50 flex-shrink-0 space-y-2`}>
          {/* Settings */}
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `group relative flex items-center ${isSidebarOpen ? 'gap-3 px-4 py-3.5' : 'justify-center py-3'} rounded-xl transition-all duration-300 ${getColorClasses('slate', isActive)} ${isActive ? 'scale-105' : 'hover:scale-105'}`
            }
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
              }
            }}
          >
            {({ isActive }) => (
              <>
                <div className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`}>
                  <svg 
                    className={`w-6 h-6 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'} group-hover:rotate-90`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {isSidebarOpen && (
                  <span className={`font-bold text-sm whitespace-nowrap ${isActive ? 'text-white' : ''}`}>
                    Settings
                  </span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-6 px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-2xl">
                    Settings
                    <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 border-[6px] border-transparent border-r-slate-900"></div>
                  </div>
                )}
              </>
            )}
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`group relative w-full flex items-center ${isSidebarOpen ? 'gap-3 px-4 py-3.5' : 'justify-center py-3'} rounded-xl text-slate-600 hover:bg-gradient-to-r hover:from-rose-50 hover:to-red-50 hover:text-rose-600 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex-shrink-0">
              <svg 
                className={`${isSidebarOpen ? 'w-6 h-6' : 'w-6 h-6'} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            {isSidebarOpen && (
              <span className="font-bold text-sm whitespace-nowrap">
                Logout
              </span>
            )}
            {!isSidebarOpen && (
              <div className="absolute left-full ml-6 px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-2xl">
                Logout
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 border-[6px] border-transparent border-r-slate-900"></div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main area */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${isSidebarOpen ? 'lg:ml-72' : 'lg:ml-20'}`}>
        {/* Header */}
        <header className="sticky top-0 z-10 w-full p-4 bg-white/90 backdrop-blur-xl flex justify-between items-center border-b border-slate-200/60 shadow-lg">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 group text-slate-600"
          >
            <svg className="w-6 h-6 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>

          <div className="flex items-center space-x-3">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="relative p-2 rounded-xl hover:bg-blue-50 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200 group text-slate-600"
              >
                <svg className="w-6 h-6 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 rounded-full border-2 border-white animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200/60 z-50 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-4 py-3">
                    <h3 className="text-white font-bold text-sm">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto custom-scrollbar">
                    {notifications.map((notif) => (
                      <div 
                        key={notif.id} 
                        className={`px-4 py-3 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors cursor-pointer ${
                          notif.unread ? 'bg-blue-50/50' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${notif.unread ? 'bg-blue-600' : 'bg-slate-300'}`}></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 mb-1">{notif.title}</p>
                            <p className="text-xs text-slate-600 mb-1">{notif.message}</p>
                            <p className="text-xs text-slate-500">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 bg-slate-50 text-center border-t border-slate-100">
                    <button className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                      View All Notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-200"
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
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-0.5 shadow-lg">
                  <img className="w-full h-full rounded-full object-cover" src={currentStudent.photo || userAvatar} alt="User Avatar" />
                </div>
                <svg className={`w-4 h-4 text-slate-600 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200/60 py-2 z-50 overflow-hidden">
                  <NavLink 
                    to="my-profile" 
                    onClick={() => setIsDropdownOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all font-bold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    Manage Profile
                  </NavLink>
                  <NavLink 
                    to="settings" 
                    onClick={() => setIsDropdownOpen(false)} 
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-all font-bold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Manage Settings
                  </NavLink>
                  <hr className="my-2 border-slate-100" />
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 transition-all font-bold"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
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
            <Route path="/" element={<Navigate to="my-profile" replace />} />
            <Route path="home" element={<HomePage studentId={selectedStudentId} />} />
            <Route path="my-profile" element={<MyProfilePage studentId={selectedStudentId} />} />
            <Route path="chatbot" element={<AIChatbot />} />
            <Route path="report" element={<ReportPage studentId={selectedStudentId} />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:eventId" element={<EventDetailPage />} />
          </Routes>
        </main>
      </div>

      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #e2e8f0 transparent;
        }
        .custom-scrollbar:hover {
          scrollbar-color: #cbd5e1 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
          transition: background 0.3s;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: #cbd5e1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
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
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' 
    },
    { 
      to: 'my-profile', 
      label: 'My Profile', 
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' 
    },
    { 
      to: 'chatbot', 
      label: 'AI Chatbot', 
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' 
    },
    { 
      to: 'report', 
      label: 'Report', 
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' 
    },
    { 
      to: 'events', 
      label: 'Events', 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
    },
  ];

  // Mock notifications
  const notifications = [
    { id: 1, title: 'Assignment Due', message: 'Your Math assignment is due tomorrow.', time: '2 hours ago', unread: true },
    { id: 2, title: 'Grade Posted', message: 'Your Science exam grade has been posted.', time: '5 hours ago', unread: false },
    { id: 3, title: 'New Event', message: 'Sports Day scheduled for next Friday.', time: '1 day ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden">
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 ${
          isSidebarOpen ? 'w-72' : 'w-20'
        } bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out shadow-lg`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-center border-b border-gray-200 px-4">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <img src="/logo.jpg" alt="Swotify" className="h-10 w-10 object-contain rounded-lg" />
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-[#ff7300] to-[#9000ff] bg-clip-text text-transparent">
                  Swotify
                </span>
                <span className="text-xs text-[#827979]">Student Portal</span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img src="/logo.jpg" alt="Swotify" className="h-10 w-10 object-contain rounded-lg" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#ff7300] to-[#9000ff] rounded-full border-2 border-white"></div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white shadow-md' 
                    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-[#ff7300]'
                }`
              }
              onClick={() => {
                if (window.innerWidth < 1024) {
                  setIsSidebarOpen(false);
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-[#827979] group-hover:text-[#ff7300]'}`}>
                    <svg 
                      className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={item.icon} />
                    </svg>
                  </div>
                  {isSidebarOpen && (
                    <span className="font-medium text-sm whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-6 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                      {item.label}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-200 space-y-2">
          {/* Settings */}
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-[#827979] to-[#9000ff] text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-[#827979]'
              }`
            }
            onClick={() => {
              if (window.innerWidth < 1024) {
                setIsSidebarOpen(false);
              }
            }}
          >
            {({ isActive }) => (
              <>
                <div className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-[#827979] group-hover:text-[#827979]'}`}>
                  <svg 
                    className="w-6 h-6 transition-transform duration-200 group-hover:rotate-90" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                {isSidebarOpen && (
                  <span className="font-medium text-sm whitespace-nowrap">
                    Settings
                  </span>
                )}
                {!isSidebarOpen && (
                  <div className="absolute left-full ml-6 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                    Settings
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </>
            )}
          </NavLink>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="group w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 hover:text-red-600 transition-all duration-200"
          >
            <div className="flex-shrink-0 text-[#827979] group-hover:text-red-600">
              <svg 
                className="w-6 h-6 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </div>
            {isSidebarOpen && (
              <span className="font-medium text-sm whitespace-nowrap">
                Logout
              </span>
            )}
            {!isSidebarOpen && (
              <div className="absolute left-full ml-6 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                Logout
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
              </div>
            )}
          </button>
        </div>
      </aside>

      {/* Main area */}
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
                  <img className="w-full h-full rounded-full object-cover" src={userAvatar} alt="User Avatar" />
                </div>
                <svg className={`w-4 h-4 text-[#827979] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl border border-gray-200 py-2 z-50 overflow-hidden">
                  <NavLink 
                    to="my-profile" 
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
            <Route path="/" element={<Navigate to="my-profile" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="my-profile" element={<MyProfilePage />} />
            <Route path="chatbot" element={<AIChatbot />} />
            <Route path="report" element={<ReportPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="events/:eventId" element={<EventDetailPage />} />
          </Routes>
        </main>
      </div>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #ff7300 0%, #9000ff 100%);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9000ff 0%, #ff7300 100%);
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;

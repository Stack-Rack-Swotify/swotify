import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/signup');
  };

  const navItems = [
    { 
      to: '/admin', 
      label: 'Dashboard', 
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z',
      end: true // Exact match for root
    },
    { 
      to: 'staff', 
      label: 'Staff', 
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' 
    },
    { 
      to: 'students', 
      label: 'Students', 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z' 
    },
    { 
      to: 'school-management', 
      label: 'School Management', 
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' 
    },
    { 
      to: 'performance-report', 
      label: 'Performance Report', 
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' 
    },
    { 
      to: 'events', 
      label: 'Events', 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' 
    },
    { 
      to: 'ai-chatbot', 
      label: 'AI Chatbot', 
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      badge: 'AI'
    },
     { 
      to: 'app-settings', 
      label: 'App Settings', 
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4' 
    },
  ];

  const getColorClasses = (isActive) => {
    if (isActive) {
      return 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl';
    }
    return 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-800 hover:text-blue-600 dark:hover:text-blue-400';
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden animate-fade-in"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 ${
          isSidebarOpen ? 'w-72' : 'w-16'
        } bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-r border-slate-200/60 dark:border-gray-700/50 flex flex-col transition-all duration-300 ease-in-out shadow-2xl overflow-hidden`}
      >
        {/* Logo Section */}
        <div className={`${isSidebarOpen ? 'h-20' : 'h-20'} flex items-center ${isSidebarOpen ? 'px-6' : 'justify-center'} border-b border-slate-200/60 dark:border-gray-700/50 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex-shrink-0 relative overflow-hidden`}>
          {isSidebarOpen ? (
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl blur-md opacity-50"></div>
                <img 
                  src="/logo.jpg" 
                  alt="Swotify" 
                  className="relative h-10 w-10 object-contain rounded-xl ring-2 ring-white/40 dark:ring-gray-700 bg-white/10 backdrop-blur-sm" 
                />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent tracking-tight">
                  Swotify
                </span>
                <span className="text-[10px] text-slate-500 dark:text-gray-500 font-bold uppercase tracking-wider">Admin Portal</span>
              </div>
            </div>
          ) : (
            <div className="relative z-10">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-400 rounded-xl blur-md opacity-50"></div>
              <img 
                src="/logo.jpg" 
                alt="Swotify" 
                className="relative h-9 w-9 object-contain rounded-xl ring-2 ring-white/40 dark:ring-gray-700 bg-white/10 backdrop-blur-sm" 
              />
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className={`flex-1 ${isSidebarOpen ? 'p-4' : 'px-2 py-3'} space-y-2 overflow-y-auto custom-scrollbar`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `group relative flex items-center ${isSidebarOpen ? 'gap-3 px-4 py-3' : 'justify-center py-3'} rounded-xl transition-all duration-300 ${getColorClasses(isActive)} ${isActive ? 'scale-105' : 'hover:scale-105'}`
              }
              onClick={() => {
                if (window.innerWidth < 1024) {
                  toggleSidebar();
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <div className={`flex-shrink-0 ${isActive ? 'text-white' : ''}`}>
                    <svg 
                      className={`${isSidebarOpen ? 'w-5 h-5' : 'w-6 h-6'} transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
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
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-lg ${
                      isActive 
                        ? 'bg-white/20 text-white' 
                        : 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-6 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-2xl">
                      {item.label}
                      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 border-[6px] border-transparent border-r-slate-900"></div>
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Section */}
        <div className={`${isSidebarOpen ? 'p-4' : 'px-2 py-3'} border-t border-slate-200/60 dark:border-gray-700/50 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex-shrink-0 space-y-2`}>
          {/* Settings */}
          <NavLink
            to="settings"
            className={({ isActive }) =>
              `group relative flex items-center ${isSidebarOpen ? 'gap-3 px-4 py-3' : 'justify-center py-3'} rounded-xl transition-all duration-300 ${getColorClasses(isActive)} ${isActive ? 'scale-105' : 'hover:scale-105'}`
            }
            onClick={() => {
              if (window.innerWidth < 1024) {
                toggleSidebar();
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
                  <div className="absolute left-full ml-6 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-2xl">
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
            className={`group relative w-full flex items-center ${isSidebarOpen ? 'gap-3 px-4 py-3' : 'justify-center py-3'} rounded-xl text-slate-600 dark:text-gray-400 hover:bg-gradient-to-r hover:from-rose-50 hover:to-red-50 dark:hover:from-rose-900/20 dark:hover:to-red-900/20 hover:text-rose-600 dark:hover:text-rose-400 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
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
              <div className="absolute left-full ml-6 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-2xl">
                Logout
                <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 border-[6px] border-transparent border-r-slate-900"></div>
              </div>
            )}
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
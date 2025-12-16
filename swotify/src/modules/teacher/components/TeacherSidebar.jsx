import React from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

const TeacherSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { 
      to: '/teacher-dashboard', 
      label: 'Dashboard', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      end: true,
      color: 'blue'
    },
    { 
      to: '/teacher-dashboard/students', 
      label: 'Students', 
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      color: 'emerald'
    },
    { 
      to: '/teacher-dashboard/class', 
      label: 'Classes', 
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
      color: 'purple',
      exact: true // Custom property to check strict path match
    },
    { 
      to: '/teacher-dashboard/class?view=history', 
      label: 'Archived Records', 
      icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', // Clock/History icon
      color: 'slate'
    },
    { 
      to: '/teacher-dashboard/events', 
      label: 'Events', 
      icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z',
      color: 'rose'
    },
    { 
      to: '/teacher-dashboard/ai-chatbot', 
      label: 'AI Chatbot', 
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      color: 'pink',
      badge: 'AI'
    },
    { 
      to: '/teacher-dashboard/report', 
      label: 'Report', 
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      color: 'amber'
    },
  ];

  const handleLogout = () => {
    navigate('/signup');
  };

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

  // Helper to determine if a link is active considering query params
  const isLinkActive = (item) => {
    const currentPath = location.pathname;
    const currentSearch = location.search;
    
    // Split item.to into path and search
    const [toPath, toSearch] = item.to.split('?');
    
    if (item.end) {
      return currentPath === toPath && currentSearch === (toSearch ? `?${toSearch}` : '');
    }
    
    // For Class items with query params
    if (toSearch) {
        return currentPath === toPath && currentSearch === `?${toSearch}`;
    }
    
    // For Class item (main) - only active if no query param
    if (item.exact && item.to === '/teacher-dashboard/class') {
        return currentPath === item.to && currentSearch === '';
    }

    return currentPath.startsWith(toPath);
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden animate-fade-in"
          onClick={() => toggleSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 ${
          isSidebarOpen ? 'w-72' : 'w-20'
        } bg-white border-r border-slate-200/60 flex flex-col transition-all duration-300 ease-in-out shadow-2xl overflow-hidden`}
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
                <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">Teacher Portal</span>
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
          <div className="p-4 border-b border-slate-100 bg-white">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                T
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">Teacher Name</p>
                <p className="text-xs text-slate-600 truncate">teacher@swotify.com</p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 ${isSidebarOpen ? 'p-4' : 'px-2 py-3'} space-y-2 overflow-y-auto custom-scrollbar`}>
          {navItems.map((item) => {
            const active = isLinkActive(item);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={
                  `group relative flex items-center ${isSidebarOpen ? 'gap-3 px-4 py-3.5' : 'justify-center py-3'} rounded-xl transition-all duration-300 ${getColorClasses(item.color, active)} ${active ? 'scale-105' : 'hover:scale-105'}`
                }
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    toggleSidebar(false);
                  }
                }}
              >
                {/* Use 'active' variable instead of Render Props to use our custom logic */}
                <div className={`flex-shrink-0 ${active ? 'text-white' : ''}`}>
                  <svg 
                    className={`${isSidebarOpen ? 'w-6 h-6' : 'w-6 h-6'} transition-transform duration-300 ${active ? 'scale-110' : 'group-hover:scale-110'}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                {isSidebarOpen && (
                  <span className={`font-bold text-sm whitespace-nowrap flex-1 ${active ? 'text-white' : ''}`}>
                    {item.label}
                  </span>
                )}
                {isSidebarOpen && item.badge && (
                  <span className={`px-2 py-1 text-xs font-bold rounded-lg ${
                    active 
                      ? 'bg-white/20 text-white' 
                      : 'bg-pink-100 text-pink-600'
                  }`}>
                    {item.badge}
                  </span>
                )}
                {isSidebarOpen && active && (
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
              </NavLink>
            );
          })}
        </nav>

        {/* Footer Section */}
        <div className={`${isSidebarOpen ? 'p-4' : 'px-2 py-3'} border-t-2 border-slate-100 bg-white flex-shrink-0 space-y-2`}>
          {/* Settings */}
          <NavLink
            to="/teacher-dashboard/settings"
            className={({ isActive }) =>
              `group relative flex items-center ${isSidebarOpen ? 'gap-3 px-4 py-3.5' : 'justify-center py-3'} rounded-xl transition-all duration-300 ${getColorClasses('slate', isActive)} ${isActive ? 'scale-105' : 'hover:scale-105'}`
            }
            onClick={() => {
              if (window.innerWidth < 1024) {
                toggleSidebar(false);
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
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
};

export default TeacherSidebar;
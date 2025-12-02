import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const AdminSidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  const navItems = [
    { 
      to: '.', 
      label: 'Dashboard', 
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      end: true,
      color: '#0EA5E9'
    },
    { 
      to: 'staff', 
      label: 'Staff', 
      icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z',
      color: '#F97316'
    },
    { 
      to: 'students', 
      label: 'Students', 
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      color: '#22C55E'
    },
    { 
      to: 'ai-chatbot', 
      label: 'AI Chatbot', 
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      color: '#94A3B8'
    },
    { 
      to: 'performance-report', 
      label: 'Reports', 
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      color: '#0EA5E9'
    },
    {
      to: 'school-management',
      label: 'School Management',
      icon: 'M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v10a2 2 0 002 2zm0 0H4M6 18v2m0-2h4m-4 0v-2m4 2v2m0-2h4m-4 0v-2m4 2v2m0-2h2m-2 0v-2',
      color: '#8B5CF6'
    },
    { 
      to: 'settings', 
      label: 'Settings', 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      color: '#64748B'
    },
  ];

  const handleLogout = () => {
    // Add logout logic here (clear tokens, etc.)
    navigate('/signup');
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-[#0F172A]/20 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => toggleSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 ${
          isSidebarOpen ? 'w-72' : 'w-20'
        } bg-white border-r border-gray-100 flex flex-col transition-all duration-300 ease-in-out shadow-sm`}
      >
        {/* Logo Section */}
        <div className="h-16 flex items-center justify-center border-b border-gray-100 px-4">
          {isSidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src="/logo.jpg" alt="Swotify" className="h-10 w-10 object-contain rounded-lg ring-2 ring-[#0EA5E9]/20" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] bg-clip-text text-transparent">
                  Swotify
                </span>
                <span className="text-xs text-[#64748B] font-medium">Admin Portal</span>
              </div>
            </div>
          ) : (
            <div className="relative">
              <img src="/logo.jpg" alt="Swotify" className="h-10 w-10 object-contain rounded-lg ring-2 ring-[#0EA5E9]/20" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] rounded-full border-2 border-white"></div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              style={({ isActive }) => ({
                '--item-color': item.color,
              })}
              className={({ isActive }) =>
                `group relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r text-white shadow-md' 
                    : 'text-[#0F172A] hover:bg-gray-50'
                } ${isActive ? 'from-[var(--item-color)] to-[var(--item-color)]/80' : ''}`
              }
              onClick={() => {
                if (window.innerWidth < 1024) {
                  toggleSidebar(false);
                }
              }}
            >
              {({ isActive }) => (
                <>
                  <div 
                    className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-[#64748B]'}`}
                    style={!isActive ? { color: item.color } : {}}
                  >
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
                    <span className="font-semibold text-sm whitespace-nowrap">
                      {item.label}
                    </span>
                  )}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-6 px-3 py-2 bg-[#0F172A] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                      {item.label}
                      <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-[#0F172A]"></div>
                    </div>
                  )}
                  {/* Active indicator */}
                  {isActive && (
                    <div 
                      className="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Section - Logout */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="group relative w-full flex items-center gap-3 px-4 py-3 rounded-xl text-[#0F172A] hover:bg-[#E11D48]/10 transition-all duration-200"
          >
            <div className="flex-shrink-0 text-[#E11D48]">
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
              <span className="font-semibold text-sm whitespace-nowrap text-[#E11D48]">
                Logout
              </span>
            )}
            {!isSidebarOpen && (
              <div className="absolute left-full ml-6 px-3 py-2 bg-[#0F172A] text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50 shadow-lg">
                Logout
                <div className="absolute top-1/2 -left-1 -translate-y-1/2 border-4 border-transparent border-r-[#0F172A]"></div>
              </div>
            )}
          </button>
        </div>
      </aside>

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #0EA5E9 0%, #22C55E 100%);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #22C55E 0%, #0EA5E9 100%);
        }
      `}</style>
    </>
  );
};

export default AdminSidebar;

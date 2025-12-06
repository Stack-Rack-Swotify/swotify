import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const SuperAdminSidebar = ({ isSidebarOpen, toggleSidebar }) => {
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
      to: 'schools', 
      label: 'Schools', 
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      color: '#8B5CF6'
    },
    { 
      to: 'management', 
      label: 'Management', 
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      color: '#8B5CF6'
    },
    { 
      to: 'reports-feedback', 
      label: 'Reports & Feedback', 
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      color: '#F59E0B'
    },
        {
          to: 'ai-chatbot',
          label: 'AI Chatbot',
          icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z', // Example icon for a chat bot
          color: '#A855F7' // A distinct color
        },    { 
      to: 'settings', 
      label: 'App Settings', 
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      color: '#64748B'
    },
  ];

  const handleLogout = () => {
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
                <span className="text-xs text-[#64748B] font-medium">Super Admin</span>
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

export default SuperAdminSidebar;

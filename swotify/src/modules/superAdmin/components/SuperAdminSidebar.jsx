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
      color: 'bg-[#ea580c]',
      iconColor: 'text-orange-500'
    },

    {
      to: 'management',
      label: 'Management',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      color: 'bg-[#334155]',
      iconColor: 'text-slate-500'
    },
    {
      to: 'reports-feedback',
      label: 'Reports & Feedback',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01',
      color: 'bg-[#ea580c]',
      iconColor: 'text-orange-500'
    },
    {
      to: 'ai-chatbot',
      label: 'AI Chatbot',
      icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z',
      color: 'bg-[#ea580c]',
      iconColor: 'text-orange-500',
      badge: 'AI'
    },
    {
      to: 'settings',
      label: 'Settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z',
      color: 'bg-[#334155]',
      iconColor: 'text-slate-500'
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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-20 lg:hidden animate-fade-in"
          onClick={() => toggleSidebar(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 ${isSidebarOpen ? 'w-72' : 'w-20'
          } bg-gradient-to-b from-white via-slate-50/50 to-white border-r border-slate-200/60 flex flex-col transition-all duration-300 ease-in-out shadow-2xl`}
      >
        {/* Logo Section */}
        <div className={`h-20 flex items-center ${isSidebarOpen ? 'px-6' : 'justify-center'} border-b-2 border-slate-100 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden`}>
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-400 rounded-full blur-2xl"></div>
          </div>

          {isSidebarOpen ? (
            <div className="flex items-center gap-4 relative z-10">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl blur-md opacity-50"></div>
                <img
                  src="/logo.jpg"
                  alt="Swotify"
                  className="relative h-12 w-12 object-contain rounded-xl ring-2 ring-white/40 bg-white/10 backdrop-blur-sm p-1"
                />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white tracking-tight">
                  Swotify
                </span>
                <span className="text-xs text-slate-300 font-bold uppercase tracking-wider flex items-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Super Admin
                </span>
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
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
            </div>
          )}
        </div>

        {/* Admin Profile Card */}
        {isSidebarOpen && (
          <div className="p-4 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-purple-50">
            <div className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-[#ea580c] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  SA
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-slate-900 truncate">Super Admin</p>
                <p className="text-xs text-slate-600 truncate">admin@swotify.com</p>
              </div>
              <svg className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className={`flex-1 ${isSidebarOpen ? 'p-4' : 'px-2 py-3'} space-y-2 overflow-y-auto custom-scrollbar`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `group relative flex items-center ${isSidebarOpen ? 'gap-3 px-4 py-3.5' : 'justify-center py-3'} rounded-xl transition-all duration-300 ${isActive
                  ? `${item.color} text-white shadow-xl scale-105 shadow-orange-500/20`
                  : `text-slate-700 hover:bg-orange-50 hover:scale-105`
                }`
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
                    className={`flex-shrink-0 ${isActive ? 'text-white' : item.iconColor}`}
                  >
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
                    <>
                      <span className={`font-bold text-sm whitespace-nowrap flex-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                        {item.label}
                      </span>
                      {item.badge && (
                        <span className={`px-2 py-1 text-xs font-bold rounded-lg ${isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-rose-100 text-rose-600'
                          }`}>
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                  {isSidebarOpen && isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-white rounded-r-full shadow-lg"></div>
                  )}
                  {!isSidebarOpen && (
                    <div className="absolute left-full ml-6 px-4 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 whitespace-nowrap z-50 shadow-2xl">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 px-2 py-0.5 bg-rose-500 text-white text-xs rounded-md">{item.badge}</span>
                      )}
                      <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 border-[6px] border-transparent border-r-slate-900"></div>
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Footer Section - Logout */}
        <div className={`${isSidebarOpen ? 'p-4' : 'px-2 py-3'} border-t-2 border-slate-100 bg-gradient-to-r from-slate-50 to-rose-50`}>
          <button
            onClick={handleLogout}
            className={`group relative w-full flex items-center ${isSidebarOpen ? 'gap-3 px-4 py-3.5' : 'justify-center py-3'} rounded-xl text-slate-700 hover:bg-gradient-to-r hover:from-rose-50 hover:to-red-50 hover:text-rose-600 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
          >
            <div className="flex-shrink-0 text-rose-600">
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
          background: #ea580c;
          border-radius: 10px;
          transition: background 0.3s;
        }
        .custom-scrollbar:hover::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #2563eb 0%, #7c3aed 50%, #db2777 100%);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #1d4ed8 0%, #6d28d9 50%, #be185d 100%);
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

export default SuperAdminSidebar;

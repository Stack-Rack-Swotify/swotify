import React, { useState } from 'react';
import { NavLink, Outlet, Routes, Route, Navigate } from 'react-router-dom';

// Import teacher-specific pages
import TeacherHomePage from './TeacherHomePage';
import ClassPage from './ClassPage';
// import other teacher pages as they are created

const TeacherDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    alert('Logging out...'); // Placeholder for logout logic
    // In a real app, you would clear authentication tokens and redirect to login
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white relative overflow-hidden">
      {/* Moving background objects (for visual effect, similar to student dashboard) */}
      <div className="moving-object"></div>
      <div className="moving-object"></div>
      <div className="moving-object"></div>
      <div className="moving-object"></div>
      <div className="moving-object"></div>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-black/20 backdrop-blur-lg border-r border-white/10 p-4 flex-col transition-all duration-300 ease-in-out overflow-hidden flex`}>
        <div className="flex items-center justify-center h-16 mb-8">
          {isSidebarOpen ? (
            <div className="text-2xl font-bold text-white">Teacher Portal</div>
          ) : (
            <img src="/logo.jpg" alt="Swotify" className="h-10 w-10 object-contain" />
          )}
        </div>
        <nav className="flex-1 space-y-2">
          <NavLink
            to="home"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors transform hover:scale-105 hover:translate-x-2 transition-transform duration-200 text-gray-300 ${
                isActive ? 'bg-blue-600/50 text-white' : 'hover:bg-white/10'
              }`
            }
            onClick={() => setIsSidebarOpen(false)} // Close sidebar on navigation
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
            {isSidebarOpen && <span className="ml-3">Dashboard Home</span>}
          </NavLink>
          <NavLink
            to="class"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors transform hover:scale-105 hover:translate-x-2 transition-transform duration-200 text-gray-300 ${
                isActive ? 'bg-blue-600/50 text-white' : 'hover:bg-white/10'
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354l-7 7A7 7 0 004 15.354V19a2 2 0 002 2h12a2 2 0 002-2v-3.646a7 7 0 00-1-3.992l-7-7.004z"></path></svg>
            {isSidebarOpen && <span className="ml-3">Manage Classes</span>}
          </NavLink>
          {/* Add more teacher-related navigation links here */}
        </nav>
        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="flex items-center p-3 rounded-lg text-red-400 hover:bg-red-900/50 w-full"
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>

      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'lg:ml-20'}`}>
        {/* Header/Navbar for the dashboard */}
        <header className="w-full p-4 bg-black/20 backdrop-blur-lg flex justify-between items-center">
          {/* Hamburger Icon */}
          <button onClick={toggleSidebar} className="p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-110 transition-transform duration-200">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>

          <h1 className="text-2xl font-bold text-white">Teacher Dashboard</h1>

          {/* User/Notification Icons can be added here if needed */}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 lg:p-10 text-white h-full">
            <Routes>
              {/* Default child route for teacher dashboard */}
              <Route path="/" element={<Navigate to="class" replace />} />
              <Route path="home" element={<TeacherHomePage />} />
              <Route path="class" element={<ClassPage />} />
              {/* Other teacher-related routes will be nested here */}
            </Routes>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;
// swotify/src/modules/student/pages/StudentDashboard.jsx
import React, { useState } from 'react';
import { NavLink, Outlet, Routes, Route, Navigate } from 'react-router-dom'; // Import NavLink, Outlet, Routes, Route, Navigate

// Import sub-components
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import StudentMarks from '../components/StudentMarks';
import StudentAttendance from '../components/StudentAttendance';
import AIChatbot from '../components/AIChatbot';
import ReportPage from './ReportPage'; // Import the ReportPage
import StudentProfile from '../components/StudentProfile'; // Import the new StudentProfile component
import SettingsPage from './SettingsPage'; // Import the new SettingsPage component
import HomePage from './HomePage'; // Import the new HomePage component
import EventsPage from './EventsPage'; // Import the new EventsPage component

const StudentDashboard = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false); // New state for notification dropdown
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // New state for sidebar visibility
  const userAvatar = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // Placeholder avatar

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsNotificationOpen(false); // Close notification dropdown when opening user dropdown
  };

  const toggleNotification = () => {
    setIsNotificationOpen(!isNotificationOpen);
    setIsDropdownOpen(false); // Close user dropdown when opening notification dropdown
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    alert('Logging out...'); // Placeholder for logout logic
    // In a real app, you would clear authentication tokens and redirect to login
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white relative overflow-hidden">
      {/* Moving background objects */}
      <div className="moving-object"></div>
      <div className="moving-object"></div>
      <div className="moving-object"></div>
      <div className="moving-object"></div>
      <div className="moving-object"></div>
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-30 ${isSidebarOpen ? 'w-64' : 'w-20'} bg-black/20 backdrop-blur-lg border-r border-white/10 p-4 flex-col transition-all duration-300 ease-in-out overflow-hidden flex`}>
        <div className="flex items-center justify-center h-16 mb-8">
          {isSidebarOpen ? (
            <div className="text-2xl font-bold text-white">Swotify</div>
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
            {isSidebarOpen && <span className="ml-3">Home</span>}
          </NavLink>
          <NavLink
            to="profile"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors transform hover:scale-105 hover:translate-x-2 transition-transform duration-200 text-gray-300 ${
                isActive ? 'bg-blue-600/50 text-white' : 'hover:bg-white/10'
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
            {isSidebarOpen && <span className="ml-3">Student Profile</span>}
          </NavLink>
          <NavLink
            to="chatbot"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors transform hover:scale-105 hover:translate-x-2 transition-transform duration-200 text-gray-300 ${
                isActive ? 'bg-blue-600/50 text-white' : 'hover:bg-white/10'
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
            {isSidebarOpen && <span className="ml-3">AI Chatbot</span>}
          </NavLink>
          <NavLink
            to="report"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors transform hover:scale-105 hover:translate-x-2 transition-transform duration-200 text-gray-300 ${
                isActive ? 'bg-blue-600/50 text-white' : 'hover:bg-white/10'
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17h6m-3 3v-6m-3-10h6a2 2 0 012 2v6a2 2 0 01-2 2H9a2 2 0 01-2-2V7a2 2 0 012-2z"></path></svg>
            {isSidebarOpen && <span className="ml-3">Report</span>}
          </NavLink>
          <NavLink
            to="events"
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors transform hover:scale-105 hover:translate-x-2 transition-transform duration-200 text-gray-300 ${
                isActive ? 'bg-blue-600/50 text-white' : 'hover:bg-white/10'
              }`
            }
            onClick={() => setIsSidebarOpen(false)}
          >
            <svg className="w-6 h-6 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            {isSidebarOpen && <span className="ml-3">Events</span>}
          </NavLink>
        </nav>
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
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <div className="flex items-center space-x-4"> {/* Container for notification and profile */}
            {/* Notification Icon */}
            <div className="relative">
              <button
                onClick={toggleNotification}
                className="p-2 rounded-full hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform hover:scale-110 transition-transform duration-200"
              >
                {/* Bell Icon (example SVG) */}
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
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  ></path>
                </svg>
                {/* Notification Badge (example) */}
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                  1{/* You can make this dynamic */}
                </span>
              </button>
              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-md shadow-lg py-1 z-40 text-white">
                  <div className="px-4 py-2 text-sm">
                    <p className="font-semibold">Important Update!</p>
                    <p className="text-gray-200">Your Math assignment is due tomorrow.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="relative z-10">
              <img
                className="h-10 w-10 rounded-full object-cover border-2 border-white/50"
                src={userAvatar}
                alt="User Avatar"
              />
              <svg
                className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg py-1 z-40">
                <NavLink
                  to="profile"
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-600"
                >
                  Manage Profile
                </NavLink>
                <NavLink
                  to="settings" // Changed to NavLink and relative path
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-600"
                >
                  Manage Settings
                </NavLink>
                <a
                  href="#"
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-white hover:bg-blue-600"
                >
                  Logout
                </a>
              </div>
            )}
          </div>
          </div> {/* End of flex items-center space-x-4 container */}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="bg-black/20 backdrop-blur-lg rounded-2xl shadow-xl p-8 lg:p-10 text-white h-full">
            {/* The routed content will be rendered here */}
            <Routes>
              <Route path="/" element={<Navigate to="home" replace />} /> {/* Default child route changed to home */}
              <Route path="home" element={<HomePage />} /> {/* New child route for HomePage */}
              <Route path="profile" element={<StudentProfile />} /> {/* New child route for StudentProfile */}
              <Route path="chatbot" element={<AIChatbot />} />
              <Route path="report" element={<ReportPage />} /> {/* New child route for ReportPage */}
              <Route path="settings" element={<SettingsPage />} /> {/* New child route for SettingsPage */}
              <Route path="events" element={<EventsPage />} /> {/* New child route for EventsPage */}
            </Routes>
            <Outlet /> {/* This will render the matched child route component */}
          </div>
        </main>
      </div>
    </div>
  );
};


export default StudentDashboard;
// swotify/src/modules/student/pages/StudentDashboard.jsx
import React from 'react';
import { NavLink, Outlet, Routes, Route, Navigate } from 'react-router-dom'; // Import NavLink, Outlet, Routes, Route, Navigate

// Import sub-components
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import StudentMarks from '../components/StudentMarks';
import StudentAttendance from '../components/StudentAttendance';
import AIChatbot from '../components/AIChatbot';

const StudentDashboard = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-cyan-700 via-teal-600 to-cyan-500 text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/10 backdrop-blur-sm shadow-lg p-6 flex flex-col">
        <div className="text-2xl font-bold mb-8">EduAI Campus</div>
        <nav className="space-y-4">
          <NavLink
            to="performance" // Relative path
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors ${
                isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10'
              }`
            }
          >
            Performance Analysis
          </NavLink>
          <NavLink
            to="marks" // Relative path
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors ${
                isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10'
              }`
            }
          >
            Marks
          </NavLink>
          <NavLink
            to="attendance" // Relative path
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors ${
                isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10'
              }`
            }
          >
            Attendance
          </NavLink>
          <NavLink
            to="chatbot" // Relative path
            className={({ isActive }) =>
              `block py-2 px-4 rounded-lg transition-colors ${
                isActive ? 'bg-white/20 text-white' : 'hover:bg-white/10'
              }`
            }
          >
            AI Chatbot
          </NavLink>
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        {/* Header/Navbar for the dashboard */}
        <header className="w-full p-4 bg-white/10 backdrop-blur-sm shadow-md flex justify-between items-center">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          {/* Add user info/logout later */}
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-10 text-gray-800 h-full">
            {/* The routed content will be rendered here */}
            <Routes>
              <Route path="/" element={<Navigate to="performance" replace />} /> {/* Default child route */}
              <Route path="performance" element={<PerformanceAnalysis />} />
              <Route path="marks" element={<StudentMarks />} />
              <Route path="attendance" element={<StudentAttendance />} />
              <Route path="chatbot" element={<AIChatbot />} />
            </Routes>
            <Outlet /> {/* This will render the matched child route component */}
          </div>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboard;

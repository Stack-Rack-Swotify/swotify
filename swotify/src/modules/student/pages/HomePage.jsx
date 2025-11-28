import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AnalyticsGraph from '../components/AnalyticsGraph'; // Assuming AnalyticsGraph is in components

const HomePage = () => {
  // Dummy data for attendance overview
  const dummyAttendance = {
    totalClasses: 100,
    attendedClasses: 92,
    attendancePercentage: 92,
  };

  // Dummy data for subject-wise performance (reusing from PerformanceAnalysis for consistency)
  const subjects = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science'];
  const subjectPerformanceData = {
    'Mathematics': { score: 90, trend: 'up', graphData: [65, 70, 75, 80, 90] },
    'Physics': { score: 78, trend: 'flat', graphData: [70, 75, 72, 78, 78] },
    'Chemistry': { score: 85, trend: 'up', graphData: [75, 80, 82, 83, 85] },
    'Biology': { score: 92, trend: 'up', graphData: [80, 85, 88, 90, 92] },
    'Computer Science': { score: 88, trend: 'down', graphData: [90, 89, 87, 88, 88] },
  };

  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const currentSubjectPerformance = subjectPerformanceData[selectedSubject];

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">Student Home Overview</h3>

      {/* Attendance Overview */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Attendance Overview</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-100 p-3 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-blue-800">Total Classes</p>
            <p className="text-2xl font-bold text-blue-900">{dummyAttendance.totalClasses}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-green-800">Attended Classes</p>
            <p className="text-2xl font-bold text-green-900">{dummyAttendance.attendedClasses}</p>
          </div>
          <div className="bg-indigo-100 p-3 rounded-lg shadow-sm">
            <p className="text-sm font-medium text-indigo-800">Attendance Percentage</p>
            <p className="text-2xl font-bold text-indigo-900">{dummyAttendance.attendancePercentage}%</p>
          </div>
        </div>
      </div>

      {/* Performance Analysis with Subject Dropdown */}
      <div className="p-4 border border-gray-200 rounded-lg bg-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Subject Performance Analysis</h4>
        
        <div className="mb-4">
          <label htmlFor="subject-select-home" className="block text-md font-medium text-gray-700 mb-2">
            Select Subject:
          </label>
          <select
            id="subject-select-home"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 text-gray-900 rounded-md"
            value={selectedSubject}
            onChange={handleSubjectChange}
          >
            {subjects.map((subject) => (
              <option key={subject} value={subject}>
                {subject}
              </option>
            ))}
          </select>
        </div>

        {currentSubjectPerformance && (
          <div className="bg-gray-50 p-4 rounded shadow mt-4">
            <h5 className="text-lg font-bold mb-2 text-gray-800">{selectedSubject} Performance</h5>
            <p className="text-gray-700">Score: <span className="font-semibold">{currentSubjectPerformance.score}%</span></p>
            <p className="text-gray-700">Trend: <span className="font-semibold">{currentSubjectPerformance.trend}</span></p>
            <AnalyticsGraph title={`${selectedSubject} Performance Trend`} graphData={currentSubjectPerformance.graphData} />
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="mt-8 p-4 border border-gray-200 rounded-lg bg-white transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
        <h4 className="text-xl font-bold text-gray-800 mb-3">Quick Actions</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="../report" className="bg-blue-500 p-4 rounded-lg shadow-sm text-center transform hover:scale-105 hover:bg-blue-600 transition-all duration-200">
            <p className="text-lg font-bold text-white">Generate Report</p>
          </Link>
          <Link to="../events" className="bg-green-500 p-4 rounded-lg shadow-sm text-center transform hover:scale-105 hover:bg-green-600 transition-all duration-200">
            <p className="text-lg font-bold text-white">View Events</p>
          </Link>
          <Link to="../chatbot" className="bg-indigo-500 p-4 rounded-lg shadow-sm text-center transform hover:scale-105 hover:bg-indigo-600 transition-all duration-200">
            <p className="text-lg font-bold text-white">Ask AI Chatbot</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

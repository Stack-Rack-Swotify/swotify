import React, { useState } from 'react';
import AnalyticsGraph from './AnalyticsGraph'; // Import the new AnalyticsGraph component

const PerformanceAnalysis = () => {
  // Dummy data for overall performance metrics
  const dummyPerformanceData = {
    overallScore: 85,
    lastMonthImprovement: 7, // percentage
    strongestSubject: 'Mathematics',
    weakestSubject: 'Physics',
    attendanceRate: 92,
  };

  // Dummy data for subject-wise performance
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
    <div className="p-4 bg-teal-900 rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-gray-100 mb-4">Performance Analysis</h3>
      
      {/* Summary of Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="bg-sky-800/30 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-sky-200">Overall Score</p>
          <p className="text-2xl font-bold text-sky-100">{dummyPerformanceData.overallScore}%</p>
        </div>
        <div className="bg-emerald-800/30 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-emerald-200">Improvement (Last Month)</p>
          <p className="text-2xl font-bold text-emerald-100">+{dummyPerformanceData.lastMonthImprovement}%</p>
        </div>
        <div className="bg-cyan-800/30 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-cyan-200">Strongest Subject</p>
          <p className="text-2xl font-bold text-cyan-100">{dummyPerformanceData.strongestSubject}</p>
        </div>
        <div className="bg-rose-800/30 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-rose-200">Weakest Subject</p>
          <p className="text-2xl font-bold text-rose-100">{dummyPerformanceData.weakestSubject}</p>
        </div>
        <div className="bg-amber-800/30 p-3 rounded-lg shadow-sm">
          <p className="text-sm font-medium text-amber-200">Attendance Rate</p>
          <p className="text-2xl font-bold text-amber-100">{dummyPerformanceData.attendanceRate}%</p>
        </div>
      </div>

      {/* Subject-wise Performance Section */}
      <div className="mt-6 p-4 border border-teal-800 rounded-lg bg-teal-800/30">
        <h4 className="text-xl font-bold text-gray-100 mb-3">Subject-wise Performance</h4>
        
        <div className="mb-4">
          <label htmlFor="subject-select" className="block text-md font-medium text-gray-100 mb-2">
            Select Subject:
          </label>
          <select
            id="subject-select"
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-teal-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-teal-900 text-gray-100 rounded-md"
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
          <div className="bg-teal-800/50 p-4 rounded shadow mt-4">
            <h5 className="text-lg font-bold mb-2 text-gray-100">{selectedSubject} Performance</h5>
            <p className="text-gray-100">Score: <span className="font-semibold">{currentSubjectPerformance.score}%</span></p>
            <p className="text-gray-100">Trend: <span className="font-semibold">{currentSubjectPerformance.trend}</span></p>
            <AnalyticsGraph title={`${selectedSubject} Performance Trend`} graphData={currentSubjectPerformance.graphData} />
          </div>
        )}
      </div>

      <p className="text-gray-300 mt-6">
        Detailed insights into student performance will be displayed here, utilizing various data points and analytical models.
      </p>
    </div>
  );
};

export default PerformanceAnalysis;

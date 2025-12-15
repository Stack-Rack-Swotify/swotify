import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses';
import AnalyticsGraph from '../../student/components/AnalyticsGraph';

const YearWisePerformanceTrends = ({ studentId }) => {
  const [selectedTrendGrade, setSelectedTrendGrade] = useState('All Grades');

  // If studentId is provided, try to set the default grade to the student's grade
  useEffect(() => {
    if (studentId) {
      let foundStudentClass = null;
      for (const classData of mockClasses) {
        if (classData.students.find(s => s.id === studentId)) {
          foundStudentClass = classData;
          break;
        }
      }
      
      if (foundStudentClass) {
        // Ensure the grade exists in our historical data keys or available grades
        // For this mock, we'll just set it if it matches 'Grade 10' or 'Grade 11'
        // In a real app, we'd fetch historical data for this specific student or their grade
        if (['Grade 10', 'Grade 11'].includes(foundStudentClass.grade)) {
             setSelectedTrendGrade(foundStudentClass.grade);
        }
      }
    }
  }, [studentId]);

  // Mock historical data for different grades
  const historicalPerformanceData = {
    'All Grades': {
      data: [72, 75, 74, 79, 82],
      labels: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
      growth: '+3.8%',
      bestYear: '2024-25',
      bestYearScore: '82% avg',
      consistency: '9.2'
    },
    'Grade 10': {
      data: [68, 72, 75, 78, 80],
      labels: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
      growth: '+4.2%',
      bestYear: '2024-25',
      bestYearScore: '80% avg',
      consistency: '9.0'
    },
    'Grade 11': {
      data: [75, 74, 76, 77, 85],
      labels: ['2020-21', '2021-22', '2022-23', '2023-24', '2024-25'],
      growth: '+3.1%',
      bestYear: '2024-25',
      bestYearScore: '85% avg',
      consistency: '8.8'
    }
  };

  const availableGrades = ['All Grades', ...new Set(mockClasses.map(c => c.grade))].sort();
  const currentTrendData = historicalPerformanceData[selectedTrendGrade] || historicalPerformanceData['All Grades'];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 hover:shadow-lg transition-all duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-xl font-semibold text-[#0F172A] flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#F97316] to-[#E11D48] rounded-full mr-3"></span>
          Year Wise Performance Trends
        </h2>
        <div className="relative">
          <select
            value={selectedTrendGrade}
            onChange={(e) => setSelectedTrendGrade(e.target.value)}
            className="pl-4 pr-10 py-2 border border-gray-200 rounded-xl text-sm font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 bg-white appearance-none cursor-pointer hover:border-[#F97316]/30 transition-all"
          >
            {availableGrades.map(grade => (
              <option key={grade} value={grade}>{grade}</option>
            ))}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Metrics */}
        <div className="lg:col-span-1 space-y-6">
           <div className="p-5 rounded-xl bg-gradient-to-br from-[#0EA5E9]/5 to-[#0EA5E9]/10 border border-[#0EA5E9]/20">
             <p className="text-sm font-semibold text-[#64748B] mb-1">Average Growth</p>
             <div className="flex items-baseline gap-2">
               <span className="text-3xl font-bold text-[#0EA5E9]">{currentTrendData.growth}</span>
               <span className="text-xs text-[#64748B]">per year</span>
             </div>
           </div>
           <div className="p-5 rounded-xl bg-gradient-to-br from-[#22C55E]/5 to-[#22C55E]/10 border border-[#22C55E]/20">
             <p className="text-sm font-semibold text-[#64748B] mb-1">Best Performing Year</p>
             <div className="flex items-baseline gap-2">
               <span className="text-3xl font-bold text-[#22C55E]">{currentTrendData.bestYear}</span>
               <span className="text-xs text-[#64748B]">({currentTrendData.bestYearScore})</span>
             </div>
           </div>
           <div className="p-5 rounded-xl bg-gradient-to-br from-[#8B5CF6]/5 to-[#8B5CF6]/10 border border-[#8B5CF6]/20">
             <p className="text-sm font-semibold text-[#64748B] mb-1">Consistency Score</p>
             <div className="flex items-baseline gap-2">
               <span className="text-3xl font-bold text-[#8B5CF6]">{currentTrendData.consistency}</span>
               <span className="text-xs text-[#64748B]">/ 10</span>
             </div>
           </div>
        </div>

        {/* Chart */}
        <div className="lg:col-span-2">
          <AnalyticsGraph 
            title={`${selectedTrendGrade} Performance History`}
            graphData={currentTrendData.data} 
            labels={currentTrendData.labels}
          />
        </div>
      </div>
    </div>
  );
};

export default YearWisePerformanceTrends;
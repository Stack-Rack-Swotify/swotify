import React, { useState } from 'react';
import mockClasses from '../../../data/mockClasses';

const PerformanceReportPage = () => {
  const [selectedClass, setSelectedClass] = useState('all');
  const [reportType, setReportType] = useState('overview');
  const [dateRange, setDateRange] = useState('month');

  // Calculate stats from mock data
  const allStudents = mockClasses.flatMap(cls => cls.students);
  const totalStudents = allStudents.length;
  const avgAttendance = '92%';
  const avgGrade = '78.5';
  const topPerformers = 15;

  // Class performance data
  const classStats = mockClasses.map(cls => ({
    name: cls.className,
    students: cls.students.length,
    avgGrade: (Math.random() * 20 + 70).toFixed(1),
    attendance: `${Math.floor(Math.random() * 10 + 85)}%`,
    trend: Math.random() > 0.5 ? 'up' : 'down'
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ea580c] flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Performance Reports</h1>
            <p className="text-slate-500 text-sm">Track and analyze school performance</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-lg text-sm font-medium flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Export Report
        </button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500">Total Students</p>
          </div>
          <p className="text-3xl font-bold text-slate-800">{totalStudents}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500">Avg Attendance</p>
          </div>
          <p className="text-3xl font-bold text-green-600">{avgAttendance}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500">Avg Grade</p>
          </div>
          <p className="text-3xl font-bold text-purple-600">{avgGrade}</p>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
            <p className="text-xs text-slate-500">Top Performers</p>
          </div>
          <p className="text-3xl font-bold text-orange-600">{topPerformers}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-wrap gap-4">
          <div>
            <label className="block text-xs text-slate-500 mb-1">Class</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="all">All Classes</option>
              {mockClasses.map(cls => (
                <option key={cls.id} value={cls.id}>{cls.className}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="overview">Overview</option>
              <option value="academic">Academic</option>
              <option value="attendance">Attendance</option>
              <option value="behavior">Behavior</option>
            </select>
          </div>
          <div>
            <label className="block text-xs text-slate-500 mb-1">Date Range</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Class Performance Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-semibold text-slate-800">Class Performance Summary</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50">
              <tr>
                {['Class', 'Students', 'Avg Grade', 'Attendance', 'Trend', 'Actions'].map(h => (
                  <th key={h} className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {classStats.map((cls, idx) => (
                <tr key={idx} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-slate-800">{cls.name}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{cls.students}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${parseFloat(cls.avgGrade) >= 80 ? 'text-green-600' : parseFloat(cls.avgGrade) >= 70 ? 'text-blue-600' : 'text-orange-600'}`}>
                      {cls.avgGrade}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{cls.attendance}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-sm font-medium ${cls.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      <svg className={`w-4 h-4 ${cls.trend === 'down' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                      {cls.trend === 'up' ? 'Improving' : 'Declining'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Grade Distribution */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Grade Distribution</h3>
          <div className="space-y-3">
            {[
              { grade: 'A (90-100)', count: 45, color: 'bg-green-500', percent: 25 },
              { grade: 'B (80-89)', count: 68, color: 'bg-blue-500', percent: 38 },
              { grade: 'C (70-79)', count: 42, color: 'bg-yellow-500', percent: 23 },
              { grade: 'D (60-69)', count: 18, color: 'bg-orange-500', percent: 10 },
              { grade: 'F (Below 60)', count: 7, color: 'bg-red-500', percent: 4 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">{item.grade}</span>
                  <span className="font-medium text-slate-800">{item.count} students</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Attendance Trends */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Attendance Trends</h3>
          <div className="space-y-3">
            {[
              { month: 'January', rate: 95 },
              { month: 'February', rate: 92 },
              { month: 'March', rate: 88 },
              { month: 'April', rate: 91 },
              { month: 'May', rate: 94 },
              { month: 'June', rate: 89 },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <span className="w-20 text-sm text-slate-600">{item.month}</span>
                <div className="flex-1 h-6 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${item.rate >= 90 ? 'bg-green-500' : item.rate >= 85 ? 'bg-blue-500' : 'bg-orange-500'}`}
                    style={{ width: `${item.rate}%` }}
                  ></div>
                </div>
                <span className="w-12 text-sm font-medium text-slate-800">{item.rate}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Performers */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Performers This Month</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {allStudents.slice(0, 5).map((student, idx) => (
            <div key={student.id} className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="relative inline-block mb-3">
                <img src={student.photo} alt={student.name} className="w-16 h-16 rounded-full object-cover" />
                <span className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${idx === 0 ? 'bg-yellow-500' : idx === 1 ? 'bg-slate-400' : idx === 2 ? 'bg-orange-400' : 'bg-blue-500'}`}>
                  {idx + 1}
                </span>
              </div>
              <p className="text-sm font-medium text-slate-800">{student.name}</p>
              <p className="text-xs text-slate-500">Grade: A+</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PerformanceReportPage;

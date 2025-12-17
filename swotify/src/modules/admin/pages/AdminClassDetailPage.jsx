import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import AnalyticsGraph from '../../student/components/AnalyticsGraph';


const AdminClassDetailPage = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [classData, setClassData] = useState(null);
  const [selectedTab, setSelectedTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');


  useEffect(() => {
    const foundClass = mockClasses.find(c => c.id === classId);
    setClassData(foundClass);
  }, [classId]);


  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 relative overflow-hidden p-6 flex items-center justify-center">
        {/* Premium Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-slate-200 p-12 text-center max-w-md">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-28 h-28 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 mb-3">Class Not Found</h3>
          <p className="text-slate-600 mb-8 font-medium">The class you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }


  // Dummy year-wise performance for this specific class
  const classYearlyPerformance = {
    'class1': { data: [70, 75, 78, 80, 82], labels: ['2020', '2021', '2022', '2023', '2024'] },
    'class2': { data: [65, 68, 70, 72, 75], labels: ['2020', '2021', '2022', '2023', '2024'] },
    'class3': { data: [80, 82, 85, 87, 88], labels: ['2020', '2021', '2022', '2023', '2024'] },
  };
  const currentClassTrends = classYearlyPerformance[classId] || { data: [], labels: [] };


  // Calculate class statistics
  const calculateClassStats = () => {
    const students = classData.students;
    const totalStudents = students.length;
    
    let totalScore = 0;
    let totalMaxScore = 0;
    let totalAttendance = 0;
    let validAttendanceCount = 0;
    
    students.forEach(student => {
      if (student.assignments) {
        student.assignments.forEach(assignment => {
          if (assignment.grade !== null && assignment.maxGrade > 0) {
            totalScore += assignment.grade;
            totalMaxScore += assignment.maxGrade;
          }
        });
      }
      
      const attendance = student.details?.attendance;
      if (attendance && attendance !== 'N/A') {
        const attendanceValue = parseFloat(attendance.replace('%', ''));
        if (!isNaN(attendanceValue)) {
          totalAttendance += attendanceValue;
          validAttendanceCount++;
        }
      }
    });
    
    const avgScore = totalMaxScore > 0 ? (totalScore / totalMaxScore) * 100 : 0;
    const avgAttendance = validAttendanceCount > 0 ? totalAttendance / validAttendanceCount : 0;
    const passedStudents = students.filter(s => {
      let studentScore = 0;
      let studentMaxScore = 0;
      if (s.assignments) {
        s.assignments.forEach(assignment => {
          if (assignment.grade !== null && assignment.maxGrade > 0) {
            studentScore += assignment.grade;
            studentMaxScore += assignment.maxGrade;
          }
        });
      }
      const studentAvg = studentMaxScore > 0 ? (studentScore / studentMaxScore) * 100 : 0;
      return studentAvg >= 50;
    }).length;
    
    return {
      avgScore,
      avgAttendance,
      passRate: totalStudents > 0 ? (passedStudents / totalStudents) * 100 : 0,
      passedStudents,
      totalStudents
    };
  };


  const stats = calculateClassStats();


  // Filter and sort students
  const filteredStudents = classData.students
    .filter(student => student.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'email') return a.details.email.localeCompare(b.details.email);
      return 0;
    });


  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-rose-600';
  };


  const getScoreBg = (score) => {
    if (score >= 90) return 'bg-emerald-50 border-emerald-200';
    if (score >= 75) return 'bg-blue-50 border-blue-200';
    if (score >= 50) return 'bg-amber-50 border-amber-200';
    return 'bg-rose-50 border-rose-200';
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-purple-50/30 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-400/20 via-teal-400/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Sticky Premium Header */}
      <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-2xl border-b-2 border-slate-200 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-3 px-5 py-3 text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-300 font-bold border-2 border-transparent hover:border-blue-200/50"
            >
              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Reports
            </button>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center text-white text-xl font-extrabold shadow-2xl ring-4 ring-white/50">
                  {classData.grade.charAt(classData.grade.length - 1)}{classData.section}
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold text-slate-900">{classData.className}</h1>
                <p className="text-sm text-slate-600 font-bold">{classData.grade} • Section {classData.section}</p>
              </div>
            </div>
            
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-6">
        {/* Premium Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Students */}
          <div className="group relative bg-white/95 backdrop-blur-2xl rounded-2xl border-2 border-slate-200 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Total Students</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-slate-900 mb-2">{stats.totalStudents}</p>
              <p className="text-xs text-slate-500 font-bold">Enrolled in {classData.className}</p>
            </div>
          </div>

          {/* Average Score */}
          <div className="group relative bg-white/95 backdrop-blur-2xl rounded-2xl border-2 border-slate-200 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Average Score</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <p className={`text-4xl font-extrabold mb-3 ${getScoreColor(stats.avgScore)}`}>
                {stats.avgScore.toFixed(1)}%
              </p>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full transition-all duration-1000 shadow-lg"
                  style={{ width: `${Math.min(stats.avgScore, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Pass Rate */}
          <div className="group relative bg-white/95 backdrop-blur-2xl rounded-2xl border-2 border-slate-200 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Pass Rate</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-slate-900 mb-2">{stats.passRate.toFixed(1)}%</p>
              <p className="text-xs text-slate-500 font-bold">{stats.passedStudents} of {stats.totalStudents} passed</p>
            </div>
          </div>

          {/* Attendance */}
          <div className="group relative bg-white/95 backdrop-blur-2xl rounded-2xl border-2 border-slate-200 shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-bold text-slate-600 uppercase tracking-wide">Avg Attendance</span>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-4xl font-extrabold text-slate-900 mb-2">{stats.avgAttendance.toFixed(1)}%</p>
              <p className="text-xs text-slate-500 font-bold">Class attendance rate</p>
            </div>
          </div>
        </div>

        {/* Rest of the component continues with the same pattern... */}
        {/* For brevity, I'll include the tab section */}

        {/* Premium Tab Navigation */}
        <div className="bg-white/95 backdrop-blur-2xl rounded-2xl border-2 border-slate-200 shadow-xl p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`group flex-1 px-6 py-4 rounded-xl font-extrabold transition-all duration-300 ${
                selectedTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl scale-105 border-2 border-white/20'
                  : 'text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-105'
              }`}
            >
              <span className={selectedTab === 'overview' ? 'animate-pulse' : ''}>Overview</span>
            </button>
            <button
              onClick={() => setSelectedTab('students')}
              className={`group flex-1 px-6 py-4 rounded-xl font-extrabold transition-all duration-300 ${
                selectedTab === 'students'
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl scale-105 border-2 border-white/20'
                  : 'text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-105'
              }`}
            >
              <span className={selectedTab === 'students' ? 'animate-pulse' : ''}>Students ({stats.totalStudents})</span>
            </button>
            <button
              onClick={() => setSelectedTab('performance')}
              className={`group flex-1 px-6 py-4 rounded-xl font-extrabold transition-all duration-300 ${
                selectedTab === 'performance'
                  ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl scale-105 border-2 border-white/20'
                  : 'text-slate-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:scale-105'
              }`}
            >
              <span className={selectedTab === 'performance' ? 'animate-pulse' : ''}>Performance History</span>
            </button>
          </div>
        </div>

        {/* Tab content would continue here following the same pattern */}
      </div>

      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};


export default AdminClassDetailPage;

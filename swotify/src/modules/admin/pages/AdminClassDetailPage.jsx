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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20 p-6 flex items-center justify-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/60 p-12 text-center max-w-md">
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-rose-500 to-orange-500 rounded-2xl animate-pulse opacity-20"></div>
            <div className="absolute inset-2 bg-white rounded-xl flex items-center justify-center">
              <svg className="w-12 h-12 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Class Not Found</h3>
          <p className="text-slate-600 mb-6">The class you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-emerald-50/20">
      {/* Sticky Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Reports
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white text-lg font-bold shadow-lg">
                {classData.grade.charAt(classData.grade.length - 1)}{classData.section}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">{classData.className}</h1>
                <p className="text-sm text-slate-600">{classData.grade} • Section {classData.section}</p>
              </div>
            </div>
            
            <div className="w-32"></div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Students */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Total Students</span>
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.totalStudents}</p>
            <p className="text-xs text-slate-500 mt-1">Enrolled in {classData.className}</p>
          </div>

          {/* Average Score */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Average Score</span>
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className={`text-3xl font-bold ${getScoreColor(stats.avgScore)}`}>
              {stats.avgScore.toFixed(1)}%
            </p>
            <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(stats.avgScore, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Pass Rate */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Pass Rate</span>
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.passRate.toFixed(1)}%</p>
            <p className="text-xs text-slate-500 mt-1">{stats.passedStudents} of {stats.totalStudents} passed</p>
          </div>

          {/* Attendance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-6 hover:shadow-md transition-all">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-slate-600">Avg Attendance</span>
              <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center">
                <svg className="w-5 h-5 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="text-3xl font-bold text-slate-900">{stats.avgAttendance.toFixed(1)}%</p>
            <p className="text-xs text-slate-500 mt-1">Class attendance rate</p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-2">
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTab('overview')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedTab === 'overview'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setSelectedTab('students')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedTab === 'students'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Students ({stats.totalStudents})
            </button>
            <button
              onClick={() => setSelectedTab('performance')}
              className={`flex-1 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                selectedTab === 'performance'
                  ? 'bg-gradient-to-r from-blue-600 to-emerald-600 text-white shadow-lg'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              Performance History
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {selectedTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Class Information Card */}
            <div className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-6">
                <div className="text-center mb-6">
                  <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-emerald-500 p-1 rounded-2xl mx-auto mb-4 flex items-center justify-center text-white text-5xl font-bold shadow-xl">
                    {classData.grade.charAt(classData.grade.length - 1)}{classData.section}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mb-1">{classData.className}</h2>
                  <p className="text-slate-600 text-sm">{classData.grade} - Section {classData.section}</p>
                </div>

                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl">
                    <span className="text-sm text-slate-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                      Students Enrolled
                    </span>
                    <span className="font-bold text-slate-900">{stats.totalStudents}</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-xl">
                    <span className="text-sm text-slate-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      Average Score
                    </span>
                    <span className={`font-bold ${getScoreColor(stats.avgScore)}`}>
                      {stats.avgScore.toFixed(1)}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-amber-50/50 rounded-xl">
                    <span className="text-sm text-slate-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Pass Rate
                    </span>
                    <span className="font-bold text-slate-900">{stats.passRate.toFixed(1)}%</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-rose-50/50 rounded-xl">
                    <span className="text-sm text-slate-600 flex items-center gap-2">
                      <svg className="w-4 h-4 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Avg Attendance
                    </span>
                    <span className="font-bold text-slate-900">{stats.avgAttendance.toFixed(1)}%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats and Performance */}
            <div className="lg:col-span-2 space-y-6">
              {/* Performance Distribution */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
                  Performance Distribution
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="p-4 bg-emerald-50 border-2 border-emerald-200 rounded-xl text-center">
                    <p className="text-2xl font-bold text-emerald-600">
                      {classData.students.filter(s => {
                        let score = 0, maxScore = 0;
                        s.assignments?.forEach(a => {
                          if (a.grade !== null && a.maxGrade > 0) {
                            score += a.grade;
                            maxScore += a.maxGrade;
                          }
                        });
                        return maxScore > 0 && (score / maxScore) * 100 >= 90;
                      }).length}
                    </p>
                    <p className="text-xs text-emerald-700 font-medium mt-1">Excellent (90%+)</p>
                  </div>
                  <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-xl text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      {classData.students.filter(s => {
                        let score = 0, maxScore = 0;
                        s.assignments?.forEach(a => {
                          if (a.grade !== null && a.maxGrade > 0) {
                            score += a.grade;
                            maxScore += a.maxGrade;
                          }
                        });
                        const avg = maxScore > 0 ? (score / maxScore) * 100 : 0;
                        return avg >= 75 && avg < 90;
                      }).length}
                    </p>
                    <p className="text-xs text-blue-700 font-medium mt-1">Good (75-89%)</p>
                  </div>
                  <div className="p-4 bg-amber-50 border-2 border-amber-200 rounded-xl text-center">
                    <p className="text-2xl font-bold text-amber-600">
                      {classData.students.filter(s => {
                        let score = 0, maxScore = 0;
                        s.assignments?.forEach(a => {
                          if (a.grade !== null && a.maxGrade > 0) {
                            score += a.grade;
                            maxScore += a.maxGrade;
                          }
                        });
                        const avg = maxScore > 0 ? (score / maxScore) * 100 : 0;
                        return avg >= 50 && avg < 75;
                      }).length}
                    </p>
                    <p className="text-xs text-amber-700 font-medium mt-1">Average (50-74%)</p>
                  </div>
                  <div className="p-4 bg-rose-50 border-2 border-rose-200 rounded-xl text-center">
                    <p className="text-2xl font-bold text-rose-600">
                      {classData.students.filter(s => {
                        let score = 0, maxScore = 0;
                        s.assignments?.forEach(a => {
                          if (a.grade !== null && a.maxGrade > 0) {
                            score += a.grade;
                            maxScore += a.maxGrade;
                          }
                        });
                        return maxScore > 0 && (score / maxScore) * 100 < 50;
                      }).length}
                    </p>
                    <p className="text-xs text-rose-700 font-medium mt-1">Needs Support</p>
                  </div>
                </div>
              </div>

              {/* Top Performers */}
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-emerald-500 rounded-full"></div>
                  Top 3 Performers
                </h3>
                <div className="space-y-3">
                  {classData.students
                    .map(student => {
                      let score = 0, maxScore = 0;
                      student.assignments?.forEach(a => {
                        if (a.grade !== null && a.maxGrade > 0) {
                          score += a.grade;
                          maxScore += a.maxGrade;
                        }
                      });
                      return { ...student, avgScore: maxScore > 0 ? (score / maxScore) * 100 : 0 };
                    })
                    .sort((a, b) => b.avgScore - a.avgScore)
                    .slice(0, 3)
                    .map((student, index) => (
                      <div 
                        key={student.id} 
                        className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigate(`/admin-dashboard/student-profile/${student.id}`)}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                          index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-500 text-white shadow-lg' :
                          index === 1 ? 'bg-gradient-to-br from-slate-300 to-slate-400 text-white' :
                          'bg-gradient-to-br from-amber-600 to-amber-700 text-white'
                        }`}>
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                        </div>
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 p-0.5">
                          <img
                            src={student.photo}
                            alt={student.name}
                            className="w-full h-full rounded-xl object-cover bg-white"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-900">{student.name}</p>
                          <p className="text-xs text-slate-600">{student.details.email}</p>
                        </div>
                        <div className="text-right">
                          <p className={`text-2xl font-bold ${getScoreColor(student.avgScore)}`}>
                            {student.avgScore.toFixed(1)}%
                          </p>
                          <p className="text-xs text-slate-500">{student.details.attendance}</p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedTab === 'students' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900">Student Roster</h2>
              </div>

              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Search students by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                  <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all cursor-pointer"
                >
                  <option value="name">Sort by Name</option>
                  <option value="email">Sort by Email</option>
                </select>
              </div>

              <p className="text-sm text-slate-600 mt-4">
                Showing <span className="font-semibold text-slate-900">{filteredStudents.length}</span> of <span className="font-semibold text-slate-900">{stats.totalStudents}</span> students
              </p>
            </div>

            {/* Student Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-100">
                <thead className="bg-slate-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">#</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Student</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Grade</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Attendance</th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.map((student, index) => (
                    <tr key={student.id} className="hover:bg-blue-50/30 transition-colors group">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-slate-600">{index + 1}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 p-0.5">
                            <img
                              src={student.photo}
                              alt={student.name}
                              className="w-full h-full rounded-xl object-cover bg-white"
                            />
                          </div>
                          <span className="text-sm font-semibold text-slate-900">{student.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-600">{student.details.email}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-3 py-1 rounded-lg bg-slate-100 text-sm font-medium text-slate-700">
                          {student.details.grade}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-slate-600 font-medium">{student.details.attendance}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => navigate(`/admin-dashboard/student-profile/${student.id}`)}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-emerald-600 text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
                        >
                          View Profile
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-slate-900">No students found</p>
                <p className="text-sm text-slate-600 mt-1">Try adjusting your search criteria</p>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'performance' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-slate-900">{classData.className} Performance History</h2>
            </div>
            {currentClassTrends.data.length > 0 ? (
              <div className="bg-gradient-to-br from-blue-50/50 to-emerald-50/50 rounded-xl p-6">
                <AnalyticsGraph 
                  title="5-Year Performance Trend" 
                  graphData={currentClassTrends.data} 
                  labels={currentClassTrends.labels} 
                />
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <p className="text-lg font-semibold text-slate-900">No historical data available</p>
                <p className="text-sm text-slate-600 mt-1">Performance trends will appear here once data is collected</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminClassDetailPage;

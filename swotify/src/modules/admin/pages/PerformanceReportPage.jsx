import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses';

const PerformanceReportPage = () => {
  const [reportData, setReportData] = useState(null);
  const [viewMode, setViewMode] = useState('overview'); // 'overview' or 'detailed'

  useEffect(() => {
    // Process data from mockClasses
    const processReportData = () => {
      let allStudentsPerformance = [];
      let classPerformance = {};

      if (!mockClasses || mockClasses.length === 0) {
        setReportData({
          allStudentsPerformance: [],
          classPerformance: {},
          schoolTopper: null,
        });
        return;
      }

      mockClasses.forEach(classItem => {
        if (!classItem || !classItem.students || classItem.students.length === 0) {
          return; // Skip if classItem or students are invalid
        }

        let classTotalScore = 0;
        let classTotalMaxScore = 0;
        let passedStudents = 0;

        classItem.students.forEach(student => {
          let studentTotalScore = 0;
          let studentTotalMaxScore = 0;
          let studentSubjects = {};

          if (student.assignments && student.assignments.length > 0) {
            student.assignments.forEach(assignment => {
              if (assignment.grade !== null && assignment.maxGrade > 0) {
                studentTotalScore += assignment.grade;
                studentTotalMaxScore += assignment.maxGrade;
                studentSubjects[assignment.name] = `${assignment.grade}/${assignment.maxGrade}`;
              }
            });
          }

          const studentAverage = studentTotalMaxScore > 0 ? (studentTotalScore / studentTotalMaxScore) * 100 : 0;
          allStudentsPerformance.push({
            id: student.id,
            name: student.name,
            class: classItem.className,
            grade: classItem.grade,
            section: classItem.section,
            averageScore: studentAverage,
            attendance: student.details?.attendance || 'N/A', // Use optional chaining
            photo: student.photo,
            ...studentSubjects, // Spread individual assignment scores
          });

          classTotalScore += studentTotalScore;
          classTotalMaxScore += studentTotalMaxScore;
          if (studentAverage >= 50) { // Assuming 50% is passing
            passedStudents++;
          }
        });

        const classAverage = classTotalMaxScore > 0 ? (classTotalScore / classTotalMaxScore) * 100 : 0;
        const passRate = (classItem.students.length > 0) ? (passedStudents / classItem.students.length) * 100 : 0;

        classPerformance[classItem.id] = {
          name: classItem.className,
          averageScore: classAverage,
          passRate: passRate,
          totalStudents: classItem.students.length,
          passedStudents: passedStudents,
          topper: null, // Will be calculated next
        };
      });

      // Calculate Class Toppers
      mockClasses.forEach(classItem => {
        const classStudents = allStudentsPerformance.filter(s => s.class === classItem.className);
        const topper = classStudents.reduce((prev, current) => 
          (prev.averageScore > current.averageScore) ? prev : current
        , { averageScore: -1 });
        if (topper.averageScore !== -1) {
          classPerformance[classItem.id].topper = topper;
        }
      });

      // Calculate School Topper
      const schoolTopper = allStudentsPerformance.reduce((prev, current) => 
        (prev.averageScore > current.averageScore) ? prev : current
      , { averageScore: -1 });

      setReportData({
        allStudentsPerformance,
        classPerformance,
        schoolTopper: schoolTopper.averageScore !== -1 ? schoolTopper : null,
      });
    };

    processReportData();
  }, []);

  const downloadCSV = () => {
    if (!reportData) return;

    const { allStudentsPerformance, classPerformance, schoolTopper } = reportData;
    let csvContent = "data:text/csv;charset=utf-8,";

    // School Topper
    if (schoolTopper) {
      csvContent += `School Topper,,,,,\nName,${schoolTopper.name},,,,\nClass,${schoolTopper.class},,,,\nAverage Score,${schoolTopper.averageScore.toFixed(2)}%,,,,\n\n`;
    }

    // Class Performance Overview
    csvContent += `Class Performance Overview,,,,,\nClass Name,Average Score,Pass Rate,Total Students,Class Topper Name,Class Topper Score\n`;
    for (const classId in classPerformance) {
      const cp = classPerformance[classId];
      csvContent += `${cp.name},${cp.averageScore.toFixed(2)}%,${cp.passRate.toFixed(2)}%,${cp.totalStudents},${cp.topper ? cp.topper.name : 'N/A'},${cp.topper ? cp.topper.averageScore.toFixed(2) + '%' : 'N/A'}\n`;
    }
    csvContent += "\n";

    // Detailed Student Performance
    csvContent += `Detailed Student Performance,,,,,\n`;
    const allSubjects = new Set();
    allStudentsPerformance.forEach(student => {
      Object.keys(student).forEach(key => {
        if (!['id', 'name', 'class', 'grade', 'section', 'averageScore', 'attendance', 'photo'].includes(key)) {
          allSubjects.add(key);
        }
      });
    });
    const headers = ["Student Name", "Class", "Grade", "Section", "Average Score", "Attendance", ...Array.from(allSubjects)];
    csvContent += headers.join(",") + "\n";

    allStudentsPerformance.forEach(student => {
      const row = headers.map(header => {
        if (header === "Student Name") return student.name;
        if (header === "Class") return student.class;
        if (header === "Grade") return student.grade;
        if (header === "Section") return student.section;
        if (header === "Average Score") return student.averageScore.toFixed(2) + '%';
        if (header === "Attendance") return student.attendance;
        return student[header] || 'N/A';
      });
      csvContent += row.join(",") + "\n";
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `performance_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-[#ff7300]';
    if (score >= 75) return 'text-[#9000ff]';
    if (score >= 50) return 'text-[#827979]';
    return 'text-red-600';
  };

  const getScoreBadge = (score) => {
    if (score >= 90) return { bg: 'bg-[#ff7300]/10', border: 'border-[#ff7300]/20', text: 'text-[#ff7300]', label: 'Excellent' };
    if (score >= 75) return { bg: 'bg-[#9000ff]/10', border: 'border-[#9000ff]/20', text: 'text-[#9000ff]', label: 'Good' };
    if (score >= 50) return { bg: 'bg-[#827979]/10', border: 'border-[#827979]/20', text: 'text-[#827979]', label: 'Average' };
    return { bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-600', label: 'Needs Improvement' };
  };

  if (!reportData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ff7300]/10 to-[#9000ff]/10 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <svg className="w-8 h-8 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <p className="text-xl font-semibold text-gray-800">Loading report data...</p>
          <p className="text-sm text-[#827979] mt-2">Please wait while we compile the performance metrics</p>
        </div>
      </div>
    );
  }

  const { allStudentsPerformance, classPerformance, schoolTopper } = reportData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Performance Report</h1>
            <p className="text-[#827979] text-sm">Comprehensive academic performance analysis</p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setViewMode(viewMode === 'overview' ? 'detailed' : 'overview')}
              className="px-5 py-3 bg-white border border-gray-200 text-gray-700 font-semibold rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12M8 12h12m-12 5h12M4 7h.01M4 12h.01M4 17h.01" />
              </svg>
              {viewMode === 'overview' ? 'Detailed View' : 'Overview'}
            </button>
            <button
              onClick={downloadCSV}
              className="px-5 py-3 bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 hover:-translate-y-0.5"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download CSV
            </button>
          </div>
        </div>

        {/* School Topper Card */}
        {schoolTopper && (
          <div className="bg-gradient-to-br from-[#ff7300] via-[#ff7300]/90 to-[#9000ff] rounded-2xl shadow-xl p-8 mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
            <div className="relative z-10 flex items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-white p-1 shadow-lg">
                <img
                  src={schoolTopper.photo}
                  alt={schoolTopper.name}
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h2 className="text-2xl font-bold">School Topper</h2>
                </div>
                <p className="text-xl font-semibold mb-1">{schoolTopper.name}</p>
                <p className="text-white/90 text-sm mb-3">{schoolTopper.class} • {schoolTopper.grade}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-extrabold">{schoolTopper.averageScore.toFixed(1)}</span>
                  <span className="text-2xl font-semibold">%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Class Performance Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
            Class Performance Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Object.values(classPerformance).map(cp => {
              const badge = getScoreBadge(cp.averageScore);
              return (
                <div key={cp.name} className="group p-6 rounded-xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 hover:border-[#ff7300]/50 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-gray-800">{cp.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.border} ${badge.text} border`}>
                      {badge.label}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-[#827979] mb-1">Average Score</p>
                      <p className={`text-3xl font-extrabold ${getScoreColor(cp.averageScore)}`}>
                        {cp.averageScore.toFixed(1)}%
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-200">
                      <div>
                        <p className="text-xs text-[#827979]">Pass Rate</p>
                        <p className="text-sm font-bold text-gray-800">{cp.passRate.toFixed(1)}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-[#827979]">Students</p>
                        <p className="text-sm font-bold text-gray-800">{cp.passedStudents}/{cp.totalStudents}</p>
                      </div>
                    </div>

                    {cp.topper && (
                      <div className="pt-3 border-t border-gray-200">
                        <p className="text-xs text-[#827979] mb-1">Class Topper</p>
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff7300] to-[#9000ff] p-0.5">
                            <img
                              src={cp.topper.photo}
                              alt={cp.topper.name}
                              className="w-full h-full rounded-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">{cp.topper.name}</p>
                            <p className="text-xs text-[#ff7300] font-bold">{cp.topper.averageScore.toFixed(1)}%</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Student Performance Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
            {viewMode === 'overview' ? 'Top Performers' : 'Detailed Student Performance'}
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#827979] uppercase tracking-wider">Rank</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#827979] uppercase tracking-wider">Student</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#827979] uppercase tracking-wider">Class</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#827979] uppercase tracking-wider">Avg Score</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#827979] uppercase tracking-wider">Attendance</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-[#827979] uppercase tracking-wider">Performance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {allStudentsPerformance
                  .sort((a, b) => b.averageScore - a.averageScore)
                  .slice(0, viewMode === 'overview' ? 10 : undefined)
                  .map((student, index) => {
                    const badge = getScoreBadge(student.averageScore);
                    return (
                      <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white' :
                            index === 1 ? 'bg-[#9000ff]/20 text-[#9000ff]' :
                            index === 2 ? 'bg-[#ff7300]/20 text-[#ff7300]' :
                            'bg-gray-100 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#ff7300] to-[#9000ff] p-0.5">
                              <img
                                src={student.photo}
                                alt={student.name}
                                className="w-full h-full rounded-full object-cover"
                              />
                            </div>
                            <span className="text-sm font-semibold text-gray-800">{student.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{student.class}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`text-lg font-bold ${getScoreColor(student.averageScore)}`}>
                            {student.averageScore.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-700">{student.attendance}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.border} ${badge.text} border inline-block`}>
                            {badge.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReportPage;

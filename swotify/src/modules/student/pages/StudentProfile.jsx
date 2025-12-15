import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses';

const StudentProfile = () => {
  const studentId = 's1'; 
  const [student, setStudent] = useState(null);

  useEffect(() => {
    let foundStudent = null;
    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) break;
    }
    setStudent(foundStudent);
  }, [studentId]);

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 flex items-center justify-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-slate-200 dark:border-gray-700 p-12 text-center">
          <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-cyan-300 dark:border-cyan-700">
            <svg className="w-10 h-10 text-slate-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-xl text-slate-900 dark:text-gray-100 font-semibold mb-2">Profile Not Found</p>
          <p className="text-slate-600 dark:text-gray-400">Student profile not found or you are not logged in.</p>
        </div>
      </div>
    );
  }

  // Calculate average score
  const avgScore = student.exams.length > 0 
    ? Math.round(student.exams.reduce((sum, exam) => sum + (exam.score / exam.maxScore * 100), 0) / student.exams.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Premium Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur opacity-50 animate-pulse"></div>
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-600 to-blue-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-gray-100">My Profile</h1>
              <p className="text-slate-600 dark:text-gray-400 text-sm mt-1">View and manage your personal information</p>
            </div>
          </div>
        </div>

        {/* Profile Header Card */}
        <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-gray-700 p-8 mb-6 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Profile Picture */}
            <div className="relative flex-shrink-0">
              <div className="w-40 h-40 rounded-full bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 p-1 shadow-2xl">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-full h-full rounded-full object-cover bg-white"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-cyan-600 to-blue-600 text-white rounded-full p-3 shadow-xl border-4 border-white dark:border-gray-800">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">{student.name}</h2>
              <p className="text-slate-600 dark:text-gray-400 mb-6 flex items-center justify-center md:justify-start gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {student.details.email}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="group/card bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 p-5 rounded-2xl border-2 border-cyan-300 dark:border-cyan-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-cyan-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wide">Grade</span>
                  </div>
                  <p className="text-lg font-bold text-cyan-600 dark:text-cyan-400">{student.details.grade}</p>
                </div>

                <div className="group/card bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 p-5 rounded-2xl border-2 border-emerald-300 dark:border-emerald-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wide">Attendance</span>
                  </div>
                  <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">{student.details.attendance}</p>
                </div>

                <div className="group/card bg-gradient-to-br from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 p-5 rounded-2xl border-2 border-orange-300 dark:border-orange-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wide">Parents</span>
                  </div>
                  <p className="text-lg font-bold text-orange-600 dark:text-orange-400">{student.details.parents}</p>
                </div>

                <div className="group/card bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20 p-5 rounded-2xl border-2 border-purple-300 dark:border-purple-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 dark:text-gray-400 uppercase tracking-wide">Student ID</span>
                  </div>
                  <p className="text-lg font-bold text-purple-600 dark:text-purple-400">{student.id}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Exam Performance Section */}
        <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-gray-700 p-8 mb-6 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">Exam Performance</h2>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 px-5 py-3 rounded-full border-2 border-indigo-300 dark:border-indigo-700 shadow-sm">
              <svg className="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              <span className="text-sm font-bold text-indigo-600 dark:text-indigo-400">Avg: {avgScore}%</span>
            </div>
          </div>
          
          <div className="relative overflow-x-auto rounded-xl border-2 border-slate-200 dark:border-gray-700">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-gray-700 dark:to-gray-800">
                  <th className="py-4 px-6 text-left text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      Subject
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Exam Date
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-bold text-slate-700 dark:text-gray-300 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                      Score
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800">
                {student.exams.map((exam, index) => (
                  <tr 
                    key={exam.id} 
                    className={`border-b-2 border-slate-100 dark:border-gray-700 last:border-b-0 hover:bg-slate-50 dark:hover:bg-gray-700 transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-slate-50/50 dark:bg-gray-800/50'
                    }`}
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm font-semibold text-slate-900 dark:text-gray-100">{exam.subject}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-slate-600 dark:text-gray-400">{exam.date}</span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <span className={`text-sm font-bold ${
                          (exam.score / exam.maxScore * 100) >= 90 ? 'text-emerald-600 dark:text-emerald-400' :
                          (exam.score / exam.maxScore * 100) >= 75 ? 'text-cyan-600 dark:text-cyan-400' : 
                          (exam.score / exam.maxScore * 100) >= 60 ? 'text-orange-600 dark:text-orange-400' : 'text-rose-600 dark:text-rose-400'
                        }`}>
                          {exam.score}/{exam.maxScore}
                        </span>
                        <span className={`text-xs px-3 py-1.5 rounded-full font-semibold border-2 ${
                          (exam.score / exam.maxScore * 100) >= 90 ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-300 dark:border-emerald-700' :
                          (exam.score / exam.maxScore * 100) >= 75 ? 'bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 border-cyan-300 dark:border-cyan-700' : 
                          (exam.score / exam.maxScore * 100) >= 60 ? 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 border-orange-300 dark:border-orange-700' :
                          'bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-300 dark:border-rose-700'
                        }`}>
                          {Math.round(exam.score / exam.maxScore * 100)}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-gray-700 p-8 mb-6 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">Achievements</h2>
          </div>
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.achievements.map((achievement, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-5 bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-xl border-2 border-emerald-300 dark:border-emerald-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-slate-900 dark:text-gray-100 leading-relaxed font-medium">{achievement}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Future Summary Section */}
        <div className="group relative bg-white dark:bg-gray-800 rounded-3xl shadow-xl border-2 border-slate-200 dark:border-gray-700 p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-500/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
          
          <div className="relative flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-gray-100">Future Summary</h2>
          </div>
          <div className="relative bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 dark:from-amber-900/20 dark:via-orange-900/20 dark:to-yellow-900/20 p-6 rounded-2xl border-2 border-amber-300 dark:border-amber-700">
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-amber-600 to-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <p className="text-slate-900 dark:text-gray-100 leading-relaxed font-medium">{student.futureSummary}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';

const StudentDetailPage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [classInfo, setClassInfo] = useState(null);

  useEffect(() => {
    // Find student and their class information
    let foundStudent = null;
    let foundClass = null;

    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) {
        foundClass = classData;
        break;
      }
    }

    setStudent(foundStudent);
    setClassInfo(foundClass);
  }, [studentId]);

  if (!student || !classInfo) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-12 text-center max-w-md">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-full blur-xl opacity-20"></div>
            <div className="relative w-28 h-28 bg-gradient-to-br from-rose-50 to-pink-50 rounded-full flex items-center justify-center border-2 border-rose-200 shadow-lg">
              <svg className="w-14 h-14 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Student Not Found
          </h3>
          <p className="text-slate-600 mb-8 font-medium">The student you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  // Calculate average exam score
  const avgExamScore = student.exams.length > 0
    ? Math.round(student.exams.reduce((sum, exam) => sum + (exam.score / exam.maxScore * 100), 0) / student.exams.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-x-1 border border-slate-200/60 font-semibold hover:text-slate-900 hover:border-purple-300 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Header Section - Profile Overview */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 mb-6 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Photo */}
            <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-[#ea580c] rounded-full blur-2xl opacity-30"></div>
                <div className="relative w-48 h-48 rounded-full bg-[#ea580c] p-2 shadow-2xl">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full p-4 shadow-2xl">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
              </div>
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg">
                {classInfo.className}
              </span>
            </div>

            {/* Student Info */}
            <div className="flex-1">
              <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                {student.name}
              </h1>
              <p className="text-slate-600 mb-8 font-medium">Student ID: {student.id}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-orange-50 to-blue-100 p-6 rounded-xl border-2 border-blue-200 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-blue-200 rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Grade</span>
                  </div>
                  <p className="text-xl font-semibold text-slate-900">{student.details.grade}</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 p-6 rounded-xl border-2 border-emerald-200 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-emerald-200 rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Attendance</span>
                  </div>
                  <p className="text-xl font-semibold text-slate-900">{student.details.attendance}</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 p-6 rounded-xl border-2 border-amber-200 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-amber-200 rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Avg Score</span>
                  </div>
                  <p className="text-xl font-semibold text-slate-900">{avgExamScore}%</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl border-2 border-purple-200 hover:shadow-lg transition-all hover:-translate-y-1">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 bg-purple-200 rounded-lg flex items-center justify-center shadow-sm">
                      <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Total Exams</span>
                  </div>
                  <p className="text-xl font-semibold text-slate-900">{student.exams.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact & Parents */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full mr-3"></span>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-slate-50 to-orange-50/30 rounded-xl border-2 border-slate-200">
                  <div className="w-13 h-13 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    <svg className="w-6 h-6 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-600 mb-2 font-semibold uppercase tracking-wider">Email Address</p>
                    <p className="text-sm font-semibold text-slate-900 break-words">{student.details.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parents/Guardians */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                <span className="w-1.5 h-7 bg-gradient-to-b from-emerald-600 to-blue-600 rounded-full mr-3"></span>
                Parents/Guardians
              </h3>
              <div className="flex items-start gap-4 p-5 bg-gradient-to-br from-slate-50 to-emerald-50/30 rounded-xl border-2 border-slate-200">
                <div className="w-13 h-13 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{student.details.parents}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Exams & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exam Performance */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-lg font-semibold text-slate-900 flex items-center">
                  <span className="w-1.5 h-7 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full mr-3"></span>
                  Exam Performance
                </h3>
                <div className="flex items-center gap-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-5 py-2 rounded-xl shadow-lg">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm font-semibold">Average: {avgExamScore}%</span>
                </div>
              </div>

              <div className="overflow-x-auto rounded-xl border-2 border-slate-200">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-slate-50 to-blue-50/30">
                      <th className="py-4 px-5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Subject
                        </div>
                      </th>
                      <th className="py-4 px-5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Exam Date
                        </div>
                      </th>
                      <th className="py-4 px-5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                          Score
                        </div>
                      </th>
                      <th className="py-4 px-5 text-left text-xs font-semibold text-slate-700 uppercase tracking-wider">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.exams.map((exam, index) => {
                      const percentage = Math.round((exam.score / exam.maxScore) * 100);
                      return (
                        <tr
                          key={exam.id}
                          className={`border-b border-slate-100 last:border-b-0 hover:bg-gradient-to-r hover:from-orange-50 hover:to-purple-50/30 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                            }`}
                        >
                          <td className="py-4 px-5 whitespace-nowrap">
                            <span className="text-sm font-semibold text-slate-900">{exam.subject}</span>
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap">
                            <span className="text-sm text-slate-600 font-medium">{exam.date}</span>
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap">
                            <span className="text-sm font-semibold text-slate-900">{exam.score}/{exam.maxScore}</span>
                          </td>
                          <td className="py-4 px-5 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <div className="flex-1 bg-slate-200 rounded-full h-3 max-w-[120px] shadow-inner">
                                <div
                                  className={`h-3 rounded-full shadow-sm ${percentage >= 90 ? 'bg-gradient-to-r from-emerald-600 to-emerald-500' :
                                    percentage >= 75 ? 'bg-gradient-to-r from-blue-600 to-blue-500' :
                                      percentage >= 60 ? 'bg-gradient-to-r from-amber-600 to-amber-500' :
                                        'bg-gradient-to-r from-rose-600 to-rose-500'
                                    }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg shadow-sm ${percentage >= 90 ? 'bg-emerald-100 text-emerald-700 border-2 border-emerald-300' :
                                percentage >= 75 ? 'bg-blue-100 text-blue-700 border-2 border-blue-300' :
                                  percentage >= 60 ? 'bg-amber-100 text-amber-700 border-2 border-amber-300' :
                                    'bg-rose-100 text-rose-700 border-2 border-rose-300'
                                }`}>
                                {percentage}%
                              </span>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                <span className="w-1.5 h-7 bg-gradient-to-b from-emerald-600 to-blue-600 rounded-full mr-3"></span>
                Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {student.achievements.map((achievement, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-5 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-xl border-2 border-emerald-200 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  >
                    <div className="relative flex-shrink-0 mt-0.5">
                      <div className="absolute inset-0 bg-emerald-500 rounded-lg blur-sm opacity-30"></div>
                      <div className="relative w-9 h-9 bg-emerald-200 rounded-lg flex items-center justify-center shadow-md">
                        <svg className="w-5 h-5 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                    </div>
                    <p className="text-sm text-slate-900 font-medium leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Summary */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 hover:shadow-xl transition-all duration-300">
              <h3 className="text-lg font-semibold text-slate-900 mb-6 flex items-center">
                <span className="w-1.5 h-7 bg-gradient-to-b from-amber-600 to-purple-600 rounded-full mr-3"></span>
                Future Summary
              </h3>
              <div className="bg-gradient-to-br from-orange-50 via-orange-50 to-pink-50 p-6 rounded-xl border-2 border-orange-200">
                <div className="flex gap-4">
                  <div className="relative flex-shrink-0 mt-1">
                    <div className="absolute inset-0 bg-purple-500 rounded-xl blur-md opacity-30"></div>
                    <div className="relative w-11 h-11 bg-purple-200 rounded-xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-slate-900 leading-relaxed font-medium">{student.futureSummary}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;

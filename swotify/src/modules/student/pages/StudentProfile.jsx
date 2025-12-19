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
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="section-card p-12 text-center max-w-md animate-fade-in">
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-full blur-xl opacity-20 animate-pulse-glow"></div>
            <div className="relative w-24 h-24 mx-auto icon-box rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gradient mb-3">Profile Not Found</h3>
          <p className="text-slate-500 font-medium">Student profile not found or you are not logged in.</p>
        </div>
      </div>
    );
  }

  // Calculate average score
  const avgScore = student.exams.length > 0
    ? Math.round(student.exams.reduce((sum, exam) => sum + (exam.score / exam.maxScore * 100), 0) / student.exams.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-xl blur opacity-40 animate-pulse-glow"></div>
          <div className="relative w-12 h-12 icon-box rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gradient">My Profile</h1>
          <p className="text-slate-500 text-sm">View and manage your personal information</p>
        </div>
      </div>

      {/* Profile Header Card */}
      <div className="section-card overflow-hidden">
        {/* Gradient Banner */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500">
          <div className="absolute inset-0 holographic opacity-50"></div>
        </div>

        {/* Profile Info Section */}
        <div className="relative px-6 pb-6">
          {/* Profile Picture */}
          <div className="absolute -top-14 left-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-full blur-md opacity-40 animate-pulse-glow"></div>
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 p-1 shadow-xl">
                <img
                  src={student.photo}
                  alt={student.name}
                  className="w-full h-full rounded-full object-cover bg-white border-4 border-white"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 icon-box-green text-white rounded-full p-2 shadow-lg border-2 border-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Student Info */}
          <div className="pt-16 md:pt-4 md:pl-36">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">{student.name}</h2>
                <p className="text-slate-500 text-sm flex items-center gap-2 mb-3">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {student.details.email}
                </p>

                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-blue flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    {student.details.grade}
                  </span>
                  <span className="badge badge-green flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {student.details.attendance}
                  </span>
                  <span className="badge badge-orange flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {student.details.parents}
                  </span>
                  <span className="badge badge-purple flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    {student.id}
                  </span>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-3">
                <div className="stat-card text-center px-4 py-3 glow-blue">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Grade</p>
                  <p className="text-xl font-bold text-blue-600">{student.details.grade}</p>
                </div>
                <div className="stat-card text-center px-4 py-3 glow-mixed">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Avg Score</p>
                  <p className="text-xl font-bold text-purple-600">{avgScore}%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Exam Performance Section */}
      <div className="section-card p-6 hover-lift">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 icon-box rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-slate-800">Exam Performance</h2>
          </div>
          <div className="flex items-center gap-2 badge badge-purple px-4 py-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
            <span className="font-bold">Avg: {avgScore}%</span>
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
                <th className="py-4 px-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Subject
                  </div>
                </th>
                <th className="py-4 px-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Exam Date
                  </div>
                </th>
                <th className="py-4 px-6 text-left text-xs font-bold text-slate-700 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                    </svg>
                    Score
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {student.exams.map((exam, index) => (
                <tr
                  key={exam.id}
                  className={`border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                    }`}
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-sm font-semibold text-slate-800">{exam.subject}</span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <span className="text-sm text-slate-600">{exam.date}</span>
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-bold ${(exam.score / exam.maxScore * 100) >= 90 ? 'text-green-600' :
                        (exam.score / exam.maxScore * 100) >= 75 ? 'text-blue-600' :
                          (exam.score / exam.maxScore * 100) >= 60 ? 'text-orange-600' : 'text-red-600'
                        }`}>
                        {exam.score}/{exam.maxScore}
                      </span>
                      <span className={`badge ${(exam.score / exam.maxScore * 100) >= 90 ? 'badge-green' :
                        (exam.score / exam.maxScore * 100) >= 75 ? 'badge-blue' :
                          (exam.score / exam.maxScore * 100) >= 60 ? 'badge-orange' :
                            'bg-red-50 text-red-600 border border-red-200'
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
      <div className="section-card p-6 hover-lift">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 icon-box-green rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-slate-800">Achievements</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.achievements.map((achievement, index) => (
            <div
              key={index}
              className="stat-card hover-lift flex items-start gap-3"
            >
              <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-500"></div>
              <div className="w-8 h-8 icon-box-green rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-sm text-slate-700 leading-relaxed font-medium">{achievement}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Future Summary Section */}
      <div className="section-card p-6 holographic border-2 border-orange-200 hover-lift">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 icon-box-orange rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h2 className="text-xl font-bold text-gradient">AI-Powered Future Insights</h2>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-purple-100">
          <div className="flex gap-4">
            <div className="w-12 h-12 icon-box rounded-xl flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-slate-700 leading-relaxed font-medium">{student.futureSummary}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

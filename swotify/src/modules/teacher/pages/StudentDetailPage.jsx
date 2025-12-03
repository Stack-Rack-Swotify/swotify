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
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#0EA5E9]/20">
            <svg className="w-12 h-12 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-[#0F172A] mb-2">Student Not Found</h3>
          <p className="text-[#64748B] mb-6">The student you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
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

  // Calculate average exam score
  const avgExamScore = student.exams.length > 0
    ? Math.round(student.exams.reduce((sum, exam) => sum + (exam.score / exam.maxScore * 100), 0) / student.exams.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#0EA5E9] mb-6 transition-colors font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Header Section - Profile Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Profile Photo */}
            <div className="flex-shrink-0 flex flex-col items-center lg:items-start">
              <div className="relative mb-4">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-[#0EA5E9] to-[#22C55E] p-1.5">
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-[#0EA5E9] text-white rounded-full p-3 shadow-lg">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                  </svg>
                </div>
              </div>
              <span className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#22C55E]/10 text-[#0EA5E9] px-4 py-2 rounded-full text-sm font-semibold border border-[#0EA5E9]/20">
                {classInfo.className}
              </span>
            </div>

            {/* Student Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-[#0F172A] mb-2">{student.name}</h1>
              <p className="text-[#64748B] mb-6">Student ID: {student.id}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 p-4 rounded-xl border border-[#0EA5E9]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <span className="text-xs font-medium text-[#64748B] uppercase">Grade</span>
                  </div>
                  <p className="text-lg font-bold text-[#0F172A]">{student.details.grade}</p>
                </div>

                <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 p-4 rounded-xl border border-[#22C55E]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs font-medium text-[#64748B] uppercase">Attendance</span>
                  </div>
                  <p className="text-lg font-bold text-[#0F172A]">{student.details.attendance}</p>
                </div>

                <div className="bg-gradient-to-br from-[#F97316]/10 to-[#F97316]/5 p-4 rounded-xl border border-[#F97316]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    <span className="text-xs font-medium text-[#64748B] uppercase">Avg Score</span>
                  </div>
                  <p className="text-lg font-bold text-[#0F172A]">{avgExamScore}%</p>
                </div>

                <div className="bg-gradient-to-br from-[#0F172A]/10 to-[#64748B]/5 p-4 rounded-xl border border-[#0F172A]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <svg className="w-5 h-5 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className="text-xs font-medium text-[#64748B] uppercase">Total Exams</span>
                  </div>
                  <p className="text-lg font-bold text-[#0F172A]">{student.exams.length}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact & Parents */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                  <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#64748B] mb-1">Email Address</p>
                    <p className="text-sm font-semibold text-[#0F172A] truncate">{student.details.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Parents/Guardians */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#22C55E] to-[#0EA5E9] rounded-full mr-3"></span>
                Parents/Guardians
              </h3>
              <div className="flex items-start gap-3 p-3 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-[#0F172A]">{student.details.parents}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Exams & Achievements */}
          <div className="lg:col-span-2 space-y-6">
            {/* Exam Performance */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-[#0F172A] flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-3"></span>
                  Exam Performance
                </h3>
                <div className="flex items-center gap-2 bg-gradient-to-r from-[#0EA5E9]/10 to-[#22C55E]/10 px-4 py-2 rounded-full border border-[#0EA5E9]/20">
                  <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                  <span className="text-sm font-semibold text-[#0EA5E9]">Average: {avgExamScore}%</span>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="border-b-2 border-gray-100">
                      <th className="py-4 px-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                          Subject
                        </div>
                      </th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Exam Date
                        </div>
                      </th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                          </svg>
                          Score
                        </div>
                      </th>
                      <th className="py-4 px-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">Performance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.exams.map((exam, index) => {
                      const percentage = Math.round((exam.score / exam.maxScore) * 100);
                      return (
                        <tr 
                          key={exam.id} 
                          className={`border-b border-gray-100 last:border-b-0 hover:bg-gray-50 transition-all duration-200 ${
                            index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                          }`}
                        >
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="text-sm font-semibold text-[#0F172A]">{exam.subject}</span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="text-sm text-[#64748B]">{exam.date}</span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <span className="text-sm font-bold text-[#0F172A]">{exam.score}/{exam.maxScore}</span>
                          </td>
                          <td className="py-4 px-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-[100px]">
                                <div 
                                  className={`h-2 rounded-full ${
                                    percentage >= 90 ? 'bg-gradient-to-r from-[#22C55E] to-[#22C55E]/80' :
                                    percentage >= 75 ? 'bg-gradient-to-r from-[#0EA5E9] to-[#0EA5E9]/80' :
                                    percentage >= 60 ? 'bg-gradient-to-r from-[#F97316] to-[#F97316]/80' :
                                    'bg-gradient-to-r from-[#E11D48] to-[#E11D48]/80'
                                  }`}
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                percentage >= 90 ? 'bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20' :
                                percentage >= 75 ? 'bg-[#0EA5E9]/10 text-[#0EA5E9] border border-[#0EA5E9]/20' :
                                percentage >= 60 ? 'bg-[#F97316]/10 text-[#F97316] border border-[#F97316]/20' :
                                'bg-[#E11D48]/10 text-[#E11D48] border border-[#E11D48]/20'
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
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#22C55E] to-[#0EA5E9] rounded-full mr-3"></span>
                Achievements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {student.achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 p-4 bg-gradient-to-br from-[#22C55E]/5 to-[#0EA5E9]/5 rounded-xl border border-[#22C55E]/20 hover:shadow-sm transition-all duration-300"
                  >
                    <svg className="w-6 h-6 text-[#22C55E] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    <p className="text-sm text-[#0F172A] leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#F97316] to-[#0EA5E9] rounded-full mr-3"></span>
                Future Summary
              </h3>
              <div className="bg-gradient-to-br from-[#0EA5E9]/5 via-[#22C55E]/5 to-[#F97316]/5 p-6 rounded-xl border border-[#0EA5E9]/20">
                <div className="flex gap-4">
                  <svg className="w-8 h-8 text-[#0EA5E9] flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <p className="text-[#0F172A] leading-relaxed">{student.futureSummary}</p>
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


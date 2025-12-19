import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses';

const StudentMarks = ({ studentId = 's1' }) => {
  const [studentMarks, setStudentMarks] = useState([]);

  useEffect(() => {
    let foundStudent = null;
    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) break;
    }

    if (foundStudent && foundStudent.assignments) {
      // Transform assignments to match the table structure
      // Assuming assignments have 'grade' which is a score.
      // We'll calculate a letter grade based on the score.
      const marks = foundStudent.assignments.map((assignment, index) => {
        const score = assignment.grade || 0;
        let grade = 'N/A';
        if (assignment.grade !== null) {
          if (score >= 90) grade = 'A';
          else if (score >= 85) grade = 'A-';
          else if (score >= 80) grade = 'B+';
          else if (score >= 75) grade = 'B';
          else if (score >= 70) grade = 'B-';
          else if (score >= 65) grade = 'C+';
          else if (score >= 60) grade = 'C';
          else grade = 'F';
        }

        return {
          id: assignment.id || index,
          subject: assignment.name, // Using assignment name as subject for now, or could act as subject
          score: score,
          grade: grade,
          semester: 'Fall 2025' // Mock semester
        };
      });
      setStudentMarks(marks);
    } else {
      setStudentMarks([]);
    }
  }, [studentId]);

  // Function to determine score color based on educational standards
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-600 font-bold';
    if (score >= 75) return 'text-cyan-600 font-bold';
    return 'text-orange-600 font-bold';
  };

  // Function to determine grade badge style
  const getGradeBadgeStyle = (grade) => {
    if (grade.startsWith('A')) {
      return 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 border-2 border-emerald-300 shadow-sm';
    }
    if (grade.startsWith('B')) {
      return 'bg-gradient-to-r from-cyan-50 to-blue-50 text-cyan-600 border-2 border-cyan-300 shadow-sm';
    }
    return 'bg-gradient-to-r from-orange-50 to-amber-50 text-orange-600 border-2 border-orange-300 shadow-sm';
  };

  return (
    <div className="group relative bg-white/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
      {/* Premium Decorative Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

      {/* Premium Header */}
      <div className="relative mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="relative">
            <div className="absolute inset-0 bg-[#ea580c] rounded-xl blur opacity-50 animate-pulse"></div>
            <div className="relative w-12 h-12 rounded-xl bg-[#ea580c] flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-slate-900">
              Student Marks
            </h3>
            <p className="text-slate-600 text-sm mt-1 flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse"></div>
              All your academic marks and grades listed by assignment
            </p>
          </div>
        </div>
      </div>

      {studentMarks.length > 0 ? (
        <>
          {/* Premium Table */}
          <div className="relative overflow-x-auto rounded-xl border-2 border-slate-200 shadow-lg mb-6">
            <table className="min-w-full bg-white/80 backdrop-blur-sm">
              <thead>
                <tr className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b-2 border-slate-200">
                  <th className="py-4 px-6 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      Assignment
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      Score
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                      </div>
                      Grade
                    </div>
                  </th>
                  <th className="py-4 px-6 text-left text-xs font-semibold text-slate-700 uppercase tracking-wide">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-slate-600 to-gray-600 rounded-lg flex items-center justify-center shadow-lg">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      Semester
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {studentMarks.map((mark, index) => (
                  <tr
                    key={mark.id}
                    className={`group/row border-b border-slate-200 last:border-b-0 hover:bg-gradient-to-r hover:from-cyan-50/50 hover:via-blue-50/50 hover:to-purple-50/50 transition-all duration-300 ${index % 2 === 0 ? 'bg-white/50' : 'bg-slate-50/50'
                      }`}
                  >
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm font-semibold text-slate-900 group-hover/row:text-cyan-600 transition-colors">
                        {mark.subject}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <span className={`text-lg ${getScoreColor(mark.score)}`}>
                          {mark.score}
                        </span>
                        <span className="text-xs text-slate-500 font-medium">/ 100</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className={`inline-flex items-center px-4 py-2 rounded-xl text-sm font-semibold ${getGradeBadgeStyle(mark.grade)} hover:scale-110 transition-transform`}>
                        {mark.grade}
                      </span>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="text-sm text-slate-600 font-medium">{mark.semester}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Premium Summary Stats */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Highest Score */}
            <div className="group/stat relative bg-gradient-to-br from-emerald-50 to-teal-50 p-5 rounded-xl border-2 border-emerald-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover/stat:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg group-hover/stat:rotate-12 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">Highest</p>
                  <p className="text-3xl font-bold text-emerald-600">
                    {Math.max(...studentMarks.map(m => m.score))}
                  </p>
                </div>
              </div>
            </div>

            {/* Average Score */}
            <div className="group/stat relative bg-gradient-to-br from-cyan-50 to-blue-50 p-5 rounded-xl border-2 border-cyan-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 opacity-0 group-hover/stat:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg group-hover/stat:rotate-12 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">Average</p>
                  <p className="text-3xl font-bold text-cyan-600">
                    {Math.round(studentMarks.reduce((sum, m) => sum + m.score, 0) / studentMarks.length)}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Assignments */}
            <div className="group/stat relative bg-gradient-to-br from-purple-50 to-pink-50 p-5 rounded-xl border-2 border-orange-200 hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover/stat:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center shadow-lg group-hover/stat:rotate-12 transition-transform">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1">Assignments</p>
                  <p className="text-3xl font-bold text-purple-600">{studentMarks.length}</p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="relative mt-6 p-12 border-2 border-dashed border-slate-200 rounded-2xl bg-gradient-to-br from-slate-50/50 via-white/50 to-slate-50/50 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center">
            <div className="relative w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-cyan-50 to-blue-50 rounded-2xl flex items-center justify-center border-2 border-cyan-300 shadow-lg">
                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
            <p className="text-slate-900 font-bold text-lg">No marks data available yet.</p>
            <p className="text-slate-600 text-sm mt-2">Your grades will appear here once published.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMarks;
import React from 'react';

const StudentMarks = () => {
  // Dummy data for student marks
  const dummyMarks = [
    { id: 1, subject: 'Mathematics', score: 88, grade: 'B+', semester: 'Fall 2025' },
    { id: 2, subject: 'Physics', score: 72, grade: 'C', semester: 'Fall 2025' },
    { id: 3, subject: 'Chemistry', score: 91, grade: 'A-', semester: 'Fall 2025' },
    { id: 4, subject: 'Biology', score: 85, grade: 'B', semester: 'Fall 2025' },
    { id: 5, subject: 'Computer Science', score: 79, grade: 'C+', semester: 'Fall 2025' },
    { id: 6, subject: 'English Literature', score: 95, grade: 'A', semester: 'Fall 2025' },
  ];

  // Function to determine score color based on educational standards
  const getScoreColor = (score) => {
    if (score >= 90) return 'text-[#22C55E] font-bold';
    if (score >= 75) return 'text-[#0EA5E9] font-semibold';
    return 'text-[#F97316] font-medium';
  };

  // Function to determine grade badge style
  const getGradeBadgeStyle = (grade) => {
    if (grade.startsWith('A')) {
      return 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/30';
    }
    if (grade.startsWith('B')) {
      return 'bg-[#0EA5E9]/10 text-[#0EA5E9] border-[#0EA5E9]/30';
    }
    return 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/30';
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-[#0F172A] mb-2 flex items-center">
          <span className="w-1 h-7 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
          Student Marks
        </h3>
        <p className="text-[#64748B] text-sm">All your academic marks and grades listed by subject</p>
      </div>
      
      {dummyMarks.length > 0 ? (
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
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                    Score
                  </div>
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                    </svg>
                    Grade
                  </div>
                </th>
                <th className="py-4 px-4 text-left text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Semester
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {dummyMarks.map((mark, index) => (
                <tr 
                  key={mark.id} 
                  className={`border-b border-gray-100 last:border-b-0 hover:bg-gradient-to-r hover:from-gray-50 hover:to-white transition-all duration-200 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'
                  }`}
                >
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm font-semibold text-[#0F172A]">{mark.subject}</span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${getScoreColor(mark.score)}`}>
                        {mark.score}
                      </span>
                      <span className="text-xs text-[#64748B]">/ 100</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getGradeBadgeStyle(mark.grade)}`}>
                      {mark.grade}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="text-sm text-[#64748B]">{mark.semester}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 p-8 border-2 border-dashed border-gray-100 rounded-xl bg-gradient-to-br from-gray-50 to-white">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gradient-to-br from-[#0EA5E9]/10 to-[#0F172A]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-[#0F172A] font-medium">No marks data available yet.</p>
            <p className="text-[#64748B] text-sm mt-1">Your grades will appear here once published.</p>
          </div>
        </div>
      )}

      {/* Summary Stats */}
      {dummyMarks.length > 0 && (
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-[#22C55E]/10 to-[#22C55E]/5 p-4 rounded-xl border border-[#22C55E]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#22C55E]/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Highest</p>
                <p className="text-xl font-bold text-[#22C55E]">
                  {Math.max(...dummyMarks.map(m => m.score))}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0EA5E9]/10 to-[#0EA5E9]/5 p-4 rounded-xl border border-[#0EA5E9]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0EA5E9]/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Average</p>
                <p className="text-xl font-bold text-[#0EA5E9]">
                  {Math.round(dummyMarks.reduce((sum, m) => sum + m.score, 0) / dummyMarks.length)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#0F172A]/10 to-[#64748B]/5 p-4 rounded-xl border border-[#0F172A]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#0F172A]/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-medium text-[#64748B] uppercase tracking-wide">Subjects</p>
                <p className="text-xl font-bold text-[#0F172A]">{dummyMarks.length}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMarks;

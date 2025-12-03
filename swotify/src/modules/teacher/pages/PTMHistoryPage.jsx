import React, { useState } from 'react';
import mockPTMHistory from '../../../data/mockPTMHistory';
import { Link } from 'react-router-dom';

const PTMHistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeacher, setFilterTeacher] = useState('All');

  // Extract unique teachers for filter
  const teachers = ['All', ...new Set(mockPTMHistory.map(ptm => ptm.teacher))];

  // Filter PTM history
  const filteredPTMHistory = mockPTMHistory.filter(ptm => {
    const matchesSearch = ptm.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeacher = filterTeacher === 'All' || ptm.teacher === filterTeacher;
    return matchesSearch && matchesTeacher;
  });

  // Get score color based on grade
  const getScoreColor = (score) => {
    const numScore = parseInt(score);
    if (numScore >= 90) return 'text-[#22C55E]';
    if (numScore >= 75) return 'text-[#0EA5E9]';
    if (numScore >= 60) return 'text-[#F97316]';
    return 'text-[#E11D48]';
  };

  // Get grade badge style
  const getGradeBadgeStyle = (grade) => {
    if (grade.startsWith('A')) return 'bg-gradient-to-r from-[#22C55E]/10 to-[#22C55E]/5 text-[#22C55E] border-[#22C55E]/20';
    if (grade.startsWith('B')) return 'bg-gradient-to-r from-[#0EA5E9]/10 to-[#0EA5E9]/5 text-[#0EA5E9] border-[#0EA5E9]/20';
    if (grade.startsWith('C')) return 'bg-gradient-to-r from-[#F97316]/10 to-[#F97316]/5 text-[#F97316] border-[#F97316]/20';
    return 'bg-gradient-to-r from-[#64748B]/10 to-[#64748B]/5 text-[#64748B] border-[#64748B]/20';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">PTM History</h1>
          <p className="text-[#64748B] text-sm">Review past Parent-Teacher Meeting logs and student performance discussions</p>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
          <h2 className="text-lg font-semibold text-[#0F172A] mb-4 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
            Search & Filter
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search Bar */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-[#64748B] mb-2">
                Search Student
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Search by student name..."
                  className="w-full px-4 py-3 pl-10 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] transition-all duration-200 hover:border-[#0EA5E9]/50 text-[#0F172A] bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg className="absolute left-3 top-3.5 w-5 h-5 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>

            {/* Teacher Filter */}
            <div>
              <label htmlFor="teacher-filter" className="block text-sm font-medium text-[#64748B] mb-2">
                Filter by Teacher
              </label>
              <div className="relative">
                <select
                  id="teacher-filter"
                  value={filterTeacher}
                  onChange={(e) => setFilterTeacher(e.target.value)}
                  className="w-full px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#22C55E]/50 appearance-none cursor-pointer"
                >
                  {teachers.map(teacher => (
                    <option key={teacher} value={teacher}>{teacher}</option>
                  ))}
                </select>
                <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-6 flex items-center justify-between hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#0F172A]">Meeting Records</h3>
              <p className="text-xs text-[#64748B]">Total PTM sessions logged</p>
            </div>
          </div>
          <span className="bg-gradient-to-r from-[#0EA5E9]/10 to-[#22C55E]/10 text-[#0EA5E9] px-4 py-2 rounded-full text-sm font-semibold border border-[#0EA5E9]/20">
            {filteredPTMHistory.length} {filteredPTMHistory.length === 1 ? 'Record' : 'Records'}
          </span>
        </div>

        {/* PTM Logs */}
        <div className="space-y-6">
          {filteredPTMHistory.length > 0 ? (
            filteredPTMHistory.map((ptm) => (
              <div key={ptm.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300">
                {/* Header Section */}
                <div className="bg-gradient-to-r from-[#0EA5E9]/5 to-[#22C55E]/5 p-6 border-b border-gray-100">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#0EA5E9] to-[#22C55E] rounded-full flex items-center justify-center text-white font-bold text-lg">
                          {ptm.studentName.charAt(0)}
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-[#0F172A]">{ptm.studentName}</h2>
                          <div className="flex items-center gap-3 text-sm text-[#64748B]">
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {ptm.date}
                            </span>
                            <span className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                              </svg>
                              {ptm.teacher}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <Link 
                      to={`/teacher-dashboard/student-profile/${ptm.studentId}`}
                      className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl text-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      View Profile
                    </Link>
                  </div>
                </div>

                {/* Content Grid */}
                <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column */}
                  <div className="space-y-6">
                    {/* Discussion Points */}
                    <div>
                      <h3 className="text-base font-semibold text-[#0F172A] mb-3 flex items-center">
                        <span className="w-1 h-5 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-2"></span>
                        Discussion Points
                      </h3>
                      <div className="space-y-2">
                        {ptm.discussionPoints.map((point, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="w-6 h-6 bg-[#0EA5E9]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3 h-3 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                            <p className="text-sm text-[#0F172A]">{point}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Action Items */}
                    {ptm.actionItems && ptm.actionItems.length > 0 && (
                      <div>
                        <h3 className="text-base font-semibold text-[#0F172A] mb-3 flex items-center">
                          <span className="w-1 h-5 bg-gradient-to-b from-[#22C55E] to-[#0EA5E9] rounded-full mr-2"></span>
                          Action Items
                        </h3>
                        <div className="space-y-2">
                          {ptm.actionItems.map((item, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-gradient-to-br from-[#22C55E]/5 to-[#0EA5E9]/5 rounded-lg border border-[#22C55E]/20">
                              <div className="w-6 h-6 bg-[#22C55E]/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-3 h-3 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                              <p className="text-sm text-[#0F172A] font-medium">{item}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right Column - Performance Summary */}
                  <div>
                    <h3 className="text-base font-semibold text-[#0F172A] mb-3 flex items-center">
                      <span className="w-1 h-5 bg-gradient-to-b from-[#F97316] to-[#0EA5E9] rounded-full mr-2"></span>
                      Performance Summary
                    </h3>
                    
                    <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 space-y-4">
                      {/* Overall Grade Badge */}
                      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                        <span className="text-sm font-medium text-[#64748B]">Overall Grade</span>
                        <span className={`px-4 py-2 rounded-full text-lg font-bold border ${getGradeBadgeStyle(ptm.performanceSummary.overallGrade)}`}>
                          {ptm.performanceSummary.overallGrade}
                        </span>
                      </div>

                      {/* Subject Scores */}
                      <div className="space-y-3">
                        {ptm.performanceSummary.mathScore && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-[#0F172A]">Mathematics</span>
                            </div>
                            <span className={`text-base font-bold ${getScoreColor(ptm.performanceSummary.mathScore)}`}>
                              {ptm.performanceSummary.mathScore}
                            </span>
                          </div>
                        )}

                        {ptm.performanceSummary.scienceScore && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#22C55E]/10 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-[#0F172A]">Science</span>
                            </div>
                            <span className={`text-base font-bold ${getScoreColor(ptm.performanceSummary.scienceScore)}`}>
                              {ptm.performanceSummary.scienceScore}
                            </span>
                          </div>
                        )}

                        {ptm.performanceSummary.historyScore && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#F97316]/10 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-[#0F172A]">History</span>
                            </div>
                            <span className={`text-base font-bold ${getScoreColor(ptm.performanceSummary.historyScore)}`}>
                              {ptm.performanceSummary.historyScore}
                            </span>
                          </div>
                        )}

                        {ptm.performanceSummary.artScore && (
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center">
                                <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                                </svg>
                              </div>
                              <span className="text-sm font-medium text-[#0F172A]">Art</span>
                            </div>
                            <span className={`text-base font-bold ${getScoreColor(ptm.performanceSummary.artScore)}`}>
                              {ptm.performanceSummary.artScore}
                            </span>
                          </div>
                        )}

                        {/* Attendance */}
                        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#22C55E]/10 rounded-lg flex items-center justify-center">
                              <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </div>
                            <span className="text-sm font-medium text-[#0F172A]">Attendance</span>
                          </div>
                          <span className="text-base font-bold text-[#22C55E]">{ptm.performanceSummary.attendance}</span>
                        </div>
                      </div>

                      {/* Teacher Comment */}
                      <div className="pt-4 border-t border-gray-100">
                        <p className="text-xs font-semibold text-[#64748B] mb-2 uppercase tracking-wide flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                          </svg>
                          Teacher's Comment
                        </p>
                        <p className="text-sm text-[#0F172A] leading-relaxed italic">
                          "{ptm.performanceSummary.teacherComment}"
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            // Empty State
            <div className="text-center py-16 bg-white rounded-2xl shadow-sm border border-gray-100">
              <div className="w-24 h-24 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#0EA5E9]/20">
                <svg className="w-12 h-12 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#0F172A] mb-2">No PTM Records Found</h3>
              <p className="text-[#64748B] max-w-md mx-auto">
                No Parent-Teacher Meeting records match your search criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PTMHistoryPage;

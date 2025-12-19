import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';

const TeacherReportPage = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    // Get all students from all classes
    const allStudents = mockClasses.flatMap(cls =>
        cls.students.map(student => ({
            ...student,
            className: cls.className
        }))
    );

    // Filter students based on search
    const filteredStudents = allStudents.filter(s =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate average score for a student
    const getAvgScore = (student) => {
        if (!student.exams || student.exams.length === 0) return 0;
        return Math.round(student.exams.reduce((sum, exam) => sum + (exam.score / exam.maxScore * 100), 0) / student.exams.length);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 icon-box rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-gradient">Student Reports</h1>
                    <p className="text-slate-500 text-sm">Select a student to view their comprehensive academic report</p>
                </div>
            </div>

            {/* Student Selection Card */}
            <div className="section-card p-6">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 icon-box-orange rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-slate-800">Select a Student</h4>
                        <p className="text-sm text-slate-500">Click on a student card to view their detailed report</p>
                    </div>
                </div>

                {/* Search */}
                <div className="relative mb-6">
                    <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                </div>

                {/* Student Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredStudents.map(student => (
                        <button
                            key={student.id}
                            onClick={() => navigate(`/teacher-dashboard/student-report/${student.id}`)}
                            className="group flex flex-col p-5 rounded-xl border border-slate-200 bg-white hover:border-purple-400 hover:shadow-xl transition-all duration-300 text-left hover-lift"
                        >
                            {/* Student Header */}
                            <div className="flex items-center gap-4 mb-4">
                                <div className="relative flex-shrink-0">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-full blur opacity-0 group-hover:opacity-40 transition-opacity"></div>
                                    <div className="relative w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500 p-0.5">
                                        <img
                                            src={student.photo}
                                            alt={student.name}
                                            className="w-full h-full rounded-full object-cover bg-white"
                                        />
                                    </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold text-slate-800 truncate group-hover:text-gradient transition-all">{student.name}</p>
                                    <p className="text-xs text-slate-500">{student.className}</p>
                                    <p className="text-xs text-slate-400">{student.id}</p>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-slate-100">
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 font-medium mb-1">Attendance</p>
                                    <p className="text-sm font-bold text-[#ea580c]">{student.details?.attendance || 'N/A'}</p>
                                </div>
                                <div className="text-center border-x border-slate-100">
                                    <p className="text-xs text-slate-500 font-medium mb-1">Avg Score</p>
                                    <p className="text-sm font-bold text-purple-600">{getAvgScore(student)}%</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 font-medium mb-1">GPA</p>
                                    <p className="text-sm font-bold text-orange-600">{student.details?.gpa || 'N/A'}</p>
                                </div>
                            </div>

                            {/* View Report Indicator */}
                            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[#ea580c] group-hover:text-purple-600 transition-colors">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                <span className="text-xs font-semibold">View Report</span>
                                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </button>
                    ))}
                </div>

                {filteredStudents.length === 0 && (
                    <div className="text-center py-12">
                        <div className="relative inline-block mb-6">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-full blur-xl opacity-20 animate-pulse-glow"></div>
                            <div className="relative w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                            </div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">No Students Found</h3>
                        <p className="text-slate-500 font-medium">Try adjusting your search query</p>
                    </div>
                )}
            </div>

            {/* Info Card */}
            <div className="section-card p-6 holographic border-2 border-purple-200">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 icon-box rounded-xl flex items-center justify-center flex-shrink-0">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gradient mb-2">About Student Reports</h4>
                        <p className="text-slate-600 text-sm leading-relaxed mb-4">
                            Click on any student card to view their comprehensive academic report. Each report includes:
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                            <div className="flex items-center gap-2 text-sm">
                                <span className="badge badge-blue">📊</span>
                                <span className="text-slate-700 font-medium">Performance Overview</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="badge badge-green">✅</span>
                                <span className="text-slate-700 font-medium">Attendance Records</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="badge badge-purple">⭐</span>
                                <span className="text-slate-700 font-medium">Academic Marks</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <span className="badge badge-orange">📈</span>
                                <span className="text-slate-700 font-medium">Yearly Trends</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherReportPage;

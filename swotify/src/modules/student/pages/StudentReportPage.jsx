import React, { useRef, useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import mockClasses from '../../../data/mockClasses';
import StudentAttendance from '../components/StudentAttendance';
import StudentMarks from '../components/StudentMarks';
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import YearWisePerformanceTrends from '../../admin/components/YearWisePerformanceTrends';

const StudentReportPage = ({ studentId = 's1' }) => {
    const reportRef = useRef();
    const [student, setStudent] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [activeTab, setActiveTab] = useState('overview');

    useEffect(() => {
        let foundStudent = null;
        for (const classData of mockClasses) {
            foundStudent = classData.students.find(s => s.id === studentId);
            if (foundStudent) break;
        }
        setStudent(foundStudent);
    }, [studentId]);

    const handleDownloadReport = () => {
        setIsDownloading(true);
        if (reportRef.current) {
            html2canvas(reportRef.current, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
            }).then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const imgWidth = 210;
                const pageHeight = 297;
                const imgHeight = (canvas.height * imgWidth) / canvas.width;
                let heightLeft = imgHeight;
                let position = 0;

                pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                heightLeft -= pageHeight;

                while (heightLeft >= 0) {
                    position = heightLeft - imgHeight;
                    pdf.addPage();
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;
                }

                pdf.save(`${student?.name || 'student'}-report.pdf`);
                setIsDownloading(false);
            }).catch(err => {
                console.error("Error generating PDF:", err);
                alert("Failed to generate report. Please try again.");
                setIsDownloading(false);
            });
        } else {
            alert("Report content not found for download.");
            setIsDownloading(false);
        }
    };

    // Calculate stats
    const avgScore = student?.exams?.length > 0
        ? Math.round(student.exams.reduce((sum, exam) => sum + (exam.score / exam.maxScore * 100), 0) / student.exams.length)
        : 0;

    const tabs = [
        { id: 'overview', label: 'Overview', icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' },
        { id: 'attendance', label: 'Attendance', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4' },
        { id: 'marks', label: 'Academic Marks', icon: 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z' },
        { id: 'analysis', label: 'Performance Analysis', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
        { id: 'trends', label: 'Yearly Trends', icon: 'M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z' },
    ];

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
                    <h3 className="text-2xl font-bold text-gradient mb-3">Loading Report...</h3>
                    <p className="text-slate-500 font-medium">Please wait while we fetch your academic data.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Premium Profile Header Card */}
            <div className="section-card overflow-hidden">
                {/* Slate Banner */}
                <div className="relative h-32 bg-[#334155]">
                    <div className="absolute inset-0 opacity-50"></div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex gap-3">
                        <button
                            onClick={handleDownloadReport}
                            disabled={isDownloading}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white/95 backdrop-blur-sm text-slate-800 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isDownloading ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-slate-600 border-t-transparent rounded-full animate-spin"></div>
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download PDF
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Profile Info Section */}
                <div className="relative px-6 pb-6">
                    {/* Profile Picture - Overlapping Banner */}
                    <div className="absolute -top-14 left-6">
                        <div className="relative">
                            <div className="absolute inset-0 bg-[#ea580c] rounded-full blur-md opacity-40 animate-pulse-glow"></div>
                            <div className="relative w-28 h-28 rounded-full bg-[#ea580c] p-1 shadow-xl">
                                <img
                                    src={student.photo}
                                    alt={student.name}
                                    className="w-full h-full rounded-full object-cover bg-white border-4 border-white"
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-[#1e293b] text-white rounded-full p-2 shadow-lg border-2 border-white">
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
                                <h1 className="text-2xl font-bold text-slate-800 mb-2">{student.name}</h1>
                                <div className="flex flex-wrap items-center gap-2">
                                    <span className="badge badge-blue flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                        </svg>
                                        {student.id}
                                    </span>
                                    <span className="badge badge-purple flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                        {student.details?.grade || 'N/A'}
                                    </span>
                                    <span className="badge badge-orange flex items-center gap-1.5">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                </div>
                            </div>

                            {/* Quick Stats */}
                            <div className="flex gap-3">
                                <div className="stat-card text-center px-4 py-3 glow-blue">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Attendance</p>
                                    <p className="text-xl font-bold text-blue-600">{student.details?.attendance || 'N/A'}</p>
                                </div>
                                <div className="stat-card text-center px-4 py-3 glow-mixed">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Avg Score</p>
                                    <p className="text-xl font-bold text-purple-600">{avgScore}%</p>
                                </div>
                                <div className="stat-card text-center px-4 py-3 glow-orange">
                                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">GPA</p>
                                    <p className="text-xl font-bold text-orange-600">{student.details?.gpa || 'N/A'}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="section-card p-2">
                <div className="flex flex-wrap gap-2">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${activeTab === tab.id
                                ? 'nav-active'
                                : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
                                }`}
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d={tab.icon} />
                            </svg>
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Report Content */}
            <div ref={reportRef} className="space-y-6">
                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
                        {/* Report Header */}
                        <div className="section-card p-6 animate-slide-in-up">
                            <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 icon-box rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-bold text-slate-800">Academic Performance Report</h2>
                                        <p className="text-sm text-slate-500">Comprehensive analysis for {student.name}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs text-slate-400 font-medium">Generated on</p>
                                    <p className="text-sm font-semibold text-slate-600">{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                            </div>

                            {/* Student Details Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                <div className="stat-card hover-lift">
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400 to-purple-500"></div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 icon-box rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase">Email</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-800 truncate">{student.details?.email || 'N/A'}</p>
                                </div>

                                <div className="stat-card hover-lift">
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-500"></div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 icon-box-green rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase">Phone</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-800">{student.details?.phone || 'N/A'}</p>
                                </div>

                                <div className="stat-card hover-lift">
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 to-amber-500"></div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 icon-box-orange rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase">Parents</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-800">{student.details?.parents || 'N/A'}</p>
                                </div>

                                <div className="stat-card hover-lift">
                                    <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-400 to-pink-500"></div>
                                    <div className="flex items-center gap-3 mb-2">
                                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                        </div>
                                        <span className="text-xs font-semibold text-slate-500 uppercase">Address</span>
                                    </div>
                                    <p className="text-sm font-semibold text-slate-800 truncate">{student.details?.address || 'N/A'}</p>
                                </div>
                            </div>
                        </div>

                        {/* Quick Summary Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="glass-card p-6 hover-lift">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 icon-box-green rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <span className="badge badge-green">Excellent</span>
                                </div>
                                <p className="text-sm text-slate-600 font-semibold mb-2">Attendance Rate</p>
                                <p className="text-3xl font-bold text-gradient">{student.details?.attendance || 'N/A'}</p>
                            </div>

                            <div className="glass-card p-6 hover-lift">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 icon-box rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <span className="badge badge-blue">{student.exams?.length || 0} Exams</span>
                                </div>
                                <p className="text-sm text-slate-600 font-semibold mb-2">Average Score</p>
                                <p className="text-3xl font-bold text-gradient">{avgScore}%</p>
                            </div>

                            <div className="glass-card p-6 hover-lift">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="w-12 h-12 icon-box-orange rounded-xl flex items-center justify-center">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </div>
                                    <span className="badge badge-orange">Outstanding</span>
                                </div>
                                <p className="text-sm text-slate-600 font-semibold mb-2">GPA Score</p>
                                <p className="text-3xl font-bold text-gradient">{student.details?.gpa || 'N/A'}</p>
                            </div>
                        </div>

                        {/* Achievements Section */}
                        {student.achievements && student.achievements.length > 0 && (
                            <div className="section-card p-6 animate-slide-in-up">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 icon-box-orange rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">Achievements & Recognitions</h3>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {student.achievements.map((achievement, index) => (
                                        <div key={index} className="stat-card hover-lift flex items-start gap-3">
                                            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 to-amber-500"></div>
                                            <div className="w-8 h-8 icon-box-orange rounded-lg flex items-center justify-center flex-shrink-0">
                                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                            <p className="text-sm text-slate-700 font-medium leading-relaxed">{achievement}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Future Summary */}
                        {student.futureSummary && (
                            <div className="section-card p-6 holographic border-2 border-purple-200 animate-slide-in-up">
                                <div className="flex items-center gap-3 mb-5">
                                    <div className="w-10 h-10 icon-box rounded-xl flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-bold text-gradient">AI-Powered Future Insights</h3>
                                </div>
                                <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-purple-100">
                                    <p className="text-slate-700 leading-relaxed font-medium">{student.futureSummary}</p>
                                </div>
                            </div>
                        )}
                    </>
                )}

                {/* Attendance Tab */}
                {activeTab === 'attendance' && (
                    <div className="section-card p-6 animate-slide-in-up">
                        <StudentAttendance studentId={studentId} />
                    </div>
                )}

                {/* Marks Tab */}
                {activeTab === 'marks' && (
                    <div className="section-card p-6 animate-slide-in-up">
                        <StudentMarks studentId={studentId} />
                    </div>
                )}

                {/* Analysis Tab */}
                {activeTab === 'analysis' && (
                    <div className="section-card p-6 animate-slide-in-up">
                        <PerformanceAnalysis studentId={studentId} />
                    </div>
                )}

                {/* Trends Tab */}
                {activeTab === 'trends' && (
                    <div className="section-card p-6 animate-slide-in-up">
                        <YearWisePerformanceTrends studentId={studentId} />
                    </div>
                )}
            </div>

            {/* Report Footer */}
            <div className="section-card p-6">
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                    <div className="w-10 h-10 icon-box rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <h4 className="text-lg font-bold text-slate-800">Report Information</h4>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    This comprehensive report includes attendance records, academic marks, and performance analysis across all subjects.
                    Click the "Download PDF" button to save a copy for your records.
                </p>

                <div className="flex flex-wrap gap-2">
                    <span className="badge badge-blue flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        PDF Format
                    </span>
                    <span className="badge badge-purple flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        High Quality
                    </span>
                    <span className="badge badge-orange flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Real-time Data
                    </span>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <p>© 2025 Swotify School Management System. All rights reserved.</p>
                    <p>Report ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentReportPage;

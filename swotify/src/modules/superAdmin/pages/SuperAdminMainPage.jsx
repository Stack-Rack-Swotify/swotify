import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const SuperAdminMainPage = () => {
    const navigate = useNavigate();

    // --- Mock Data ---
    const schoolsData = [
        { id: 1, name: 'Greenwood High', students: 1200, teachers: 80, performance: 85, status: 'Active' },
        { id: 2, name: 'Sunnydale Academy', students: 850, teachers: 60, performance: 78, status: 'Active' },
        { id: 3, name: 'Oakridge International', students: 1500, teachers: 110, performance: 92, status: 'Active' },
        { id: 4, name: 'Riverside Public School', students: 950, teachers: 65, performance: 72, status: 'Inactive' },
    ];

    const complaintsData = [
        { id: 1, school: 'Greenwood High', subject: 'Login Issues', priority: 'High', status: 'Open', date: '2025-03-01' },
        { id: 2, school: 'Sunnydale Academy', subject: 'Report Bug', priority: 'Medium', status: 'In Progress', date: '2025-03-02' },
    ];

    const feedbackData = [
        { id: 1, school: 'Greenwood High', rating: 4, comment: 'Great update!', date: 'Mar 3' },
        { id: 2, school: 'Sunnydale Academy', rating: 3, comment: 'UI needs work.', date: 'Mar 1' },
        { id: 3, school: 'Riverside Public', rating: 5, comment: 'Excellent support.', date: 'Feb 25' },
    ];

    // --- Calculations ---
    const totalSchools = schoolsData.length;
    const activeSchools = schoolsData.filter(s => s.status === 'Active').length;
    const totalStudents = schoolsData.reduce((acc, curr) => acc + curr.students, 0);
    const totalTeachers = schoolsData.reduce((acc, curr) => acc + curr.teachers, 0);
    const avgPerformance = Math.round(schoolsData.reduce((acc, curr) => acc + curr.performance, 0) / totalSchools);
    const openComplaints = complaintsData.filter(c => c.status === 'Open').length;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#ea580c] flex items-center justify-center shadow-md">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">Super Admin Dashboard</h1>
                        <p className="text-slate-500 text-sm">Manage all schools and system settings.</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => navigate('management')}
                        className="px-4 py-2 bg-slate-100 text-slate-700 text-sm font-medium rounded-lg hover:bg-slate-200 transition-colors"
                    >
                        Manage Schools
                    </button>
                    <button
                        onClick={() => navigate('reports-feedback')}
                        className="px-4 py-2 bg-[#ea580c] text-white text-sm font-medium rounded-lg hover:bg-[#c2410c] transition-colors"
                    >
                        View Reports
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{activeSchools} Active</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{totalSchools}</p>
                    <p className="text-sm text-slate-500">Total Schools</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-[#ea580c] bg-orange-50 px-2 py-1 rounded-full">+150</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{totalStudents.toLocaleString()}</p>
                    <p className="text-sm text-slate-500">Total Students</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-1 rounded-full">All Branches</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{totalTeachers}</p>
                    <p className="text-sm text-slate-500">Total Staff</p>
                </div>

                <div className="bg-white rounded-xl border border-slate-200 p-5">
                    <div className="flex items-center justify-between mb-3">
                        <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                            <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">↑ 2%</span>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{avgPerformance}%</p>
                    <p className="text-sm text-slate-500">Avg Performance</p>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-6">
                <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                    <NavLink to="management" className="p-4 bg-blue-50 border border-blue-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
                        <div className="w-10 h-10 mx-auto mb-2 bg-blue-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-blue-700">Schools</p>
                    </NavLink>
                    <NavLink to="add-school" className="p-4 bg-green-50 border border-green-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
                        <div className="w-10 h-10 mx-auto mb-2 bg-green-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-green-700">Add School</p>
                    </NavLink>
                    <NavLink to="reports-feedback" className="p-4 bg-purple-50 border border-orange-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
                        <div className="w-10 h-10 mx-auto mb-2 bg-purple-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-purple-700">Reports</p>
                    </NavLink>
                    <NavLink to="files" className="p-4 bg-orange-50 border border-orange-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
                        <div className="w-10 h-10 mx-auto mb-2 bg-orange-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-orange-700">Files</p>
                    </NavLink>
                    <NavLink to="ai-chatbot" className="p-4 bg-cyan-50 border border-cyan-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
                        <div className="w-10 h-10 mx-auto mb-2 bg-cyan-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-cyan-700">AI Chat</p>
                    </NavLink>
                    <NavLink to="settings" className="p-4 bg-pink-50 border border-pink-200 rounded-xl text-center hover:shadow-md transition-all hover:scale-105">
                        <div className="w-10 h-10 mx-auto mb-2 bg-pink-500 rounded-lg flex items-center justify-center">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-pink-700">Settings</p>
                    </NavLink>
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Top Performing Schools */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-800">Top Performing Schools</h2>
                        <NavLink to="management" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</NavLink>
                    </div>
                    <div className="space-y-3">
                        {schoolsData.sort((a, b) => b.performance - a.performance).slice(0, 4).map((school, index) => (
                            <div key={school.id} className="flex items-center gap-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-sm ${index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                    index === 1 ? 'bg-slate-200 text-slate-700' :
                                        index === 2 ? 'bg-orange-100 text-orange-700' :
                                            'bg-blue-100 text-blue-700'
                                    }`}>
                                    #{index + 1}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-semibold text-slate-800">{school.name}</p>
                                    <p className="text-xs text-slate-500">{school.students.toLocaleString()} Students • {school.teachers} Staff</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-green-600">{school.performance}%</p>
                                    <p className="text-xs text-slate-500">Avg Score</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* System Status */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-800">System Status</h2>
                        <span className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            All Systems Operational
                        </span>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">Server Status</p>
                                    <p className="text-xs text-slate-500">Response time: 45ms</p>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-green-600">Online</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">Database</p>
                                    <p className="text-xs text-slate-500">Storage: 45% used</p>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-blue-600">Healthy</span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-800">Security</p>
                                    <p className="text-xs text-slate-500">Last scan: 2h ago</p>
                                </div>
                            </div>
                            <span className="text-sm font-bold text-purple-600">Secure</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Required & Feedback Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Action Required */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-800">Action Required</h2>
                        {openComplaints > 0 && (
                            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs font-medium">
                                {openComplaints} Open
                            </span>
                        )}
                    </div>
                    {complaintsData.filter(c => c.status !== 'Resolved').length > 0 ? (
                        <div className="space-y-3">
                            {complaintsData.filter(c => c.status !== 'Resolved').map(complaint => (
                                <div key={complaint.id} className="flex items-center gap-4 p-4 bg-red-50 border border-red-100 rounded-lg">
                                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${complaint.priority === 'High' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'
                                                }`}>
                                                {complaint.priority} Priority
                                            </span>
                                            <span className="text-xs text-slate-500">{complaint.date}</span>
                                        </div>
                                        <p className="text-sm font-semibold text-slate-800">{complaint.subject}</p>
                                        <p className="text-xs text-slate-500">{complaint.school}</p>
                                    </div>
                                    <button
                                        onClick={() => navigate('reports-feedback')}
                                        className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        Resolve
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8">
                            <div className="w-16 h-16 mx-auto mb-3 bg-green-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-slate-600 font-medium">No active alerts</p>
                            <p className="text-sm text-slate-500">Great job! Everything is running smoothly.</p>
                        </div>
                    )}
                </div>

                {/* Recent Feedback */}
                <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-lg font-bold text-slate-800">Recent Feedback</h2>
                        <NavLink to="reports-feedback" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View All →</NavLink>
                    </div>
                    <div className="space-y-4">
                        {feedbackData.map(fb => (
                            <div key={fb.id} className="p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-semibold text-slate-800">{fb.school}</span>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className={`w-4 h-4 ${i < fb.rating ? 'text-yellow-400' : 'text-slate-200'}`} fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                                <p className="text-sm text-slate-600 italic">"{fb.comment}"</p>
                                <p className="text-xs text-slate-400 mt-1">{fb.date}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminMainPage;
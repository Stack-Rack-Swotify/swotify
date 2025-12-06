import React from 'react';
import { useNavigate } from 'react-router-dom';
import AnalyticsGraph from '../../student/components/AnalyticsGraph';

const SuperAdminMainPage = () => {
  const navigate = useNavigate();

  // --- Mock Data (Aggregated from other pages) ---
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
    { id: 1, school: 'Greenwood High', rating: 4, comment: 'Great update!', date: '2025-03-03' },
    { id: 2, school: 'Sunnydale Academy', rating: 3, comment: 'UI needs work.', date: '2025-03-01' },
    { id: 3, school: 'Riverside Public', rating: 5, comment: 'Excellent support.', date: '2025-02-25' },
  ];

  const globalPerformanceData = [75, 78, 76, 80, 82, 85, 84, 88, 87, 90]; // Trend data

  // --- Calculations ---
  const totalSchools = schoolsData.length;
  const activeSchools = schoolsData.filter(s => s.status === 'Active').length;
  const totalStudents = schoolsData.reduce((acc, curr) => acc + curr.students, 0);
  const totalTeachers = schoolsData.reduce((acc, curr) => acc + curr.teachers, 0);
  const avgPerformance = Math.round(schoolsData.reduce((acc, curr) => acc + curr.performance, 0) / totalSchools);
  const openComplaints = complaintsData.filter(c => c.status === 'Open').length;
  const highPriorityComplaints = complaintsData.filter(c => c.priority === 'High').length;

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Dashboard Overview</h1>
          <p className="text-[#64748B] text-sm mt-1">Welcome back, Super Admin. Here's what's happening across the system.</p>
        </div>
        <div className="flex gap-2">
            <button 
              onClick={() => navigate('management')}
              className="px-4 py-2 bg-white border border-gray-200 text-[#64748B] text-sm font-semibold rounded-xl hover:bg-gray-50 transition-all"
            >
              Manage Schools
            </button>
            <button 
              onClick={() => navigate('reports-feedback')}
              className="px-4 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white text-sm font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              View Reports
            </button>
        </div>
      </div>

      {/* Stats Cards Row 1: General Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Schools */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Total Schools</p>
                <h3 className="text-2xl font-bold text-[#0F172A] mt-1">{totalSchools}</h3>
                <p className="text-xs text-[#22C55E] mt-1 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span> {activeSchools} Active
                </p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#0EA5E9]/10 flex items-center justify-center text-[#0EA5E9]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            </div>
        </div>

        {/* Total Students */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Total Students</p>
                <h3 className="text-2xl font-bold text-[#0F172A] mt-1">{totalStudents.toLocaleString()}</h3>
                <p className="text-xs text-[#64748B] mt-1">+150 this month</p>
            </div>
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                 </svg>
            </div>
        </div>

        {/* Total Teachers */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Total Staff</p>
                <h3 className="text-2xl font-bold text-[#0F172A] mt-1">{totalTeachers}</h3>
                <p className="text-xs text-[#64748B] mt-1">Across all branches</p>
            </div>
             <div className="w-12 h-12 rounded-xl bg-[#F97316]/10 flex items-center justify-center text-[#F97316]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
            </div>
        </div>

        {/* Global Performance */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div>
                <p className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Avg Performance</p>
                <h3 className="text-2xl font-bold text-[#0F172A] mt-1">{avgPerformance}%</h3>
                <p className="text-xs text-[#22C55E] mt-1">↑ 2% vs last term</p>
            </div>
             <div className="w-12 h-12 rounded-xl bg-[#22C55E]/10 flex items-center justify-center text-[#22C55E]">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            </div>
        </div>
      </div>

      {/* Main Content Grid: Graph & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Performance Graph */}
        <div className="lg:col-span-2 space-y-6">
            <AnalyticsGraph 
              title="Global System Performance" 
              graphData={globalPerformanceData} 
            />

            {/* School List Preview */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="text-lg font-bold text-[#0F172A]">Top Performing Schools</h3>
                    <button onClick={() => navigate('schools')} className="text-sm text-[#0EA5E9] font-medium hover:underline">View All</button>
                </div>
                <div className="p-4 space-y-3">
                    {schoolsData.slice(0, 3).map((school, index) => (
                        <div key={school.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                            <div className="flex items-center gap-4">
                                <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold ${index === 0 ? 'bg-yellow-100 text-yellow-700' : index === 1 ? 'bg-gray-100 text-gray-700' : 'bg-orange-100 text-orange-700'}`}>
                                    #{index + 1}
                                </span>
                                <div>
                                    <p className="font-semibold text-[#0F172A]">{school.name}</p>
                                    <p className="text-xs text-[#64748B]">{school.students} Students</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-[#0F172A]">{school.performance}%</p>
                                <p className="text-xs text-[#22C55E]">Avg Score</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* Right Column: Alerts & Feedback */}
        <div className="space-y-6">
             {/* Action Required / Alerts */}
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-[#0F172A]">Action Required</h3>
                </div>
                <div className="p-4 space-y-3">
                    {openComplaints > 0 ? (
                        complaintsData.filter(c => c.status !== 'Resolved').map(complaint => (
                             <div key={complaint.id} className="p-3 bg-red-50 rounded-xl border border-red-100">
                                <div className="flex justify-between items-start">
                                    <span className="text-xs font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full mb-1 inline-block">{complaint.priority} Priority</span>
                                    <span className="text-xs text-red-500">{complaint.date}</span>
                                </div>
                                <h4 className="text-sm font-bold text-[#0F172A] mt-1">{complaint.subject}</h4>
                                <p className="text-xs text-[#64748B] mt-0.5">{complaint.school}</p>
                                <button 
                                    onClick={() => navigate('reports-feedback')}
                                    className="mt-2 text-xs font-semibold text-red-600 hover:text-red-700"
                                >
                                    Resolve Now →
                                </button>
                             </div>
                        ))
                    ) : (
                        <div className="text-center py-6 text-[#64748B] text-sm">
                            No active alerts. Great job!
                        </div>
                    )}
                </div>
             </div>

             {/* Recent Feedback */}
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h3 className="text-lg font-bold text-[#0F172A]">Recent Feedback</h3>
                </div>
                <div className="divide-y divide-gray-100">
                    {feedbackData.map(fb => (
                        <div key={fb.id} className="p-4 hover:bg-gray-50 transition-colors">
                            <div className="flex justify-between mb-1">
                                <span className="text-sm font-semibold text-[#0F172A]">{fb.school}</span>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className={`w-3 h-3 ${i < fb.rating ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                    ))}
                                </div>
                            </div>
                            <p className="text-xs text-[#64748B] italic">"{fb.comment}"</p>
                        </div>
                    ))}
                </div>
             </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminMainPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnalyticsGraph from '../../student/components/AnalyticsGraph'; // Reusing the analytics graph

const SchoolsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('list');
  
  // Mock data for schools
  const [schools, setSchools] = useState([
    { id: 1, name: 'Greenwood High', principal: 'Mr. John Smith', students: 1200, teachers: 80, performance: 85, status: 'Active' },
    { id: 2, name: 'Sunnydale Academy', principal: 'Mrs. Sarah Jones', students: 850, teachers: 60, performance: 78, status: 'Active' },
    { id: 3, name: 'Oakridge International', principal: 'Dr. Emily Brown', students: 1500, teachers: 110, performance: 92, status: 'Active' },
    { id: 4, name: 'Riverside Public School', principal: 'Mr. David Wilson', students: 950, teachers: 65, performance: 72, status: 'Inactive' },
  ]);

  // Mock performance data for the graph (average score per week)
  const performanceData = [75, 78, 76, 80, 82, 85, 84, 88, 87, 90];

  const handleStatusToggle = (id) => {
    setSchools(schools.map(school => {
      if (school.id === id) {
        return { ...school, status: school.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return school;
    }));
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">School Management</h1>
          <p className="text-[#64748B] text-sm mt-1">Manage schools and view performance analytics.</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-white rounded-xl border border-gray-100 w-fit">
        <button
          onClick={() => setActiveTab('list')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'list'
              ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          Schools List
        </button>
        <button
          onClick={() => setActiveTab('analysis')}
          className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'analysis'
              ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]'
              : 'text-[#64748B] hover:text-[#0F172A]'
          }`}
        >
          Analytics & Insights
        </button>
      </div>

      {/* Content */}
      {activeTab === 'list' ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">School Name</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Principal</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Students</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Performance</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Status</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-[#64748B] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {schools.map((school) => (
                  <tr key={school.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 flex items-center justify-center text-[#0EA5E9] font-bold text-lg">
                          {school.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-[#0F172A]">{school.name}</p>
                          <p className="text-xs text-[#64748B]">ID: #{school.id.toString().padStart(4, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{school.principal}</td>
                    <td className="py-4 px-6 text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#0EA5E9]/10 text-[#0EA5E9]">
                        {school.students}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-16 bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              school.performance >= 90 ? 'bg-[#22C55E]' : 
                              school.performance >= 75 ? 'bg-[#0EA5E9]' : 'bg-[#F97316]'
                            }`}
                            style={{ width: `${school.performance}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-[#64748B]">{school.performance}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                       <button 
                        onClick={() => handleStatusToggle(school.id)}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors ${
                          school.status === 'Active' 
                            ? 'bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20 hover:bg-[#22C55E]/20' 
                            : 'bg-[#F97316]/10 text-[#F97316] border-[#F97316]/20 hover:bg-[#F97316]/20'
                        }`}
                      >
                        {school.status}
                      </button>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-[#64748B] hover:text-[#0EA5E9] transition-colors p-2 rounded-lg hover:bg-gray-100">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            <span className="text-sm text-[#64748B]">Showing 4 of 4 schools</span>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-sm text-[#64748B] hover:text-[#0F172A] disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1 text-sm text-[#64748B] hover:text-[#0F172A] disabled:opacity-50" disabled>Next</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
           {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-medium text-[#64748B]">Avg. Student Performance</h3>
              <p className="text-2xl font-bold text-[#0F172A] mt-2">82.5%</p>
              <span className="text-xs text-[#22C55E] flex items-center gap-1 mt-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                +2.4% from last month
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-medium text-[#64748B]">Total Active Students</h3>
              <p className="text-2xl font-bold text-[#0F172A] mt-2">4,500</p>
              <span className="text-xs text-[#0EA5E9] flex items-center gap-1 mt-1">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                +150 new enrollments
              </span>
            </div>
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-medium text-[#64748B]">Schools at Risk</h3>
               <p className="text-2xl font-bold text-[#F97316] mt-2">1</p>
               <span className="text-xs text-[#64748B] mt-1">Needs attention</span>
            </div>
          </div>

          {/* Graph */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AnalyticsGraph 
              title="Global School Performance Trend" 
              graphData={performanceData} 
            />
             {/* Additional detailed stats placeholder */}
             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                <h2 className="text-lg font-bold text-[#0F172A] mb-4">Top Performing Schools</h2>
                <div className="space-y-4">
                  {schools.slice().sort((a, b) => b.performance - a.performance).map((school, index) => (
                    <div key={school.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors">
                      <div className="flex items-center gap-3">
                         <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${index === 0 ? 'bg-[#FFD700]/20 text-[#B45309]' : index === 1 ? 'bg-[#C0C0C0]/20 text-[#4B5563]' : 'bg-[#CD7F32]/20 text-[#92400E]'}`}>
                           {index + 1}
                         </span>
                         <span className="font-medium text-[#0F172A]">{school.name}</span>
                      </div>
                      <span className="font-bold text-[#0EA5E9]">{school.performance}%</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchoolsPage;

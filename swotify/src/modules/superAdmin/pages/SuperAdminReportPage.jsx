import React, { useState } from 'react';

const SuperAdminReportPage = () => {
  const [activeTab, setActiveTab] = useState('complaints');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  // Mock Data for Complaints
  const [complaints, setComplaints] = useState([
    {
      id: 1,
      school: 'Greenwood High',
      subject: 'Login Issues for Students',
      description: 'Several students from Grade 10 cannot access the dashboard.',
      date: '2025-03-01',
      status: 'Open',
      priority: 'High',
    },
    {
      id: 2,
      school: 'Sunnydale Academy',
      subject: 'Attendance Report Bug',
      description: 'The monthly attendance report is showing incorrect totals.',
      date: '2025-03-02',
      status: 'In Progress',
      priority: 'Medium',
    },
    {
      id: 3,
      school: 'Oakridge International',
      subject: 'Feature Request: Dark Mode',
      description: 'Staff is requesting a dark mode for better visibility at night.',
      date: '2025-02-28',
      status: 'Resolved',
      priority: 'Low',
    },
  ]);

  // Mock Data for Feedbacks
  const feedbacks = [
    {
      id: 1,
      school: 'Greenwood High',
      rating: 4,
      comment: 'The new update is great! Much faster than before.',
      date: '2025-03-03',
    },
    {
      id: 2,
      school: 'Sunnydale Academy',
      rating: 3,
      comment: 'UI is good, but some reports take too long to load.',
      date: '2025-03-01',
    },
    {
      id: 3,
      school: 'Riverside Public School',
      rating: 5,
      comment: 'Excellent support from the technical team. Thank you!',
      date: '2025-02-25',
    },
  ];

  // Mock Data for School Reports
  const schoolReports = [
    {
      id: 1,
      school: 'Greenwood High',
      type: 'Performance Report',
      summary: 'Overall academic performance increased by 5% this term.',
      date: '2025-03-01',
      status: 'Published',
    },
    {
      id: 2,
      school: 'Sunnydale Academy',
      type: 'Compliance Check',
      summary: 'Pending verification for new safety standards module.',
      date: '2025-02-28',
      status: 'Pending Review',
    },
    {
      id: 3,
      school: 'Oakridge International',
      type: 'Incident Report',
      summary: 'Server downtime reported on Feb 20th (Resolved).',
      date: '2025-02-20',
      status: 'Closed',
    },
  ];

  const handleStatusChange = (id, newStatus) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-600';
      case 'In Progress': return 'bg-yellow-100 text-yellow-600';
      case 'Resolved': return 'bg-green-100 text-green-600';
      case 'Published': return 'bg-blue-100 text-blue-600';
      case 'Closed': return 'bg-gray-100 text-gray-600';
      case 'Pending Review': return 'bg-orange-100 text-orange-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 font-bold';
      case 'Medium': return 'text-yellow-600 font-medium';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in-up pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#0F172A]">Reports & Feedback Center</h1>
          <p className="text-[#64748B] text-sm mt-1">Manage complaints, view feedback, and track school reports.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-100">
          <button
            onClick={() => setActiveTab('complaints')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'complaints' ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
          >
            Complaints
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'feedback' ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
          >
            Feedback
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === 'reports' ? 'bg-[#0EA5E9]/10 text-[#0EA5E9]' : 'text-[#64748B] hover:text-[#0F172A]'}`}
          >
            School Reports
          </button>
        </div>
      </div>

      {/* Complaints Tab */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-[#0F172A]">App Complaints & Issues</h2>
            <div className="flex gap-3">
              <select 
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#0EA5E9]"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option value="All">All Status</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">School</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Subject & Description</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Date</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Priority</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Status</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {complaints.filter(c => filterStatus === 'All' || c.status === filterStatus).map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#0F172A]">{complaint.school}</td>
                    <td className="py-4 px-6">
                      <p className="font-semibold text-[#0F172A] text-sm">{complaint.subject}</p>
                      <p className="text-xs text-[#64748B] truncate max-w-xs">{complaint.description}</p>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-[#64748B]">{complaint.date}</td>
                    <td className={`py-4 px-6 text-center text-xs ${getPriorityColor(complaint.priority)}`}>{complaint.priority}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                         {complaint.status !== 'Resolved' && (
                            <button 
                              onClick={() => handleStatusChange(complaint.id, 'Resolved')}
                              className="text-green-600 hover:text-green-700 text-xs font-semibold bg-green-50 px-2 py-1 rounded"
                            >
                              Resolve
                            </button>
                         )}
                         {complaint.status === 'Open' && (
                            <button 
                              onClick={() => handleStatusChange(complaint.id, 'In Progress')}
                              className="text-blue-600 hover:text-blue-700 text-xs font-semibold bg-blue-50 px-2 py-1 rounded"
                            >
                              Start
                            </button>
                         )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Feedback Tab */}
      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-bold text-[#0F172A]">{feedback.school}</h3>
                <span className="text-xs text-[#64748B]">{feedback.date}</span>
              </div>
              <div className="flex items-center mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-5 h-5 ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-sm text-[#64748B] italic">"{feedback.comment}"</p>
            </div>
          ))}
        </div>
      )}

      {/* School Reports Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-bold text-[#0F172A]">School Status & Incident Reports</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">School Name</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Report Type</th>
                  <th className="text-left py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Summary</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Date</th>
                  <th className="text-center py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Status</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-[#64748B] uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {schoolReports.map((report) => (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-6 font-medium text-[#0F172A]">{report.school}</td>
                    <td className="py-4 px-6 text-sm text-[#64748B]">{report.type}</td>
                    <td className="py-4 px-6 text-sm text-[#0F172A] truncate max-w-xs">{report.summary}</td>
                    <td className="py-4 px-6 text-center text-sm text-[#64748B]">{report.date}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="text-[#0EA5E9] hover:text-[#0284C7] text-sm font-medium">View Details</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminReportPage;

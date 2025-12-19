import React, { useState } from 'react';

const SuperAdminReportPage = () => {
  const [activeTab, setActiveTab] = useState('complaints');
  const [filterStatus, setFilterStatus] = useState('All');

  // Mock Data for Complaints
  const [complaints, setComplaints] = useState([
    { id: 1, school: 'Greenwood High', subject: 'Login Issues for Students', description: 'Several students from Grade 10 cannot access the dashboard.', date: '2025-03-01', status: 'Open', priority: 'High' },
    { id: 2, school: 'Sunnydale Academy', subject: 'Attendance Report Bug', description: 'The monthly attendance report is showing incorrect totals.', date: '2025-03-02', status: 'In Progress', priority: 'Medium' },
    { id: 3, school: 'Oakridge International', subject: 'Feature Request: Dark Mode', description: 'Staff is requesting a dark mode for better visibility at night.', date: '2025-02-28', status: 'Resolved', priority: 'Low' },
  ]);

  // Mock Data for Feedbacks
  const feedbacks = [
    { id: 1, school: 'Greenwood High', rating: 4, comment: 'The new update is great! Much faster than before.', date: 'Mar 3' },
    { id: 2, school: 'Sunnydale Academy', rating: 3, comment: 'UI is good, but some reports take too long to load.', date: 'Mar 1' },
    { id: 3, school: 'Riverside Public School', rating: 5, comment: 'Excellent support from the technical team. Thank you!', date: 'Feb 25' },
  ];

  // Mock Data for School Reports
  const schoolReports = [
    { id: 1, school: 'Greenwood High', type: 'Performance Report', summary: 'Overall academic performance increased by 5% this term.', date: '2025-03-01', status: 'Published' },
    { id: 2, school: 'Sunnydale Academy', type: 'Compliance Check', summary: 'Pending verification for new safety standards module.', date: '2025-02-28', status: 'Pending Review' },
    { id: 3, school: 'Oakridge International', type: 'Incident Report', summary: 'Server downtime reported on Feb 20th (Resolved).', date: '2025-02-20', status: 'Closed' },
  ];

  const handleStatusChange = (id, newStatus) => {
    setComplaints(complaints.map(c => c.id === id ? { ...c, status: newStatus } : c));
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case 'Open': return 'bg-red-100 text-red-700';
      case 'In Progress': return 'bg-orange-100 text-orange-700';
      case 'Resolved': return 'bg-green-100 text-green-700';
      case 'Published': return 'bg-blue-100 text-blue-700';
      case 'Closed': return 'bg-slate-100 text-slate-600';
      case 'Pending Review': return 'bg-orange-100 text-orange-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const getPriorityStyles = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700';
      case 'Medium': return 'bg-orange-100 text-orange-700';
      case 'Low': return 'bg-green-100 text-green-700';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const stats = [
    { label: 'Open Issues', value: complaints.filter(c => c.status === 'Open').length, color: 'red' },
    { label: 'In Progress', value: complaints.filter(c => c.status === 'In Progress').length, color: 'orange' },
    { label: 'Resolved', value: complaints.filter(c => c.status === 'Resolved').length, color: 'green' },
    { label: 'Avg Rating', value: (feedbacks.reduce((a, b) => a + b.rating, 0) / feedbacks.length).toFixed(1), color: 'blue' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ea580c] flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Reports & Feedback</h1>
            <p className="text-slate-500 text-sm">Manage complaints, view feedback, and track school reports.</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl border border-slate-200 p-4">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                <span className={`text-lg font-bold text-${stat.color}-600`}>{stat.value}</span>
              </div>
              <p className="text-sm text-slate-600 font-medium">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 p-1.5 inline-flex">
        {['complaints', 'feedback', 'reports'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab
              ? 'bg-blue-500 text-white'
              : 'text-slate-600 hover:bg-slate-100'
              }`}
          >
            {tab === 'complaints' ? 'Complaints' : tab === 'feedback' ? 'Feedback' : 'School Reports'}
          </button>
        ))}
      </div>

      {/* Complaints Tab */}
      {activeTab === 'complaints' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-800">App Complaints & Issues</h2>
              <p className="text-sm text-slate-500">{complaints.length} total complaints</p>
            </div>
            <select
              className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">School</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Issue</th>
                  <th className="text-center py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Date</th>
                  <th className="text-center py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Priority</th>
                  <th className="text-center py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Status</th>
                  <th className="text-right py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.filter(c => filterStatus === 'All' || c.status === filterStatus).map((complaint) => (
                  <tr key={complaint.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <span className="font-medium text-slate-800">{complaint.school}</span>
                    </td>
                    <td className="py-4 px-6">
                      <p className="font-medium text-slate-800 text-sm">{complaint.subject}</p>
                      <p className="text-xs text-slate-500 truncate max-w-xs">{complaint.description}</p>
                    </td>
                    <td className="py-4 px-6 text-center text-sm text-slate-600">{complaint.date}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getPriorityStyles(complaint.priority)}`}>
                        {complaint.priority}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusStyles(complaint.status)}`}>
                        {complaint.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex justify-end gap-2">
                        {complaint.status === 'Open' && (
                          <button
                            onClick={() => handleStatusChange(complaint.id, 'In Progress')}
                            className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-100"
                          >
                            Start
                          </button>
                        )}
                        {complaint.status !== 'Resolved' && (
                          <button
                            onClick={() => handleStatusChange(complaint.id, 'Resolved')}
                            className="px-3 py-1.5 bg-green-50 text-green-600 text-xs font-medium rounded-lg hover:bg-green-100"
                          >
                            Resolve
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="bg-white p-5 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{feedback.school}</h3>
                    <p className="text-xs text-slate-500">{feedback.date}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-4 h-4 ${i < feedback.rating ? 'text-yellow-400' : 'text-slate-200'}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-slate-600 ml-1">{feedback.rating}/5</span>
              </div>
              <p className="text-sm text-slate-600 italic">"{feedback.comment}"</p>
            </div>
          ))}
        </div>
      )}

      {/* School Reports Tab */}
      {activeTab === 'reports' && (
        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-lg font-bold text-slate-800">School Status & Incident Reports</h2>
            <p className="text-sm text-slate-500">{schoolReports.length} reports</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">School</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Type</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Summary</th>
                  <th className="text-center py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Date</th>
                  <th className="text-center py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Status</th>
                  <th className="text-right py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {schoolReports.map((report) => (
                  <tr key={report.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5" />
                          </svg>
                        </div>
                        <span className="font-medium text-slate-800">{report.school}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-slate-600">{report.type}</td>
                    <td className="py-4 px-6 text-sm text-slate-700 max-w-xs truncate">{report.summary}</td>
                    <td className="py-4 px-6 text-center text-sm text-slate-600">{report.date}</td>
                    <td className="py-4 px-6 text-center">
                      <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getStatusStyles(report.status)}`}>
                        {report.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button className="px-3 py-1.5 bg-blue-50 text-blue-600 text-xs font-medium rounded-lg hover:bg-blue-100">
                        View Details
                      </button>
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

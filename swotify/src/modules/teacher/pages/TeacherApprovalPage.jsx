import React, { useState } from 'react';
import mockAIRecommendations from '../../../data/mockAIRecommendations';

const TeacherApprovalPage = () => {
  const [recommendations, setRecommendations] = useState(mockAIRecommendations);
  const [activeTab, setActiveTab] = useState('Pending'); // Pending, Approved, Rejected

  const handleStatusChange = (id, newStatus) => {
    setRecommendations((prev) =>
      prev.map((rec) =>
        rec.id === id ? { ...rec, status: newStatus } : rec
      )
    );
  };

  const filteredRecommendations = recommendations.filter(
    (rec) => rec.status === activeTab
  );

  return (
    <div className="min-h-screen bg-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            AI Suggestions Approval
          </h1>
          <p className="text-slate-600 text-sm font-medium">
            Review and approve AI-generated academic and behavioral suggestions for students.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-slate-200 pb-1 mb-6">
          {['Pending', 'Approved', 'Rejected'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 text-sm font-bold capitalize transition-colors relative ${
                activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <div className="absolute bottom-[-5px] left-0 w-full h-1 bg-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-4">
          {filteredRecommendations.length > 0 ? (
            filteredRecommendations.map((rec) => (
              <div
                key={rec.id}
                className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between gap-6"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full border ${
                      rec.category === 'Academic' ? 'bg-blue-50 text-blue-700 border-blue-100' :
                      rec.category === 'Behavioral' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                      rec.category === 'Wellness' ? 'bg-green-50 text-green-700 border-green-100' :
                      'bg-purple-50 text-purple-700 border-purple-100'
                    }`}>
                      {rec.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">Generated: {rec.dateGenerated}</span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{rec.studentName} ({rec.studentId})</h3>
                  <p className="text-slate-700 font-medium mb-2">{rec.recommendation}</p>
                  <p className="text-sm text-slate-500 italic bg-slate-50 p-2 rounded border border-slate-100 inline-block">
                    Reasoning: {rec.reasoning}
                  </p>
                </div>

                {activeTab === 'Pending' && (
                  <div className="flex items-center gap-3 self-start md:self-center">
                    <button
                      onClick={() => handleStatusChange(rec.id, 'Approved')}
                      className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                    <button
                      onClick={() => handleStatusChange(rec.id, 'Rejected')}
                      className="flex items-center gap-2 px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white text-sm font-bold rounded-lg transition-colors shadow-sm"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>
                  </div>
                )}
                 {activeTab !== 'Pending' && (
                    <div className="flex items-center gap-2 self-start md:self-center">
                         <span className={`px-4 py-2 text-sm font-bold rounded-lg border ${
                            rec.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-rose-50 text-rose-700 border-rose-100'
                         }`}>
                             {rec.status}
                         </span>
                         <button 
                             onClick={() => handleStatusChange(rec.id, 'Pending')}
                             className="text-xs text-slate-400 hover:text-slate-600 underline ml-2"
                         >
                             Undo
                         </button>
                    </div>
                 )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                 <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                 </svg>
              </div>
              <h3 className="text-lg font-bold text-slate-900">No {activeTab} Suggestions</h3>
              <p className="text-slate-500 text-sm">There are no {activeTab.toLowerCase()} AI suggestions at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherApprovalPage;

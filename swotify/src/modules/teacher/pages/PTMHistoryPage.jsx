import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import mockPTMHistory from '../../../data/mockPTMHistory';

const PTMHistoryPage = () => {
  const { ptmId } = useParams();
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('history');
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const allStudents = mockClasses.flatMap(classData =>
    classData.students.map(student => ({
      ...student,
      className: classData.className,
      grade: classData.grade,
      section: classData.section
    }))
  );

  const studentPTMHistory = selectedStudent
    ? mockPTMHistory.filter(record => record.studentId === selectedStudent.id)
    : [];

  // Generate mock AI suggestions when student changes
  useEffect(() => {
    if (selectedStudent) {
      const mockAISuggestions = [
        {
          id: 'ai_1',
          type: 'performance',
          title: 'Academic Performance Analysis',
          suggestion: `Based on ${selectedStudent.name}'s recent performance data, I recommend focusing on Mathematics where there has been a 15% decline. Consider providing additional practice problems and one-on-one tutoring sessions to address fundamental concepts.`,
          status: 'pending',
          confidence: 92,
          generatedAt: new Date().toISOString().split('T')[0]
        },
        {
          id: 'ai_2',
          type: 'attendance',
          title: 'Attendance Pattern Alert',
          suggestion: `I've noticed ${selectedStudent.name} has been absent on Mondays frequently (3 out of last 5 Mondays). This pattern might indicate health issues or other concerns. I suggest scheduling a parent meeting to discuss.`,
          status: 'pending',
          confidence: 87,
          generatedAt: new Date().toISOString().split('T')[0]
        },
        {
          id: 'ai_3',
          type: 'behavior',
          title: 'Positive Behavior Recognition',
          suggestion: `${selectedStudent.name} has shown exceptional improvement in class participation over the past month. Consider recognizing this achievement in the next parent-teacher meeting to encourage continued progress.`,
          status: 'pending',
          confidence: 95,
          generatedAt: new Date().toISOString().split('T')[0]
        },
        {
          id: 'ai_4',
          type: 'learning',
          title: 'Learning Style Recommendation',
          suggestion: `Analysis of ${selectedStudent.name}'s assignment submissions suggests they learn better through visual aids. Consider incorporating more diagrams, charts, and video content in teaching materials.`,
          status: 'pending',
          confidence: 78,
          generatedAt: new Date().toISOString().split('T')[0]
        }
      ];
      setAiSuggestions(mockAISuggestions);
      setEditingId(null);
      setEditText('');
    }
  }, [selectedStudent]);

  const handleRecordToggle = () => {
    if (!isRecording) {
      setIsRecording(true);
      const interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      setTimerInterval(interval);
    } else {
      setIsRecording(false);
      clearInterval(timerInterval);
      setRecordingTime(0);
      alert('PTM Session Recorded & Saved!');
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleApprove = (id) => {
    setAiSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, status: 'approved' } : s)
    );
  };

  const handleReject = (id) => {
    setAiSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, status: 'rejected' } : s)
    );
  };

  const handleEdit = (id, suggestion) => {
    setEditingId(id);
    setEditText(suggestion);
  };

  const handleSaveEdit = (id) => {
    setAiSuggestions(prev =>
      prev.map(s => s.id === id ? { ...s, suggestion: editText, status: 'edited' } : s)
    );
    setEditingId(null);
    setEditText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditText('');
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'performance':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />;
      case 'attendance':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
      case 'behavior':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
      case 'learning':
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
      default:
        return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-lg">✓ Approved</span>;
      case 'rejected':
        return <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-lg">✗ Rejected</span>;
      case 'edited':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-lg">✎ Edited</span>;
      default:
        return <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-lg">⏳ Pending</span>;
    }
  };

  useEffect(() => {
    if (ptmId) {
      const record = mockPTMHistory.find(r => r.id === ptmId);
      if (record) {
        const student = allStudents.find(s => s.id === record.studentId);
        if (student) setSelectedStudent(student);
      }
    } else if (allStudents.length > 0 && !selectedStudent) {
      setSelectedStudent(allStudents[0]);
    }
  }, [ptmId]);

  const pendingCount = aiSuggestions.filter(s => s.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#ea580c] flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">PTM History & Management</h1>
          <p className="text-slate-500 text-sm">Manage Parent-Teacher Meetings, view history, and review AI suggestions.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Sidebar - Student List */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Select Student</h2>
            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {allStudents.map((student) => (
                <button
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all text-left ${selectedStudent?.id === student.id
                    ? 'bg-orange-50 border border-orange-200'
                    : 'hover:bg-slate-50 border border-transparent'
                    }`}
                >
                  <img
                    src={student.photo}
                    alt={student.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="min-w-0">
                    <p className={`text-sm font-medium truncate ${selectedStudent?.id === student.id ? 'text-[#ea580c]' : 'text-slate-800'}`}>
                      {student.name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">{student.className}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="lg:col-span-9">
          {selectedStudent ? (
            <div className="space-y-6">
              {/* Student Header Card */}
              <div className="bg-white rounded-xl border border-slate-200 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-4">
                  <img
                    src={selectedStudent.photo}
                    alt={selectedStudent.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-slate-200"
                  />
                  <div>
                    <h2 className="text-xl font-bold text-slate-800">{selectedStudent.name}</h2>
                    <p className="text-slate-600 text-sm">Parents: {selectedStudent.details.parents}</p>
                    <p className="text-slate-500 text-xs">{selectedStudent.details.email}</p>
                  </div>
                </div>

                {/* Recording Button */}
                <button
                  onClick={handleRecordToggle}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium text-white transition-colors ${isRecording
                    ? 'bg-red-500 hover:bg-red-600'
                    : 'bg-green-500 hover:bg-green-600'
                    }`}
                >
                  {isRecording ? (
                    <>
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                      Stop Recording ({formatTime(recordingTime)})
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                      </svg>
                      Start PTM Session
                    </>
                  )}
                </button>
              </div>

              {/* Tabs */}
              <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
                {['history', 'performance', 'ai-approval', 'suggestions'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium capitalize rounded-md transition-colors flex items-center gap-2 ${activeTab === tab
                      ? 'bg-white text-slate-800 shadow-sm'
                      : 'text-slate-500 hover:text-slate-700'
                      }`}
                  >
                    {tab === 'ai-approval' ? (
                      <>
                        🤖 AI Approval
                        {pendingCount > 0 && (
                          <span className="px-1.5 py-0.5 bg-orange-500 text-white text-xs font-bold rounded-full">
                            {pendingCount}
                          </span>
                        )}
                      </>
                    ) : tab === 'history' ? 'History' : tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="space-y-4">
                {activeTab === 'history' && (
                  <div className="space-y-4">
                    {studentPTMHistory.length > 0 ? (
                      studentPTMHistory.map((record) => (
                        <div key={record.id} className="bg-white rounded-xl border border-slate-200 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h3 className="text-lg font-semibold text-slate-800 mb-1">PTM Date: {record.date}</h3>
                              <p className="text-sm text-slate-500">Conducted by: {record.teacher}</p>
                            </div>
                            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-lg">
                              Completed
                            </span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium text-slate-700 mb-2">Discussion Points</h4>
                              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                {record.discussionPoints.map((point, i) => (
                                  <li key={i}>{point}</li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-slate-700 mb-2">Teacher's Note</h4>
                              <p className="text-sm text-slate-600 italic bg-slate-50 p-3 rounded-lg">
                                "{record.performanceSummary.teacherComment}"
                              </p>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                        <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="text-slate-500 text-sm">No previous PTM records found for this student.</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'performance' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-green-50 rounded-lg p-5 border border-green-100">
                        <h4 className="text-sm text-slate-600 mb-1">Current Grade</h4>
                        <p className="text-3xl font-bold text-green-600">{selectedStudent.details.grade}</p>
                      </div>
                      <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
                        <h4 className="text-sm text-slate-600 mb-1">Attendance</h4>
                        <p className="text-3xl font-bold text-blue-600">{selectedStudent.details.attendance}</p>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-5 border border-purple-100">
                        <h4 className="text-sm text-slate-600 mb-1">Assignments</h4>
                        <p className="text-3xl font-bold text-purple-600">{selectedStudent.assignments?.length || 0}</p>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6">
                      <h4 className="text-lg font-semibold text-slate-800 mb-4">Performance Summary</h4>
                      {studentPTMHistory.length > 0 ? (
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(studentPTMHistory[0].performanceSummary)
                            .filter(([key]) => key.includes('Score'))
                            .map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                <span className="text-sm text-slate-600 capitalize">{key.replace('Score', '')}</span>
                                <span className="text-sm font-semibold text-slate-800">{value}</span>
                              </div>
                            ))
                          }
                        </div>
                      ) : (
                        <p className="text-slate-500 text-sm">No performance data available.</p>
                      )}
                    </div>
                  </div>
                )}

                {/* AI Approval Tab - NEW */}
                {activeTab === 'ai-approval' && (
                  <div className="space-y-4">
                    {/* AI Info Banner */}
                    <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100 p-4 flex items-start gap-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-slate-800">AI-Powered Insights</h3>
                        <p className="text-sm text-slate-600">Review AI-generated suggestions about {selectedStudent.name}'s performance. You can approve, reject, or edit each suggestion before sharing with parents.</p>
                      </div>
                    </div>

                    {/* Suggestions List */}
                    {aiSuggestions.map((item) => (
                      <div key={item.id} className="bg-white rounded-xl border border-slate-200 p-6">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div className="flex items-start gap-3">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.type === 'performance' ? 'bg-blue-100' :
                              item.type === 'attendance' ? 'bg-orange-100' :
                                item.type === 'behavior' ? 'bg-green-100' : 'bg-purple-100'
                              }`}>
                              <svg className={`w-5 h-5 ${item.type === 'performance' ? 'text-blue-600' :
                                item.type === 'attendance' ? 'text-orange-600' :
                                  item.type === 'behavior' ? 'text-green-600' : 'text-purple-600'
                                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {getTypeIcon(item.type)}
                              </svg>
                            </div>
                            <div>
                              <h4 className="text-base font-semibold text-slate-800">{item.title}</h4>
                              <p className="text-xs text-slate-500">Generated on {item.generatedAt} • {item.confidence}% confidence</p>
                            </div>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>

                        {editingId === item.id ? (
                          <div className="space-y-3">
                            <textarea
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                              className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                              rows="4"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleSaveEdit(item.id)}
                                className="px-4 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white text-sm font-medium rounded-lg transition-colors"
                              >
                                Save Changes
                              </button>
                              <button
                                onClick={handleCancelEdit}
                                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <p className="text-sm text-slate-600 mb-4 leading-relaxed bg-slate-50 p-4 rounded-lg">
                              {item.suggestion}
                            </p>

                            {item.status === 'pending' && (
                              <div className="flex flex-wrap gap-2">
                                <button
                                  onClick={() => handleApprove(item.id)}
                                  className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(item.id)}
                                  className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                  Reject
                                </button>
                                <button
                                  onClick={() => handleEdit(item.id, item.suggestion)}
                                  className="px-4 py-2 bg-[#334155] hover:bg-[#1e293b] text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </button>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    ))}

                    {/* Summary Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
                        <p className="text-2xl font-bold text-slate-800">{aiSuggestions.length}</p>
                        <p className="text-xs text-slate-500">Total</p>
                      </div>
                      <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
                        <p className="text-2xl font-bold text-orange-600">{aiSuggestions.filter(s => s.status === 'pending').length}</p>
                        <p className="text-xs text-slate-500">Pending</p>
                      </div>
                      <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
                        <p className="text-2xl font-bold text-green-600">{aiSuggestions.filter(s => s.status === 'approved').length}</p>
                        <p className="text-xs text-slate-500">Approved</p>
                      </div>
                      <div className="bg-white rounded-lg border border-slate-200 p-4 text-center">
                        <p className="text-2xl font-bold text-blue-600">{aiSuggestions.filter(s => s.status === 'edited').length}</p>
                        <p className="text-xs text-slate-500">Edited</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'suggestions' && (
                  <div className="bg-white rounded-xl border border-slate-200 p-6">
                    <h3 className="text-lg font-semibold text-slate-800 mb-4">Action Items & Suggestions</h3>
                    <div className="space-y-3">
                      {studentPTMHistory.length > 0 ? (
                        studentPTMHistory.flatMap(r => r.actionItems).map((item, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-orange-50 border border-orange-100 rounded-lg">
                            <div className="w-6 h-6 bg-orange-200 rounded-full flex items-center justify-center flex-shrink-0">
                              <svg className="w-3 h-3 text-orange-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                              </svg>
                            </div>
                            <p className="text-sm text-slate-800">{item}</p>
                          </div>
                        ))
                      ) : (
                        <p className="text-slate-500 text-sm">No pending suggestions or action items.</p>
                      )}

                      {/* Add New Suggestion */}
                      <div className="mt-6 pt-6 border-t border-slate-100">
                        <label className="block text-sm font-medium text-slate-700 mb-2">Add New Note</label>
                        <textarea
                          className="w-full p-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-orange-500 focus:outline-none text-sm"
                          rows="3"
                          placeholder="Type a new suggestion for the next meeting..."
                        ></textarea>
                        <button className="mt-3 px-5 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white text-sm font-medium rounded-lg transition-colors">
                          Add Note
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-16 bg-white rounded-xl border border-slate-200">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Student Selected</h3>
              <p className="text-slate-500 text-sm">Select a student from the list to view their PTM history.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PTMHistoryPage;
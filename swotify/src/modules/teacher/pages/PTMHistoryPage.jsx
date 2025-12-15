import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import mockPTMHistory from '../../../data/mockPTMHistory';

const PTMHistoryPage = () => {
  const { ptmId } = useParams(); // Optional: if deep linking to a specific PTM
  const navigate = useNavigate();
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [activeTab, setActiveTab] = useState('history'); // history, performance, suggestions
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);

  // Flatten students from all classes for the sidebar list
  const allStudents = mockClasses.flatMap(classData => 
    classData.students.map(student => ({
      ...student,
      className: classData.className,
      grade: classData.grade,
      section: classData.section
    }))
  );

  // Filter PTM history for the selected student
  const studentPTMHistory = selectedStudent 
    ? mockPTMHistory.filter(record => record.studentId === selectedStudent.id)
    : [];

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

  useEffect(() => {
    // If a ptmId is provided in URL, try to find that student
    if (ptmId) {
        const record = mockPTMHistory.find(r => r.id === ptmId);
        if (record) {
            const student = allStudents.find(s => s.id === record.studentId);
            if (student) setSelectedStudent(student);
        }
    } else if (allStudents.length > 0 && !selectedStudent) {
        // Default to first student if none selected
        setSelectedStudent(allStudents[0]);
    }
  }, [ptmId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            PTM History & Management
          </h1>
          <p className="text-slate-600 text-sm font-medium">
            Manage Parent-Teacher Meetings, view history, and record sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Sidebar - Student List (Switching Button area) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-4 sticky top-6">
              <h2 className="text-lg font-semibold text-slate-900 mb-4 px-2">Select Student</h2>
              <div className="space-y-2 max-h-[600px] overflow-y-auto custom-scrollbar">
                {allStudents.map((student) => (
                  <button
                    key={student.id}
                    onClick={() => setSelectedStudent(student)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all border-2 text-left ${
                      selectedStudent?.id === student.id
                        ? 'bg-blue-50 border-blue-200 shadow-sm'
                        : 'hover:bg-slate-50 border-transparent hover:border-slate-100'
                    }`}
                  >
                    <img
                      src={student.photo}
                      alt={student.name}
                      className={`w-10 h-10 rounded-full object-cover border-2 ${selectedStudent?.id === student.id ? 'border-blue-400' : 'border-gray-200'}`}
                    />
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${selectedStudent?.id === student.id ? 'text-blue-700' : 'text-slate-700'}`}>{student.name}</p>
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
                <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6 flex flex-col md:flex-row justify-between items-center gap-6">
                  <div className="flex items-center gap-5">
                    <img
                      src={selectedStudent.photo}
                      alt={selectedStudent.name}
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                    />
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">{selectedStudent.name}</h2>
                      <p className="text-slate-600 font-medium">Parents: {selectedStudent.details.parents}</p>
                      <p className="text-slate-500 text-sm">{selectedStudent.details.email}</p>
                    </div>
                  </div>
                  
                  {/* Recording Button */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={handleRecordToggle}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white shadow-lg transition-all hover:scale-105 ${
                        isRecording 
                          ? 'bg-gradient-to-r from-red-500 to-rose-600 animate-pulse' 
                          : 'bg-gradient-to-r from-emerald-500 to-teal-500'
                      }`}
                    >
                      {isRecording ? (
                        <>
                          <span className="w-3 h-3 bg-white rounded-full animate-ping"></span>
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
                    {isRecording && <p className="text-xs text-red-500 font-semibold">Recording in progress...</p>}
                  </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-4 border-b border-slate-200 pb-1">
                  {['history', 'performance', 'suggestions'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 text-sm font-bold capitalize transition-colors relative ${
                        activeTab === tab ? 'text-blue-600' : 'text-slate-500 hover:text-slate-700'
                      }`}
                    >
                      {tab === 'history' ? 'History & Summary' : tab}
                      {activeTab === tab && (
                        <div className="absolute bottom-[-5px] left-0 w-full h-1 bg-blue-600 rounded-full"></div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  {activeTab === 'history' && (
                    <div className="space-y-4">
                      {studentPTMHistory.length > 0 ? (
                        studentPTMHistory.map((record) => (
                          <div key={record.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-start mb-4">
                              <div>
                                <h3 className="text-lg font-bold text-slate-900 mb-1">PTM Date: {record.date}</h3>
                                <p className="text-sm text-slate-500">Conducted by: {record.teacher}</p>
                              </div>
                              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-lg border border-blue-100">Completed</span>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Summary & Discussion</h4>
                                <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                                  {record.discussionPoints.map((point, i) => (
                                    <li key={i}>{point}</li>
                                  ))}
                                </ul>
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-2">Teacher's Note</h4>
                                <p className="text-sm text-slate-600 italic bg-slate-50 p-3 rounded-lg border border-slate-100">
                                  "{record.performanceSummary.teacherComment}"
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 border-dashed">
                          <p className="text-slate-500 font-medium">No previous PTM records found for this student.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {activeTab === 'performance' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-xl border border-emerald-100 shadow-sm">
                        <h4 className="text-emerald-800 font-bold mb-2">Current Grade</h4>
                        <p className="text-4xl font-bold text-emerald-600">{selectedStudent.details.grade}</p>
                      </div>
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100 shadow-sm">
                        <h4 className="text-blue-800 font-bold mb-2">Attendance</h4>
                        <p className="text-4xl font-bold text-blue-600">{selectedStudent.details.attendance}</p>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-fuchsia-50 p-6 rounded-xl border border-purple-100 shadow-sm">
                        <h4 className="text-purple-800 font-bold mb-2">Assignments</h4>
                        <p className="text-4xl font-bold text-purple-600">{selectedStudent.assignments?.length || 0}</p>
                        <p className="text-xs text-purple-700 mt-1">Total assignments submitted</p>
                      </div>
                      
                      <div className="md:col-span-3 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h4 className="text-slate-900 font-bold mb-4">Latest Performance Summary</h4>
                        {studentPTMHistory.length > 0 ? (
                           <div className="grid grid-cols-2 gap-4">
                             {Object.entries(studentPTMHistory[0].performanceSummary)
                               .filter(([key]) => key.includes('Score'))
                               .map(([key, value]) => (
                                 <div key={key} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                                   <span className="text-sm font-semibold capitalize text-slate-700">{key.replace('Score', '')}</span>
                                   <span className="text-sm font-bold text-slate-900">{value}</span>
                                 </div>
                               ))
                             }
                           </div>
                        ) : (
                          <p className="text-slate-500 text-sm">No recent performance data linked to PTMs.</p>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'suggestions' && (
                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-6">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">Action Items & Suggestions</h3>
                      <div className="space-y-4">
                        {studentPTMHistory.length > 0 ? (
                          studentPTMHistory.flatMap(r => r.actionItems).map((item, index) => (
                            <div key={index} className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl">
                              <div className="w-6 h-6 bg-amber-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                <svg className="w-4 h-4 text-amber-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                              </div>
                              <p className="text-sm font-medium text-amber-900">{item}</p>
                            </div>
                          ))
                        ) : (
                          <p className="text-slate-500 text-sm">No pending suggestions or action items.</p>
                        )}
                        
                        {/* Add New Suggestion Input */}
                        <div className="mt-6 pt-6 border-t border-slate-100">
                          <label className="block text-sm font-bold text-slate-700 mb-2">Add New Note/Suggestion</label>
                          <textarea 
                            className="w-full p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm" 
                            rows="3"
                            placeholder="Type a new suggestion for the next meeting..."
                          ></textarea>
                          <button className="mt-3 px-6 py-2 bg-slate-900 text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors">
                            Add Note
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-slate-200 border-dashed">
                <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900">No Student Selected</h3>
                <p className="text-slate-500">Please select a student from the list to view their PTM history.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
      `}</style>
    </div>
  );
};

export default PTMHistoryPage;
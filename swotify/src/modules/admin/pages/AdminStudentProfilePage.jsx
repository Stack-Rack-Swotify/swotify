import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import YearWisePerformanceTrends from '../components/YearWisePerformanceTrends';

const AdminStudentProfilePage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [classInfo, setClassInfo] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    let foundStudent = null;
    let foundClass = null;

    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) {
        foundClass = classData;
        break;
      }
    }

    setStudent(foundStudent);
    setClassInfo(foundClass);
  }, [studentId]);

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Student Not Found</h3>
        <p className="text-slate-500 text-sm mb-4">The student you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate(-1)}
          className="px-4 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-lg text-sm font-medium"
        >
          Go Back
        </button>
      </div>
    );
  }

  const totalAssignments = student.assignments?.length || 0;
  const completedAssignments = student.assignments?.filter(a => a.grade !== null).length || 0;
  const averageGrade = totalAssignments > 0
    ? (student.assignments.reduce((sum, a) => sum + (a.grade || 0), 0) / completedAssignments).toFixed(1)
    : 'N/A';
  const attendance = student.details?.attendance || 'N/A';

  const tabs = [
    { id: 'overview', name: 'Overview' },
    { id: 'academics', name: 'Academics' },
    { id: 'attendance', name: 'Attendance' },
    { id: 'performance', name: 'Performance' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Students
        </button>
        <div className="flex items-center gap-2">
          <button className="px-4 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-lg text-sm font-medium flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Edit
          </button>
        </div>
      </div>

      {/* Student Profile Card */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-4 -mt-12">
            <img
              src={student.photo}
              alt={student.name}
              className="w-24 h-24 rounded-xl object-cover border-4 border-white shadow-lg"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-800">{student.name}</h1>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-medium">
                  {classInfo?.className || 'N/A'}
                </span>
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                  ID: {student.id}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${student.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                  {student.status || 'Active'}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="text-xs text-slate-500 mb-1">Avg Grade</p>
              <p className="text-2xl font-bold text-blue-600">{averageGrade}</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 border border-green-100">
              <p className="text-xs text-slate-500 mb-1">Attendance</p>
              <p className="text-2xl font-bold text-green-600">{attendance}</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <p className="text-xs text-slate-500 mb-1">Assignments</p>
              <p className="text-2xl font-bold text-purple-600">{completedAssignments}/{totalAssignments}</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
              <p className="text-xs text-slate-500 mb-1">Rank</p>
              <p className="text-2xl font-bold text-orange-600">#{Math.floor(Math.random() * 20) + 1}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-lg w-fit">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${activeTab === tab.id
              ? 'bg-white text-slate-800 shadow-sm'
              : 'text-slate-500 hover:text-slate-700'
              }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Personal Information</h2>
            <div className="space-y-3">
              {[
                { label: 'Email', value: student.details?.email || 'N/A' },
                { label: 'Phone', value: student.details?.phone || 'N/A' },
                { label: 'Address', value: student.details?.address || 'N/A' },
                { label: 'Parent/Guardian', value: student.details?.parents || 'N/A' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <span className="text-sm text-slate-500">{item.label}</span>
                  <span className="text-sm font-medium text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Academic Overview */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">Academic Overview</h2>
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                <p className="text-sm text-slate-600 mb-1">Current GPA</p>
                <p className="text-3xl font-bold text-blue-600">
                  {averageGrade !== 'N/A' ? (averageGrade / 10).toFixed(2) : 'N/A'}
                  <span className="text-lg text-blue-400">/10</span>
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                  <p className="text-xs text-slate-500 mb-1">Completed</p>
                  <p className="text-2xl font-bold text-green-600">{completedAssignments}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
                  <p className="text-xs text-slate-500 mb-1">Pending</p>
                  <p className="text-2xl font-bold text-purple-600">{totalAssignments - completedAssignments}</p>
                </div>
              </div>
              <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-slate-600">Completion Rate</p>
                  <p className="text-sm font-medium text-orange-600">
                    {totalAssignments > 0 ? ((completedAssignments / totalAssignments) * 100).toFixed(1) : 0}%
                  </p>
                </div>
                <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'academics' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Academic Records</h2>
          {student.assignments && student.assignments.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    {['Assignment', 'Grade', 'Max', '%', 'Status'].map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {student.assignments.map((assignment, index) => {
                    const percentage = assignment.grade ? ((assignment.grade / assignment.maxGrade) * 100).toFixed(1) : 'N/A';
                    return (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-800">{assignment.name}</td>
                        <td className="px-4 py-3 text-sm text-blue-600 font-medium">{assignment.grade ?? '-'}</td>
                        <td className="px-4 py-3 text-sm text-slate-500">{assignment.maxGrade}</td>
                        <td className="px-4 py-3 text-sm font-medium">
                          <span className={
                            percentage !== 'N/A' && parseFloat(percentage) >= 90 ? 'text-green-600' :
                              percentage !== 'N/A' && parseFloat(percentage) >= 75 ? 'text-blue-600' :
                                percentage !== 'N/A' && parseFloat(percentage) >= 50 ? 'text-orange-600' : 'text-red-600'
                          }>
                            {percentage !== 'N/A' ? `${percentage}%` : 'N/A'}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${assignment.grade !== null ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                            }`}>
                            {assignment.grade !== null ? 'Graded' : 'Pending'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-500 text-sm">No assignments yet</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'attendance' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Attendance Records</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-5 border border-green-100">
              <p className="text-sm text-slate-600 mb-1">Overall Attendance</p>
              <p className="text-3xl font-bold text-green-600">{attendance}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-5 border border-blue-100">
              <p className="text-sm text-slate-600 mb-1">Days Present</p>
              <p className="text-3xl font-bold text-blue-600">{Math.floor(Math.random() * 150) + 100}</p>
              <p className="text-xs text-slate-500 mt-1">Out of 180 days</p>
            </div>
            <div className="bg-red-50 rounded-lg p-5 border border-red-100">
              <p className="text-sm text-slate-600 mb-1">Days Absent</p>
              <p className="text-3xl font-bold text-red-600">{Math.floor(Math.random() * 20) + 5}</p>
              <p className="text-xs text-slate-500 mt-1">Including sick leaves</p>
            </div>
          </div>
          <div className="text-center py-8 bg-slate-50 rounded-lg">
            <p className="text-slate-500 text-sm">Detailed attendance calendar coming soon</p>
          </div>
        </div>
      )}

      {activeTab === 'performance' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Performance Trends</h2>
          <YearWisePerformanceTrends studentsData={[student]} classPerformance={{}} />
        </div>
      )}
    </div>
  );
};

export default AdminStudentProfilePage;

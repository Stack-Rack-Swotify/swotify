import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import StudentProfile from '../../student/components/StudentProfile'; // Reusable StudentProfile component

const TeacherStudentProfilePage = () => {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [classInfo, setClassInfo] = useState(null);

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
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200/60 p-12 text-center max-w-md">
          <div className="relative inline-block mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-full blur-xl opacity-20"></div>
            <div className="relative w-28 h-28 bg-gradient-to-br from-rose-50 to-pink-50 rounded-full flex items-center justify-center border-2 border-rose-200 shadow-lg">
              <svg className="w-14 h-14 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-2xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Student Not Found
          </h3>
          <p className="text-slate-600 mb-8 font-medium">The student you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-6 py-3 bg-white text-slate-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-x-1 flex items-center gap-2 border border-slate-200/60 font-semibold hover:text-slate-900 hover:border-purple-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Students
        </button>

        {/* Student Profile Component */}
        <StudentProfile student={student} />
      </div>
    </div>
  );
};

export default TeacherStudentProfilePage;

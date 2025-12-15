import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses';
import StudentProfile from '../components/StudentProfile'; // Reusing the component

const MyProfilePage = ({ studentId = 's1' }) => {
  const [student, setStudent] = useState(null);

  useEffect(() => {
    let foundStudent = null;
    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) break;
    }
    setStudent(foundStudent);
  }, [studentId]);

  if (!student) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-slate-200 dark:border-gray-700 p-12 text-center relative overflow-hidden">
          {/* Decorative Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-orange-500/5 to-amber-500/5"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-rose-500/10 to-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative">
            {/* Premium Icon */}
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-3xl animate-pulse"></div>
              <div className="relative w-full h-full bg-gradient-to-br from-rose-50 to-orange-50 dark:from-rose-900/20 dark:to-orange-900/20 rounded-3xl flex items-center justify-center border-2 border-rose-300 dark:border-rose-700 shadow-xl">
                <svg className="w-12 h-12 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
            </div>

            {/* Text Content */}
            <p className="text-2xl text-slate-900 dark:text-gray-100 font-semibold mb-3">Profile Not Found</p>
            <p className="text-slate-600 dark:text-gray-400 text-base leading-relaxed">
              Student profile not found or you are not logged in.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <StudentProfile student={student} />
  );
};

export default MyProfilePage;
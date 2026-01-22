import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses';
import StudentProfile from '../components/StudentProfile';

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
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="section-card p-12 text-center max-w-md animate-fade-in">
          {/* Decorative Background */}
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-[#ea580c] rounded-full blur-xl opacity-20 animate-pulse-glow"></div>
            <div className="relative w-24 h-24 mx-auto bg-[#334155] rounded-full flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-[#ea580c] mb-3">Profile Not Found</h3>
          <p className="text-slate-500 font-medium">Student profile not found or you are not logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-[#ea580c] rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#ea580c]">My Profile</h1>
          <p className="text-slate-500 text-sm">View and manage your personal information</p>
        </div>
      </div>

      {/* Profile Component */}
      <StudentProfile student={student} />
    </div>
  );
};

export default MyProfilePage;
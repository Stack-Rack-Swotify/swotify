import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses';
import StudentProfile from '../components/StudentProfile'; // Reusing the component

const MyProfilePage = () => {
  const studentId = 's1'; 
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
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#0EA5E9]/10 to-[#0F172A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-xl text-[#0F172A] font-semibold mb-2">Profile Not Found</p>
          <p className="text-[#64748B]">Student profile not found or you are not logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <StudentProfile student={student} />
  );
};

export default MyProfilePage;

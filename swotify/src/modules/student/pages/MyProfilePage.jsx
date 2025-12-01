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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-[#ff7300]/10 to-[#9000ff]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-xl text-gray-800 font-semibold mb-2">Profile Not Found</p>
          <p className="text-[#827979]">Student profile not found or you are not logged in.</p>
        </div>
      </div>
    );
  }

  return (
    <StudentProfile student={student} />
  );
};

export default MyProfilePage;
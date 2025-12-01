import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';
import StudentProfile from '../../student/components/StudentProfile'; // Reusable StudentProfile component

const TeacherStudentProfilePage = () => {
  const { studentId } = useParams();
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
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">Student not found.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <Link 
        to="/teacher-dashboard/all-students" 
        className="inline-flex items-center gap-2 text-[#827979] hover:text-[#ff7300] mb-6 transition-colors font-medium"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to All Students
      </Link>
      <StudentProfile student={student} />
    </div>
  );
};

export default TeacherStudentProfilePage;
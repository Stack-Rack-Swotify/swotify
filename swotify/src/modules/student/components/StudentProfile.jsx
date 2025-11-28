import React from 'react';
import StudentMarks from './StudentMarks'; // Import StudentMarks
import PerformanceAnalysis from './PerformanceAnalysis'; // Import PerformanceAnalysis

const StudentProfile = () => {
  const dummyStudentData = {
    name: "John Doe",
    studentId: "SWT-001-2025",
    email: "john.doe@example.com",
    program: "Computer Science",
    year: "3rd Year",
    gpa: 3.8,
    enrollmentDate: "September 1, 2023",
    contact: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    profilePicture: "https://images.unsplash.com/photo-1542838188-f5e6a0d4a9f2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Generic student placeholder image
    bio: "A motivated computer science student with a passion for web development and artificial intelligence. Enjoys problem-solving and collaborating on innovative projects.",
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg text-gray-800">
      <h3 className="text-2xl font-bold mb-6">Student Profile</h3>
      
      <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
        <div className="flex-shrink-0">
          <img
            className="h-32 w-32 rounded-full object-cover shadow-md"
            src={dummyStudentData.profilePicture}
            alt="Student Profile"
          />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h4 className="text-xl font-semibold">{dummyStudentData.name}</h4>
          <p className="text-gray-600">Student ID: {dummyStudentData.studentId}</p>
          <p className="text-gray-600">Program: {dummyStudentData.program} ({dummyStudentData.year})</p>
          <p className="text-gray-600">GPA: {dummyStudentData.gpa}</p>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Email:</p>
            <p className="text-gray-600">{dummyStudentData.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            <p className="text-gray-600">{dummyStudentData.contact}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium">Address:</p>
            <p className="text-gray-600">{dummyStudentData.address}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <h4 className="text-xl font-semibold mb-4">Additional Information</h4>
        <p className="font-medium">Enrollment Date:</p>
        <p className="text-gray-600">{dummyStudentData.enrollmentDate}</p>
        <p className="font-medium mt-4">Bio:</p>
        <p className="text-gray-600">{dummyStudentData.bio}</p>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-8">
        <h4 className="text-xl font-semibold mb-4">Academic Overview</h4>
        <p className="text-gray-600 mb-6">
          Here's a comprehensive overview of {dummyStudentData.name}'s academic performance and marks.
        </p>
        <div className="space-y-8">
          <StudentMarks />
          <PerformanceAnalysis />
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

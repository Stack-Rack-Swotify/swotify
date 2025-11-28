import React from 'react';


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
    <div className="p-4 bg-teal-900 rounded-xl shadow-lg text-gray-100">
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
          <p className="text-gray-300">Student ID: {dummyStudentData.studentId}</p>
          <p className="text-gray-300">Program: {dummyStudentData.program} ({dummyStudentData.year})</p>
          <p className="text-gray-300">GPA: {dummyStudentData.gpa}</p>
        </div>
      </div>

      <div className="mt-8 border-t border-teal-800 pt-8">
        <h4 className="text-xl font-semibold mb-4">Contact Information</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-medium">Email:</p>
            <p className="text-gray-300">{dummyStudentData.email}</p>
          </div>
          <div>
            <p className="font-medium">Phone:</p>
            <p className="text-gray-300">{dummyStudentData.contact}</p>
          </div>
          <div className="md:col-span-2">
            <p className="font-medium">Address:</p>
            <p className="text-gray-300">{dummyStudentData.address}</p>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-teal-800 pt-8">
        <h4 className="text-xl font-semibold mb-4">Additional Information</h4>
        <p className="font-medium">Enrollment Date:</p>
        <p className="text-gray-300">{dummyStudentData.enrollmentDate}</p>
        <p className="font-medium mt-4">Bio:</p>
        <p className="text-gray-300">{dummyStudentData.bio}</p>
      </div>

      <div className="mt-8 border-t border-teal-800 pt-8">
        <h4 className="text-xl font-semibold mb-4">Performance Summary</h4>
        <p className="text-gray-300">
          Based on recent data, {dummyStudentData.name} consistently performs well in core subjects, particularly with a strong GPA of {dummyStudentData.gpa}.
          Attendance has been excellent, maintaining a high percentage throughout the semester, contributing positively to overall engagement.
          While there was a slight dip in Physics last month, a strong upward trend is observed in Mathematics and Chemistry.
          The overall academic trajectory is positive, indicating consistent effort and good grasp of subject matter.
        </p>
      </div>
    </div>
  );
};

export default StudentProfile;

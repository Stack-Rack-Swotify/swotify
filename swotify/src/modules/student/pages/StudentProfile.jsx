import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses'; // Import the mock data

const StudentProfile = () => {
  // For demonstration, let's assume a student with ID 's1' is logged in
  // In a real application, this ID would come from user authentication context
  const studentId = 's1'; 
  const [student, setStudent] = useState(null);

  useEffect(() => {
    let foundStudent = null;
    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) {
        break;
      }
    }
    setStudent(foundStudent);
  }, [studentId]);

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">Student profile not found or you are not logged in.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/student-dashboard" className="text-blue-600 hover:underline mb-4 block">
        &larr; Back to Dashboard
      </Link>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">My Profile</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <img
          src={student.photo}
          alt={student.name}
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-300 flex-shrink-0"
        />
        <div className="text-center md:text-left">
          <h2 className="text-3xl font-bold text-gray-800">{student.name}</h2>
          <p className="text-gray-600 text-lg">{student.details.email}</p>
          <p className="text-gray-700 mt-2">
            <span className="font-semibold">Current Grade:</span> {student.details.grade}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Attendance:</span> {student.details.attendance}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Parents/Guardians:</span> {student.details.parents}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Assignments & Grades</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Assignment
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  My Grade
                </th>
              </tr>
            </thead>
            <tbody>
              {student.assignments.map(assignment => (
                <tr key={assignment.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                    {assignment.name}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                    {assignment.dueDate}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                    {assignment.grade !== null ? `${assignment.grade}/${assignment.maxGrade}` : 'Awaiting Grade'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses'; // Import the mock data

const StudentProfile = () => {
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
      <div className="min-h-screen bg-black/20 backdrop-blur-lg flex items-center justify-center rounded-xl p-4">
        <p className="text-xl text-white">
          Student profile not found or you are not logged in.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-4">
      {/* Header */}
      <h1 className="text-4xl font-bold text-white mb-6">My Profile</h1>

      {/* Profile Card */}
      <div className="bg-black/20 backdrop-blur-lg rounded-lg shadow-md p-6 mb-8 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
        <img
          src={student.photo}
          alt={student.name}
          className="w-40 h-40 rounded-full object-cover border-4 border-blue-500 flex-shrink-0"
        />
        <div className="text-center md:text-left space-y-2">
          <h2 className="text-3xl font-bold text-white">{student.name}</h2>
          <p className="text-gray-300 text-lg">{student.details.email}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <p className="text-gray-200">
              <span className="font-semibold">Current Grade:</span> {student.details.grade}
            </p>
            <p className="text-gray-200">
              <span className="font-semibold">Attendance:</span> {student.details.attendance}
            </p>
            <p className="text-gray-200">
              <span className="font-semibold">Parents/Guardians:</span> {student.details.parents}
            </p>
            <p className="text-gray-200">
              <span className="font-semibold">Student ID:</span> {student.id}
            </p>
          </div>
        </div>
      </div>

      {/* Exam Performance Section */}
      <div className="bg-black/20 backdrop-blur-lg rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Exam Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-600 bg-gray-700 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-600 bg-gray-700 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                  Exam Date
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-600 bg-gray-700 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody>
              {student.exams.map((exam) => (
                <tr key={exam.id} className="hover:bg-gray-700 transition">
                  <td className="px-4 py-2 whitespace-nowrap text-sm font-medium text-white">
                    {exam.subject}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                    {exam.date}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-300">
                    {exam.score}/{exam.maxScore}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="bg-black/20 backdrop-blur-lg rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-white mb-4">Achievements</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-2">
          {student.achievements.map((achievement, index) => (
            <li key={index}>{achievement}</li>
          ))}
        </ul>
      </div>

      {/* Future Summary Section */}
      <div className="bg-black/20 backdrop-blur-lg rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-white mb-4">Future Summary</h2>
        <p className="text-gray-300 leading-relaxed">
          {student.futureSummary}
        </p>
      </div>
    </div>
  );
};

export default StudentProfile;
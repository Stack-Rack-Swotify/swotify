// swotify/src/modules/student/components/StudentMarks.jsx
import React from 'react';

const StudentMarks = () => {
  // Dummy data for student marks
  const dummyMarks = [
    { id: 1, subject: 'Mathematics', score: 88, grade: 'B+', semester: 'Fall 2025' },
    { id: 2, subject: 'Physics', score: 72, grade: 'C', semester: 'Fall 2025' },
    { id: 3, subject: 'Chemistry', score: 91, grade: 'A-', semester: 'Fall 2025' },
    { id: 4, subject: 'Biology', score: 85, grade: 'B', semester: 'Fall 2025' },
    { id: 5, subject: 'Computer Science', score: 79, grade: 'C+', semester: 'Fall 2025' },
    { id: 6, subject: 'English Literature', score: 95, grade: 'A', semester: 'Fall 2025' },
  ];

  return (
    <div className="p-4 bg-white rounded-xl shadow-lg transform hover:scale-105 hover:shadow-2xl transition-all duration-300">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Student Marks</h3>
      <p className="text-gray-600 mb-6">All your academic marks and grades will be listed here.</p>
      
      {dummyMarks.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Semester</th>
              </tr>
            </thead>
            <tbody>
              {dummyMarks.map((mark) => (
                <tr key={mark.id} className="border-b border-gray-200 last:border-b-0 hover:bg-gray-50">
                  <td className="py-3 px-4 whitespace-nowrap text-gray-800">{mark.subject}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-gray-800">{mark.score}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-gray-800">{mark.grade}</td>
                  <td className="py-3 px-4 whitespace-nowrap text-gray-800">{mark.semester}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-600">No marks data available yet.</p>
        </div>
      )}
    </div>
  );
};

export default StudentMarks;

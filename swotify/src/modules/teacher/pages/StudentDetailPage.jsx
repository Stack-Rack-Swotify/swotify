import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import mockClasses from '../../../data/mockClasses';

const StudentDetailPage = () => {
  const { studentId } = useParams();
  const [student, setStudent] = useState(null);
  const [grades, setGrades] = useState({});
  const [saveStatus, setSaveStatus] = useState('');

  useEffect(() => {
    // Find the student across all classes
    let foundStudent = null;
    for (const classData of mockClasses) {
      foundStudent = classData.students.find(s => s.id === studentId);
      if (foundStudent) {
        break;
      }
    }

    if (foundStudent) {
      setStudent(foundStudent);
      const initialGrades = {};
      foundStudent.assignments.forEach(assignment => {
        initialGrades[assignment.id] = assignment.grade !== null ? assignment.grade : '';
      });
      setGrades(initialGrades);
    }
  }, [studentId]);

  const handleGradeChange = (assignmentId, value) => {
    setGrades(prevGrades => ({
      ...prevGrades,
      [assignmentId]: value,
    }));
  };

  const handleSaveGrades = () => {
    setSaveStatus('Saving...');
    // Simulate API call or data update
    setTimeout(() => {
      console.log('Grades saved for student', studentId, ':', grades);
      setSaveStatus('Grades saved successfully!');
      // In a real app, you would update the backend and potentially refresh local data
    }, 1500);
  };

  if (!student) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-xl text-gray-700">Student not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Link to="/teacher/class" className="text-blue-600 hover:underline mb-4 block">
        &larr; Back to Class Page
      </Link>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Student Details</h1>

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
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Assignments & Grades</h2>
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
                  Current Grade
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Enter Grade
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
                    {assignment.grade !== null ? `${assignment.grade}/${assignment.maxGrade}` : 'N/A'}
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-600">
                    <input
                      type="number"
                      min="0"
                      max={assignment.maxGrade}
                      value={grades[assignment.id]}
                      onChange={(e) => handleGradeChange(assignment.id, e.target.value)}
                      className="w-24 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex items-center space-x-4">
          <button
            onClick={handleSaveGrades}
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            Save Grades
          </button>
          {saveStatus && (
            <p className={`text-sm ${saveStatus.includes('successfully') ? 'text-green-600' : 'text-gray-600'}`}>
              {saveStatus}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDetailPage;
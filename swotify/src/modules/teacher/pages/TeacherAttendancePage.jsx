import React, { useState, useEffect } from 'react';
import mockClasses from '../../../data/mockClasses';

const TeacherAttendancePage = () => {
  const [selectedClassId, setSelectedClassId] = useState('');
  const [currentClassStudents, setCurrentClassStudents] = useState([]);
  const [attendance, setAttendance] = useState({}); // { studentId: { date: status } }
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));

  useEffect(() => {
    // Flatten all students from all classes initially to get all possible student IDs
    const allStudents = mockClasses.flatMap(classData =>
      classData.students.map(student => ({
        ...student,
        classId: classData.id,
        className: classData.className,
      }))
    );

    // Load attendance from local storage or initialize
    const storedAttendance = JSON.parse(localStorage.getItem('attendance')) || {};
    setAttendance(storedAttendance);

    // Set initial selected class if available
    if (mockClasses.length > 0) {
      setSelectedClassId(mockClasses[0].id);
    }
  }, []);

  useEffect(() => {
    const classData = mockClasses.find(c => c.id === selectedClassId);
    if (classData) {
      setCurrentClassStudents(classData.students);
    } else {
      setCurrentClassStudents([]);
    }
  }, [selectedClassId]);

  const handleMarkAttendance = (studentId, status) => {
    setAttendance(prevAttendance => {
      const newAttendance = {
        ...prevAttendance,
        [studentId]: {
          ...prevAttendance[studentId],
          [selectedDate]: status,
        },
      };
      localStorage.setItem('attendance', JSON.stringify(newAttendance));
      return newAttendance;
    });
  };

  const getAttendanceStatus = (studentId) => {
    return attendance[studentId]?.[selectedDate] || 'unmarked';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Attendance</h1>
          <p className="text-[#827979] text-sm">Mark daily attendance for your students</p>
        </div>

        {/* Controls: Class Selector and Date Picker */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Class Selector */}
            <div>
              <label htmlFor="class-select" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Class
              </label>
              <select
                id="class-select"
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] transition-all duration-200 text-gray-800 bg-white"
              >
                {mockClasses.map(classItem => (
                  <option key={classItem.id} value={classItem.id}>
                    {classItem.className}
                  </option>
                ))}
              </select>
            </div>

            {/* Date Picker */}
            <div>
              <label htmlFor="date-picker" className="block text-sm font-semibold text-gray-700 mb-2">
                Select Date
              </label>
              <input
                type="date"
                id="date-picker"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9000ff]/50 focus:border-[#9000ff] transition-all duration-200 text-gray-800 bg-white"
              />
            </div>
          </div>
        </div>

        {/* Student List for Attendance */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Students in {mockClasses.find(c => c.id === selectedClassId)?.className}</h2>
          
          {currentClassStudents.length > 0 ? (
            <div className="space-y-4">
              {currentClassStudents.map(student => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center">
                    <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-full object-cover mr-4" />
                    <span className="font-medium text-gray-800">{student.name}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleMarkAttendance(student.id, 'present')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        getAttendanceStatus(student.id) === 'present'
                          ? 'bg-green-500 text-white'
                          : 'bg-green-100 text-green-700 hover:bg-green-200'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleMarkAttendance(student.id, 'absent')}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        getAttendanceStatus(student.id) === 'absent'
                          ? 'bg-red-500 text-white'
                          : 'bg-red-100 text-red-700 hover:bg-red-200'
                      }`}
                    >
                      Absent
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600 text-center py-4">No students in this class.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeacherAttendancePage;
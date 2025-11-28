// src/data/mockClasses.js
const mockClasses = [
  {
    id: 'class1',
    className: 'Grade 10 - Section A',
    totalStudents: 4,
    classPerformance: {
      averageScore: 82.5,
      highestScore: 95,
      lowestScore: 60,
      passRate: '92%',
    },
    students: [
      {
        id: 's1',
        name: 'Alice Johnson',
        photo: 'https://via.placeholder.com/150/FF69B4/FFFFFF?text=AJ',
        details: {
          email: 'alice.j@school.com',
          grade: 'A',
          attendance: '95%',
          parents: 'Mr. & Mrs. Johnson',
        },
        assignments: [
          { id: 'a1', name: 'Math Homework 1', dueDate: '2025-10-20', grade: 85, maxGrade: 100 },
          { id: 'a2', name: 'Science Project', dueDate: '2025-11-05', grade: 92, maxGrade: 100 },
          { id: 'a3', name: 'History Essay', dueDate: '2025-11-15', grade: null, maxGrade: 100 }, // No grade yet
        ],
      },
      {
        id: 's2',
        name: 'Bob Williams',
        photo: 'https://via.placeholder.com/150/8A2BE2/FFFFFF?text=BW',
        details: {
          email: 'bob.w@school.com',
          grade: 'B+',
          attendance: '88%',
          parents: 'Mr. & Mrs. Williams',
        },
        assignments: [
          { id: 'a1', name: 'Math Homework 1', dueDate: '2025-10-20', grade: 70, maxGrade: 100 },
          { id: 'a2', name: 'Science Project', dueDate: '2025-11-05', grade: 80, maxGrade: 100 },
        ],
      },
      {
        id: 's3',
        name: 'Charlie Brown',
        photo: 'https://via.placeholder.com/150/3CB371/FFFFFF?text=CB',
        details: {
          email: 'charlie.b@school.com',
          grade: 'C',
          attendance: '70%',
          parents: 'Mr. Brown',
        },
        assignments: [
          { id: 'a1', name: 'Math Homework 1', dueDate: '2025-10-20', grade: 60, maxGrade: 100 },
          { id: 'a3', name: 'History Essay', dueDate: '2025-11-15', grade: 65, maxGrade: 100 },
        ],
      },
      {
        id: 's4',
        name: 'Diana Prince',
        photo: 'https://via.placeholder.com/150/FFD700/FFFFFF?text=DP',
        details: {
          email: 'diana.p@school.com',
          grade: 'A-',
          attendance: '98%',
          parents: 'Ms. Prince',
        },
        assignments: [
          { id: 'a1', name: 'Math Homework 1', dueDate: '2025-10-20', grade: 90, maxGrade: 100 },
          { id: 'a2', name: 'Science Project', dueDate: '2025-11-05', grade: 95, maxGrade: 100 },
          { id: 'a3', name: 'History Essay', dueDate: '2025-11-15', grade: null, maxGrade: 100 }, // No grade yet
        ],
      },
    ],
  },
  {
    id: 'class2',
    className: 'Grade 10 - Section B',
    totalStudents: 3,
    classPerformance: {
      averageScore: 78.0,
      highestScore: 90,
      lowestScore: 55,
      passRate: '85%',
    },
    students: [
      {
        id: 's5',
        name: 'Eve Adams',
        photo: 'https://via.placeholder.com/150/DA70D6/FFFFFF?text=EA',
        details: {
          email: 'eve.a@school.com',
          grade: 'B',
          attendance: '90%',
          parents: 'Ms. Adams',
        },
        assignments: [
          { id: 'a1', name: 'Math Homework 1', dueDate: '2025-10-20', grade: 75, maxGrade: 100 },
          { id: 'a2', name: 'Science Project', dueDate: '2025-11-05', grade: 88, maxGrade: 100 },
        ],
      },
      {
        id: 's6',
        name: 'Frank White',
        photo: 'https://via.placeholder.com/150/4682B4/FFFFFF?text=FW',
        details: {
          email: 'frank.w@school.com',
          grade: 'C+',
          attendance: '80%',
          parents: 'Mr. White',
        },
        assignments: [
          { id: 'a1', name: 'Math Homework 1', dueDate: '2025-10-20', grade: 65, maxGrade: 100 },
          { id: 'a3', name: 'History Essay', dueDate: '2025-11-15', grade: 70, maxGrade: 100 },
        ],
      },
      {
        id: 's7',
        name: 'Grace Lee',
        photo: 'https://via.placeholder.com/150/FFA07A/FFFFFF?text=GL',
        details: {
          email: 'grace.l@school.com',
          grade: 'A',
          attendance: '99%',
          parents: 'Mr. & Mrs. Lee',
        },
        assignments: [
          { id: 'a1', name: 'Math Homework 1', dueDate: '2025-10-20', grade: 90, maxGrade: 100 },
          { id: 'a2', name: 'Science Project', dueDate: '2025-11-05', grade: 85, maxGrade: 100 },
        ],
      },
    ],
  },
];

export default mockClasses;
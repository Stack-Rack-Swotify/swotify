// src/data/mockClasses.js
const mockClasses = [
  {
    id: 'class1',
    grade: 'Grade 10',
    section: 'A',
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
        photo: 'https://placehold.co/150/FF69B4/FFFFFF?text=AJ',
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
        performance: {
          'Mathematics': { score: 90, trend: 'up', graphData: [65, 70, 75, 80, 90] },
          'Physics': { score: 85, trend: 'up', graphData: [70, 75, 80, 82, 85] },
          'Chemistry': { score: 78, trend: 'flat', graphData: [75, 78, 77, 78, 78] },
          'Biology': { score: 92, trend: 'up', graphData: [80, 85, 88, 90, 92] },
          'Computer Science': { score: 88, trend: 'down', graphData: [90, 89, 87, 88, 88] },
        }
      },
      {
        id: 's2',
        name: 'Bob Williams',
        photo: 'https://placehold.co/150/8A2BE2/FFFFFF?text=BW',
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
        performance: {
          'Mathematics': { score: 75, trend: 'flat', graphData: [60, 65, 70, 75, 75] },
          'Physics': { score: 80, trend: 'up', graphData: [70, 72, 75, 78, 80] },
          'Chemistry': { score: 65, trend: 'down', graphData: [75, 70, 68, 65, 65] },
          'Biology': { score: 85, trend: 'up', graphData: [75, 78, 80, 82, 85] },
          'Computer Science': { score: 92, trend: 'up', graphData: [85, 88, 90, 91, 92] },
        }
      },
      {
        id: 's3',
        name: 'Charlie Brown',
        photo: 'https://placehold.co/150/3CB371/FFFFFF?text=CB',
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
        performance: {
          'Mathematics': { score: 60, trend: 'down', graphData: [70, 68, 65, 62, 60] },
          'Physics': { score: 65, trend: 'flat', graphData: [65, 65, 64, 66, 65] },
          'Chemistry': { score: 70, trend: 'up', graphData: [60, 62, 65, 68, 70] },
          'Biology': { score: 72, trend: 'up', graphData: [65, 68, 70, 71, 72] },
          'Computer Science': { score: 80, trend: 'up', graphData: [70, 75, 78, 79, 80] },
        }
      },
      {
        id: 's4',
        name: 'Diana Prince',
        photo: 'https://placehold.co/150/FFD700/FFFFFF?text=DP',
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
        performance: {
          'Mathematics': { score: 95, trend: 'up', graphData: [85, 88, 90, 92, 95] },
          'Physics': { score: 92, trend: 'up', graphData: [85, 88, 89, 90, 92] },
          'Chemistry': { score: 88, trend: 'flat', graphData: [88, 87, 88, 88, 88] },
          'Biology': { score: 90, trend: 'up', graphData: [85, 86, 88, 89, 90] },
          'Computer Science': { score: 96, trend: 'up', graphData: [90, 92, 94, 95, 96] },
        }
      },
    ],
  },
  {
    id: 'class2',
    grade: 'Grade 10',
    section: 'B',
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
        photo: 'https://placehold.co/150/DA70D6/FFFFFF?text=EA',
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
        performance: {
          'Mathematics': { score: 78, trend: 'up', graphData: [70, 72, 75, 76, 78] },
          'Physics': { score: 75, trend: 'flat', graphData: [75, 74, 75, 75, 75] },
          'Chemistry': { score: 80, trend: 'up', graphData: [72, 75, 78, 79, 80] },
          'Biology': { score: 85, trend: 'up', graphData: [80, 82, 83, 84, 85] },
          'Computer Science': { score: 70, trend: 'down', graphData: [78, 76, 74, 72, 70] },
        }
      },
      {
        id: 's6',
        name: 'Frank White',
        photo: 'https://placehold.co/150/4682B4/FFFFFF?text=FW',
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
        performance: {
          'Mathematics': { score: 65, trend: 'flat', graphData: [65, 64, 65, 65, 65] },
          'Physics': { score: 60, trend: 'down', graphData: [68, 66, 64, 62, 60] },
          'Chemistry': { score: 70, trend: 'up', graphData: [60, 65, 68, 69, 70] },
          'Biology': { score: 72, trend: 'up', graphData: [68, 70, 71, 71, 72] },
          'Computer Science': { score: 75, trend: 'up', graphData: [65, 68, 70, 72, 75] },
        }
      },
      {
        id: 's7',
        name: 'Grace Lee',
        photo: 'https://placehold.co/150/FFA07A/FFFFFF?text=GL',
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
        performance: {
          'Mathematics': { score: 92, trend: 'up', graphData: [85, 88, 90, 91, 92] },
          'Physics': { score: 88, trend: 'flat', graphData: [88, 88, 87, 88, 88] },
          'Chemistry': { score: 90, trend: 'up', graphData: [82, 85, 88, 89, 90] },
          'Biology': { score: 95, trend: 'up', graphData: [90, 92, 93, 94, 95] },
          'Computer Science': { score: 85, trend: 'flat', graphData: [85, 84, 85, 85, 85] },
        }
      },
    ],
  },
  {
    id: 'class3',
    grade: 'Grade 11',
    section: 'A',
    className: 'Grade 11 - Section A',
    totalStudents: 2,
    classPerformance: {
      averageScore: 88.0,
      highestScore: 98,
      lowestScore: 75,
      passRate: '95%',
    },
    students: [
      {
        id: 's8',
        name: 'Henry King',
        photo: 'https://placehold.co/150/FF4500/FFFFFF?text=HK',
        details: {
          email: 'henry.k@school.com',
          grade: 'A',
          attendance: '96%',
          parents: 'Mr. King',
        },
        assignments: [
          { id: 'a4', name: 'Physics Lab 1', dueDate: '2025-10-25', grade: 95, maxGrade: 100 },
          { id: 'a5', name: 'Chemistry Project', dueDate: '2025-11-10', grade: null, maxGrade: 100 },
        ],
        performance: {
          'Mathematics': { score: 88, trend: 'flat', graphData: [88, 87, 88, 88, 88] },
          'Physics': { score: 95, trend: 'up', graphData: [85, 88, 90, 92, 95] },
          'Chemistry': { score: 90, trend: 'up', graphData: [85, 88, 89, 90, 90] },
          'Biology': { score: 85, trend: 'down', graphData: [90, 89, 88, 86, 85] },
          'Computer Science': { score: 92, trend: 'up', graphData: [85, 88, 90, 91, 92] },
        }
      },
      {
        id: 's9',
        name: 'Ivy Queen',
        photo: 'https://placehold.co/150/800080/FFFFFF?text=IQ',
        details: {
          email: 'ivy.q@school.com',
          grade: 'A-',
          attendance: '94%',
          parents: 'Ms. Queen',
        },
        assignments: [
          { id: 'a4', name: 'Physics Lab 1', dueDate: '2025-10-25', grade: 90, maxGrade: 100 },
          { id: 'a5', name: 'Chemistry Project', dueDate: '2025-11-10', grade: 88, maxGrade: 100 },
        ],
        performance: {
          'Mathematics': { score: 90, trend: 'up', graphData: [85, 88, 89, 90, 90] },
          'Physics': { score: 88, trend: 'flat', graphData: [88, 88, 88, 88, 88] },
          'Chemistry': { score: 92, trend: 'up', graphData: [85, 88, 90, 91, 92] },
          'Biology': { score: 85, trend: 'down', graphData: [88, 87, 86, 85, 85] },
          'Computer Science': { score: 94, trend: 'up', graphData: [88, 90, 92, 93, 94] },
        }
      },
    ],
  },
];

export default mockClasses;
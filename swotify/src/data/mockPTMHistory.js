// src/data/mockPTMHistory.js
const mockPTMHistory = [
  {
    id: 'ptm1',
    date: '2025-10-25',
    studentId: 's1',
    studentName: 'Alice Johnson',
    teacher: 'Mr. Smith',
    parents: 'Mr. & Mrs. Johnson',
    discussionPoints: [
      'Excellent progress in Mathematics, consistent effort.',
      'Slight dip in Science project scores, needs more focus on practical application.',
      'Positive participation in extracurricular activities.',
    ],
    performanceSummary: {
      overallGrade: 'A',
      mathScore: '92%',
      scienceScore: '78%',
      attendance: '95%',
      teacherComment: 'Alice is a diligent student with strong academic potential. Encouraged to explore advanced topics in Mathematics.',
      internshipPerformance: 'Exceeded expectations in Q3 project, demonstrated strong analytical skills and teamwork in data analysis tasks. Received positive feedback from supervisor.',
    },
    actionItems: [
      'Parents to encourage independent research for Science projects.',
      'Teacher to provide additional challenging problems in Mathematics.',
    ],
  },
  {
    id: 'ptm2',
    date: '2025-10-25',
    studentId: 's3',
    studentName: 'Charlie Brown',
    teacher: 'Mr. Smith',
    parents: 'Mr. Brown',
    discussionPoints: [
      'Struggling with comprehension in History, needs reading support.',
      'Improved participation in class discussions, but still hesitant.',
      'Good effort in Art class, showing creative talent.',
    ],
    performanceSummary: {
      overallGrade: 'C',
      historyScore: '60%',
      artScore: '85%',
      attendance: '70%',
      teacherComment: 'Charlie needs targeted support in reading comprehension for History. Positive engagement in Art is commendable.',
      internshipPerformance: 'Showed enthusiasm in creative design tasks during the internship. Needs to improve on technical documentation and meeting deadlines. Feedback noted areas for growth in structured task completion.',
    },
    actionItems: [
      'Parents to engage in daily reading practice with Charlie.',
      'Teacher to provide simplified reading materials and visual aids for History.',
    ],
  },
  {
    id: 'ptm3',
    date: '2025-04-10',
    studentId: 's2',
    studentName: 'Bob Williams',
    teacher: 'Ms. Davis',
    parents: 'Mr. & Mrs. Williams',
    discussionPoints: [
      'Consistent performance in all subjects, maintaining good grades.',
      'Areas for improvement: time management for larger assignments.',
      'Strong leadership skills demonstrated in group projects.',
    ],
    performanceSummary: {
      overallGrade: 'B+',
      mathScore: '80%',
      englishScore: '85%',
      attendance: '88%',
      teacherComment: 'Bob is a well-rounded student. Focusing on advanced planning for assignments will further enhance his academic success.',
      internshipPerformance: 'Consistently met project goals and displayed excellent problem-solving skills in software development. Proactive in seeking feedback and contributing to team discussions. Highly recommended.',
    },
    actionItems: [
      'Parents to assist Bob in creating a study schedule for major projects.',
      'Teacher to provide optional advanced assignments to challenge Bob.',
    ],
  },
];

export default mockPTMHistory;
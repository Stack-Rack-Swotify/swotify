const mockAIRecommendations = [
  {
    id: 1,
    studentId: 's1',
    studentName: 'Alice Johnson',
    category: 'Academic',
    recommendation: 'Alice shows exceptional aptitude in Mathematics. Suggest enrolling her in the Advanced Calculus workshop next semester.',
    reasoning: 'Consistent scores above 95% in Mathematics for the last two terms.',
    status: 'Pending',
    dateGenerated: '2025-11-25',
  },
  {
    id: 2,
    studentId: 's3',
    studentName: 'Charlie Brown',
    category: 'Behavioral',
    recommendation: 'Recommend a meeting with the school counselor to discuss recent attendance patterns.',
    reasoning: 'Attendance has dropped by 15% in the last month without provided medical excuses.',
    status: 'Pending',
    dateGenerated: '2025-11-26',
  },
  {
    id: 3,
    studentId: 's2',
    studentName: 'Bob Williams',
    category: 'Extracurricular',
    recommendation: 'Encourage Bob to join the Debate Club given his strong performance in English oral presentations.',
    reasoning: 'Teacher feedback highlights excellent public speaking skills.',
    status: 'Approved',
    dateGenerated: '2025-11-20',
  },
  {
    id: 4,
    studentId: 's1',
    studentName: 'Alice Johnson',
    category: 'Wellness',
    recommendation: 'Suggest a reduced workload for the upcoming week due to reported high stress levels.',
    reasoning: 'Self-reported stress indicators in weekly check-in were elevated.',
    status: 'Rejected',
    dateGenerated: '2025-11-22',
  },
  {
    id: 5,
    studentId: 's3',
    studentName: 'Charlie Brown',
    category: 'Academic',
    recommendation: 'Assign peer tutor for History assignments.',
    reasoning: 'History grades have been consistently below 65%.',
    status: 'Pending',
    dateGenerated: '2025-11-27',
  }
];

export default mockAIRecommendations;

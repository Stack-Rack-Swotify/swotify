// src/data/mockArchivedData.js

export const archivedDataByYear = {
  '2023-2024': [
    {
      id: 'arch_2324_10a',
      grade: 'Grade 10',
      section: 'A',
      className: 'Grade 10 - Section A',
      totalStudents: 5,
      classPerformance: {
        averageScore: 88.5,
        highestScore: 98,
        lowestScore: 65,
        passRate: '100%',
      },
      students: [
        {
          id: 's1',
          name: 'Alice Johnson',
          photo: 'https://placehold.co/150/FF69B4/FFFFFF?text=AJ',
          status: 'Promoted', // Currently in Grade 11
          details: { email: 'alice.j@school.com', grade: 'A', attendance: '96%' }
        },
        {
          id: 's2',
          name: 'Bob Williams',
          photo: 'https://placehold.co/150/8A2BE2/FFFFFF?text=BW',
          status: 'Promoted', // Currently in Grade 11
          details: { email: 'bob.w@school.com', grade: 'B+', attendance: '89%' }
        },
        {
          id: 's_out_1',
          name: 'Sarah Connor',
          photo: 'https://placehold.co/150/FF4500/FFFFFF?text=SC',
          status: 'Passed Out', // Graduated/Left
          details: { email: 'sarah.c@school.com', grade: 'A+', attendance: '99%' }
        },
        {
          id: 's_out_2',
          name: 'Kyle Reese',
          photo: 'https://placehold.co/150/4682B4/FFFFFF?text=KR',
          status: 'Passed Out',
          details: { email: 'kyle.r@school.com', grade: 'B', attendance: '85%' }
        },
        {
          id: 's4',
          name: 'Diana Prince',
          photo: 'https://placehold.co/150/FFD700/FFFFFF?text=DP',
          status: 'Promoted',
          details: { email: 'diana.p@school.com', grade: 'A-', attendance: '98%' }
        }
      ],
    },
    {
      id: 'arch_2324_12a',
      grade: 'Grade 12',
      section: 'A',
      className: 'Grade 12 - Section A',
      totalStudents: 3,
      classPerformance: {
        averageScore: 92.0,
        highestScore: 99,
        lowestScore: 85,
        passRate: '100%',
      },
      students: [
        {
          id: 's_out_3',
          name: 'Tony Stark',
          photo: 'https://placehold.co/150/800080/FFFFFF?text=TS',
          status: 'Passed Out',
          details: { email: 'tony.s@school.com', grade: 'A++', attendance: '90%' }
        },
        {
          id: 's_out_4',
          name: 'Steve Rogers',
          photo: 'https://placehold.co/150/DC143C/FFFFFF?text=SR',
          status: 'Passed Out',
          details: { email: 'steve.r@school.com', grade: 'A', attendance: '95%' }
        },
        {
          id: 's_out_5',
          name: 'Natasha Romanoff',
          photo: 'https://placehold.co/150/000000/FFFFFF?text=NR',
          status: 'Passed Out',
          details: { email: 'natasha.r@school.com', grade: 'A', attendance: '98%' }
        }
      ]
    }
  ],
  '2022-2023': [
    {
      id: 'arch_2223_9a',
      grade: 'Grade 9',
      section: 'A',
      className: 'Grade 9 - Section A',
      totalStudents: 4,
      classPerformance: {
        averageScore: 75.0,
        highestScore: 90,
        lowestScore: 60,
        passRate: '95%',
      },
      students: [
        {
          id: 's1', // Alice was in Grade 9 then
          name: 'Alice Johnson',
          photo: 'https://placehold.co/150/FF69B4/FFFFFF?text=AJ',
          status: 'Promoted',
          details: { email: 'alice.j@school.com', grade: 'A-', attendance: '95%' }
        },
        {
          id: 's_old_6',
          name: 'Bruce Banner',
          photo: 'https://placehold.co/150/228B22/FFFFFF?text=BB',
          status: 'Passed Out', // Left after Grade 9? Or just moved away
          details: { email: 'bruce.b@school.com', grade: 'A++', attendance: '80%' }
        }
      ]
    }
  ]
};

// Keep existing exports for compatibility if needed, or deprecate them
export const mockArchivedClasses = archivedDataByYear['2023-2024'];
export const mockFormerStudents = { id: 'former', className: 'Former Students', students: [] }; // Placeholder to avoid break
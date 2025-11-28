import React from 'react';

const EventsPage = () => {
  const schoolEvents = [
    {
      id: 1,
      title: 'Annual Sports Day',
      date: 'December 10, 2025',
      time: '9:00 AM - 3:00 PM',
      location: 'School Ground',
      description: 'Join us for a day of athletic events, team competitions, and fun activities for all students.',
    },
    {
      id: 2,
      title: 'Science Fair Exhibition',
      date: 'January 20, 2026',
      time: '10:00 AM - 4:00 PM',
      location: 'School Auditorium',
      description: 'Showcase your scientific projects and explore innovative ideas from fellow students.',
    },
    {
      id: 3,
      title: 'Cultural Fest',
      date: 'February 15, 2026',
      time: '6:00 PM - 9:00 PM',
      location: 'School Hall',
      description: 'A vibrant evening celebrating diverse cultures through music, dance, and drama performances.',
    },
  ];

  const ptmMeetings = [
    {
      id: 1,
      title: 'PTM for Grade 10',
      date: 'November 30, 2025',
      time: '4:00 PM - 7:00 PM',
      location: 'Online (Zoom)',
      description: 'Discussion about academic progress, upcoming exams, and student development for Grade 10 students.',
    },
    {
      id: 2,
      title: 'PTM for Grade 11 & 12',
      date: 'December 5, 2025',
      time: '4:00 PM - 7:00 PM',
      location: 'School Library',
      description: 'Individual meetings with teachers to discuss performance, college applications, and career guidance.',
    },
  ];

  return (
    <div className="p-4 bg-teal-900 rounded-xl shadow-lg">
      <h3 className="text-2xl font-bold text-gray-100 mb-6">Events</h3>

      <div className="mb-8 p-4 border border-teal-800 rounded-lg bg-teal-800/30">
        <h4 className="text-xl font-bold text-gray-100 mb-4">School Events</h4>
        {schoolEvents.length > 0 ? (
          <div className="space-y-4">
            {schoolEvents.map((event) => (
              <div key={event.id} className="bg-teal-900/50 p-4 rounded-lg shadow-sm border border-teal-800">
                <p className="text-lg font-semibold text-gray-100">{event.title}</p>
                <p className="text-sm text-gray-300">{event.date} at {event.time}</p>
                <p className="text-sm text-gray-300">Location: {event.location}</p>
                <p className="mt-2 text-gray-100">{event.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No school events scheduled at the moment.</p>
        )}
      </div>

      <div className="p-4 border border-teal-800 rounded-lg bg-teal-800/30">
        <h4 className="text-xl font-bold text-gray-100 mb-4">PTM Meetings</h4>
        {ptmMeetings.length > 0 ? (
          <div className="space-y-4">
            {ptmMeetings.map((meeting) => (
              <div key={meeting.id} className="bg-teal-900/50 p-4 rounded-lg shadow-sm border border-teal-800">
                <p className="text-lg font-semibold text-gray-100">{meeting.title}</p>
                <p className="text-sm text-gray-300">{meeting.date} at {meeting.time}</p>
                <p className="text-sm text-gray-300">Location: {meeting.location}</p>
                <p className="mt-2 text-gray-100">{meeting.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">No PTM meetings scheduled at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;

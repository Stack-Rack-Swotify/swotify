import React from 'react';
import { Link } from 'react-router-dom';

const EventsPage = () => {
  const schoolEvents = [
    {
      id: 1,
      title: 'Annual Sports Day',
      date: 'December 10, 2025',
      time: '9:00 AM - 3:00 PM',
      location: 'School Ground',
      description: 'Join us for a day of athletic events, team competitions, and fun activities for all students. Don\'t forget your sports gear and water bottle!',
      pictures: ['https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1524278479708-f404987f4c34?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      instructions: 'Participants must register by December 1st. Arrive 30 minutes before your event for warm-up. Check the school notice board for team assignments.'
    },
    {
      id: 2,
      title: 'Science Fair Exhibition',
      date: 'January 20, 2026',
      time: '10:00 AM - 4:00 PM',
      location: 'School Auditorium',
      description: 'Showcase your scientific projects and explore innovative ideas from fellow students. Prepare to present your findings!',
      pictures: ['https://images.unsplash.com/photo-1532187863553-625d31b01777?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1518156191147-bc858b907cae?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      instructions: 'Projects must be submitted by January 15th. Set up your display between 8:00 AM and 9:30 AM on the day of the fair. Be ready to answer questions from judges.'
    },
    {
      id: 3,
      title: 'Cultural Fest',
      date: 'February 15, 2026',
      time: '6:00 PM - 9:00 PM',
      location: 'School Hall',
      description: 'A vibrant evening celebrating diverse cultures through music, dance, and drama performances. Enjoy the show!',
      pictures: ['https://images.unsplash.com/photo-1541480036-c6eb33053748?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1533174072545-ea9b623d2e3e?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      instructions: 'Performers must report backstage by 5:00 PM. Audience members are requested to be seated by 5:45 PM. Refreshments will be available.'
    },
  ];

  const ptmMeetings = [
    {
      id: 4, // Unique ID
      title: 'PTM for Grade 10',
      date: 'November 30, 2025',
      time: '4:00 PM - 7:00 PM',
      location: 'Online (Zoom)',
      description: 'Discussion about academic progress, upcoming exams, and student development for Grade 10 students. Important for parents and students.',
      pictures: ['https://images.unsplash.com/photo-1555620959-5f25712f5a6b?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      instructions: 'Parents will receive a Zoom link via email. Please join on time. Individual slots are 15 minutes each.'
    },
    {
      id: 5, // Unique ID
      title: 'PTM for Grade 11 & 12',
      date: 'December 5, 2025',
      time: '4:00 PM - 7:00 PM',
      location: 'School Library',
      description: 'Individual meetings with teachers to discuss performance, college applications, and career guidance. Highly recommended for all senior students.',
      pictures: ['https://images.unsplash.com/photo-1510590337000-ed212660a957?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
      instructions: 'Sign up for a time slot with your child\'s homeroom teacher. Bring a copy of recent academic reports.'
    },
  ];

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold text-white mb-6">Events</h3>

      <div className="mb-8 p-4 border border-white/10 rounded-lg bg-black/20 relative z-0 transform hover:scale-108 hover:shadow-2xl transition-all duration-300 hover:z-10">
        <h4 className="text-xl font-bold text-white mb-4">School Events</h4>
        {schoolEvents.length > 0 ? (
          <div className="space-y-4">
            {schoolEvents.map((event) => (
              <Link to={`/events/${event.id}`} key={event.id} className="block"> {/* Make the whole card a link */}
                <div className="bg-black/20 p-4 rounded-lg shadow-sm border border-white/10 relative z-0 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:z-10">
                  {event.pictures && event.pictures.length > 0 && (
                    <img src={event.pictures[0]} alt={event.title} className="w-full h-32 object-cover rounded-md mb-4" />
                  )}
                  <p className="text-lg font-semibold text-white">{event.title}</p>
                  <p className="text-sm text-gray-300">{event.date} at {event.time}</p>
                  <p className="text-sm text-gray-300">Location: {event.location}</p>
                  <p className="mt-2 text-gray-200">{event.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No school events scheduled at the moment.</p>
        )}
      </div>

      <div className="p-4 border border-white/10 rounded-lg bg-black/20 relative z-0 transform hover:scale-108 hover:shadow-2xl transition-all duration-300 hover:z-10">
        <h4 className="text-xl font-bold text-white mb-4">PTM Meetings</h4>
        {ptmMeetings.length > 0 ? (
          <div className="space-y-4">
            {ptmMeetings.map((meeting) => (
              <Link to={`/events/${meeting.id}`} key={meeting.id} className="block"> {/* Make the whole card a link */}
                <div className="bg-black/20 p-4 rounded-lg shadow-sm border border-white/10 relative z-0 transform hover:scale-105 hover:shadow-xl transition-all duration-300 hover:z-10">
                  {meeting.pictures && meeting.pictures.length > 0 && (
                    <img src={meeting.pictures[0]} alt={meeting.title} className="w-full h-32 object-cover rounded-md mb-4" />
                  )}
                  <p className="text-lg font-semibold text-white">{meeting.title}</p>
                  <p className="text-sm text-gray-300">{meeting.date} at {meeting.time}</p>
                  <p className="text-sm text-gray-300">Location: {meeting.location}</p>
                  <p className="mt-2 text-gray-200">{meeting.description}</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No PTM meetings scheduled at the moment.</p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Import the dummy data (same as in EventsPage.jsx)
const allEvents = [
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


const EventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = allEvents.find(e => e.id === parseInt(eventId));

  if (!event) {
    return (
      <div className="p-4 bg-black/20 backdrop-blur-lg rounded-xl shadow-lg text-white">
        <h3 className="text-2xl font-bold mb-4">Event Not Found</h3>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-black/20 backdrop-blur-lg rounded-xl shadow-lg text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Events
      </button>

      <h3 className="text-3xl font-bold mb-4">{event.title}</h3>
      <p className="text-gray-300 mb-2"><strong>Date:</strong> {event.date}</p>
      <p className="text-gray-300 mb-2"><strong>Time:</strong> {event.time}</p>
      <p className="text-gray-300 mb-4"><strong>Location:</strong> {event.location}</p>
      <p className="text-gray-200 mb-4">{event.description}</p>

      {event.pictures && event.pictures.length > 0 && (
        <div className="mb-4">
          <h4 className="text-xl font-semibold mb-2">Pictures</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {event.pictures.map((pic, index) => (
              <img key={index} src={pic} alt={`${event.title} Picture ${index + 1}`} className="rounded-lg shadow-md object-cover w-full h-48" />
            ))}
          </div>
        </div>
      )}

      {event.instructions && (
        <div className="mb-4">
          <h4 className="text-xl font-semibold mb-2">Instructions for Students</h4>
          <p className="bg-gray-800 p-3 rounded-lg text-gray-200">{event.instructions}</p>
        </div>
      )}
    </div>
  );
};

export default EventDetailPage;
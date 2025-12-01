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
    id: 4,
    title: 'PTM for Grade 10',
    date: 'November 30, 2025',
    time: '4:00 PM - 7:00 PM',
    location: 'Online (Zoom)',
    description: 'Discussion about academic progress, upcoming exams, and student development for Grade 10 students. Important for parents and students.',
    pictures: ['https://images.unsplash.com/photo-1555620959-5f25712f5a6b?auto=format&fit=crop&q=80&w=2940&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
    instructions: 'Parents will receive a Zoom link via email. Please join on time. Individual slots are 15 minutes each.'
  },
  {
    id: 5,
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Event Not Found</h3>
          <p className="text-[#827979] mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-[#ff7300] to-[#ff7300]/90 text-white rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-5 py-2.5 bg-white text-[#827979] rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-x-1 flex items-center gap-2 border border-gray-200 font-medium"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </button>

        {/* Event Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start gap-3 mb-4">
            <span className="w-1.5 h-16 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full"></span>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-gray-800 mb-3">{event.title}</h3>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-[#ff7300]/10 px-4 py-2 rounded-lg border border-[#ff7300]/20">
                  <svg className="w-5 h-5 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-[#827979]">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#9000ff]/10 px-4 py-2 rounded-lg border border-[#9000ff]/20">
                  <svg className="w-5 h-5 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-[#827979]">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#827979]/10 px-4 py-2 rounded-lg border border-[#827979]/20">
                  <svg className="w-5 h-5 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-[#827979]">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-700 leading-relaxed mt-4">{event.description}</p>
        </div>

        {/* Event Pictures */}
        {event.pictures && event.pictures.length > 0 && !event.title.includes('PTM') && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
            <h4 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
              Event Gallery
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {event.pictures.map((pic, index) => (
                <div key={index} className="group relative overflow-hidden rounded-xl border border-gray-200 hover:border-[#ff7300]/50 transition-all duration-300">
                  <img 
                    src={pic} 
                    alt={`${event.title} Picture ${index + 1}`} 
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {event.title.includes('PTM') && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
            <h4 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
              Student Talent Summary
            </h4>
            <div className="bg-gray-50 p-5 rounded-xl border border-gray-200">
              <p className="text-gray-600 mb-4">
                Upload or record a short audio of the student showcasing their talent. Our AI will analyze the audio and provide a summary of their skills.
              </p>
              <div className="flex items-center gap-4 mb-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff7300] to-[#ff7300]/90 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
                  </svg>
                  <span>Upload Recording</span>
                </button>
                <button className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 rounded-xl hover:bg-gray-300 transition-all duration-300 font-medium flex items-center justify-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                  <span>Record Audio</span>
                </button>
              </div>
              <div>
                <h5 className="text-lg font-semibold text-gray-800 mb-3">AI-Generated Summary</h5>
                <div className="bg-gray-50 p-5 rounded-xl border border-gray-200 min-h-[100px]">
                  <p className="text-gray-700 italic">The AI summary will appear here after the audio is processed...</p>
                </div>
              </div>
            </div>
          </div>
        )}

<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Event Registration Form */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
                Event Registration
              </h4>
              <form>
                <div className="mb-4">
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" id="fullName" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff7300] focus:border-transparent transition-all duration-300" placeholder="Enter your full name" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input type="email" id="email" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff7300] focus:border-transparent transition-all duration-300" placeholder="Enter your email address" />
                  </div>
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Contact Number</label>
                    <input type="tel" id="contact" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#ff7300] focus:border-transparent transition-all duration-300" placeholder="Enter your contact number" />
                  </div>
                </div>
                <div className="flex justify-end mt-6">
                  <button type="submit" className="px-8 py-3 bg-gradient-to-r from-[#ff7300] to-[#ff7300]/90 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 font-medium flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                    <span>Register Now</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div>
            {/* Instructions for Students */}
            {event.instructions && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
                <h4 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                  <span className="w-1 h-6 bg-gradient-to-b from-[#827979] to-[#9000ff] rounded-full mr-3"></span>
                  Instructions for Students
                </h4>
                <div className="bg-gradient-to-br from-[#ff7300]/5 to-[#9000ff]/5 p-5 rounded-xl border border-[#ff7300]/20">
                  <div className="flex gap-3">
                    <svg className="w-6 h-6 text-[#ff7300] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-700 leading-relaxed">{event.instructions}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Event Location */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
              <h4 className="text-xl font-semibold text-gray-800 mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
                Event Location
              </h4>
              <div className="relative h-60 rounded-xl overflow-hidden border border-gray-200">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.22588789948!2d-122.4194155846813!3d37.77492927975823!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064f95d1d6d%3A0x2e6f3b4f659d5e3a!2sSan%20Francisco%20City%20Hall!5e0!3m2!1sen!2sus!4v1620207869680!5m2!1sen!2sus"
                  allowFullScreen=""
                  loading="lazy"
                  title="Event Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;

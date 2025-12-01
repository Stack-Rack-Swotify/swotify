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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">Events & Meetings</h3>
          <p className="text-[#827979] text-sm">Stay updated with upcoming school activities</p>
        </div>

        {/* School Events Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-[#ff7300]/20 to-[#9000ff]/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-800">School Events</h4>
          </div>
          
          {schoolEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schoolEvents.map((event) => (
                <Link 
                  to={`${event.id}`} 
                  key={event.id} 
                  className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Event Image */}
                  {event.pictures && event.pictures.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={event.pictures[0]} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-[#ff7300] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        Event
                      </div>
                    </div>
                  )}
                  
                  {/* Event Content */}
                  <div className="p-5">
                    <h5 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#ff7300] transition-colors">
                      {event.title}
                    </h5>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-[#827979]">
                        <svg className="w-4 h-4 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#827979]">
                        <svg className="w-4 h-4 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#827979]">
                        <svg className="w-4 h-4 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{event.description}</p>
                    
                    <div className="flex items-center gap-2 text-[#ff7300] font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>View Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#ff7300]/10 to-[#9000ff]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-[#827979] font-medium">No school events scheduled at the moment.</p>
              </div>
            </div>
          )}
        </div>

        {/* PTM Meetings Section */}
        <div>
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 bg-gradient-to-br from-[#9000ff]/20 to-[#ff7300]/20 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h4 className="text-2xl font-bold text-gray-800">PTM Meetings</h4>
          </div>
          
          {ptmMeetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ptmMeetings.map((meeting) => (
                <Link 
                  to={`${meeting.id}`} 
                  key={meeting.id} 
                  className="group block bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Meeting Image */}
                  {meeting.pictures && meeting.pictures.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={meeting.pictures[0]} 
                        alt={meeting.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-[#9000ff] text-white px-3 py-1 rounded-full text-xs font-semibold">
                        PTM
                      </div>
                    </div>
                  )}
                  
                  {/* Meeting Content */}
                  <div className="p-5">
                    <h5 className="text-lg font-bold text-gray-800 mb-3 group-hover:text-[#9000ff] transition-colors">
                      {meeting.title}
                    </h5>
                    
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center gap-2 text-sm text-[#827979]">
                        <svg className="w-4 h-4 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>{meeting.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#827979]">
                        <svg className="w-4 h-4 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#827979]">
                        <svg className="w-4 h-4 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span>{meeting.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 line-clamp-2 mb-4">{meeting.description}</p>
                    
                    <div className="flex items-center gap-2 text-[#9000ff] font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>View Details</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12">
              <div className="flex flex-col items-center justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-[#9000ff]/10 to-[#ff7300]/10 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <p className="text-[#827979] font-medium">No PTM meetings scheduled at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

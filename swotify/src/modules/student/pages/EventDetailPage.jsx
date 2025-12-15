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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Premium Header */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-slate-900 dark:text-gray-100 mb-2">Events & Meetings</h3>
          <p className="text-slate-600 dark:text-gray-400 text-base">Stay updated with upcoming school activities</p>
        </div>

        {/* Premium School Events Section */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl blur opacity-50 animate-pulse"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
            </div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-gray-100">School Events</h4>
          </div>
          
          {schoolEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {schoolEvents.map((event) => (
                <Link 
                  to={`${event.id}`} 
                  key={event.id} 
                  className="group block bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
                >
                  {/* Premium Event Image */}
                  {event.pictures && event.pictures.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={event.pictures[0]} 
                        alt={event.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                        Event
                      </div>
                    </div>
                  )}
                  
                  {/* Premium Event Content */}
                  <div className="p-5">
                    <h5 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {event.title}
                    </h5>
                    
                    <div className="space-y-2.5 mb-3">
                      <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{event.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2 mb-4">{event.description}</p>
                    
                    <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>View Details</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200 dark:border-gray-700 p-12">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl animate-pulse"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl flex items-center justify-center border-2 border-cyan-300 dark:border-cyan-700 shadow-lg">
                    <svg className="w-10 h-10 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-gray-400 font-medium text-base">No school events scheduled at the moment.</p>
              </div>
            </div>
          )}
        </div>

        {/* Premium PTM Meetings Section */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl blur opacity-50 animate-pulse"></div>
              <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <h4 className="text-2xl font-bold text-slate-900 dark:text-gray-100">PTM Meetings</h4>
          </div>
          
          {ptmMeetings.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ptmMeetings.map((meeting) => (
                <Link 
                  to={`${meeting.id}`} 
                  key={meeting.id} 
                  className="group block bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
                >
                  {/* Premium Meeting Image */}
                  {meeting.pictures && meeting.pictures.length > 0 && (
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={meeting.pictures[0]} 
                        alt={meeting.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent"></div>
                      <div className="absolute top-4 right-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-semibold shadow-lg">
                        PTM
                      </div>
                    </div>
                  )}
                  
                  {/* Premium Meeting Content */}
                  <div className="p-5">
                    <h5 className="text-lg font-bold text-slate-900 dark:text-gray-100 mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-2">
                      {meeting.title}
                    </h5>
                    
                    <div className="space-y-2.5 mb-3">
                      <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <span className="font-medium">{meeting.date}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{meeting.time}</span>
                      </div>
                      <div className="flex items-center gap-2.5 text-sm text-slate-700 dark:text-gray-300">
                        <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg flex items-center justify-center shadow-md">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="font-medium">{meeting.location}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-gray-400 line-clamp-2 mb-4">{meeting.description}</p>
                    
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold text-sm group-hover:gap-3 transition-all">
                      <span>View Details</span>
                      <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200 dark:border-gray-700 p-12">
              <div className="flex flex-col items-center justify-center">
                <div className="relative w-20 h-20 mb-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-2xl animate-pulse"></div>
                  <div className="relative w-full h-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl flex items-center justify-center border-2 border-emerald-300 dark:border-emerald-700 shadow-lg">
                    <svg className="w-10 h-10 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-gray-400 font-medium text-base">No PTM meetings scheduled at the moment.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventsPage;

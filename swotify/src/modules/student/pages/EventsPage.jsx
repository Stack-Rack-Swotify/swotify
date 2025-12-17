import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const EventsPage = () => {
  const [activeTab, setActiveTab] = useState('events');

  const schoolEvents = [
    {
      id: 1,
      type: 'event',
      title: 'Annual Sports Day',
      date: 'December 10, 2025',
      time: '9:00 AM - 3:00 PM',
      location: 'School Ground',
      description: 'Join us for a day of athletic events, team competitions, and fun activities for all students. Don\'t forget your sports gear and water bottle!',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800',
      status: 'upcoming',
      category: 'Sports'
    },
    {
      id: 2,
      type: 'event',
      title: 'Science Fair Exhibition',
      date: 'January 20, 2026',
      time: '10:00 AM - 4:00 PM',
      location: 'School Auditorium',
      description: 'Showcase your scientific projects and explore innovative ideas from fellow students. Prepare to present your findings!',
      image: 'https://images.unsplash.com/photo-1532187863553-625d31b01777?auto=format&fit=crop&q=80&w=800',
      status: 'upcoming',
      category: 'Academic'
    },
    {
      id: 3,
      type: 'event',
      title: 'Cultural Fest',
      date: 'February 15, 2026',
      time: '6:00 PM - 9:00 PM',
      location: 'School Hall',
      description: 'A vibrant evening celebrating diverse cultures through music, dance, and drama performances. Enjoy the show!',
      image: 'https://images.unsplash.com/photo-1541480036-c6eb33053748?auto=format&fit=crop&q=80&w=800',
      status: 'upcoming',
      category: 'Cultural'
    },
  ];

  const ptmMeetings = [
    {
      id: 4,
      type: 'ptm',
      title: 'PTM for Grade 10',
      date: 'November 30, 2025',
      time: '4:00 PM - 7:00 PM',
      location: 'Online (Zoom)',
      description: 'Discussion about academic progress, upcoming exams, and student development for Grade 10 students.',
      image: 'https://images.unsplash.com/photo-1555620959-5f25712f5a6b?auto=format&fit=crop&q=80&w=800',
      status: 'upcoming',
      category: 'Meeting'
    },
    {
      id: 5,
      type: 'ptm',
      title: 'PTM for Grade 11 & 12',
      date: 'December 5, 2025',
      time: '4:00 PM - 7:00 PM',
      location: 'School Library',
      description: 'Individual meetings with teachers to discuss performance, college applications, and career guidance.',
      image: 'https://images.unsplash.com/photo-1510590337000-ed212660a957?auto=format&fit=crop&q=80&w=800',
      status: 'upcoming',
      category: 'Meeting'
    },
  ];

  const allItems = activeTab === 'events' ? schoolEvents : ptmMeetings;

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Sports': return 'bg-green-100 text-green-600 border-green-200';
      case 'Academic': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Cultural': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'Meeting': return 'bg-orange-100 text-orange-600 border-orange-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Events & Meetings</h1>
          <p className="text-slate-500 text-sm font-medium">Stay updated with upcoming school activities</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="section-card p-1.5 inline-flex gap-1">
        <button
          onClick={() => setActiveTab('events')}
          className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'events'
            ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white shadow-md'
            : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            School Events
          </span>
        </button>
        <button
          onClick={() => setActiveTab('ptm')}
          className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'ptm'
            ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white shadow-md'
            : 'text-slate-600 hover:bg-slate-100'
            }`}
        >
          <span className="flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            PTM Meetings
          </span>
        </button>
      </div>

      {/* Events Grid */}
      {allItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {allItems.map((item) => (
            <Link
              to={`./${item.id}`}
              key={item.id}
              className="group section-card overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              {/* Event Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getCategoryColor(item.category)}`}>
                    {item.category}
                  </span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-green-500 text-white shadow">
                    Upcoming
                  </span>
                </div>
              </div>

              {/* Event Content */}
              <div className="p-5">
                <h5 className="text-lg font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {item.title}
                </h5>

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="font-medium">{item.date}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <span className="font-medium">{item.time}</span>
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <span className="font-medium">{item.location}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-500 line-clamp-2 mb-4">{item.description}</p>

                {/* View Details Link */}
                <div className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>View Details</span>
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="section-card p-12">
          <div className="flex flex-col items-center justify-center">
            <div className="w-16 h-16 mb-4 rounded-xl bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-slate-500 font-medium">No {activeTab === 'events' ? 'school events' : 'PTM meetings'} scheduled at the moment.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventsPage;

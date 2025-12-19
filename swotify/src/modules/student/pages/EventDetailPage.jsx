import React from 'react';
import { useParams, Link } from 'react-router-dom';

const EventDetailPage = () => {
  const { eventId } = useParams();

  // All events data
  const allEvents = [
    {
      id: 1,
      type: 'event',
      title: 'Annual Sports Day',
      date: 'December 10, 2025',
      time: '9:00 AM - 3:00 PM',
      location: 'School Ground',
      description: 'Join us for a day of athletic events, team competitions, and fun activities for all students. Don\'t forget your sports gear and water bottle! This is a great opportunity to showcase your athletic abilities and team spirit.',
      images: [
        'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1524278479708-f404987f4c34?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800'
      ],
      instructions: 'Participants must register by December 1st. Arrive 30 minutes before your event for warm-up. Check the school notice board for team assignments.',
      category: 'Sports',
      organizer: 'PE Department',
      contact: 'sports@school.edu'
    },
    {
      id: 2,
      type: 'event',
      title: 'Science Fair Exhibition',
      date: 'January 20, 2026',
      time: '10:00 AM - 4:00 PM',
      location: 'School Auditorium',
      description: 'Showcase your scientific projects and explore innovative ideas from fellow students. Prepare to present your findings! The fair will feature projects from all grades covering various scientific disciplines.',
      images: [
        'https://images.unsplash.com/photo-1532187863553-625d31b01777?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1518156191147-bc858b907cae?auto=format&fit=crop&q=80&w=800'
      ],
      instructions: 'Projects must be submitted by January 15th. Set up your display between 8:00 AM and 9:30 AM on the day of the fair. Be ready to answer questions from judges.',
      category: 'Academic',
      organizer: 'Science Department',
      contact: 'science@school.edu'
    },
    {
      id: 3,
      type: 'event',
      title: 'Cultural Fest',
      date: 'February 15, 2026',
      time: '6:00 PM - 9:00 PM',
      location: 'School Hall',
      description: 'A vibrant evening celebrating diverse cultures through music, dance, and drama performances. Enjoy the show! This annual event brings together students from all backgrounds to share their cultural heritage.',
      images: [
        'https://images.unsplash.com/photo-1541480036-c6eb33053748?auto=format&fit=crop&q=80&w=1200',
        'https://images.unsplash.com/photo-1533174072545-ea9b623d2e3e?auto=format&fit=crop&q=80&w=800'
      ],
      instructions: 'Performers must report backstage by 5:00 PM. Audience members are requested to be seated by 5:45 PM. Refreshments will be available.',
      category: 'Cultural',
      organizer: 'Cultural Committee',
      contact: 'culture@school.edu'
    },
    {
      id: 4,
      type: 'ptm',
      title: 'PTM for Grade 10',
      date: 'November 30, 2025',
      time: '4:00 PM - 7:00 PM',
      location: 'Online (Zoom)',
      description: 'Discussion about academic progress, upcoming exams, and student development for Grade 10 students. Important for parents and students to attend and discuss future plans.',
      images: [
        'https://images.unsplash.com/photo-1555620959-5f25712f5a6b?auto=format&fit=crop&q=80&w=1200'
      ],
      instructions: 'Parents will receive a Zoom link via email. Please join on time. Individual slots are 15 minutes each.',
      category: 'Meeting',
      organizer: 'Academic Office',
      contact: 'ptm@school.edu'
    },
    {
      id: 5,
      type: 'ptm',
      title: 'PTM for Grade 11 & 12',
      date: 'December 5, 2025',
      time: '4:00 PM - 7:00 PM',
      location: 'School Library',
      description: 'Individual meetings with teachers to discuss performance, college applications, and career guidance. Highly recommended for all senior students and their parents.',
      images: [
        'https://images.unsplash.com/photo-1510590337000-ed212660a957?auto=format&fit=crop&q=80&w=1200'
      ],
      instructions: 'Sign up for a time slot with your child\'s homeroom teacher. Bring a copy of recent academic reports.',
      category: 'Meeting',
      organizer: 'Academic Office',
      contact: 'ptm@school.edu'
    },
  ];

  const event = allEvents.find(e => e.id === parseInt(eventId));

  if (!event) {
    return (
      <div className="space-y-6">
        <div className="section-card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-red-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Event Not Found</h3>
          <p className="text-slate-500 mb-4">The event you're looking for doesn't exist.</p>
          <Link
            to=".."
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#ea580c] text-white rounded-lg font-medium text-sm hover:bg-[#c2410c] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Events
          </Link>
        </div>
      </div>
    );
  }

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Sports': return 'bg-green-100 text-green-600 border-green-200';
      case 'Academic': return 'bg-blue-100 text-blue-600 border-blue-200';
      case 'Cultural': return 'bg-purple-100 text-purple-600 border-orange-200';
      case 'Meeting': return 'bg-orange-100 text-orange-600 border-orange-200';
      default: return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <Link
        to=".."
        className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-800 font-medium text-sm transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Events
      </Link>

      {/* Main Image */}
      <div className="section-card overflow-hidden">
        <div className="relative h-64 md:h-80">
          <img
            src={event.images[0]}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent"></div>

          {/* Category Badge */}
          <div className="absolute top-4 left-4">
            <span className={`px-4 py-1.5 text-sm font-semibold rounded-full border ${getCategoryColor(event.category)}`}>
              {event.category}
            </span>
          </div>

          {/* Status Badge */}
          <div className="absolute top-4 right-4">
            <span className="px-4 py-1.5 text-sm font-semibold rounded-full bg-green-500 text-white shadow-lg">
              Upcoming
            </span>
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white">{event.title}</h1>
          </div>
        </div>
      </div>

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description Card */}
          <div className="section-card p-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-800">About This Event</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">{event.description}</p>
          </div>

          {/* Instructions Card */}
          <div className="section-card p-6">
            <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-800">Instructions</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">{event.instructions}</p>
          </div>

          {/* Gallery */}
          {event.images.length > 1 && (
            <div className="section-card p-6">
              <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-800">Gallery</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {event.images.map((img, index) => (
                  <div key={index} className="aspect-video rounded-xl overflow-hidden border border-slate-200">
                    <img src={img} alt={`${event.title} - ${index + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Info Card */}
          <div className="section-card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">Event Details</h3>

            <div className="space-y-4">
              {/* Date */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</p>
                  <p className="text-sm font-semibold text-slate-800">{event.date}</p>
                </div>
              </div>

              {/* Time */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Time</p>
                  <p className="text-sm font-semibold text-slate-800">{event.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Location</p>
                  <p className="text-sm font-semibold text-slate-800">{event.location}</p>
                </div>
              </div>

              {/* Organizer */}
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Organized By</p>
                  <p className="text-sm font-semibold text-slate-800">{event.organizer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div className="section-card p-6">
            <h3 className="text-lg font-bold text-slate-800 mb-4 pb-4 border-b border-slate-100">Contact</h3>
            <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500">Email</p>
                <p className="text-sm font-semibold text-blue-600">{event.contact}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button className="w-full py-3 px-4 bg-[#ea580c] text-white font-bold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Add to Calendar
            </button>
            <button className="w-full py-3 px-4 bg-white text-slate-700 font-bold rounded-xl border border-slate-200 shadow-sm hover:shadow hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
              Share Event
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailPage;

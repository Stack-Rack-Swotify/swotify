import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const TeacherEventsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [events, setEvents] = useState([
    {
      id: 'e1',
      title: 'Parent-Teacher Meeting - Grade 10',
      date: '2025-12-20',
      time: '09:00 AM - 03:00 PM',
      location: 'School Auditorium',
      description: 'Annual parent-teacher meeting for Grade 10. Discuss student progress and academic goals.',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Teacher Smith',
      targetAudience: 'Grade 10 Parents & Teachers',
      type: 'PTM',
      status: 'upcoming'
    },
    {
      id: 'e6',
      title: 'Parent-Teacher Meeting - Grade 11 & 12',
      date: '2025-12-22',
      time: '04:00 PM - 07:00 PM',
      location: 'School Library',
      description: 'Individual meetings with parents to discuss performance, college applications, and career guidance.',
      thumbnail: 'https://images.unsplash.com/photo-1510590337000-ed212660a957?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Teacher Wilson',
      targetAudience: 'Grade 11 & 12 Parents',
      type: 'PTM',
      status: 'upcoming'
    },
    {
      id: 'e2',
      title: 'Science Fair',
      date: '2026-01-15',
      time: '10:00 AM - 02:00 PM',
      location: 'School Gymnasium',
      description: 'Showcasing innovative science projects from Grade 7-12 students. Judges will award prizes.',
      thumbnail: 'https://images.unsplash.com/photo-1532187863553-625d31b01777?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Teacher Johnson',
      targetAudience: 'Students, Parents, Public',
      type: 'General',
      status: 'upcoming'
    },
    {
      id: 'e3',
      title: 'School Play: A Midsummer Night\'s Dream',
      date: '2026-02-20',
      time: '07:00 PM - 09:00 PM',
      location: 'School Theater',
      description: 'Our annual drama club production. Come and enjoy a classic Shakespearean comedy!',
      thumbnail: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Teacher Davis',
      targetAudience: 'Students, Parents, Public',
      type: 'General',
      status: 'upcoming'
    },
    {
      id: 'e7',
      title: 'Annual Sports Day',
      date: '2025-12-28',
      time: '08:00 AM - 04:00 PM',
      location: 'School Ground',
      description: 'A day full of athletic events, team competitions, and fun activities for all students.',
      thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Teacher Brown',
      targetAudience: 'All Students',
      type: 'General',
      status: 'upcoming'
    },
    {
      id: 'e4',
      title: 'Annual Day Celebration 2024',
      date: '2024-11-15',
      time: '05:00 PM - 09:00 PM',
      location: 'School Auditorium',
      description: 'A grand celebration with performances, awards, and special guests. Thank you to everyone who attended!',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Teacher Wilson',
      targetAudience: 'All',
      type: 'General',
      status: 'completed'
    },
    {
      id: 'e5',
      title: 'Inter-School Quiz Competition',
      date: '2024-10-20',
      time: '10:00 AM - 01:00 PM',
      location: 'Conference Hall',
      description: 'Our students competed against 10 schools. We secured 2nd place!',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Teacher Brown',
      targetAudience: 'Students',
      type: 'General',
      status: 'completed'
    },
    {
      id: 'e8',
      title: 'Mid-Term PTM',
      date: '2024-09-10',
      time: '03:00 PM - 06:00 PM',
      location: 'School Hall',
      description: 'Mid-term progress discussion with parents for all grades. Feedback was shared.',
      thumbnail: 'https://images.unsplash.com/photo-1555620959-5f25712f5a6b?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Teacher Smith',
      targetAudience: 'All Parents',
      type: 'PTM',
      status: 'completed'
    },
  ]);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    thumbnail: null,
    type: 'General',
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const navigate = useNavigate();

  // Filter events based on active tab
  const getFilteredEvents = () => {
    if (activeTab === 'all') return events;
    if (activeTab === 'ptm') return events.filter(e => e.type === 'PTM');
    return events.filter(e => e.type === 'General');
  };

  const filteredEvents = getFilteredEvents();
  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming');
  const completedEvents = filteredEvents.filter(e => e.status === 'completed');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEventDetails(prevDetails => ({
        ...prevDetails,
        thumbnail: file,
      }));
      setThumbnailPreview(URL.createObjectURL(file));
    } else {
      setEventDetails(prevDetails => ({
        ...prevDetails,
        thumbnail: null,
      }));
      setThumbnailPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: `e${events.length + 1}`,
      title: eventDetails.title,
      date: eventDetails.date,
      time: eventDetails.time,
      location: eventDetails.location,
      description: eventDetails.description,
      thumbnail: thumbnailPreview || 'https://placehold.co/150/CCCCCC/000000?text=Event',
      createdBy: 'Current Teacher',
      targetAudience: 'All',
      type: eventDetails.type,
      status: 'upcoming',
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setEventDetails({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      thumbnail: null,
      type: 'General',
    });
    setThumbnailPreview(null);
    setShowCreateForm(false);
    alert('Event created successfully!');
  };

  const renderEventCard = (event) => (
    <Link
      key={event.id}
      to={event.type === 'PTM' ? `/teacher-dashboard/ptm-history` : `/teacher-dashboard/events/${event.id}`}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group"
    >
      <div className="relative overflow-hidden h-48">
        <img
          src={event.thumbnail}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
        />
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full shadow ${event.status === 'upcoming'
              ? 'bg-green-500 text-white'
              : 'bg-slate-500 text-white'
            }`}>
            {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </span>
        </div>
        {/* Type Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${event.type === 'PTM'
              ? 'bg-orange-100 text-orange-600 border-orange-200'
              : 'bg-blue-100 text-blue-600 border-blue-200'
            }`}>
            {event.type === 'PTM' ? 'PTM' : 'Event'}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
          {event.title}
        </h3>
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {event.date} at {event.time}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {event.location}
          </div>
        </div>
        <p className="text-slate-500 text-sm line-clamp-2">{event.description}</p>
      </div>
    </Link>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              {showCreateForm ? 'Create New Event' : 'Manage Events'}
            </h1>
            <p className="text-slate-500 text-sm">
              {showCreateForm ? 'Fill in the details to create a new event' : 'View and manage all school events'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          {showCreateForm ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              View Events
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Event
            </>
          )}
        </button>
      </div>

      {showCreateForm ? (
        /* Create Event Form */
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Event Type */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Event Type</label>
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${eventDetails.type === 'General'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-slate-200 hover:border-slate-300'
                  }`}>
                  <input
                    type="radio"
                    name="type"
                    value="General"
                    checked={eventDetails.type === 'General'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                  <span className="font-medium">General Event</span>
                </label>
                <label className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${eventDetails.type === 'PTM'
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-slate-200 hover:border-slate-300'
                  }`}>
                  <input
                    type="radio"
                    name="type"
                    value="PTM"
                    checked={eventDetails.type === 'PTM'}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium">PTM Meeting</span>
                </label>
              </div>
            </div>

            {/* Event Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Event Title</label>
              <input
                type="text"
                name="title"
                value={eventDetails.title}
                onChange={handleChange}
                required
                placeholder="Enter event title"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date and Time Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={eventDetails.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={eventDetails.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={eventDetails.location}
                onChange={handleChange}
                required
                placeholder="Enter event location"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                name="description"
                rows="4"
                value={eventDetails.description}
                onChange={handleChange}
                required
                placeholder="Enter event description"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Event Thumbnail</label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer border border-slate-200 rounded-lg p-2"
              />
              {thumbnailPreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">Preview:</p>
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border border-slate-200"
                  />
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Create {eventDetails.type === 'PTM' ? 'PTM Meeting' : 'Event'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Event List */
        <div className="space-y-6">
          {/* Tab Navigation */}
          <div className="bg-white rounded-xl border border-slate-200 p-1.5 inline-flex gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'all'
                ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                </svg>
                All Events
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">{events.length}</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('ptm')}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'ptm'
                ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                PTM Meetings
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">{events.filter(e => e.type === 'PTM').length}</span>
              </span>
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all ${activeTab === 'general'
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-100'
                }`}
            >
              <span className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Other Events
                <span className="px-2 py-0.5 bg-white/20 rounded-full text-xs">{events.filter(e => e.type === 'General').length}</span>
              </span>
            </button>
          </div>

          {/* Upcoming Events Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Upcoming {activeTab === 'ptm' ? 'PTM Meetings' : activeTab === 'general' ? 'Events' : 'Events & Meetings'}
              </h2>
              <span className="px-2.5 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">{upcomingEvents.length}</span>
            </div>

            {upcomingEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map(renderEventCard)}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <p className="text-slate-500 font-medium">No upcoming {activeTab === 'ptm' ? 'PTM meetings' : 'events'} scheduled.</p>
              </div>
            )}
          </div>

          {/* Completed Events Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-slate-800">
                Completed {activeTab === 'ptm' ? 'PTM Meetings' : activeTab === 'general' ? 'Events' : 'Events & Meetings'}
              </h2>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-full">{completedEvents.length}</span>
            </div>

            {completedEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedEvents.map(renderEventCard)}
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
                <p className="text-slate-500 font-medium">No completed {activeTab === 'ptm' ? 'PTM meetings' : 'events'} yet.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Help Text */}
      {showCreateForm && (
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-800 mb-2">Tips for creating events:</p>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Use a clear and descriptive title
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Provide detailed event description
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Upload a high-quality thumbnail image
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherEventsPage;

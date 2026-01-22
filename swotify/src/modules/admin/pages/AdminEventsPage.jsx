import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminEventsPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');

  const [events, setEvents] = useState([
    {
      id: 'e1',
      title: 'Parent-Teacher Meeting - Grade 10',
      date: '2025-12-20',
      time: '09:00 AM - 03:00 PM',
      location: 'School Auditorium',
      description: 'Annual parent-teacher meeting for Grade 10. Discuss student progress and academic goals.',
      thumbnail: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Admin',
      type: 'PTM',
      status: 'upcoming',
      attendees: 85
    },
    {
      id: 'e2',
      title: 'Parent-Teacher Meeting - Grade 11 & 12',
      date: '2025-12-22',
      time: '04:00 PM - 07:00 PM',
      location: 'School Library',
      description: 'Individual meetings with parents to discuss performance, college applications, and career guidance.',
      thumbnail: 'https://images.unsplash.com/photo-1510590337000-ed212660a957?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Admin',
      type: 'PTM',
      status: 'upcoming',
      attendees: 120
    },
    {
      id: 'e3',
      title: 'Science Fair 2026',
      date: '2026-01-15',
      time: '10:00 AM - 02:00 PM',
      location: 'School Gymnasium',
      description: 'Showcasing innovative science projects from Grade 7-12 students. Judges will award prizes.',
      thumbnail: 'https://images.unsplash.com/photo-1532187863553-625d31b01777?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Admin',
      type: 'General',
      status: 'upcoming',
      attendees: 200
    },
    {
      id: 'e4',
      title: 'School Play: A Midsummer Night\'s Dream',
      date: '2026-02-20',
      time: '07:00 PM - 09:00 PM',
      location: 'School Theater',
      description: 'Our annual drama club production. Come and enjoy a classic Shakespearean comedy!',
      thumbnail: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Admin',
      type: 'General',
      status: 'upcoming',
      attendees: 150
    },
    {
      id: 'e5',
      title: 'Annual Sports Day 2025',
      date: '2025-12-28',
      time: '08:00 AM - 04:00 PM',
      location: 'School Ground',
      description: 'A day full of athletic events, team competitions, and fun activities for all students.',
      thumbnail: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Admin',
      type: 'General',
      status: 'upcoming',
      attendees: 500
    },
    {
      id: 'e6',
      title: 'Annual Day Celebration 2024',
      date: '2024-11-15',
      time: '05:00 PM - 09:00 PM',
      location: 'School Auditorium',
      description: 'A grand celebration with performances, awards, and special guests. Thank you to everyone who attended!',
      thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Admin',
      type: 'General',
      status: 'completed',
      attendees: 450
    },
    {
      id: 'e7',
      title: 'Inter-School Quiz Competition',
      date: '2024-10-20',
      time: '10:00 AM - 01:00 PM',
      location: 'Conference Hall',
      description: 'Our students competed against 10 schools. We secured 2nd place!',
      thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Admin',
      type: 'General',
      status: 'completed',
      attendees: 80
    },
    {
      id: 'e8',
      title: 'Mid-Term PTM 2024',
      date: '2024-09-10',
      time: '03:00 PM - 06:00 PM',
      location: 'School Hall',
      description: 'Mid-term progress discussion with parents for all grades. Feedback was shared.',
      thumbnail: 'https://images.unsplash.com/photo-1555620959-5f25712f5a6b?auto=format&fit=crop&q=80&w=800',
      createdBy: 'Admin',
      type: 'PTM',
      status: 'completed',
      attendees: 320
    },
  ]);

  // Filter events based on active tab and search
  const getFilteredEvents = () => {
    let filtered = events;

    // Filter by tab
    if (activeTab === 'ptm') filtered = events.filter(e => e.type === 'PTM');
    else if (activeTab === 'general') filtered = events.filter(e => e.type === 'General');

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(e =>
        e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const filteredEvents = getFilteredEvents();
  const upcomingEvents = filteredEvents.filter(e => e.status === 'upcoming');
  const completedEvents = filteredEvents.filter(e => e.status === 'completed');

  // Stats
  const totalUpcoming = events.filter(e => e.status === 'upcoming').length;
  const totalCompleted = events.filter(e => e.status === 'completed').length;
  const totalPTM = events.filter(e => e.type === 'PTM').length;
  const totalGeneral = events.filter(e => e.type === 'General').length;

  const renderEventCard = (event) => (
    <div
      key={event.id}
      onClick={() => navigate(`${event.id}`)}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
    >
      <div className="relative overflow-hidden h-48">
        <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
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
        <p className="text-slate-500 text-sm line-clamp-2 mb-4">{event.description}</p>
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-500">{event.attendees} attending</span>
          <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
            View Details
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ea580c] flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Events Management</h1>
            <p className="text-slate-500 text-sm">{events.length} Total Events • {totalUpcoming} Upcoming</p>
          </div>
        </div>
        <button onClick={() => navigate('/admin-dashboard/events/create')} className="px-6 py-3 bg-[#ea580c] hover:bg-[#c2410c] text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Create Event
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{events.length}</p>
              <p className="text-xs text-slate-500">Total Events</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{totalUpcoming}</p>
              <p className="text-xs text-slate-500">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{totalPTM}</p>
              <p className="text-xs text-slate-500">PTM Meetings</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{totalCompleted}</p>
              <p className="text-xs text-slate-500">Completed</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation & Search */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          {/* Tabs */}
          <div className="flex gap-1 bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === 'all'
                ? 'bg-[#ea580c] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
                }`}
            >
              All Events
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'all' ? 'bg-white/20' : 'bg-slate-200'}`}>{events.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('ptm')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === 'ptm'
                ? 'bg-orange-500 text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
                }`}
            >
              PTM Meetings
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'ptm' ? 'bg-white/20' : 'bg-slate-200'}`}>{totalPTM}</span>
            </button>
            <button
              onClick={() => setActiveTab('general')}
              className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all flex items-center gap-2 ${activeTab === 'general'
                ? 'bg-[#334155] text-white shadow-md'
                : 'text-slate-600 hover:bg-slate-200'
                }`}
            >
              Other Events
              <span className={`px-2 py-0.5 rounded-full text-xs ${activeTab === 'general' ? 'bg-white/20' : 'bg-slate-200'}`}>{totalGeneral}</span>
            </button>
          </div>

          {/* Search & View Toggle */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search events..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 w-64"
              />
              <svg className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 rounded-lg p-1">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#ea580c] text-white' : 'text-slate-600 hover:bg-slate-200'}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                </svg>
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#ea580c] text-white' : 'text-slate-600 hover:bg-slate-200'}`}>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
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
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map(renderEventCard)}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Attendees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {upcomingEvents.map(event => (
                    <tr key={event.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => navigate(`${event.id}`)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={event.thumbnail} alt={event.title} className="w-16 h-12 rounded-lg object-cover" />
                          <p className="text-sm font-medium text-slate-800">{event.title}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800">{event.date}</p>
                        <p className="text-xs text-slate-500">{event.time}</p>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm text-slate-700">{event.location}</span></td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.type === 'PTM' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm text-slate-700">{event.attendees}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-500 font-medium">No upcoming {activeTab === 'ptm' ? 'PTM meetings' : 'events'} found.</p>
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
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedEvents.map(renderEventCard)}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <table className="min-w-full divide-y divide-slate-200">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Event</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date & Time</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Location</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Attendees</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {completedEvents.map(event => (
                    <tr key={event.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => navigate(`${event.id}`)}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <img src={event.thumbnail} alt={event.title} className="w-16 h-12 rounded-lg object-cover" />
                          <p className="text-sm font-medium text-slate-800">{event.title}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-800">{event.date}</p>
                        <p className="text-xs text-slate-500">{event.time}</p>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm text-slate-700">{event.location}</span></td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${event.type === 'PTM' ? 'bg-orange-100 text-orange-600' : 'bg-slate-100 text-slate-600'}`}>
                          {event.type}
                        </span>
                      </td>
                      <td className="px-6 py-4"><span className="text-sm text-slate-700">{event.attendees}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center">
            <p className="text-slate-500 font-medium">No completed {activeTab === 'ptm' ? 'PTM meetings' : 'events'} yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminEventsPage;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockEvents from '../../../data/mockEvents';


const AdminEventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(mockEvents);
  const [viewMode, setViewMode] = useState('grid'); // grid, list, calendar
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');


  // Calculate statistics
  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).length;
  const pastEvents = events.filter(e => new Date(e.date) < new Date()).length;
  const thisMonthEvents = events.filter(e => {
    const eventDate = new Date(e.date);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  }).length;


  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = searchTerm === '' || 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === 'all' || event.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });


  const categories = ['all', 'academic', 'sports', 'cultural', 'workshop', 'meeting'];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Premium Enhanced Header */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border-b-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Events Management
                </h1>
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-1 flex items-center gap-2 font-bold">
                  <span className="w-2.5 h-2.5 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full animate-pulse shadow-lg"></span>
                  {events.length} Total Events • {upcomingEvents} Upcoming
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin-dashboard/events/create')}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3 border-2 border-white/20"
            >
              <svg className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create New Event
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6 space-y-6">
        {/* Premium Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl p-6 border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-between mb-4">
              <span className="text-sm font-extrabold text-slate-600 dark:text-gray-400 uppercase tracking-wider">Total Events</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <p className="relative text-4xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">{events.length}</p>
            <p className="relative text-xs font-bold text-slate-500 dark:text-gray-500">All time events</p>
          </div>

          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl p-6 border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-between mb-4">
              <span className="text-sm font-extrabold text-slate-600 dark:text-gray-400 uppercase tracking-wider">Upcoming</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <p className="relative text-4xl font-extrabold text-emerald-600 mb-2">{upcomingEvents}</p>
            <p className="relative text-xs font-bold text-slate-500 dark:text-gray-500">Scheduled ahead</p>
          </div>

          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl p-6 border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-between mb-4">
              <span className="text-sm font-extrabold text-slate-600 dark:text-gray-400 uppercase tracking-wider">This Month</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
            <p className="relative text-4xl font-extrabold text-purple-600 mb-2">{thisMonthEvents}</p>
            <p className="relative text-xs font-bold text-slate-500 dark:text-gray-500">Current month</p>
          </div>

          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl p-6 border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl hover:shadow-2xl transition-all hover:scale-105 cursor-pointer overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-between mb-4">
              <span className="text-sm font-extrabold text-slate-600 dark:text-gray-400 uppercase tracking-wider">Past Events</span>
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="relative text-4xl font-extrabold text-amber-600 mb-2">{pastEvents}</p>
            <p className="relative text-xs font-bold text-slate-500 dark:text-gray-500">Completed events</p>
          </div>
        </div>

        {/* Premium Filters and View Controls */}
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-6">
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Premium Search */}
            <div className="flex-1 relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-focus-within:opacity-10 blur transition-opacity"></div>
              <input
                type="text"
                placeholder="Search events by title, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="relative w-full px-5 py-4 pl-12 bg-slate-50 dark:bg-gray-700/50 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-gray-100 shadow-sm font-medium"
              />
              <svg className="absolute left-4 top-4.5 w-5 h-5 text-slate-400 group-focus-within:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 dark:hover:text-gray-300 transition-colors hover:scale-110"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>

            {/* Premium Category Filter */}
            <div className="relative min-w-[220px]">
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 dark:bg-gray-700/50 border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-900 dark:text-gray-100 cursor-pointer shadow-sm appearance-none font-extrabold"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)} {cat === 'all' ? 'Categories' : ''}
                  </option>
                ))}
              </select>
              <svg className="absolute right-4 top-4.5 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            {/* Premium View Toggle */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-slate-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 p-1.5 rounded-xl border-2 border-slate-200 dark:border-gray-600 shadow-inner">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-110' : 'text-slate-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-700 hover:scale-105'}`}
                title="Grid view"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-110' : 'text-slate-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-700 hover:scale-105'}`}
                title="List view"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={`p-3 rounded-lg transition-all ${viewMode === 'calendar' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-xl scale-110' : 'text-slate-600 dark:text-gray-400 hover:bg-white/80 dark:hover:bg-gray-700 hover:scale-105'}`}
                title="Calendar view"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Premium Results Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100 flex items-center gap-3">
            <div className="w-1.5 h-9 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
            Events Directory
          </h2>
          <span className="px-5 py-2.5 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-slate-900 dark:text-gray-100 rounded-xl text-sm font-extrabold border-2 border-blue-200 dark:border-blue-700 shadow-lg">
            Showing {filteredEvents.length} of {events.length} events
          </span>
        </div>

        {/* Event Cards/List */}
        {filteredEvents.length > 0 ? (
          viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEvents.map(event => (
                <div 
                  key={event.id} 
                  onClick={() => navigate(`${event.id}`)}
                  className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl overflow-hidden hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-600 transition-all duration-300 transform hover:-translate-y-3 hover:scale-[1.02] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  
                  <div className="relative overflow-hidden h-52">
                    <img 
                      src={event.thumbnail} 
                      alt={event.title} 
                      className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Premium Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="px-4 py-2 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl text-blue-600 dark:text-blue-400 rounded-xl text-xs font-extrabold border-2 border-white/50 shadow-xl">
                        {event.category || 'General'}
                      </span>
                    </div>

                    {/* Premium Quick Action */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                      <button className="p-3 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-xl shadow-2xl hover:bg-white dark:hover:bg-gray-700 transition-all border-2 border-white/50">
                        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="relative p-6">
                    <h3 className="text-xl font-extrabold text-slate-900 dark:text-gray-100 mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                      {event.title}
                    </h3>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <span className="text-slate-900 dark:text-gray-100 font-extrabold block">{event.date}</span>
                          <span className="text-slate-600 dark:text-gray-400 text-xs font-bold">{event.time}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 text-sm">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <span className="text-slate-700 dark:text-gray-300 font-extrabold line-clamp-1">{event.location}</span>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed mb-5 font-medium">
                      {event.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100 dark:border-gray-700">
                      <div className="flex items-center gap-2">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                          </svg>
                        </div>
                        <span className="text-xs font-extrabold text-slate-600 dark:text-gray-400">{event.attendees || Math.floor(Math.random() * 100) + 20} attending</span>
                      </div>
                      <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 flex items-center gap-2">
                        View Details
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : viewMode === 'list' ? (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl overflow-hidden">
              <div className="overflow-x-auto custom-scrollbar">
                <table className="min-w-full divide-y-2 divide-slate-200 dark:divide-gray-700">
                  <thead className="bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50">
                    <tr>
                      <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Event</th>
                      <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Date & Time</th>
                      <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-5 text-left text-xs font-extrabold text-slate-700 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-slate-100 dark:divide-gray-700 bg-white dark:bg-gray-800">
                    {filteredEvents.map(event => (
                      <tr key={event.id} className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-900/20 dark:hover:to-purple-900/20 transition-all cursor-pointer group" onClick={() => navigate(`${event.id}`)}>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-4">
                            <div className="relative w-18 h-18 group-hover:scale-110 transition-transform">
                              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl blur opacity-0 group-hover:opacity-50 transition-opacity"></div>
                              <img src={event.thumbnail} alt={event.title} className="relative w-18 h-18 rounded-xl object-cover shadow-lg border-2 border-white dark:border-gray-700" />
                            </div>
                            <div>
                              <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{event.title}</p>
                              <p className="text-xs text-slate-600 dark:text-gray-400 line-clamp-1 font-bold">{event.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{event.date}</span>
                            <span className="text-xs text-slate-600 dark:text-gray-400 font-bold">{event.time}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="text-sm font-extrabold text-slate-700 dark:text-gray-300">{event.location}</span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <span className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 text-blue-600 dark:text-blue-400 border-2 border-blue-200 dark:border-blue-700">
                            {event.category || 'General'}
                          </span>
                        </td>
                        <td className="px-6 py-5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => { e.stopPropagation(); navigate(`${event.id}/edit`); }}
                              className="p-2.5 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-all hover:scale-110 border-2 border-transparent hover:border-blue-200"
                              title="Edit"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); }}
                              className="p-2.5 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-xl transition-all hover:scale-110 border-2 border-transparent hover:border-rose-200"
                              title="Delete"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-16 text-center">
              <div className="relative inline-block mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-20 animate-pulse"></div>
                <div className="relative w-24 h-24 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center shadow-xl">
                  <svg className="w-12 h-12 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <p className="text-2xl font-extrabold text-slate-900 dark:text-gray-100 mb-2">Calendar View</p>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Full calendar integration coming soon!</p>
            </div>
          )
        ) : (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-20 text-center">
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <div className="relative w-36 h-36 bg-gradient-to-br from-slate-100 to-blue-100 dark:from-gray-700 dark:to-gray-600 rounded-full flex items-center justify-center border-4 border-blue-200 dark:border-blue-700 shadow-2xl">
                <svg className="w-20 h-20 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100 mb-4">No Events Found</h3>
            <p className="text-slate-600 dark:text-gray-400 text-base max-w-md mx-auto mb-10 font-medium">
              There are no events matching your search criteria. Try adjusting your filters or create a new event.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setFilterCategory('all');
              }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset Filters
            </button>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};


export default AdminEventsPage;

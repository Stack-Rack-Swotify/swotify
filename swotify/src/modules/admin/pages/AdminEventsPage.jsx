import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockEvents from '../../../data/mockEvents';

const AdminEventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(mockEvents);
  const [viewMode, setViewMode] = useState('grid');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const upcomingEvents = events.filter(e => new Date(e.date) >= new Date()).length;
  const pastEvents = events.filter(e => new Date(e.date) < new Date()).length;
  const thisMonthEvents = events.filter(e => {
    const eventDate = new Date(e.date);
    const now = new Date();
    return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
  }).length;

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
            <h1 className="text-2xl font-bold text-slate-800">Events Management</h1>
            <p className="text-slate-500 text-sm">{events.length} Total Events • {upcomingEvents} Upcoming</p>
          </div>
        </div>
        <button onClick={() => navigate('/admin-dashboard/events/create')} className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
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
            <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{upcomingEvents}</p>
              <p className="text-xs text-slate-500">Upcoming</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{thisMonthEvents}</p>
              <p className="text-xs text-slate-500">This Month</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-800">{pastEvents}</p>
              <p className="text-xs text-slate-500">Past Events</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <svg className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 capitalize"
          >
            {categories.map(cat => (
              <option key={cat} value={cat} className="capitalize">
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-slate-200'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM13 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2z" />
              </svg>
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'text-slate-600 hover:bg-slate-200'}`}>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-slate-600">Showing {filteredEvents.length} of {events.length} events</span>
      </div>

      {/* Events Grid/List */}
      {filteredEvents.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                onClick={() => navigate(`${event.id}`)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="relative overflow-hidden h-48">
                  <img src={event.thumbnail} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 text-blue-600 rounded-full text-xs font-semibold capitalize">
                      {event.category || 'General'}
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
                    <span className="text-xs text-slate-500">{event.attendees || Math.floor(Math.random() * 100) + 20} attending</span>
                    <span className="text-sm font-medium text-blue-600 flex items-center gap-1">
                      View Details
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Event</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Location</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredEvents.map(event => (
                  <tr key={event.id} className="hover:bg-slate-50 cursor-pointer" onClick={() => navigate(`${event.id}`)}>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={event.thumbnail} alt={event.title} className="w-16 h-12 rounded-lg object-cover" />
                        <div>
                          <p className="text-sm font-medium text-slate-800">{event.title}</p>
                          <p className="text-xs text-slate-500 line-clamp-1">{event.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-slate-800">{event.date}</p>
                      <p className="text-xs text-slate-500">{event.time}</p>
                    </td>
                    <td className="px-6 py-4"><span className="text-sm text-slate-700">{event.location}</span></td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium capitalize">
                        {event.category || 'General'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button onClick={(e) => { e.stopPropagation(); navigate(`${event.id}/edit`); }} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">No Events Found</h3>
          <p className="text-slate-500 text-sm mb-4">Try adjusting your search or filters</p>
          <button onClick={() => { setSearchTerm(''); setFilterCategory('all'); }} className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg text-sm font-medium">Reset Filters</button>
        </div>
      )}
    </div >
  );
};

export default AdminEventsPage;

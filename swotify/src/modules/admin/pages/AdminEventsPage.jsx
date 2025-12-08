import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import mockEvents from '../../../data/mockEvents';

const AdminEventsPage = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(mockEvents);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#1e293b] mb-2">Events Management</h1>
          <p className="text-[#64748b] text-sm">View and manage school events.</p>
        </div>

        {/* Event List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map(event => (
              <div 
                key={event.id} 
                onClick={() => navigate(`${event.id}`)}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer"
              >
                <div className="relative overflow-hidden h-48">
                  <img 
                    src={event.thumbnail} 
                    alt={event.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[#1e293b] mb-3 group-hover:text-[#6366f1] transition-colors">
                    {event.title}
                  </h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-[#64748b]">
                      <svg className="w-4 h-4 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {event.date} at {event.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#64748b]">
                      <svg className="w-4 h-4 text-[#f59e0b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      {event.location}
                    </div>
                  </div>
                  <p className="text-[#64748b] text-sm line-clamp-3 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="lg:col-span-3 text-center py-16 bg-white rounded-2xl border border-gray-100">
              <div className="w-20 h-20 bg-gradient-to-br from-[#6366f1]/10 to-[#8b5cf6]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#6366f1]/20">
                <svg className="w-10 h-10 text-[#64748b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-[#1e293b] mb-2">No Events Found</h3>
              <p className="text-[#64748b]">There are no upcoming events to display.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminEventsPage;

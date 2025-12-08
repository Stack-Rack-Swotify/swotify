import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockEvents from '../../../data/mockEvents';

const AdminEventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Ensure we compare strings or convert accordingly
  const event = mockEvents.find(e => e.id === id || e.id === parseInt(id));

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-[#1e293b] mb-4">Event Not Found</h3>
          <p className="text-[#64748b] mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 font-medium"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 px-5 py-2.5 bg-white text-[#64748b] rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-x-1 flex items-center gap-2 border border-gray-100 font-medium hover:text-[#1e293b]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </button>

        {/* Event Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
          <div className="flex items-start gap-3 mb-4">
            <span className="w-1.5 h-16 bg-gradient-to-b from-[#6366f1] to-[#1e293b] rounded-full"></span>
            <div className="flex-1">
              <h3 className="text-3xl font-bold text-[#1e293b] mb-3">{event.title}</h3>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 bg-[#6366f1]/10 px-4 py-2 rounded-lg border border-[#6366f1]/20">
                  <svg className="w-5 h-5 text-[#6366f1]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-[#1e293b]">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#22c55e]/10 px-4 py-2 rounded-lg border border-[#22c55e]/20">
                  <svg className="w-5 h-5 text-[#22c55e]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-[#1e293b]">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f97316]/10 px-4 py-2 rounded-lg border border-[#f97316]/20">
                  <svg className="w-5 h-5 text-[#f97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-[#1e293b]">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-[#1e293b] leading-relaxed mt-4">{event.description}</p>
        </div>

        {/* Event Pictures / Thumbnail */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
            <h4 className="text-xl font-semibold text-[#1e293b] mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#6366f1] to-[#1e293b] rounded-full mr-3"></span>
              Event Gallery
            </h4>
            <div className="rounded-xl overflow-hidden border border-gray-100">
                <img 
                src={event.thumbnail} 
                alt={`${event.title} Thumbnail`} 
                className="w-full h-96 object-cover" 
                />
            </div>
        </div>
      </div>
    </div>
  );
};

export default AdminEventDetailPage;

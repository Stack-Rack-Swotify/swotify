import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockEvents from '../../../data/mockEvents';

const TeacherEventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-[#0F172A] mb-4">Event Not Found</h3>
          <p className="text-[#64748B] mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 font-medium"
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
          onClick={() => navigate('/teacher-dashboard/events')}
          className="mb-6 px-5 py-2.5 bg-white text-[#64748B] rounded-xl hover:shadow-md transition-all duration-300 hover:-translate-x-1 flex items-center gap-2 border border-gray-100 font-medium hover:text-[#0F172A]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </button>

        {/* Event Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-4">
             {/* Thumbnail */}
            <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-sm border border-gray-100">
                <img 
                    src={event.thumbnail} 
                    alt={event.title} 
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500" 
                />
            </div>
            
            <div className="flex-1 w-full">
                <div className="flex items-center gap-3 mb-2">
                    <span className="w-1.5 h-8 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full"></span>
                    <h3 className="text-3xl font-bold text-[#0F172A]">{event.title}</h3>
                </div>
              
              <div className="flex flex-wrap gap-4 text-sm mt-4">
                <div className="flex items-center gap-2 bg-[#22C55E]/10 px-4 py-2 rounded-lg border border-[#22C55E]/20">
                  <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-medium text-[#0F172A]">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#F97316]/10 px-4 py-2 rounded-lg border border-[#F97316]/20">
                  <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-medium text-[#0F172A]">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 bg-[#0EA5E9]/10 px-4 py-2 rounded-lg border border-[#0EA5E9]/20">
                  <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-medium text-[#0F172A]">{event.location}</span>
                </div>
              </div>

               <div className="mt-6 space-y-2">
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <span className="font-semibold text-[#0F172A]">Created By:</span> {event.createdBy}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <span className="font-semibold text-[#0F172A]">Target Audience:</span> {event.targetAudience}
                    </div>
               </div>
            </div>
          </div>
          
          <div className="mt-8 border-t border-gray-100 pt-6">
            <h4 className="text-xl font-semibold text-[#0F172A] mb-4">Event Description</h4>
            <p className="text-[#0F172A] leading-relaxed whitespace-pre-line">{event.description}</p>
          </div>
        </div>

        {/* Location Map Placeholder */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
            <h4 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-3"></span>
            Event Location
            </h4>
            <div className="relative h-60 rounded-xl overflow-hidden border border-gray-100 bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <svg className="w-12 h-12 text-[#64748B] mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <p className="text-[#64748B] font-medium">{event.location}</p>
                    <p className="text-xs text-[#94A3B8] mt-1">(Map view placeholder)</p>
                </div>
            </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherEventDetailPage;

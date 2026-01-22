import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockEvents from '../../../data/mockEvents';

const TeacherEventDetailPage = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = mockEvents.find(e => e.id === eventId);

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-200/60 p-10">
          <div className="text-center">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-full blur-xl opacity-20"></div>
              <div className="relative w-20 h-20 bg-gradient-to-br from-rose-50 to-pink-50 rounded-full flex items-center justify-center border-2 border-rose-200 shadow-lg">
                <svg className="w-10 h-10 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <h3 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
              Event Not Found
            </h3>
            <p className="text-slate-600 mb-8 font-medium">The event you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate(-1)}
              className="px-8 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate('/teacher-dashboard/events')}
          className="mb-6 px-6 py-3 bg-white text-slate-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-x-1 flex items-center gap-2 border border-slate-200/60 font-semibold hover:text-slate-900 hover:border-purple-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </button>

        {/* Event Header Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 mb-6 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
            {/* Thumbnail */}
            <div className="w-full md:w-1/3 rounded-xl overflow-hidden shadow-md border-2 border-slate-200 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 pointer-events-none"></div>
              <img
                src={event.thumbnail}
                alt={event.title}
                className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex-1 w-full">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-1.5 h-10 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full"></span>
                <h3 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {event.title}
                </h3>
              </div>

              <div className="flex flex-wrap gap-3 mt-5">
                <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2.5 rounded-xl border-2 border-emerald-300 shadow-sm">
                  <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold text-slate-900">{event.date}</span>
                </div>
                <div className="flex items-center gap-2 bg-amber-100 px-4 py-2.5 rounded-xl border-2 border-amber-300 shadow-sm">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="font-semibold text-slate-900">{event.time}</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-100 px-4 py-2.5 rounded-xl border-2 border-blue-300 shadow-sm">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="font-semibold text-slate-900">{event.location}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Created By:</span>
                  <span className="text-slate-700 font-medium">{event.createdBy}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold text-slate-900">Target Audience:</span>
                  <span className="text-slate-700 font-medium">{event.targetAudience}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t-2 border-slate-100 pt-6">
            <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <span className="w-1.5 h-6 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full mr-3"></span>
              Event Description
            </h4>
            <p className="text-slate-800 leading-relaxed whitespace-pre-line font-medium">{event.description}</p>
          </div>
        </div>

        {/* Location Map Placeholder */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300">
          <h4 className="text-xl font-semibold text-slate-900 mb-6 flex items-center">
            <span className="w-1.5 h-6 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full mr-3"></span>
            Event Location
          </h4>
          <div className="relative h-64 rounded-xl overflow-hidden border-2 border-slate-200 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center shadow-inner">
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <div className="absolute inset-0 bg-[#ea580c] rounded-full blur-xl opacity-20"></div>
                <div className="relative w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center border-2 border-purple-200 shadow-lg">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <p className="text-slate-900 font-semibold text-lg">{event.location}</p>
              <p className="text-xs text-slate-500 mt-2 font-medium">(Map view placeholder)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherEventDetailPage;

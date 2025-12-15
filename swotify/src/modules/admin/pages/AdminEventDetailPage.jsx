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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden p-6 flex items-center justify-center">
        {/* Premium Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative max-w-md bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl border-2 border-slate-200/60 dark:border-gray-700/50 p-12 text-center">
          <div className="relative w-28 h-28 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 rounded-2xl blur-xl opacity-50 animate-pulse"></div>
            <div className="relative w-28 h-28 bg-gradient-to-br from-red-500 via-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl">
              <svg className="w-14 h-14 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <h3 className="text-3xl font-extrabold text-slate-900 dark:text-gray-100 mb-3">Event Not Found</h3>
          <p className="text-slate-600 dark:text-gray-400 mb-8 font-medium">The event you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate(-1)}
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
          >
            <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Go Back
          </button>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto p-6">
        {/* Premium Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="group mb-8 px-6 py-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl text-slate-600 dark:text-gray-300 rounded-xl hover:shadow-2xl transition-all duration-300 hover:-translate-x-2 flex items-center gap-3 border-2 border-slate-200/60 dark:border-gray-700/50 font-bold hover:text-slate-900 dark:hover:text-gray-100 hover:border-blue-300 dark:hover:border-blue-600"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Events
        </button>

        {/* Premium Event Header Card */}
        <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 p-8 mb-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative flex items-start gap-4 mb-6">
            <div className="w-2 h-20 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full shadow-lg"></div>
            <div className="flex-1">
              <h3 className="text-4xl font-extrabold text-slate-900 dark:text-gray-100 mb-5 leading-tight">{event.title}</h3>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="group/badge flex items-center gap-3 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 px-5 py-3 rounded-xl border-2 border-blue-200/50 dark:border-blue-700/50 hover:shadow-lg transition-all hover:scale-105">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg group-hover/badge:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-gray-100">{event.date}</span>
                </div>
                <div className="group/badge flex items-center gap-3 bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 px-5 py-3 rounded-xl border-2 border-emerald-200/50 dark:border-emerald-700/50 hover:shadow-lg transition-all hover:scale-105">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg group-hover/badge:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-gray-100">{event.time}</span>
                </div>
                <div className="group/badge flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 px-5 py-3 rounded-xl border-2 border-amber-200/50 dark:border-amber-700/50 hover:shadow-lg transition-all hover:scale-105">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg group-hover/badge:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <span className="font-extrabold text-slate-900 dark:text-gray-100">{event.location}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="relative bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-xl p-6 border-2 border-slate-200 dark:border-gray-700">
            <p className="text-slate-900 dark:text-gray-100 leading-relaxed font-medium text-base">{event.description}</p>
          </div>
        </div>

        {/* Premium Event Gallery */}
        <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 p-8 hover:shadow-2xl transition-all duration-300 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <h4 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100 mb-6 flex items-center gap-3">
              <div className="w-1.5 h-8 bg-gradient-to-b from-purple-500 via-pink-500 to-rose-500 rounded-full shadow-lg"></div>
              Event Gallery
            </h4>
            <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 dark:border-gray-700 shadow-xl group-hover:shadow-2xl transition-all">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src={event.thumbnail} 
                alt={`${event.title} Thumbnail`} 
                className="w-full h-[32rem] object-cover group-hover:scale-105 transition-transform duration-500" 
              />
              {/* Premium Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-xl p-4 border-2 border-white/50 dark:border-gray-700/50 shadow-2xl opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 via-pink-500 to-rose-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">Featured Event Image</p>
                    <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">Click to view full resolution</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Additional Details Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 dark:text-gray-100 mb-2">Event Date</h5>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">{event.date}</p>
            </div>
          </div>

          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 dark:text-gray-100 mb-2">Event Time</h5>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">{event.time}</p>
            </div>
          </div>

          <div className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-xl border-2 border-slate-200/60 dark:border-gray-700/50 p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h5 className="text-lg font-extrabold text-slate-900 dark:text-gray-100 mb-2">Location</h5>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">{event.location}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default AdminEventDetailPage;

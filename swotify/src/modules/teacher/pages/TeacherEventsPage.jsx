import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mockEvents from '../../../data/mockEvents';

const TeacherEventsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [events, setEvents] = useState(mockEvents);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    time: '',
    location: '',
    description: '',
    thumbnail: null,
  });
  const [thumbnailPreview, setThumbnailPreview] = useState(null);
  const navigate = useNavigate();

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
    };
    setEvents(prevEvents => [...prevEvents, newEvent]);
    setEventDetails({
      title: '',
      date: '',
      time: '',
      location: '',
      description: '',
      thumbnail: null,
    });
    setThumbnailPreview(null);
    setShowCreateForm(false);

    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-fade-in flex items-center gap-3';
    message.innerHTML = `
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span class="font-semibold">Event created successfully!</span>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                {showCreateForm ? 'Create New Event' : 'Manage Events'}
              </h1>
              <p className="text-slate-600 text-sm font-medium">
                {showCreateForm ? 'Fill in the details to create a new event' : 'View and manage all upcoming events'}
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              {showCreateForm ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  View Events
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </>
              )}
            </button>
          </div>
        </div>

        {showCreateForm ? (
          /* Create Event Form */
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                  </div>
                  Event Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={eventDetails.title}
                  onChange={handleChange}
                  required
                  placeholder="Enter event title"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 font-medium bg-white hover:border-blue-300"
                />
              </div>

              {/* Date and Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={eventDetails.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-slate-900 font-medium bg-white hover:border-emerald-300"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={eventDetails.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-slate-900 font-medium bg-white hover:border-amber-300"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={eventDetails.location}
                  onChange={handleChange}
                  required
                  placeholder="Enter event location"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-900 font-medium bg-white hover:border-purple-300"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                    </svg>
                  </div>
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  rows="4"
                  value={eventDetails.description}
                  onChange={handleChange}
                  required
                  placeholder="Enter event description"
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-slate-900 font-medium bg-white hover:border-pink-300 resize-none"
                ></textarea>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  Event Thumbnail
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-slate-900 font-medium file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-blue-100 file:to-purple-100 file:text-blue-700 hover:file:from-blue-200 hover:file:to-purple-200 cursor-pointer border-2 border-slate-200 rounded-xl p-3 hover:border-blue-300 transition-all duration-200"
                  />
                </div>
                {thumbnailPreview && (
                  <div className="mt-5 bg-gradient-to-br from-slate-50 to-blue-50/30 p-5 rounded-xl border-2 border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-4 flex items-center gap-2">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Thumbnail Preview
                    </p>
                    <div className="relative group">
                      <img 
                        src={thumbnailPreview} 
                        alt="Thumbnail Preview" 
                        className="w-full h-64 object-cover rounded-xl shadow-lg border-2 border-slate-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t-2 border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 sm:flex-none px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Event List */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.length > 0 ? (
              events.map(event => (
                <Link 
                  key={event.id} 
                  to={event.type === 'PTM' ? `/teacher-dashboard/ptm-history` : `/teacher-dashboard/events/${event.id}`}
                  className="bg-white rounded-2xl shadow-lg border border-slate-200/60 overflow-hidden hover:shadow-2xl transition-all duration-300 group cursor-pointer hover:-translate-y-1"
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.thumbnail} 
                      alt={event.title} 
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-slate-900 mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all">
                      {event.title}
                    </h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span className="font-medium">{event.date} at {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="font-medium">{event.location}</span>
                      </div>
                    </div>
                    <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed font-medium">
                      {event.description}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="lg:col-span-3 text-center py-20 bg-white rounded-2xl border border-slate-200/60 shadow-lg">
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-full blur-xl opacity-20"></div>
                  <div className="relative w-24 h-24 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 rounded-full flex items-center justify-center border-2 border-purple-200 shadow-lg">
                    <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-3">No Events Found</h3>
                <p className="text-slate-600 mb-6 font-medium">Click "Create Event" to add your first event.</p>
              </div>
            )}
          </div>
        )}

        {/* Help Text (for create form only) */}
        {showCreateForm && (
          <div className="mt-6 bg-gradient-to-br from-blue-50 via-purple-50/50 to-pink-50/30 rounded-xl p-6 border-2 border-purple-200 shadow-md">
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="text-sm flex-1">
                <p className="font-semibold text-slate-900 mb-3">Tips for creating events:</p>
                <ul className="space-y-2 text-slate-700">
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Use a clear and descriptive title</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Provide detailed event description</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="font-medium">Upload a high-quality thumbnail image for better visibility</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TeacherEventsPage;

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import mockEvents from '../../../data/mockEvents'; // Import mock events

const TeacherEventsPage = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [events, setEvents] = useState(mockEvents); // Initialize with mock events
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
      id: `e${events.length + 1}`, // Simple ID generation
      title: eventDetails.title,
      date: eventDetails.date,
      time: eventDetails.time,
      location: eventDetails.location,
      description: eventDetails.description,
      thumbnail: thumbnailPreview || 'https://placehold.co/150/CCCCCC/000000?text=Event', // Placeholder if no thumbnail
      createdBy: 'Current Teacher', // Placeholder for createdBy
      targetAudience: 'All', // Placeholder for targetAudience
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
    setShowCreateForm(false); // Go back to event list after creation

    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in flex items-center gap-2';
    message.innerHTML = `
      <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span>Event created successfully!</span>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-[#0F172A] mb-2">
                {showCreateForm ? 'Create New Event' : 'Manage Events'}
              </h1>
              <p className="text-[#64748B] text-sm">
                {showCreateForm ? 'Fill in the details to create a new event' : 'View and manage all upcoming events'}
              </p>
            </div>
            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
            >
              {showCreateForm ? (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  View Events
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                  Create Event
                </>
              )}
            </button>
          </div>
        </div>

        {showCreateForm ? (
          /* Create Event Form */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
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
                  className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] transition-all duration-200 text-[#0F172A] bg-white hover:border-[#0EA5E9]/50"
                />
              </div>

              {/* Date and Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    value={eventDetails.date}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] transition-all duration-200 text-[#0F172A] bg-white hover:border-[#22C55E]/50"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    id="time"
                    value={eventDetails.time}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316] transition-all duration-200 text-[#0F172A] bg-white hover:border-[#F97316]/50"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
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
                  className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] transition-all duration-200 text-[#0F172A] bg-white hover:border-[#0EA5E9]/50"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
                  </svg>
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
                  className="w-full px-4 py-3 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] transition-all duration-200 text-[#0F172A] bg-white hover:border-[#22C55E]/50 resize-none"
                ></textarea>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Event Thumbnail
                </label>
                <div className="relative">
                  <input
                    type="file"
                    name="thumbnail"
                    id="thumbnail"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full text-sm text-[#0F172A] file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#0EA5E9]/10 file:to-[#22C55E]/10 file:text-[#0EA5E9] hover:file:from-[#0EA5E9]/20 hover:file:to-[#22C55E]/20 cursor-pointer border border-gray-100 rounded-xl p-3 hover:border-[#0EA5E9]/50 transition-all duration-200"
                  />
                </div>
                {thumbnailPreview && (
                  <div className="mt-4 bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-100">
                    <p className="text-sm font-medium text-[#64748B] mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Thumbnail Preview
                    </p>
                    <div className="relative group">
                      <img 
                        src={thumbnailPreview} 
                        alt="Thumbnail Preview" 
                        className="w-full h-64 object-cover rounded-xl shadow-md border border-gray-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-100 text-[#64748B] font-semibold rounded-xl hover:border-[#64748B] hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
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
                <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img 
                      src={event.thumbnail} 
                      alt={event.title} 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-[#0F172A] mb-3 group-hover:text-[#0EA5E9] transition-colors">
                      {event.title}
                    </h3>
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {event.date} at {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#64748B]">
                        <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                    </div>
                    <p className="text-[#64748B] text-sm line-clamp-3 leading-relaxed">
                      {event.description}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="lg:col-span-3 text-center py-16 bg-white rounded-2xl border border-gray-100">
                <div className="w-20 h-20 bg-gradient-to-br from-[#0EA5E9]/10 to-[#22C55E]/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#0EA5E9]/20">
                  <svg className="w-10 h-10 text-[#64748B]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[#0F172A] mb-2">No Events Found</h3>
                <p className="text-[#64748B] mb-6">Click "Create Event" to add your first event.</p>
              </div>
            )}
          </div>
        )}

        {/* Help Text (for create form only) */}
        {showCreateForm && (
          <div className="mt-6 bg-gradient-to-br from-[#0EA5E9]/5 to-[#22C55E]/5 rounded-xl p-5 border border-[#0EA5E9]/20">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-[#0EA5E9] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm">
                <p className="font-semibold text-[#0F172A] mb-2">Tips for creating events:</p>
                <ul className="space-y-2 text-[#64748B]">
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Use a clear and descriptive title
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Provide detailed event description
                  </li>
                  <li className="flex items-start gap-2">
                    <svg className="w-4 h-4 text-[#22C55E] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    Upload a high-quality thumbnail image for better visibility
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

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
    message.className = 'fixed top-4 right-4 bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in flex items-center gap-2';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {showCreateForm ? 'Create New Event' : 'Manage Events'}
          </h1>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="px-5 py-2 bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            {showCreateForm ? 'View Events' : 'Create Event'}
          </button>
        </div>

        {showCreateForm ? (
          /* Create Event Form */
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Event Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] transition-all duration-200 text-gray-800 bg-white hover:border-[#ff7300]/50"
                />
              </div>

              {/* Date and Time Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9000ff]/50 focus:border-[#9000ff] transition-all duration-200 text-gray-800 bg-white hover:border-[#9000ff]/50"
                  />
                </div>
                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#827979]/50 focus:border-[#827979] transition-all duration-200 text-gray-800 bg-white hover:border-[#827979]/50"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] transition-all duration-200 text-gray-800 bg-white hover:border-[#ff7300]/50"
                />
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9000ff]/50 focus:border-[#9000ff] transition-all duration-200 text-gray-800 bg-white hover:border-[#9000ff]/50 resize-none"
                ></textarea>
              </div>

              {/* Thumbnail Upload */}
              <div>
                <label htmlFor="thumbnail" className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <svg className="w-4 h-4 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    className="w-full text-sm text-gray-800 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-gradient-to-r file:from-[#ff7300]/10 file:to-[#9000ff]/10 file:text-[#ff7300] hover:file:from-[#ff7300]/20 hover:file:to-[#9000ff]/20 cursor-pointer border border-gray-200 rounded-xl p-3 hover:border-[#ff7300]/50 transition-all duration-200"
                  />
                </div>
                {thumbnailPreview && (
                  <div className="mt-4 bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border border-gray-200">
                    <p className="text-sm font-medium text-[#827979] mb-3 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      Thumbnail Preview
                    </p>
                    <div className="relative group">
                      <img 
                        src={thumbnailPreview} 
                        alt="Thumbnail Preview" 
                        className="w-full h-64 object-cover rounded-xl shadow-md border border-gray-200"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                    </div>
                  </div>
                )}
              </div>

              {/* Form Actions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="flex-1 sm:flex-none px-6 py-3 border-2 border-gray-200 text-[#827979] font-semibold rounded-xl hover:border-[#827979] hover:bg-gray-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
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
                <div key={event.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
                  <img src={event.thumbnail} alt={event.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{event.title}</h3>
                  <p className="text-sm text-[#827979] mb-1">{event.date} at {event.time}</p>
                  <p className="text-sm text-[#827979] mb-4">{event.location}</p>
                  <p className="text-gray-600 text-sm line-clamp-3">{event.description}</p>
                </div>
              ))
            ) : (
              <div className="lg:col-span-3 text-center py-12">
                <p className="text-gray-600">No events found. Click "Create Event" to add one.</p>
              </div>
            )}
          </div>
        )}

        {/* Help Text (for create form only) */}
        {showCreateForm && (
          <div className="mt-6 bg-gradient-to-br from-[#ff7300]/5 to-[#9000ff]/5 rounded-xl p-4 border border-[#ff7300]/20">
            <div className="flex gap-3">
              <svg className="w-5 h-5 text-[#ff7300] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div className="text-sm text-[#827979]">
                <p className="font-semibold mb-1">Tips for creating events:</p>
                <ul className="list-disc list-inside space-y-1 text-xs">
                  <li>Use a clear and descriptive title</li>
                  <li>Provide detailed event description</li>
                  <li>Upload a high-quality thumbnail image for better visibility</li>
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
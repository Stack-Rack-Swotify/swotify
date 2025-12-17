import React, { useState } from 'react';
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
    alert('Event created successfully!');
  };

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
            <h1 className="text-2xl font-bold text-slate-800">
              {showCreateForm ? 'Create New Event' : 'Manage Events'}
            </h1>
            <p className="text-slate-500 text-sm">
              {showCreateForm ? 'Fill in the details to create a new event' : 'View and manage all upcoming events'}
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
        >
          {showCreateForm ? (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              View Events
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              Create Event
            </>
          )}
        </button>
      </div>

      {showCreateForm ? (
        /* Create Event Form */
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Event Title */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Event Title</label>
              <input
                type="text"
                name="title"
                value={eventDetails.title}
                onChange={handleChange}
                required
                placeholder="Enter event title"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Date and Time Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={eventDetails.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Time</label>
                <input
                  type="time"
                  name="time"
                  value={eventDetails.time}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={eventDetails.location}
                onChange={handleChange}
                required
                placeholder="Enter event location"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                name="description"
                rows="4"
                value={eventDetails.description}
                onChange={handleChange}
                required
                placeholder="Enter event description"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>

            {/* Thumbnail Upload */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Event Thumbnail</label>
              <input
                type="file"
                name="thumbnail"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100 cursor-pointer border border-slate-200 rounded-lg p-2"
              />
              {thumbnailPreview && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-slate-700 mb-2">Preview:</p>
                  <img
                    src={thumbnailPreview}
                    alt="Thumbnail Preview"
                    className="w-full max-w-md h-48 object-cover rounded-lg border border-slate-200"
                  />
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex gap-4 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-6 py-3 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Create Event
              </button>
            </div>
          </form>
        </div>
      ) : (
        /* Event List */
        <>
          {events.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map(event => (
                <Link
                  key={event.id}
                  to={event.type === 'PTM' ? `/teacher-dashboard/ptm-history` : `/teacher-dashboard/events/${event.id}`}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={event.thumbnail}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
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
                    <p className="text-slate-500 text-sm line-clamp-2">{event.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">No Events Found</h3>
              <p className="text-slate-500 text-sm mb-4">Click "Create Event" to add your first event.</p>
            </div>
          )}
        </>
      )}

      {/* Help Text */}
      {showCreateForm && (
        <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
          <div className="flex gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="text-sm">
              <p className="font-medium text-slate-800 mb-2">Tips for creating events:</p>
              <ul className="space-y-1.5 text-slate-600">
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Use a clear and descriptive title
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Provide detailed event description
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Upload a high-quality thumbnail image
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherEventsPage;

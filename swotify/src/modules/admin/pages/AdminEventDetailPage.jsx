import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockEvents from '../../../data/mockEvents';

const AdminEventDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [events, setEvents] = useState(mockEvents);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const event = events.find(e => e.id === id || e.id === parseInt(id));

  const [formData, setFormData] = useState({
    title: event?.title || '',
    date: event?.date || '',
    time: event?.time || '',
    location: event?.location || '',
    description: event?.description || ''
  });

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Event Not Found</h3>
        <p className="text-slate-500 text-sm mb-4">The event you're looking for doesn't exist.</p>
        <button
          onClick={() => navigate('/admin-dashboard/events')}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium"
        >
          Go to Events
        </button>
      </div>
    );
  }

  const handleSave = () => {
    setEvents(prev => prev.map(e =>
      (e.id === id || e.id === parseInt(id))
        ? { ...e, ...formData }
        : e
    ));
    setIsEditing(false);
  };

  const handleDelete = () => {
    setEvents(prev => prev.filter(e => e.id !== id && e.id !== parseInt(id)));
    navigate('/admin-dashboard/events');
  };

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate('/admin-dashboard/events')}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-800 text-sm font-medium"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Events
      </button>

      {/* Event Header */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Event Image */}
        <div className="relative h-64 md:h-80">
          <img
            src={event.thumbnail}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{event.title}</h1>
            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {event.date}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {event.time}
              </span>
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white rounded-lg text-sm font-medium flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {event.location}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Event Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Description / Edit Form */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800">
              {isEditing ? 'Edit Event' : 'About This Event'}
            </h2>
            {isEditing && (
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm text-slate-500 hover:text-slate-700"
              >
                Cancel
              </button>
            )}
          </div>

          {isEditing ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Date</label>
                  <input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Time</label>
                  <input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button
                onClick={handleSave}
                className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Save Changes
              </button>
            </div>
          ) : (
            <p className="text-slate-600 leading-relaxed">{event.description}</p>
          )}
        </div>

        {/* Quick Info */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Event Details</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500">Date</p>
                <p className="text-sm font-medium text-slate-800">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500">Time</p>
                <p className="text-sm font-medium text-slate-800">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-orange-50 rounded-lg">
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-slate-500">Location</p>
                <p className="text-sm font-medium text-slate-800">{event.location}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-2">
            <button
              onClick={() => setIsEditing(true)}
              className="w-full px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Event
            </button>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="w-full px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete Event
            </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl w-full max-w-sm shadow-xl p-6 text-center">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Delete Event?</h3>
            <p className="text-slate-500 text-sm mb-6">
              Are you sure you want to delete <strong>"{event.title}"</strong>? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEventDetailPage;

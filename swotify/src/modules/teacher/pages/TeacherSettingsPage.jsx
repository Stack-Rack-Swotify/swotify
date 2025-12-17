import React, { useState } from 'react';

const TeacherSettingsPage = () => {
  const [teacherProfile, setTeacherProfile] = useState({
    name: 'Mr. John Doe',
    email: 'john.doe@example.com',
    subject: 'Mathematics',
    gradeLevels: '9th - 12th',
    phone: '555-123-4567',
    bio: 'Dedicated mathematics teacher with 10 years of experience, passionate about making complex concepts accessible to students.',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [theme, setTheme] = useState('Light');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving teacher profile:', teacherProfile);
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  const handleSettingsSave = () => {
    console.log('Saving settings:', { notifications, theme });
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Profile & Settings</h1>
          <p className="text-slate-500 text-sm">Manage your profile and preferences</p>
        </div>
      </div>

      {/* Profile Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">My Profile</h2>

        <div className="flex flex-col md:flex-row items-start gap-6">
          {/* Profile Photo */}
          <div className="flex-shrink-0">
            <img
              src={teacherProfile.photo}
              alt={teacherProfile.name}
              className="w-24 h-24 rounded-full object-cover border-2 border-slate-200"
            />
          </div>

          {/* Profile Information */}
          <div className="flex-1 w-full">
            {isEditing ? (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={teacherProfile.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={teacherProfile.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={teacherProfile.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Grade Levels</label>
                    <input
                      type="text"
                      name="gradeLevels"
                      value={teacherProfile.gradeLevels}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    value={teacherProfile.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                  <textarea
                    name="bio"
                    value={teacherProfile.bio}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  ></textarea>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-800">{teacherProfile.name}</h3>
                  <p className="text-slate-500 text-sm">{teacherProfile.email}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-3 border border-blue-100">
                    <p className="text-xs text-slate-500">Subject</p>
                    <p className="text-sm font-medium text-slate-800">{teacherProfile.subject}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3 border border-green-100">
                    <p className="text-xs text-slate-500">Grade Levels</p>
                    <p className="text-sm font-medium text-slate-800">{teacherProfile.gradeLevels}</p>
                  </div>
                  <div className="bg-orange-50 rounded-lg p-3 border border-orange-100">
                    <p className="text-xs text-slate-500">Phone</p>
                    <p className="text-sm font-medium text-slate-800">{teacherProfile.phone}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs text-slate-500 mb-1">About</p>
                  <p className="text-sm text-slate-600">{teacherProfile.bio}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-slate-100">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2.5 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit Profile
            </button>
          )}
        </div>
      </div>

      {/* General Settings Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-6">General Settings</h2>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">Email Notifications</p>
                <p className="text-xs text-slate-500">Receive updates and alerts via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
              />
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
            </label>
          </div>

          {/* Theme Selection */}
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">App Theme</p>
                <p className="text-xs text-slate-500">Choose your preferred color scheme</p>
              </div>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option>Light</option>
              <option>Dark</option>
              <option>System</option>
            </select>
          </div>

          {/* Save Settings Button */}
          <div className="pt-4 border-t border-slate-100">
            <button
              onClick={handleSettingsSave}
              className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettingsPage;

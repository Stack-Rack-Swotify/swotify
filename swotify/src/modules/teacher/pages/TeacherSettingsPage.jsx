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
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
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
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleSettingsSave = () => {
    console.log('Saving settings:', { notifications, theme });
    alert('Settings saved successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {saveSuccess && (
        <div className="section-card p-4 bg-green-50 border-green-200 flex items-center gap-3 animate-slide-in-up">
          <div className="w-8 h-8 icon-box-green rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-700 font-semibold">Profile updated successfully!</p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 icon-box rounded-xl flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gradient">Profile & Settings</h1>
          <p className="text-slate-500 text-sm">Manage your profile and preferences</p>
        </div>
      </div>

      {/* Premium Profile Section */}
      <div className="section-card overflow-hidden">
        {/* Gradient Banner */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-500">
          <div className="absolute inset-0 holographic opacity-50"></div>
        </div>

        {/* Profile Info Section */}
        <div className="relative px-6 pb-6">
          {/* Profile Picture - Overlapping Banner */}
          <div className="absolute -top-14 left-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 rounded-full blur-md opacity-40 animate-pulse-glow"></div>
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-orange-500 p-1 shadow-xl">
                <img
                  src={teacherProfile.photo}
                  alt={teacherProfile.name}
                  className="w-full h-full rounded-full object-cover bg-white border-4 border-white"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 icon-box-green text-white rounded-full p-2 shadow-lg border-2 border-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>

          {/* Teacher Info */}
          <div className="pt-16 md:pt-4 md:pl-36">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={teacherProfile.name}
                    onChange={handleChange}
                    className="text-2xl font-bold text-slate-800 mb-3 bg-white border border-slate-200 rounded-xl px-4 py-2 w-full md:w-auto focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-slate-800 mb-1">{teacherProfile.name}</h2>
                )}

                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={teacherProfile.email}
                    onChange={handleChange}
                    className="text-sm text-slate-500 bg-white border border-slate-200 rounded-lg px-3 py-1.5 w-full md:w-auto focus:border-blue-400 outline-none mb-3"
                  />
                ) : (
                  <p className="text-slate-500 text-sm mb-3">{teacherProfile.email}</p>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-2">
                  <span className="badge badge-blue flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Teacher
                  </span>
                  <span className="badge badge-purple flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    {teacherProfile.subject}
                  </span>
                  <span className="badge badge-orange flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    {teacherProfile.gradeLevels}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-5 py-2.5 bg-white text-slate-600 font-semibold rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={isSaving}
                      className="px-5 py-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSaving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Saving...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                          Save Changes
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 hover:shadow hover-lift transition-all flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Subject Card */}
        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 icon-box rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="badge badge-blue">Core Subject</span>
          </div>
          <p className="text-sm text-slate-600 font-semibold mb-2">Subject Specialty</p>
          {isEditing ? (
            <input
              type="text"
              name="subject"
              value={teacherProfile.subject}
              onChange={handleChange}
              className="text-xl font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 w-full focus:border-blue-400 outline-none"
            />
          ) : (
            <p className="text-2xl font-bold text-gradient">{teacherProfile.subject}</p>
          )}
        </div>

        {/* Grade Levels Card */}
        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 icon-box-green rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="badge badge-green">Active</span>
          </div>
          <p className="text-sm text-slate-600 font-semibold mb-2">Grade Levels</p>
          {isEditing ? (
            <input
              type="text"
              name="gradeLevels"
              value={teacherProfile.gradeLevels}
              onChange={handleChange}
              className="text-xl font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 w-full focus:border-blue-400 outline-none"
            />
          ) : (
            <p className="text-2xl font-bold text-gradient">{teacherProfile.gradeLevels}</p>
          )}
        </div>

        {/* Phone Card */}
        <div className="glass-card p-6 hover-lift">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 icon-box-orange rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <span className="badge badge-orange">Contact</span>
          </div>
          <p className="text-sm text-slate-600 font-semibold mb-2">Phone Number</p>
          {isEditing ? (
            <input
              type="text"
              name="phone"
              value={teacherProfile.phone}
              onChange={handleChange}
              className="text-xl font-bold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 w-full focus:border-blue-400 outline-none"
            />
          ) : (
            <p className="text-2xl font-bold text-gradient">{teacherProfile.phone}</p>
          )}
        </div>
      </div>

      {/* Bio Section */}
      <div className="section-card p-6 holographic border-2 border-purple-200 hover-lift">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 icon-box rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-gradient">About Me</h4>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-purple-100">
          {isEditing ? (
            <textarea
              name="bio"
              value={teacherProfile.bio}
              onChange={handleChange}
              rows="4"
              className="text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-4 py-3 w-full focus:border-blue-400 outline-none resize-none"
              placeholder="Write something about yourself..."
            ></textarea>
          ) : (
            <p className="text-slate-700 leading-relaxed font-medium">{teacherProfile.bio}</p>
          )}
        </div>
      </div>

      {/* General Settings Section */}
      <div className="section-card p-6">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 icon-box-orange rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-slate-800">General Settings</h4>
        </div>

        <div className="space-y-4">
          {/* Email Notifications */}
          <div className="stat-card hover-lift flex items-center justify-between">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#ea580c] to-[#f97316]"></div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">Email Notifications</p>
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
              <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#ea580c]"></div>
            </label>
          </div>

          {/* Theme Selection */}
          <div className="stat-card hover-lift flex items-center justify-between">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-400 to-pink-500"></div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800">App Theme</p>
                <p className="text-xs text-slate-500">Choose your preferred color scheme</p>
              </div>
            </div>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
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
              className="px-5 py-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white rounded-xl font-semibold transition-all hover:shadow-lg hover-lift flex items-center gap-2"
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

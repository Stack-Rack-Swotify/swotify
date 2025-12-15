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
    
    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-fade-in flex items-center gap-3';
    message.innerHTML = `
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span class="font-semibold">Profile updated successfully!</span>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  };

  const handleSettingsSave = () => {
    console.log('Saving settings:', { notifications, theme });
    
    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-6 py-4 rounded-xl shadow-2xl z-50 animate-fade-in flex items-center gap-3';
    message.innerHTML = `
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span class="font-semibold">Settings saved successfully!</span>
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50/50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            Teacher Profile & Settings
          </h1>
          <p className="text-slate-600 text-sm font-medium">Manage your profile information and application preferences</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 mb-6 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-slate-900 mb-8 flex items-center">
            <span className="w-1.5 h-8 bg-gradient-to-b from-blue-600 via-purple-600 to-pink-600 rounded-full mr-3"></span>
            My Profile
          </h2>
          
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-8">
            {/* Profile Photo */}
            <div className="relative flex-shrink-0">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 rounded-full blur-xl opacity-30"></div>
                <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1.5 shadow-xl">
                  <img
                    src={teacherProfile.photo}
                    alt={teacherProfile.name}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-full p-2.5 shadow-xl">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
            </div>

            {/* Profile Information */}
            <div className="flex-1 w-full">
              {isEditing ? (
                <div className="space-y-5">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      Name
                    </label>
                    <input 
                      type="text" 
                      name="name" 
                      id="name" 
                      value={teacherProfile.name} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 font-medium bg-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      Email
                    </label>
                    <input 
                      type="email" 
                      name="email" 
                      id="email" 
                      value={teacherProfile.email} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all duration-200 text-slate-900 font-medium bg-white"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="subject" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        Subject
                      </label>
                      <input 
                        type="text" 
                        name="subject" 
                        id="subject" 
                        value={teacherProfile.subject} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all duration-200 text-slate-900 font-medium bg-white"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="gradeLevels" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                        <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        Grade Levels
                      </label>
                      <input 
                        type="text" 
                        name="gradeLevels" 
                        id="gradeLevels" 
                        value={teacherProfile.gradeLevels} 
                        onChange={handleChange} 
                        className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-900 font-medium bg-white"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      Phone
                    </label>
                    <input 
                      type="text" 
                      name="phone" 
                      id="phone" 
                      value={teacherProfile.phone} 
                      onChange={handleChange} 
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 transition-all duration-200 text-slate-900 font-medium bg-white"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="bio" className="block text-sm font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                      </div>
                      Bio
                    </label>
                    <textarea 
                      name="bio" 
                      id="bio" 
                      value={teacherProfile.bio} 
                      onChange={handleChange} 
                      rows="4" 
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-slate-900 font-medium bg-white resize-none"
                    ></textarea>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-slate-50 to-blue-50/30 p-6 rounded-xl border-2 border-slate-200 shadow-sm">
                    <h3 className="text-2xl font-semibold text-slate-900 mb-2">{teacherProfile.name}</h3>
                    <p className="text-slate-600 flex items-center gap-2 mb-4 font-medium">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      {teacherProfile.email}
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 font-semibold">Subject</p>
                          <p className="text-sm font-semibold text-slate-900">{teacherProfile.subject}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200">
                        <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                          <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs text-slate-600 font-semibold">Grade Levels</p>
                          <p className="text-sm font-semibold text-slate-900">{teacherProfile.gradeLevels}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3 bg-white p-3 rounded-lg border border-slate-200 mb-5">
                      <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs text-slate-600 font-semibold">Phone</p>
                        <p className="text-sm font-semibold text-slate-900">{teacherProfile.phone}</p>
                      </div>
                    </div>
                    
                    <div className="pt-5 border-t-2 border-slate-200">
                      <p className="text-xs text-slate-600 mb-3 uppercase tracking-wide font-semibold">About</p>
                      <p className="text-sm text-slate-800 leading-relaxed font-medium">{teacherProfile.bio}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6 border-t-2 border-slate-100">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="px-6 py-3 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)} 
                className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* General Settings Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200/60 p-8 hover:shadow-xl transition-all duration-300">
          <h2 className="text-2xl font-semibold text-slate-900 mb-6 flex items-center">
            <span className="w-1.5 h-8 bg-gradient-to-b from-amber-600 via-purple-600 to-blue-600 rounded-full mr-3"></span>
            General Settings
          </h2>
          
          <p className="text-slate-700 mb-8 font-medium">
            Manage your application preferences and customize your experience
          </p>

          <div className="space-y-5">
            {/* Email Notifications */}
            <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50 to-blue-50/30 rounded-xl border-2 border-slate-200 hover:border-blue-300 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-500 rounded-xl blur-lg opacity-20"></div>
                  <div className="relative w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label htmlFor="notificationToggle" className="text-base font-semibold text-slate-900 block">Email Notifications</label>
                  <p className="text-sm text-slate-600 font-medium">Receive updates and alerts via email</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  id="notificationToggle" 
                  className="sr-only peer" 
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                <div className="w-14 h-7 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600 shadow-inner"></div>
              </label>
            </div>

            {/* Theme Selection */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-50 to-purple-50/30 rounded-xl border-2 border-slate-200 hover:border-purple-300 transition-all duration-200 hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-purple-500 rounded-xl blur-lg opacity-20"></div>
                  <div className="relative w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center shadow-md">
                    <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <label htmlFor="themeSelect" className="text-base font-semibold text-slate-900 block">App Theme</label>
                  <p className="text-sm text-slate-600 font-medium">Choose your preferred color scheme</p>
                </div>
              </div>
              <select 
                id="themeSelect" 
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="px-5 py-3 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 text-slate-900 font-semibold bg-white appearance-none cursor-pointer min-w-[140px] shadow-sm"
              >
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>

            {/* Save Settings Button */}
            <div className="pt-6 border-t-2 border-slate-100">
              <button 
                onClick={handleSettingsSave}
                className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettingsPage;

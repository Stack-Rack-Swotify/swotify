import React, { useState } from 'react';

const AdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    schoolName: 'Swotify Academy',
    adminEmail: 'admin@swotify.com',
    contactPhone: '+91 98765 43210',
    address: '123 Education Street, Mumbai, Maharashtra',
    timezone: 'Asia/Kolkata',
    language: 'English',
    academicYear: '2024-2025',
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    maintenanceMode: false,
    darkMode: false,
    twoFactorAuth: true,
    autoBackup: true,
  });

  const [saved, setSaved] = useState(false);
  const [activeSection, setActiveSection] = useState('general');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const sections = [
    { id: 'general', name: 'General', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'system', name: 'System', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z', gradient: 'from-purple-500 to-pink-500' },
    { id: 'notifications', name: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', gradient: 'from-emerald-500 to-teal-500' },
    { id: 'security', name: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', gradient: 'from-rose-500 to-pink-500' },
    { id: 'integrations', name: 'Integrations', icon: 'M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z', gradient: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Premium Enhanced Header */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border-b-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse shadow-lg"></div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Admin Settings
                </h1>
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-1 font-bold">Configure system-wide preferences and options</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 flex items-center gap-3 border-2 border-white/20"
            >
              <svg className="w-6 h-6 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto p-6">
        {/* Premium Success Message */}
        {saved && (
          <div className="mb-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl shadow-2xl border-2 border-emerald-400 dark:border-emerald-600 p-6 flex items-center gap-5 animate-slide-down overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"></div>
            <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="relative">
              <p className="text-lg font-extrabold text-slate-900 dark:text-gray-100">Settings saved successfully!</p>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Your changes have been applied to the system.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Premium Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-5 sticky top-24">
              <h3 className="text-sm font-extrabold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-5 px-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                Settings Menu
              </h3>
              <div className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-extrabold text-sm transition-all duration-300 ${
                      activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-xl scale-105 border-2 border-white/20'
                        : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700/50 hover:scale-102'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeSection === section.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-gray-700'}`}>
                      <svg className={`w-5 h-5 ${activeSection === section.id ? 'text-white' : `text-slate-600 dark:text-gray-400`}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
                      </svg>
                    </div>
                    {section.name}
                  </button>
                ))}
              </div>

              {/* Premium System Status */}
              <div className="mt-6 pt-6 border-t-2 border-slate-200 dark:border-gray-700">
                <h3 className="text-sm font-extrabold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-4 px-3 flex items-center gap-2">
                  <div className="w-1 h-5 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
                  System Status
                </h3>
                <div className="space-y-3 px-3">
                  <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                    <span className="text-xs font-extrabold text-slate-600 dark:text-gray-400">Server Status</span>
                    <span className="flex items-center gap-2 text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                      <span className="relative w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse">
                        <span className="absolute inset-0 bg-emerald-500 rounded-full animate-ping"></span>
                      </span>
                      Online
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                    <span className="text-xs font-extrabold text-slate-600 dark:text-gray-400">Database</span>
                    <span className="flex items-center gap-2 text-xs font-extrabold text-blue-600 dark:text-blue-400">
                      <span className="relative w-2.5 h-2.5 bg-blue-500 rounded-full animate-pulse">
                        <span className="absolute inset-0 bg-blue-500 rounded-full animate-ping"></span>
                      </span>
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                    <span className="text-xs font-extrabold text-slate-600 dark:text-gray-400">Last Backup</span>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-gray-100">2h ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* General Settings */}
            {activeSection === 'general' && (
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">School Information</h2>
                </div>
                <div className="relative space-y-6">
                  <div>
                    <label htmlFor="schoolName" className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                      School Name
                    </label>
                    <input
                      type="text"
                      id="schoolName"
                      name="schoolName"
                      value={settings.schoolName}
                      onChange={handleChange}
                      className="w-full px-5 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-700 font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="adminEmail" className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Admin Email
                      </label>
                      <input
                        type="email"
                        id="adminEmail"
                        name="adminEmail"
                        value={settings.adminEmail}
                        onChange={handleChange}
                        className="w-full px-5 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-700 font-bold"
                      />
                    </div>

                    <div>
                      <label htmlFor="contactPhone" className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                        <svg className="w-4 h-4 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        id="contactPhone"
                        name="contactPhone"
                        value={settings.contactPhone}
                        onChange={handleChange}
                        className="w-full px-5 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-700 font-bold"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      School Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      value={settings.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-5 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-700 resize-none font-bold"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* System Configuration */}
            {activeSection === 'system' && (
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">System Configuration</h2>
                </div>
                <div className="relative space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { id: 'timezone', label: 'Timezone', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z', color: 'blue', options: ['Asia/Kolkata (IST)', 'America/New_York (EST)', 'Europe/London (GMT)', 'Asia/Tokyo (JST)'], values: ['Asia/Kolkata', 'America/New_York', 'Europe/London', 'Asia/Tokyo'] },
                      { id: 'language', label: 'Language', icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129', color: 'emerald', options: ['English', 'Hindi', 'Spanish', 'French'], values: ['English', 'Hindi', 'Spanish', 'French'] },
                      { id: 'academicYear', label: 'Academic Year', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z', color: 'purple', options: ['2024-2025', '2025-2026', '2026-2027'], values: ['2024-2025', '2025-2026', '2026-2027'] }
                    ].map((field) => (
                      <div key={field.id}>
                        <label htmlFor={field.id} className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-2 flex items-center gap-2">
                          <svg className={`w-4 h-4 text-${field.color}-600 dark:text-${field.color}-400`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d={field.icon} />
                          </svg>
                          {field.label}
                        </label>
                        <div className="relative">
                          <select
                            id={field.id}
                            name={field.id}
                            value={settings[field.id]}
                            onChange={handleChange}
                            className={`w-full px-5 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-4 focus:ring-${field.color}-500/20 focus:border-${field.color}-500 transition-all text-slate-900 dark:text-gray-100 bg-white dark:bg-gray-700 appearance-none cursor-pointer font-extrabold`}
                          >
                            {field.options.map((opt, idx) => (
                              <option key={idx} value={field.values[idx]}>{opt}</option>
                            ))}
                          </select>
                          <svg className="absolute right-4 top-4.5 w-5 h-5 text-slate-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Premium Toggle Cards */}
                  {[
                    { name: 'darkMode', title: 'Dark Mode', description: 'Enable dark theme across the platform', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z', gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', toggleColor: 'blue' },
                    { name: 'maintenanceMode', title: 'Maintenance Mode', description: '⚠️ Restricts system access to admins only', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', gradient: 'from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20', iconBg: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600 dark:text-rose-400', toggleColor: 'rose', warning: true }
                  ].map((toggle) => (
                    <div key={toggle.name} className={`p-6 bg-gradient-to-r ${toggle.gradient} rounded-2xl border-2 ${toggle.warning ? 'border-rose-300 dark:border-rose-700' : 'border-slate-200 dark:border-gray-700'} hover:shadow-lg transition-all`}>
                      <label className="flex items-center justify-between cursor-pointer">
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 ${toggle.iconBg} rounded-xl flex items-center justify-center shadow-sm`}>
                            <svg className={`w-6 h-6 ${toggle.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d={toggle.icon} />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{toggle.title}</p>
                            <p className={`text-xs ${toggle.warning ? 'text-rose-600 dark:text-rose-400 font-extrabold' : 'text-slate-600 dark:text-gray-400 font-bold'}`}>{toggle.description}</p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            name={toggle.name}
                            checked={settings[toggle.name]}
                            onChange={handleChange}
                            className="sr-only peer"
                          />
                          <div className={`w-16 h-8 bg-slate-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${toggle.toggleColor}-300 dark:peer-focus:ring-${toggle.toggleColor}-800 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-${toggle.toggleColor}-600 peer-checked:to-${toggle.toggleColor}-500 shadow-inner`}></div>
                        </label>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === 'notifications' && (
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Notification Preferences</h2>
                </div>
                <div className="relative space-y-4">
                  {[
                    { name: 'emailNotifications', title: 'Email Notifications', description: 'Receive important updates via email', icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', border: 'border-blue-300 dark:border-blue-700', toggleColor: 'blue' },
                    { name: 'smsNotifications', title: 'SMS Notifications', description: 'Get text messages for critical alerts', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-700', toggleColor: 'emerald' },
                    { name: 'pushNotifications', title: 'Push Notifications', description: 'Real-time browser notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', gradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20', iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600 dark:text-purple-400', border: 'border-purple-300 dark:border-purple-700', toggleColor: 'purple' }
                  ].map((notif) => (
                    <label key={notif.name} className={`flex items-center justify-between p-6 bg-gradient-to-r ${notif.gradient} rounded-2xl border-2 ${notif.border} hover:shadow-xl transition-all cursor-pointer group`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${notif.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          <svg className={`w-7 h-7 ${notif.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d={notif.icon} />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{notif.title}</p>
                          <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{notif.description}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name={notif.name}
                          checked={settings[notif.name]}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className={`w-16 h-8 bg-slate-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${notif.toggleColor}-300 dark:peer-focus:ring-${notif.toggleColor}-800 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-${notif.toggleColor}-600 peer-checked:to-${notif.toggleColor}-500 shadow-inner`}></div>
                      </label>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Security */}
            {activeSection === 'security' && (
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Security Settings</h2>
                </div>
                <div className="relative space-y-4">
                  {[
                    { name: 'twoFactorAuth', title: 'Two-Factor Authentication', description: 'Enhanced security for admin accounts', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z', gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20', iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600 dark:text-blue-400', border: 'border-blue-300 dark:border-blue-700', toggleColor: 'blue' },
                    { name: 'autoBackup', title: 'Automatic Backups', description: 'Daily system and database backups', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4', gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20', iconBg: 'bg-emerald-100 dark:bg-emerald-900/30', iconColor: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-700', toggleColor: 'emerald' }
                  ].map((security) => (
                    <label key={security.name} className={`flex items-center justify-between p-6 bg-gradient-to-r ${security.gradient} rounded-2xl border-2 ${security.border} hover:shadow-xl transition-all cursor-pointer group`}>
                      <div className="flex items-center gap-4">
                        <div className={`w-14 h-14 ${security.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                          <svg className={`w-7 h-7 ${security.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d={security.icon} />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{security.title}</p>
                          <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{security.description}</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name={security.name}
                          checked={settings[security.name]}
                          onChange={handleChange}
                          className="sr-only peer"
                        />
                        <div className={`w-16 h-8 bg-slate-200 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-${security.toggleColor}-300 dark:peer-focus:ring-${security.toggleColor}-800 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-${security.toggleColor}-600 peer-checked:to-${security.toggleColor}-500 shadow-inner`}></div>
                      </label>
                    </label>
                  ))}

                  <div className="mt-6 space-y-4">
                    {[
                      { title: 'Change Password', description: 'Update your admin password', icon: 'M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z', gradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20', iconBg: 'bg-amber-100 dark:bg-amber-900/30', iconColor: 'text-amber-600 dark:text-amber-400', border: 'border-amber-300 dark:border-amber-700', hoverIconColor: 'group-hover:text-amber-600 dark:group-hover:text-amber-400' },
                      { title: 'View Security Logs', description: 'Monitor system access and activities', icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z', gradient: 'from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20', iconBg: 'bg-rose-100 dark:bg-rose-900/30', iconColor: 'text-rose-600 dark:text-rose-400', border: 'border-rose-300 dark:border-rose-700', hoverIconColor: 'group-hover:text-rose-600 dark:group-hover:text-rose-400' }
                    ].map((action, idx) => (
                      <button key={idx} className={`w-full p-6 bg-gradient-to-r ${action.gradient} rounded-2xl border-2 ${action.border} hover:shadow-xl transition-all text-left group`}>
                        <div className="flex items-center gap-4">
                          <div className={`w-14 h-14 ${action.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                            <svg className={`w-7 h-7 ${action.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d={action.icon} />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{action.title}</p>
                            <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{action.description}</p>
                          </div>
                          <svg className={`w-6 h-6 text-slate-400 ${action.hoverIconColor} transition-colors`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Integrations */}
            {activeSection === 'integrations' && (
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Third-Party Integrations</h2>
                </div>
                <div className="relative text-center py-20 bg-gradient-to-r from-slate-50 to-blue-50 dark:from-gray-700/50 dark:to-gray-800/50 rounded-2xl border-2 border-slate-200 dark:border-gray-700">
                  <div className="relative inline-block mb-6">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 via-orange-500 to-yellow-500 rounded-2xl blur opacity-20 animate-pulse"></div>
                    <div className="relative w-24 h-24 bg-gradient-to-br from-slate-100 to-amber-100 dark:from-gray-700 dark:to-gray-600 rounded-2xl flex items-center justify-center shadow-xl">
                      <svg className="w-12 h-12 text-slate-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                      </svg>
                    </div>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900 dark:text-gray-100 mb-3">Integrations Coming Soon</p>
                  <p className="text-sm text-slate-600 dark:text-gray-400 mb-8 max-w-md mx-auto font-bold">Connect with popular tools like Google Classroom, Microsoft Teams, Zoom, and more</p>
                  <button className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-extrabold rounded-xl hover:shadow-2xl transition-all hover:scale-110 border-2 border-white/20">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Request Integration
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default AdminSettingsPage;


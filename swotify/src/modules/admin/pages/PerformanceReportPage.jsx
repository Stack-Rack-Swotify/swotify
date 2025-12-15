import React, { useState, useEffect } from 'react';


const AppSettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    updates: true,
    marketing: false,
  });
  const [language, setLanguage] = useState('en');
  const [autoSave, setAutoSave] = useState(true);
  const [dataSync, setDataSync] = useState(true);
  const [accessibility, setAccessibility] = useState({
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false,
  });
  const [privacy, setPrivacy] = useState({
    analytics: true,
    profileVisibility: 'public',
    activityStatus: true,
  });
  const [showSaveToast, setShowSaveToast] = useState(false);
  const [activeSection, setActiveSection] = useState('appearance');


  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);


  const handleSaveSettings = () => {
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };


  const sections = [
    { id: 'appearance', name: 'Appearance', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01', gradient: 'from-blue-500 to-cyan-500' },
    { id: 'notifications', name: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9', gradient: 'from-purple-500 to-pink-500' },
    { id: 'language', name: 'Language & Region', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z', gradient: 'from-emerald-500 to-teal-500' },
    { id: 'accessibility', name: 'Accessibility', icon: 'M13 10V3L4 14h7v7l9-11h-7z', gradient: 'from-amber-500 to-orange-500' },
    { id: 'privacy', name: 'Privacy & Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z', gradient: 'from-rose-500 to-pink-500' },
    { id: 'preferences', name: 'Preferences', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z', gradient: 'from-indigo-500 to-purple-500' },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Premium Decorative Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-emerald-500/10 via-teal-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-500/5 to-pink-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Premium Success Toast */}
      {showSaveToast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl p-5 shadow-2xl flex items-center gap-4 border-2 border-emerald-300 dark:border-emerald-700 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10"></div>
            <div className="relative w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDuration: '2s' }}>
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="relative">
              <p className="font-extrabold text-base text-slate-900 dark:text-gray-100">Settings Saved!</p>
              <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Your preferences have been updated</p>
            </div>
          </div>
        </div>
      )}


      {/* Premium Enhanced Header */}
      <div className="relative z-10 bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl border-b-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl blur opacity-50 animate-pulse"></div>
                <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center shadow-2xl">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                  App Settings
                </h1>
                <p className="text-sm text-slate-600 dark:text-gray-400 mt-1 font-bold">Customize your experience</p>
              </div>
            </div>
            <button
              onClick={handleSaveSettings}
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
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Premium Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-5 sticky top-24">
              <h3 className="text-sm font-extrabold text-slate-600 dark:text-gray-400 uppercase tracking-wider mb-5 px-3 flex items-center gap-2">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 rounded-full"></div>
                Settings Menu
              </h3>
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`group w-full text-left px-4 py-3.5 rounded-xl font-extrabold text-sm transition-all duration-300 flex items-center gap-3 ${
                      activeSection === section.id
                        ? `bg-gradient-to-r ${section.gradient} text-white shadow-xl scale-105 border-2 border-white/20`
                        : 'text-slate-600 dark:text-gray-400 hover:bg-slate-50 dark:hover:bg-gray-700/50 hover:scale-102'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${activeSection === section.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-gray-700'}`}>
                      <svg className={`w-5 h-5 ${activeSection === section.id ? 'text-white' : 'text-slate-600 dark:text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
                      </svg>
                    </div>
                    {section.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>


          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Premium Appearance Section */}
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-cyan-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="relative flex items-center gap-4 mb-7">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg">
                      <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Theme Preference</h2>
                      <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Choose your preferred color scheme</p>
                    </div>
                  </div>


                  <div className="relative grid grid-cols-1 md:grid-cols-3 gap-5">
                    {[
                      { value: 'light', name: 'Light Mode', desc: 'Bright and clear', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', bg: 'bg-white dark:bg-gray-700', iconColor: 'text-yellow-500' },
                      { value: 'dark', name: 'Dark Mode', desc: 'Easy on the eyes', icon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z', bg: 'bg-slate-900', iconColor: 'text-blue-400' },
                      { value: 'auto', name: 'Auto Mode', desc: 'System preference', icon: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z', bg: 'bg-gradient-to-br from-orange-400 to-blue-900', iconColor: 'text-white' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setTheme(option.value)}
                        className={`relative p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                          theme === option.value
                            ? 'border-blue-500 dark:border-blue-600 bg-blue-50 dark:bg-blue-900/20 shadow-2xl scale-105'
                            : 'border-slate-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 hover:shadow-lg'
                        }`}
                      >
                        <div className={`w-20 h-20 mx-auto mb-4 rounded-xl ${option.bg} border-2 border-slate-200 dark:border-gray-600 flex items-center justify-center shadow-xl`}>
                          <svg className={`w-10 h-10 ${option.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d={option.icon} />
                          </svg>
                        </div>
                        <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100 mb-1">{option.name}</p>
                        <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{option.desc}</p>
                        {theme === option.value && (
                          <div className="absolute top-3 right-3 w-7 h-7 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}


            {/* Premium Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Notification Preferences</h2>
                    <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Manage how you receive updates</p>
                  </div>
                </div>


                <div className="relative space-y-4">
                  {Object.entries(notifications).map(([key, value]) => {
                    const notifMeta = {
                      email: { icon: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z', desc: 'Receive notifications via email', gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20', iconBg: 'from-blue-500 to-cyan-500', border: 'border-blue-300 dark:border-blue-700' },
                      push: { icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z', desc: 'Get push notifications on your device', gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20', iconBg: 'from-emerald-500 to-teal-500', border: 'border-emerald-300 dark:border-emerald-700' },
                      sms: { icon: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z', desc: 'SMS alerts for important updates', gradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20', iconBg: 'from-purple-500 to-pink-500', border: 'border-purple-300 dark:border-purple-700' },
                      updates: { icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15', desc: 'System and feature updates', gradient: 'from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20', iconBg: 'from-amber-500 to-orange-500', border: 'border-amber-300 dark:border-amber-700' },
                      marketing: { icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z', desc: 'Promotional content and offers', gradient: 'from-rose-50 to-pink-50 dark:from-rose-900/20 dark:to-pink-900/20', iconBg: 'from-rose-500 to-pink-500', border: 'border-rose-300 dark:border-rose-700' }
                    }[key];

                    return (
                      <div
                        key={key}
                        className={`flex items-center justify-between p-5 bg-gradient-to-r ${notifMeta.gradient} rounded-2xl border-2 ${notifMeta.border} hover:shadow-lg transition-all`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${notifMeta.iconBg} flex items-center justify-center shadow-lg`}>
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d={notifMeta.icon} />
                            </svg>
                          </div>
                          <div>
                            <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100 capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()} Notifications
                            </p>
                            <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{notifMeta.desc}</p>
                          </div>
                        </div>
                        <label className="relative inline-block w-16 h-8 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={() => setNotifications({ ...notifications, [key]: !value })}
                            className="sr-only peer"
                          />
                          <div className="w-16 h-8 bg-slate-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600 shadow-inner"></div>
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}


            {/* Premium Language Section */}
            {activeSection === 'language' && (
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Language & Region</h2>
                    <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Set your language and regional preferences</p>
                  </div>
                </div>


                <div className="relative space-y-5">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-4">Display Language</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { code: 'en', name: 'English', flag: '🇺🇸' },
                        { code: 'es', name: 'Spanish', flag: '🇪🇸' },
                        { code: 'fr', name: 'French', flag: '🇫🇷' },
                        { code: 'de', name: 'German', flag: '🇩🇪' },
                        { code: 'zh', name: 'Chinese', flag: '🇨🇳' },
                        { code: 'ja', name: 'Japanese', flag: '🇯🇵' },
                      ].map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => setLanguage(lang.code)}
                          className={`flex items-center gap-4 p-5 rounded-2xl border-2 transition-all hover:scale-105 ${
                            language === lang.code
                              ? 'border-emerald-500 dark:border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20 shadow-xl scale-105'
                              : 'border-slate-200 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-md'
                          }`}
                        >
                          <span className="text-4xl">{lang.flag}</span>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{lang.name}</p>
                            <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{lang.code.toUpperCase()}</p>
                          </div>
                          {language === lang.code && (
                            <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* Premium Accessibility Section */}
            {activeSection === 'accessibility' && (
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-yellow-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Accessibility Options</h2>
                    <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Customize for better usability</p>
                  </div>
                </div>


                <div className="relative space-y-5">
                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-4">Font Size</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['small', 'medium', 'large'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setAccessibility({ ...accessibility, fontSize: size })}
                          className={`p-5 rounded-2xl border-2 transition-all hover:scale-105 ${
                            accessibility.fontSize === size
                              ? 'border-amber-500 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/20 shadow-xl scale-105'
                              : 'border-slate-200 dark:border-gray-700 hover:border-amber-300 dark:hover:border-amber-600'
                          }`}
                        >
                          <p
                            className={`font-extrabold text-slate-900 dark:text-gray-100 mb-2 ${
                              size === 'small' ? 'text-base' : size === 'medium' ? 'text-xl' : 'text-2xl'
                            }`}
                          >
                            Aa
                          </p>
                          <p className="text-xs text-slate-600 dark:text-gray-400 capitalize font-bold">{size}</p>
                        </button>
                      ))}
                    </div>
                  </div>


                  <div className="space-y-4">
                    {[
                      { key: 'highContrast', title: 'High Contrast Mode', desc: 'Increase visual clarity', gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20', border: 'border-blue-300 dark:border-blue-700' },
                      { key: 'reducedMotion', title: 'Reduced Motion', desc: 'Minimize animations', gradient: 'from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20', border: 'border-purple-300 dark:border-purple-700' }
                    ].map((option) => (
                      <div key={option.key} className={`flex items-center justify-between p-5 bg-gradient-to-r ${option.gradient} rounded-2xl border-2 ${option.border}`}>
                        <div>
                          <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{option.title}</p>
                          <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{option.desc}</p>
                        </div>
                        <label className="relative inline-block w-16 h-8 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={accessibility[option.key]}
                            onChange={() =>
                              setAccessibility({ ...accessibility, [option.key]: !accessibility[option.key] })
                            }
                            className="sr-only peer"
                          />
                          <div className="w-16 h-8 bg-slate-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}


            {/* Premium Privacy Section */}
            {activeSection === 'privacy' && (
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-pink-500/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">Privacy & Security</h2>
                    <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Control your data and privacy</p>
                  </div>
                </div>


                <div className="relative space-y-5">
                  <div className="flex items-center justify-between p-5 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl border-2 border-blue-300 dark:border-blue-700">
                    <div>
                      <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">Usage Analytics</p>
                      <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">Help improve the app with anonymous data</p>
                    </div>
                    <label className="relative inline-block w-16 h-8 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.analytics}
                        onChange={() => setPrivacy({ ...privacy, analytics: !privacy.analytics })}
                        className="sr-only peer"
                      />
                      <div className="w-16 h-8 bg-slate-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600"></div>
                    </label>
                  </div>


                  <div>
                    <label className="block text-sm font-extrabold text-slate-700 dark:text-gray-300 mb-4">Profile Visibility</label>
                    <div className="grid grid-cols-3 gap-4">
                      {[
                        { value: 'public', icon: 'M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
                        { value: 'friends', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z' },
                        { value: 'private', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setPrivacy({ ...privacy, profileVisibility: option.value })}
                          className={`p-5 rounded-2xl border-2 transition-all hover:scale-105 ${
                            privacy.profileVisibility === option.value
                              ? 'border-rose-500 dark:border-rose-600 bg-rose-50 dark:bg-rose-900/20 shadow-xl scale-105'
                              : 'border-slate-200 dark:border-gray-700 hover:border-rose-300 dark:hover:border-rose-600'
                          }`}
                        >
                          <div className="w-12 h-12 mx-auto mb-3 bg-gradient-to-br from-rose-100 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-xl flex items-center justify-center">
                            <svg className="w-6 h-6 text-rose-600 dark:text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d={option.icon} />
                            </svg>
                          </div>
                          <p className="text-xs font-extrabold text-slate-900 dark:text-gray-100 capitalize">{option.value}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* Premium Preferences Section */}
            {activeSection === 'preferences' && (
              <div className="group bg-white/90 dark:bg-gray-800/90 backdrop-blur-2xl rounded-2xl border-2 border-slate-200/60 dark:border-gray-700/50 shadow-xl p-7 hover:shadow-2xl transition-all overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative flex items-center gap-4 mb-7">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 dark:text-gray-100">App Preferences</h2>
                    <p className="text-sm text-slate-600 dark:text-gray-400 font-bold">Additional settings and options</p>
                  </div>
                </div>


                <div className="relative space-y-4">
                  {[
                    { key: 'autoSave', title: 'Auto-Save', desc: 'Automatically save your work', gradient: 'from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20', border: 'border-blue-300 dark:border-blue-700', icon: 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4' },
                    { key: 'dataSync', title: 'Cloud Sync', desc: 'Sync data across devices', gradient: 'from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20', border: 'border-emerald-300 dark:border-emerald-700', icon: 'M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z' }
                  ].map((pref) => (
                    <div key={pref.key} className={`flex items-center justify-between p-5 bg-gradient-to-r ${pref.gradient} rounded-2xl border-2 ${pref.border} hover:shadow-lg transition-all`}>
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/50 dark:bg-gray-700/50 rounded-xl flex items-center justify-center">
                          <svg className="w-6 h-6 text-slate-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d={pref.icon} />
                          </svg>
                        </div>
                        <div>
                          <p className="text-sm font-extrabold text-slate-900 dark:text-gray-100">{pref.title}</p>
                          <p className="text-xs text-slate-600 dark:text-gray-400 font-bold">{pref.desc}</p>
                        </div>
                      </div>
                      <label className="relative inline-block w-16 h-8 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={pref.key === 'autoSave' ? autoSave : dataSync}
                          onChange={() => pref.key === 'autoSave' ? setAutoSave(!autoSave) : setDataSync(!dataSync)}
                          className="sr-only peer"
                        />
                        <div className="w-16 h-8 bg-slate-300 dark:bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-8 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-purple-600"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>


      <style>{`
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};


export default AppSettingsPage;

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
    // Save settings logic here
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const sections = [
    { id: 'appearance', name: 'Appearance', icon: '🎨' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'language', name: 'Language & Region', icon: '🌐' },
    { id: 'accessibility', name: 'Accessibility', icon: '♿' },
    { id: 'privacy', name: 'Privacy & Security', icon: '🔒' },
    { id: 'preferences', name: 'Preferences', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20">
      {/* Success Toast */}
      {showSaveToast && (
        <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl p-4 shadow-2xl flex items-center gap-3 border-2 border-emerald-300">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm">Settings Saved!</p>
              <p className="text-xs text-white/90">Your preferences have been updated</p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-xl border-b border-slate-200/60 shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#ea580c] flex items-center justify-center shadow-2xl">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                  App Settings
                </h1>
                <p className="text-sm text-slate-600 mt-0.5">Customize your experience</p>
              </div>
            </div>
            <button
              onClick={handleSaveSettings}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg p-4 sticky top-24">
              <nav className="space-y-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center gap-3 ${activeSection === section.id
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105'
                        : 'text-slate-700 hover:bg-slate-100'
                      }`}
                  >
                    <span className="text-xl">{section.icon}</span>
                    {section.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Appearance Section */}
            {activeSection === 'appearance' && (
              <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                      <span className="text-2xl">🎨</span>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-slate-900">Theme Preference</h2>
                      <p className="text-sm text-slate-600">Choose your preferred color scheme</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      onClick={() => setTheme('light')}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${theme === 'light'
                          ? 'border-blue-500 bg-blue-50 shadow-xl scale-105'
                          : 'border-slate-200 hover:border-blue-300 hover:shadow-lg'
                        }`}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-white border-2 border-slate-200 flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Light Mode</p>
                      <p className="text-xs text-slate-600">Bright and clear</p>
                      {theme === 'light' && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setTheme('dark')}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${theme === 'dark'
                          ? 'border-purple-500 bg-purple-50 shadow-xl scale-105'
                          : 'border-slate-200 hover:border-purple-300 hover:shadow-lg'
                        }`}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-slate-900 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Dark Mode</p>
                      <p className="text-xs text-slate-600">Easy on the eyes</p>
                      {theme === 'dark' && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>

                    <button
                      onClick={() => setTheme('auto')}
                      className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${theme === 'auto'
                          ? 'border-emerald-500 bg-emerald-50 shadow-xl scale-105'
                          : 'border-slate-200 hover:border-emerald-300 hover:shadow-lg'
                        }`}
                    >
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-orange-400 to-blue-900 border-2 border-slate-200 flex items-center justify-center shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <p className="text-sm font-bold text-slate-900 mb-1">Auto Mode</p>
                      <p className="text-xs text-slate-600">System preference</p>
                      {theme === 'auto' && (
                        <div className="absolute top-3 right-3 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Section */}
            {activeSection === 'notifications' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🔔</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Notification Preferences</h2>
                    <p className="text-sm text-slate-600">Manage how you receive updates</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {Object.entries(notifications).map(([key, value]) => (
                    <div
                      key={key}
                      className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl border border-slate-200 hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          {key === 'email' && <span className="text-white text-lg">📧</span>}
                          {key === 'push' && <span className="text-white text-lg">📲</span>}
                          {key === 'sms' && <span className="text-white text-lg">💬</span>}
                          {key === 'updates' && <span className="text-white text-lg">🔄</span>}
                          {key === 'marketing' && <span className="text-white text-lg">📣</span>}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 capitalize">
                            {key.replace(/([A-Z])/g, ' $1').trim()} Notifications
                          </p>
                          <p className="text-xs text-slate-600">
                            {key === 'email' && 'Receive notifications via email'}
                            {key === 'push' && 'Get push notifications on your device'}
                            {key === 'sms' && 'SMS alerts for important updates'}
                            {key === 'updates' && 'System and feature updates'}
                            {key === 'marketing' && 'Promotional content and offers'}
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-block w-14 h-8 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={value}
                          onChange={() => setNotifications({ ...notifications, [key]: !value })}
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500 shadow-inner"></div>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Language Section */}
            {activeSection === 'language' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🌐</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Language & Region</h2>
                    <p className="text-sm text-slate-600">Set your language and regional preferences</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Display Language</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${language === lang.code
                              ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
                              : 'border-slate-200 hover:border-blue-300 hover:shadow-md'
                            }`}
                        >
                          <span className="text-3xl">{lang.flag}</span>
                          <div className="flex-1 text-left">
                            <p className="text-sm font-bold text-slate-900">{lang.name}</p>
                            <p className="text-xs text-slate-600">{lang.code.toUpperCase()}</p>
                          </div>
                          {language === lang.code && (
                            <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
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

            {/* Accessibility Section */}
            {activeSection === 'accessibility' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">♿</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Accessibility Options</h2>
                    <p className="text-sm text-slate-600">Customize for better usability</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Font Size</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['small', 'medium', 'large'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setAccessibility({ ...accessibility, fontSize: size })}
                          className={`p-4 rounded-xl border-2 transition-all ${accessibility.fontSize === size
                              ? 'border-blue-500 bg-blue-50 shadow-lg'
                              : 'border-slate-200 hover:border-blue-300'
                            }`}
                        >
                          <p
                            className={`font-bold text-slate-900 mb-1 ${size === 'small' ? 'text-sm' : size === 'medium' ? 'text-base' : 'text-lg'
                              }`}
                          >
                            Aa
                          </p>
                          <p className="text-xs text-slate-600 capitalize">{size}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <p className="text-sm font-bold text-slate-900">High Contrast Mode</p>
                        <p className="text-xs text-slate-600">Increase visual clarity</p>
                      </div>
                      <label className="relative inline-block w-14 h-8 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={accessibility.highContrast}
                          onChange={() =>
                            setAccessibility({ ...accessibility, highContrast: !accessibility.highContrast })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div>
                        <p className="text-sm font-bold text-slate-900">Reduced Motion</p>
                        <p className="text-xs text-slate-600">Minimize animations</p>
                      </div>
                      <label className="relative inline-block w-14 h-8 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={accessibility.reducedMotion}
                          onChange={() =>
                            setAccessibility({ ...accessibility, reducedMotion: !accessibility.reducedMotion })
                          }
                          className="sr-only peer"
                        />
                        <div className="w-14 h-8 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Privacy Section */}
            {activeSection === 'privacy' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">🔒</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">Privacy & Security</h2>
                    <p className="text-sm text-slate-600">Control your data and privacy</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Usage Analytics</p>
                      <p className="text-xs text-slate-600">Help improve the app with anonymous data</p>
                    </div>
                    <label className="relative inline-block w-14 h-8 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={privacy.analytics}
                        onChange={() => setPrivacy({ ...privacy, analytics: !privacy.analytics })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
                    </label>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">Profile Visibility</label>
                    <div className="grid grid-cols-3 gap-3">
                      {['public', 'friends', 'private'].map((option) => (
                        <button
                          key={option}
                          onClick={() => setPrivacy({ ...privacy, profileVisibility: option })}
                          className={`p-4 rounded-xl border-2 transition-all ${privacy.profileVisibility === option
                              ? 'border-blue-500 bg-blue-50 shadow-lg'
                              : 'border-slate-200 hover:border-blue-300'
                            }`}
                        >
                          <p className="text-2xl mb-2">
                            {option === 'public' && '🌍'}
                            {option === 'friends' && '👥'}
                            {option === 'private' && '🔒'}
                          </p>
                          <p className="text-xs font-bold text-slate-900 capitalize">{option}</p>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Preferences Section */}
            {activeSection === 'preferences' && (
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">App Preferences</h2>
                    <p className="text-sm text-slate-600">Additional settings and options</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Auto-Save</p>
                      <p className="text-xs text-slate-600">Automatically save your work</p>
                    </div>
                    <label className="relative inline-block w-14 h-8 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={autoSave}
                        onChange={() => setAutoSave(!autoSave)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <p className="text-sm font-bold text-slate-900">Cloud Sync</p>
                      <p className="text-xs text-slate-600">Sync data across devices</p>
                    </div>
                    <label className="relative inline-block w-14 h-8 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={dataSync}
                        onChange={() => setDataSync(!dataSync)}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-8 bg-slate-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-7 after:w-7 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-purple-500"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
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

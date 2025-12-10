import React, { useState, useEffect } from 'react';

const SuperAdminAppSettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [autoBackup, setAutoBackup] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const handleThemeChange = (value) => {
    setTheme(value);
  };

  const handleSaveSettings = () => {
    // Save settings logic here
    setShowSaveSuccess(true);
    setTimeout(() => setShowSaveSuccess(false), 3000);
  };

  const settingsSections = [
    {
      title: 'Appearance',
      icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01',
      gradient: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
    },
    {
      title: 'Notifications',
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      gradient: 'from-purple-500 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
    },
    {
      title: 'Language & Region',
      icon: 'M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129',
      gradient: 'from-emerald-500 to-teal-500',
      bgGradient: 'from-emerald-50 to-teal-50',
    },
    {
      title: 'Security',
      icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      gradient: 'from-amber-500 to-orange-500',
      bgGradient: 'from-amber-50 to-orange-50',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white p-6 animate-fade-in">
      
      {/* Success Toast */}
      {showSaveSuccess && (
        <div className="fixed top-6 right-6 z-50 animate-in slide-in-from-right-5 duration-300">
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-emerald-200 p-5 flex items-start gap-4 max-w-md">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center flex-shrink-0 shadow-lg animate-pulse">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-900">Settings Saved!</p>
              <p className="text-xs text-slate-600 mt-1 font-medium">Your preferences have been updated successfully.</p>
            </div>
            <button onClick={() => setShowSaveSuccess(false)} className="text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-100 rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        
        {/* Premium Header */}
        <div className="mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 shadow-2xl border-2 border-slate-700/50">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-3">
                  App Settings
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 text-xs font-bold rounded-lg shadow-lg animate-pulse">
                    ADMIN
                  </span>
                </h1>
                <p className="text-slate-300 text-sm font-medium">Customize your application preferences and configurations</p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white text-sm font-bold">Settings Panel</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          
          {/* Appearance Settings */}
          <div className="group bg-white rounded-2xl shadow-lg border-2 border-slate-200/60 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className={`p-6 border-b-2 border-slate-100 bg-gradient-to-r ${settingsSections[0].bgGradient}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${settingsSections[0].gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={settingsSections[0].icon} />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{settingsSections[0].title}</h2>
                  <p className="text-sm text-slate-600 font-medium">Choose your preferred theme</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => handleThemeChange('light')}
                  className={`group/theme p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    theme === 'light'
                      ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg'
                      : 'border-slate-200 hover:border-blue-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      theme === 'light'
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg'
                        : 'bg-slate-100 group-hover/theme:bg-blue-100'
                    } transition-all`}>
                      <svg className={`w-7 h-7 ${theme === 'light' ? 'text-white' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-slate-900 mb-1">Light Mode</h3>
                      <p className="text-xs text-slate-600">Bright and clean interface</p>
                    </div>
                    {theme === 'light' && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => handleThemeChange('dark')}
                  className={`group/theme p-6 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                    theme === 'dark'
                      ? 'border-purple-500 bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg'
                      : 'border-slate-200 hover:border-purple-300 bg-white'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      theme === 'dark'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-500 shadow-lg'
                        : 'bg-slate-100 group-hover/theme:bg-purple-100'
                    } transition-all`}>
                      <svg className={`w-7 h-7 ${theme === 'dark' ? 'text-white' : 'text-slate-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                      </svg>
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-bold text-slate-900 mb-1">Dark Mode</h3>
                      <p className="text-xs text-slate-600">Easy on the eyes</p>
                    </div>
                    {theme === 'dark' && (
                      <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Notifications Settings */}
          <div className="group bg-white rounded-2xl shadow-lg border-2 border-slate-200/60 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className={`p-6 border-b-2 border-slate-100 bg-gradient-to-r ${settingsSections[1].bgGradient}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${settingsSections[1].gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={settingsSections[1].icon} />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{settingsSections[1].title}</h2>
                  <p className="text-sm text-slate-600 font-medium">Manage your notification preferences</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Push Notifications Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-purple-50 border-2 border-slate-200 hover:border-purple-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Push Notifications</p>
                    <p className="text-xs text-slate-600">Receive real-time alerts</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500"></div>
                </label>
              </div>

              {/* Email Notifications Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-blue-50 border-2 border-slate-200 hover:border-blue-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Email Notifications</p>
                    <p className="text-xs text-slate-600">Get updates via email</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications}
                    onChange={() => setEmailNotifications(!emailNotifications)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-cyan-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Language Settings */}
          <div className="group bg-white rounded-2xl shadow-lg border-2 border-slate-200/60 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className={`p-6 border-b-2 border-slate-100 bg-gradient-to-r ${settingsSections[2].bgGradient}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${settingsSections[2].gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={settingsSections[2].icon} />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{settingsSections[2].title}</h2>
                  <p className="text-sm text-slate-600 font-medium">Set your preferred language</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-5 py-4 text-sm font-bold border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all duration-200 bg-gradient-to-r from-slate-50 to-emerald-50 hover:shadow-md cursor-pointer"
              >
                <option value="en">🇬🇧 English</option>
                <option value="es">🇪🇸 Spanish (Español)</option>
                <option value="fr">🇫🇷 French (Français)</option>
                <option value="de">🇩🇪 German (Deutsch)</option>
                <option value="hi">🇮🇳 Hindi (हिंदी)</option>
                <option value="zh">🇨🇳 Chinese (中文)</option>
              </select>
            </div>
          </div>

          {/* Security Settings */}
          <div className="group bg-white rounded-2xl shadow-lg border-2 border-slate-200/60 hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className={`p-6 border-b-2 border-slate-100 bg-gradient-to-r ${settingsSections[3].bgGradient}`}>
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${settingsSections[3].gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={settingsSections[3].icon} />
                  </svg>
                </div>
                <div>
                  <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{settingsSections[3].title}</h2>
                  <p className="text-sm text-slate-600 font-medium">Manage security preferences</p>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-6">
              {/* Two-Factor Auth Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-amber-50 border-2 border-slate-200 hover:border-amber-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Two-Factor Authentication</p>
                    <p className="text-xs text-slate-600">Add an extra layer of security</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={twoFactorAuth}
                    onChange={() => setTwoFactorAuth(!twoFactorAuth)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500"></div>
                </label>
              </div>

              {/* Auto Backup Toggle */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-r from-slate-50 to-emerald-50 border-2 border-slate-200 hover:border-emerald-300 transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">Automatic Backups</p>
                    <p className="text-xs text-slate-600">Daily data backups enabled</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoBackup}
                    onChange={() => setAutoBackup(!autoBackup)}
                    className="sr-only peer"
                  />
                  <div className="w-14 h-8 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-emerald-500 peer-checked:to-teal-500"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4 pt-6">
            <button
              onClick={handleSaveSettings}
              className="group px-10 py-4 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-bold rounded-xl shadow-2xl hover:shadow-3xl hover:from-blue-500 hover:via-purple-500 hover:to-pink-500 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-purple-500 transform hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-white/20"
            >
              <span className="flex items-center gap-2">
                <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
                Save All Settings
              </span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SuperAdminAppSettingsPage;

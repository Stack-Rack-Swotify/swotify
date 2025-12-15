import React, { useState } from 'react';

const SettingsPage = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [theme, setTheme] = useState('light');
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [language, setLanguage] = useState('english');
  const [autoSave, setAutoSave] = useState(true);

  const handleSaveSettings = () => {
    // Show success message
    const message = document.createElement('div');
    message.className = 'fixed top-4 right-4 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white px-6 py-3 rounded-xl shadow-2xl z-50 animate-fade-in font-medium flex items-center gap-2';
    message.innerHTML = `
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      Settings saved successfully!
    `;
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);

    console.log({ notificationEnabled, theme, emailUpdates, language, autoSave });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Premium Header */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 rounded-xl blur opacity-50 animate-pulse"></div>
              <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-600 via-blue-600 to-purple-600 flex items-center justify-center shadow-lg">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-gray-100">Settings</h3>
              <p className="text-slate-600 dark:text-gray-400 text-sm mt-1">Customize your experience and preferences</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* Notifications Section */}
            <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-slate-200 dark:border-gray-700 p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-gray-100">Notifications</h4>
                </div>
                
                <div className="space-y-4">
                  {/* Enable Notifications */}
                  <div className="flex items-center justify-between p-5 bg-gradient-to-br from-slate-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-slate-200 dark:border-gray-600 hover:border-cyan-300 dark:hover:border-cyan-700 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-cyan-500/20 dark:bg-cyan-600/20 rounded-xl flex items-center justify-center border-2 border-cyan-300 dark:border-cyan-700">
                        <svg className="w-6 h-6 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                      </div>
                      <div>
                        <label htmlFor="notifications" className="text-base font-semibold text-slate-900 dark:text-gray-100 block">
                          Push Notifications
                        </label>
                        <p className="text-sm text-slate-600 dark:text-gray-400">Get real-time alerts and updates</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setNotificationEnabled(!notificationEnabled)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 shadow-lg ${
                        notificationEnabled ? 'bg-gradient-to-r from-cyan-600 to-emerald-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-xl ${
                          notificationEnabled ? 'translate-x-9' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Email Updates */}
                  <div className="flex items-center justify-between p-5 bg-gradient-to-br from-slate-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-slate-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-500/20 dark:bg-emerald-600/20 rounded-xl flex items-center justify-center border-2 border-emerald-300 dark:border-emerald-700">
                        <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <label htmlFor="emailUpdates" className="text-base font-semibold text-slate-900 dark:text-gray-100 block">
                          Email Digest
                        </label>
                        <p className="text-sm text-slate-600 dark:text-gray-400">Weekly summary to your inbox</p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEmailUpdates(!emailUpdates)}
                      className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 shadow-lg ${
                        emailUpdates ? 'bg-gradient-to-r from-emerald-600 to-cyan-600' : 'bg-gray-300 dark:bg-gray-600'
                      }`}
                    >
                      <span
                        className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-xl ${
                          emailUpdates ? 'translate-x-9' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Appearance Section */}
            <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-slate-200 dark:border-gray-700 p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-gray-100">Appearance</h4>
                </div>
                
                <div className="space-y-4">
                  {/* Theme Setting */}
                  <div className="p-5 bg-gradient-to-br from-slate-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-slate-200 dark:border-gray-600">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-orange-500/20 dark:bg-orange-600/20 rounded-xl flex items-center justify-center border-2 border-orange-300 dark:border-orange-700">
                        <svg className="w-6 h-6 text-orange-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                      </div>
                      <div>
                        <label htmlFor="theme" className="text-base font-semibold text-slate-900 dark:text-gray-100 block">
                          Color Theme
                        </label>
                        <p className="text-sm text-slate-600 dark:text-gray-400">Choose your interface style</p>
                      </div>
                    </div>
                    <select
                      id="theme"
                      className="w-full px-5 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 dark:focus:border-purple-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 rounded-xl transition-all duration-200 hover:border-purple-400 dark:hover:border-purple-600 font-medium shadow-sm"
                      value={theme}
                      onChange={(e) => setTheme(e.target.value)}
                    >
                      <option value="light">☀️ Light Mode</option>
                      <option value="dark">🌙 Dark Mode</option>
                      <option value="system">💻 System Default</option>
                    </select>
                  </div>

                  {/* Language Setting */}
                  <div className="p-5 bg-gradient-to-br from-slate-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-slate-200 dark:border-gray-600">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-blue-500/20 dark:bg-blue-600/20 rounded-xl flex items-center justify-center border-2 border-blue-300 dark:border-blue-700">
                        <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      </div>
                      <div>
                        <label htmlFor="language" className="text-base font-semibold text-slate-900 dark:text-gray-100 block">
                          Language
                        </label>
                        <p className="text-sm text-slate-600 dark:text-gray-400">Interface language preference</p>
                      </div>
                    </div>
                    <select
                      id="language"
                      className="w-full px-5 py-4 text-sm border-2 border-slate-200 dark:border-gray-600 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 dark:focus:border-blue-600 bg-white dark:bg-gray-700 text-slate-900 dark:text-gray-100 rounded-xl transition-all duration-200 hover:border-blue-400 dark:hover:border-blue-600 font-medium shadow-sm"
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="english">🇺🇸 English</option>
                      <option value="spanish">🇪🇸 Español</option>
                      <option value="french">🇫🇷 Français</option>
                      <option value="german">🇩🇪 Deutsch</option>
                      <option value="hindi">🇮🇳 हिन्दी</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Quick Settings & Actions */}
          <div className="space-y-6">
            {/* Preferences Card */}
            <div className="group relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl border-2 border-slate-200 dark:border-gray-700 p-6 hover:shadow-2xl transition-all duration-300 overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-gray-100">Preferences</h4>
                </div>
                
                {/* Auto Save */}
                <div className="flex items-center justify-between p-5 bg-gradient-to-br from-slate-50 to-white dark:from-gray-700 dark:to-gray-800 rounded-xl border-2 border-slate-200 dark:border-gray-600 hover:border-emerald-300 dark:hover:border-emerald-700 transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-500/20 dark:bg-emerald-600/20 rounded-xl flex items-center justify-center border-2 border-emerald-300 dark:border-emerald-700">
                      <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                      </svg>
                    </div>
                    <div>
                      <label htmlFor="autoSave" className="text-sm font-semibold text-slate-900 dark:text-gray-100 block">
                        Auto-Save
                      </label>
                      <p className="text-xs text-slate-600 dark:text-gray-400">Save automatically</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setAutoSave(!autoSave)}
                    className={`relative inline-flex h-8 w-16 items-center rounded-full transition-all duration-300 shadow-lg ${
                      autoSave ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform duration-300 shadow-xl ${
                        autoSave ? 'translate-x-9' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleSaveSettings}
                className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 text-white rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 font-semibold text-base flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Save All Changes
              </button>
              
              <button
                onClick={() => {
                  setNotificationEnabled(true);
                  setTheme('light');
                  setEmailUpdates(true);
                  setLanguage('english');
                  setAutoSave(true);
                }}
                className="w-full px-6 py-4 bg-white dark:bg-gray-800 text-slate-700 dark:text-gray-300 border-2 border-slate-200 dark:border-gray-700 rounded-xl hover:shadow-lg transition-all duration-300 hover:border-slate-400 dark:hover:border-gray-600 font-medium text-base flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Defaults
              </button>
            </div>

            {/* Info Card */}
            <div className="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-2xl p-5 border-2 border-cyan-200 dark:border-cyan-800">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg flex-shrink-0">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h5 className="text-sm font-bold text-slate-900 dark:text-gray-100 mb-1">Quick Tip</h5>
                  <p className="text-xs text-slate-600 dark:text-gray-400 leading-relaxed">
                    Changes are saved to your account and synced across all devices automatically.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default SettingsPage;


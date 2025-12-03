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
    message.className = 'fixed top-4 right-4 bg-gradient-to-r from-[#22C55E] to-[#0EA5E9] text-white px-6 py-3 rounded-xl shadow-lg z-50 animate-fade-in';
    message.textContent = '✓ Settings saved successfully!';
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);

    console.log({ notificationEnabled, theme, emailUpdates, language, autoSave });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold text-[#0F172A] mb-2">Settings</h3>
          <p className="text-[#64748B] text-sm">Manage your account preferences and settings</p>
        </div>

        <div className="space-y-6">
          {/* Notifications Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h4 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
              Notifications
            </h4>
            
            <div className="space-y-4">
              {/* Enable Notifications Toggle */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                  <div>
                    <label htmlFor="notifications" className="text-base font-semibold text-[#0F172A] block">
                      Enable Notifications
                    </label>
                    <p className="text-xs text-[#64748B]">Get alerts about important updates</p>
                  </div>
                </div>
                <button
                  onClick={() => setNotificationEnabled(!notificationEnabled)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                    notificationEnabled ? 'bg-gradient-to-r from-[#0EA5E9] to-[#22C55E]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                      notificationEnabled ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Email Updates Toggle */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#22C55E]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <label htmlFor="emailUpdates" className="text-base font-semibold text-[#0F172A] block">
                      Email Updates
                    </label>
                    <p className="text-xs text-[#64748B]">Receive weekly summary emails</p>
                  </div>
                </div>
                <button
                  onClick={() => setEmailUpdates(!emailUpdates)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                    emailUpdates ? 'bg-gradient-to-r from-[#22C55E] to-[#0EA5E9]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                      emailUpdates ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Appearance Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h4 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
              Appearance
            </h4>
            
            <div className="space-y-4">
              {/* Theme Setting */}
              <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#F97316]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                    </svg>
                  </div>
                  <div>
                    <label htmlFor="theme" className="text-base font-semibold text-[#0F172A] block">
                      App Theme
                    </label>
                    <p className="text-xs text-[#64748B]">Choose your preferred color scheme</p>
                  </div>
                </div>
                <select
                  id="theme"
                  className="w-full px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#0EA5E9]/50"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light Mode</option>
                  <option value="dark">Dark Mode</option>
                  <option value="system">System Default</option>
                </select>
              </div>

              {/* Language Setting */}
              <div className="p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                    </svg>
                  </div>
                  <div>
                    <label htmlFor="language" className="text-base font-semibold text-[#0F172A] block">
                      Language
                    </label>
                    <p className="text-xs text-[#64748B]">Select your preferred language</p>
                  </div>
                </div>
                <select
                  id="language"
                  className="w-full px-4 py-3 text-sm border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] bg-white text-[#0F172A] rounded-xl transition-all duration-200 hover:border-[#0EA5E9]/50"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="english">English</option>
                  <option value="spanish">Español</option>
                  <option value="french">Français</option>
                  <option value="german">Deutsch</option>
                  <option value="hindi">हिन्दी</option>
                </select>
              </div>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h4 className="text-xl font-semibold text-[#0F172A] mb-5 flex items-center">
              <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#0F172A] rounded-full mr-3"></span>
              Preferences
            </h4>
            
            <div className="space-y-4">
              {/* Auto Save Toggle */}
              <div className="flex items-center justify-between p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#0F172A]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0F172A]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                  </div>
                  <div>
                    <label htmlFor="autoSave" className="text-base font-semibold text-[#0F172A] block">
                      Auto-Save
                    </label>
                    <p className="text-xs text-[#64748B]">Automatically save your progress</p>
                  </div>
                </div>
                <button
                  onClick={() => setAutoSave(!autoSave)}
                  className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors duration-300 ${
                    autoSave ? 'bg-gradient-to-r from-[#0F172A] to-[#0EA5E9]' : 'bg-gray-200'
                  }`}
                >
                  <span
                    className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-300 shadow-lg ${
                      autoSave ? 'translate-x-8' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleSaveSettings}
              className="flex-1 px-6 py-4 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 font-semibold text-base flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Save Settings
            </button>
            <button
              onClick={() => {
                setNotificationEnabled(true);
                setTheme('light');
                setEmailUpdates(true);
                setLanguage('english');
                setAutoSave(true);
              }}
              className="px-6 py-4 bg-white text-[#64748B] border-2 border-gray-100 rounded-xl hover:shadow-md transition-all duration-300 hover:border-[#0EA5E9] hover:text-[#0F172A] font-semibold text-base"
            >
              Reset to Default
            </button>
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

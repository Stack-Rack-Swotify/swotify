import React, { useState, useEffect } from 'react';

const AppSettingsPage = () => {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6 text-gray-900">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-[#0F172A] mb-2">App Settings</h1>
        <p className="text-[#64748B] text-sm mb-8">Manage your application settings</p>

        <div className="space-y-8">
          {/* Theme Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Theme</h2>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="radio"
                  name="theme"
                  value="light"
                  checked={theme === 'light'}
                  onChange={handleThemeChange}
                  className="mr-2"
                />
                Light
              </label>
              <label>
                <input
                  type="radio"
                  name="theme"
                  value="dark"
                  checked={theme === 'dark'}
                  onChange={handleThemeChange}
                  className="mr-2"
                />
                Dark
              </label>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Notifications</h2>
            <div className="flex items-center">
              <label className="flex items-center cursor-pointer">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                    className="sr-only"
                  />
                  <div className="w-10 h-4 bg-gray-300 rounded-full shadow-inner"></div>
                  <div className={`dot absolute w-6 h-6 bg-white rounded-full shadow -left-1 -top-1 transition ${notifications ? 'transform translate-x-full bg-blue-500' : ''}`}></div>
                </div>
                <div className="ml-3 text-gray-700 font-medium">
                  Enable Notifications
                </div>
              </label>
            </div>
          </div>

          {/* Language Settings */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
            <h2 className="text-lg font-semibold text-[#0F172A] mb-4">Language</h2>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full max-w-xs px-4 py-3 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] transition-all duration-200"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettingsPage;

import React, { useState } from 'react';

const SettingsPage = () => {
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [theme, setTheme] = useState('light');
  const [emailUpdates, setEmailUpdates] = useState(true);

  const handleSaveSettings = () => {
    alert('Settings saved! (Dummy functionality)');
    console.log({ notificationEnabled, theme, emailUpdates });
    // In a real application, you would send these settings to a backend API
  };

  return (
    <div className="p-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">User Settings</h3>

      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
          <label htmlFor="notifications" className="text-lg font-medium text-gray-800">
            Enable Notifications
          </label>
          <input
            type="checkbox"
            id="notifications"
            className="toggle toggle-primary"
            checked={notificationEnabled}
            onChange={(e) => setNotificationEnabled(e.target.checked)}
          />
        </div>

        {/* Theme Setting */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
          <label htmlFor="theme" className="text-lg font-medium text-gray-800">
            App Theme
          </label>
          <select
            id="theme"
            className="select select-bordered w-full max-w-xs bg-gray-50 text-gray-900 border-gray-300"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System Default</option>
          </select>
        </div>

        {/* Email Updates Setting */}
        <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg bg-white">
          <label htmlFor="emailUpdates" className="text-lg font-medium text-gray-800">
            Receive Email Updates
          </label>
          <input
            type="checkbox"
            id="emailUpdates"
            className="toggle toggle-primary"
            checked={emailUpdates}
            onChange={(e) => setEmailUpdates(e.target.checked)}
          />
        </div>

        {/* Save Button */}
        <div className="pt-4">
          <button
            onClick={handleSaveSettings}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2 text-lg font-medium"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

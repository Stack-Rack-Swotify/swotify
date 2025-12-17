import React, { useState } from 'react';

const SuperAdminSettingsPage = () => {
  const [settings, setSettings] = useState({
    fullName: 'Super Admin',
    email: 'admin@swotify.com',
    phone: '+91 98765 43210',
    organization: 'Swotify Academy',
  });

  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  const [showSaveMessage, setShowSaveMessage] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setShowSaveMessage(true);
    setTimeout(() => setShowSaveMessage(false), 3000);
  };

  const sections = [
    { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
    { id: 'security', label: 'Security', icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z' },
    { id: 'notifications', label: 'Notifications', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-md">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Settings</h1>
          <p className="text-slate-500 text-sm">Manage your profile and preferences.</p>
        </div>
      </div>

      {/* Success Message */}
      {showSaveMessage && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-medium text-green-700">Settings saved successfully!</p>
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-56 flex-shrink-0">
          <div className="bg-white rounded-xl border border-slate-200 p-3">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1 last:mb-0 ${activeSection === section.id
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d={section.icon} />
                </svg>
                {section.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-800">Profile Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="fullName"
                    value={settings.fullName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={settings.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={settings.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Organization</label>
                  <input
                    type="text"
                    name="organization"
                    value={settings.organization}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-800">Change Password</h2>
              </div>

              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    name="current"
                    value={passwords.current}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    name="new"
                    value={passwords.new}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Confirm Password</label>
                  <input
                    type="password"
                    name="confirm"
                    value={passwords.confirm}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end">
                <button className="px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h2 className="text-lg font-bold text-slate-800">Notification Preferences</h2>
              </div>

              <div className="space-y-4">
                {[
                  { label: 'Email Notifications', desc: 'Receive updates and alerts via email', checked: true },
                  { label: 'Push Notifications', desc: 'Receive notifications in your browser', checked: true },
                  { label: 'System Alerts', desc: 'Get notified about system issues', checked: true },
                  { label: 'Weekly Reports', desc: 'Receive weekly summary reports', checked: false },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-slate-700">{item.label}</p>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={item.checked} className="sr-only peer" />
                      <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-500"></div>
                    </label>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200 flex justify-end">
                <button
                  onClick={handleSave}
                  className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                >
                  Save Preferences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperAdminSettingsPage;

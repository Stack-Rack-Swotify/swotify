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
    maintenanceMode: false,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    // Save settings logic here
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Settings</h1>
          <p className="text-[#827979] text-sm">Manage global administrative settings for the school system</p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-6 bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-4 flex items-center gap-3 animate-fade-in">
            <svg className="w-6 h-6 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="text-sm font-semibold text-green-800">Settings saved successfully!</p>
              <p className="text-xs text-green-700">Your changes have been applied to the system.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* School Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
                School Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="schoolName" className="block text-sm font-medium text-[#827979] mb-2">
                    School Name
                  </label>
                  <input
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    value={settings.schoolName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] transition-all duration-200 hover:border-[#ff7300]/50 text-gray-800 bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#827979] mb-2">
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] transition-all duration-200 hover:border-[#ff7300]/50 text-gray-800 bg-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-medium text-[#827979] mb-2">
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={settings.contactPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9000ff]/50 focus:border-[#9000ff] transition-all duration-200 hover:border-[#9000ff]/50 text-gray-800 bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="adminEmail" className="block text-sm font-medium text-[#827979] mb-2">
                      Admin Email
                    </label>
                    <input
                      type="email"
                      id="adminEmail"
                      name="adminEmail"
                      value={settings.adminEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9000ff]/50 focus:border-[#9000ff] transition-all duration-200 hover:border-[#9000ff]/50 text-gray-800 bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* System Configuration */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
                System Configuration
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-medium text-[#827979] mb-2">
                      Timezone
                    </label>
                    <div className="relative">
                      <select
                        id="timezone"
                        name="timezone"
                        value={settings.timezone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] transition-all duration-200 hover:border-[#ff7300]/50 text-gray-800 bg-white appearance-none cursor-pointer"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="America/New_York">America/New York (EST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                      </select>
                      <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#827979] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="language" className="block text-sm font-medium text-[#827979] mb-2">
                      Default Language
                    </label>
                    <div className="relative">
                      <select
                        id="language"
                        name="language"
                        value={settings.language}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9000ff]/50 focus:border-[#9000ff] transition-all duration-200 hover:border-[#9000ff]/50 text-gray-800 bg-white appearance-none cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                      <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#827979] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="academicYear" className="block text-sm font-medium text-[#827979] mb-2">
                    Academic Year
                  </label>
                  <div className="relative">
                    <select
                      id="academicYear"
                      name="academicYear"
                      value={settings.academicYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#827979]/50 focus:border-[#827979] transition-all duration-200 hover:border-[#827979]/50 text-gray-800 bg-white appearance-none cursor-pointer"
                    >
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                      <option value="2026-2027">2026-2027</option>
                    </select>
                    <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#827979] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-gray-800 mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#827979] to-[#9000ff] rounded-full mr-3"></span>
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#ff7300]/10 to-[#ff7300]/5 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">Email Notifications</p>
                      <p className="text-xs text-[#827979]">Receive updates via email</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="emailNotifications"
                    checked={settings.emailNotifications}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#ff7300] border-gray-300 rounded focus:ring-[#ff7300] focus:ring-2"
                  />
                </label>

                <label className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#9000ff]/10 to-[#9000ff]/5 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-800">SMS Notifications</p>
                      <p className="text-xs text-[#827979]">Receive updates via SMS</p>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    name="smsNotifications"
                    checked={settings.smsNotifications}
                    onChange={handleChange}
                    className="w-5 h-5 text-[#9000ff] border-gray-300 rounded focus:ring-[#9000ff] focus:ring-2"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-1 h-5 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-2"></span>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#ff7300]/5 to-white rounded-xl border border-gray-200 hover:shadow-md hover:border-[#ff7300]/50 transition-all duration-300 text-left group">
                  <svg className="w-5 h-5 text-[#ff7300] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#ff7300] transition-colors">Backup System</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#9000ff]/5 to-white rounded-xl border border-gray-200 hover:shadow-md hover:border-[#9000ff]/50 transition-all duration-300 text-left group">
                  <svg className="w-5 h-5 text-[#9000ff] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#9000ff] transition-colors">View Logs</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#827979]/5 to-white rounded-xl border border-gray-200 hover:shadow-md hover:border-[#827979]/50 transition-all duration-300 text-left group">
                  <svg className="w-5 h-5 text-[#827979] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 group-hover:text-[#827979] transition-colors">Advanced Settings</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-base font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-1 h-5 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-2"></span>
                Maintenance Mode
              </h3>
              <label className="flex items-center justify-between p-4 bg-gradient-to-br from-red-50 to-white rounded-xl border border-red-200 hover:border-red-300 transition-all cursor-pointer">
                <div>
                  <p className="text-sm font-medium text-gray-800">Enable Maintenance</p>
                  <p className="text-xs text-[#827979] mt-1">Restrict system access</p>
                </div>
                <input
                  type="checkbox"
                  name="maintenanceMode"
                  checked={settings.maintenanceMode}
                  onChange={handleChange}
                  className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500 focus:ring-2"
                />
              </label>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              Save All Settings
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

export default AdminSettingsPage;

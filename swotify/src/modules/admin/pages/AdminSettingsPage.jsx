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
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0F172A] mb-2">Admin Settings</h1>
          <p className="text-[#64748B] text-sm">Manage global administrative settings for the school system</p>
        </div>

        {/* Success Message */}
        {saved && (
          <div className="mb-6 bg-gradient-to-r from-[#22C55E]/10 to-[#0EA5E9]/10 border border-[#22C55E]/30 rounded-xl p-4 flex items-center gap-3 animate-fade-in shadow-sm">
            <div className="w-10 h-10 bg-[#22C55E] rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-[#0F172A]">Settings saved successfully!</p>
              <p className="text-xs text-[#64748B]">Your changes have been applied to the system.</p>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Settings */}
          <div className="lg:col-span-2 space-y-6">
            {/* School Information */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-3"></span>
                School Information
              </h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="schoolName" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    School Name
                  </label>
                  <input
                    type="text"
                    id="schoolName"
                    name="schoolName"
                    value={settings.schoolName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] transition-all duration-200 hover:border-[#0EA5E9]/50 text-[#0F172A] bg-white"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Address
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    value={settings.address}
                    onChange={handleChange}
                    rows="3"
                    className="w-full px-4 py-3 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] transition-all duration-200 hover:border-[#22C55E]/50 text-[#0F172A] bg-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contactPhone" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      Contact Phone
                    </label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={settings.contactPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316] transition-all duration-200 hover:border-[#F97316]/50 text-[#0F172A] bg-white"
                    />
                  </div>

                  <div>
                    <label htmlFor="adminEmail" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Admin Email
                    </label>
                    <input
                      type="email"
                      id="adminEmail"
                      name="adminEmail"
                      value={settings.adminEmail}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] transition-all duration-200 hover:border-[#0EA5E9]/50 text-[#0F172A] bg-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* System Configuration */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#F97316] to-[#0EA5E9] rounded-full mr-3"></span>
                System Configuration
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="timezone" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Timezone
                    </label>
                    <div className="relative">
                      <select
                        id="timezone"
                        name="timezone"
                        value={settings.timezone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50 focus:border-[#0EA5E9] transition-all duration-200 hover:border-[#0EA5E9]/50 text-[#0F172A] bg-white appearance-none cursor-pointer"
                      >
                        <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
                        <option value="America/New_York">America/New York (EST)</option>
                        <option value="Europe/London">Europe/London (GMT)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
                      </select>
                      <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="language" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                      <svg className="w-4 h-4 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                      </svg>
                      Default Language
                    </label>
                    <div className="relative">
                      <select
                        id="language"
                        name="language"
                        value={settings.language}
                        onChange={handleChange}
                        className="w-full px-4 py-3 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#22C55E]/50 focus:border-[#22C55E] transition-all duration-200 hover:border-[#22C55E]/50 text-[#0F172A] bg-white appearance-none cursor-pointer"
                      >
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Spanish">Spanish</option>
                        <option value="French">French</option>
                      </select>
                      <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="academicYear" className="block text-sm font-semibold text-[#0F172A] mb-2 flex items-center gap-2">
                    <svg className="w-4 h-4 text-[#F97316]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    Academic Year
                  </label>
                  <div className="relative">
                    <select
                      id="academicYear"
                      name="academicYear"
                      value={settings.academicYear}
                      onChange={handleChange}
                      className="w-full px-4 py-3 text-sm border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#F97316]/50 focus:border-[#F97316] transition-all duration-200 hover:border-[#F97316]/50 text-[#0F172A] bg-white appearance-none cursor-pointer"
                    >
                      <option value="2024-2025">2024-2025</option>
                      <option value="2025-2026">2025-2026</option>
                      <option value="2026-2027">2026-2027</option>
                    </select>
                    <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#64748B] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Notification Preferences */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h2 className="text-lg font-semibold text-[#0F172A] mb-5 flex items-center">
                <span className="w-1 h-6 bg-gradient-to-b from-[#22C55E] to-[#0EA5E9] rounded-full mr-3"></span>
                Notification Preferences
              </h2>
              <div className="space-y-4">
                <label className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-[#0EA5E9]/20 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0EA5E9]/20 transition-colors">
                      <svg className="w-5 h-5 text-[#0EA5E9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">Email Notifications</p>
                      <p className="text-xs text-[#64748B]">Receive updates via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={settings.emailNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#0EA5E9]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0EA5E9]"></div>
                  </label>
                </label>

                <label className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 hover:border-[#22C55E]/20 hover:shadow-sm transition-all cursor-pointer group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#22C55E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#22C55E]/20 transition-colors">
                      <svg className="w-5 h-5 text-[#22C55E]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[#0F172A]">SMS Notifications</p>
                      <p className="text-xs text-[#64748B]">Receive updates via SMS</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={settings.smsNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#22C55E]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#22C55E]"></div>
                  </label>
                </label>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-base font-semibold text-[#0F172A] mb-4 flex items-center">
                <span className="w-1 h-5 bg-gradient-to-b from-[#0EA5E9] to-[#22C55E] rounded-full mr-2"></span>
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#0EA5E9]/5 to-white rounded-xl border border-gray-100 hover:shadow-md hover:border-[#0EA5E9]/30 transition-all duration-300 text-left group">
                  <div className="w-8 h-8 bg-[#0EA5E9]/10 rounded-lg flex items-center justify-center group-hover:bg-[#0EA5E9]/20 transition-colors">
                    <svg className="w-4 h-4 text-[#0EA5E9] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A] group-hover:text-[#0EA5E9] transition-colors">Backup System</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#22C55E]/5 to-white rounded-xl border border-gray-100 hover:shadow-md hover:border-[#22C55E]/30 transition-all duration-300 text-left group">
                  <div className="w-8 h-8 bg-[#22C55E]/10 rounded-lg flex items-center justify-center group-hover:bg-[#22C55E]/20 transition-colors">
                    <svg className="w-4 h-4 text-[#22C55E] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A] group-hover:text-[#22C55E] transition-colors">View Logs</span>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-[#F97316]/5 to-white rounded-xl border border-gray-100 hover:shadow-md hover:border-[#F97316]/30 transition-all duration-300 text-left group">
                  <div className="w-8 h-8 bg-[#F97316]/10 rounded-lg flex items-center justify-center group-hover:bg-[#F97316]/20 transition-colors">
                    <svg className="w-4 h-4 text-[#F97316] group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <span className="text-sm font-semibold text-[#0F172A] group-hover:text-[#F97316] transition-colors">Advanced Settings</span>
                </button>
              </div>
            </div>

            {/* System Status */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300">
              <h3 className="text-base font-semibold text-[#0F172A] mb-4 flex items-center">
                <span className="w-1 h-5 bg-gradient-to-b from-[#E11D48] to-[#F97316] rounded-full mr-2"></span>
                Maintenance Mode
              </h3>
              <label className="flex items-center justify-between p-4 bg-gradient-to-br from-[#E11D48]/5 to-white rounded-xl border border-[#E11D48]/20 hover:border-[#E11D48]/30 transition-all cursor-pointer group">
                <div>
                  <p className="text-sm font-semibold text-[#0F172A]">Enable Maintenance</p>
                  <p className="text-xs text-[#64748B] mt-1">Restrict system access</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="maintenanceMode"
                    checked={settings.maintenanceMode}
                    onChange={handleChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E11D48]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E11D48]"></div>
                </label>
              </label>
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              className="w-full px-6 py-4 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
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


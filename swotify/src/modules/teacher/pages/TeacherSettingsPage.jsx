import React, { useState } from 'react';

const TeacherSettingsPage = () => {
  const [teacherProfile, setTeacherProfile] = useState({
    name: 'Mr. John Doe',
    email: 'john.doe@example.com',
    subject: 'Mathematics',
    gradeLevels: '9th - 12th',
    phone: '555-123-4567',
    bio: 'Dedicated mathematics teacher with 10 years of experience, passionate about making complex concepts accessible to students.',
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2960&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', // Reusing the userAvatar placeholder
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeacherProfile(prevProfile => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    // In a real application, you would send this data to a backend API
    console.log('Saving teacher profile:', teacherProfile);
    setIsEditing(false);
    // Optionally show a success message
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Teacher Profile & Settings</h1>
        
        {/* Profile Section */}
        <div className="mb-8 p-6 border border-gray-100 rounded-xl bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Profile</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative flex-shrink-0">
              <img
                src={teacherProfile.photo}
                alt={teacherProfile.name}
                className="w-32 h-32 rounded-full object-cover border-4 border-[#ff7300]"
              />
              {/* Optional: Add a button to change photo */}
            </div>
            <div className="flex-1 w-full">
              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                    <input type="text" name="name" id="name" value={teacherProfile.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" value={teacherProfile.email} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <input type="text" name="subject" id="subject" value={teacherProfile.subject} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="gradeLevels" className="block text-sm font-medium text-gray-700">Grade Levels</label>
                    <input type="text" name="gradeLevels" id="gradeLevels" value={teacherProfile.gradeLevels} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <input type="text" name="phone" id="phone" value={teacherProfile.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                  </div>
                  <div>
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea name="bio" id="bio" value={teacherProfile.bio} onChange={handleChange} rows="3" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"></textarea>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-bold text-gray-800">{teacherProfile.name}</h3>
                  <p className="text-gray-600">{teacherProfile.email}</p>
                  <p className="text-gray-600">Subject: <span className="font-medium">{teacherProfile.subject}</span></p>
                  <p className="text-gray-600">Grade Levels: <span className="font-medium">{teacherProfile.gradeLevels}</span></p>
                  <p className="text-gray-600">Phone: <span className="font-medium">{teacherProfile.phone}</span></p>
                  <p className="text-gray-600 pt-2">{teacherProfile.bio}</p>
                </div>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-3">
            {isEditing ? (
              <>
                <button 
                  onClick={() => setIsEditing(false)} 
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSave} 
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <button 
                onClick={() => setIsEditing(true)} 
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </button>
            )}
          </div>
        </div>

        {/* General Settings Section (existing content slightly refactored) */}
        <div className="p-6 border border-gray-100 rounded-xl bg-gray-50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">General Settings</h2>
          <p className="text-gray-600 mb-6">
            Manage your application preferences and other general settings here.
          </p>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <label htmlFor="notificationToggle" className="text-lg font-medium text-gray-700">Email Notifications</label>
              <input type="checkbox" id="notificationToggle" className="form-checkbox h-5 w-5 text-blue-600 rounded" defaultChecked />
            </div>
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <label htmlFor="themeSelect" className="text-lg font-medium text-gray-700">App Theme</label>
              <select id="themeSelect" className="mt-1 block w-1/3 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                <option>Light</option>
                <option>Dark</option>
                <option>System</option>
              </select>
            </div>
            <div className="pt-4">
              <button className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherSettingsPage;
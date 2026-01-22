import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import mockStaff from '../../../data/mockStaff';
import mockClasses from '../../../data/mockClasses';

const StaffProfilePage = () => {
  const { staffId } = useParams();
  const navigate = useNavigate();

  // Find the staff member
  const staff = mockStaff.find(s => s.id === staffId);

  if (!staff) {
    return (
      <div className="space-y-6">
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-2">Staff Member Not Found</h3>
          <p className="text-slate-500 text-sm mb-4">The requested staff member does not exist</p>
          <button onClick={() => navigate('/admin-dashboard/staff')} className="px-4 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-lg text-sm font-medium">
            Back to Staff Directory
          </button>
        </div>
      </div>
    );
  }

  // Get classes this staff member teaches (if teacher)
  const assignedClasses = staff.role === 'Teacher'
    ? mockClasses.filter(cls => cls.teacherIds?.includes(staffId) || cls.teachers?.some(t => t.id === staffId))
    : [];

  // Mock schedule data
  const schedule = [
    { day: 'Monday', time: '8:00 AM - 9:30 AM', subject: staff.subject || 'General', class: 'Grade 10 - A' },
    { day: 'Monday', time: '10:00 AM - 11:30 AM', subject: staff.subject || 'General', class: 'Grade 11 - B' },
    { day: 'Tuesday', time: '9:00 AM - 10:30 AM', subject: staff.subject || 'General', class: 'Grade 9 - A' },
    { day: 'Wednesday', time: '8:00 AM - 9:30 AM', subject: staff.subject || 'General', class: 'Grade 10 - B' },
    { day: 'Thursday', time: '11:00 AM - 12:30 PM', subject: staff.subject || 'General', class: 'Grade 12 - A' },
    { day: 'Friday', time: '10:00 AM - 11:30 AM', subject: staff.subject || 'General', class: 'Grade 10 - A' },
  ];

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button onClick={() => navigate('/admin-dashboard/staff')} className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-medium">Back to Staff Directory</span>
      </button>

      {/* Profile Header */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-[#ea580c] to-[#f97316]"></div>
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row md:items-end gap-6 -mt-16">
            <img
              src={staff.photo}
              alt={staff.name}
              className="w-32 h-32 rounded-xl border-4 border-white shadow-lg object-cover bg-white"
            />
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-slate-800">{staff.name}</h1>
                  <p className="text-slate-500">{staff.role}{staff.subject ? ` • ${staff.subject}` : ''}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${staff.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {staff.status || 'Active'}
                  </span>
                  <button className="px-4 py-2 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-lg text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit Profile
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Contact Information */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Contact Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Email</p>
                  <p className="text-sm font-medium text-slate-800">{staff.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Phone</p>
                  <p className="text-sm font-medium text-slate-800">{staff.details?.phone || 'N/A'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs text-slate-500">Address</p>
                  <p className="text-sm font-medium text-slate-800">{staff.details?.address || 'Not provided'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Quick Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">{staff.role === 'Teacher' ? assignedClasses.length || 4 : 'N/A'}</p>
                <p className="text-xs text-slate-500">Classes</p>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <p className="text-2xl font-bold text-green-600">{staff.role === 'Teacher' ? '120' : 'N/A'}</p>
                <p className="text-xs text-slate-500">Students</p>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">5</p>
                <p className="text-xs text-slate-500">Years Exp</p>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <p className="text-2xl font-bold text-orange-600">98%</p>
                <p className="text-xs text-slate-500">Attendance</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">About</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {staff.name} is a dedicated {staff.role?.toLowerCase()} at our school
              {staff.subject ? `, specializing in ${staff.subject}` : ''}.
              With years of experience in education, they have consistently demonstrated
              excellence in their role and commitment to student success.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{staff.role}</span>
              {staff.subject && <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">{staff.subject}</span>}
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Full Time</span>
            </div>
          </div>

          {/* Schedule (for Teachers) */}
          {staff.role === 'Teacher' && (
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Weekly Schedule
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead>
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Day</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Time</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Subject</th>
                      <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600 uppercase">Class</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {schedule.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-800">{item.day}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{item.time}</td>
                        <td className="px-4 py-3 text-sm text-slate-600">{item.subject}</td>
                        <td className="px-4 py-3 text-sm">
                          <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded text-xs font-medium">{item.class}</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-white rounded-xl border border-slate-200 p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {[
                { action: 'Submitted attendance report', time: '2 hours ago', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'green' },
                { action: 'Updated grade for Grade 10 - A', time: 'Yesterday', icon: 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z', color: 'blue' },
                { action: 'Attended staff meeting', time: '2 days ago', icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z', color: 'purple' },
              ].map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${item.color === 'green' ? 'bg-green-100' : item.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'}`}>
                    <svg className={`w-4 h-4 ${item.color === 'green' ? 'text-green-600' : item.color === 'blue' ? 'text-blue-600' : 'text-purple-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-800">{item.action}</p>
                    <p className="text-xs text-slate-500">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfilePage;

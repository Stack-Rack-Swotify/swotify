import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import mockStaff from '../../../data/mockStaff';

const StaffPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('All');

  // Extract unique roles from mockStaff
  const roles = ['All', ...new Set(mockStaff.map(staff => staff.role))];

  // Filter staff members based on search term and selected role
  const filteredStaff = mockStaff.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'All' || staff.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Staff Directory</h1>
        <p className="text-[#827979] text-sm">Manage and view information for all school staff</p>
      </div>

      {/* Filters Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
          Search & Filter Staff
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Role Dropdown */}
          <div>
            <label htmlFor="role-select" className="block text-sm font-medium text-[#827979] mb-2">
              Role
            </label>
            <div className="relative">
              <select
                id="role-select"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 text-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] bg-white text-gray-800 rounded-xl transition-all duration-200 hover:border-[#ff7300]/50 appearance-none cursor-pointer"
              >
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
              <svg className="absolute right-3 top-3.5 w-5 h-5 text-[#827979] pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Search Bar */}
          <div className="md:col-span-2">
            <label htmlFor="search" className="block text-sm font-medium text-[#827979] mb-2">
              Search Name or Email
            </label>
            <div className="relative">
              <input
                id="search"
                type="text"
                placeholder="Search staff members..."
                className="w-full px-4 py-3 pl-10 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#827979]/50 focus:border-[#827979] transition-all duration-200 hover:border-[#827979]/50 text-gray-800 bg-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg className="absolute left-3 top-3.5 w-5 h-5 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-lg transition-all duration-300">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
            Staff Directory
          </h2>
          <span className="bg-gradient-to-r from-[#ff7300]/10 to-[#9000ff]/10 text-[#ff7300] px-4 py-2 rounded-full text-sm font-semibold border border-[#ff7300]/20 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {filteredStaff.length} {filteredStaff.length === 1 ? 'Staff Member' : 'Staff Members'}
          </span>
        </div>
      </div>

      {/* Staff Cards Grid */}
      {filteredStaff.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
              // onClick={() => navigate(`/admin-dashboard/staff-profile/${staff.id}`)} // Placeholder for detailed profile page
            >
              {/* Staff Photo */}
              <div className="relative mb-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#ff7300] to-[#9000ff] p-1">
                  <img
                    src={staff.photo}
                    alt={staff.name}
                    className="w-full h-full rounded-full object-cover bg-white"
                  />
                </div>
                {/* Role Badge */}
                <div className="absolute -bottom-2 -right-2 w-auto px-2 py-1 bg-[#9000ff] rounded-full border-2 border-white flex items-center justify-center shadow-lg">
                  <span className="text-xs text-white font-bold">
                    {staff.role}
                  </span>
                </div>
              </div>

              {/* Staff Name */}
              <h3 className="text-lg font-bold text-gray-800 mb-1 group-hover:text-[#ff7300] transition-colors">
                {staff.name}
              </h3>

              {/* Staff Info */}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-gradient-to-r from-[#ff7300]/10 to-[#9000ff]/10 text-[#ff7300] px-3 py-1 rounded-full text-xs font-semibold border border-[#ff7300]/20">
                  {staff.role}
                </span>
                {staff.subject && (
                  <span className="bg-gradient-to-r from-[#9000ff]/10 to-[#ff7300]/10 text-[#9000ff] px-3 py-1 rounded-full text-xs font-semibold border border-[#9000ff]/20">
                    {staff.subject}
                  </span>
                )}
              </div>

              {/* Quick Info */}
              <div className="w-full space-y-2 mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#827979] flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email
                  </span>
                  <span className="text-gray-800 font-medium truncate ml-2 max-w-[120px]" title={staff.email}>
                    {staff.email.split('@')[0]}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#827979] flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone
                  </span>
                  <span className="text-gray-800 font-medium">{staff.details.phone || 'N/A'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Empty State
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="w-24 h-24 bg-gradient-to-br from-[#ff7300]/10 to-[#9000ff]/10 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-[#ff7300]/20">
            <svg className="w-12 h-12 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Staff Found</h3>
          <p className="text-[#827979] text-sm max-w-md mx-auto mb-6">
            We couldn't find any staff members matching your criteria. Try adjusting your filters or search term.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedRole('All');
            }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default StaffPage;
import React from 'react';
import StudentMarks from './StudentMarks';
import PerformanceAnalysis from './PerformanceAnalysis';

const StudentProfile = () => {
  const dummyStudentData = {
    name: "John Doe",
    studentId: "SWT-001-2025",
    email: "john.doe@example.com",
    program: "Computer Science",
    year: "3rd Year",
    gpa: 3.8,
    enrollmentDate: "September 1, 2023",
    contact: "123-456-7890",
    address: "123 Main St, Anytown, USA",
    profilePicture: "https://images.unsplash.com/photo-1542838188-f5e6a0d4a9f2?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "A motivated computer science student with a passion for web development and artificial intelligence. Enjoys problem-solving and collaborating on innovative projects.",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">Student Profile</h3>
          <p className="text-[#827979] text-sm">Complete academic and personal information</p>
        </div>

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile Picture */}
            <div className="flex-shrink-0 relative">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-[#ff7300] to-[#9000ff] p-1">
                <img
                  className="w-full h-full rounded-full object-cover bg-white"
                  src={dummyStudentData.profilePicture}
                  alt="Student Profile"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-[#9000ff] text-white rounded-full p-2 shadow-lg">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                </svg>
              </div>
            </div>

            {/* Basic Info */}
            <div className="flex-1 text-center md:text-left">
              <h4 className="text-2xl font-bold text-gray-800 mb-2">{dummyStudentData.name}</h4>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <span className="bg-gradient-to-r from-[#ff7300]/10 to-[#ff7300]/5 text-[#ff7300] px-3 py-1 rounded-lg text-sm font-semibold border border-[#ff7300]/20">
                  {dummyStudentData.studentId}
                </span>
                <span className="bg-gradient-to-r from-[#9000ff]/10 to-[#9000ff]/5 text-[#9000ff] px-3 py-1 rounded-lg text-sm font-semibold border border-[#9000ff]/20">
                  {dummyStudentData.year}
                </span>
              </div>
              <div className="space-y-1 text-sm">
                <p className="text-gray-700">
                  <span className="font-semibold text-[#827979]">Program:</span> {dummyStudentData.program}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold text-[#827979]">GPA:</span> 
                  <span className="text-[#ff7300] font-bold ml-1">{dummyStudentData.gpa}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#ff7300] to-[#9000ff] rounded-full mr-3"></span>
            Contact Information
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-gradient-to-br from-[#ff7300]/10 to-[#ff7300]/5 p-5 rounded-xl border border-[#ff7300]/20 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#ff7300]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-[#827979] uppercase tracking-wide">Email</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{dummyStudentData.email}</p>
            </div>

            <div className="bg-gradient-to-br from-[#9000ff]/10 to-[#9000ff]/5 p-5 rounded-xl border border-[#9000ff]/20 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#9000ff]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-[#827979] uppercase tracking-wide">Phone</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{dummyStudentData.contact}</p>
            </div>

            <div className="bg-gradient-to-br from-[#827979]/10 to-[#827979]/5 p-5 rounded-xl border border-[#827979]/20 md:col-span-2 hover:shadow-md transition-all duration-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-[#827979]/20 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-[#827979]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <span className="text-xs font-medium text-[#827979] uppercase tracking-wide">Address</span>
              </div>
              <p className="text-sm font-semibold text-gray-800">{dummyStudentData.address}</p>
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 hover:shadow-lg transition-all duration-300">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#9000ff] to-[#ff7300] rounded-full mr-3"></span>
            Additional Information
          </h4>
          
          <div className="space-y-5">
            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#ff7300]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#ff7300]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-[#827979] uppercase tracking-wide mb-1">Enrollment Date</p>
                  <p className="text-sm font-semibold text-gray-800">{dummyStudentData.enrollmentDate}</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-[#9000ff]/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-[#9000ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-[#827979] uppercase tracking-wide mb-2">Bio</p>
                  <p className="text-sm text-gray-700 leading-relaxed">{dummyStudentData.bio}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Academic Overview */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-lg transition-all duration-300">
          <h4 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <span className="w-1 h-6 bg-gradient-to-b from-[#827979] to-[#9000ff] rounded-full mr-3"></span>
            Academic Overview
          </h4>
          <div className="bg-gradient-to-br from-[#ff7300]/5 via-[#9000ff]/5 to-[#827979]/5 p-6 rounded-xl border border-[#ff7300]/20">
            <div className="flex gap-3">
              <svg className="w-6 h-6 text-[#ff7300] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <p className="text-sm text-gray-700 leading-relaxed">
                A concise summary of <span className="font-semibold text-[#9000ff]">{dummyStudentData.name}</span>'s academic performance. Detailed analysis can be found in the dedicated reports section.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

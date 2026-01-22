import React, { useState, useEffect } from 'react';

const StudentProfile = ({ student }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (student) {
      setEditedStudent({
        name: student.name || '',
        email: student.details?.email || '',
        phone: student.details?.phone || '',
        address: student.details?.address || '',
        bio: student.details?.bio || '',
        program: student.details?.program || '',
      });
    }
  }, [student]);

  if (!student || !editedStudent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="section-card p-10 text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-5 icon-box rounded-xl flex items-center justify-center">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
          <p className="text-slate-500 font-semibold text-lg">No student data provided.</p>
        </div>
      </div>
    );
  }

  const handleInputChange = (field, value) => {
    setEditedStudent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  const handleCancel = () => {
    setEditedStudent({
      name: student.name || '',
      email: student.details?.email || '',
      phone: student.details?.phone || '',
      address: student.details?.address || '',
      bio: student.details?.bio || '',
      program: student.details?.program || '',
    });
    setIsEditing(false);
  };

  // Calculate average score
  const avgScore = student.exams?.length > 0
    ? Math.round(student.exams.reduce((sum, exam) => sum + (exam.score / exam.maxScore * 100), 0) / student.exams.length)
    : 0;

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {saveSuccess && (
        <div className="section-card p-4 bg-green-50 border-green-200 flex items-center gap-3 animate-slide-in-up">
          <div className="w-8 h-8 icon-box-green rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-green-700 font-semibold">Profile updated successfully!</p>
        </div>
      )}

      {/* Premium Profile Header Card */}
      <div className="section-card overflow-hidden">
        {/* Slate Banner */}
        <div className="relative h-32 bg-[#334155]">
          <div className="absolute inset-0 opacity-50"></div>
        </div>

        {/* Profile Info Section */}
        <div className="relative px-6 pb-6">
          {/* Profile Picture - Overlapping Banner */}
          <div className="absolute -top-14 left-6">
            <div className="relative group">
              <div className="absolute inset-0 bg-[#ea580c] rounded-full blur-md opacity-40 animate-pulse-glow"></div>
              <div className="relative w-28 h-28 rounded-full bg-[#ea580c] p-1 shadow-xl">
                <img
                  className="w-full h-full rounded-full object-cover bg-white border-4 border-white"
                  src={student.photo}
                  alt={student.name}
                />
              </div>
              <div className="absolute -bottom-1 -right-1 bg-[#1e293b] text-white rounded-full p-2 shadow-lg border-2 border-white">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              {isEditing && (
                <button className="absolute inset-0 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Student Info */}
          <div className="pt-16 md:pt-4 md:pl-36">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={editedStudent.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="text-2xl font-bold text-slate-800 mb-3 bg-white border border-slate-200 rounded-xl px-4 py-2 w-full md:w-auto focus:border-blue-400 focus:ring-2 focus:ring-blue-100 outline-none"
                    placeholder="Full Name"
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-slate-800 mb-2">{editedStudent.name || student.name}</h2>
                )}

                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="badge badge-blue flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                    </svg>
                    {student.id}
                  </span>
                  <span className="badge badge-green flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    {student.details?.grade}
                  </span>
                  {student.academicYear && (
                    <span className="badge badge-orange flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {student.academicYear}
                    </span>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="flex gap-3">
                <div className="stat-card text-center px-4 py-3 glow-blue">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Program</p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedStudent.program}
                      onChange={(e) => handleInputChange('program', e.target.value)}
                      className="text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg px-2 py-1 w-24 focus:border-blue-400 outline-none"
                      placeholder="Program"
                    />
                  ) : (
                    <p className="text-lg font-bold text-blue-600">{editedStudent.program || 'N/A'}</p>
                  )}
                </div>
                <div className="stat-card text-center px-4 py-3 glow-mixed">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">GPA</p>
                  <p className="text-lg font-bold text-purple-600">{student.details?.gpa || 'N/A'}</p>
                </div>
                <div className="stat-card text-center px-4 py-3 glow-orange">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-1">Avg Score</p>
                  <p className="text-lg font-bold text-orange-600">{avgScore}%</p>
                </div>
              </div>
            </div>

            {/* Edit/Save Buttons */}
            <div className="mt-5 flex flex-wrap gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-[#ea580c] text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
                  >
                    {isSaving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Saving...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Save Changes
                      </>
                    )}
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-5 py-2.5 bg-white text-slate-600 font-semibold rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 transition-all flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-5 py-2.5 bg-white text-slate-700 font-semibold rounded-xl border border-slate-200 shadow-sm hover:bg-slate-50 hover:shadow hover-lift transition-all flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Contact Information Card */}
      <div className="section-card p-6 hover-lift">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 icon-box rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-slate-800">Contact Information</h4>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Email */}
          <div className="stat-card hover-lift">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</span>
            </div>
            {isEditing ? (
              <input
                type="email"
                value={editedStudent.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 w-full focus:border-blue-400 outline-none"
                placeholder="Email address"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-800 break-all">{editedStudent.email || student.details?.email}</p>
            )}
          </div>

          {/* Phone */}
          <div className="stat-card hover-lift">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-400 to-emerald-500"></div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Phone</span>
            </div>
            {isEditing ? (
              <input
                type="tel"
                value={editedStudent.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 w-full focus:border-blue-400 outline-none"
                placeholder="Phone number"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-800">{editedStudent.phone || 'N/A'}</p>
            )}
          </div>

          {/* Address */}
          <div className="stat-card hover-lift md:col-span-2">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-orange-400 to-amber-500"></div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Address</span>
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedStudent.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                className="text-sm font-semibold text-slate-800 bg-white border border-slate-200 rounded-lg px-3 py-2 w-full focus:border-blue-400 outline-none"
                placeholder="Home address"
              />
            ) : (
              <p className="text-sm font-semibold text-slate-800">{editedStudent.address || 'N/A'}</p>
            )}
          </div>
        </div>
      </div>

      {/* Additional Information Card */}
      <div className="section-card p-6 hover-lift">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 icon-box-orange rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-slate-800">Additional Information</h4>
        </div>

        <div className="space-y-4">
          {/* Enrollment Date */}
          <div className="stat-card hover-lift">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-blue-400 to-purple-500"></div>
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Enrollment Date</p>
                <p className="text-sm font-semibold text-slate-800">{student.details?.enrollmentDate || 'N/A'}</p>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className="stat-card hover-lift">
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-purple-400 to-pink-500"></div>
            <div className="flex items-start gap-4">
              <div className="w-9 h-9 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="flex-1">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Bio</p>
                {isEditing ? (
                  <textarea
                    value={editedStudent.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={3}
                    className="text-sm text-slate-700 bg-white border border-slate-200 rounded-lg px-3 py-2 w-full focus:border-blue-400 outline-none resize-none"
                    placeholder="Write a short bio..."
                  />
                ) : (
                  <p className="text-sm text-slate-700 leading-relaxed">{editedStudent.bio || 'N/A'}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Overview Card */}
      <div className="section-card p-6 holographic border-2 border-purple-200 hover-lift">
        <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 icon-box rounded-xl flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-gradient">Academic Overview</h4>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-5 border border-purple-100">
          <div className="flex gap-4 items-start">
            <div className="w-9 h-9 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <p className="text-sm text-slate-700 leading-relaxed">
              A concise summary of <span className="font-bold text-gradient">{editedStudent.name || student.name}</span>'s academic performance. Detailed analysis can be found in the dedicated reports section.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;

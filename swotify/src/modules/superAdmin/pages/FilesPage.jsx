import React, { useState } from 'react';

const FilesPage = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'Academic Report 2024.pdf', size: '2.4 MB', uploaded: '2024-12-05', type: 'PDF', category: 'Reports' },
    { id: 2, name: 'Student Database.xlsx', size: '1.8 MB', uploaded: '2024-12-04', type: 'Excel', category: 'Data' },
    { id: 3, name: 'School Policies.docx', size: '456 KB', uploaded: '2024-12-03', type: 'Document', category: 'Policies' },
  ]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showAddSchoolModal, setShowAddSchoolModal] = useState(false);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [schools, setSchools] = useState([]);
  const [newSchool, setNewSchool] = useState({
    name: '',
    principal: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleSelectFile = (id) => {
    setSelectedFiles((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const handleDeleteFiles = () => {
    if (window.confirm(`Are you sure you want to delete ${selectedFiles.length} file(s)?`)) {
      setFiles((prev) => prev.filter((f) => !selectedFiles.includes(f.id)));
      setSelectedFiles([]);
    }
  };

  const handleUpload = (e) => {
    const newFiles = Array.from(e.target.files || []);
    newFiles.forEach((file) => {
      const fileType = file.type.includes('pdf') ? 'PDF' : 
                       file.type.includes('sheet') || file.name.endsWith('.xlsx') ? 'Excel' :
                       file.type.includes('document') || file.name.endsWith('.docx') ? 'Document' : 'Other';
      
      setFiles((prev) => [
        ...prev,
        {
          id: Math.max(...prev.map((f) => f.id), 0) + 1,
          name: file.name,
          size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
          uploaded: new Date().toISOString().split('T')[0],
          type: fileType,
          category: 'Uploads',
        },
      ]);
    });
    
    // Show success notification
    setShowUploadSuccess(true);
    setTimeout(() => setShowUploadSuccess(false), 3000);
  };

  const handleAddSchoolChange = (e) => {
    const { name, value } = e.target;
    setNewSchool((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddSchool = (e) => {
    e.preventDefault();
    if (!newSchool.name || !newSchool.principal || !newSchool.email) {
      alert('Please fill in all required fields');
      return;
    }
    setSchools((prev) => [
      ...prev,
      {
        id: Math.max(...prev.map((s) => s.id), 0) + 1,
        ...newSchool,
      },
    ]);
    setNewSchool({
      name: '',
      principal: '',
      email: '',
      phone: '',
      address: '',
    });
    setShowAddSchoolModal(false);
  };

  const getFileIcon = (type) => {
    const icons = {
      'PDF': { emoji: '📄', gradient: 'from-red-500 to-rose-500', bg: 'from-red-50 to-rose-50', text: 'text-red-600' },
      'Excel': { emoji: '📊', gradient: 'from-emerald-500 to-teal-500', bg: 'from-emerald-50 to-teal-50', text: 'text-emerald-600' },
      'Document': { emoji: '📝', gradient: 'from-blue-500 to-cyan-500', bg: 'from-blue-50 to-cyan-50', text: 'text-blue-600' },
      'Other': { emoji: '📎', gradient: 'from-purple-500 to-pink-500', bg: 'from-purple-50 to-pink-50', text: 'text-purple-600' }
    };
    return icons[type] || icons['Other'];
  };

  const stats = [
    { label: 'Total Files', value: files.length, icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z', gradient: 'from-blue-500 to-cyan-500' },
    { label: 'Storage Used', value: '4.7 GB', icon: 'M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4', gradient: 'from-purple-500 to-pink-500' },
    { label: 'Schools', value: schools.length, icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', gradient: 'from-emerald-500 to-teal-500' },
    { label: 'Categories', value: '4', icon: 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z', gradient: 'from-amber-500 to-orange-500' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-white p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        
        {/* Premium Header */}
        <div className="mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5 rounded-2xl blur-3xl"></div>
          <div className="relative bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 rounded-2xl p-8 shadow-2xl border-2 border-slate-700/50">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-400 rounded-full blur-2xl"></div>
            </div>
            
            <div className="relative flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2 flex items-center gap-3">
                  Files & Documents
                  <span className="px-3 py-1 bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-900 text-xs font-bold rounded-lg shadow-lg">
                    {files.length} FILES
                  </span>
                </h1>
                <p className="text-slate-300 text-sm font-medium">Manage and organize your school documents efficiently</p>
              </div>
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/20">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-bold">All Systems Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="group bg-white rounded-2xl p-6 shadow-lg border-2 border-slate-200/60 hover:shadow-2xl transition-all duration-300 hover:scale-105 relative overflow-hidden">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
              <div className="relative">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                    </svg>
                  </div>
                </div>
                <p className="text-slate-600 text-sm font-bold uppercase tracking-wider mb-1">{stat.label}</p>
                <p className="text-3xl font-extrabold text-slate-900">{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Action Bar */}
        <div className="flex gap-4 mb-6 flex-wrap">
          <label className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all cursor-pointer hover:scale-105 active:scale-95 border-2 border-white/20">
            <svg className="w-5 h-5 group-hover:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Files
            <input type="file" multiple onChange={handleUpload} className="hidden" />
          </label>

          <button
            onClick={() => setShowAddSchoolModal(true)}
            className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-white/20"
          >
            <svg className="w-5 h-5 group-hover:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add School
          </button>

          {selectedFiles.length > 0 && (
            <button
              onClick={handleDeleteFiles}
              className="group flex items-center gap-2 px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-white/20 animate-in slide-in-from-left"
            >
              <svg className="w-5 h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete ({selectedFiles.length})
            </button>
          )}
        </div>

        {/* Premium Files Table */}
        <div className="bg-white rounded-2xl shadow-2xl border-2 border-slate-200/60 overflow-hidden">
          {files.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <svg className="w-12 h-12 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-slate-500 font-bold text-lg mb-2">No files uploaded yet</p>
              <p className="text-slate-400 text-sm">Upload your first document to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-slate-900 via-blue-900 to-purple-900 border-b-2 border-slate-700">
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        checked={selectedFiles.length === files.length}
                        onChange={(e) =>
                          setSelectedFiles(e.target.checked ? files.map((f) => f.id) : [])
                        }
                        className="w-5 h-5 rounded-lg border-2 border-white/40 cursor-pointer accent-purple-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left font-bold text-white uppercase tracking-wider text-sm">File Name</th>
                    <th className="px-6 py-4 text-left font-bold text-white uppercase tracking-wider text-sm">Type</th>
                    <th className="px-6 py-4 text-left font-bold text-white uppercase tracking-wider text-sm">Category</th>
                    <th className="px-6 py-4 text-left font-bold text-white uppercase tracking-wider text-sm">Size</th>
                    <th className="px-6 py-4 text-left font-bold text-white uppercase tracking-wider text-sm">Uploaded</th>
                    <th className="px-6 py-4 text-left font-bold text-white uppercase tracking-wider text-sm">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {files.map((file, index) => {
                    const fileIcon = getFileIcon(file.type);
                    return (
                      <tr key={file.id} className={`border-b-2 border-slate-100 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all group ${index % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedFiles.includes(file.id)}
                            onChange={() => handleSelectFile(file.id)}
                            className="w-5 h-5 rounded-lg border-2 border-slate-300 cursor-pointer accent-purple-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${fileIcon.bg} flex items-center justify-center text-xl group-hover:scale-110 transition-transform shadow-sm`}>
                              {fileIcon.emoji}
                            </div>
                            <span className="font-bold text-slate-900">{file.name}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1.5 bg-gradient-to-br ${fileIcon.bg} ${fileIcon.text} rounded-lg text-sm font-bold border-2 ${fileIcon.text.replace('text', 'border')}/20`}>
                            {file.type}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1.5 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 rounded-lg text-sm font-bold">
                            {file.category}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-600 font-bold">{file.size}</td>
                        <td className="px-6 py-4 text-slate-600 font-bold">{file.uploaded}</td>
                        <td className="px-6 py-4">
                          <button className="group/btn px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-bold text-sm hover:shadow-lg transition-all hover:scale-105">
                            <span className="flex items-center gap-1.5">
                              <svg className="w-4 h-4 group-hover/btn:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                              </svg>
                              Download
                            </span>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Upload Success Notification */}
        {showUploadSuccess && (
          <div className="fixed bottom-6 right-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-4 rounded-xl shadow-2xl border-2 border-white/20 animate-in slide-in-from-bottom-5 z-50">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="font-bold">Files uploaded successfully!</p>
            </div>
          </div>
        )}

        {/* Premium Add School Modal */}
        {showAddSchoolModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-in zoom-in duration-300 border-4 border-slate-200 max-h-[90vh] overflow-y-auto custom-scrollbar">
              
              {/* Premium Modal Header */}
              <div className="flex justify-between items-center mb-6 pb-6 border-b-2 border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Add New School</h2>
                    <p className="text-sm text-slate-500 font-medium">Register a new institution</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowAddSchoolModal(false)}
                  className="group p-2.5 rounded-xl hover:bg-slate-100 transition-all hover:scale-110"
                >
                  <svg className="w-6 h-6 text-slate-400 group-hover:text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Premium Modal Form */}
              <form onSubmit={handleAddSchool} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      School Name 
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={newSchool.name}
                      onChange={handleAddSchoolChange}
                      placeholder="e.g., Greenwood High School"
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium shadow-sm hover:shadow-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      Principal Name 
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="principal"
                      value={newSchool.principal}
                      onChange={handleAddSchoolChange}
                      placeholder="e.g., Dr. John Smith"
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium shadow-sm hover:shadow-md"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2">
                      Email 
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={newSchool.email}
                      onChange={handleAddSchoolChange}
                      placeholder="principal@school.edu"
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium shadow-sm hover:shadow-md"
                      required
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={newSchool.phone}
                      onChange={handleAddSchoolChange}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-medium shadow-sm hover:shadow-md"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      School Address
                    </label>
                    <textarea
                      name="address"
                      value={newSchool.address}
                      onChange={handleAddSchoolChange}
                      placeholder="Complete school address with city and postal code..."
                      rows="3"
                      className="w-full px-4 py-3.5 border-2 border-slate-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all resize-none font-medium shadow-sm hover:shadow-md"
                    />
                  </div>
                </div>

                {/* Premium Modal Actions */}
                <div className="flex gap-4 pt-6 border-t-2 border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowAddSchoolModal(false)}
                    className="flex-1 px-6 py-3.5 border-2 border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-100 transition-all hover:scale-105 shadow-sm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold hover:shadow-2xl transition-all hover:scale-105 active:scale-95 border-2 border-white/20"
                  >
                    Add School
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }

        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #8b5cf6 transparent;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #3b82f6 0%, #8b5cf6 50%, #ec4899 100%);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
};

export default FilesPage;

import React, { useState } from 'react';

const FilesPage = () => {
  const [files, setFiles] = useState([
    { id: 1, name: 'Academic Report 2024.pdf', size: '2.4 MB', uploaded: '2024-12-05', type: 'PDF', category: 'Reports' },
    { id: 2, name: 'Student Database.xlsx', size: '1.8 MB', uploaded: '2024-12-04', type: 'Excel', category: 'Data' },
    { id: 3, name: 'School Policies.docx', size: '456 KB', uploaded: '2024-12-03', type: 'Document', category: 'Policies' },
  ]);

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

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

    setShowUploadSuccess(true);
    setTimeout(() => setShowUploadSuccess(false), 3000);
  };

  const getFileIcon = (type) => {
    const icons = {
      'PDF': { icon: '📄', bg: 'bg-red-100', text: 'text-red-600' },
      'Excel': { icon: '📊', bg: 'bg-green-100', text: 'text-green-600' },
      'Document': { icon: '📝', bg: 'bg-orange-100', text: 'text-[#ea580c]' },
      'Other': { icon: '📎', bg: 'bg-purple-100', text: 'text-purple-600' }
    };
    return icons[type] || icons['Other'];
  };

  const categories = ['All', 'Reports', 'Data', 'Policies', 'Uploads'];

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || file.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalSize = files.reduce((acc, file) => {
    const size = parseFloat(file.size);
    return acc + (isNaN(size) ? 0 : size);
  }, 0).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#ea580c] flex items-center justify-center shadow-md">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Files & Documents</h1>
            <p className="text-slate-500 text-sm">Manage and organize your school documents.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {selectedFiles.length > 0 && (
            <button
              onClick={handleDeleteFiles}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete ({selectedFiles.length})
            </button>
          )}
          <label className="px-5 py-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white text-sm font-medium rounded-lg flex items-center gap-2 cursor-pointer transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            Upload Files
            <input type="file" multiple onChange={handleUpload} className="hidden" />
          </label>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{files.length}</p>
          <p className="text-sm text-slate-500">Total Files</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{totalSize} MB</p>
          <p className="text-sm text-slate-500">Storage Used</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{files.filter(f => f.type === 'PDF').length}</p>
          <p className="text-sm text-slate-500">PDF Documents</p>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
          </div>
          <p className="text-2xl font-bold text-slate-800">{categories.length - 1}</p>
          <p className="text-sm text-slate-500">Categories</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-xl border border-slate-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg className="absolute left-3 top-3 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search files by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-orange-500 min-w-[150px]"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Files Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-800">All Files</h2>
            <p className="text-sm text-slate-500">{filteredFiles.length} files found</p>
          </div>
          {files.length > 0 && (
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={selectedFiles.length === files.length && files.length > 0}
                onChange={(e) => setSelectedFiles(e.target.checked ? files.map((f) => f.id) : [])}
                className="w-4 h-4 rounded border-slate-300"
              />
              Select All
            </label>
          )}
        </div>

        {filteredFiles.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-slate-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <p className="text-slate-600 font-medium">No files found</p>
            <p className="text-sm text-slate-500">Upload your first document to get started</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="w-12 py-3 px-4"></th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">File Name</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Type</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Category</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Size</th>
                  <th className="text-left py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Uploaded</th>
                  <th className="text-right py-3 px-6 text-xs font-semibold text-slate-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map((file) => {
                  const fileIcon = getFileIcon(file.type);
                  return (
                    <tr key={file.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-4">
                        <input
                          type="checkbox"
                          checked={selectedFiles.includes(file.id)}
                          onChange={() => handleSelectFile(file.id)}
                          className="w-4 h-4 rounded border-slate-300"
                        />
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${fileIcon.bg} flex items-center justify-center text-lg`}>
                            {fileIcon.icon}
                          </div>
                          <span className="font-medium text-slate-800">{file.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-lg text-xs font-medium ${fileIcon.bg} ${fileIcon.text}`}>
                          {file.type}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-slate-100 text-slate-600 rounded-lg text-xs font-medium">
                          {file.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-slate-600">{file.size}</td>
                      <td className="py-4 px-6 text-sm text-slate-600">{file.uploaded}</td>
                      <td className="py-4 px-6 text-right">
                        <button className="px-3 py-1.5 bg-orange-50 text-[#ea580c] text-xs font-medium rounded-lg hover:bg-orange-100 inline-flex items-center gap-1">
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
                          </svg>
                          Download
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

      {/* Upload Success Toast */}
      {showUploadSuccess && (
        <div className="fixed bottom-6 right-6 z-50">
          <div className="bg-white rounded-xl shadow-lg border border-green-200 p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Files uploaded successfully!</p>
              <p className="text-xs text-slate-500">Your files are now available.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilesPage;

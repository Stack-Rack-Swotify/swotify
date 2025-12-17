import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import StudentAttendance from '../components/StudentAttendance';
import StudentMarks from '../components/StudentMarks';
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import YearWisePerformanceTrends from '../../admin/components/YearWisePerformanceTrends';

const ReportPage = ({ studentId = 's1' }) => {
  const reportRef = useRef();

  const handleDownloadReport = () => {
    if (reportRef.current) {
      html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 297;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft >= 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('student-report.pdf');
      }).catch(err => {
        console.error("Error generating PDF:", err);
        alert("Failed to generate report. Please try again.");
      });
    } else {
      alert("Report content not found for download.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-lg">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Student Report</h1>
            <p className="text-slate-500 text-sm font-medium">Comprehensive academic performance summary</p>
          </div>
        </div>
        <button
          onClick={handleDownloadReport}
          className="px-5 py-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white rounded-xl font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          Download Report
        </button>
      </div>

      {/* Report Content Card */}
      <div ref={reportRef} className="section-card p-6">
        {/* Report Header */}
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center border border-blue-200">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Academic Performance Report</h2>
              <p className="text-sm text-slate-500">Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
            </div>
          </div>
        </div>

        {/* Report Sections */}
        <div className="space-y-6">
          <StudentAttendance studentId={studentId} />
          <StudentMarks studentId={studentId} />
          <PerformanceAnalysis studentId={studentId} />
          <YearWisePerformanceTrends studentId={studentId} />
        </div>

        {/* Report Footer */}
        <div className="mt-6 pt-5 border-t border-slate-100">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <p>© 2025 Swotify School Management System. All rights reserved.</p>
            <p>Report ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Information Card */}
      <div className="section-card p-6">
        <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h4 className="text-lg font-bold text-slate-800">Report Information</h4>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          This comprehensive report includes your attendance records, academic marks, and performance analysis across all subjects. Click the "Download Report" button above to save a PDF copy for your records.
        </p>

        <div className="flex flex-wrap gap-2">
          <span className="badge badge-blue flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            PDF Format
          </span>
          <span className="badge badge-purple flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            High Quality
          </span>
          <span className="badge badge-orange flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Real-time Data
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
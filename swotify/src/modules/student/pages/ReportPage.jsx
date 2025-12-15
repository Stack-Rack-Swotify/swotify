import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import StudentAttendance from '../components/StudentAttendance';
import StudentMarks from '../components/StudentMarks';
import PerformanceAnalysis from '../components/PerformanceAnalysis';
import YearWisePerformanceTrends from '../../admin/components/YearWisePerformanceTrends';

const ReportPage = ({ studentId = 's1' }) => { // Accept studentId prop
  const reportRef = useRef();

  const handleDownloadReport = () => {
    if (reportRef.current) {
      html2canvas(reportRef.current, {
        scale: 2, // Increase scale for better resolution
        useCORS: true, // If you have images from other origins
      }).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 297; // A4 height in mm
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-gray-100 mb-2">Student Report</h1>
            <p className="text-slate-600 dark:text-gray-400 text-sm">Comprehensive academic performance summary</p>
          </div>
          <button
            onClick={handleDownloadReport}
            className="px-6 py-3 bg-gradient-to-r from-cyan-600 via-blue-600 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 font-medium flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Report
          </button>
        </div>

        {/* Report Content */}
        <div ref={reportRef} className="space-y-6 p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-slate-200 dark:border-gray-700">
          {/* Report Header (will appear in PDF) */}
          <div className="mb-8 pb-6 border-b-2 border-slate-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-gray-100 mb-1">Academic Performance Report</h2>
                <p className="text-sm text-slate-600 dark:text-gray-400">Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </div>
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 dark:from-cyan-600/20 dark:to-blue-600/20 rounded-xl flex items-center justify-center border-2 border-cyan-300 dark:border-cyan-700 shadow-lg">
                <svg className="w-10 h-10 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Report Sections */}
          <StudentAttendance studentId={studentId} />
          <StudentMarks studentId={studentId} />
          <PerformanceAnalysis studentId={studentId} />
          <YearWisePerformanceTrends studentId={studentId} />

          {/* Report Footer (will appear in PDF) */}
          <div className="mt-8 pt-6 border-t-2 border-slate-200 dark:border-gray-700">
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-gray-400">
              <p>© 2025 Student Management System. All rights reserved.</p>
              <p>Report ID: #{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-6 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border-2 border-slate-200 dark:border-gray-700">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-cyan-500/20 dark:bg-cyan-600/20 rounded-xl flex items-center justify-center flex-shrink-0 border-2 border-cyan-300 dark:border-cyan-700">
              <svg className="w-5 h-5 text-cyan-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="flex-1">
              <h4 className="text-base font-semibold text-slate-900 dark:text-gray-100 mb-2">Report Information</h4>
              <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed mb-3">
                This comprehensive report includes your attendance records, academic marks, and performance analysis across all subjects. Click the "Download Report" button above to save a PDF copy for your records.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 rounded-full text-xs font-semibold border-2 border-emerald-300 dark:border-emerald-700">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  PDF Format
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-cyan-50 dark:bg-cyan-900/20 text-cyan-600 dark:text-cyan-400 rounded-full text-xs font-semibold border-2 border-cyan-300 dark:border-cyan-700">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  High Quality
                </span>
                <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-full text-xs font-semibold border-2 border-orange-300 dark:border-orange-700">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Real-time Data
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;
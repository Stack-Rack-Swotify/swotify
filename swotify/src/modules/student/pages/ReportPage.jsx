import React, { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import StudentAttendance from '../components/StudentAttendance';
import StudentMarks from '../components/StudentMarks';
import PerformanceAnalysis from '../components/PerformanceAnalysis';

const ReportPage = () => {
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-white">Student Report</h1>
                  <button
                    onClick={handleDownloadReport}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-offset-2"
                  >          Download Report
        </button>
      </div>

      <div ref={reportRef} className="space-y-8">
        <StudentAttendance />
        <StudentMarks />
        <PerformanceAnalysis />
      </div>
    </div>
  );
};

export default ReportPage;

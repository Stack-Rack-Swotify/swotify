// src/modules/auth/pages/PrivacyPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPage = () => {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 px-6 sticky top-0 z-50">
                <div className="max-w-4xl mx-auto flex justify-between items-center">
                    <Link to="/login" className="flex items-center gap-3">
                        <img src="/logo.png" alt="Swotify" className="w-10 h-10 object-contain" />
                        <h1 className="text-xl font-black text-slate-800 tracking-tighter">Swotify</h1>
                    </Link>
                    <Link to="/login" className="text-sm font-bold text-[#ea580c] hover:text-[#c2410c]">
                        ← Back to Login
                    </Link>
                </div>
            </nav>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-6 py-12">
                <div className="bg-white rounded-2xl border border-slate-200 shadow-xl p-8 md:p-12">
                    <h1 className="text-3xl font-black text-slate-800 mb-2">Privacy Policy</h1>
                    <p className="text-slate-500 text-sm mb-8">Last updated: December 2024</p>

                    <div className="space-y-8 text-slate-600 text-sm leading-relaxed">
                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">1. Introduction</h2>
                            <p>
                                Swotify ("we", "our", or "us") is committed to protecting the privacy of students, parents, teachers, and administrators who use our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our school management system.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">2. Information We Collect</h2>
                            <p className="font-medium text-slate-800 mb-2">Personal Information:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Name, email address, and contact information</li>
                                <li>Student identification numbers and enrollment data</li>
                                <li>Academic records and performance data</li>
                                <li>Attendance records</li>
                                <li>Parent/guardian contact information</li>
                            </ul>
                            <p className="font-medium text-slate-800 mt-4 mb-2">Usage Information:</p>
                            <ul className="list-disc list-inside space-y-2">
                                <li>Log data and device information</li>
                                <li>Browser type and settings</li>
                                <li>Platform usage patterns and preferences</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">3. How We Use Your Information</h2>
                            <p>We use the collected information to:</p>
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li>Provide and maintain our educational services</li>
                                <li>Track student progress and generate performance reports</li>
                                <li>Facilitate communication between teachers, students, and parents</li>
                                <li>Improve our platform through AI-powered analytics</li>
                                <li>Send important notifications about school activities</li>
                                <li>Ensure platform security and prevent fraud</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">4. Student Data Protection</h2>
                            <p>
                                We take the protection of student data very seriously. Our platform is designed to comply with:
                            </p>
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li><strong>FERPA</strong> (Family Educational Rights and Privacy Act)</li>
                                <li><strong>COPPA</strong> (Children's Online Privacy Protection Act)</li>
                                <li><strong>State Student Privacy Laws</strong> as applicable</li>
                            </ul>
                            <p className="mt-3">
                                We do not sell student data to third parties. Student information is only shared with authorized school personnel and parents/guardians as permitted by applicable laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">5. Data Security</h2>
                            <p>
                                We implement industry-standard security measures to protect your data, including:
                            </p>
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li>256-bit SSL/TLS encryption for data in transit</li>
                                <li>Encrypted data storage at rest</li>
                                <li>Regular security audits and penetration testing</li>
                                <li>Role-based access controls</li>
                                <li>Multi-factor authentication options</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">6. Data Retention</h2>
                            <p>
                                We retain student educational records for the duration of the student's enrollment plus seven (7) years, or as required by applicable laws and regulations. Users may request deletion of their personal data by contacting us directly.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">7. Third-Party Services</h2>
                            <p>
                                Our platform may integrate with third-party services for enhanced functionality. These services have their own privacy policies, and we encourage you to review them. We only partner with services that meet our data protection standards.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">8. Your Rights</h2>
                            <p>You have the right to:</p>
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li>Access your personal information</li>
                                <li>Correct inaccurate data</li>
                                <li>Request deletion of your data (subject to legal requirements)</li>
                                <li>Opt-out of non-essential communications</li>
                                <li>Receive a copy of your data in a portable format</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">9. Cookies and Tracking</h2>
                            <p>
                                We use essential cookies to maintain your session and preferences. We do not use tracking cookies for advertising purposes. You can control cookie settings through your browser preferences.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">10. Changes to This Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. We will notify users of any material changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">11. Contact Us</h2>
                            <p>
                                If you have questions about this Privacy Policy or our data practices, please contact our Data Protection Officer:
                            </p>
                            <p className="mt-3 font-medium text-slate-800">
                                Email: privacy@swotify.edu<br />
                                Phone: +1 (555) 123-4567<br />
                                Address: 123 Education Street, Learning City, ED 12345
                            </p>
                        </section>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 px-8 bg-white border-t border-slate-200">
                <div className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-xs font-medium">© 2024 Swotify. All rights reserved.</p>
                    <div className="flex gap-6 items-center">
                        <Link to="/terms" className="text-xs font-bold text-slate-400 hover:text-blue-500 uppercase tracking-widest transition-colors">Terms</Link>
                        <Link to="/privacy" className="text-xs font-bold text-blue-500 uppercase tracking-widest">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PrivacyPage;

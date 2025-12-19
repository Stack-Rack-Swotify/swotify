// src/modules/auth/pages/TermsPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
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
                    <h1 className="text-3xl font-black text-slate-800 mb-2">Terms of Service</h1>
                    <p className="text-slate-500 text-sm mb-8">Last updated: December 2024</p>

                    <div className="space-y-8 text-slate-600 text-sm leading-relaxed">
                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">1. Acceptance of Terms</h2>
                            <p>
                                By accessing and using Swotify ("the Platform"), you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, please do not use our services.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">2. Description of Service</h2>
                            <p>
                                Swotify is an AI-powered school management system designed to facilitate communication and collaboration between educational institutions, teachers, students, and parents. Our services include but are not limited to:
                            </p>
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li>Student performance tracking and analytics</li>
                                <li>Attendance management systems</li>
                                <li>Parent-teacher communication tools</li>
                                <li>AI-powered educational insights</li>
                                <li>Administrative dashboard for schools</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">3. User Accounts</h2>
                            <p>
                                To access certain features of the Platform, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
                            </p>
                            <p className="mt-3">
                                You are responsible for safeguarding your password and for all activities that occur under your account. You must notify us immediately of any unauthorized use of your account.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">4. Acceptable Use</h2>
                            <p>You agree not to:</p>
                            <ul className="list-disc list-inside mt-3 space-y-2">
                                <li>Use the Platform for any unlawful purpose</li>
                                <li>Share your account credentials with others</li>
                                <li>Attempt to gain unauthorized access to any part of the Platform</li>
                                <li>Upload malicious code or interfere with the Platform's operation</li>
                                <li>Use the Platform to harass, abuse, or harm others</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">5. Intellectual Property</h2>
                            <p>
                                The Platform and its original content, features, and functionality are owned by Swotify and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">6. Data Protection</h2>
                            <p>
                                We are committed to protecting student data and comply with applicable education privacy laws including FERPA (Family Educational Rights and Privacy Act). For more information about how we handle your data, please refer to our Privacy Policy.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">7. Limitation of Liability</h2>
                            <p>
                                In no event shall Swotify, its directors, employees, partners, agents, suppliers, or affiliates be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or use of the Platform.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">8. Changes to Terms</h2>
                            <p>
                                We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-lg font-bold text-slate-800 mb-3">9. Contact Us</h2>
                            <p>
                                If you have any questions about these Terms, please contact us at:
                            </p>
                            <p className="mt-3 font-medium text-slate-800">
                                Email: legal@swotify.edu<br />
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
                        <Link to="/terms" className="text-xs font-bold text-blue-500 uppercase tracking-widest">Terms</Link>
                        <Link to="/privacy" className="text-xs font-bold text-slate-400 hover:text-blue-500 uppercase tracking-widest transition-colors">Privacy Policy</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default TermsPage;

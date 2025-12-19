// src/modules/auth/pages/HelpCenterPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HelpCenterPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    const categories = [
        { id: 'all', label: 'All Topics', icon: '📚' },
        { id: 'getting-started', label: 'Getting Started', icon: '🚀' },
        { id: 'account', label: 'Account & Login', icon: '🔐' },
        { id: 'students', label: 'For Students', icon: '🎓' },
        { id: 'teachers', label: 'For Teachers', icon: '👨‍🏫' },
        { id: 'parents', label: 'For Parents', icon: '👨‍👩‍👧' },
        { id: 'technical', label: 'Technical Support', icon: '🔧' },
    ];

    const faqs = [
        {
            id: 1,
            category: 'getting-started',
            question: 'How do I create a Swotify account?',
            answer: 'To create an account, click the "Sign Up" button on the login page. Fill in your details including your full name, campus email, and create a secure password. Select your role (Student, Teacher, or Admin) and submit the form. You will receive a confirmation email to verify your account.'
        },
        {
            id: 2,
            category: 'getting-started',
            question: 'What are the system requirements for Swotify?',
            answer: 'Swotify works on any modern web browser including Chrome, Firefox, Safari, and Edge. We recommend using the latest version of your browser for the best experience. The platform is also fully responsive and works on tablets and mobile devices.'
        },
        {
            id: 3,
            category: 'account',
            question: 'I forgot my password. How can I reset it?',
            answer: 'Click on "Forgot Password" on the login page. Enter your registered email address, and we will send you a password reset link. The link is valid for 24 hours. If you don\'t receive the email, check your spam folder or contact your school administrator.'
        },
        {
            id: 4,
            category: 'account',
            question: 'How do I change my password?',
            answer: 'Log in to your account and go to Settings > Security. Click on "Change Password" and enter your current password followed by your new password. Your new password must be at least 8 characters long and include a mix of letters and numbers.'
        },
        {
            id: 5,
            category: 'account',
            question: 'Can I change my email address?',
            answer: 'Email changes must be done through your school administrator to ensure security and proper record-keeping. Contact your school\'s IT department or admin office to request an email change.'
        },
        {
            id: 6,
            category: 'students',
            question: 'How do I view my grades and assignments?',
            answer: 'After logging in, go to your Dashboard where you\'ll see an overview of recent grades. For detailed information, navigate to "Academics" > "Grades" to view all your subjects and scores. Assignments can be found under "Academics" > "Assignments".'
        },
        {
            id: 7,
            category: 'students',
            question: 'How do I check my attendance record?',
            answer: 'Your attendance is displayed on your Dashboard. For a detailed view, go to "Attendance" in the sidebar menu. You can view your attendance by day, week, or month, and see any absences or late arrivals.'
        },
        {
            id: 8,
            category: 'students',
            question: 'How do I submit an assignment?',
            answer: 'Go to "Assignments" from your dashboard, find the assignment you need to submit, and click on it. You can upload files, type your response, or both depending on the assignment type. Click "Submit" when ready. You\'ll receive a confirmation once submitted.'
        },
        {
            id: 9,
            category: 'teachers',
            question: 'How do I create a new assignment?',
            answer: 'Navigate to your class, then click "Create Assignment". Fill in the title, description, due date, and any attachments. You can set the assignment for specific students or the entire class. Save as draft or publish immediately.'
        },
        {
            id: 10,
            category: 'teachers',
            question: 'How do I take attendance?',
            answer: 'Go to "Attendance" from your dashboard, select your class and the date. You\'ll see a list of all students - mark each as Present, Absent, or Late. Click "Save" to record the attendance. You can also edit previous attendance records if needed.'
        },
        {
            id: 11,
            category: 'teachers',
            question: 'How do I communicate with parents?',
            answer: 'Use the "Messages" feature to send direct messages to parents. You can also post announcements to your class which will be visible to both students and parents. For urgent matters, use the "Notify Parents" quick action button.'
        },
        {
            id: 12,
            category: 'parents',
            question: 'How do I track my child\'s progress?',
            answer: 'Log in with your parent account to access your child\'s dashboard. You\'ll see grades, attendance, upcoming assignments, and any teacher communications. You can view detailed reports under "Reports" in the menu.'
        },
        {
            id: 13,
            category: 'parents',
            question: 'How do I contact my child\'s teacher?',
            answer: 'Go to "Messages" and select "New Message". Choose the teacher from the list of your child\'s teachers. You can also respond to any messages or announcements the teacher has sent.'
        },
        {
            id: 14,
            category: 'technical',
            question: 'The page is loading slowly. What should I do?',
            answer: 'Try refreshing the page or clearing your browser cache. Check your internet connection. If the problem persists, try using a different browser. If issues continue, please contact technical support with details about your device and browser.'
        },
        {
            id: 15,
            category: 'technical',
            question: 'I\'m getting an error message. What should I do?',
            answer: 'Note down the error message and any error codes displayed. Try refreshing the page first. If the error persists, log out and log back in. If you still see the error, contact technical support with the error details and screenshots if possible.'
        },
    ];

    const filteredFaqs = faqs.filter(faq => {
        const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
        const matchesSearch = searchTerm === '' ||
            faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
            faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const contactOptions = [
        {
            icon: '📧',
            title: 'Email Support',
            description: 'Get help via email',
            contact: 'support@swotify.edu',
            action: 'mailto:support@swotify.edu'
        },
        {
            icon: '💬',
            title: 'Live Chat',
            description: 'Chat with our team',
            contact: 'Available 9 AM - 6 PM',
            action: '#'
        },
        {
            icon: '📞',
            title: 'Phone Support',
            description: 'Call us directly',
            contact: '+1 (555) 123-4567',
            action: 'tel:+15551234567'
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50">
            {/* Header */}
            <nav className="w-full bg-white/80 backdrop-blur-md border-b border-slate-200 py-3 px-6 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <Link to="/login" className="flex items-center gap-3">
                        <img src="/logo.png" alt="Swotify" className="w-10 h-10 object-contain" />
                        <h1 className="text-xl font-black text-slate-800 tracking-tighter">Swotify</h1>
                    </Link>
                    <Link to="/login" className="text-sm font-bold text-[#ea580c] hover:text-[#c2410c]">
                        ← Back to Login
                    </Link>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="bg-[#ea580c] py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">How can we help you?</h1>
                    <p className="text-white/80 text-lg mb-8">Search our knowledge base or browse categories below</p>

                    {/* Search Bar */}
                    <div className="relative max-w-2xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search for help..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-6 py-4 pl-14 text-lg rounded-2xl border-0 shadow-xl focus:outline-none focus:ring-4 focus:ring-white/30"
                        />
                        <svg className="absolute left-5 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* Categories */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Browse by Category</h2>
                    <div className="flex flex-wrap gap-3">
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveCategory(cat.id)}
                                className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2 ${activeCategory === cat.id
                                    ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                                    : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* FAQs */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-slate-800 mb-6">
                        Frequently Asked Questions
                        <span className="ml-2 text-sm font-normal text-slate-500">({filteredFaqs.length} articles)</span>
                    </h2>

                    {filteredFaqs.length > 0 ? (
                        <div className="space-y-4">
                            {filteredFaqs.map(faq => (
                                <details key={faq.id} className="group bg-white rounded-xl border border-slate-200 overflow-hidden">
                                    <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-slate-50 transition-colors">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="font-semibold text-slate-800 text-left">{faq.question}</span>
                                        </div>
                                        <svg className="w-5 h-5 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </summary>
                                    <div className="px-5 pb-5 pt-0">
                                        <div className="pl-14 text-slate-600 leading-relaxed">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </details>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-2">No results found</h3>
                            <p className="text-slate-500 text-sm">Try adjusting your search or browse different categories</p>
                        </div>
                    )}
                </div>

                {/* Contact Section */}
                <div className="bg-white rounded-2xl border border-slate-200 p-8">
                    <h2 className="text-xl font-bold text-slate-800 mb-2 text-center">Still need help?</h2>
                    <p className="text-slate-500 text-center mb-8">Our support team is here to assist you</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {contactOptions.map((option, index) => (
                            <a
                                key={index}
                                href={option.action}
                                className="flex flex-col items-center p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
                            >
                                <span className="text-4xl mb-4">{option.icon}</span>
                                <h3 className="font-bold text-slate-800 mb-1">{option.title}</h3>
                                <p className="text-slate-500 text-sm mb-2">{option.description}</p>
                                <span className="text-blue-600 font-semibold text-sm group-hover:underline">{option.contact}</span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Quick Links */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white">
                        <h3 className="font-bold text-lg mb-2">📖 User Guide</h3>
                        <p className="text-white/80 text-sm mb-4">Complete documentation for all users</p>
                        <button className="px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                            View Guide →
                        </button>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white">
                        <h3 className="font-bold text-lg mb-2">🎥 Video Tutorials</h3>
                        <p className="text-white/80 text-sm mb-4">Step-by-step video walkthroughs</p>
                        <button className="px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                            Watch Videos →
                        </button>
                    </div>
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white">
                        <h3 className="font-bold text-lg mb-2">📢 System Status</h3>
                        <p className="text-white/80 text-sm mb-4">Check platform uptime and issues</p>
                        <button className="px-4 py-2 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition-colors">
                            View Status →
                        </button>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="w-full py-6 px-8 bg-white border-t border-slate-200">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-slate-400 text-xs font-medium">© 2024 Swotify. All rights reserved.</p>
                    <div className="flex gap-6 items-center">
                        <Link to="/terms" className="text-xs font-bold text-slate-400 hover:text-blue-500 uppercase tracking-widest transition-colors">Terms</Link>
                        <Link to="/privacy" className="text-xs font-bold text-slate-400 hover:text-blue-500 uppercase tracking-widest transition-colors">Privacy Policy</Link>
                        <Link to="/help" className="text-xs font-bold text-blue-500 uppercase tracking-widest">Help Center</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HelpCenterPage;

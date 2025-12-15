import React, { useState, useRef, useEffect } from 'react';

const ParentAIChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  // Suggestion system
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Parent-focused suggestion database
  const suggestionDatabase = [
    "How is my child performing in Math?",
    "What's my child's attendance this month?",
    "Show me upcoming parent-teacher meetings",
    "What assignments are due for my child?",
    "Has my child submitted today's homework?",
    "Show me my child's latest test scores",
    "What are the pending fee payments?",
    "When is the next school holiday?",
    "How can I help my child improve in Science?",
    "Show my child's behavior reports",
    "What extracurricular activities is my child enrolled in?",
    "Contact my child's class teacher",
    "View school calendar and events",
    "Download my child's report card",
    "What's the school lunch menu this week?",
    "Is my child's transportation on time today?",
  ];

  // Parent starter suggestions
  const starterSuggestions = [
    "📊 Check my child's grades",
    "📅 View upcoming events",
    "💬 Message a teacher",
    "📋 See pending assignments",
  ];

  // Parent chat threads
  const [threads, setThreads] = useState([
    { id: 1, title: 'Monthly Progress Review', date: 'Today', active: false },
    { id: 2, title: 'Fee Payment Inquiry', date: 'Yesterday', active: false },
    { id: 3, title: 'Parent-Teacher Meeting', date: '3 days ago', active: false },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.length >= 3) {
      const filtered = suggestionDatabase.filter(suggestion =>
        suggestion.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 3);

      if (filtered.length > 0) {
        setSuggestions(filtered);
        setShowSuggestions(true);
        setSelectedSuggestionIndex(0);
      } else {
        setShowSuggestions(false);
      }
    } else {
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e) => {
    if (!showSuggestions) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSendMessage();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex((prev) => prev > 0 ? prev - 1 : 0);
        break;
      case 'Enter':
        e.preventDefault();
        if (suggestions[selectedSuggestionIndex]) {
          selectSuggestion(suggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        break;
      default:
        break;
    }
  };

  const selectSuggestion = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  const handleStarterClick = (suggestion) => {
    setInput(suggestion);
    inputRef.current?.focus();
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { 
      sender: 'user', 
      text: input,
      timestamp: new Date()
    };
    setMessages([...messages, newMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = { 
        sender: 'ai', 
        text: `Hello! Here's what I found regarding "${input}":\n\n**Your Child's Overview:**\n• Overall Grade: B+ (87%) - Excellent progress! 🎯\n• Attendance: 94% this month\n• Pending Assignments: 2 (due Friday)\n• Next Parent Meeting: December 20, 2025 at 3:00 PM\n\n**Teacher's Recent Notes:**\n"Your child is showing great improvement in Mathematics. Keep encouraging practice at home."\n\n**Recommendations:**\n1. Review the Science project due this Friday\n2. Schedule a brief call with the Math teacher\n3. Check the updated fee payment deadline\n\nWould you like more details on any specific area?`,
        timestamp: new Date()
      };
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleNewChat = () => {
    setMessages([]);
    setThreads(threads.map(t => ({ ...t, active: false })));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="h-full flex bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200">
      
      {/* Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-0' : 'w-64'} bg-gradient-to-b from-indigo-50 to-purple-50 border-r border-indigo-200 transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col`}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-indigo-200">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all shadow-sm font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Conversation
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-xs font-semibold text-indigo-700 uppercase px-2 py-1 mb-1">Recent Chats</div>
          {threads.map((thread) => (
            <button
              key={thread.id}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${ 
                thread.active 
                  ? 'bg-indigo-100 text-indigo-900 font-medium shadow-sm' 
                  : 'hover:bg-white/50 text-slate-700'
              }`}
            >
              <p className="truncate font-medium">{thread.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{thread.date}</p>
            </button>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-3 border-t border-indigo-200 bg-white/30">
          <div className="text-xs font-semibold text-indigo-700 uppercase mb-2">Quick Actions</div>
          <button className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/50 transition-colors mb-1 text-slate-700 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Contact Teacher
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/50 transition-colors mb-1 text-slate-700 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Report Card
          </button>
          <button className="w-full text-left px-3 py-2 rounded-lg text-xs hover:bg-white/50 transition-colors text-slate-700 flex items-center gap-2">
            <svg className="w-3.5 h-3.5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
            Pay Fees Online
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-indigo-200 bg-white/40">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <span className="font-medium">Parent Portal Active</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Top Bar */}
        <header className="h-16 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between px-6 flex-shrink-0 shadow-md">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-semibold text-white">Parent Assistant</h1>
                <p className="text-xs text-indigo-100">Your child's progress & school updates</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-white/20">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-sm text-white font-medium">Parent Portal</span>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-slate-50 to-indigo-50/30">
          <div className="max-w-4xl mx-auto px-6 py-6">
            
            {/* Empty State */}
            {messages.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mb-2">
                  Welcome to Parent Assistant 👋
                </h2>
                <p className="text-slate-600 text-sm mb-8 max-w-md mx-auto">
                  Stay connected with your child's education. Ask me about grades, attendance, assignments, or upcoming school events.
                </p>

                {/* Starter Suggestions */}
                <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {starterSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleStarterClick(suggestion)}
                      className="text-left px-4 py-3.5 bg-white border-2 border-indigo-100 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md transition-all group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-200 transition-colors">
                          <span className="text-lg">{suggestion.split(' ')[0]}</span>
                        </div>
                        <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-900">{suggestion.slice(3)}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Messages */
              <div className="space-y-6 pb-4">
                {messages.map((msg, index) => (
                  <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    
                    {msg.sender === 'ai' && (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                      </div>
                    )}

                    <div className={`flex-1 ${msg.sender === 'user' ? 'max-w-2xl' : 'max-w-3xl'}`}>
                      <div className={`${
                        msg.sender === 'user'
                          ? 'ml-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                          : 'bg-white text-slate-900 border-2 border-indigo-100 shadow-sm'
                      } rounded-2xl px-4 py-3`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {msg.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                        <span>{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-md">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center shadow-md">
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <div className="bg-white border-2 border-indigo-100 rounded-2xl px-4 py-3 shadow-sm">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="border-t-2 border-indigo-100 bg-white p-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto relative">
            
            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border-2 border-indigo-200 rounded-xl shadow-lg overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-indigo-50 last:border-0 ${ 
                      index === selectedSuggestionIndex
                        ? 'bg-indigo-50 text-indigo-900 font-medium'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-indigo-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      <span className="truncate">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Input Box */}
            <div className="relative">
              <div className="flex items-end gap-2 bg-white border-2 border-indigo-200 rounded-2xl p-2 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all shadow-sm">
                <textarea
                  ref={inputRef}
                  rows={1}
                  className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 resize-none outline-none text-sm px-3 py-2.5 max-h-32"
                  placeholder="Ask about your child's progress, grades, or school activities..."
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  style={{
                    minHeight: '42px',
                    height: 'auto'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className={`flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-sm ${ 
                    input.trim()
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>

            <p className="text-xs text-slate-500 mt-2 text-center">
              Stay informed about your child's academic journey • Available 24/7
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ParentAIChatbotPage;

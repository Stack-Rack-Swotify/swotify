import React, { useState, useRef, useEffect } from 'react';

const ParentAIChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

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

  const starterSuggestions = [
    { icon: "📊", text: "Check my child's grades", color: "blue" },
    { icon: "📅", text: "View upcoming events", color: "green" },
    { icon: "💬", text: "Message a teacher", color: "purple" },
    { icon: "📋", text: "See pending assignments", color: "orange" },
  ];

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

  const handleStarterClick = (text) => {
    setInput(text);
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 flex items-center justify-center shadow-lg">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-800">AI Assistant</h1>
          <p className="text-slate-500 text-sm font-medium">Your child's progress & school updates</p>
        </div>
      </div>

      {/* Main Chat Container */}
      <div className="section-card overflow-hidden" style={{ minHeight: '600px' }}>
        <div className="flex h-full" style={{ minHeight: '600px' }}>

          {/* Sidebar */}
          <aside className={`${sidebarCollapsed ? 'w-0' : 'w-64'} bg-slate-50 border-r border-slate-200 transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col`}>

            {/* Sidebar Header */}
            <div className="p-4 border-b border-slate-200">
              <button
                onClick={handleNewChat}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white rounded-xl hover:shadow-lg transition-all font-semibold text-sm"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                New Conversation
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-2 mb-2">Recent Chats</div>
              {threads.map((thread) => (
                <button
                  key={thread.id}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm transition-all mb-1 ${thread.active
                    ? 'bg-white text-slate-800 font-medium shadow-sm border border-slate-200'
                    : 'hover:bg-white text-slate-600 hover:shadow-sm'
                    }`}
                >
                  <p className="truncate font-medium">{thread.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{thread.date}</p>
                </button>
              ))}
            </div>

            {/* Sidebar Footer */}
            <div className="p-3 border-t border-slate-200 bg-slate-50">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="font-medium">AI Assistant Active</span>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 flex flex-col overflow-hidden">

            {/* Top Bar */}
            <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 hover:bg-slate-100 rounded-xl transition-colors text-slate-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-sm font-bold text-slate-800">Swotify AI</h2>
                    <p className="text-xs text-slate-500">Always ready to help</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="badge badge-green">Online</span>
              </div>
            </header>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto bg-slate-50 custom-scrollbar">
              <div className="max-w-3xl mx-auto px-4 py-6">

                {/* Empty State */}
                {messages.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-[#ea580c] flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">
                      Welcome to Swotify AI 👋
                    </h2>
                    <p className="text-slate-500 text-sm mb-6 max-w-md mx-auto">
                      Stay connected with your child's education. Ask me about grades, attendance, assignments, or upcoming school events.
                    </p>

                    {/* Starter Suggestions */}
                    <div className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {starterSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => handleStarterClick(suggestion.text)}
                          className="text-left p-4 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${suggestion.color === 'blue' ? 'bg-blue-100' :
                              suggestion.color === 'green' ? 'bg-green-100' :
                                suggestion.color === 'purple' ? 'bg-purple-100' :
                                  'bg-orange-100'
                              }`}>
                              <span className="text-lg">{suggestion.icon}</span>
                            </div>
                            <span className="text-sm font-medium text-slate-700 group-hover:text-slate-900">{suggestion.text}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  /* Messages */
                  <div className="space-y-4 pb-4">
                    {messages.map((msg, index) => (
                      <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>

                        {msg.sender === 'ai' && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0 shadow">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                            </svg>
                          </div>
                        )}

                        <div className={`flex-1 ${msg.sender === 'user' ? 'max-w-lg' : 'max-w-2xl'}`}>
                          <div className={`${msg.sender === 'user'
                            ? 'ml-auto bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 text-white shadow-md'
                            : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
                            } rounded-2xl px-4 py-3`}>
                            <p className="text-sm leading-relaxed whitespace-pre-line">
                              {msg.text}
                            </p>
                          </div>
                          <div className={`flex items-center gap-2 mt-1.5 text-xs text-slate-400 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                            <span>{formatTime(msg.timestamp)}</span>
                          </div>
                        </div>

                        {msg.sender === 'user' && (
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center flex-shrink-0 shadow">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center shadow">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                          </svg>
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
                          <div className="flex gap-1.5">
                            <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                            <div className="w-2 h-2 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
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
            <div className="border-t border-slate-200 bg-white p-4 flex-shrink-0">
              <div className="max-w-3xl mx-auto relative">

                {/* Suggestions Dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => selectSuggestion(suggestion)}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-slate-100 last:border-0 ${index === selectedSuggestionIndex
                          ? 'bg-blue-50 text-blue-800 font-medium'
                          : 'hover:bg-slate-50 text-slate-700'
                          }`}
                      >
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <span className="truncate">{suggestion}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}

                {/* Input Box */}
                <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
                  <textarea
                    ref={inputRef}
                    rows={1}
                    className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 resize-none outline-none text-sm px-3 py-2.5 max-h-32"
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
                    className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${input.trim()
                      ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-orange-400 hover:shadow-lg text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                      }`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  </button>
                </div>

                <p className="text-xs text-slate-400 mt-2 text-center">
                  Powered by Swotify AI • Available 24/7
                </p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default ParentAIChatbotPage;

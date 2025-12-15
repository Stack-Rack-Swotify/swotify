import React, { useState, useRef, useEffect } from 'react';

const AdminAIChatbotPage = () => {
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

  // Suggestion database (Tailored for School Admin)
  const suggestionDatabase = [
    "What's the average attendance for Grade 10?",
    "Show me the top performing students in Science",
    "Which classes have the lowest attendance?",
    "Generate a performance report for Staff members",
    "How many students are at risk of failing?",
    "Show me the schedule for next week",
    "Analyze Grade 12 Math results",
    "Who are the most improved students?",
    "What is the staff attendance rate?",
    "Compare Class 9A and 9B performance",
    "List upcoming parent-teacher meetings",
    "Show me pending leave requests",
  ];

  // Starter suggestions
  const starterSuggestions = [
    "Analyze class performance trends",
    "Show low attendance alerts",
    "Staff performance summary",
    "Generate weekly school report",
  ];

  // Chat threads
  const [threads, setThreads] = useState([
    { id: 1, title: 'Grade 10 Performance Review', date: 'Today', active: false },
    { id: 2, title: 'Staff Meeting Notes', date: 'Yesterday', active: false },
    { id: 3, title: 'Attendance Analysis', date: '2 days ago', active: false },
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
        text: `Based on your query about "${input}", here is the analysis for your school:\n\n**Key Insights:**\n• Overall attendance is stable at 94%.\n• Grade 10 Science average has improved by 5%.\n• 3 Staff members have pending leave requests.\n\n**Action Items:**\n1. Review the low attendance list for Grade 9.\n2. Approve pending staff leaves.\n3. Schedule a meeting with the Math department.\n\nWould you like to see a detailed breakdown?`,
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
      
      {/* Minimal Sidebar */}
      <aside className={`${sidebarCollapsed ? 'w-0' : 'w-64'} bg-slate-50 border-r border-slate-200 transition-all duration-300 overflow-hidden flex-shrink-0 flex flex-col`}>
        
        {/* Sidebar Header */}
        <div className="p-4 border-b border-slate-200">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            New Chat
          </button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="text-xs font-semibold text-slate-500 uppercase px-2 py-1 mb-1">Recent</div>
          {threads.map((thread) => (
            <button
              key={thread.id}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors mb-1 ${ 
                thread.active 
                  ? 'bg-blue-100 text-blue-900 font-medium' 
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <p className="truncate font-medium">{thread.title}</p>
              <p className="text-xs text-slate-500 mt-0.5">{thread.date}</p>
            </button>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-200">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            <span className="font-medium">School AI Online</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Minimal Top Bar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h1 className="text-lg font-semibold text-slate-900">Admin Assistant</h1>
            </div>
          </div>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto bg-slate-50">
          <div className="max-w-4xl mx-auto px-6 py-6">
            
            {/* Empty State with Starter Suggestions */}
            {messages.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-blue-600 flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-semibold text-slate-900 mb-2">
                  How can I help manage the school?
                </h2>
                <p className="text-slate-600 text-sm mb-8">
                  Ask me about students, staff, attendance, or performance reports.
                </p>

                {/* Starter Suggestions */}
                <div className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {starterSuggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleStarterClick(suggestion)}
                      className="text-left px-4 py-3 bg-white border border-slate-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors group"
                    >
                      <div className="flex items-center gap-2">
                        <svg className="w-4 h-4 text-slate-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                        <span className="text-sm text-slate-700 group-hover:text-blue-900">{suggestion}</span>
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
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                    )}

                    <div className={`flex-1 ${msg.sender === 'user' ? 'max-w-2xl' : 'max-w-3xl'}`}>
                      <div className={`${
                        msg.sender === 'user'
                          ? 'ml-auto bg-blue-600 text-white'
                          : 'bg-white text-slate-900 border border-slate-200'
                      } rounded-lg px-4 py-3`}>
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {msg.text}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-500">
                        <span>{formatTime(msg.timestamp)}</span>
                      </div>
                    </div>

                    {msg.sender === 'user' && (
                      <div className="w-8 h-8 rounded-lg bg-slate-300 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator */}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <div className="bg-white border border-slate-200 rounded-lg px-4 py-3">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Claude-Style Input Area */}
        <div className="border-t border-slate-200 bg-white p-4 flex-shrink-0">
          <div className="max-w-4xl mx-auto relative">
            
            {/* Compact Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-300 rounded-lg shadow-lg overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className={`w-full text-left px-3 py-2 text-xs transition-colors border-b border-slate-100 last:border-0 ${ 
                      index === selectedSuggestionIndex
                        ? 'bg-blue-50 text-blue-900'
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-3 h-3 text-slate-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="truncate">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Claude-Style Search Box */}
            <div className="relative">
              <div className="flex items-end gap-2 bg-white border-2 border-slate-300 rounded-2xl p-2 focus-within:border-blue-500 transition-colors shadow-sm">
                <textarea
                  ref={inputRef}
                  rows={1}
                  className="flex-1 bg-transparent text-slate-900 placeholder-slate-400 resize-none outline-none text-sm px-2 py-2 max-h-32"
                  placeholder="Ask me anything about the school..."
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={handleKeyDown}
                  style={{
                    minHeight: '40px',
                    height: 'auto'
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${ 
                    input.trim()
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminAIChatbotPage;

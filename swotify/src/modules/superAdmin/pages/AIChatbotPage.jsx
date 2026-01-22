import React, { useState, useRef, useEffect } from 'react';

const AIChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(0);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestionDatabase = [
    "What's the average performance across all schools?",
    "What are the top performing schools this semester?",
    "What trends do you see in student performance?",
    "What's the attendance rate for each school?",
    "What subjects need the most improvement?",
    "Show me the top 5 performing schools",
    "Analyze student demographics by school",
    "Generate a comprehensive performance report",
  ];

  const starterSuggestions = [
    { text: "Analyze school performance", icon: "📊", color: "blue" },
    { text: "Compare top schools", icon: "🏆", color: "orange" },
    { text: "Show attendance patterns", icon: "📅", color: "green" },
    { text: "Generate quarterly report", icon: "📄", color: "purple" },
  ];

  const [threads] = useState([
    { id: 1, title: 'School Performance Analysis', date: 'Today' },
    { id: 2, title: 'Student Attendance Trends', date: 'Yesterday' },
    { id: 3, title: 'Regional Comparison', date: '2 days ago' },
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
      const filtered = suggestionDatabase.filter(s =>
        s.toLowerCase().includes(value.toLowerCase())
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
        setSelectedSuggestionIndex((prev) => prev < suggestions.length - 1 ? prev + 1 : prev);
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

    const newMessage = { sender: 'user', text: input, timestamp: new Date() };
    setMessages([...messages, newMessage]);
    setInput('');
    setShowSuggestions(false);
    setIsTyping(true);

    setTimeout(() => {
      const aiResponse = {
        sender: 'ai',
        text: `Based on your query about "${input}", I've analyzed the school data:\n\n**Key Findings:**\n• Average performance increased by 12.5% this quarter\n• Top 3 schools: Greenwood High, Sunnydale Academy, Riverside School\n• Strongest improvement: Mathematics (+15%), Science (+18%)\n\n**Recommendations:**\n1. Continue focus on STEM programs\n2. Implement peer tutoring in underperforming areas\n3. Monitor attendance patterns for correlation\n\nWould you like me to generate a detailed report?`,
        timestamp: new Date()
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleNewChat = () => {
    setMessages([]);
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex h-[calc(100vh-8rem)] gap-6">
      {/* Sidebar */}
      <div className="w-64 flex-shrink-0 flex flex-col">
        <div className="bg-white rounded-xl border border-slate-200 flex-1 flex flex-col overflow-hidden">
          {/* New Chat Button */}
          <div className="p-4 border-b border-slate-200">
            <button
              onClick={handleNewChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-[#ea580c] hover:bg-[#c2410c] text-white rounded-lg transition-colors font-medium text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Chat
            </button>
          </div>

          {/* Chat History */}
          <div className="flex-1 overflow-y-auto p-3">
            <p className="text-xs font-semibold text-slate-500 uppercase px-2 mb-2">Recent Chats</p>
            {threads.map((thread) => (
              <button
                key={thread.id}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm transition-colors mb-1 hover:bg-slate-100"
              >
                <p className="font-medium text-slate-700 truncate">{thread.title}</p>
                <p className="text-xs text-slate-500 mt-0.5">{thread.date}</p>
              </button>
            ))}
          </div>

          {/* Status */}
          <div className="p-4 border-t border-slate-200">
            <div className="flex items-center gap-2 text-xs text-slate-600">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span className="font-medium">AI Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white rounded-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-[#ea580c] flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-800">AI Assistant</h1>
            <p className="text-sm text-slate-500">Ask about school performance and analytics</p>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-2xl bg-orange-100 flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-[#ea580c]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-slate-800 mb-2">How can I help you?</h2>
              <p className="text-slate-500 text-sm mb-6">Ask me anything about school performance and analytics</p>

              <div className="grid grid-cols-2 gap-3 max-w-md">
                {starterSuggestions.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => handleStarterClick(item.text)}
                    className="text-left px-4 py-3 bg-white border border-slate-200 rounded-xl hover:border-blue-300 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{item.icon}</span>
                      <span className="text-sm text-slate-700 font-medium">{item.text}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 max-w-3xl mx-auto">
              {messages.map((msg, index) => (
                <div key={index} className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.sender === 'ai' && (
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                  )}

                  <div className={`max-w-xl ${msg.sender === 'user' ? 'order-first' : ''}`}>
                    <div className={`rounded-xl px-4 py-3 ${msg.sender === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-white border border-slate-200 text-slate-800'
                      }`}>
                      <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
                    </div>
                    <p className="text-xs text-slate-500 mt-1.5">{formatTime(msg.timestamp)}</p>
                  </div>

                  {msg.sender === 'user' && (
                    <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="bg-white border border-slate-200 rounded-xl px-4 py-3">
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

        {/* Input Area */}
        <div className="p-4 border-t border-slate-200 bg-white">
          <div className="relative max-w-3xl mx-auto">
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => selectSuggestion(suggestion)}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors border-b border-slate-100 last:border-0 ${index === selectedSuggestionIndex ? 'bg-blue-50 text-blue-700' : 'hover:bg-slate-50 text-slate-700'
                      }`}
                  >
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <span className="truncate">{suggestion}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all">
              <textarea
                ref={inputRef}
                rows={1}
                className="flex-1 bg-transparent text-slate-800 placeholder-slate-400 resize-none outline-none text-sm px-2 py-2"
                placeholder="Ask me anything..."
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                style={{ minHeight: '40px', maxHeight: '120px' }}
              />
              <button
                onClick={handleSendMessage}
                disabled={!input.trim()}
                className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all ${input.trim()
                  ? 'bg-[#ea580c] hover:bg-[#c2410c] text-white'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPage;

import React, { useState } from 'react';

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { type: 'ai', text: 'Hello! I\'m your AI assistant. How can I help you today?' },
    { type: 'user', text: 'Hello!' },
    { type: 'ai', text: 'Hi there! I can help you with your attendance, grades, assignments, and more. What would you like to know?' },
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      setMessages([...messages, { type: 'user', text: inputValue }]);
      setInputValue('');
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'ai', text: 'I\'m processing your request...' }]);
      }, 500);
    }
  };

  const handlePromptClick = (prompt) => {
    setInputValue(prompt);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#ff7300] to-[#9000ff] px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">AI Assistant</h3>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <p className="text-white/90 text-sm">Online & Ready to Help</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 bg-gradient-to-b from-gray-50 to-white space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex gap-3 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'user' 
                  ? 'bg-gradient-to-br from-[#ff7300] to-[#9000ff]' 
                  : 'bg-gradient-to-br from-[#9000ff] to-[#ff7300]'
              }`}>
                {message.type === 'user' ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>

              {/* Message Bubble */}
              <div className={`rounded-2xl px-4 py-3 ${
                message.type === 'user'
                  ? 'bg-gradient-to-br from-[#ff7300] to-[#9000ff] text-white'
                  : 'bg-white border border-gray-200 text-gray-800'
              }`}>
                <p className="text-sm leading-relaxed">{message.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested Prompts */}
      <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200">
        <h4 className="text-sm font-semibold text-[#827979] mb-3 flex items-center">
          <svg className="w-4 h-4 text-[#ff7300] mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Quick Actions
        </h4>
        <div className="flex flex-wrap gap-2">
          <button 
            onClick={() => handlePromptClick("What's my attendance?")}
            className="px-4 py-2 bg-gradient-to-r from-[#ff7300]/10 to-[#ff7300]/5 text-[#ff7300] border border-[#ff7300]/20 rounded-full text-xs font-semibold hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            📊 What's my attendance?
          </button>
          <button 
            onClick={() => handlePromptClick("Summarize my performance")}
            className="px-4 py-2 bg-gradient-to-r from-[#9000ff]/10 to-[#9000ff]/5 text-[#9000ff] border border-[#9000ff]/20 rounded-full text-xs font-semibold hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            📈 Summarize my performance
          </button>
          <button 
            onClick={() => handlePromptClick("When is my next assignment due?")}
            className="px-4 py-2 bg-gradient-to-r from-[#827979]/10 to-[#827979]/5 text-[#827979] border border-[#827979]/20 rounded-full text-xs font-semibold hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            📅 Next assignment due?
          </button>
          <button 
            onClick={() => handlePromptClick("Show my recent grades")}
            className="px-4 py-2 bg-gradient-to-r from-[#ff7300]/10 to-[#9000ff]/5 text-[#ff7300] border border-[#ff7300]/20 rounded-full text-xs font-semibold hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
          >
            🎓 Show recent grades
          </button>
        </div>
      </div>

      {/* Input Area */}
      <div className="p-6 bg-white border-t border-gray-200">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-200 bg-gray-50 text-gray-800 placeholder:text-[#827979]/50 focus:outline-none focus:ring-2 focus:ring-[#ff7300]/50 focus:border-[#ff7300] focus:bg-white transition-all duration-200"
            />
            <button 
              onClick={() => setInputValue('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#827979] hover:text-[#ff7300] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <button 
            onClick={handleSend}
            className="px-6 py-3 bg-gradient-to-r from-[#ff7300] to-[#9000ff] text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <span>Send</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
        <p className="text-xs text-[#827979] mt-3 flex items-center gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Press Enter to send or click a quick action above
        </p>
      </div>
    </div>
  );
};

export default AIChatbot;

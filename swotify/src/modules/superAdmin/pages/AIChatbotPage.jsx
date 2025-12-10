import React, { useState } from 'react';

const AIChatbotPage = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [searchMode, setSearchMode] = useState('simple');

  const handleSendMessage = async () => {
    if (input.trim() === '') return;

    const newMessage = { sender: 'user', text: input };
    setMessages([...messages, newMessage]);
    setInput('');

    // Placeholder for AI response logic
    // In a real application, you would send 'input' to a backend AI service
    // and then update 'messages' with the AI's response.
    const aiResponse = { 
      sender: 'ai', 
      text: `[${searchMode === 'deep' ? 'Deep Search' : 'Simple Mode'}] Analyzing schools based on "${input}"... (This is a placeholder response)` 
    };
    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, aiResponse]);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#0F172A] mb-1">AI School Analysis Chatbot</h1>
            <p className="text-[#64748B] text-sm">
              Engage with our AI to get insights and analysis on school performance.
            </p>
          </div>
          
          {/* Mode Toggle */}
          <div className="bg-gray-100 p-1 rounded-lg flex items-center">
             <button
              onClick={() => setSearchMode('simple')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                searchMode === 'simple' 
                  ? 'bg-white text-[#0EA5E9] shadow-sm' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Simple
            </button>
            <button
              onClick={() => setSearchMode('deep')}
              className={`px-4 py-2 rounded-md text-sm font-semibold transition-all ${
                searchMode === 'deep' 
                  ? 'bg-white text-[#0EA5E9] shadow-sm' 
                  : 'text-[#64748B] hover:text-[#0F172A]'
              }`}
            >
              Deep Search
            </button>
          </div>
        </div>

        <div className="border border-gray-200 rounded-xl p-4 h-96 overflow-y-auto mb-4 custom-scrollbar">
          {messages.length === 0 ? (
            <p className="text-center text-[#64748B]">Type a message to start the analysis...</p>
          ) : (
            messages.map((msg, index) => (
              <div key={index} className={`mb-2 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${
                  msg.sender === 'user' ? 'bg-[#0EA5E9] text-white' : 'bg-gray-200 text-[#0F172A]'
                }`}>
                  {msg.text}
                </span>
              </div>
            ))
          )}
        </div>

        <div className="flex">
          <input
            type="text"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-l-xl focus:outline-none focus:ring-2 focus:ring-[#0EA5E9]/50"
            placeholder="Ask about school analysis..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
          />
          <button
            onClick={handleSendMessage}
            className="px-6 py-2 bg-gradient-to-r from-[#0EA5E9] to-[#22C55E] text-white rounded-r-xl font-semibold hover:from-[#22C55E] hover:to-[#0EA5E9] transition-all duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbotPage;

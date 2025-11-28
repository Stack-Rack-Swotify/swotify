// swotify/src/modules/student/components/AIChatbot.jsx
import React from 'react';

const AIChatbot = () => {
  return (
    <div className="p-4 bg-teal-900 rounded-xl shadow-lg h-full flex flex-col">
      <h3 className="text-2xl font-bold text-gray-100 mb-4">AI Chatbot</h3>
      <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg bg-white p-4 mb-4 transform hover:scale-105 transition-transform duration-300">
        {/* Placeholder for chat messages */}
        <p className="text-gray-600">AI Chatbot conversation will appear here.</p>
        <p className="text-gray-500 text-sm mt-2">... (previous messages)</p>
        <p className="text-cyan-600 mt-2">You: Hello!</p>
        <p className="text-emerald-600">AI: Hi there! How can I help you today?</p>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-l-lg border border-teal-700 bg-teal-900 text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        <button className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-teal-600 text-white font-semibold rounded-r-lg hover:from-cyan-700 hover:to-teal-700">
          Send
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="mt-6">
        <h4 className="text-lg font-bold text-gray-100 mb-3">Suggested Prompts</h4>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 bg-sky-700/50 text-sky-100 rounded-full text-sm transform hover:scale-105 hover:bg-sky-600/50 transition-all duration-200">
            What's my attendance?
          </button>
          <button className="px-3 py-1 bg-emerald-700/50 text-emerald-100 rounded-full text-sm transform hover:scale-105 hover:bg-emerald-600/50 transition-all duration-200">
            Summarize my performance
          </button>
          <button className="px-3 py-1 bg-amber-700/50 text-amber-100 rounded-full text-sm transform hover:scale-105 hover:bg-amber-600/50 transition-all duration-200">
            When is my next assignment due?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;

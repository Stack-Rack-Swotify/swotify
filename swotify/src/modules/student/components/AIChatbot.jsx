// swotify/src/modules/student/components/AIChatbot.jsx
import React from 'react';

const AIChatbot = () => {
  return (
    <div className="p-4 bg-black/20 backdrop-blur-lg rounded-xl shadow-lg h-full flex flex-col">
      <h3 className="text-2xl font-bold text-white mb-4">AI Chatbot</h3>
      <div className="flex-1 overflow-y-auto border border-gray-700 rounded-lg bg-gray-800 p-4 mb-4">
        {/* Placeholder for chat messages */}
        <p className="text-gray-300">AI Chatbot conversation will appear here.</p>
        <p className="text-gray-400 text-sm mt-2">... (previous messages)</p>
        <p className="text-blue-400 mt-2">You: Hello!</p>
        <p className="text-green-400">AI: Hi there! How can I help you today?</p>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-700 bg-gray-900 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700">
          Send
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="mt-6">
        <h4 className="text-lg font-bold text-white mb-3">Suggested Prompts</h4>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 bg-blue-800/50 text-blue-100 rounded-full text-sm transform hover:scale-105 hover:bg-blue-700/50 transition-all duration-200">
            What's my attendance?
          </button>
          <button className="px-3 py-1 bg-green-800/50 text-green-100 rounded-full text-sm transform hover:scale-105 hover:bg-green-700/50 transition-all duration-200">
            Summarize my performance
          </button>
          <button className="px-3 py-1 bg-purple-800/50 text-purple-100 rounded-full text-sm transform hover:scale-105 hover:bg-purple-700/50 transition-all duration-200">
            When is my next assignment due?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;

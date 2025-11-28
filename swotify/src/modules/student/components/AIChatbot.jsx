// swotify/src/modules/student/components/AIChatbot.jsx
import React from 'react';

const AIChatbot = () => {
  return (
    <div className="p-4 bg-white rounded-xl shadow-lg h-full flex flex-col">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">AI Chatbot</h3>
      <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg bg-gray-50 p-4 mb-4">
        {/* Placeholder for chat messages */}
        <p className="text-gray-600">AI Chatbot conversation will appear here.</p>
        <p className="text-gray-500 text-sm mt-2">... (previous messages)</p>
        <p className="text-blue-600 mt-2">You: Hello!</p>
        <p className="text-green-600">AI: Hi there! How can I help you today?</p>
      </div>
      <div className="flex">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-r-lg hover:bg-blue-700">
          Send
        </button>
      </div>

      {/* Suggested Prompts */}
      <div className="mt-6">
        <h4 className="text-lg font-bold text-gray-800 mb-3">Suggested Prompts</h4>
        <div className="flex flex-wrap gap-2">
          <button className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm transform hover:scale-105 hover:bg-blue-200 transition-all duration-200">
            What's my attendance?
          </button>
          <button className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm transform hover:scale-105 hover:bg-green-200 transition-all duration-200">
            Summarize my performance
          </button>
          <button className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm transform hover:scale-105 hover:bg-yellow-200 transition-all duration-200">
            When is my next assignment due?
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChatbot;

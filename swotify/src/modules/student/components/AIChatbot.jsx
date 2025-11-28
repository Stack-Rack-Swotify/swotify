// swotify/src/modules/student/components/AIChatbot.jsx
import React from 'react';

const AIChatbot = () => {
  return (
    <div className="p-4 bg-teal-900 rounded-xl shadow-lg h-full flex flex-col">
      <h3 className="text-2xl font-bold text-gray-100 mb-4">AI Chatbot</h3>
      <div className="flex-1 overflow-y-auto border border-gray-200 rounded-lg bg-white p-4 mb-4">
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
    </div>
  );
};

export default AIChatbot;

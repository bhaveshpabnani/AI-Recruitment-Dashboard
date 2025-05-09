import React from 'react';
import Chatbot from '@/components/chatbot/Chatbot';

const ChatbotPage = () => {
  return (
    <div className="animate-fade-in h-[calc(100vh-120px)]">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">AI Recruitment Assistant</h1>
        <div className="text-gray-400 text-sm">
          Powered by voice & text capabilities
        </div>
      </div>
      <div className="bg-black/20 border border-white/10 rounded-lg overflow-hidden h-[calc(100vh-200px)]">
        <Chatbot />
      </div>
    </div>
  );
};

export default ChatbotPage;

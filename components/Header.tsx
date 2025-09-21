
import React from 'react';

const BotIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8V4H8" />
        <rect x="4" y="12" width="16" height="8" rx="2" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="M12 12v-2" />
        <path d="M12 12a4 4 0 0 0-4 4" />
        <circle cx="12" cy="12" r="2" />
    </svg>
);

interface HeaderProps {
    onNewChat: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNewChat }) => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 p-4 flex-shrink-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BotIcon />
          <h1 className="text-xl font-bold tracking-wider bg-gradient-to-r from-indigo-400 to-cyan-400 text-transparent bg-clip-text">
            Hasith Chatbot
          </h1>
        </div>
        <button 
          onClick={onNewChat} 
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors"
          aria-label="Start new chat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          New Chat
        </button>
      </div>
    </header>
  );
};

export default Header;

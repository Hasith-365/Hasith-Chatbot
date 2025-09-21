
import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  isLoading: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, isLoading }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      onSendMessage(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Type your message..."
        disabled={isLoading}
        className="w-full bg-gray-800 border border-gray-700 rounded-full py-3 pl-5 pr-14 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-shadow duration-200"
        autoComplete="off"
      />
      <button
        type="submit"
        disabled={isLoading || !inputValue.trim()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-indigo-600 text-white disabled:bg-gray-600 disabled:cursor-not-allowed hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors duration-200"
        aria-label="Send message"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
            transform="rotate(90 12 12)"
          />
        </svg>
      </button>
    </form>
  );
};

export default ChatInput;

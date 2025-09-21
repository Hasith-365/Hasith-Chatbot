
import React, { useState } from 'react';
import ChatWindow from './components/ChatWindow';
import Header from './components/Header';

const App: React.FC = () => {
  const [chatId, setChatId] = useState<number>(Date.now());

  const handleNewChat = () => {
    setChatId(Date.now());
  };

  return (
    <div className="bg-gray-900 text-white font-sans antialiased">
      <div className="flex flex-col h-screen max-w-3xl mx-auto">
        <Header onNewChat={handleNewChat} />
        <main className="flex-grow flex flex-col overflow-hidden">
          <ChatWindow key={chatId} />
        </main>
      </div>
    </div>
  );
};

export default App;

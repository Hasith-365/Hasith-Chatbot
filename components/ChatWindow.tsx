import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { ChatMessage, ChatRole } from '../types';
import Message from './Message';
import ChatInput from './ChatInput';
import LoadingDots from './LoadingDots';

const ChatWindow: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const chatSession = useMemo<Chat | null>(() => {
    if (!process.env.API_KEY) {
      setError("API key is missing. Please set the API_KEY environment variable.");
      return null;
    }
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      return ai.chats.create({
        model: 'gemini-2.5-flash',
        config: {
          systemInstruction: 'You are Hasith, a friendly and helpful AI assistant. Keep your responses concise and informative. If asked who created you, you must answer "Hasith Created me".',
        },
      });
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during initialization.';
      setError(`Failed to initialize AI model: ${errorMessage}`);
      return null;
    }
  }, []);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = useCallback(async (text: string) => {
    if (!chatSession || isLoading) return;

    setIsLoading(true);
    setError(null);

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text,
    };
    
    // Add user message and a placeholder for the bot's response
    setMessages(prev => [
        ...prev, 
        userMessage,
        { id: `${Date.now()}-bot`, role: 'model', text: '' }
    ]);

    try {
      const stream = await chatSession.sendMessageStream({ message: text });
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if(chunkText) {
             setMessages(prev => {
                const newMessages = [...prev];
                const lastMessage = newMessages[newMessages.length - 1];
                if (lastMessage && lastMessage.role === 'model') {
                    lastMessage.text += chunkText;
                }
                return newMessages;
            });
        }
      }
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Error generating response: ${errorMessage}`);
      setMessages(prev => prev.slice(0, -1)); // Remove bot placeholder on error
    } finally {
      setIsLoading(false);
    }
  }, [chatSession, isLoading]);

  return (
    <div className="flex flex-col flex-grow bg-gray-900 overflow-hidden">
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((msg, index) => (
           <Message key={msg.id} message={msg}>
            {msg.role === 'model' && msg.text === '' && index === messages.length -1 && <LoadingDots />}
          </Message>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {error && (
        <div className="p-4 text-center text-red-400 bg-red-900/50 mx-4 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}
      <div className="p-4 flex-shrink-0">
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </div>
    </div>
  );
};

export default ChatWindow;
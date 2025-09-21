
import React from 'react';
import { ChatMessage } from '../types';
import { marked } from 'marked';

interface MessageProps {
  message: ChatMessage;
  children?: React.ReactNode;
}

const UserAvatar: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center font-bold text-white flex-shrink-0">
        U
    </div>
);

const BotAvatar: React.FC = () => (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
    </div>
);


const Message: React.FC<MessageProps> = ({ message, children }) => {
  const isUser = message.role === 'user';
  
  const alignClass = isUser ? 'justify-end' : 'justify-start';
  const bubbleColor = isUser ? 'bg-indigo-600' : 'bg-gray-700';

  const createMarkup = (text: string) => {
    // Basic markdown support for links, bold, italics, etc.
    const rawMarkup = marked.parse(text, { breaks: true, gfm: true });
    return { __html: rawMarkup as string };
  };

  return (
    <div className={`flex items-start gap-3 ${alignClass}`}>
      {!isUser && <BotAvatar />}
      <div className={`max-w-md lg:max-w-xl px-4 py-3 rounded-2xl ${bubbleColor}`}>
        {message.text ? (
             <div className="prose prose-invert prose-sm" dangerouslySetInnerHTML={createMarkup(message.text)} />
        ) : (
            children
        )}
      </div>
       {isUser && <UserAvatar />}
    </div>
  );
};

export default Message;

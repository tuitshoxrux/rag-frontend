import React from 'react';
import type { Message } from '../types';
import { SourceCard } from './SourceCard';
import { User, Bot } from 'lucide-react';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="space-y-6">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
        >
          {message.type === 'assistant' && (
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Bot className="w-5 h-5 text-blue-600" />
            </div>
          )}

          <div className={`flex-1 max-w-[80%] ${message.type === 'user' ? 'text-right' : ''}`}>
            <div
              className={`inline-block p-4 rounded-lg ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-wrap">{message.content}</p>
            </div>

            {message.sources && message.sources.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-xs text-gray-500 font-semibold">Sources:</p>
                {message.sources.map((source, idx) => (
                  <SourceCard key={idx} source={source} index={idx} />
                ))}
              </div>
            )}

            <p className="text-xs text-gray-400 mt-1">
              {message.timestamp.toLocaleTimeString()}
            </p>
          </div>

          {message.type === 'user' && (
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
import React from 'react';import {AnimatePresence} from 'framer-motion';
import { Balloon } from '../Balloon/Baloon';


interface Message {
  sender: 'user' | 'system';
  text: string;
  imageUrls?: string[];
}
interface ChatContainerProps {
  messages: Message[];
}

export const Chat: React.FC<ChatContainerProps> = ({messages}) => {
  return (
    <div className='flex flex-col gap-3 p-4 overflow-y-auto'>
      <AnimatePresence>
        {messages.map((msg, idx) => (
          <Balloon
            key={idx}
            message={msg.text}
            isUser={msg.sender === 'user'}
            imageUrls={msg.imageUrls}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

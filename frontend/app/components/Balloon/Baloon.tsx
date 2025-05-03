'use client';import React from 'react';import {motion} from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import ImageModal from '../ImageModal/ImageModal'; // importe o modal

interface BalloonProps {
  message: string;
  isUser: boolean;
  imageUrls?: string[];
}

export const Balloon: React.FC<BalloonProps> = ({
  message,
  isUser,
  imageUrls,
}) => {
  const baseClasses = 'rounded-lg p-4 max-w-[80%] break-words';
  const userClasses = 'bg-gray-100 text-black self-end';
  const systemClasses = 'bg-[#F3A463] text-black self-start';

  const uniqueUrls = imageUrls ? Array.from(new Set(imageUrls)) : [];

  return (
    <motion.div
      initial={{opacity: 0, y: 20}}
      animate={{opacity: 1, y: 0}}
      exit={{opacity: 0, y: 20}}
      className={`${baseClasses} ${isUser ? userClasses : systemClasses}`}
    >
      <ReactMarkdown>{message}</ReactMarkdown>

      {!isUser && uniqueUrls.length > 0 && (
        <div className='mt-2 flex flex-wrap gap-2'>
          {uniqueUrls.map((url, idx) => (
            <ImageModal
              key={idx}
              src={url}
              alt={`Imagem ${idx + 1}`}
              width='300px'
              height='300px'
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

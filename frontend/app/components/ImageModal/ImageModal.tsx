'use client';
import React, {useState} from 'react';

interface ImageModalProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
}

const ImageModal = ({
  src,
  alt,
  width = '400px',
  height = '400px',
}: ImageModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleImageClick = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleOutsideClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div>
      {/* Thumbnail */}
      <img
        src={src}
        alt={alt}
        className='cursor-pointer rounded'
        style={{width, height}}
        onClick={(e) => {
          e.stopPropagation();
          handleImageClick();
        }}
      />

      {isOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50'
          onClick={handleOutsideClick}
        >
          <div className='relative'>
            {/* ↓ limites diretamente na img */}
            <img
              src={src}
              alt={alt}
              className='object-contain rounded max-w-[90vw] max-h-[90vh]'
            />

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleClose();
              }}
              className='absolute top-2 right-2 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75'
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageModal;

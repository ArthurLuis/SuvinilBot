import React from 'react';import Image from 'next/image';const TopBar = () => {
  return (
    <div className='flex bg-white w-full h-20 shadow-md fixed top-0 left-0 items-center justify-between z-50 px-4'>
      <div className='flex items-center'>
        <Image
          src='/images/suvinil-logo.png'
          alt='Suvinil Logo'
          width={120} 
          height={40} 
          priority 
          className='cursor-pointer'
          onClick={() => window.location.reload()}
        />
      </div>
      <div className='flex items-center justify-center'>
        <div className='text-xs uppercase font-semibold text-gray-800 tracking-wider'>
          powered by
        </div>
        <Image
          src='/images/loomi.png'
          alt='Loomi Logo'
          width={100} 
          height={40} 
          priority 
        />
      </div>
    </div>
  );
};

export default TopBar;

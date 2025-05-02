'use client';import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../../public/images/loading.json'; // ajuste o caminho

interface LoadingProps {
  isLoading: boolean;
  className?: string;
  size?: number;
}

const Loading = ({isLoading, className = '', size = 100}: LoadingProps) => {
  if (!isLoading) return null;

  return (
    <div
      className={`inline-block ${className}`}
      style={{width: size, height: size}}
    >
      <Lottie
        animationData={loadingAnimation}
        loop
        autoplay
        style={{width: '100%', height: '100%'}}
      />
    </div>
  );
};

export default Loading;

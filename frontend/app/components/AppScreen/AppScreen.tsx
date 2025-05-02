'use client';
import React from 'react';
import TopBar from '../TopBar/TopBar';

interface AppScreenProps {
  children: React.ReactNode;
}

const AppScreen: React.FC<AppScreenProps> = ({children}) => {
  return (
    <>
      <TopBar />
      <div
        className={`
          mt-20
        `}
      >
        {children}
      </div>
    </>
  );
};

export default AppScreen;

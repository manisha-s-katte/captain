'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import PreviousPage from '@/components/events/previous/PreviousPage';

const previous = () => {
  return (
    <main className="bg-gradient-to-tr from-[#35044D] to-[#1A0226] min-h-screen">
      <Navbar bgColor="transparent" />
      <PreviousPage />
    </main>
  );
};

export default previous;

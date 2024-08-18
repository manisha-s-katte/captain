"use client";
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import CustomDropdown from './CustomDropdown'; // Adjust the import path as needed
import EventDetails from './AppCard';

const UpcomingPage = () => {
  const [selectedSort, setSelectedSort] = useState('Short');

  return (
    <main className="min-h-screen">
      <section className="block mt-8 pb-8 mx-16">
        <h1 className="text-2xl font-semibold mb-4">Previous Events & Tournaments</h1>
        
        <div className="flex items-center justify-between mb-6">
          {/* Left: Sort Options */}
          <div className="flex items-center space-x-4">
            <CustomDropdown
              options={['Short', 'Long']}
              selected={selectedSort}
              onSelect={(option) => setSelectedSort(option)}
            />
          </div>

          {/* Right: Search Bar */}
          <div className="flex border-b-3 pb-3 border-[#D600E1] items-center space-x-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="p-2 bg-transparent text-white outline-none" 
            />
            <button className="text-white">
              <CiSearch className='w-6 h-6' />
            </button>
          </div>
        </div>
        
        {/* Content Area */}
        <EventDetails />
        <EventDetails />
        <EventDetails />
      </section>
    </main>
  );
};

export default UpcomingPage;

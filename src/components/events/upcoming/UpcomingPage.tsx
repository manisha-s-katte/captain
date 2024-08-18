"use client";
import React, { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import CustomDropdown from './CustomDropdown'; // Adjust the import path as needed
import EventDetails from './AppCard'; // Adjust the import path as needed

const UpcomingPage = () => {
  const [selectedSort, setSelectedSort] = useState('Short');

  return (
    <main className="min-h-screen">
      <section className="block mt-8 pb-8 mx-4 sm:mx-8 lg:mx-16">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-center">{/* Center the heading */}Previous Events & Tournaments</h1>
        
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
          {/* Left: Sort Options */}
          <div className="flex items-center space-x-4">
            <CustomDropdown
              options={['Short', 'Long']}
              selected={selectedSort}
              onSelect={(option) => setSelectedSort(option)}
            />
          </div>

          {/* Right: Search Bar */}
          <div className="flex border-b-2 sm:border-b-3 pb-2 sm:pb-3 border-[#D600E1] items-center space-x-4">
            <input 
              type="text" 
              placeholder="Search..." 
              className="p-2 bg-transparent text-white outline-none text-sm sm:text-base" 
            />
            <button className="text-white">
              <CiSearch className='w-5 h-5 sm:w-6 sm:h-6' />
            </button>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="space-y-8">
          <EventDetails />
          <EventDetails />
          <EventDetails />
        </div>
      </section>
    </main>
  );
};

export default UpcomingPage;

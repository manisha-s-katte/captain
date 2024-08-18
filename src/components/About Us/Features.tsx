import React from 'react';
import { IoCheckmark } from 'react-icons/io5';

const Features = () => {
  const values1 = [
    'Innovation',
    'Community',
    'Integrity',
    'Collaboration',
  ];

  const values2 = [
    'Passion',
    'Diversity',
    'Transparency',
    'Fairness'
  ];

  return (
    <main className='bg-[#3C0056] min-h-auto py-16 flex flex-col items-center'>
      <h1 className='text-center text-4xl font-semibold mb-2'>
        Revolutionizing gaming <br/>around the globe
      </h1>
      <p className='text-base text-center text-gray-400 my-5'>
        values we offer
      </p>
      <div className='space-y-6'>
      <div className='flex flex-wrap justify-center gap-28'>
        {values1.map((value, index) => (
          <div key={index} className='flex items-center'>
            <IoCheckmark className='text-yellow-500 w-6 h-6 mr-1' />
            <p className='text-white text-base'>{value}</p>
          </div>
        ))}
      </div>
      <div className='flex flex-wrap justify-center gap-24'>
        {values2.map((value, index) => (
          <div key={index} className='flex items-center'>
            <IoCheckmark className='text-yellow-500 w-6 h-6 mr-1' />
            <p className='text-white text-base'>{value}</p>
          </div>
        ))}
      </div>
      </div>
      
    </main>
  );
};

export default Features;

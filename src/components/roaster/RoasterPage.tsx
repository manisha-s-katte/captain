import React from 'react';
import RoasterCard from './RoasterCard';

const RoasterPage: React.FC = () => {
  return (
    <main className='mt-16 mx-32'>
      <h1 className='font-semibold view_all text-7xl tracking-tighter'>
        Our Roaster
      </h1>
      <section className='space-y-20'>
      <RoasterCard />
      <RoasterCard />
      <RoasterCard />
      </section>
      
      </main>
  );
};

export default RoasterPage;

import React from 'react';
import Navbar from '@/components/landing/Navbar';
import Features from '@/components/About Us/Features';
import Message from '@/components/About Us/Message';
import Partners from '@/components/About Us/Partners';
import Team from '@/components/About Us/Team';
import Achievement from '@/components/About Us/Achivement';
import Subscribe from '@/components/About Us/Subscribe';
import AboutUsFooter from '@/components/About Us/AboutUsFooter';
import Footer from '@/components/landing/Footer';

const AboutUs = () => {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Features />
      <Message />
      <Partners />
      <Team />
      <Achievement />
      <Subscribe />
      <Footer />
    </main>
  );
};

export default AboutUs;

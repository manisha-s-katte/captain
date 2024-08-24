import React from 'react';
import { IoStar } from "react-icons/io5";

const Achievement: React.FC = () => {
  return (
    <div className="bg-[#110219] py-32 px-4">
      <h1 className="text-3xl font-bold text-center text-white mb-24">Some of Our Past Achievements</h1>
      <div className="flex flex-col md:flex-row items-center justify-center gap-16">
        {/* Left Icon and Text */}
        <div className="flex flex-col items-center text-center max-w-md">
          <IoStar  className="text-[#FCCC4C] w-32 h-32 mb-4" />
          <p className="text-sm font-medium text-white">
            Held a variety of gaming tournaments for Mobile and PC with more than 1000 players onboarded.
          </p>
        </div>
        
        {/* Right Icon and Text */}
        <div className="flex flex-col items-center text-center max-w-md">
          <IoStar  className="text-[#FCCC4C] w-32 h-32 mb-4" />
          <p className="text-sm font-medium text-white">
            Making Educational Content around Web3, NFT, Blockchain.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Achievement;

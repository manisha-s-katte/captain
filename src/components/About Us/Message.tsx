/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from 'next/image';
import { IconType } from 'react-icons';
import { PiDiamondsFour } from "react-icons/pi";
import { BsRocket } from 'react-icons/bs';
import { FaRegEye } from 'react-icons/fa';
import MessageImg from '@/assets/Images/AboutUs/Team/Sumit.webp';

interface InfoBlockProps {
  icon: IconType;
  heading: string;
  text: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({ icon: Icon, heading, text }) => (
  <div className="flex flex-col max-w-[20rem] mx-4"> {/* Ensure responsiveness */}
    <Icon className="text-yellow-500 w-8 h-8 mb-6" />
    <div>
      <h2 className="text-white text-xl font-semibold mb-1">{heading}</h2>
      <p className="text-gray-400 text-sm font-medium">{text}</p>
    </div>
  </div>
);

const Message: React.FC = () => {
  return (
    <div className="bg-gradient-to-tr from-[#3C0056] to-[#14021D] py-10 flex flex-col items-center">
      <div className="flex flex-col md:flex-row items-center justify-center mt-20 mb-12 w-full max-w-5xl px-4">
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <Image
            src={MessageImg}
            alt="Logo"
            width={350}
            height={350}
            quality={100}
            className="mr-6"
          />
        </div>
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-3xl font-bold text-[#FCCC4C] mb-2">Message</h1>
          <p className="text-gray-300 text-base">
            At Captain Side, we believe in the power of community where gamers and developers come together to create something greater. We're here to support every gamer, every innovator, and together, we'll build a future where the gaming world thrives for all.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12 items-start w-full max-w-5xl px-4">
        <InfoBlock
          icon={BsRocket}
          heading="Mission"
          text="To create a thriving community where gamers and developers connect, collaborate, and earn together."
        />
        <InfoBlock
          icon={FaRegEye}
          heading="Vision"
          text="Empower the global gaming ecosystem, fostering growth and opportunities for developers and players alike."
        />
        <InfoBlock
          icon={PiDiamondsFour}
          heading="Values"
          text="Innovation, inclusivity, collaboration, and mutual growth within the gaming industry."
        />
      </div>
    </div>
  );
};

export default Message;

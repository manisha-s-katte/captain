import React, { useState } from 'react';
import Image from 'next/image';

interface CharacterBoxProps {
  imageSrc: string;
  name: string;
  pickRate: string;
  percentage: string;
  isActive: boolean;
  onClick: () => void;
}

const CharacterBox: React.FC<CharacterBoxProps> = ({ imageSrc, name, pickRate, percentage, isActive, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ width: '150px' }}
      className={`flex flex-col items-center p-4 text-white border-1 border-[#D600E1] bg-opacity-20 bg-[#330B45] cursor-pointer ${isActive ? 'bg-[#D600E1] border-[#D600E1]' : 'bg-transparent'}`}
    >
      <Image
        src={imageSrc}
        alt={`${name} Image`}
        width={80}
        height={80}
        className="object-contain mb-4"
      />
      <span className="text-lg font-bold">{name}</span>
      <hr className="w-full border-[#D600E1] my-2" />
      <span className="text-sm text-[#D600E1]">{pickRate}</span>
      <span className="text-2xl font-bold">{percentage}</span>
    </div>
  );
};

export default CharacterBox;

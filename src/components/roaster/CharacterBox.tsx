import React from 'react';
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
      className={`flex flex-col items-center p-4 text-white border rounded-lg cursor-pointer ${isActive ? 'bg-[#D600E1] border-[#D600E1] border-opacity-60 bg-opacity-10' : 'bg-transparent border-[#D600E1]'}`}
      style={{ width: '150px' }}
    >
      <Image
        src={imageSrc}
        alt={`${name} Image`}
        width={80}
        height={80}
        className="object-contain mb-4"
      />
      <span className="text-lg font-bold text-center">{name}</span>
      <hr className="w-full border-[#D600E1] my-2" />
      <span className="text-sm text-[#D600E1] text-center">{pickRate}</span>
      <span className="text-2xl font-bold text-center">{percentage}</span>
    </div>
  );
};

export default CharacterBox;

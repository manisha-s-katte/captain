"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import RoasterImg from '@/assets/Images/Roaster/168a007c6f46d2caf6f657321265d9f2_optimized.png'
import CharacterBox from './CharacterBox';
import Character1 from "@/assets/Images/Roaster/Character/06898b0d93164f70eebedd201e206753.png"
import Character2 from "@/assets/Images/Roaster/Character/81460d9381a7e4797c197ae7a126b05d.png"
import Character3 from "@/assets/Images/Roaster/Character/fa3ecb70e21c924cfda48253d0e1a2a5.png"
import Character4 from "@/assets/Images/Roaster/Character/fb95c6ec73a39bc197b14ad5047dbaa0.png"


const RoasterCard: React.FC = () => {

  const [activeBox, setActiveBox] = useState<number | null>(null);

  const handleBoxClick = (index: number) => {
    setActiveBox(index === activeBox ? null : index);
  };

  const characters = [
    { imageSrc: Character1.src, name: 'Viper', pickRate: 'Pick Rate', percentage: '45%' },
    { imageSrc: Character2.src, name: 'Omen', pickRate: 'Pick Rate', percentage: '50%' },
    { imageSrc: Character3.src, name: 'Brim', pickRate: 'Pick Rate', percentage: '40%' },
    { imageSrc: Character4.src, name: 'Jett', pickRate: 'Pick Rate', percentage: '55%' },
  ];

  return (
    <main>

    
    <div className="flex justify-between items-center p-4 mx-14 text-white mb-7 rounded-lg">

      <div className="flex flex-col items-center text-center space-y-2">
        <span className="text-4xl font-bold uppercase">PLAYER 1</span>
        <div className='flex-col flex'>
        <span className="text-sm text-[#D600E1]">Full name</span>
        <span className="text-xl">Player 1 Name</span>
        </div>
        <div className='flex-col flex'>
        <span className="text-sm text-[#D600E1]">Nationality</span>
        <span className="text-xl">India</span>
        </div>
        
        <div className='flex-col flex'>
        <span className="text-sm text-[#D600E1]">Role</span>
        <span className="text-xl">IGL</span>
        </div>


        <div className='flex-col flex'>
         <span className="text-sm text-[#D600E1]">Age</span>
        <span className="text-xl">25</span>
        </div>
       
      </div>

      {/* Player Image */}
      <div className="relative flex-shrink-0">
        <div className="overflow-hidden">
        <Image
        src={RoasterImg.src}
        alt="Player Image"
        width={RoasterImg.width}
        height={RoasterImg.height}
        className="object-contain w-96 h-96"
        />
        </div>
      </div>

      {/* ACS Details */}
      <div className="flex flex-col items-end space-y-2">
        <div className="flex flex-col items-center">
          <span className="text-sm text-[#D600E1]">ACS</span>
          <span className="text-lg">200.2</span>
        </div>
        <hr className="w-full border-[#D600E1]" />
        <div className="flex flex-col items-center">
          <span className="text-sm text-[#D600E1]">ACS</span>
          <span className="text-lg">200.2</span>
        </div>
        <hr className="w-full border-[#D600E1]" />
        <div className="flex flex-col items-center">
          <span className="text-sm text-[#D600E1]">ACS</span>
          <span className="text-lg">200.2</span>
        </div>
        <hr className="w-full border-[#D600E1]" />
        <div className="flex flex-col items-center">
          <span className="text-sm text-[#D600E1]">ACS</span>
          <span className="text-lg">200.2</span>
        </div>
        <hr className="w-full border-[#D600E1]" />
        <div className="flex flex-col items-center">
          <span className="text-sm text-[#D600E1]">ACS</span>
          <span className="text-lg">200.2</span>
        </div>
      </div>

    </div>

<div className='flex justify-center'>
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 items-center justify-center p-4 mx-14">
{characters.map((character, index) => (
  <CharacterBox
    key={index}
    imageSrc={character.imageSrc}
    name={character.name}
    pickRate={character.pickRate}
    percentage={character.percentage}
    isActive={activeBox === index}
    onClick={() => handleBoxClick(index)}
  />
))}
</div>

</div>
</main>
  );
};

export default RoasterCard;

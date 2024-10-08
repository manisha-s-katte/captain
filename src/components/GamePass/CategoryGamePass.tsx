import React from 'react';
import Image from 'next/image';
import GamePassImg from '@/assets/Images/Game Pass/48a63b84590a8c0afc80caa2f4b21e76_optimized.png';

interface CategoryCardProps {
  title: string;
  imageSrc: string;
  text1: string;
  text2: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  imageSrc,
  text1,
  text2,
}) => {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <div className="pl-32">
        <div className="border-2 border-[#FF41B3] max-w-sm">
          <div className=" mb-2">
            <Image
              src={imageSrc}
              alt={title}
              width={100}
              height={100}
              className="w-full h-64 object-cover "
            />
          </div>
          <div className="flex flex-row p-2 px-4 justify-between">
            <p className="text-sm mb-2">{text1}</p>
            <button className="text-sm px-4 py-0.5 outline-none border-none font-semibold rounded-sm border-2 bg-[#D600E1] text-white transition-colors">
              {text2}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const CategoryGamePass: React.FC = () => {
  const cardData = [
    {
      title: 'Trending Game Passes',
      imageSrc: GamePassImg.src, // Replace with actual image paths
      text1: 'Fragger',
      text2: 'Explore',
    },
    {
      title: 'Highest Ranked',
      imageSrc: GamePassImg.src, // Replace with actual image paths
      text1: 'Fragger',
      text2: 'Explore',
    },
    {
      title: 'Top Free',
      imageSrc: GamePassImg.src, // Replace with actual image paths
      text1: 'Fragger',
      text2: 'Explore',
    },
  ];

  return (
    <div className="p-0 md:p-8 mx-4 md:mx-12 flex flex-col  min-h-screen  gap-8">
      {cardData.map((data, index) => (
        <CategoryCard
          key={index}
          title={data.title}
          imageSrc={data.imageSrc}
          text1={data.text1}
          text2={data.text2}
        />
      ))}
    </div>
  );
};

export default CategoryGamePass;

import React from 'react';
import Image from 'next/image';
import RoasterImg from "@/assets/Images/roaster2.png";

const Roaster = () => {
  return (
    <div className="bg-[#1A0226] flex flex-col lg:flex-row items-center p-8 pb-0 lg:space-x-8">
      <div className="w-full lg:w-1/2">
        <Image 
          src={RoasterImg} 
          alt="Roaster" 
          layout="responsive" 
          width={1000} 
          height={750}
          objectFit="contain" 
        />
      </div>
      <div className="mt-8 lg:mt-0 text-center lg:text-left text-white w-full lg:w-1/2">
        <h1 className="text-4xl lg:text-6xl view_all tracking-tighter font-medium mb-4">
          Our Roaster
        </h1>
        <p className='text-white text-base mb-4 px-4 lg:px-0'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestiae aperiam est quibusdam earum praesentium harum, accusamus quae sequi necessitatibus eveniet nobis.
        </p>
        <div className="flex justify-center lg:justify-start">
          <button className="relative view_all text-white pl-5 pr-9 py-3 text-[1.2em] font-semibold overflow-hidden">
            <div className="pentagon bg-yellow-500 absolute inset-0"></div>
            <span className="relative text-black z-10">Explore more</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Roaster;

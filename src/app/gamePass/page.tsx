'use client';
import React from 'react';
import Navbar from '@/components/landing/Navbar';
import CustomCarousel from '@/components/GamePass/CustomCarousel'; 
import Nft from '@/components/GamePass/Nft';
import { useQuery } from '@tanstack/react-query';
import { getAllGamePasses, getTrendingGamePasses,getTopFreeGamePasses } from '@/http/api';
import Spinner from '@/components/Spinner/spinner';
import Footer from '@/components/landing/Footer';

const GamePass = () => {
  const { data: allGamePasses, isLoading } = useQuery({
    queryKey: ['gamePasses'],
    queryFn: async () => await getAllGamePasses(),
    staleTime: 0,
  });
  const { data: trendingGamePasses } = useQuery({
    queryKey: ['trendingGamePasses'],
    queryFn: async () => await getTrendingGamePasses(),
    staleTime: 0,
  });


  return (
    <main className="flex flex-col bg-gradient-to-tl from-[#110219] to-[#37024F] text-white">
      <Navbar bgColor="transparent" />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {allGamePasses?.length === 0 ? (
            <p className="text-white text-center mt-32">No game passes</p>
          ) : (
            <div className="space-y-8">
              <h1 className="text-3xl font-semibold mt-8 mx-4 lg:mx-16">
                Game Passes
              </h1>
              <div className="flex justify-center items-center m-4">
                <CustomCarousel items={allGamePasses} />
              </div>
              {/* <div className='mt-32'>
              <h1 className="text-3xl font-semibold mt-8 mx-4 lg:mx-16 mb-16">
                Top trending
              </h1>
                <CustomCarousel items={trendingGamePasses}></CustomCarousel>
                <Nft />
              </div> */}
              <Footer />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default GamePass;
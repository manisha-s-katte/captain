'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import GamePassCarousel from '@/components/GamePass/Carousel';
import CategoryGamePass from '@/components/GamePass/CategoryGamePass';
import GamePassFooter from '@/components/GamePass/GamePassFooter';
import { createClient } from '@/lib/supabase/client';
import Spinner from '@/components/Spinner/spinner';
import Nft from '@/components/GamePass/Nft';
import { useQuery } from '@tanstack/react-query';
import { getGamePasses } from '@/http/api';

const GamePass = () => {
  const { data: gamePasses, isLoading } = useQuery({
    queryKey: ['gamePasses'],
    queryFn: async () => await getGamePasses(),
  });
  return (
    <main className="flex flex-col bg-gradient-to-tl from-[#110219] to-[#37024F] text-white min-h-screen">
      <Navbar bgColor="transparent" />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {gamePasses?.length === 0 ? (
            <p className="text-white text-center mt-32">No game passes</p>
          ) : (
            <div className="space-y-8">
              <div className="w-full flex justify-center items-center">
                <GamePassCarousel gamePasses={gamePasses} />
              </div>
              <CategoryGamePass />
              <Nft />
              <GamePassFooter />
            </div>
          )}
        </>
      )}
    </main>
  );
};

export default GamePass;

'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/landing/Navbar';
import GamePassCarousel from '@/components/GamePass/Carousel';
import CategoryGamePass from '@/components/GamePass/CategoryGamePass';
import GamePassFooter from '@/components/GamePass/GamePassFooter';
import { createClient } from '@/lib/supabase/client';
import Spinner from '@/components/Spinner/spinner';
import Nft from '@/components/GamePass/Nft';

const GamePass = () => {
  const [gamePasses, setGamePasses] = useState<Record<string, any>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchGamePasses = async () => {
      setIsLoading(true);
      const supabase = createClient();
      const { data, error } = await supabase
        .from('GamePass')
        .select('*')
        .eq('status', 'active');

      if (error) {
        console.error('Error fetching game passes:', error);
      } else {
        setGamePasses(data || []);
      }
      setIsLoading(false);
    };

    fetchGamePasses();
  }, []);
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

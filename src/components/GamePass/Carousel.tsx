import React from 'react';
import { Card, CardContent } from '../ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import GP1 from '@/assets/Images/GamePass/GP1.jpeg';
import { Button } from '../ui/button';

const GamePassCarousel = ({ gamePasses }: { gamePasses: any }) => {
  return (
    <Carousel className="w-full max-w-[50%]">
      <CarouselContent className="">
        {gamePasses?.map((gamePass: any, index: number) => (
          <CarouselItem key={index}>
            <div className="p-1 bg-transparent">
              <Card className="bg-transparent border-none max-w-[1290px] h-[450px] flex justify-center items-center">
                <CardContent className="flex aspect-video p-0 justify-center items-center gap-4 ">
                  <div className="overflow-clip w-[70%] aspect-video">
                    <Image
                      src={gamePass?.fileUrl}
                      alt={gamePass?.title}
                      width={320}
                      height={320}
                      className="w-[380px] h-[380px] object-cover hover:scale-125 transition-all"
                    ></Image>
                  </div>
                  <div className="flex flex-col items-start">
                    <h2 className=" text-xl uppercase font-extrabold text-white">
                      {gamePass?.title}
                    </h2>
                    <p className="text-purple-500 text-sm">
                      {(gamePass?.price / 100).toFixed(2)} INR
                    </p>
                    <Button className="w-full rounded-none mt-4 bg-[#D600E1]">
                      Explore
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GamePassCarousel;

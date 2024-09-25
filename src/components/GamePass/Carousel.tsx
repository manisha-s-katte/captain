import React from 'react'
import { Card, CardContent } from "../ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Image from 'next/image'
import GP1 from '@/assets/Images/GamePass/GP1.jpeg'
import { Button } from '../ui/button'


const GamePassCarousel = () => {
  return (
    <Carousel className="w-full max-w-[50%]">
    <CarouselContent className=''>
      {Array.from({ length: 5 }).map((_, index) => (
        <CarouselItem key={index}>
          <div className="p-1 bg-transparent">
            <Card className='bg-transparent border-none max-w-[1290px] h-[450px] flex justify-center items-center'>
              <CardContent className="flex aspect-video p-0 justify-center items-center gap-4 ">
                <div className='overflow-clip w-[70%] aspect-video'>
                <Image src={GP1} alt='' className='object-cover hover:scale-125 transition-all'></Image>
                </div>
                <div className='flex flex-col items-start'>
                  <h2 className=' text-xl uppercase font-extrabold text-white'>
                    Fragger
                  </h2>
                  <p className='text-purple-500 text-sm'>
                    (INR 4500)
                  </p>
                  <Button className='w-full rounded-none mt-4 bg-[#D600E1]'>Explore</Button>

                  
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
  )
}

export default GamePassCarousel

import React, { useState, useCallback, useEffect, useRef, MouseEvent } from 'react';
import { ChevronRight } from 'lucide-react';
import { ChevronLeft } from 'lucide-react';
interface GamePassItem {
  id: number;
  title: string;
  description: string;
  price: number;
  gamePassType: 'trending' | 'top-free';
  isFree: boolean;
  status: 'active' | 'inactive';
  fileUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface CustomCarouselProps {
  items: GamePassItem[];
  autoPlayInterval?: number;
  pauseOnHover?: boolean;
}

const CustomCarousel: React.FC<CustomCarouselProps> = ({
  items,
  autoPlayInterval = 5000,
  pauseOnHover = true,
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  
  const carouselRef = useRef<HTMLDivElement>(null);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  }, [items.length]);

  const previousSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  }, [items.length]);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined;
    
    if (isPlaying && !isDragging) {
      intervalId = setInterval(nextSlide, autoPlayInterval);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, isDragging, nextSlide, autoPlayInterval]);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>): void => {
    if (!carouselRef.current) return;
    
    setIsDragging(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
    setIsPlaying(false);
  };

  const handleMouseUp = (): void => {
    setIsDragging(false);
    setIsPlaying(true);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (!isDragging || !carouselRef.current) return;
    
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    
    if (Math.abs(walk) > 100) {
      if (walk > 0) {
        previousSlide();
      } else {
        nextSlide();
      }
      setIsDragging(false);
      setIsPlaying(true);
    }
  };

  const handleMouseEnter = (): void => {
    if (pauseOnHover) setIsPlaying(false);
  };

  const handleMouseLeave = (): void => {
    if (pauseOnHover) setIsPlaying(true);
  };



  return (
    <div className="relative w-[70%] max-w-6xl mx-auto mb-32 pentagon">
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10  p-2 rounded-full hover:bg-white/70 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className='text-purple-600'></ChevronLeft>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10  p-2 rounded-full hover:bg-white/70 transition-colors"
        aria-label="Next slide"
      >
      <ChevronRight className='text-purple-600'></ChevronRight>

      </button>

      <div
        ref={carouselRef}
        className="overflow-hidden relative"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div
          className="flex transition-transform duration-500 ease-out "
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="w-full flex-shrink-0 relative "
              style={{ touchAction: 'pan-y pinch-zoom' }}

            >
              <img
                src={item.fileUrl}
                alt={item.title}
                className="w-full object-cover h-[400px]"
                draggable={false}
             />
            
              <div className=' backdrop-blur-2xl absolute bottom-0 h-[100px] w-full z-10 px-8 py-2'>
               <div className="flex justify-between">
                <div>
                  <div className='flex gap-4 justify-center items-center'>
                <h2 className=' capitalize text-2xl font-semibold'>
                    {item.title}
                </h2>
                  {!item.isFree && <p className='mr-12'>&#8377; {item.price}</p>}
                </div>

                
                <p>{item.description}</p>
                </div>
                <div>
                  {
                    item.isFree?<button className='bg-purple-800 px-8 pentagon '>FREE</button>:<><button className='bg-purple-800 px-8 pentagon '>Buy Now</button></>

                  }
                  
          
                </div>
                </div>
              </div>
            

              
            </div>
          ))}
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomCarousel;
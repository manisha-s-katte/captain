'use client';
import React, { useState, useRef, useEffect } from 'react';
import { CiSearch } from 'react-icons/ci';
import { User } from 'lucide-react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getSocialMediaPosts } from '@/http/api';
import { InstagramEmbed, XEmbed } from 'react-social-media-embed';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Post {
  id: string;
  url: string;
  platform: string;
}

interface SocialMediaCarouselProps {
  posts: Post[];
  platform: 'Instagram' | 'Twitter';
}

const SocialMediaCarousel: React.FC<SocialMediaCarouselProps> = ({ 
  posts = [], 
  platform
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [itemsPerView, setItemsPerView] = useState(1);

  // Update items per view based on screen size
  useEffect(() => {
    const handleResize = () => {
      // md breakpoint is 768px in Tailwind by default
      setItemsPerView(window.innerWidth >= 768 ? 4 : 1);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const scrollToPrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  // Autoplay effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (!isHovered && posts?.length > itemsPerView) {
      interval = setInterval(() => {
        scrollToNext();
      }, 5000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [currentIndex, isHovered, posts, itemsPerView]);

  if (!posts.length) return null;

  const itemWidth = 100 / itemsPerView;

  return (
    <div 
      className="relative w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer container with overflow hidden */}
      <div className="relative overflow-hidden">
        {/* Inner container for sliding animation */}
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * itemWidth * 0.1}%)`,
            width: `${posts.length * itemWidth}%`
          }}
        >
          {posts.map((post: Post, index: number) => (
            <div
              key={post.id || index}
              className="md:px-3 px-0"
              style={{ 
                width: `${itemWidth}%`,
              }}
            >
              {platform === 'Instagram' ? (
                <div className="w-full aspect-[4/3] rounded-md overflow-hidden bg-white/5">
                  <InstagramEmbed url={post.url} width="100%" />
                </div>
              ) : (
                <div className="w-full aspect-[4/3] bg-white/5">
                  <XEmbed url={post.url} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      {posts.length > itemsPerView && (
        <>
          <button 
            onClick={scrollToPrev}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white backdrop-blur-sm z-30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={scrollToNext}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 rounded-full p-2 text-white backdrop-blur-sm z-30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </>
      )}

      {/* Pagination dots */}
      <div className="flex justify-center mt-4 space-x-2 overflow-x-auto px-4">
        {posts.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentIndex === index ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};



const News = () => {
  const [activeLink, setActiveLink] = useState('latest-events');

  const handleLinkClick = (link: React.SetStateAction<string>) => {
    setActiveLink(link);
  };

  const { data: socialMediaPosts = [] } = useQuery({
    queryKey: ['getSocialMediaPosts'],
    queryFn: () => getSocialMediaPosts(),
    staleTime: 0,
  });

  const instagramPosts = socialMediaPosts?.filter((post: Post) => post.platform === 'Instagram') || [];
  const twitterPosts = socialMediaPosts?.filter((post: Post) => post.platform === 'Twitter') || [];

  return (
    <div className="bg-gradient-to-r from-[#14021D] to-[#3C0056] min-h-screen">
      <nav className="flex justify-between items-center px-8 py-8 text-white">
        <div className="flex items-center">
          <span className="text-2xl font-semibold ">News</span>
          <div className="flex view_all text-xl tracking-lighter pl-20 space-x-10 relative">
            <Link
              href="/events"
              onClick={() => handleLinkClick('latest-events')}
              className={`relative pb-2 ${
                activeLink === 'latest-events' ? 'text-white' : 'text-white'
              }`}
            >
              Latest Events
              {activeLink === 'latest-events' && (
                <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
              )}
            </Link>
            <Link
              href="/events"
              onClick={() => handleLinkClick('events')}
              className={`relative pb-2 ${
                activeLink === 'events' ? 'text-white' : 'text-white'
              }`}
            >
              Events
              {activeLink === 'events' && (
                <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
              )}
            </Link>
            <Link
              href="/gamePass"
              onClick={() => handleLinkClick('game-pass')}
              className={`relative pb-2 hidden ${
                activeLink === 'game-pass' ? 'text-white' : 'text-white'
              }`}
            >
              Game Pass
              {activeLink === 'game-pass' && (
                <div className="absolute inset-x-0 bottom-0 border-b-3 border-[#D600E1]"></div>
              )}
            </Link>
          </div>
        </div>
        <div className="hidden border-b-3 pb-3 border-[#D600E1] items-center space-x-4">
          <input
            type="text"
            placeholder="Search..."
            className="p-2 bg-transparent text-white outline-none"
          />
          <button className="text-white">
            <CiSearch className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <main className="px-8 py-4">
        {/* Instagram Posts Carousel */}
        {instagramPosts.length > 0 && (
          <div className="mb-4">
            <h2 className="text-white text-xl font-semibold mb-4">Instagram Posts</h2>
            <SocialMediaCarousel 
              posts={instagramPosts} 
              platform="Instagram"
            />
          </div>
        )}

        {/* Twitter Posts Carousel */}
        {twitterPosts.length > 0 && (
          <div className="mb-4">
            <h2 className="text-white text-xl font-semibold mb-4">Twitter Posts</h2>
            <SocialMediaCarousel 
              posts={twitterPosts} 
              platform="Twitter"
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default News;
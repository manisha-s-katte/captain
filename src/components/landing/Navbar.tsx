"use client";
import { useState } from 'react';
import { CiMenuFries } from 'react-icons/ci';
import { GiMagicAxe } from 'react-icons/gi';
import Logo from "@/assets/Resources/logo.svg";
import User from '@/assets/Resources/User.svg';

// Define the props type
interface NavbarProps {
  bgColor?: string;
}

export default function Navbar({ bgColor = "#110219" }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string>('');

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLinkClick = (link: string) => {
    setActiveLink(link);
    if (isOpen) toggleMenu(); // Close menu on link click for mobile
  };

  return (
    <header className="py-3 text-white font-proxima-nova" style={{ backgroundColor: bgColor }}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex-shrink-0">
              <Logo className="text-base h-auto w-auto" />
            </a>
          </div>
          <div className="hidden ml-5 md:flex md:items-center md:space-x-4">
            <a
              href="/events"
              className={`text-lg ${activeLink === 'events' ? 'text-fuchsia-600' : 'hover:text-fuchsia-600'}`}
              onClick={() => handleLinkClick('events')}
            >
              Events
            </a>
            <a
              href="gamePass"
              className={`text-lg ${activeLink === 'gamePass' ? 'text-fuchsia-600' : 'hover:text-fuchsia-600'}`}
              onClick={() => handleLinkClick('gamePass')}
            >
              Game Pass
            </a>
            <a
              href="/aboutus"
              className={`text-lg ${activeLink === 'aboutUs' ? 'text-fuchsia-600' : 'hover:text-fuchsia-600'}`}
              onClick={() => handleLinkClick('aboutUs')}
            >
              About Us
            </a>
          </div>
          <div className="hidden md:flex ml-20 md:items-center">
            <div className="relative flex items-center">
              <a
                href="/login"
                className="relative text-white px-3.5 py-0.5 text-base font-semibold overflow-hidden"
                onClick={() => handleLinkClick('login')}
              >
                <div className="pentagon bg-[#D600E1] absolute inset-0"></div>
                <span className="relative text-black z-10 text-center">Login</span>
              </a>
              <User className="ml-5" />
            </div>
          </div>
          <div className="flex md:hidden">
            <button onClick={toggleMenu} className="text-gray-300 hover:text-white focus:outline-none focus:text-white">
              {isOpen ? <GiMagicAxe className="h-6 w-6" /> : <CiMenuFries className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a
              href="#"
              className={`block px-3 py-2 rounded-md text-base font-medium ${activeLink === 'events' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => handleLinkClick('events')}
            >
              Events
            </a>
            <a
              href="#"
              className={`block px-3 py-2 rounded-md text-base font-medium ${activeLink === 'gamePass' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => handleLinkClick('gamePass')}
            >
              Game Pass
            </a>
            <a
              href="#"
              className={`block px-3 py-2 rounded-md text-base font-medium ${activeLink === 'testing' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => handleLinkClick('testing')}
            >
              Testing
            </a>
            <a
              href="#"
              className={`block px-3 py-2 rounded-md text-base font-medium ${activeLink === 'aboutUs' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => handleLinkClick('aboutUs')}
            >
              About Us
            </a>
            <a
              href="/login"
              className={`block px-3 py-2 rounded-md text-base font-medium ${activeLink === 'login' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
              onClick={() => handleLinkClick('login')}
            >
              Login
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

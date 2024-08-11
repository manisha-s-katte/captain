"use client";
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { MdHome } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import Logo1 from "@/assets/Resources/Logo1.svg";
import { GiMagicAxe } from 'react-icons/gi';

interface SlideBarProps {
  username?: string;
  fullName?: string;
}

const SlideBar: React.FC<SlideBarProps> = ({
  username = 'username',
  fullName = 'Full Name',
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [selectedOption, setSelectedOption] = useState<string>('dashboard');
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Update selected option based on current route
  useEffect(() => {
    if (pathname.includes('/user/dashboard')) {
      setSelectedOption('dashboard');
    } else if (pathname.includes('/user/settings')) {
      setSelectedOption('settings');
    }
  }, [pathname]);

  const handleOptionClick = (option: string) => {
    if (option === 'dashboard') {
      router.push('/user/dashboard');
    } else if (option === 'settings') {
      router.push('/user/settings');
    }
  };

  return (
    <div>
      {/* Toggle Button for smaller screens */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 md:hidden z-20 text-white p-2 rounded-full shadow-lg"
      >
        <GiMagicAxe className="h-6 w-6" />
      </button>

      {/* Sidebar Content */}
      <aside
        className={`fixed top-0 left-0 w-64 py-4 z-10 h-screen flex flex-col justify-between transition-transform duration-300 ${
          isOpen ? 'translate-x-0 bg-[#3A0153] shadow-lg' : '-translate-x-full md:translate-x-0 md:shadow-none'
        }`}
      >
        <div className="flex-grow">
          <div className="flex flex-col items-center text-white h-full">
            {/* Header: Logo */}
            <div className="mx-6 mt-12 w-full flex justify-center">
              <Logo1 className="text-base h-36 w-36" />
            </div>
            <div className="text-center mb-8">
              <h1 className="font-medium text-xl tracking-widest">{username}</h1>
              <p className="text-sm text-[#ffffff] uppercase">{fullName}</p>
            </div>

            {/* Navigation Options */}
            <nav className="flex flex-col space-y-5 w-full mt-4">
              <button
                onClick={() => handleOptionClick('dashboard')}
                className={`flex items-center justify-center w-full space-x-2 p-2 py-3 ${
                  selectedOption === 'dashboard' ? 'bg-[#D700E1] text-black' : 'bg-transparent'
                }`}
              >
                <MdHome className='w-5 h-5' />
                <span className="text-sm font-semibold">Dashboard</span>
              </button>
              <button
                onClick={() => handleOptionClick('settings')}
                className={`flex items-center justify-center w-full space-x-2 p-2 py-3 ${
                  selectedOption === 'settings' ? 'bg-[#D700E1] text-black' : 'bg-transparent'
                }`}
              >
                <IoMdSettings className='w-5 h-5' />
                <span className="text-sm font-semibold">Settings</span>
              </button>
            </nav>
          </div>
        </div>
      </aside>
      {/* Overlay to close sidebar */}
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-5"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default SlideBar;

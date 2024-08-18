import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid'; // Or use any other icon library

interface CustomDropdownProps {
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({ options, selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block z-10 text-left">
      <button
        type="button"
        className="flex items-center pl-4 pr-1 py-2 bg-[#330B45] border border-[#D600E1] text-white rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected}
        <ChevronDownIcon className="w-7 h-7 ml-5 text-[#D600E1]" />
      </button>
      {isOpen && (
        <div className="absolute w-full bg-[#330B45] border border-[#D600E1] border-t-0 rounded shadow-lg">
          {options.map((option) => (
            <button
              key={option}
              className="block px-4 py-2 text-white hover:bg-[#D600E1] hover:text-black w-full text-left"
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;

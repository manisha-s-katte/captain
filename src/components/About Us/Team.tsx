import React from 'react';
import Image from 'next/image';
import TeamImg1 from '@/assets/Images/AboutUs/Team/ABHIJEET.webp'
import TeamImg2 from '@/assets/Images/AboutUs/Team/AUMRITASH.webp'
import TeamImg3 from '@/assets/Images/AboutUs/Team/Sumit.webp'
import TeamImg4 from '@/assets/Images/AboutUs/Team/TRISHA.webp'

// Define the props for the TeamMember component
interface TeamMemberProps {
  src: string;
  alt: string;
  name: string;
  role: string;
}

// Local component to render each team member's profile
const TeamMember: React.FC<TeamMemberProps> = ({ src, alt, name, role }) => (
  <div className=" flex flex-col items-center text-center p-4 rounded-lg">
    <Image
      src={src}
      alt={alt}
      width={200}
      height={200}
      className="rounded-full mb-4"
    />
    <p className="text-white font-semibold">{name}</p>
    <p className="text-gray-400 text-sm">{role}</p>
  </div>
);

const Team: React.FC = () => {
  return (
    <div className="flex flex-col items-center py-10 bg-gradient-to-b from-[#220330] to-[#3C0156]">
      <h1 className="text-2xl font-bold text-white mb-10">Meet our team</h1>
      <div className="grid grid-cols-2 sm:grid-cols-4"> {/* Using flex layout for alignment */}
        <TeamMember
          src={TeamImg3.src}
          alt="Sumit Dubey"
          name="Sumit Dubey"
          role="CEO"
        />
        <TeamMember
          src={TeamImg1.src}
          alt="Abhijeet Gupta"
          name="Abhijeet Gupta"
          role="CFO & Co-Founder"
        />
        <TeamMember
          src={TeamImg4.src}
          alt="Trisha"
          name="Trisha"
          role="COO"
        />
        <TeamMember
          src={TeamImg2.src}
          alt="Aumritash Maitra"
          name="Aumritash Maitra"
          role="Project Head"
        />
      </div>
    </div>
  );
};

export default Team;

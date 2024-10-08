import Image from 'next/image';
import LoginImage from '@/assets/Images/GamePass/login.png';
import NftImage from '@/assets/Images/GamePass/nft.png';
import FreeEntryImage from '@/assets/Images/GamePass/free-entry.png';
import EarnImage from '@/assets/Images/GamePass/earn.png';
const cardsData = [
  {
    title: 'LOGIN',
    description: 'Login to access to Game Pass',
    image: LoginImage,
  },
  {
    title: 'BUY OUR PASS',
    description: 'Buy our game passes according to your choice',
    image: NftImage,
  },
  {
    title: 'GET FREE ENTRY',
    description: 'Get a free entry on every tournaments and events',
    image: FreeEntryImage,
  },
  {
    title: 'EARN',
    description: 'Win exciting prizepool and merch',
    image: EarnImage,
  },
];
export default function Nft() {
  return (
    <div className="p-0 mx-4 md:8 md:mx-12">
      <div>
        <h2 className="text-2xl font-bold mb-8">
          Play and earn with Game Passes
        </h2>
        <div className="flex gap-4 justify-between w-full">
          {cardsData.map((data: any, index) => (
            <div key={index} className="space-y-4 w-1/4">
              <h3 className="font-extrabold text-[8px] sm:text-sm md:text-base">
                <span className="bg-gradient-to-r from-[#FF41B3] to-[#379FFF] bg-clip-text text-transparent">
                  {data.title}
                </span>
              </h3>
              <div className="flex items-center gap-2">
                <Image
                  src={data.image}
                  alt={data.title}
                  width={48}
                  height={48}
                  className="w-4 h-4 sm:w-12 sm:h-12"
                />
                {index < cardsData.length - 1 && (
                  <div className="w-10 sm:w-72  h-0.5 bg-[#7E5D84] self-start mt-2 sm:mt-[23px]" />
                )}
              </div>
              <p className="text-[8px] md:text-sm">{data.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

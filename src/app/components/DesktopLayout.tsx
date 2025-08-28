"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import DeskHeader from "./DeskHeader";
import DesktopNavigationBar from "./NavigationBar";

interface DesktopLayoutProps {
  navigationItems: Array<{
    id: string;
    label: string;
    icon: string;
    active: boolean;
    isNew?: boolean;
  }>;
  gameCards: Array<{ id: number; name: string, icon: string, isComingSoon: boolean }>;
}

interface GameCardProps {
  game: { id: number; name: string, icon: string, isComingSoon: boolean };
  onGameClick: (game: { id: number; name: string }) => void;
}

interface PlayNowOverlayProps {
  isVisible: boolean;
}

interface ComingSoonLabelProps {
  isVisible: boolean;
}

function PlayNowOverlay({ isVisible }: PlayNowOverlayProps) {
  if (!isVisible) return null;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <div className="btn-container p-4 h-45 flex items-center justify-center">
        <button className="w-fit bg-transparent border border-white rounded-full text-white py-3 px-6 transition-all duration-200 transform hover:scale-105 cursor-pointer">
          Play Now
        </button>
      </div>
    </div>
  );
}

function ComingSoonLabel({ isVisible }: ComingSoonLabelProps) {
  if (!isVisible) return null;
  
  return (
    <Image 
      src="/game-icons/label-coming-soon.png" 
      alt="coming-soon" 
      width={166} 
      height={42} 
      className="absolute top-11 left-[-13px] z-10" 
    />
  );
}

  function GameCard({ game, onGameClick }: GameCardProps) {
    const handleClick = () => {
      if (game.isComingSoon) {
        return; // Block click for coming soon games
      }
      onGameClick(game);
    };

    return (
      <div key={game.id}>
        <button
          onClick={handleClick}
          style={{
            backgroundImage: `url('/game-icons/${game.icon}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            borderRadius: '20px',
          }}
          className={`bg-transparent h-[260px] w-[260px] p-2 text-white relative flex flex-col justify-center items-center hover:bg-transparent transition-colors mx-auto group ${
            game.isComingSoon ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
        {/* Inner container for slide-up effect with overflow control */}
        <div className="absolute inset-0 overflow-hidden rounded-[20px]">
          <PlayNowOverlay isVisible={!game.isComingSoon} />
        </div>
        
        {/* Coming Soon label - positioned outside the overflow container */}
        <ComingSoonLabel isVisible={game.isComingSoon} />
      </button>
      <h3 className="font-bold text-lg text-center py-5">{game.name}</h3>
    </div>
  );
}

export default function DesktopLayout({
  navigationItems,
  gameCards,
}: DesktopLayoutProps) {
  const router = useRouter();

  const handleGameClick = (game: { id: number; name: string }) => {
    // Redirect to the iframe page with game parameters
    const nameSlug = game.name.toLowerCase().replace(/\s+/g, "-");
    router.push(`/game-iframe?id=${game.id}&name=${nameSlug}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <DeskHeader />
      <DesktopNavigationBar navigationItems={navigationItems} />
      <div className="flex justify-between items-center">
        <div className="flex w-full aspect-[96∶25] justify-center">
          <Image
            src="/banners/desktop/banner.jpg"
            alt="promotional-banner"
            width={1920}
            height={500}
            className="object-cover"
          />
        </div>
      </div>

      {/* Sport Cards Grid - Mobile Optimized */}
      <div className="p-3">
        {/* Auto-responsive grid based on button size (260px minimum) with max 5 columns */}
        <div className="grid gap-2 max-w-[1400px] mx-auto grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {/* Alternative CSS Grid approach: 
        <div className="grid gap-2 max-w-[1400px] mx-auto" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))' }}> */}
          {gameCards.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onGameClick={handleGameClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

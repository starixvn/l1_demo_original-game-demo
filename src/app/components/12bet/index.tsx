"use client";

import Image from "next/image";
import { useScreenSize } from "../../hooks/useScreenSize";
import NavigationBar from "./nagigation-bar";
import { useRouter } from "next/navigation";
import One2BetHeader from "./header";
import { isDesktop } from "react-device-detect";
import { useState } from "react";
import GamePopup from "../GamePopup";
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
      <div className="btn-container p-4 h-[180px] flex items-center justify-center">
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
      className="absolute top-3 md:top-11 -left-1 md:left-[-13px] z-10"
    />
  );
}
function GameCard({
  game,
  onGameClick,
}: {
  game: { id: number; name: string; icon: string; isComingSoon: boolean };
  onGameClick: (game: { id: number; name: string }) => void;
}) {
  const handleClick = () => {
    if (game.isComingSoon) {
      return; // Block click for coming soon games
    }
    onGameClick(game);
  };
  const icon =
    game.icon == "crashx-icon.png" ? "crashx-icon-12bet.png" : game.icon;
  return (
    <div key={game.id} className="flex flex-col ">
      <div className="relative aspect-square">
        <button
          onClick={handleClick}
          style={{
            backgroundImage: `url('/game-icons/${icon}')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            borderRadius: "20px",
          }}
          className={`w-full h-full bg-transparent text-white flex flex-col justify-center items-center hover:bg-transparent transition-colors group rounded-[8px] cursor-pointer ${
            game.isComingSoon ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {/* Inner container for slide-up effect with overflow control */}
          <div className="absolute inset-0 overflow-hidden rounded-[20px]">
            <PlayNowOverlay isVisible={!game.isComingSoon} />
          </div>

          {/* Coming Soon label - positioned outside the overflow container */}
          <ComingSoonLabel isVisible={game.isComingSoon} />
        </button>
      </div>
      <h3 className="font-bold text-xs md:text-lg text-center py-5 text-white">
        {game.name}
      </h3>
    </div>
  );
}
export default function One2BetLayout({
  navigationItems,
  gameCards,
}: {
  navigationItems: Array<{
    id: string;
    label: string;
    icon: string;
    active: boolean;
    isNew?: boolean;
  }>;
  gameCards: Array<{
    id: number;
    name: string;
    icon: string;
    isComingSoon: boolean;
  }>;
}) {
  const { isMobile, isLoading } = useScreenSize();
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<{
    id: number;
    name: string;
  } | null>(null);

  // Show loading state while determining screen size
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0a1b38] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  const handleGameClick = (game: { id: number; name: string }) => {
    // Redirect to the iframe page with game parameters
    const nameSlug = game.name.toLowerCase().replace(/\s+/g, "-");
    if (isDesktop) {
      router.push(`/game-iframe?id=${game.id}&name=${nameSlug}`);
    } else {
      setSelectedGame(game);
      setIsPopupOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      {!isPopupOpen && <One2BetHeader />}

      {/* Main Content */}
      {!isPopupOpen && (
        <div className="flex flex-col-reverse md:flex-col">
          <NavigationBar navigationItems={navigationItems} />
          <div className="flex justify-between items-center">
            <div className="flex w-full justify-center">
              <img
                src="/banners/banner-12bet.jpg"
                alt="promotional-banner"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      )}

      <div className="p-3">
        <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-6 md:max-w-[1400px] mx-auto">
          {gameCards?.map((game) => (
            <GameCard key={game.id} game={game} onGameClick={handleGameClick} />
          ))}
        </div>
      </div>
      {isPopupOpen && (
        <GamePopup
          isOpen={isPopupOpen}
          onClose={() => setIsPopupOpen(false)}
          gameName={selectedGame?.name || ""}
          gameId={selectedGame?.id}
        />
      )}
    </div>
  );
}

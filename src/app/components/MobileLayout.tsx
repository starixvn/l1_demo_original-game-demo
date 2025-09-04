"use client";

import Image from "next/image";
import { useState } from "react";
import GamePopup from "./GamePopup";
import { useBalanceManager } from "../hooks/useBalanceManager";

interface MobileLayoutProps {
  navigationItems: Array<{
    id: string;
    label: string;
    icon: string;
    active: boolean;
    isNew?: boolean;
  }>;
  gameCards: Array<{ id: number; name: string, icon: string, isComingSoon: boolean }>;
  bottomNavItems: Array<{
    id: string;
    label: string;
    icon: string;
    active: boolean;
  }>;
}

interface MobileGameCardProps {
  game: { id: number; name: string, icon: string, isComingSoon: boolean };
  onGameClick: (game: { id: number; name: string }) => void;
}

interface MobilePlayNowOverlayProps {
  isVisible: boolean;
}

interface MobileComingSoonLabelProps {
  isVisible: boolean;
}

function MobilePlayNowOverlay({ isVisible }: MobilePlayNowOverlayProps) {
  if (!isVisible) return null;
  
  return (
    <div className="absolute bottom-0 left-0 right-0 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <div className="btn-container p-2 h-full flex items-center justify-center">
        <button className="w-fit bg-transparent border border-white rounded-full text-white text-xs py-2 px-4 transition-all duration-200 transform hover:scale-105 cursor-pointer">
          Play Now
        </button>
      </div>
    </div>
  );
}

function MobileComingSoonLabel({ isVisible }: MobileComingSoonLabelProps) {
  if (!isVisible) return null;
  
  return (
    <Image 
      src="/game-icons/label-coming-soon.png" 
      alt="coming-soon" 
      width={83} 
      height={21} 
      className="absolute top-[17%] left-[-7%] z-10 w-[96%] h-auto" 
    />
  );
}

function MobileGameCard({ game, onGameClick }: MobileGameCardProps) {
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
          borderRadius: '8px',
        }}
        className={`bg-transparent w-full aspect-square p-2 text-white relative flex flex-col justify-center items-center hover:bg-transparent transition-colors group ${
          game.isComingSoon ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {/* Inner container for slide-up effect with overflow control */}
        <div className="absolute inset-0 overflow-hidden rounded-[8px]">
          <MobilePlayNowOverlay isVisible={!game.isComingSoon} />
        </div>
        
        {/* Coming Soon label - positioned outside the overflow container */}
        <MobileComingSoonLabel isVisible={game.isComingSoon} />
      </button>
      <h3 className="lg:font-bold font-medium lg:text-sm text-xs text-center py-2">{game.name}</h3>
    </div>
  );
}

export default function MobileLayout({
  navigationItems,
  gameCards,
  bottomNavItems,
}: MobileLayoutProps) {
  const [selectedGame, setSelectedGame] = useState<{
    id: number;
    name: string;
  } | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { getDisplayBalance, getDisplayName } = useBalanceManager();

  const handleGameClick = (game: { id: number; name: string }) => {
    setSelectedGame(game);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedGame(null);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#0a1b38] text-white h-[56px] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image src="/nova-logo.png" alt="logo" width={80} height={80} />
        </div>
        <div className="text-right">
          <p className="text-xs">Hello, {getDisplayName()}</p>
          <p className="text-base font-bold">{getDisplayBalance()}</p>
        </div>
      </div>

      {/* Announcement Marquee */}
      <div className="bg-white text-[#0a1b38] h-[44px] py-2 px-3 flex items-center">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="flex-shrink-0 bg-[#ff7600] text-[#fff] uppercase font-medium text-xs px-2 py-1 rounded-xl">
            New
          </div>
          <div className="flex-1 overflow-hidden">
            <div className="animate-marquee whitespace-nowrap">
              <span className="inline-block mr-8">
                Welcome to Nova! Get 100% bonus for new members
              </span>
              <span className="inline-block mr-8">
                Weekly sports tournament - Up to 500 million VND prize
              </span>
              <span className="inline-block mr-8">
                New slot game - Lucky Dragon with RTP 97.5%
              </span>
              <span className="inline-block mr-8">
                First deposit bonus - 50% bonus + 50 free spins
              </span>
              <span className="inline-block mr-8">
                Live Casino with beautiful dealers - Real game experience
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="flex justify-between items-center">
        <div className="flex w-full aspect-[125/47] justify-center">
          <Image
            src="/banners/banner.png"
            alt="promotional-banner"
            width={1920}
            height={150}
            className="object-cover"
          />
        </div>
      </div>

      {/* Navigation Tabs - Mobile Optimized */}
      <div className="bg-white p-3">
        <div className="flex overflow-x-auto">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center flex-[20vw]"
            >
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-1 ${
                  item.active ? "bg-[#1e3e77]" : "bg-[#d1d1d1]"
                }`}
              >
                <Image
                  src={`/icons/${item.icon}`}
                  alt={item.label}
                  width={20}
                  height={20}
                />
              </div>
              <span
                className={`text-xs text-center w-[20vw] text-ellipsis overflow-hidden whitespace-nowrap ${
                  item.active
                    ? "text-[#585858] border-b-2 border-[#1e3e77]"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="p-3">
        <div className="grid grid-cols-4 gap-2">
          {gameCards.map((game) => (
            <MobileGameCard
              key={game.id}
              game={game}
              onGameClick={handleGameClick}
            />
          ))}
        </div>
      </div>

      {/* Bottom Navigation - Mobile Optimized */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center py-1 px-1 ${
                item.active ? "text-[#0a1b38]" : "text-[#d1d1d1]"
              }`}
            >
              <span className="text-base mb-1">
                <Image
                  src={`/icons/${item.icon}`}
                  alt={item.label}
                  width={20}
                  height={20}
                />
              </span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Game Popup */}
      <GamePopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        gameName={selectedGame?.name || ""}
        gameId={selectedGame?.id}
      />
    </div>
  );
}

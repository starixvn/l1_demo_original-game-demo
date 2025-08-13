"use client";

import Image from "next/image";
import { useState } from "react";
import GamePopup from "./GamePopup";

interface MobileLayoutProps {
  navigationItems: Array<{
    id: string;
    label: string;
    icon: string;
    active: boolean;
    isNew?: boolean;
  }>;
  gameCards: Array<{ id: number; name: string }>;
  bottomNavItems: Array<{
    id: string;
    label: string;
    icon: string;
    active: boolean;
  }>;
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
          <p className="text-xs">Xin Chào, bradytrang</p>
          <p className="text-base font-bold">VND $75.62 (&apos;000)</p>
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
                Chào mừng bạn đến với Nova! Nhận ngay 100% tiền thưởng cho thành
                viên mới
              </span>
              <span className="inline-block mr-8">
                Giải đấu thể thao hàng tuần - Tổng giải thưởng lên đến 500 triệu
                VND
              </span>
              <span className="inline-block mr-8">
                Slot game mới ra mắt - Lucky Dragon với RTP 97.5%
              </span>
              <span className="inline-block mr-8">
                Nạp tiền lần đầu nhận ngay 50% tiền thưởng + 50 free spins
              </span>
              <span className="inline-block mr-8">
                Live Casino với dealer xinh đẹp - Trải nghiệm game thực tế
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

      {/* Sport Cards Grid - Mobile Optimized */}
      <div className="p-3">
        <div className="grid grid-cols-2 gap-2">
          {gameCards.map((game) => (
            <button
              key={game.id}
              onClick={() => handleGameClick(game)}
              className="bg-[#616161] h-[70px] rounded-lg p-2 text-white relative overflow-hidden flex flex-col justify-center items-center hover:bg-[#4a4a4a] transition-colors cursor-pointer"
            >
              <h3 className="font-bold text-xs text-center">{game.name}</h3>
            </button>
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

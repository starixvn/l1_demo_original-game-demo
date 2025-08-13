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
  gameCards: Array<{ id: number; name: string }>;
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
    <div className="min-h-screen bg-gray-100 min-w-[1400px]">
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
        <div className="grid grid-cols-6 gap-2 w-full max-w-[1400px] mx-auto">
          {gameCards.map((game) => (
            <button
              key={game.id}
              onClick={() => handleGameClick(game)}
              className="bg-[#616161] h-[180px] rounded-lg p-2 text-white relative overflow-hidden flex flex-col justify-center items-center hover:bg-[#4a4a4a] transition-colors cursor-pointer"
            >
              <h3 className="font-bold text-xs text-center">{game.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

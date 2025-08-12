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
  sportCards: Array<{ id: number; name: string }>;
}

export default function DesktopLayout({
  navigationItems,
  sportCards,
}: DesktopLayoutProps) {
  const router = useRouter();

  const handleSportClick = (sport: { id: number; name: string }) => {
    // Redirect to the iframe page with sport parameters
    router.push(
      `/sport-iframe?id=${sport.id}&name=${encodeURIComponent(sport.name)}`
    );
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
          {sportCards.map((sport) => (
            <button
              key={sport.id}
              onClick={() => handleSportClick(sport)}
              className="bg-[#616161] h-[180px] rounded-lg p-2 text-white relative overflow-hidden flex flex-col justify-center items-center hover:bg-[#4a4a4a] transition-colors cursor-pointer"
            >
              <h3 className="font-bold text-xs text-center">{sport.name}</h3>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

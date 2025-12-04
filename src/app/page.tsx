"use client";

import { useScreenSize } from "./hooks/useScreenSize";
import MobileLayout from "./components/MobileLayout";
import DesktopLayout from "./components/DesktopLayout";
import One2BetLayout from "./components/12bet";
import { NavigationItems, BottomNavItems } from "./constants/navigation";
import { GameCards } from "./constants/games";
import configs from "../../configs";

export default function Home() {
  const { isMobile, isLoading } = useScreenSize();

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

  // Render OtherLayout if isOther is true
  if (configs.is12Bet) {
    return (
      <One2BetLayout navigationItems={NavigationItems} gameCards={GameCards} />
    );
  }

  // Render appropriate layout based on screen size
  if (isMobile) {
    return (
      <MobileLayout
        navigationItems={NavigationItems}
        gameCards={GameCards}
        bottomNavItems={BottomNavItems}
      />
    );
  }

  return (
    <DesktopLayout navigationItems={NavigationItems} gameCards={GameCards} />
  );
}

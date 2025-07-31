"use client";

import { useScreenSize } from "./hooks/useScreenSize";
import MobileLayout from "./components/MobileLayout";
import DesktopLayout from "./components/DesktopLayout";

export const NavigationItems = [
  { id: "sports", label: "Thể thao", icon: "sports-icon.png", active: false },
  {
    id: "sports2",
    label: "Orginial Games",
    icon: "esports-icon.png",
    active: true,
  },
  { id: "casino", label: "Casino", icon: "casino-icon.png", active: false },
  {
    id: "slots",
    label: "QUAY HŨ",
    icon: "slots-icon.png",
    active: false,
    isNew: true,
  },
  { id: "games", label: "Trò Chơi", icon: "games-icon.png", active: false },
  { id: "games", label: "Bắn Cá", icon: "games-icon.png", active: false },
  { id: "games", label: "Xó Số", icon: "games-icon.png", active: false },
  { id: "games", label: "Khuyến Mãi", icon: "games-icon.png", active: false },
  { id: "games", label: "VIP", icon: "games-icon.png", active: false },
  { id: "games", label: "Sự Kiện", icon: "games-icon.png", active: false },
];

export default function Home() {
  const { isMobile, isLoading } = useScreenSize();

  const sportCards = [
    { id: 1, name: "Crash" },
    {
      id: 2,
      name: "Se Die Multiplier",
    },
    { id: 3, name: "Baccarat Multiplier" },
    {
      id: 4,
      name: "Big Small Multiplier",
    },
    { id: 5, name: "Plinko" },
    { id: 6, name: "Se Die Single" },
    { id: 7, name: "Baccarat Single" },
    { id: 8, name: "Big Small Single" },
  ];

  const bottomNavItems = [
    { id: "home", label: "Trang chủ", icon: "home-dark.png", active: true },
    { id: "promotions", label: "Khuyến mãi", icon: "gift.png", active: false },
    { id: "chat", label: "Live Chat", icon: "livechat.png", active: false },
    { id: "account", label: "Tôi", icon: "me.png", active: false },
  ];

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

  // Render appropriate layout based on screen size
  if (isMobile) {
    return (
      <MobileLayout
        navigationItems={NavigationItems}
        sportCards={sportCards}
        bottomNavItems={bottomNavItems}
      />
    );
  }

  return (
    <DesktopLayout
      navigationItems={NavigationItems}
      sportCards={sportCards}
      bottomNavItems={bottomNavItems}
    />
  );
}

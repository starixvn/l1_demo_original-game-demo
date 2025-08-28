"use client";

import Image from "next/image";

interface NavigationBarProps {
  navigationItems: Array<{
    id: string;
    label: string;
    icon: string;
    active: boolean;
    isNew?: boolean;
  }>;
}

export default function DesktopNavigationBar({
  navigationItems,
}: NavigationBarProps) {
  return (
    <div className="bg-white text-[#0a1b38] py-2 h-[60px] flex items-center justify-between px-8 sticky top-[115px] z-10">
      <div className="flex justify-between items-center gap-8 w-full max-w-[1400px] mx-auto">
        <a href={"/"}>
          <Image src="/icons/home-icon.png" alt="home" width={34} height={34} />
        </a>
        {navigationItems.map((item) => (
          <a
            href={`/`}
            key={item.id}
            className="text-base font-semibold uppercase"
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

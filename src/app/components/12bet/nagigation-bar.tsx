"use client";

interface DesktopLayoutProps {
  navigationItems: Array<{
    id: string;
    label: string;
    icon: string;
    active: boolean;
    isNew?: boolean;
  }>;
}

export default function DesktopLayout({ navigationItems }: DesktopLayoutProps) {
  return (
    <div className="flex justify-between items-center w-full overflow-x-auto mx-auto h-[44px] gap-[2px] text-white sticky top-[69px] md:top-[99px] z-10">
      <a
        href={"/"}
        className="bg-[linear-gradient(180deg,#d93636_0,#c72222_48%,#ba0101_49%,#a60101)] h-[44px] w-full flex items-center justify-center"
      >
        <img
          src="https://banner.picasso12.com/c/d/6eb866e6c1.png?v=d46496"
          alt="home"
          className="mx-auto"
        />
      </a>
      {navigationItems.map((item) => (
        <a
          href={`/`}
          key={item.id}
          className="bg-[linear-gradient(180deg,#d93636_0,#c72222_48%,#ba0101_49%,#a60101)] h-[44px] w-full flex items-center justify-center text-center uppercase text-xs md:text-sm"
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}

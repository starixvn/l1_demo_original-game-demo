"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DeskHeader from "../components/DeskHeader";
import DesktopNavigationBar from "../components/NavigationBar";
import { NavigationItems } from "../page";

export default function SportIframePage() {
  const searchParams = useSearchParams();
  const sportName = searchParams.get("name");

  if (!sportName) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Sport</h1>
          <p>Sport information is missing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-dvh bg-black min-w-[1400px] flex flex-col">
      <DeskHeader />
      <DesktopNavigationBar navigationItems={NavigationItems} />
      <iframe
        src={`/demo-pages/${sportName.toLowerCase().replace(/\s+/g, "-")}`}
        className="w-full h-full border-0 flex-1"
        title={`${sportName} Game`}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [activeTab, setActiveTab] = useState("sports");

  const navigationItems = [
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
    { id: "games", label: "Trò C", icon: "games-icon.png", active: false },
  ];

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

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-[#0a1b38] text-white h-[56px] flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Image src="/nova-logo.png" alt="logo" width={100} height={100} />
        </div>
        <div className="text-right">
          <p className="text-sm">Xin Chào, bradytrang</p>
          <p className="text-lg font-bold">VND $75.62 (&apos;000)</p>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-blue-900 text-white">
        <div className="flex justify-between items-center">
          <Image
            src="/banners/banner.png"
            alt="promotional-banner"
            width={1200}
            height={400}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white p-4">
        <div className="flex gap-4 overflow-x-auto">
          {navigationItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-center min-w-[60px]"
            >
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center mb-1 ${
                  item.active ? "bg-[#1e3e77]" : "bg-[#d1d1d1]"
                }`}
              >
                <Image
                  src={`/icons/${item.icon}`}
                  alt={item.label}
                  width={24}
                  height={24}
                />
              </div>
              <span
                className={`text-xs text-center ${
                  item.active
                    ? "text-[#585858] border-b-3 rounded-xs border-[#1e3e77]"
                    : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Sport Cards Grid */}
      <div className="p-4">
        <div className="grid grid-cols-4 gap-2">
          {sportCards.map((sport) => (
            <div
              key={sport.id}
              className="bg-[#616161] h-[89px] rounded-lg p-3 text-white relative overflow-hidden flex flex-col justify-center items-center"
            >
              <h3 className="font-bold text-sm text-center">{sport.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
        <div className="flex justify-around py-2">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              className={`flex flex-col items-center py-1 px-2 ${
                item.active ? "text-[#0a1b38]" : "text-[#d1d1d1]"
              }`}
            >
              <span className="text-lg mb-1">
                <Image
                  src={`/icons/${item.icon}`}
                  alt={item.label}
                  width={24}
                  height={24}
                />
              </span>
              <span className="text-xs">{item.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

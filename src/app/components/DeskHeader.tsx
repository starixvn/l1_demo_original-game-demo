"use client";

import Image from "next/image";
import { useBalanceManager } from "../hooks/useBalanceManager";

export default function DeskHeader() {
  const { getDisplayBalance, getDisplayName } = useBalanceManager();

  return (
    <>
      {/* Header */}
      <div className="bg-[#0a1b38] text-white h-[115px] flex items-center justify-between px-8 sticky top-0 z-10">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto w-full">
          <a href={"/"} className="flex items-center gap-4">
            <Image src="/nova-logo.png" alt="logo" width={159} height={68} />
          </a>
          {/* Original Login Form - Commented for future use */}
          {/*
          <div className="flex flex-col items-center gap-4">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Tên đăng nhập"
                className="px-3 py-2 bg-[#1a2a4a] border border-white text-white placeholder-gray-400 text-sm w-[150px] rounded-[50px]"
              />
              <input
                type="password"
                placeholder="Mật khẩu"
                className="px-3 py-2 bg-[#1a2a4a] border border-white text-white placeholder-gray-400 text-sm  w-[150px] rounded-[50px]"
              />
              <button className="px-4 py-2 bg-[#648dd6] rounded-[50px] text-white text-sm font-medium">
                Đăng nhập
              </button>
              <button className="px-4 py-2 bg-[#ff7600] rounded-[50px] text-white text-sm font-medium">
                Đăng ký
              </button>
            </div>
            <div className="flex justify-start items-start gap-10 text-xs">
              <span>Quên ID hoặc mật khẩu?</span>
              <span className="flex items-center gap-1">+18008936296</span>
            </div>
          </div>
          */}

          {/* Logged-in User Section */}
          <div className="flex items-center gap-6">
            {/* User Profile */}
            <div className="flex items-center gap-2">
              <img
                src="https://banner.0814media.net/desktop/img/4.0/header-vintage.png?v=20250902060228"
                alt="vip-icon"
                className="w-16 h-16"
              />
              <span className="text-sm font-medium">Hello, {getDisplayName()}</span>
            </div>

            {/* Message Icon */}
            <div className="relative">
              <img
                src="https://banner.0814media.net/desktop/img/4.0/message.png?v=20250902060228"
                alt="message"
                className="w-8 h-6"
              />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                <span className="text-xs text-white font-bold"></span>
              </div>
            </div>

            {/* Vertical Line */}
            <div className="h-8 w-px bg-gray-600"></div>

            {/* Balance Section */}
            <div className="flex flex-col">
              <span className="text-sm">Balance</span>
              <span className="text-sm font-semibold">{getDisplayBalance()}</span>
            </div>

            {/* Deposit Button */}
            <button className="px-8 py-3 bg-[#ff7600] rounded-[50px] text-white text-sm font-medium">
              Deposit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

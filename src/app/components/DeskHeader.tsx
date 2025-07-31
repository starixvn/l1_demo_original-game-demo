"use client";

import Image from "next/image";

export default function DeskHeader() {
  return (
    <>
      {/* Header */}
      <div className="bg-[#0a1b38] text-white h-[115px] flex items-center justify-between px-8">
        <div className="flex items-center justify-between max-w-[1400px] mx-auto w-full">
          <a href={"/"} className="flex items-center gap-4">
            <Image src="/nova-logo.png" alt="logo" width={159} height={68} />
          </a>
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
        </div>
      </div>
    </>
  );
}

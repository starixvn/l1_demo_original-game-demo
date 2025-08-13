"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import configs from "../../../configs";

interface GamePopupProps {
  isOpen: boolean;
  onClose: () => void;
  gameName: string;
  isMobile?: boolean;
  gameId?: number;
}

export default function GamePopup({
  isOpen,
  onClose,
  gameName,
  gameId,
}: GamePopupProps) {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState("");
  const [playerId] = useState<string>(() =>
    searchParams.get("playerId") || Math.floor(Math.random() * 10000000).toString()
  );
  const hasSignedInRef = useRef(false);

  useEffect(() => {
    if (!hasSignedInRef.current && isOpen && gameName && playerId) {
      hasSignedInRef.current = true;
      (async () => {
        const resolvedGameId = gameId ?? 148;
        const response = await axios.post("/api/sign-in", {
          playerId,
          gameId: resolvedGameId,
          language: "en-US",
          currency: "INH",
          operatorId: configs.operatorId,
          operatorSecret: configs.operatorSecret,
        });
        const { redirectUrl } = response.data;
        setUrl(redirectUrl);
      })();
    }
  }, [isOpen, gameName, gameId, playerId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white w-full h-dvh flex flex-col`}>
        {/* Header */}
        <div className="flex justify-between items-center h-[50px] p-4 bg-[#2C2C2C] gap-2.5">
          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="bg-[#4C5356] hover:bg-[#33383A] rounded-lg w-[32px] h-[32px] flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="15"
                viewBox="0 0 10 15"
                fill="none"
              >
                <path
                  d="M1.18568 6.43376L6.6764 0.943038C7.26712 0.352321 8.22113 0.352321 8.81184 0.943038C9.40256 1.53376 9.40256 2.48776 8.81184 3.07848L4.38737 7.5L8.81184 11.9215C9.40256 12.5122 9.40256 13.4662 8.81184 14.057C8.22113 14.6477 7.26712 14.6477 6.6764 14.057L1.18568 8.56625C0.59792 7.97848 0.59792 7.02152 1.18568 6.43376Z"
                  fill="white"
                />
              </svg>
            </button>
            <span className="font-normal text-white text-base">
              {gameName}
            </span>
          </div>

          <div className="flex items-center gap-2 text-[#FFF600] text-base font-normal">
            20,000.00
          </div>
        </div>

        {/* Iframe Content */}
        <div className="flex-1">
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <iframe
              src={url}
              className="w-full h-full"
              title={`${gameName} Game`}
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
}



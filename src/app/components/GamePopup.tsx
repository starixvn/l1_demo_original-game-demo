"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";
import configs from "../../../configs";
import { IFRAME_MESSAGES } from "../constants/iframe-messages";

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
  const router = useRouter();
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

  useEffect(() => {
    if (!isOpen) return;
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        if (event.data.action === IFRAME_MESSAGES.BACK_TO_HOME) {
          onClose();
          router.push("/");
        }
      }
    };

    window.addEventListener("message", handleMessage, false);
    
    return () => {
      window.removeEventListener("message", handleMessage, false);
    };
  }, [isOpen, onClose, router]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white w-full h-dvh flex flex-col`}>
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



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
  const [language] = useState<string>(() =>
    searchParams.get("lang") || searchParams.get("language") || "en-US"
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
          language,
          currency: "INH",
          operatorId: configs.operatorId,
          operatorSecret: configs.operatorSecret,
        }, { params: { lang: language } });
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

  // Temporarily disable page zoom while the popup is open to prevent iOS auto-zoom on inputs
  useEffect(() => {
    if (!isOpen) return;

    const existingMeta = document.querySelector('meta[name="viewport"]') as HTMLMetaElement | null;
    const createdMeta = !existingMeta ? document.createElement('meta') : null;
    const metaEl = existingMeta || createdMeta!;
    const prevContent = existingMeta?.getAttribute('content') || '';

    if (createdMeta) {
      createdMeta.name = 'viewport';
      document.head.appendChild(createdMeta);
    }

    const parseTokens = (content: string) => {
      const map = new Map<string, string>();
      content.split(',').map(s => s.trim()).filter(Boolean).forEach(pair => {
        const [k, v] = pair.split('=');
        if (k) map.set(k, v || '');
      });
      return map;
    };

    const tokens = parseTokens(prevContent);
    if (!tokens.has('width')) tokens.set('width', 'device-width');
    if (!tokens.has('initial-scale')) tokens.set('initial-scale', '1');
    tokens.set('maximum-scale', '1');
    tokens.set('user-scalable', 'no');
    if (!tokens.has('viewport-fit')) tokens.set('viewport-fit', 'cover');

    const content = Array.from(tokens.entries()).map(([k, v]) => v ? `${k}=${v}` : k).join(', ');
    metaEl.setAttribute('content', content);

    return () => {
      if (createdMeta) {
        // Remove the meta we created
        createdMeta.parentNode?.removeChild(createdMeta);
      } else if (existingMeta) {
        // Restore previous content
        if (prevContent) existingMeta.setAttribute('content', prevContent);
        else existingMeta.removeAttribute('content');
      }
    };
  }, [isOpen]);

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



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
  const [playerId] = useState<string | undefined>(() =>
    searchParams.get("playerId") || undefined
  );
  const [language] = useState<string>(() =>
    searchParams.get("lang") || searchParams.get("language") || "en-US"
  );
  const [currency] = useState<string>(() =>
    searchParams.get("currency") || "INH"
  );
  const hasSignedInRef = useRef(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Reset state when game changes
  useEffect(() => {
    if (gameName && gameId) {
      // Reset the ref and URL when game changes
      hasSignedInRef.current = false;
      setUrl("");
    }
  }, [gameName, gameId]);

  useEffect(() => {
    if (!hasSignedInRef.current && isOpen && gameName && gameId) {
      hasSignedInRef.current = true;
      (async () => {
        const resolvedGameId = gameId ?? 148;
        const requestBody = {
          playerId, // Always include (undefined is fine, API handles fallback)
          gameId: resolvedGameId,
          language,
          currency,
          operatorId: configs.operatorId,
          operatorSecret: configs.operatorSecret,
        };

        const response = await axios.post("/api/sign-in", requestBody, { params: { lang: language, currency } });
        const { redirectUrl } = response.data;
        setUrl(redirectUrl);
      })();
    }
  }, [isOpen, gameName, gameId]);

  useEffect(() => {
    if (!isOpen) return;
    
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === 'object') {
        if (event.data.action === IFRAME_MESSAGES.BACK_TO_ORIGINAL_PAGE) {
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

  // Prevent drag reload and all dragging within popup
  useEffect(() => {
    if (!isOpen || !popupRef.current) return;

    const popupElement = popupRef.current;

    const preventAllDragging = (e: TouchEvent) => {
      // Prevent all touch move events within the popup to stop any dragging behavior
      if (e.type === 'touchmove') {
        e.preventDefault();
      }
    };

    // Add touch event listeners to the popup overlay to prevent any dragging
    popupElement.addEventListener('touchmove', preventAllDragging, { passive: false });

    // Also prevent dragging on the iframe container
    const iframeContainer = popupElement.querySelector('.flex-1') as HTMLElement;
    if (iframeContainer) {
      iframeContainer.addEventListener('touchmove', preventAllDragging, { passive: false });
    }

    return () => {
      // Clean up event listeners
      popupElement.removeEventListener('touchmove', preventAllDragging);
      if (iframeContainer) {
        iframeContainer.removeEventListener('touchmove', preventAllDragging);
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div ref={popupRef} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className={`bg-white w-full h-dvh flex flex-col`}>
        {/* Iframe Content */}
        <div className="flex-1 relative isolate">
          <div 
            className="w-full h-full bg-gray-100"
            style={{ 
              contain: 'layout style paint',
              isolation: 'isolate'
            }}
          >
            <iframe
              src={url}
              className="w-full h-full border-0 block"
              title={`${gameName} Game`}
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
              sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-pointer-lock"
              style={{ 
                colorScheme: 'normal',
                display: 'block',
                minHeight: '100%',
                overflow: 'hidden'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}



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
  const iframeRef = useRef<HTMLIFrameElement>(null);

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

  // Temporarily disable page zoom and add body class while the popup is open to prevent iOS auto-zoom and pull-to-refresh
  useEffect(() => {
    if (!isOpen) {
      // Remove the class when popup closes
      document.body.classList.remove('game-popup-open');
      return;
    }

    // Add the class when popup opens
    document.body.classList.add('game-popup-open');

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
      // Remove the class when cleaning up
      document.body.classList.remove('game-popup-open');
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

  // Comprehensive pull-to-refresh prevention for iOS Safari
  useEffect(() => {
    if (!isOpen) return;

    const preventDefault = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
    };

    // Prevent all touch events that could trigger pull-to-refresh
    const handleTouchStart = (e: TouchEvent) => {
      if (window.scrollY === 0) {
        preventDefault(e);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (window.scrollY === 0 && e.touches.length === 1) {
        preventDefault(e);
      }
    };

    // Add event listeners at all levels with capture
    const options = { passive: false, capture: true };

    document.addEventListener('touchstart', handleTouchStart, options);
    document.addEventListener('touchmove', handleTouchMove, options);
    document.body.addEventListener('touchstart', handleTouchStart, options);
    document.body.addEventListener('touchmove', handleTouchMove, options);
    window.addEventListener('touchstart', handleTouchStart, options);
    window.addEventListener('touchmove', handleTouchMove, options);

    // Also prevent wheel events (trackpad/touchpad pull gestures)
    const handleWheel = (e: WheelEvent) => {
      if (window.scrollY === 0 && e.deltaY < 0) {
        preventDefault(e);
      }
    };

    document.addEventListener('wheel', handleWheel, options);
    window.addEventListener('wheel', handleWheel, options);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart, true);
      document.removeEventListener('touchmove', handleTouchMove, true);
      document.body.removeEventListener('touchstart', handleTouchStart, true);
      document.body.removeEventListener('touchmove', handleTouchMove, true);
      window.removeEventListener('touchstart', handleTouchStart, true);
      window.removeEventListener('touchmove', handleTouchMove, true);
      document.removeEventListener('wheel', handleWheel, true);
      window.removeEventListener('wheel', handleWheel, true);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Invisible overlay to capture touch events before they reach the iframe */}
      <div
        className="absolute inset-0 pointer-events-auto"
        style={{
          touchAction: 'pan-y',
          overscrollBehavior: 'none',
          overscrollBehaviorY: 'none'
        }}
        onTouchStart={(e) => {
          // Capture touch start events to prevent pull-to-refresh
          if (window.scrollY === 0) {
            e.preventDefault();
          }
        }}
        onTouchMove={(e) => {
          // Prevent vertical scrolling when at top
          if (window.scrollY === 0 && e.touches[0].clientY > 0) {
            e.preventDefault();
          }
        }}
      />
      <div className={`bg-white w-full h-dvh flex flex-col relative`}>
        {/* Iframe Content */}
        <div className="flex-1 relative isolate">
          <div
            className="w-full h-full bg-gray-100 overflow-hidden"
            style={{
              contain: 'layout style paint',
              isolation: 'isolate',
              overscrollBehavior: 'none',
              overscrollBehaviorY: 'none',
              WebkitOverflowScrolling: 'auto',
              touchAction: 'pan-x pan-y'
            }}
          >
            <iframe
              ref={iframeRef}
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
                overflow: 'hidden',
                overscrollBehavior: 'none',
                overscrollBehaviorY: 'none',
                touchAction: 'pan-x pan-y'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}



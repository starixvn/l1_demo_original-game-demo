"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import axios from "axios";
import DeskHeader from "../components/DeskHeader";
import DesktopNavigationBar from "../components/NavigationBar";
import { NavigationItems } from "../constants/navigation";
import configs from "../../../configs";
import { IFRAME_MESSAGES } from "../constants/iframe-messages";

function GameIframeContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const gameName = searchParams.get("name");
  const gameId = searchParams.get("id");
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

  useEffect(() => {
    if (!hasSignedInRef.current && gameName) {
      hasSignedInRef.current = true;
      handleSignIn();
    }
  }, [gameName]);

  // Listen for messages from the iframe (desktop flow)
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && typeof event.data === "object") {
        if (event.data.action === IFRAME_MESSAGES.BACK_TO_ORIGINAL_PAGE) {
          router.push("/");
        }
      }
    };

    window.addEventListener("message", handleMessage, false);
    return () => {
      window.removeEventListener("message", handleMessage, false);
    };
  }, [router]);

  const handleSignIn = async () => {
    if (!gameName) return;
    const resolvedGameId = gameId ? Number(gameId) : 148;

    const requestBody = {
      playerId, // Always include (undefined is fine, API handles fallback)
      gameId: resolvedGameId,
      language,
      currency,
      operatorId: configs.operatorId,
      operatorSecret: configs.operatorSecret,
    };

    const response = await axios.post(`/api/sign-in?lang=${encodeURIComponent(language)}&currency=${encodeURIComponent(currency)}` , requestBody);

    const { redirectUrl } = response.data;
    setUrl(redirectUrl);
  };

  if (!gameName) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Game</h1>
          <p>Game information is missing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-black flex flex-col relative">
      <DeskHeader />
      <DesktopNavigationBar navigationItems={NavigationItems} />
      <iframe
        src={url}
        className="w-full h-full border-0 flex-1 block"
        title={`${gameName} Game`}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
      />
    </div>
  );
}

export default function GameIframePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <GameIframeContent />
    </Suspense>
  );
}

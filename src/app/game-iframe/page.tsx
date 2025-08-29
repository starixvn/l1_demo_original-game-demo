"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import axios from "axios";
import DeskHeader from "../components/DeskHeader";
import DesktopNavigationBar from "../components/NavigationBar";
import { NavigationItems } from "../constants/navigation";
import configs from "../../../configs";

function GameIframeContent() {
  const searchParams = useSearchParams();
  const gameName = searchParams.get("name");
  const gameId = searchParams.get("id");
  const [url, setUrl] = useState("");
  const [playerId] = useState<string>(() =>
    searchParams.get("playerId") || Math.floor(Math.random() * 10000000).toString()
  );
  const [language] = useState<string>(() =>
    searchParams.get("lang") || searchParams.get("language") || "en-US"
  );

  const hasSignedInRef = useRef(false);

  useEffect(() => {
    if (!hasSignedInRef.current && gameName && playerId) {
      hasSignedInRef.current = true;
      handleSignIn();
    }
  }, [gameName, playerId]);

  const handleSignIn = async () => {
    if (!gameName) return;
    const resolvedGameId = gameId ? Number(gameId) : 148;
    const response = await axios.post(`/api/sign-in?lang=${encodeURIComponent(language)}` , {
      playerId,
      gameId: resolvedGameId,
      language,
      currency: "INH",
      operatorId: configs.operatorId,
      operatorSecret: configs.operatorSecret,
    });

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
    <div className="w-full h-dvh bg-black flex flex-col">
      <DeskHeader />
      <DesktopNavigationBar navigationItems={NavigationItems} />
      <iframe
        src={url}
        className="w-full h-full border-0 flex-1"
        title={`${gameName} Game`}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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

"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useState, useEffect, useRef } from "react";
import axios from "axios";
import DeskHeader from "../components/DeskHeader";
import DesktopNavigationBar from "../components/NavigationBar";
import { NavigationItems } from "../constants/navigation";
import { getGameId } from "../constants/gameIds";
import configs from "../../../configs";

function SportIframeContent() {
  const searchParams = useSearchParams();
  const sportName = searchParams.get("name");
  const [url, setUrl] = useState("");
  const [playerId] = useState<string>(() =>
    searchParams.get("playerId") || Math.floor(Math.random() * 10000000).toString()
  );

  const hasSignedInRef = useRef(false);

  useEffect(() => {
    if (!hasSignedInRef.current && sportName && playerId) {
      hasSignedInRef.current = true;
      handleSignIn();
    }
  }, [sportName, playerId]);

  const handleSignIn = async () => {
    if (!sportName) return;

    const normalizedGameName = sportName.toLowerCase().replace(/\s+/g, "-");
    const gameId = getGameId(normalizedGameName);

    const response = await axios.post("/api/sign-in", {
      playerId,
      gameId,
      language: "en-US",
      currency: "INH",
      operatorId: configs.operatorId,
      operatorSecret: configs.operatorSecret,
    });

    const { redirectUrl } = response.data;
    setUrl(redirectUrl);
  };

  if (!sportName) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Sport</h1>
          <p>Sport information is missing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-dvh bg-black min-w-[1400px] flex flex-col">
      <DeskHeader />
      <DesktopNavigationBar navigationItems={NavigationItems} />
      <iframe
        src={url}
        className="w-full h-full border-0 flex-1"
        title={`${sportName} Game`}
        allowFullScreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
}

export default function SportIframePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <SportIframeContent />
    </Suspense>
  );
}

import { NextResponse } from "next/server";
import configs from "../../../../configs";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const browserUserAgent = request.headers.get("user-agent");
    const { playerId, gameId, language, currency, operatorId, operatorSecret } =
      body;

    // Read language from query params to allow override via URL (?lang=xx or ?language=xx)
    const url = new URL(request.url);
    const urlLang =
      url.searchParams.get("lang") || url.searchParams.get("language");
    const finalLanguage = urlLang || language || "en-US";

    // Read currency from query params to allow override via URL (?currency=xx)
    const urlCurrency = url.searchParams.get("currency");
    const finalCurrency = urlCurrency || currency || "INH";

    // Read playerId from query params first, then body, then random as final fallback
    const urlPlayerId = url.searchParams.get("playerId");
    const finalPlayerId =
      urlPlayerId ||
      playerId ||
      Math.floor(Math.random() * 10000000).toString();
    const params = {
      seq: "d,y,lumi",
      siteId: "4100300",
      browserUserAgent,
      currency: finalCurrency,
      language: finalLanguage,
      ip: "0",
      playerId: finalPlayerId,
      playerName: `username_${finalPlayerId}`,
      gameId: gameId || 148,
      appType: 10,
      siteName: configs.is12Bet ? "12bet" : "nova88",
      auth: {
        operatorId: operatorId || "ONEworksVGCash",
        operatorSecret: operatorSecret || "VG@SC123",
      },
      operatorToken: "ONEworksVGCashToken",
      ref: "m_direct",
    };

    const operator = operatorId === "PFF" ? "pff" : "ow";
    // Validate the incoming configuration
    const responseBalance = await axios.post(
      `${configs.owApiUrl}/SetDefaultBalance?playerId=${finalPlayerId}&operator=${operator}&balance=20000&maxBet=20000&siteId=4100300`
    );
    if (responseBalance.status !== 200) {
      return;
    }
    const responseSSO = await axios.post(
      `${configs.simulatorUrl}/signin/sso`,
      params
    );
    // Pass-through SSO response
    return NextResponse.json(responseSSO.data);
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Failed to process request";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

interface BetHistory {
  time: string;
  roundId: string;
  betAmount: string;
  win: string;
}

interface PlayerBet {
  player: string;
  betAmount: string;
  winAmount: string;
}

export default function SeDieMultiplierDemo() {
  const [selectedChip, setSelectedChip] = useState(10);
  const [totalBet, setTotalBet] = useState(20000);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [isGameActive, setIsGameActive] = useState(false);
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"myBets" | "highRoller">("myBets");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const chips = [1, 10, 50, 100, 500, 1000];

  const gameHistory = [
    { type: "O", color: "bg-gray-500" },
    { type: "O", color: "bg-gray-500" },
    { type: "O", color: "bg-gray-500" },
    { type: "E", color: "bg-gray-500" },
    { type: "O", color: "bg-gray-500" },
    { type: "E", color: "bg-gray-500" },
    { type: "E", color: "bg-gray-500" },
    { type: "E", color: "bg-gray-500" },
    { type: "E", color: "bg-gray-500" },
  ];

  const bettingOptions = [
    { name: "EVEN", payout: "1:1.97", bet: null },
    { name: "ODD", payout: "1:1.97", bet: 10 },
  ];

  const combinationOptions = [
    { pattern: [1, 0, 0, 1], payout: "1:1.97", bet: 10 },
    { pattern: [1, 1, 0, 0], payout: "1:1.97", bet: null },
    { pattern: [1, 0, 1, 0], payout: "1:1.97", bet: null },
    { pattern: [0, 1, 0, 1], payout: "1:1.97", bet: null },
    { pattern: [1, 1, 1, 1], payout: "1:1.97", bet: null },
  ];

  const playerBets: PlayerBet[] = [
    { player: "john_smith92", betAmount: "20,000.00", winAmount: "200,000.00" },
    { player: "john_smith92", betAmount: "20,000.00", winAmount: "200,000.00" },
    { player: "john_smith92", betAmount: "20,000.00", winAmount: "200,000.00" },
  ];

  const betHistory: BetHistory[] = [
    {
      time: "07-09-2025 12:59:40 PM",
      roundId: "123456",
      betAmount: "2,000",
      win: "2,000",
    },
    {
      time: "07-09-2025 12:59:40 PM",
      roundId: "123457",
      betAmount: "2,000",
      win: "2,000",
    },
    {
      time: "07-09-2025 12:59:40 PM",
      roundId: "123458",
      betAmount: "2,000",
      win: "2,000",
    },
    {
      time: "07-09-2025 12:59:40 PM",
      roundId: "123459",
      betAmount: "2,000",
      win: "2,000",
    },
    {
      time: "07-09-2025 12:59:40 PM",
      roundId: "123460",
      betAmount: "2,000",
      win: "2,000",
    },
    {
      time: "07-09-2025 12:59:40 PM",
      roundId: "123461",
      betAmount: "2,000",
      win: "2,000",
    },
    {
      time: "07-09-2025 12:59:40 PM",
      roundId: "123462",
      betAmount: "2,000",
      win: "2,000",
    },
    {
      time: "07-09-2025 12:59:40 PM",
      roundId: "123463",
      betAmount: "2,000",
      win: "2,000",
    },
    {
      time: "07-09-2025 12:59:40 PM",
      roundId: "123464",
      betAmount: "2,000",
      win: "2,000",
    },
    {
      time: "07-09-2025 12:59:40 PM",
      roundId: "123465",
      betAmount: "2,000",
      win: "2,000",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setIsGameActive(false);
          return 15;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleChipSelect = (chip: number) => {
    setSelectedChip(chip);
  };

  const handleBetPlace = (option: string) => {
    setSelectedBet(option);
    setTotalBet((prev) => prev + selectedChip);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const getChipColor = (value: number) => {
    switch (value) {
      case 1:
        return "bg-gray-500";
      case 10:
        return "bg-orange-500";
      case 50:
        return "bg-purple-500";
      case 100:
        return "bg-blue-500";
      case 500:
        return "bg-red-500";
      case 1000:
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getChipTextColor = (value: number) => {
    return value === 1000 ? "text-black" : "text-white";
  };

  // Theme-based class names
  const bgPrimary = isDarkMode ? "bg-gray-900" : "bg-white";
  const bgSecondary = isDarkMode ? "bg-gray-800" : "bg-gray-100";
  const bgTertiary = isDarkMode ? "bg-gray-700" : "bg-gray-200";
  const bgGame = isDarkMode ? "bg-blue-900" : "bg-blue-100";
  const bgGameCard = isDarkMode ? "bg-blue-800" : "bg-blue-200";
  const textPrimary = isDarkMode ? "text-white" : "text-gray-900";
  const textSecondary = isDarkMode ? "text-gray-300" : "text-gray-600";
  const borderColor = isDarkMode ? "border-gray-600" : "border-gray-300";

  return (
    <div className={`min-h-screen ${bgPrimary} ${textPrimary}`}>
      {/* Navigation Header */}
      <div className={`${bgSecondary} h-12 flex items-center justify-end px-4`}>
        <div className="flex items-center gap-2">
          <div
            className={`w-8 h-8 ${bgTertiary} flex items-center justify-center cursor-pointer hover:opacity-80`}
            onClick={toggleTheme}
          >
            <span className={textPrimary}>{isDarkMode ? "☀️" : "🌙"}</span>
          </div>
        </div>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <div className={`${bgSecondary} p-4 border-b ${borderColor}`}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-semibold">Settings</span>
            <button
              onClick={() => setShowSettings(false)}
              className={`w-6 h-6 ${bgTertiary} rounded flex items-center justify-center`}
            >
              <span className={textPrimary}>×</span>
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className={textSecondary}>Theme Mode</span>
              <button
                onClick={toggleTheme}
                className={`w-12 h-6 ${
                  isDarkMode ? "bg-blue-600" : "bg-gray-300"
                } rounded-full relative transition-colors`}
              >
                <div
                  className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${
                    isDarkMode ? "translate-x-6" : "translate-x-1"
                  }`}
                ></div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Game History Roadmap */}
      <div className={`${bgSecondary} p-4`}>
        <div className="flex gap-2 overflow-x-auto">
          {gameHistory.map((item, index) => (
            <div
              key={index}
              className={`w-6 h-6 ${item.color} rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0`}
            >
              {item.type}
            </div>
          ))}
        </div>
      </div>

      {/* Game Area */}
      <div className={`${bgGame} p-4 relative`}>
        {/* Cosmic background pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 left-4 w-2 h-2 bg-blue-300 rounded-full"></div>
          <div className="absolute top-8 right-8 w-1 h-1 bg-blue-300 rounded-full"></div>
          <div className="absolute bottom-4 left-8 w-1 h-1 bg-blue-300 rounded-full"></div>
          <div className="absolute bottom-8 right-4 w-2 h-2 bg-blue-300 rounded-full"></div>
        </div>

        {/* Central Game Element */}
        <div className="flex justify-center mb-6">
          <div className="w-32 h-32 bg-white rounded-full border-4 border-gray-300 flex items-center justify-center">
            <div className="grid grid-cols-2 gap-4 w-20 h-20">
              <div className="w-6 h-6 bg-red-500 rounded-full"></div>
              <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full"></div>
              <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full"></div>
              <div className="w-6 h-6 bg-red-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Main Betting Options */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {bettingOptions.map((option, index) => (
            <div
              key={index}
              className={`${bgGameCard} rounded-lg p-4 relative cursor-pointer hover:opacity-80 transition-opacity`}
              onClick={() => handleBetPlace(option.name)}
            >
              <div className="flex items-center justify-center mb-2">
                <div className="w-4 h-4 bg-white rounded-full mr-2"></div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold">{option.name}</div>
                <div className={`text-sm ${textSecondary}`}>
                  {option.payout}
                </div>
              </div>
              {option.bet && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {option.bet}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Combination Betting Options */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {combinationOptions.map((option, index) => (
            <div
              key={index}
              className={`${bgGameCard} rounded-lg p-3 relative cursor-pointer hover:opacity-80 transition-opacity ${
                index === 1 ? "col-span-1 row-span-2" : ""
              }`}
              onClick={() => handleBetPlace(`combination-${index}`)}
            >
              <div className="grid grid-cols-2 gap-1 mb-2">
                {option.pattern.map((dot, dotIndex) => (
                  <div
                    key={dotIndex}
                    className={`w-3 h-3 rounded-full ${
                      dot === 1
                        ? "bg-red-500"
                        : "bg-white border border-gray-300"
                    }`}
                  ></div>
                ))}
              </div>
              <div className="text-center">
                <div className="text-xs">{option.payout}</div>
              </div>
              {option.bet && (
                <div className="absolute bottom-1 right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-xs font-bold">
                  {option.bet}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Betting Controls */}
      <div className={`${bgSecondary} p-4`}>
        {/* Timer */}
        <div className="mb-4">
          <div className="text-sm mb-2">Start at 15s</div>
          <div className={`w-full ${bgTertiary} rounded-full h-2`}>
            <div
              className="bg-green-500 h-2 rounded-full transition-all duration-1000"
              style={{ width: `${(timeRemaining / 15) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Chip Selection */}
        <div className="mb-4">
          <div className="flex gap-2 overflow-x-auto">
            <div
              className={`w-6 h-6 ${bgTertiary} rounded-full flex items-center justify-center text-xs`}
            >
              ←
            </div>
            {chips.map((chip) => (
              <div
                key={chip}
                className={`w-10 h-10 ${getChipColor(
                  chip
                )} rounded-full flex items-center justify-center text-xs font-bold ${getChipTextColor(
                  chip
                )} cursor-pointer hover:opacity-80 transition-opacity ${
                  selectedChip === chip ? "ring-2 ring-white" : ""
                }`}
                onClick={() => handleChipSelect(chip)}
              >
                {chip >= 1000 ? `${chip / 1000}K` : chip}
              </div>
            ))}
            <div
              className={`w-6 h-6 ${bgTertiary} rounded-full flex items-center justify-center text-xs`}
            >
              →
            </div>
          </div>
        </div>

        {/* Total Bet and Controls */}
        <div className="flex items-center gap-4">
          <div className={`${bgTertiary} rounded-lg p-3 flex-1`}>
            <div className={`text-xs ${textSecondary}`}>Total Bet</div>
            <div className="text-lg font-bold">{totalBet.toLocaleString()}</div>
          </div>
          <div className="flex gap-2">
            <div
              className={`w-8 h-8 ${bgTertiary} rounded flex items-center justify-center`}
            >
              <span className={`text-sm`}>🔊</span>
            </div>
            <div
              className={`w-8 h-8 ${bgTertiary} rounded flex items-center justify-center`}
            >
              <span className={`text-sm`}>?</span>
            </div>
            <div
              className={`w-8 h-8 ${bgTertiary} rounded flex items-center justify-center`}
            >
              <span className={`text-sm`}>✓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Player Bets */}
      <div className={`${bgSecondary} p-4 mb-4`}>
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm">2 players</span>
          </div>
          <span className="text-sm">#123456</span>
        </div>
        <div className={`${bgTertiary} rounded-lg p-3`}>
          <div className="grid grid-cols-3 gap-4 text-xs font-semibold mb-2">
            <div>Player</div>
            <div>Bet Amount</div>
            <div>Win Amount</div>
          </div>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {playerBets.map((bet, index) => (
              <div key={index} className="grid grid-cols-3 gap-4 text-xs">
                <div>{bet.player}</div>
                <div>{bet.betAmount}</div>
                <div>{bet.winAmount}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Personal Bet History */}
      <div className={`${bgSecondary} p-4`}>
        {/* Tabs */}
        <div className="flex mb-4">
          <button
            className={`flex-1 py-2 text-sm font-semibold border-b-2 ${
              activeTab === "myBets"
                ? "border-green-500 text-green-500"
                : `${borderColor} ${textSecondary}`
            }`}
            onClick={() => setActiveTab("myBets")}
          >
            My Bets
          </button>
          <button
            className={`flex-1 py-2 text-sm font-semibold border-b-2 ${
              activeTab === "highRoller"
                ? "border-green-500 text-green-500"
                : `${borderColor} ${textSecondary}`
            }`}
            onClick={() => setActiveTab("highRoller")}
          >
            High Roller
          </button>
        </div>

        {/* History Table */}
        <div className={`${bgTertiary} rounded-lg p-3`}>
          <div className="grid grid-cols-4 gap-4 text-xs font-semibold mb-2">
            <div>Time</div>
            <div>Round ID</div>
            <div>Bet Amount</div>
            <div>Win</div>
          </div>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {betHistory.map((bet, index) => (
              <div key={index} className="grid grid-cols-4 gap-4 text-xs">
                <div>{bet.time}</div>
                <div className="text-blue-400">{bet.roundId}</div>
                <div>{bet.betAmount}</div>
                <div>{bet.win}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { ChipValues, SeDieBettingOptions, SeDieCombinationOptions, DefaultGameHistory } from "../../constants/gaming";


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

export default function SeDieSingleplayerDemo() {
  const [selectedChip, setSelectedChip] = useState(10);
  const [totalBet, setTotalBet] = useState(20000);
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [isGameActive, setIsGameActive] = useState(false);
  const [selectedBet, setSelectedBet] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"myBets" | "highRoller">("myBets");
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const chips = ChipValues;
  const gameHistory = DefaultGameHistory;
  const bettingOptions = SeDieBettingOptions;
  const combinationOptions = SeDieCombinationOptions;



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
          {SeDieCombinationOptions.map((option, index) => (
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
      </div>
    </div>
  );
}





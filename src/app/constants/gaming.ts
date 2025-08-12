// Shared gaming constants across different game types

export const ChipValues = [1, 10, 50, 100, 500, 1000];

export const SeDieBettingOptions = [
  { name: "EVEN", payout: "1:1.97", bet: null },
  { name: "ODD", payout: "1:1.97", bet: 10 },
];

export const SeDieCombinationOptions = [
  { pattern: [1, 0, 0, 1], payout: "1:1.97", bet: 10 },
  { pattern: [1, 1, 0, 0], payout: "1:1.97", bet: null },
  { pattern: [1, 0, 1, 0], payout: "1:1.97", bet: null },
  { pattern: [0, 1, 0, 1], payout: "1:1.97", bet: null },
  { pattern: [1, 1, 1, 1], payout: "1:1.97", bet: null },
];

// Default game history pattern (would be replaced by API data in production)
export const DefaultGameHistory = [
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

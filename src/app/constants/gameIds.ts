export const GameIdMapping: Record<string, number> = {
  "se-die-multiplier": 148,
  "se-die-single": 149,
  "baccarat-multiplier": 150,
  "baccarat-single": 151,
  "big-small-multiplier": 152,
  "big-small-single": 153,
  crash: 154,
  dice: 155,
  plinko: 156,
};

// Helper function to get game ID by name
export function getGameId(gameName: string): number {
  const normalizedName = gameName.toLowerCase().replace(/\s+/g, "-");
  return GameIdMapping[normalizedName] || 148; // Default fallback ID
}

// Helper function to get all available games
export function getAllGameNames(): string[] {
  return Object.keys(GameIdMapping);
}

export interface LevelInfo {
  current: string;
  next: string | null;
  currentTarget: number;
  nextTarget: number;
}

export const getLevelInfo = (drives: number): LevelInfo => {
  if (drives >= 20) {
    return {
      current: "Elite",
      next: null,
      currentTarget: 20,
      nextTarget: 20,
    };
  }

  if (drives >= 12) {
    return {
      current: "Platinum",
      next: "Elite",
      currentTarget: 12,
      nextTarget: 20,
    };
  }

  if (drives >= 8) {
    return {
      current: "Gold",
      next: "Platinum",
      currentTarget: 8,
      nextTarget: 12,
    };
  }

  if (drives >= 4) {
    return {
      current: "Silver",
      next: "Gold",
      currentTarget: 4,
      nextTarget: 8,
    };
  }

  return {
    current: "Bronze",
    next: "Silver",
    currentTarget: 0,
    nextTarget: 4,
  };
};

export const LEVEL_STYLES: Record<string, string> = {
  Bronze: "text-orange-400",
  Silver: "text-gray-300",
  Gold: "text-yellow-400",
  Platinum: "text-emerald-400",
  Elite: "text-purple-400",
};
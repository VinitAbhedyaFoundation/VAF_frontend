import { BADGES } from "@/constants/badges";

export interface BadgeInfo {
  current: string;
  next: string | null;
  currentTarget: number;
  nextTarget: number;
}

export function getBadgeInfo(drives: number): BadgeInfo {
    type Badge = (typeof BADGES)[number]; 
  let currentBadge: Badge = BADGES[0];
  let nextBadge: Badge | null = BADGES[1] ?? null;

  for (let i = 0; i < BADGES.length; i++) {
    if (drives >= BADGES[i].minDrives) {
      currentBadge = BADGES[i];
      nextBadge = BADGES[i + 1] ?? null;
    } else {
      break;
    }
  }

  return {
    current: currentBadge.name,
    next: nextBadge?.name ?? null,
    currentTarget: currentBadge.minDrives,
    nextTarget: nextBadge?.minDrives ?? currentBadge.minDrives,
  };
}
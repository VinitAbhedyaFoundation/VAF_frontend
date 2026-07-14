import { getBadgeInfo } from "@/utils/badge";

export interface LevelInfo {
  current: string;
  next: string | null;
  currentTarget: number;
  nextTarget: number;
}

export const getLevelInfo = (
  drives: number,
): LevelInfo => {
  return getBadgeInfo(drives);
};

export const LEVEL_STYLES: Record<string, string> = {
  Bronze: "text-amber-400",
  Silver: "text-slate-300",
  Gold: "text-yellow-400",
  Platinum: "text-cyan-400",
  Diamond: "text-violet-400",
};
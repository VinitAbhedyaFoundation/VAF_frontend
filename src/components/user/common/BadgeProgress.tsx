import type { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Award,
    CheckCircle2,
    PartyPopper,
} from "lucide-react";

import type { LevelInfo } from "@/components/user/utils/level";

interface BadgeProgressProps {
    levelInfo: LevelInfo;
    drives: number;
    /** Label for whatever is being counted (e.g. "Drives", "Hours", "Kg") */
    metricLabel?: string;
}

/** Fallback icon per badge tier, keyed by lowercase badge name. */
const BADGE_ICONS: Record<string, string> = {
    bronze: "🥉",
    silver: "🥈",
    gold: "🥇",
    platinum: "💎",
};

/** Fallback color classes per badge tier, keyed by lowercase badge name. */
const BADGE_COLORS: Record<
    string,
    { text: string; bar: string; ring: string; bg: string }
> = {
    bronze: {
        text: "text-amber-300",
        bar: "from-amber-500 to-amber-300",
        ring: "border-amber-400/20",
        bg: "bg-amber-500/10",
    },
    silver: {
        text: "text-slate-300",
        bar: "from-slate-400 to-slate-200",
        ring: "border-slate-300/20",
        bg: "bg-slate-400/10",
    },
    gold: {
        text: "text-yellow-300",
        bar: "from-yellow-400 to-yellow-200",
        ring: "border-yellow-400/20",
        bg: "bg-yellow-500/10",
    },
    platinum: {
        text: "text-cyan-300",
        bar: "from-cyan-400 to-cyan-200",
        ring: "border-cyan-400/20",
        bg: "bg-cyan-500/10",
    },
};

const DEFAULT_COLOR = {
    text: "text-emerald-300",
    bar: "from-emerald-400 to-green-300",
    ring: "border-emerald-400/20",
    bg: "bg-emerald-500/10",
};

const getBadgeIcon = (name: string) => BADGE_ICONS[name.toLowerCase()] ?? "🏅";
const getBadgeColor = (name: string) =>
    BADGE_COLORS[name.toLowerCase()] ?? DEFAULT_COLOR;

const BadgeProgress: FC<BadgeProgressProps> = ({
    levelInfo,
    drives,
    metricLabel = "Drives",
}) => {
    const progress =
        levelInfo.next === null
            ? 100
            : Math.min(
                  100,
                  Math.max(
                      0,
                      ((drives - levelInfo.currentTarget) /
                          (levelInfo.nextTarget - levelInfo.currentTarget)) *
                          100
                  )
              );

    const remaining =
        levelInfo.next === null
            ? 0
            : Math.max(0, levelInfo.nextTarget - drives);

    const isMaxed = levelInfo.next === null;
    const justUnlocked = !isMaxed && progress === 100;
    const color = getBadgeColor(levelInfo.current);

    return (
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl shadow-black/10">
            <div className={`flex items-center gap-2 ${color.text} mb-6`}>
                <Award size={18} />
                <span className="text-xs uppercase tracking-[0.25em] font-bold">
                    Badge Progress
                </span>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-sm text-slate-300 mb-1">
                        Current Badge
                    </p>

                    <h3 className="text-4xl font-black flex items-center gap-2">
                        <span>{getBadgeIcon(levelInfo.current)}</span>
                        <span>{levelInfo.current}</span>
                    </h3>

                    <p className="mt-1 text-xs text-slate-400">
                        Complete {levelInfo.currentTarget} {metricLabel.toLowerCase()}
                    </p>
                </div>

                {levelInfo.next && (
                    <div className="text-right">
                        <p className="text-xs text-slate-400">
                            Next Badge
                        </p>

                        <div className="flex items-center justify-end gap-1 mt-1 font-bold text-white">
                            <ArrowRight size={15} />
                            <span>{getBadgeIcon(levelInfo.next)}</span>
                            {levelInfo.next}
                        </div>
                    </div>
                )}
            </div>

            {levelInfo.next ? (
                <>
                    <div className="mb-2 flex justify-between text-sm text-slate-300">
                        <span>
                            {drives} / {levelInfo.nextTarget} {metricLabel}
                        </span>

                        <span className="tabular-nums">
                            {Math.round(progress)}% &middot; {remaining} Remaining
                        </span>
                    </div>

                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                            className={`h-full rounded-full bg-gradient-to-r ${color.bar}`}
                        />
                    </div>

                    <AnimatePresence>
                        {justUnlocked ? (
                            <motion.p
                                initial={{ opacity: 0, y: -4 }}
                                animate={{ opacity: 1, y: 0 }}
                                className={`mt-5 rounded-2xl ${color.bg} border ${color.ring} px-4 py-3 text-sm ${color.text} flex items-center gap-2`}
                            >
                                <PartyPopper size={16} />
                                <span>
                                    New badge unlocked: <strong>{levelInfo.next}</strong>!
                                </span>
                            </motion.p>
                        ) : (
                            <p className={`mt-5 rounded-2xl ${color.bg} border ${color.ring} px-4 py-3 text-sm ${color.text}`}>
                                Complete{" "}
                                <strong>{remaining} more {metricLabel.toLowerCase()}{remaining !== 1 ? "" : ""}</strong>{" "}
                                to unlock{" "}
                                <strong>{levelInfo.next}</strong>.
                            </p>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 p-4">
                    <div className="flex items-center gap-2 text-emerald-300">
                        <CheckCircle2 size={18} />

                        <span className="font-bold">
                            Maximum badge unlocked!
                        </span>
                    </div>

                    <p className="mt-2 text-sm text-slate-300">
                        You've reached the highest volunteer badge.
                        Keep participating to inspire others.
                    </p>
                </div>
            )}

            <div className="mt-6 border-t border-white/10 pt-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                    🏅 How badges work
                </p>
                <ul className="space-y-1 text-xs text-slate-400 list-disc list-inside">
                    <li>Badges are awarded automatically after an administrator marks your attendance.</li>
                    <li>Each completed {metricLabel.toLowerCase().replace(/s$/, "")} increases your progress.</li>
                    <li>The more you complete, the higher your volunteer rank becomes.</li>
                    <li>Badges cannot be lost once earned.</li>
                </ul>
            </div>
        </div>
    );
};

export default BadgeProgress;
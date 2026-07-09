import type { FC } from "react";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Award,
    CheckCircle2,
} from "lucide-react";

import type { LevelInfo } from "@/components/user/utils/level";

interface BadgeProgressProps {
    levelInfo: LevelInfo;
    drives: number;
}

const BadgeProgress: FC<BadgeProgressProps> = ({
    levelInfo,
    drives,
}) => {
    const progress =
        levelInfo.next === null
            ? 100
            : ((drives - levelInfo.currentTarget) /
                  (levelInfo.nextTarget - levelInfo.currentTarget)) *
              100;

    const remaining =
        levelInfo.next === null
            ? 0
            : levelInfo.nextTarget - drives;

    return (
        <div className="rounded-3xl border border-white/10 bg-white/10 backdrop-blur-xl p-6 shadow-2xl shadow-black/10">

            <div className="flex items-center gap-2 text-emerald-300 mb-6">
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

                    <h3 className="text-4xl font-black">
                        {levelInfo.current}
                    </h3>
                </div>

                {levelInfo.next && (
                    <div className="text-right">
                        <p className="text-xs text-slate-400">
                            Next Badge
                        </p>

                        <div className="flex items-center justify-end gap-1 mt-1 font-bold text-white">
                            <ArrowRight size={15} />
                            {levelInfo.next}
                        </div>
                    </div>
                )}

            </div>

            {levelInfo.next ? (
                <>
                    <div className="mb-2 flex justify-between text-sm text-slate-300">
                        <span>
                            {drives} / {levelInfo.nextTarget} Drives
                        </span>

                        <span>
                            {remaining} Remaining
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
                            className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-green-300"
                        />
                    </div>

                    <p className="mt-5 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 px-4 py-3 text-sm text-emerald-200">
                        Complete{" "}
                        <strong>{remaining} more drive{remaining !== 1 ? "s" : ""}</strong>{" "}
                        to unlock{" "}
                        <strong>{levelInfo.next}</strong>.
                    </p>
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

        </div>
    );
};

export default BadgeProgress;
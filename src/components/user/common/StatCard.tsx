import type { FC } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { ArrowUpRight } from "lucide-react";

import type { MetricData } from "@/types/user";

interface StatCardProps {
    metric: MetricData;
    loading: boolean;
}

const StatCard: FC<StatCardProps> = ({
    metric,
    loading,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ y: -6 }}
        transition={{ duration: 0.25 }}
        className="group relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl"
    >
        {/* Decorative Glow */}
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-slate-100 opacity-40 blur-2xl group-hover:opacity-70 transition" />

        {/* Top */}
        <div className="relative flex items-start justify-between mb-6">

            <div
                className={`flex h-14 w-14 items-center justify-center rounded-2xl ${metric.bg} ${metric.color}`}
            >
                <metric.icon size={24} />
            </div>

            <div className="rounded-xl bg-slate-50 p-2 text-slate-400 group-hover:text-emerald-600 transition">
                <ArrowUpRight size={16} />
            </div>

        </div>

        {loading ? (
            <div className="animate-pulse space-y-3">
                <div className="h-10 w-24 rounded-lg bg-slate-100" />
                <div className="h-4 w-28 rounded-lg bg-slate-100" />
            </div>
        ) : (
            <div className="relative">

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">
                    {metric.label}
                </p>

                <div className="flex items-end gap-1">

                    <h3 className="text-5xl font-black tracking-tight text-slate-900 leading-none">
                        <CountUp
                            end={metric.value}
                            duration={1.6}
                        />
                    </h3>

                    {metric.unit && (
                        <span className="mb-1 text-xl font-bold text-slate-400">
                            {metric.unit}
                        </span>
                    )}

                </div>

                <div className="mt-5 h-px bg-slate-100" />

                <p className="mt-4 text-sm text-slate-500">
                    Total {metric.label.toLowerCase()}
                </p>

            </div>
        )}
    </motion.div>
);

export default StatCard;
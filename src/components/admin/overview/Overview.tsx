import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import CountUp from "react-countup";
import { Leaf } from "lucide-react";

import Spinner from "../common/Spinner";

interface OverviewProps {
  adminUser: any;
  appLoading: boolean;
  metrics: any[];
  chartData: any[];
  accent: { hex: string };
  leaderboard: any[];
  getRankColor: (rank: number) => string;
}

const Overview: React.FC<OverviewProps> = ({
  adminUser,
  appLoading,
  metrics,
  chartData,
  accent,
  leaderboard,
  getRankColor,
}) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mb-8 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl"
        style={{
          background:
            "linear-gradient(135deg, var(--accent-900) 0%, #1e293b 100%)",
        }}
      >
        <div className="relative z-10">
          <p
            className="text-sm font-semibold mb-2"
            style={{ color: "var(--accent-400)" }}
          >
            Welcome back 👋
          </p>

          <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">
            {adminUser?.name || "Admin"}
          </h1>

          <p className="text-white/60 text-base lg:text-lg">
            Manage drives, volunteers, attendance and impact metrics.
          </p>
        </div>

        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <Leaf size={240} />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {appLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="themed-card p-6 rounded-3xl border themed-border shadow-sm animate-pulse h-36"
              />
            ))
          : metrics.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="themed-card p-6 rounded-3xl border themed-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-5">
                  <div className={`p-3 rounded-xl ${m.bgLight} ${m.color}`}>
                    <m.icon size={22} />
                  </div>

                  <span className="accent-badge px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                    {m.trend}
                  </span>
                </div>

                <h3 className="text-4xl font-black tracking-tighter mb-1 themed-text">
                  <CountUp end={m.value} duration={2} />
                </h3>

                <p className="text-xs font-bold themed-muted uppercase tracking-widest">
                  {m.label}
                </p>
              </motion.div>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 themed-card p-8 rounded-[2.5rem] border themed-border shadow-sm h-96">
          <h3 className="text-xl font-black mb-1 themed-text">
            Weekly Velocity
          </h3>

          <p className="text-sm themed-muted mb-6">
            Waste collection vs Volunteers
          </p>

          {appLoading ? (
            <div className="flex items-center justify-center h-64">
              <Spinner size={28} />
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="80%">
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="gWaste" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={accent.hex}
                      stopOpacity={0.2}
                    />
                    <stop
                      offset="95%"
                      stopColor={accent.hex}
                      stopOpacity={0}
                    />
                  </linearGradient>

                  <linearGradient id="gVol" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--border-color)"
                />

                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--text-muted)",
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                  dy={10}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{
                    fill: "var(--text-muted)",
                    fontSize: 12,
                  }}
                />

                <Tooltip
                  contentStyle={{
                    borderRadius: 16,
                    border: "none",
                    padding: 16,
                    boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)",
                    background: "var(--bg-card)",
                    color: "var(--text-primary)",
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="waste"
                  name="Waste (kg)"
                  stroke={accent.hex}
                  strokeWidth={3}
                  fill="url(#gWaste)"
                />

                <Area
                  type="monotone"
                  dataKey="volunteers"
                  name="Volunteers"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fill="url(#gVol)"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>

        <div className="milestone-card p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />

          <h3 className="text-xl font-black mb-1 relative z-10">
            Leaderboard
          </h3>

          <p className="text-white/40 text-xs uppercase tracking-widest mb-6 relative z-10">
            Top Contributors
          </p>

          {appLoading ? (
            <div className="flex items-center justify-center py-8">
              <Spinner />
            </div>
          ) : (
            <div className="space-y-3 relative z-10">
              {leaderboard.map((u) => (
                <div
                  key={u.name}
                  className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`text-lg font-black ${getRankColor(u.rank)}`}
                    >
                      #{u.rank}
                    </span>

                    <div>
                      <p className="font-bold text-sm">{u.name}</p>
                      <p className="text-xs text-white/40">
                        {u.drives} Drives
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-black">{u.kg} kg</p>
                    <p className="text-xs text-white/30">Collected</p>
                  </div>
                </div>
              ))}

              {leaderboard.length === 0 && (
                <p className="text-white/30 text-sm text-center py-4">
                  No data yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Overview;
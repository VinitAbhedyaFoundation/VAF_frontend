import type { FC } from "react";
import { motion } from "framer-motion";

import {
  Calendar,
  ChevronRight,
  Flame,
  Leaf,
  MapPin,
  Trophy,
} from "lucide-react";

import type { OverviewProps } from "@/types/user";

import StatCard from "../common/StatCard";
import DriveActionButton from "../common/DriveActionButton";
import BadgeProgress from "../common/BadgeProgress";

const Overview: FC<OverviewProps> = ({
  user,
  data,
  streak,
  certificates,
  USER_METRICS,
  loading,
  MY_DRIVES,
  upcomingDrives,
  HEATMAP_DATA,
  getParticipation,
  handleJoin,
  handleMarkAttendance,
  actionLoadingId,
  goToSection,
  levelInfo,
  drives,
}) => {
  return (
    <div className="space-y-8">
      {/* HERO */}
      <motion.div
  initial={{ opacity: 0, y: -10 }}
  animate={{ opacity: 1, y: 0 }}
  className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden"
>
  <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl -mr-24 -mt-24" />

  <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-10 items-center">

    {/* LEFT SIDE */}
    <div>
      <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">
        Welcome Back 👋
      </p>

      <h2 className="text-4xl font-black tracking-tight mb-4">
        {user?.name ?? "Loading..."}
      </h2>

      <p className="text-slate-300 leading-relaxed max-w-xl">
        You've contributed{" "}
        <span className="font-bold text-white">
          {data?.stats?.hoursVolunteered ?? 0} hours
        </span>{" "}
        and collected{" "}
        <span className="font-bold text-white">
          {data?.stats?.wasteCollected ?? 0} kg
        </span>{" "}
        of waste through community drives.
      </p>

      <div className="mt-8 flex flex-wrap gap-4">

        <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl px-5 py-4 min-w-[150px]">
          <div className="flex items-center gap-2 text-orange-400 mb-2">
            <Flame size={18} />
            <span className="text-xs uppercase tracking-wider">
              Streak
            </span>
          </div>

          <p className="font-black text-xl">
            {streak > 0 ? `${streak} Weeks` : "Start Today"}
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl px-5 py-4 min-w-[150px]">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <Trophy size={18} />
            <span className="text-xs uppercase tracking-wider">
              Certificates
            </span>
          </div>

          <p className="font-black text-xl">
            {certificates.length}
          </p>
        </div>

        <button
          onClick={() => goToSection("upcoming")}
          className="self-end flex items-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition px-6 py-4 font-bold shadow-lg shadow-emerald-500/20"
        >
          <Calendar size={18} />
          Join Next Drive
        </button>

      </div>
    </div>

    {/* RIGHT SIDE */}
    <BadgeProgress
      levelInfo={levelInfo}
      drives={drives}
    />

  </div>
</motion.div>

      {/* METRICS */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {USER_METRICS.map((metric) => (
          <StatCard
            key={metric.id}
            metric={metric}
            loading={loading}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* HEATMAP */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
          <h3 className="text-lg font-black text-slate-900 mb-1">
            My Activity
          </h3>

          <p className="text-sm text-slate-400 mb-6">
            Hours volunteered vs waste collected
          </p>

          <div className="h-52">
            {loading ? (
              <div className="h-full bg-slate-50 rounded-2xl flex items-center justify-center">
                <span className="text-slate-400 font-bold animate-pulse">
                  Loading...
                </span>
              </div>
            ) : (
              <div className="flex justify-center py-4">
                <div className="grid grid-cols-10 gap-2">
                  {Array.from({ length: 53 }).map((_, index) => {
                    const item = HEATMAP_DATA[index] || {
                      hours: 0,
                      waste: 0,
                      location: "",
                      date: "",
                    };

                    const value = item.hours + item.waste;

                    let color = "bg-slate-100";

                    if (value > 0 && value < 5)
                      color = "bg-emerald-200";
                    else if (value < 10)
                      color = "bg-emerald-400";
                    else if (value < 20)
                      color = "bg-emerald-600";
                    else if (value >= 20)
                      color = "bg-emerald-800";

                    return (
                      <div
                        key={index}
                        title={`📅 ${item.date || "No activity"}
📍 ${item.location || "N/A"}
⏱ ${item.hours} hrs
♻️ ${item.waste} kg`}
                        className={`w-6 h-6 rounded-md ${color}`}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RECENT DRIVES */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
          <h3 className="text-lg font-black text-slate-900 mb-4">
            Recent Drives
          </h3>

          <div className="space-y-3">
            {MY_DRIVES.slice(0, 3).map((drive) => (
              <div
                key={drive.id}
                className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center mt-0.5">
                  <Leaf
                    size={14}
                    className="text-emerald-600"
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-bold text-sm truncate">
                    {drive.title}
                  </p>

                  <p className="text-xs text-slate-400">
                    {drive.location} · {drive.date}
                  </p>

                  <p className="text-xs text-emerald-600 font-bold">
                    {drive.hoursLogged} hrs logged
                  </p>
                </div>
              </div>
            ))}

            <button
              onClick={() => goToSection("drives")}
              className="w-full text-center text-sm text-emerald-600 font-bold py-2 hover:text-emerald-700"
            >
              View All Drives →
            </button>
          </div>
        </div>
      </div>

      {/* UPCOMING */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-black">
              Upcoming Near You
            </h3>

            <p className="text-sm text-slate-400">
              {upcomingDrives.length} drives available to join
            </p>
          </div>

          <button
            onClick={() => goToSection("upcoming")}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            See all
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {upcomingDrives.slice(0, 3).map((drive) => {
            const participation = getParticipation(drive.id);

            return (
              <div
                key={drive.id}
                className="rounded-2xl border border-slate-100 p-4 hover:border-emerald-200 hover:shadow-sm transition"
              >
                <h4 className="font-bold text-sm mb-1">
                  {drive.title}
                </h4>

                <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                  <MapPin size={11} />
                  {drive.location}
                </p>

                <DriveActionButton
                  drive={drive}
                  participation={participation}
                  onJoin={handleJoin}
                  onMarkAttendance={handleMarkAttendance}
                  loadingId={actionLoadingId}
                  compact
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Overview;
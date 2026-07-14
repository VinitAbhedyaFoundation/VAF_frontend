import { motion } from "framer-motion";
import type { FC } from "react";

import {
  Calendar,
  ChevronRight,
  Flame,
  Leaf,
  MapPin,
  Trophy,
  Users,
} from "lucide-react";

import type { OverviewProps } from "@/types/user";

import BadgeProgress from "../common/BadgeProgress";
import DriveActionButton from "../common/DriveActionButton";
import StatCard from "../common/StatCard";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 18) return "Good Afternoon";
  return "Good Evening";
};

const getTodayLabel = () =>
  new Date().toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

const STATUS_STYLES: Record<string, { label: string; className: string }> = {
  completed: { label: "🟢 Completed", className: "bg-emerald-100 text-emerald-700" },
  pending: { label: "🟡 Pending", className: "bg-yellow-100 text-yellow-700" },
  joined: { label: "🔵 Joined", className: "bg-blue-100 text-blue-700" },
};

const Overview: FC<OverviewProps> = ({
  user,
  data,
  streak,
  certificates,
  USER_METRICS,
  loading,
  MY_DRIVES,
  upcomingDrives,
  getParticipation,
  handleJoin,
  handleMarkAttendance,
  actionLoadingId,
  goToSection,
  levelInfo,
  drives,
}) => {
  return (
    <div className="space-y-10">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-slate-900 rounded-3xl p-8 lg:p-10 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl -mr-24 -mt-24" />

        <div className="relative z-10 grid grid-cols-1 xl:grid-cols-[1fr_340px] gap-10 items-center">
          {/* LEFT SIDE */}
          <div>
            <p className="text-emerald-400 text-sm font-bold uppercase tracking-widest mb-2">
              {getGreeting()}
            </p>

            <h2 className="text-4xl font-black tracking-tight mb-1">
              {user?.name ?? "Loading..."}
            </h2>

            <p className="text-slate-400 text-sm mb-4">
              {getTodayLabel()}
            </p>

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
                  <Flame size={16} />
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
                  <Trophy size={16} />
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
                <Calendar size={16} />
                Find Nearby Drives
              </button>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="shadow-2xl rounded-3xl border border-white/20">
            <BadgeProgress
              levelInfo={levelInfo}
              drives={drives}
            />
          </div>
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

      {/* RECENT DRIVES */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl border border-slate-100 shadow-md p-7"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Leaf size={18} className="text-emerald-600" />
              Recent Drives
            </h3>

            <p className="text-sm text-slate-400">
              Your latest volunteer activities
            </p>
          </div>

          <button
            onClick={() => goToSection("drives")}
            className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            View All
            <ChevronRight size={16} />
          </button>
        </div>

        {MY_DRIVES.length === 0 ? (
          <div className="text-center py-14">
            <div className="text-4xl mb-3">🌱</div>

            <p className="font-semibold text-slate-600">
              No completed drives yet
            </p>

            <p className="text-sm text-slate-400 mt-1 max-w-xs mx-auto">
              Join your first beach cleanup to start earning badges and certificates.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {MY_DRIVES.slice(0, 5).map((drive) => {
              const status = drive.status
                ? STATUS_STYLES[drive.status.toLowerCase()]
                : undefined;

              return (
                <motion.div
                  key={drive.id}
                  whileHover={{ y: -2 }}
                  className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 p-4 hover:shadow-xl transition"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
                      <Leaf size={18} className="text-emerald-600" />
                    </div>

                    <div>
                      <h4 className="font-bold text-slate-900">
                        {drive.title}
                      </h4>

                      <p className="text-sm text-slate-500 flex items-center gap-1 mt-1">
                        <MapPin size={12} />
                        {drive.location}
                      </p>

                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-xs text-slate-400">
                          {drive.date}
                        </p>

                        {status && (
                          <span
                            className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${status.className}`}
                          >
                            {status.label}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold whitespace-nowrap">
                    {drive.hoursLogged} hrs
                  </span>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* UPCOMING */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white rounded-3xl border border-slate-100 shadow-md p-7"
      >
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-lg font-black flex items-center gap-2">
              <Calendar size={18} className="text-emerald-600" />
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
                className="rounded-3xl border border-slate-100 p-4 hover:border-emerald-200 hover:shadow-xl transition"
              >
                <h4 className="font-bold text-sm mb-2">
                  {drive.title}
                </h4>

                <p className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                  <Calendar size={12} />
                  {drive.date}
                </p>

                <p className="text-xs text-slate-400 flex items-center gap-1 mb-1">
                  <MapPin size={12} />
                  {drive.location}
                </p>

                {typeof drive.slotsLeft === "number" && (
                  <p className="text-xs text-slate-400 flex items-center gap-1 mb-3">
                    <Users size={12} />
                    {drive.slotsLeft} slots left
                  </p>
                )}

                <div className="mt-2">
                  <DriveActionButton
                    drive={drive}
                    participation={participation}
                    onJoin={handleJoin}
                    onMarkAttendance={handleMarkAttendance}
                    loadingId={actionLoadingId}
                    compact
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Overview;
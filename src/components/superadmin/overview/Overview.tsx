"use client";

import { FC } from "react";
import {
  Admin,
  User,
  Drive,
  AttendanceRecord,
  NavSection,
  WasteBarData,
  VolunteerBarData,
  CityData,
} from "@/types/superadmin";
import { motion } from "framer-motion";
import CountUp from "react-countup";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  ChevronRight,
  Leaf,
  MapPin,
  ShieldCheck,
  Users,
  Waves,
} from "lucide-react";

import Avatar from "../common/Avatar";
import { getStatusClass } from "../utils/status";

interface OverviewProps {
  drives: Drive[];
  admins: Admin[];
  users: User[];
  attendance: AttendanceRecord[];
  totalWaste: number;
  totalHours: number;
  completedDrives: number;
  wasteBarData: WasteBarData[];
  volunteerBarData: VolunteerBarData[];
  cityData: CityData[];
  goTo: (section: NavSection) => void;
}

const Overview: FC<OverviewProps> = ({
  drives,
  admins,
  users,
  attendance,
  totalWaste,
  totalHours,
  completedDrives,
  wasteBarData,
  volunteerBarData,
  cityData,
  goTo,
}) => {
  const METRICS = [
    { id: "m1", label: "Total Drives", value: drives.length, icon: Waves, trend: `${completedDrives} done`, color: "text-emerald-600", bgLight: "bg-emerald-50" },
    { id: "m2", label: "Admins", value: admins.length, icon: ShieldCheck, trend: "+2 this month", color: "text-indigo-600", bgLight: "bg-indigo-50" },
    { id: "m3", label: "Volunteers", value: users.length, icon: Users, trend: "+8%", color: "text-amber-600", bgLight: "bg-amber-50" },
    { id: "m4", label: "Waste Collected (kg)", value: totalWaste, icon: Leaf, trend: `${totalHours} hrs`, color: "text-sky-600", bgLight: "bg-sky-50" },
  ];

  const topVolunteer = [...users].sort((a, b) => (b.drives ?? 0) - (a.drives ?? 0))[0];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard Overview</h1>
        <p className="text-slate-500 mt-1">Platform-wide metrics and activity at a glance.</p>
      </div>

      {/* Metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {METRICS.map(m => (
          <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
            <div className="flex justify-between items-start mb-5">
              <div className={`p-3 rounded-xl ${m.bgLight} ${m.color}`}><m.icon size={22} /></div>
              <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">{m.trend}</span>
            </div>
            <h3 className="text-4xl font-black tracking-tighter mb-1">
              <CountUp end={m.value} duration={2} />
            </h3>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{m.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
          <h3 className="text-xl font-black mb-1">Waste vs Volunteers</h3>
          <p className="text-sm text-slate-400 mb-6">Per completed drive</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Waste Collected (kg)</p>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={wasteBarData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", padding: 12 }} />
                  <Bar dataKey="waste" name="Waste (kg)" fill="#10b981" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Volunteer Turnout</p>
              <ResponsiveContainer width="100%" height={140}>
                <BarChart data={volunteerBarData} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: 12, border: "none", padding: 12 }} />
                  <Bar dataKey="volunteers" name="Volunteers" fill="#6366f1" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Platform health */}
        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <h3 className="text-xl font-black mb-1 relative z-10">Platform Health</h3>
          <p className="text-slate-400 text-xs uppercase tracking-widest mb-6 relative z-10">Live Stats</p>
          <div className="space-y-4 relative z-10">
            {[
              { label: "Drives completed", value: completedDrives, total: drives.length, color: "#10b981" },
              { label: "Active volunteers", value: users.filter(u => u.status === "Active").length, total: users.length, color: "#6366f1" },
              { label: "Active admins", value: admins.filter(a => a.status === "Active").length, total: admins.length, color: "#f59e0b" },
              { label: "Attendance marked", value: attendance.filter(a => a.status === "Marked").length, total: attendance.length, color: "#0ea5e9" },
            ].map(s => (
              <div key={s.label}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-xs text-slate-400">{s.label}</span>
                  <span className="text-xs font-bold text-white">{s.value}/{s.total}</span>
                </div>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: `${Math.round((s.value / Math.max(s.total, 1)) * 100)}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="h-full rounded-full" style={{ background: s.color }} />
                </div>
              </div>
            ))}
            {topVolunteer && (
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 mt-2">
                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-widest mb-2">Top Volunteer</p>
                <div className="flex items-center gap-2">
                  <Avatar name={topVolunteer.name} size="sm" />
                  <div>
                    <p className="font-bold text-sm text-white">{topVolunteer.name}</p>
                    <p className="text-xs text-slate-400">{topVolunteer.drives} drives · {topVolunteer.wasteKg ?? 0} kg</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent drives table */}
      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-black">Recent Drives</h3>
          <button onClick={() => goTo("drives")} className="text-emerald-600 text-sm font-semibold inline-flex items-center gap-1 hover:text-emerald-700">
            View all <ChevronRight size={16} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-600 text-left">
              <tr>{["Location", "Date", "Volunteers", "Status"].map(h => (
                <th key={h} className="p-4 text-xs font-bold uppercase tracking-wider">{h}</th>
              ))}</tr>
            </thead>
            <tbody>
              {drives.slice(0, 4).map(d => (
                <tr key={d.id} className="border-t hover:bg-slate-50 transition">
                  <td className="p-4 font-semibold flex items-center gap-2"><MapPin size={13} className="text-emerald-500" />{d.location}</td>
                  <td className="p-4 text-slate-500">{new Date(d.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</td>
                  <td className="p-4">{d.volunteers || "—"}</td>
                  <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(d.status)}`}>{d.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Overview;
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
  ChevronRight,
  Leaf,
  MapPin,
  ShieldCheck,
  Users,
  Waves,
} from "lucide-react";

import { getStatusClass } from "../utils/status";

interface OverviewProps {
  drives: Drive[];
  admins: Admin[];
  users: User[];
  attendance: AttendanceRecord[];

  totalWaste: number;
  totalHours: number;
  completedDrives: number;

  // Kept temporarily so SuperAdminDashboard.tsx
  // does not need to be changed yet.
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
  goTo,
}) => {
  /*
   * ------------------------------------------------------------
   * Dashboard calculations
   * ------------------------------------------------------------
   */

  const pendingVolunteers = users.filter(
    (user) => user.status === "Pending"
  ).length;

  const suspendedVolunteers = users.filter(
    (user) => user.status === "Suspended"
  ).length;

  const activeVolunteers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const pendingAttendance = attendance.filter(
    (record) => record.status === "Pending"
  ).length;

  const upcomingDrives = drives.filter((drive) => {
    const driveDate = new Date(drive.date);

    return driveDate > new Date();
  }).length;

  /*
   * ------------------------------------------------------------
   * Metric cards
   * ------------------------------------------------------------
   */

  const METRICS = [
    {
      id: "m1",
      label: "Total Drives",
      value: drives.length,
      icon: Waves,
      trend: `${completedDrives} done`,
      color: "text-emerald-600",
      bgLight: "bg-emerald-50",
    },
    {
      id: "m2",
      label: "Admins",
      value: admins.length,
      icon: ShieldCheck,
      trend: `${admins.filter((admin) => admin.status === "Active").length} active`,
      color: "text-indigo-600",
      bgLight: "bg-indigo-50",
    },
    {
      id: "m3",
      label: "Volunteers",
      value: users.length,
      icon: Users,
      trend: `${pendingVolunteers} pending`,
      color: "text-amber-600",
      bgLight: "bg-amber-50",
    },
    {
      id: "m4",
      label: "Volunteer Hours",
      value: totalHours,
      icon: Leaf,
      trend: `${totalWaste} kg waste`,
      color: "text-sky-600",
      bgLight: "bg-sky-50",
    },
  ];

  /*
   * ------------------------------------------------------------
   * Render
   * ------------------------------------------------------------
   */

  return (
    <>
      {/* --------------------------------------------------------
          Page heading
      --------------------------------------------------------- */}

      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Dashboard Overview
        </h1>

        <p className="text-slate-500 mt-1">
          Platform-wide metrics and activity at a glance.
        </p>
      </div>

      {/* --------------------------------------------------------
          Metric cards
      --------------------------------------------------------- */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {METRICS.map((metric) => {
          const Icon = metric.icon;

          return (
            <motion.div
              key={metric.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex justify-between items-start mb-5">
                <div
                  className={`p-3 rounded-xl ${metric.bgLight} ${metric.color}`}
                >
                  <Icon size={22} />
                </div>

                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">
                  {metric.trend}
                </span>
              </div>

              <h3 className="text-4xl font-black tracking-tighter mb-1">
                <CountUp
                  end={metric.value}
                  duration={2}
                />
              </h3>

              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {metric.label}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* --------------------------------------------------------
          Needs Attention + Platform Overview
      --------------------------------------------------------- */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

        {/* ======================================================
            NEEDS ATTENTION
        ======================================================= */}

        <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">

          <div className="flex items-start justify-between mb-6">
            <div>
              <h3 className="text-xl font-black">
                Needs Attention
              </h3>

              <p className="text-sm text-slate-400 mt-1">
                Items that may require your review.
              </p>
            </div>

            {pendingVolunteers +
              pendingAttendance +
              suspendedVolunteers >
              0 && (
              <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold">
                Action required
              </span>
            )}
          </div>

          <div className="space-y-3">

            {/* --------------------------------------------------
                Pending volunteer approvals
            --------------------------------------------------- */}

            <button
              type="button"
              onClick={() => goTo("users")}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                  {pendingVolunteers}
                </div>

                <div>
                  <p className="font-bold text-slate-800">
                    Volunteer approvals pending
                  </p>

                  <p className="text-xs text-slate-400">
                    Volunteers waiting for account approval
                  </p>
                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-slate-400"
              />
            </button>

            {/* --------------------------------------------------
                Pending attendance
            --------------------------------------------------- */}

            <button
              type="button"
              onClick={() => goTo("attendance")}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                  {pendingAttendance}
                </div>

                <div>
                  <p className="font-bold text-slate-800">
                    Attendance records pending
                  </p>

                  <p className="text-xs text-slate-400">
                    Attendance waiting for admin review
                  </p>
                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-slate-400"
              />
            </button>

            {/* --------------------------------------------------
                Suspended volunteers
            --------------------------------------------------- */}

            <button
              type="button"
              onClick={() => goTo("users")}
              className="w-full flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition text-left"
            >
              <div className="flex items-center gap-4">

                <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center font-bold">
                  {suspendedVolunteers}
                </div>

                <div>
                  <p className="font-bold text-slate-800">
                    Suspended volunteers
                  </p>

                  <p className="text-xs text-slate-400">
                    Accounts currently suspended
                  </p>
                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-slate-400"
              />
            </button>

          </div>
        </div>

        {/* ======================================================
            PLATFORM OVERVIEW
        ======================================================= */}

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200">

          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

          <h3 className="text-xl font-black mb-1 relative z-10">
            Platform Overview
          </h3>

          <p className="text-slate-400 text-xs uppercase tracking-widest mb-6 relative z-10">
            Current statistics
          </p>

          <div className="space-y-5 relative z-10">

            {/* Active volunteers */}

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Active volunteers
              </span>

              <span className="font-bold">
                {activeVolunteers}
              </span>
            </div>

            {/* Pending approvals */}

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Pending approvals
              </span>

              <span className="font-bold">
                {pendingVolunteers}
              </span>
            </div>

            {/* Upcoming drives */}

            <div className="flex justify-between items-center">
              <span className="text-sm text-slate-400">
                Upcoming drives
              </span>

              <span className="font-bold">
                {upcomingDrives}
              </span>
            </div>

            <div className="border-t border-white/10 pt-5 space-y-4">

              {/* Waste */}

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">
                  Waste collected
                </span>

                <span className="font-bold">
                  {totalWaste} kg
                </span>
              </div>

              {/* Hours */}

              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">
                  Volunteer hours
                </span>

                <span className="font-bold">
                  {totalHours} hrs
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* --------------------------------------------------------
          Recent drives
      --------------------------------------------------------- */}

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">

        <div className="flex justify-between items-center mb-4">

          <h3 className="text-xl font-black">
            Recent Drives
          </h3>

          <button
            type="button"
            onClick={() => goTo("drives")}
            className="text-emerald-600 text-sm font-semibold inline-flex items-center gap-1 hover:text-emerald-700"
          >
            View all

            <ChevronRight size={16} />
          </button>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            <thead className="bg-slate-50 text-slate-600 text-left">

              <tr>
                {[
                  "Location",
                  "Date",
                  "Volunteers",
                  "Status",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="p-4 text-xs font-bold uppercase tracking-wider"
                  >
                    {heading}
                  </th>
                ))}
              </tr>

            </thead>

            <tbody>

              {drives.slice(0, 4).map((drive) => (
                <tr
                  key={drive.id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="p-4 font-semibold flex items-center gap-2">
                    <MapPin
                      size={13}
                      className="text-emerald-500"
                    />

                    {drive.location}
                  </td>

                  <td className="p-4 text-slate-500">
                    {new Date(
                      drive.date
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </td>

                  <td className="p-4">
                    {drive.volunteers || "—"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                        drive.status
                      )}`}
                    >
                      {drive.status}
                    </span>
                  </td>

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
"use client";

import { Dispatch, FC, SetStateAction } from "react";

import { motion } from "framer-motion";

import {
  Bell,
  CheckCircle2,
  MapPin,
  Waves,
} from "lucide-react";

import { getStatusClass } from "../utils/status";

import type {
  Drive,
  DriveStatus,
} from "@/types/superadmin";

interface DrivesProps {
  drives: Drive[];
  filteredDrives: Drive[];
  driveFilter: "All" | DriveStatus;
  setDriveFilter: Dispatch<
    SetStateAction<"All" | DriveStatus>
  >;
  completedDrives: number;
}

const Drives: FC<DrivesProps> = ({
  drives,
  filteredDrives,
  driveFilter,
  setDriveFilter,
  completedDrives,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            All Drives
          </h1>
          <p className="text-slate-500 text-sm">
            View all beach cleanup drives across the platform.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Drives",
            val: drives.length,
            icon: Waves,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Completed",
            val: completedDrives,
            icon: CheckCircle2,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Upcoming",
            val: drives.filter(
              (d) => d.status === "Upcoming"
            ).length,
            icon: Bell,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg} ${s.color}`}
            >
              <s.icon size={20} />
            </div>

            <p className="text-3xl font-black text-slate-900">
              {s.val}
            </p>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-4">
        {(
          ["All", "Completed", "Upcoming"] as const
        ).map((filter) => (
          <button
            key={filter}
            onClick={() =>
              setDriveFilter(filter)
            }
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              driveFilter === filter
                ? "bg-emerald-600 text-white"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-left">
            <tr>
              {[
                "Location",
                "Date",
                "Coordinator",
                "Volunteers",
                "Hours",
                "Waste (kg)",
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
            {filteredDrives.map((drive) => (
              <motion.tr
                key={drive.id}
                layout
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-4 font-semibold">
                  <div className="flex items-center gap-2">
                    <MapPin
                      size={13}
                      className="text-emerald-500 shrink-0"
                    />
                    {drive.location}
                  </div>
                </td>

                <td className="p-4 text-slate-500">
                  {new Date(
                    drive.date
                  ).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td className="p-4 text-slate-500">
                  {drive.coordinator ?? "—"}
                </td>

                <td className="p-4">
                  {drive.volunteers || "—"}
                </td>

                <td className="p-4">
                  {drive.hours} hrs
                </td>

                <td className="p-4">
                  {drive.wasteKg || "—"}
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
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredDrives.length === 0 && (
          <p className="text-center text-slate-400 py-10 text-sm">
            No drives found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Drives;
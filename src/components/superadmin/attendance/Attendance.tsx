"use client";

import { Dispatch, FC, SetStateAction } from "react";

import { CheckCircle2 } from "lucide-react";

import Avatar from "../common/Avatar";
import { getStatusClass } from "../utils/status";

import type {
  AttendanceRecord,
  AttendanceStatus,
} from "@/types/superadmin";

interface AttendanceProps {
  attendance: AttendanceRecord[];
  filteredAttendance: AttendanceRecord[];
  attendanceFilter: "All" | AttendanceStatus;
  setAttendanceFilter: Dispatch<
    SetStateAction<"All" | AttendanceStatus>
  >;
  pendingAttendance: number;
  markAttendance: (id: number) => void;
}

const Attendance: FC<AttendanceProps> = ({
  attendance,
  filteredAttendance,
  attendanceFilter,
  setAttendanceFilter,
  pendingAttendance,
  markAttendance,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">
            Attendance Logs
          </h1>

          <p className="text-slate-500 text-sm">
            Full attendance records across all drives.
          </p>
        </div>

        {pendingAttendance > 0 && (
          <div className="bg-orange-100 text-orange-700 text-sm font-bold px-4 py-2 rounded-xl">
            {pendingAttendance} Pending
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Records",
            val: attendance.length,
            icon: "📋",
          },
          {
            label: "Marked",
            val: attendance.filter(
              (a) => a.status === "Marked"
            ).length,
            icon: "✅",
          },
          {
            label: "Pending",
            val: pendingAttendance,
            icon: "⏳",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          >
            <p className="text-2xl mb-1">
              {stat.icon}
            </p>

            <p className="text-3xl font-black text-slate-900">
              {stat.val}
            </p>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {(
          ["All", "Marked", "Pending"] as const
        ).map((filter) => (
          <button
            key={filter}
            onClick={() =>
              setAttendanceFilter(filter)
            }
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
              attendanceFilter === filter
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
                "Volunteer",
                "Email",
                "Drive",
                "Date",
                "Hours",
                "Status",
                "Action",
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
            {filteredAttendance.map((record) => (
              <tr
                key={record.id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={record.volunteer}
                      size="sm"
                    />
                    <span className="font-semibold">
                      {record.volunteer}
                    </span>
                  </div>
                </td>

                <td className="p-4 text-slate-400 text-xs">
                  {record.email}
                </td>

                <td className="p-4 text-slate-500">
                  {record.drive}
                </td>

                <td className="p-4 text-slate-400">
                  {record.date}
                </td>

                <td className="p-4">
                  {record.hours} hrs
                </td>

                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                      record.status
                    )}`}
                  >
                    {record.status}
                  </span>
                </td>

                <td className="p-4">
                  {record.status ===
                  "Pending" ? (
                    <button
                      onClick={() =>
                        markAttendance(
                          record.id
                        )
                      }
                      className="bg-emerald-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition flex items-center gap-1"
                    >
                      <CheckCircle2
                        size={12}
                      />
                      Mark
                    </button>
                  ) : (
                    <span className="text-slate-400 text-xs">
                      Done
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredAttendance.length ===
          0 && (
          <p className="text-center text-slate-400 py-10 text-sm">
            No records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Attendance;
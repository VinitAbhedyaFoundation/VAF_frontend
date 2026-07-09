import type { FC } from "react";

import type {
  Activity,
  AttendanceProps,
} from "@/types/user";

import { getStatusBadgeClass } from "@/components/user/utils/status";

const Attendance: FC<AttendanceProps> = ({
  data,
  participations,
}) => {
  const stats = [
    {
      label: "TOTAL DRIVES",
      value: data?.stats?.drivesJoined || 0,
      bg: "bg-emerald-50",
      color: "text-emerald-600",
    },
    {
      label: "HOURS LOGGED",
      value: data?.stats?.hoursVolunteered || 0,
      bg: "bg-blue-50",
      color: "text-blue-600",
    },
    {
      label: "POINTS EARNED",
      value: data?.stats?.impactPoints || 0,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      label: "PENDING",
      value: participations.filter(
        (p) => p.status === "Pending"
      ).length,
      bg: "bg-orange-50",
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black">
          My Activity
        </h1>
        <p className="text-slate-500 text-sm mt-1">
          Track your hours and attendance records.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-3`}
            >
              <div className="w-2 h-2 bg-current rounded-full" />
            </div>

            <p className="text-2xl font-black text-slate-900">
              {s.value}
            </p>

            <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="font-black text-slate-900">
            Attendance Log
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-slate-500">
              <tr>
                <th className="p-4 text-left font-bold">
                  Drive
                </th>
                <th className="p-4 text-left font-bold">
                  Date
                </th>
                <th className="p-4 text-left font-bold">
                  Hours
                </th>
                <th className="p-4 text-left font-bold">
                  Waste
                </th>
                <th className="p-4 text-left font-bold">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {!data?.activity?.length ? (
                <tr>
                  <td
                    colSpan={5}
                    className="text-center py-6 text-slate-400"
                  >
                    No attendance yet
                  </td>
                </tr>
              ) : (
                data.activity.map(
                  (a: Activity, index: number) => (
                    <tr
                      key={`${a.date}-${a.title ?? index}`}
                      className="border-t border-slate-50 hover:bg-slate-50 transition"
                    >
                      <td className="p-4 font-semibold text-slate-900">
                        {a.title || `Drive #${index + 1}`}
                      </td>

                      <td className="p-4 text-slate-500">
                        {new Date(
                          a.date
                        ).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                        })}
                      </td>

                      <td className="p-4 font-bold text-slate-700">
                        {a.hours} hrs
                      </td>

                      <td className="p-4 font-bold text-emerald-600">
                        {a.waste} kg
                      </td>

                      <td className="p-4">
                        <span
                          className={`text-xs px-2.5 py-1 rounded-full font-bold ${getStatusBadgeClass(
                            a.status || "Marked"
                          )}`}
                        >
                          {a.status || "Marked"}
                        </span>
                      </td>
                    </tr>
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
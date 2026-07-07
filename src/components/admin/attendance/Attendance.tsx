import React from "react";

import type { AttendanceRecord } from "../../../types/admin";
import SectionLoader from "../common/SectionLoader";

interface AttendanceProps {
  attendance: AttendanceRecord[];
  loadingAttendance: boolean;
  handleApproveAttendance: (id: number) => void;
}

const Attendance: React.FC<AttendanceProps> = ({
  attendance,
  loadingAttendance,
  handleApproveAttendance,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold themed-text">Attendance</h1>
          <p className="themed-secondary text-sm">
            Mark and track volunteer attendance across drives.
          </p>
        </div>
      </div>

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
              (item) => item.status === "Approved"
            ).length,
            icon: "✅",
          },
          {
            label: "Pending",
            val: attendance.filter(
              (item) => item.status === "Pending"
            ).length,
            icon: "⏳",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="themed-card rounded-2xl p-5 border themed-border shadow-sm"
          >
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-3xl font-black themed-text">{s.val}</p>
            <p className="text-xs font-bold themed-muted uppercase tracking-widest">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {loadingAttendance ? (
        <SectionLoader />
      ) : (
        <div className="themed-card rounded-2xl shadow-sm border themed-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="themed-subtle text-left">
              <tr>
                {[
                  "Volunteer",
                  "Email",
                  "Drive",
                  "Hours",
                  "Date",
                  "Status",
                  "Action",
                ].map((h) => (
                  <th
                    key={h}
                    className="p-4 text-xs font-bold themed-muted uppercase tracking-wider"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {attendance.map((item) => (
                <tr
                  key={item.id}
                  className="border-t themed-border table-row-hover transition"
                >
                  <td className="p-4 font-semibold themed-text">
                    {item.user?.name}
                  </td>

                  <td className="p-4 themed-muted text-xs">
                    {item.user?.email}
                  </td>

                  <td className="p-4 themed-secondary">
                    {item.drive
                      ? new Date(item.drive.date).toLocaleDateString(
                          "en-IN",
                          {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          }
                        )
                      : "-"}
                  </td>

                  <td className="p-4 themed-secondary">
                    {item.hours} hrs
                  </td>

                  <td className="p-4 themed-muted">
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleDateString("en-IN")
                      : "-"}
                  </td>

                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${
                        item.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="p-4">
                    {item.status === "Pending" ? (
                      <button
                        onClick={() =>
                          handleApproveAttendance(item.id)
                        }
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs"
                      >
                        Approve
                      </button>
                    ) : (
                      <span className="text-green-600 text-xs">
                        Approved
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {attendance.length === 0 && (
            <p className="text-center themed-muted py-8 text-sm">
              No attendance records yet.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
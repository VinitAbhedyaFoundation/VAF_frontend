import React, { useMemo, useState } from "react";

import type { AttendanceRecord } from "../../../types/admin";
import SectionLoader from "../common/SectionLoader";
import AttendanceScanner from "./AttendanceScanner";

interface AttendanceProps {
  attendance: AttendanceRecord[];
  loadingAttendance: boolean;
  handleApproveAttendance: (id: number) => void;
}

const PAGE_SIZE = 10;

const TABLE_HEADERS = [
  "Volunteer",
  "Email",
  "Drive",
  "Hours",
  "Date",
  "Status",
  "Action",
];

const Attendance: React.FC<AttendanceProps> = ({
  attendance,
  loadingAttendance,
  handleApproveAttendance,
}) => {
  const [showScanner, setShowScanner] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const stats = useMemo(() => {
    return attendance.reduce(
      (result, item) => {
        if (item.status === "Approved") {
          result.approved += 1;
        }

        if (
          item.status === "Registered" ||
          item.status === "Pending"
        ) {
          result.pending += 1;
        }

        return result;
      },
      {
        approved: 0,
        pending: 0,
      }
    );
  }, [attendance]);

  const totalPages = Math.ceil(attendance.length / PAGE_SIZE);

  // Keep the current page valid if records are removed.
  const safePage = Math.max(
    1,
    Math.min(currentPage, totalPages || 1)
  );

  const paginatedAttendance = useMemo(() => {
    const startIndex = (safePage - 1) * PAGE_SIZE;

    return attendance.slice(startIndex, startIndex + PAGE_SIZE);
  }, [attendance, safePage]);

  const firstRecord =
    attendance.length === 0
      ? 0
      : (safePage - 1) * PAGE_SIZE + 1;

  const lastRecord = Math.min(
    safePage * PAGE_SIZE,
    attendance.length
  );

  const statsCards = [
    {
      label: "Total Records",
      value: attendance.length,
      icon: "📋",
    },
    {
      label: "Marked",
      value: stats.approved,
      icon: "✅",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: "⏳",
    },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="themed-text text-2xl font-bold">
            Attendance
          </h1>

          <p className="themed-secondary text-sm">
            Mark and track volunteer attendance across drives.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowScanner(true)}
          className="rounded-xl bg-green-600 px-5 py-2 text-white shadow transition hover:bg-green-700"
        >
          📷 Start QR Scanner
        </button>
      </div>

      {/* Scanner Modal */}
      {showScanner && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setShowScanner(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="attendance-scanner-title"
            className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b px-6 py-4">
              <h2
                id="attendance-scanner-title"
                className="text-xl font-bold"
              >
                Scan Volunteer QR
              </h2>

              <button
                type="button"
                onClick={() => setShowScanner(false)}
                aria-label="Close QR scanner"
                className="text-2xl text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>

            <div className="p-6">
              <AttendanceScanner
                onClose={() => setShowScanner(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* Statistics */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
        {statsCards.map((stat) => (
          <div
            key={stat.label}
            className="themed-card themed-border rounded-2xl border p-5 shadow-sm"
          >
            <p className="mb-1 text-2xl">{stat.icon}</p>

            <p className="themed-text text-3xl font-black">
              {stat.value}
            </p>

            <p className="themed-muted text-xs font-bold uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Attendance Table */}
      {loadingAttendance ? (
        <SectionLoader />
      ) : (
        <div className="themed-card themed-border overflow-hidden rounded-2xl border shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-sm">
              <thead className="themed-subtle text-left">
                <tr>
                  {TABLE_HEADERS.map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="themed-muted p-4 text-xs font-bold uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {paginatedAttendance.map((item) => {
                  const isPending =
                    item.status === "Registered" ||
                    item.status === "Pending";

                  return (
                    <tr
                      key={item.id}
                      className="table-row-hover themed-border border-t transition"
                    >
                      <td className="themed-text p-4 font-semibold">
                        {item.user?.name ?? "Unknown"}
                      </td>

                      <td className="themed-muted p-4 text-xs">
                        {item.user?.email ?? "-"}
                      </td>

                      <td className="themed-secondary p-4">
                        {item.drive?.date
                          ? new Date(
                            item.drive.date
                          ).toLocaleDateString("en-IN", {
                            weekday: "short",
                            day: "numeric",
                            month: "short",
                          })
                          : "-"}
                      </td>

                      <td className="themed-secondary p-4">
                        {item.hours} hrs
                      </td>

                      <td className="themed-muted p-4">
                        {item.createdAt
                          ? new Date(
                            item.createdAt
                          ).toLocaleDateString("en-IN")
                          : "-"}
                      </td>

                      <td className="p-4">
                        <span
                          className={`rounded-full px-2 py-1 text-xs font-medium ${item.status === "Approved"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="p-4">
                        {isPending ? (
                          <button
                            type="button"
                            onClick={() =>
                              handleApproveAttendance(item.id)
                            }
                            className="rounded-lg bg-green-600 px-3 py-1 text-xs text-white hover:bg-green-700"
                          >
                            Approve
                          </button>
                        ) : (
                          <span className="text-xs font-medium text-green-600">
                            Approved
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {attendance.length === 0 && (
            <p className="themed-muted py-8 text-center text-sm">
              No attendance records yet.
            </p>
          )}

          {/* Pagination */}
          {attendance.length > 0 && (
            <div className="themed-border flex flex-col gap-3 border-t px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p
                className="themed-muted text-sm"
                aria-live="polite"
              >
                Showing {firstRecord}–{lastRecord} of{" "}
                {attendance.length} records
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => page - 1)
                  }
                  disabled={safePage === 1}
                  className="themed-border rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    aria-label={`Go to page ${page}`}
                    aria-current={
                      page === safePage ? "page" : undefined
                    }
                    className={`min-w-9 rounded-lg border px-3 py-2 text-sm transition ${page === safePage
                        ? "border-green-600 bg-green-600 text-white"
                        : "themed-border border hover:bg-gray-100"
                      }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => page + 1)
                  }
                  disabled={safePage >= totalPages}
                  className="themed-border rounded-lg border px-3 py-2 text-sm transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Attendance;
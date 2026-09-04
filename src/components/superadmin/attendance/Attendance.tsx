"use client";

import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";

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

  // Bulk approval
  approveSelectedAttendance: (
    ids: number[]
  ) => Promise<void>;
}

const Attendance: FC<AttendanceProps> = ({
  attendance,
  filteredAttendance,
  attendanceFilter,
  setAttendanceFilter,
  pendingAttendance,
  approveSelectedAttendance,
}) => {
  const [selectedIds, setSelectedIds] = useState<number[]>(
    []
  );

  // Registered and Pending records can be selected for approval
  const selectableRecords = filteredAttendance.filter(
    (record) =>
      record.status === "Registered" ||
      record.status === "Pending"
  );

  const allSelectableSelected =
    selectableRecords.length > 0 &&
    selectableRecords.every((record) =>
      selectedIds.includes(record.id)
    );

  // Clear selections when filter/data changes
  useEffect(() => {
    setSelectedIds([]);
  }, [attendanceFilter, attendance.length]);

  const toggleSelection = (id: number) => {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter(
          (selectedId) => selectedId !== id
        )
        : [...current, id]
    );
  };

  const toggleSelectAll = () => {
    if (allSelectableSelected) {
      setSelectedIds((current) =>
        current.filter(
          (id) =>
            !selectableRecords.some(
              (record) => record.id === id
            )
        )
      );
    } else {
      setSelectedIds((current) => {
        const existing = new Set(current);

        selectableRecords.forEach((record) => {
          existing.add(record.id);
        });

        return Array.from(existing);
      });
    }
  };

  const handleApproveSelected = async () => {
    if (selectedIds.length === 0) {
      return;
    }

    await approveSelectedAttendance(selectedIds);

    setSelectedIds([]);
  };

  return (
    <div>
      {/* Header */}
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
            label: "Approved",
            val: attendance.filter(
              (a) => a.status === "Approved"
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

      {/* Filters + Bulk Action */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex gap-2">
          {(
            ["All", "Registered", "Pending", "Approved"] as const
          ).map((filter) => (
            <button
              key={filter}
              onClick={() =>
                setAttendanceFilter(filter)
              }
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${attendanceFilter === filter
                  ? "bg-emerald-600 text-white"
                  : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Bulk Approve */}
        {selectedIds.length > 0 && (
          <button
            onClick={handleApproveSelected}
            className="bg-emerald-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-emerald-700 transition flex items-center gap-2"
          >
            <CheckCircle2 size={16} />

            Approve Selected (
            {selectedIds.length})
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-left">
            <tr>
              {/* Select All */}
              <th className="p-4 w-12">
                <input
                  type="checkbox"
                  checked={allSelectableSelected}
                  onChange={toggleSelectAll}
                  disabled={
                    selectableRecords.length === 0
                  }
                  className="h-4 w-4 cursor-pointer"
                />
              </th>

              {[
                "Volunteer",
                "Email",
                "Drive",
                "Date",
                "Hours",
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
            {filteredAttendance.map((record) => {
              const isSelectable =
                record.status === "Registered" ||
                record.status === "Pending";

              const isSelected =
                selectedIds.includes(record.id);

              return (
                <tr
                  key={record.id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  {/* Checkbox */}
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      disabled={!isSelectable}
                      onChange={() =>
                        toggleSelection(record.id)
                      }
                      className="h-4 w-4 cursor-pointer disabled:cursor-not-allowed"
                    />
                  </td>

                  {/* Volunteer */}
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

                  {/* Email */}
                  <td className="p-4 text-slate-400 text-xs">
                    {record.email}
                  </td>

                  {/* Drive */}
                  <td className="p-4 text-slate-500">
                    {record.drive}
                  </td>

                  {/* Date */}
                  <td className="p-4 text-slate-400">
                    {record.date}
                  </td>

                  {/* Hours */}
                  <td className="p-4">
                    {record.hours} hrs
                  </td>

                  {/* Status */}
                  <td className="p-4">
                    <span
                      className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                        record.status
                      )}`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredAttendance.length === 0 && (
          <p className="text-center text-slate-400 py-10 text-sm">
            No records found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Attendance;
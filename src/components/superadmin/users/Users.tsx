"use client";

import { Dispatch, FC, SetStateAction } from "react";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  CheckCircle2,
  Clock,
  Eye,
  Plus,
  Search,
  Trash2,
  Users as UsersIcon,
  Waves,
} from "lucide-react";

import Avatar from "../common/Avatar";
import { getStatusClass } from "../utils/status";

import type {
  CityData,
  ConfirmState,
  User,
} from "@/types/superadmin";

interface UsersProps {
  users: User[];
  filteredUsers: User[];

  userSearch: string;
  setUserSearch: Dispatch<SetStateAction<string>>;

  setUserModal: Dispatch<SetStateAction<boolean>>;

  setViewUser: Dispatch<SetStateAction<User | null>>;

  setConfirm: Dispatch<SetStateAction<ConfirmState | null>>;

  cityData: CityData[];

  pieColors: string[];
}

const Users: FC<UsersProps> = ({
  users,
  filteredUsers,
  userSearch,
  setUserSearch,
  setUserModal,
  setViewUser,
  setConfirm,
  cityData,
  pieColors,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Users</h1>
          <p className="text-slate-500 text-sm">
            View, add, or remove volunteer accounts.
          </p>
        </div>

        <button
          onClick={() => setUserModal(true)}
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center gap-2"
        >
          <Plus size={16} />
          Add User
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          {
            label: "Total Users",
            val: users.length,
            icon: UsersIcon,
            color: "text-amber-600",
            bg: "bg-amber-50",
          },
          {
            label: "Active",
            val: users.filter((u) => u.status === "Active").length,
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Inactive",
            val: users.filter((u) => u.status === "Inactive").length,
            icon: Clock,
            color: "text-slate-600",
            bg: "bg-slate-100",
          },
          {
            label: "Avg. Drives",
            val: Math.round(
              users.reduce((s, u) => s + u.drives, 0) /
                Math.max(users.length, 1)
            ),
            icon: Waves,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
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

      {/* City pie */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
          <h3 className="font-black text-slate-900 mb-4">
            📍 City Distribution
          </h3>

          <div className="flex items-center gap-4">
            <ResponsiveContainer width="50%" height={160}>
              <PieChart>
                <Pie
                  data={cityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={65}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                  fontSize={11}
                >
                  {cityData.map((_, i) => (
                    <Cell
                      key={i}
                      fill={pieColors[i % pieColors.length]}
                    />
                  ))}
                </Pie>

                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className="space-y-2">
              {cityData.map((d, i) => (
                <div
                  key={d.name}
                  className="flex items-center gap-2"
                >
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{
                      background:
                        pieColors[i % pieColors.length],
                    }}
                  />

                  <span className="text-sm text-slate-600 font-medium">
                    {d.name} — {d.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 flex flex-col justify-center">
          <h3 className="font-black text-slate-900 mb-4">
            🏆 Top Contributors
          </h3>

          <div className="space-y-3">
            {[...users]
              .sort((a, b) => (b.drives ?? 0) - (a.drives ?? 0))
              .slice(0, 4)
              .map((u, i) => (
                <div
                  key={u.id}
                  className="flex items-center gap-3 px-3 py-2.5 bg-slate-50 rounded-xl border border-slate-100"
                >
                  <span
                    className={`text-sm font-black w-5 ${
                      i === 0
                        ? "text-yellow-400"
                        : i === 1
                        ? "text-slate-400"
                        : i === 2
                        ? "text-orange-400"
                        : "text-slate-300"
                    }`}
                  >
                    #{i + 1}
                  </span>

                  <Avatar name={u.name} size="sm" />

                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm text-slate-900 truncate">
                      {u.name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {u.drives} drives
                    </p>
                  </div>

                  <span className="text-xs font-bold text-emerald-600">
                    {u.wasteKg ?? 0} kg
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={userSearch}
            onChange={(e) => setUserSearch(e.target.value)}
            placeholder="Search volunteers…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-left">
            <tr>
              {[
                "Volunteer",
                "Email",
                "City",
                "Drives",
                "Hours",
                "Waste (kg)",
                "Status",
                "Action",
              ].map((h) => (
                <th
                  key={h}
                  className="p-4 text-xs font-bold uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {filteredUsers.map((u) => (
              <tr
                key={u.id}
                className="border-t hover:bg-slate-50 transition cursor-pointer"
                onClick={() => setViewUser(u)}
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={u.name} />
                    <span className="font-semibold">
                      {u.name}
                    </span>
                  </div>
                </td>

                <td className="p-4 text-slate-400 text-xs">
                  {u.email}
                </td>

                <td className="p-4 text-slate-500">
                  {u.city}
                </td>

                <td className="p-4">{u.drives}</td>

                <td className="p-4">
                  {u.totalHours ?? 0} hrs
                </td>

                <td className="p-4">
                  {u.wasteKg ?? 0} kg
                </td>

                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                      u.status
                    )}`}
                  >
                    {u.status}
                  </span>
                </td>

                <td
                  className="p-4"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewUser(u)}
                      className="text-blue-600 font-semibold text-xs bg-blue-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <Eye size={12} />
                      View
                    </button>

                    <button
                      onClick={() =>
                        setConfirm({
                          type: "user",
                          id: u.id,
                          name: u.name,
                        })
                      }
                      className="text-red-600 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredUsers.length === 0 && (
          <p className="text-center text-slate-400 py-10 text-sm">
            No users found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Users;
"use client";

import { FC, Dispatch, SetStateAction } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Eye,
  Plus,
  Search,
  ShieldCheck,
  Trash2,
} from "lucide-react";

import Avatar from "../common/Avatar";
import { getStatusClass } from "../utils/status";

import type { Admin, ConfirmState } from "@/types/superadmin";

interface AdminsProps {
  admins: Admin[];
  filteredAdmins: Admin[];
  adminSearch: string;
  setAdminSearch: Dispatch<SetStateAction<string>>;
  setAdminModal: Dispatch<SetStateAction<boolean>>;
  setViewAdmin: Dispatch<SetStateAction<Admin | null>>;
  setConfirm: Dispatch<SetStateAction<ConfirmState | null>>;
  toggleAdminStatus: (
    id: number,
    status: string
  ) => Promise<void>;
}

const Admins: FC<AdminsProps> = ({
  admins,
  filteredAdmins,
  adminSearch,
  setAdminSearch,
  setAdminModal,
  setViewAdmin,
  setConfirm,
  toggleAdminStatus,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Admins</h1>
          <p className="text-slate-500 text-sm">
            Add, suspend, or remove admin accounts.
          </p>
        </div>

        <button
          onClick={() => setAdminModal(true)}
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center gap-2"
        >
          <Plus size={16} />
          Add Admin
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Admins",
            val: admins.length,
            icon: ShieldCheck,
            color: "text-indigo-600",
            bg: "bg-indigo-50",
          },
          {
            label: "Active",
            val: admins.filter((a) => a.status === "Active").length,
            icon: CheckCircle2,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
          },
          {
            label: "Suspended",
            val: admins.filter((a) => a.status === "Suspended").length,
            icon: AlertTriangle,
            color: "text-red-600",
            bg: "bg-red-50",
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

            <p className="text-3xl font-black text-slate-900">{s.val}</p>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={adminSearch}
            onChange={(e) => setAdminSearch(e.target.value)}
            placeholder="Search admins…"
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
                "Admin",
                "Email",
                "City",
                "Joined",
                "Last Active",
                "Status",
                "Actions",
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
            {filteredAdmins.map((a) => (
              <tr
                key={a.id}
                className="border-t hover:bg-slate-50 transition"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar name={a.name} />
                    <span className="font-semibold">{a.name}</span>
                  </div>
                </td>

                <td className="p-4 text-slate-400 text-xs">{a.email}</td>

                <td className="p-4 text-slate-500">{a.city}</td>

                <td className="p-4 text-slate-500">{a.joined}</td>

                <td className="p-4 text-slate-400 text-xs">
                  {a.lastActive ?? "—"}
                </td>

                <td className="p-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                      a.status
                    )}`}
                  >
                    {a.status}
                  </span>
                </td>

                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setViewAdmin(a)}
                      className="text-blue-600 font-semibold text-xs hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded-lg"
                    >
                      <Eye size={12} />
                      View
                    </button>

                    <button
                      onClick={() =>
                        toggleAdminStatus(a.id, a.status)
                      }
                      className="text-slate-600 font-semibold text-xs hover:text-slate-900 bg-slate-100 px-2.5 py-1.5 rounded-lg"
                    >
                      {a.status === "Active"
                        ? "Suspend"
                        : "Activate"}
                    </button>

                    <button
                      onClick={() =>
                        setConfirm({
                          type: "admin",
                          id: a.id,
                          name: a.name,
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

        {filteredAdmins.length === 0 && (
          <p className="text-center text-slate-400 py-10 text-sm">
            No admins found.
          </p>
        )}
      </div>
    </div>
  );
};

export default Admins;
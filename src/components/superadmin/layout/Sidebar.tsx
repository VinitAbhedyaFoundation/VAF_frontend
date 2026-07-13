"use client";

import { FC, ElementType } from "react";

import {
  ClipboardList,
  FileBarChart2,
  LayoutDashboard,
  Leaf,
  Settings,
  ShieldCheck,
  UserCircle,
  Waves,
} from "lucide-react";

import type { NavSection } from "@/types/superadmin";

interface SidebarProps {
  mobile?: boolean;
  active: NavSection;
  pendingBadge?: string;
  goTo: (section: NavSection) => void;
}

const NAV_ITEMS: {
  label: string;
  icon: ElementType;
  id: NavSection;
}[] = [
  {
    label: "Overview",
    icon: LayoutDashboard,
    id: "overview",
  },
  {
    label: "Manage Admins",
    icon: ShieldCheck,
    id: "admins",
  },
  {
    label: "Manage Users",
    icon: UserCircle,
    id: "users",
  },
  {
    label: "All Drives",
    icon: Waves,
    id: "drives",
  },
  {
    label: "Attendance Logs",
    icon: ClipboardList,
    id: "attendance",
  },
  {
    label: "Reports",
    icon: FileBarChart2,
    id: "reports",
  },
  {
    label: "System Settings",
    icon: Settings,
    id: "settings",
  },
];

const Sidebar: FC<SidebarProps> = ({
  mobile = false,
  active,
  pendingBadge,
  goTo,
}) => {
  return (
    <div
      className={`flex flex-col ${
        mobile
          ? "p-8 w-80"
          : "w-80 border-r border-slate-200 bg-white p-8 hidden xl:flex sticky top-0 h-screen"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl rotate-12 flex items-center justify-center shadow-lg shadow-emerald-200">
          <ShieldCheck
            className="text-white -rotate-12"
            size={20}
          />
        </div>

        <div>
          <h2 className="text-2xl font-black tracking-tighter text-emerald-950">
            VAF
          </h2>

          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest -mt-1">
            SuperAdmin
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const badge =
            item.id === "attendance"
              ? pendingBadge
              : undefined;

          return (
            <button
              key={item.id}
              onClick={() => goTo(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                active === item.id
                  ? "bg-emerald-900 text-white shadow-xl shadow-emerald-200"
                  : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                {item.label}
              </div>

              {badge && (
                <span className="text-[10px] opacity-60">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Bottom Card */}
      <div className="bg-slate-950 p-6 rounded-[2rem] text-white relative overflow-hidden mt-auto">
        <div className="absolute -right-4 -bottom-4 text-emerald-500/20 rotate-45">
          <Leaf size={120} />
        </div>

        <div className="relative z-10">
          <p className="text-[10px] font-bold text-emerald-400 uppercase mb-2">
            Logged in as
          </p>

          <h4 className="text-lg font-bold mb-1">
            Super Admin
          </h4>

          <p className="text-[11px] text-slate-400">
            admin@vaf.org
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
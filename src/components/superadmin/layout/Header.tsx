"use client";

import { FC } from "react";

import {
  Bell,
  LogOut,
  Menu,
} from "lucide-react";

import type { NavSection } from "@/types/superadmin";

interface HeaderProps {
  active: NavSection;
  pendingAttendance: number;
  onOpenMobileMenu: () => void;
  onLogout: () => void;
}

const SECTION_TITLES: Record<NavSection, string> = {
  overview: "Dashboard Overview",
  admins: "Manage Admins",
  users: "Manage Users",
  drives: "All Drives",
  attendance: "Attendance Logs",
  reports: "Reports",
  settings: "System Settings",
};

const Header: FC<HeaderProps> = ({
  active,
  pendingAttendance,
  onOpenMobileMenu,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200 px-4 lg:px-8 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <button
          className="xl:hidden p-2 rounded-xl hover:bg-slate-100"
          onClick={onOpenMobileMenu}
        >
          <Menu size={20} />
        </button>

        <div>
          <h1 className="text-xl font-black text-slate-900">
            {SECTION_TITLES[active]}
          </h1>

          <p className="text-xs text-slate-400">
            Volunteer Action Force
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2 rounded-xl hover:bg-slate-100 relative">
          <Bell size={18} />

          {pendingAttendance > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>

        <button
          onClick={onLogout}
          className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition"
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
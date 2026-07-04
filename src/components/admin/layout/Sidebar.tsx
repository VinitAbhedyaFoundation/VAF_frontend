import React from "react";
import { Leaf } from "lucide-react";

import { NAV_ITEMS } from "../../../constants/admin";
import type { SidebarProps } from "../../../types/admin";

const Sidebar: React.FC<SidebarProps> = ({
  mobile = false,
  activeNav,
  goTo,
  pendingBadge,
}) => {
  const sidebarClasses = mobile
    ? "flex flex-col themed-sidebar p-8 w-80"
    : "flex flex-col themed-sidebar w-80 border-r themed-border p-8 hidden xl:flex sticky top-0 h-screen";

  return (
    <div className={sidebarClasses}>
      <div className="flex items-center gap-2 mb-12">
        <div className="w-10 h-10 accent-bg rounded-xl rotate-12 flex items-center justify-center accent-shadow">
          <Leaf className="text-white -rotate-12" size={20} />
        </div>

        <div>
          <h2 className="text-2xl font-black tracking-tighter themed-text">
            VAF
          </h2>
          <p className="text-[10px] font-bold accent-text uppercase tracking-widest -mt-1">
            Portal
          </p>
        </div>
      </div>

      <nav className="space-y-2 flex-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeNav === item.id;
          const badge =
            item.id === "volunteers" ? pendingBadge : undefined;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => goTo(item.id)}
              aria-current={isActive ? "page" : undefined}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${
                isActive
                  ? "accent-nav-active accent-shadow"
                  : "themed-secondary themed-hover"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={20} />
                <span>{item.label}</span>
              </div>

              {badge && (
                <span className="text-[10px] opacity-60">{badge}</span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default React.memo(Sidebar);
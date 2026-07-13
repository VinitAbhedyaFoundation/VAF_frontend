"use client";

import { FC } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import Avatar from "../common/Avatar";
import { getStatusClass } from "../utils/status";

// TODO: Replace this with:
// import { User } from "@/types/superadmin";

interface User {
  id: number;
  name: string;
  email: string;
  city: string;
  drives: number;
  status: "Active" | "Inactive";
  joined: string;
  totalHours?: number;
  wasteKg?: number;
}

interface UserDrawerProps {
  user: User | null;
  onClose: () => void;
}

const UserDrawer: FC<UserDrawerProps> = ({
  user,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {user && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
              <h3 className="font-black text-slate-900">
                Volunteer Profile
              </h3>

              <button
                onClick={onClose}
                className="rounded-full p-1.5 transition hover:bg-slate-100"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6 flex flex-col items-center">
                <Avatar
                  name={user.name}
                  size="lg"
                />

                <h2 className="mt-3 text-xl font-black">
                  {user.name}
                </h2>

                <p className="text-sm text-slate-500">
                  {user.email}
                </p>

                <span
                  className={`mt-2 rounded-full px-3 py-1 text-xs font-bold ${getStatusClass(
                    user.status
                  )}`}
                >
                  {user.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: "City",
                    value: user.city,
                    icon: "📍",
                  },
                  {
                    label: "Joined",
                    value: user.joined,
                    icon: "📅",
                  },
                  {
                    label: "Drives Joined",
                    value: String(user.drives),
                    icon: "🌊",
                  },
                  {
                    label: "Total Hours",
                    value: `${user.totalHours ?? 0} hrs`,
                    icon: "🕐",
                  },
                  {
                    label: "Waste Collected",
                    value: `${user.wasteKg ?? 0} kg`,
                    icon: "♻️",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-slate-100 bg-slate-50 p-3"
                  >
                    <p className="mb-1 text-xs font-bold uppercase tracking-widest text-slate-400">
                      {item.icon} {item.label}
                    </p>

                    <p className="font-black text-slate-900">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default UserDrawer;
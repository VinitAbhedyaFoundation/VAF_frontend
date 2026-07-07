import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import type { Volunteer } from "../../../types/admin";

interface VolunteerDrawerProps {
  volunteer: Volunteer | null;
  onClose: () => void;
  onApprove: (volunteer: Volunteer) => void;
  getStatusClass: (status: string) => string;
}

const VolunteerDrawer: React.FC<VolunteerDrawerProps> = ({
  volunteer,
  onClose,
  onApprove,
  getStatusClass,
}) => {
  return (
    <AnimatePresence>
      {volunteer && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm themed-card z-50 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b themed-border">
              <h3 className="font-black themed-text">
                Volunteer Profile
              </h3>

              <button
                onClick={onClose}
                className="p-1.5 themed-hover rounded-full themed-muted"
              >
                <X size={18} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 accent-bg rounded-full flex items-center justify-center text-white text-3xl font-black mb-3">
                  {volunteer.name[0]}
                </div>

                <h2 className="text-xl font-black themed-text">
                  {volunteer.name}
                </h2>

                <p className="text-sm themed-secondary">
                  {volunteer.email}
                </p>

                <span
                  className={`mt-2 text-xs px-3 py-1 rounded-full font-bold ${getStatusClass(
                    volunteer.status
                  )}`}
                >
                  {volunteer.status}
                </span>

                {volunteer.isNew && (
                  <span className="mt-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-bold">
                    🆕 New Member
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  {
                    label: "City",
                    val: volunteer.city,
                    icon: "📍",
                  },
                  {
                    label: "Age",
                    val: `${volunteer.age} yrs`,
                    icon: "🎂",
                  },
                  {
                    label: "Drives Joined",
                    val: volunteer.drives,
                    icon: "🌊",
                  },
                  {
                    label: "Member Since",
                    val: volunteer.joined,
                    icon: "📅",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="themed-subtle rounded-xl p-3 border themed-border"
                  >
                    <p className="text-xs themed-muted font-bold uppercase tracking-widest mb-1">
                      {item.icon} {item.label}
                    </p>

                    <p className="font-black themed-text">
                      {item.val}
                    </p>
                  </div>
                ))}
              </div>

              {volunteer.status === "Pending" && (
                <button
                  onClick={() => onApprove(volunteer)}
                  className="w-full accent-bg accent-bg-hover text-white py-3 rounded-xl font-bold transition"
                >
                  ✓ Approve Volunteer
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default VolunteerDrawer;
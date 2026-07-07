import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import type { Drive } from "../../../types/admin";

interface DriveDetailsModalProps {
  drive: Drive | null;
  onClose: () => void;
}

const DriveDetailsModal: React.FC<DriveDetailsModalProps> = ({
  drive,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {drive && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 flex items-center justify-center z-50 px-4"
          >
            <div className="themed-card w-full max-w-lg rounded-3xl border themed-border shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-black themed-text">
                  {drive.title || "Cleanup Drive"}
                </h2>

                <button
                  onClick={onClose}
                  className="p-2 rounded-full themed-hover"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="space-y-4">
                <div className="themed-subtle rounded-2xl p-4">
                  <p className="text-xs themed-muted uppercase font-bold mb-1">
                    Location
                  </p>

                  <p className="font-semibold themed-text">
                    {drive.location ??
                      drive.driveLocation?.location ??
                      "Unknown Location"}
                  </p>
                </div>

                <div className="themed-subtle rounded-2xl p-4">
                  <p className="text-xs themed-muted uppercase font-bold mb-1">
                    Date
                  </p>

                  <p className="font-semibold themed-text">
                    {new Date(drive.date).toLocaleString()}
                  </p>
                </div>

                <div className="themed-subtle rounded-2xl p-4">
                  <p className="text-xs themed-muted uppercase font-bold mb-1">
                    Planned Hours
                  </p>

                  <p className="font-semibold themed-text">
                    {drive.totalHours} hours
                  </p>
                </div>

                <div className="themed-subtle rounded-2xl p-4">
                  <p className="text-xs themed-muted uppercase font-bold mb-1">
                    Status
                  </p>

                  <p className="font-semibold themed-text">
                    {drive.completed
                      ? "Completed ✅"
                      : "Pending ⏳"}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DriveDetailsModal;
"use client";

import { X, Trash2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CompleteDriveModalProps {
  open: boolean;
  onClose: () => void;
  totalWasteKg: string;
  setTotalWasteKg: (value: string) => void;
  submitting: boolean;
  handleCompleteDrive: () => void;
}

export default function CompleteDriveModal({
  open,
  onClose,
  totalWasteKg,
  setTotalWasteKg,
  submitting,
  handleCompleteDrive,
}: CompleteDriveModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-sm px-4"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              onClose();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.2 }}
            className="w-full max-w-md overflow-hidden rounded-2xl border bg-white shadow-2xl"
          >
            {/* HEADER */}
            <div className="flex items-center justify-between border-b px-6 py-5">
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  Complete Drive
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Record the total waste collected during this drive.
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="rounded-full p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              >
                <X size={20} />
              </button>
            </div>

            {/* BODY */}
            <div className="px-6 py-6">
              <div className="mb-5 rounded-xl bg-emerald-50 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Trash2
                    size={18}
                    className="text-emerald-600"
                  />

                  <p className="text-sm font-medium text-emerald-800">
                    Enter the total waste collected
                  </p>
                </div>

                <p className="mt-1 text-xs text-emerald-700">
                  This amount will be recorded for the entire drive.
                </p>
              </div>

              <label
                htmlFor="totalWasteKg"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Total Waste Collected (kg)
              </label>

              <div className="relative">
                <input
                  id="totalWasteKg"
                  type="number"
                  min="0"
                  step="0.1"
                  value={totalWasteKg}
                  onChange={(e) =>
                    setTotalWasteKg(e.target.value)
                  }
                  placeholder="e.g. 6"
                  autoFocus
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 pr-14 text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20"
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                  kg
                </span>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 border-t bg-slate-50 px-6 py-4">
              <button
                type="button"
                onClick={onClose}
                disabled={submitting}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCompleteDrive}
                disabled={
                  submitting ||
                  totalWasteKg.trim() === ""
                }
                className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {submitting
                  ? "Completing..."
                  : "Complete Drive"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
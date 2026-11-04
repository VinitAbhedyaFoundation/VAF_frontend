import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Pencil, MapPin, CalendarDays, Clock, CheckCircle2 } from "lucide-react";

import type { Drive } from "../../../types/admin";

interface DriveDetailsModalProps {
  drive: Drive | null;
  onClose: () => void;
  /** Pass this from the parent to enable editing for eligible drives. */
  onEdit?: (drive: Drive) => void;
}

const isUpcomingDrive = (drive: Drive): boolean => {
  if (drive.completed) return false;

  const startTime = new Date(drive.date).getTime();
  return Number.isFinite(startTime) && startTime > Date.now();
};

const DriveDetailsModal: React.FC<DriveDetailsModalProps> = ({
  drive,
  onClose,
  onEdit,
}) => {
  const canEdit = Boolean(drive && onEdit && isUpcomingDrive(drive));

  const handleEdit = () => {
    if (!drive || !onEdit || !canEdit) return;

    onClose();
    onEdit(drive);
  };

  return (
    <AnimatePresence>
      {drive && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-[2px]"
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto px-4 py-6"
            onClick={onClose}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="drive-details-title"
              className="themed-card themed-border my-auto w-full max-w-lg rounded-2xl border p-6 shadow-2xl sm:p-7"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="accent-text mb-1 text-xs font-bold uppercase tracking-wider">
                    Drive details
                  </p>
                  <h2
                    id="drive-details-title"
                    className="themed-text break-words text-xl font-bold sm:text-2xl"
                  >
                    {drive.title || "Cleanup Drive"}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close drive details"
                  className="themed-secondary themed-hover -mr-2 -mt-2 rounded-full p-2 transition-colors"
                >
                  <X size={19} />
                </button>
              </div>

              <div className="space-y-3">
                <div className="themed-surface-subtle themed-border rounded-xl border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <MapPin size={15} className="accent-text" />
                    <p className="themed-muted text-xs font-semibold uppercase tracking-wider">
                      Location
                    </p>
                  </div>
                  <p className="themed-text text-sm font-semibold">
                    {drive.location ??
                      drive.driveLocation?.location ??
                      "Unknown Location"}
                  </p>
                </div>

                <div className="themed-surface-subtle themed-border rounded-xl border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <CalendarDays size={15} className="accent-text" />
                    <p className="themed-muted text-xs font-semibold uppercase tracking-wider">
                      Date & Time
                    </p>
                  </div>
                  <p className="themed-text text-sm font-semibold">
                    {new Date(drive.date).toLocaleString("en-IN", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </p>
                </div>

                <div className="themed-surface-subtle themed-border rounded-xl border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Clock size={15} className="accent-text" />
                    <p className="themed-muted text-xs font-semibold uppercase tracking-wider">
                      Planned Hours
                    </p>
                  </div>
                  <p className="themed-text text-sm font-semibold">
                    {drive.totalHours} hours
                  </p>
                </div>

                <div className="themed-surface-subtle themed-border rounded-xl border p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <CheckCircle2 size={15} className="accent-text" />
                    <p className="themed-muted text-xs font-semibold uppercase tracking-wider">
                      Status
                    </p>
                  </div>
                  <p className="themed-text text-sm font-semibold">
                    {drive.completed
                      ? "Completed"
                      : isUpcomingDrive(drive)
                        ? "Upcoming"
                        : "Ongoing or recently ended"}
                  </p>
                </div>

                {drive.description?.trim() && (
                  <div className="themed-surface-subtle themed-border rounded-xl border p-4">
                    <p className="themed-muted mb-2 text-xs font-semibold uppercase tracking-wider">
                      Description
                    </p>
                    <p className="themed-text whitespace-pre-line text-sm leading-relaxed">
                      {drive.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="themed-border mt-6 flex flex-col-reverse gap-3 border-t pt-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="themed-secondary themed-text themed-border rounded-xl border px-4 py-2.5 text-sm font-semibold transition-colors hover:opacity-80"
                >
                  Close
                </button>

                {canEdit && (
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="accent-bg accent-bg-hover accent-shadow inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition-colors"
                  >
                    <Pencil size={15} />
                    Edit Drive
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default DriveDetailsModal;

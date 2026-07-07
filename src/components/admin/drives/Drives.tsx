import React from "react";
import { motion } from "framer-motion";
import { Plus, MapPin, Clock, ChevronRight } from "lucide-react";

import type { Drive } from "../../../types/admin";
import SectionLoader from "../common/SectionLoader";

interface DrivesProps {
  drives: Drive[];
  loadingDrives: boolean;
  setShowDriveModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDrive: React.Dispatch<React.SetStateAction<Drive | null>>;
  handleCompleteDrive: (driveId: number) => void;
  handleGenerateCertificates: (driveId: number) => void;
}

const Drives: React.FC<DrivesProps> = ({
  drives,
  loadingDrives,
  setShowDriveModal,
  setSelectedDrive,
  handleCompleteDrive,
  handleGenerateCertificates,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold themed-text">Drives</h1>
          <p className="themed-secondary text-sm">
            Manage and track all cleanup drives.
          </p>
        </div>

        <button
          onClick={() => setShowDriveModal(true)}
          className="accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition accent-shadow flex items-center gap-2"
        >
          <Plus size={16} />
          Create Drive
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            label: "Total Drives",
            val: drives.length,
          },
          {
            label: "Completed",
            val: drives.filter((d) => d.completed).length,
          },
          {
            label: "Upcoming",
            val: drives.filter(
              (d) => !d.completed && new Date(d.date) >= new Date()
            ).length,
          },
        ].map((s) => (
          <div
            key={s.label}
            className="themed-card rounded-2xl p-5 border themed-border shadow-sm"
          >
            <p className="text-xs font-bold themed-muted uppercase tracking-widest mb-1">
              {s.label}
            </p>

            <p className="text-3xl font-black themed-text">{s.val}</p>
          </div>
        ))}
      </div>

      {loadingDrives ? (
        <SectionLoader />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drives.map((drive) => (
            <motion.div
              key={drive.id}
              layout
              className="themed-card p-5 rounded-2xl shadow-sm border themed-border themed-hover transition flex flex-col"
            >
              <div className="mb-4 flex-1">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h2 className="font-bold text-lg themed-text">
                    {drive.title || "Cleanup Drive"}
                  </h2>

                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap shrink-0 ${
                      drive.completed
                        ? "bg-green-100 text-green-700"
                        : new Date(drive.date) < new Date()
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {drive.completed
                      ? "Completed"
                      : new Date(drive.date) < new Date()
                      ? "Active"
                      : "Upcoming"}
                  </span>
                </div>

                <p className="text-sm themed-muted">
                  {new Date(drive.date).toLocaleDateString("en-IN", {
                    weekday: "long",
                    day: "numeric",
                    month: "short",
                  })}
                </p>

                <div className="mt-3 space-y-1.5">
                  <p className="text-sm themed-secondary flex items-center gap-2">
                    <MapPin size={14} className="accent-text shrink-0" />
                    {drive.location ??
                      drive.driveLocation?.location ??
                      "Unknown Location"}
                  </p>

                  <p className="text-sm themed-secondary flex items-center gap-2">
                    <Clock size={14} className="text-blue-500 shrink-0" />
                    {drive.totalHours} hrs planned
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t themed-border mb-3">
                <button
                  onClick={() => setSelectedDrive(drive)}
                  className="accent-text text-sm font-semibold inline-flex items-center gap-1 accent-text-hover"
                >
                  View Details
                  <ChevronRight size={16} />
                </button>
              </div>

              {!drive.completed && (
                <button
                  onClick={() => handleCompleteDrive(drive.id)}
                  className="w-full py-2.5 mb-2 rounded-xl font-semibold text-sm transition-all duration-300 bg-slate-700 hover:bg-slate-800 text-white"
                >
                  Mark as Completed ✓
                </button>
              )}

              <button
                disabled={
                  drive.certificateIssued || !drive.completed
                }
                onClick={() =>
                  handleGenerateCertificates(drive.id)
                }
                className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                  drive.certificateIssued
                    ? "bg-gray-200 cursor-not-allowed text-gray-500"
                    : !drive.completed
                    ? "bg-gray-200 cursor-not-allowed text-gray-400"
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {drive.certificateIssued
                  ? "Certificates Issued ✅"
                  : !drive.completed
                  ? "Complete drive to unlock"
                  : "Generate Certificates"}
              </button>
            </motion.div>
          ))}

          {drives.length === 0 && (
            <p className="col-span-3 text-center themed-muted py-10">
              No drives found. Create one!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Drives;
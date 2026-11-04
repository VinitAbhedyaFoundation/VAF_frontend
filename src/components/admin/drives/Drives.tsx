import React from "react";
import { motion } from "framer-motion";
import {
  Plus,
  MapPin,
  Clock,
  ChevronRight,
  CalendarDays,
  CheckCircle2,
  Activity,
} from "lucide-react";

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

type DriveStatus = "Completed" | "Upcoming" | "Ongoing" | "Recently Ended";

const getDriveStatus = (drive: Drive): DriveStatus => {
  if (drive.completed) return "Completed";

  const start = new Date(drive.date).getTime();
  const now = Date.now();
  const endWithGrace =
    start + (Number(drive.totalHours) + 2) * 60 * 60 * 1000;

  if (now < start) return "Upcoming";
  if (now <= endWithGrace) return "Ongoing";

  return "Recently Ended";
};

const getStatusClass = (status: DriveStatus) => {
  switch (status) {
    case "Completed":
      return "bg-green-100 text-green-700";
    case "Upcoming":
      return "bg-blue-100 text-blue-700";
    case "Ongoing":
      return "bg-amber-100 text-amber-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
};

const getInitiativeLabel = (initiative?: string | null) => {
  switch (initiative) {
    case "LAAL_BINDI":
      return "Laal Bindi";
    case "SOCIAL_SHELF":
      return "Social Shelf";
    case "SAMBHAJINAGAR_PLOGGERS":
      return "Sambhajinagar Ploggers";
    default:
      return initiative || "Initiative not specified";
  }
};

const getLocalDateKey = (value: string | Date) => {
  const date = new Date(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
};

const formatDriveDate = (value: string | Date) =>
  new Date(value).toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const Drives: React.FC<DrivesProps> = ({
  drives,
  loadingDrives,
  setShowDriveModal,
  setSelectedDrive,
  handleCompleteDrive,
  handleGenerateCertificates,
}) => {
  const now = new Date();
  const todayKey = getLocalDateKey(now);

  const todayDrives = drives
    .filter((drive) => getLocalDateKey(drive.date) === todayKey)
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  const upcomingDrives = drives
    .filter(
      (drive) =>
        !drive.completed &&
        getLocalDateKey(drive.date) !== todayKey &&
        new Date(drive.date).getTime() > now.getTime(),
    )
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  const ongoingDrives = drives
    .filter((drive) => {
      const status = getDriveStatus(drive);
      return (
        !drive.completed &&
        status === "Ongoing" &&
        getLocalDateKey(drive.date) !== todayKey
      );
    })
    .sort(
      (a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

  const recentlyEndedDrives = drives.filter(
    (drive) => !drive.completed && getDriveStatus(drive) === "Recently Ended",
  );

  const completedDrives = drives.filter((drive) => drive.completed);

  const stats = [
    { label: "Total Drives", value: drives.length, icon: CalendarDays },
    { label: "Today's Drives", value: todayDrives.length, icon: Activity },
    { label: "Upcoming", value: upcomingDrives.length, icon: Clock },
    { label: "Completed", value: completedDrives.length, icon: CheckCircle2 },
  ];

  const renderDriveCards = (items: Drive[]) => (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {items.map((drive) => {
        const status = getDriveStatus(drive);

        return (
          <motion.div
            key={drive.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="themed-card themed-border themed-hover flex flex-col rounded-2xl border p-5 shadow-sm transition"
          >
            <div className="mb-4 flex-1">
              <div className="mb-2 flex items-start justify-between gap-3">
                <h3 className="themed-text text-lg font-bold leading-snug">
                  {drive.title || "Cleanup Drive"}
                </h3>

                <span
                  className={`shrink-0 whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-bold ${getStatusClass(status)}`}
                >
                  {status}
                </span>
              </div>

              <p className="themed-muted flex items-center gap-2 text-xs">
                <CalendarDays size={13} className="shrink-0" />
                {formatDriveDate(drive.date)}
              </p>

              <div className="mt-4 space-y-2">
                <p className="themed-secondary flex items-center gap-2 text-sm">
                  <MapPin size={14} className="accent-text shrink-0" />
                  <span className="min-w-0 break-words">
                    {drive.location ??
                      drive.driveLocation?.location ??
                      "Unknown Location"}
                  </span>
                </p>

                <p className="themed-secondary flex items-center gap-2 text-sm">
                  <Clock size={14} className="shrink-0 text-blue-500" />
                  {drive.totalHours} hours planned
                </p>

                <p className="themed-secondary text-sm">
                  <span className="font-semibold">Initiative:</span>{" "}
                  {getInitiativeLabel(drive.initiative)}
                </p>

                {drive.description?.trim() && (
                  <p className="themed-secondary line-clamp-3 whitespace-pre-line pt-1 text-sm">
                    <span className="font-semibold">Description:</span>{" "}
                    {drive.description}
                  </p>
                )}
              </div>
            </div>

            <div className="themed-border mb-3 border-t pt-3">
              <button
                type="button"
                onClick={() => setSelectedDrive(drive)}
                className="accent-text accent-text-hover inline-flex items-center gap-1 text-sm font-semibold"
              >
                View Details
                <ChevronRight size={16} />
              </button>
            </div>

            {!drive.completed && (
              <button
                type="button"
                onClick={() => handleCompleteDrive(drive.id)}
                className="mb-2 w-full rounded-xl bg-slate-700 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                Mark as Completed
              </button>
            )}

            <button
              type="button"
              disabled={drive.certificateIssued || !drive.completed}
              onClick={() => handleGenerateCertificates(drive.id)}
              className={`w-full rounded-xl py-2.5 text-sm font-semibold transition-colors ${drive.certificateIssued
                  ? "cursor-not-allowed bg-gray-200 text-gray-500"
                  : !drive.completed
                    ? "cursor-not-allowed bg-gray-200 text-gray-400"
                    : "bg-indigo-600 text-white hover:bg-indigo-700"
                }`}
            >
              {drive.certificateIssued
                ? "Certificates Issued"
                : !drive.completed
                  ? "Complete drive to unlock"
                  : "Generate Certificates"}
            </button>
          </motion.div>
        );
      })}
    </div>
  );

  const renderSection = (
    title: string,
    subtitle: string,
    items: Drive[],
    emptyMessage: string,
  ) => (
    <section className="mb-8">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="themed-text text-lg font-bold">{title}</h2>
          <p className="themed-muted mt-0.5 text-xs">{subtitle}</p>
        </div>
        <span className="themed-secondary rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold dark:bg-slate-800">
          {items.length}
        </span>
      </div>

      {items.length > 0 ? (
        renderDriveCards(items)
      ) : (
        <div className="themed-card themed-border rounded-2xl border border-dashed px-5 py-8 text-center">
          <p className="themed-muted text-sm">{emptyMessage}</p>
        </div>
      )}
    </section>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="themed-text text-2xl font-bold">Drives</h1>
          <p className="themed-secondary mt-1 text-sm">
            Manage and track today's, upcoming and completed cleanup drives.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowDriveModal(true)}
          className="accent-bg accent-bg-hover accent-shadow inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white transition"
        >
          <Plus size={16} />
          Create Drive
        </button>
      </div>

      {loadingDrives ? (
        <SectionLoader />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="themed-card themed-border flex items-center gap-4 rounded-2xl border p-5 shadow-sm"
                >
                  <div className="accent-bg/10 accent-text flex h-11 w-11 shrink-0 items-center justify-center rounded-xl">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="themed-muted text-xs font-bold uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <p className="themed-text mt-1 text-2xl font-black">
                      {stat.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {drives.length === 0 ? (
            <div className="themed-card themed-border rounded-2xl border px-5 py-12 text-center">
              <CalendarDays
                size={30}
                className="themed-muted mx-auto mb-3"
              />
              <h2 className="themed-text font-semibold">No drives yet</h2>
              <p className="themed-muted mt-1 text-sm">
                Create your first drive to get started.
              </p>
            </div>
          ) : (
            <>
              {renderSection(
                "Today's Drives",
                "Drives scheduled for today, including active drives.",
                todayDrives,
                "No drives scheduled for today.",
              )}

              {renderSection(
                "Upcoming Drives",
                "Future drives volunteers can prepare for and join.",
                upcomingDrives,
                "No upcoming drives scheduled.",
              )}

              {ongoingDrives.length > 0 &&
                renderSection(
                  "Ongoing Drives",
                  "Drives currently within their active attendance window.",
                  ongoingDrives,
                  "No other ongoing drives.",
                )}

              {recentlyEndedDrives.length > 0 &&
                renderSection(
                  "Recently Ended",
                  "Drives still within the two-hour attendance grace period.",
                  recentlyEndedDrives,
                  "No recently ended drives.",
                )}

              {completedDrives.length > 0 &&
                renderSection(
                  "Completed Drives",
                  "Drives marked as completed.",
                  completedDrives,
                  "No completed drives yet.",
                )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Drives;

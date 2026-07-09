import type {
  UpcomingDrive,
  Participation,
} from "@/types/user";
import {
  Loader2,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";
import type { FC } from "react";

interface DriveActionButtonProps {
  drive: UpcomingDrive;
  participation: Participation | undefined;
  onJoin: (drive: UpcomingDrive) => Promise<void>;
  onMarkAttendance: (driveId: number) => Promise<void>;
  loadingId: string | null;
  compact?: boolean;
}

const DriveActionButton: FC<DriveActionButtonProps> = ({
  drive,
  participation,
  onJoin,
  onMarkAttendance,
  loadingId,
  compact = false,
}) => {
  const isLoading = loadingId === drive.id;
  const py = compact ? "py-2" : "py-2.5";
  const baseClass = `w-full ${py} rounded-2xl text-sm font-bold transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`;

  if (isLoading) {
    return (
      <button disabled className={`${baseClass} bg-slate-100 text-slate-500`}>
        <Loader2 size={14} className="animate-spin" /> Working…
      </button>
    );
  }

  // State 1: Not joined
  if (!participation) {
    return (
      <button
        onClick={() => onJoin(drive)}
        className={`${baseClass} bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100`}
      >
        Join Drive
      </button>
    );
  }

  // State 2: Joined, drive not yet completed
  if (!drive.completed) {
    return (
      <button
        disabled
        className={`${baseClass} bg-blue-50 text-blue-700 border border-blue-200`}
      >
        <CheckCircle2 size={14} /> Joined · Awaiting Drive
      </button>
    );
  }

  // State 3: Drive completed, attendance not yet submitted
  if (drive.completed && !participation.attendanceMarked) {
    return (
      <button
        onClick={() => onMarkAttendance(Number(drive.id))}
        className={`${baseClass} bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-100`}
      >
        <ShieldCheck size={14} /> Mark Attendance
      </button>
    );
  }

  // State 4: Attendance submitted, pending admin approval
  if (participation.status === "Pending") {
    return (
      <button
        disabled
        className={`${baseClass} bg-orange-50 text-orange-700 border border-orange-200`}
      >
        Submitted · Awaiting Approval
      </button>
    );
  }

  // State 5: Approved
  if (participation.status === "Approved") {
    return (
      <button
        disabled
        className={`${baseClass} bg-emerald-50 text-emerald-700 border border-emerald-200`}
      >
        <CheckCircle2 size={14} /> Approved · Certificate Available
      </button>
    );
  }

  // Rejected
  if (participation.status === "Rejected") {
    return (
      <button
        disabled
        className={`${baseClass} bg-red-50 text-red-600 border border-red-200`}
      >
        Attendance Rejected
      </button>
    );
  }

  return null;
};
export default DriveActionButton;
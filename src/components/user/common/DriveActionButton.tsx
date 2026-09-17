import { useState } from "react";
import { createPortal } from "react-dom";
import type { UpcomingDrive, Participation } from "@/types/user";
import {
  Loader2,
  CheckCircle2,
  ShieldCheck,
  QrCode,
  X,
} from "lucide-react";
import type { FC } from "react";
import { QRCodeSVG } from "qrcode.react";

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
  const [showQR, setShowQR] = useState(false);

  const isLoading = loadingId === drive.id;
  const py = compact ? "py-2" : "py-2.5";

  const baseClass = `w-full ${py} rounded-2xl text-sm font-bold transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed`;

  if (isLoading) {
    return (
      <button
        disabled
        className={`${baseClass} bg-slate-100 text-slate-500`}
      >
        <Loader2 size={14} className="animate-spin" />
        Working…
      </button>
    );
  }

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

  if (!drive.completed) {
    return (
      <>
        <div className="space-y-2">
          <button
            disabled
            className={`${baseClass} bg-blue-50 text-blue-700 border border-blue-200`}
          >
            <CheckCircle2 size={14} />
            Joined · Awaiting Drive
          </button>

          <button
            onClick={() => setShowQR(true)}
            className={`${baseClass} bg-slate-900 text-white hover:bg-slate-800`}
          >
            <QrCode size={15} />
            Show Attendance QR
          </button>
        </div>

        {showQR &&
          createPortal(
            <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/90 p-4">
              <div className="relative flex h-full w-full flex-col items-center justify-center overflow-auto bg-white p-6 sm:p-10">
                
                {/* Close */}
                <button
                  onClick={() => setShowQR(false)}
                  className="absolute right-5 top-5 z-10 rounded-full p-3 text-slate-500 transition hover:bg-slate-100 hover:text-red-500"
                  aria-label="Close QR"
                >
                  <X size={30} />
                </button>

                {/* Header */}
                <div className="mb-6 text-center sm:mb-8">
                  <QrCode
                    size={42}
                    className="mx-auto mb-3 text-slate-900"
                  />

                  <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                    Attendance QR
                  </h2>

                  <p className="mt-2 text-sm text-slate-500 sm:text-base">
                    Show this QR code to the Admin
                  </p>
                </div>

                {/* QR */}
                <div className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl sm:p-6">
                  <QRCodeSVG
                    value={JSON.stringify({
                      participationId: participation.id,
                    })}
                    size={320}
                    level="M"
                    includeMargin
                  />
                </div>

                {/* Drive */}
                <div className="mt-6 text-center sm:mt-8">
                  <p className="text-xl font-bold text-slate-900">
                    {drive.title}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Admin will scan this code to mark your attendance.
                  </p>
                </div>

                {/* Close */}
                <button
                  onClick={() => setShowQR(false)}
                  className="mt-6 w-full max-w-sm rounded-xl bg-slate-900 py-3 text-base font-bold text-white transition hover:bg-slate-800 sm:mt-8"
                >
                  Close
                </button>
              </div>
            </div>,
            document.body
          )}
      </>
    );
  }

  if (drive.completed && !participation.attendanceMarked) {
    return (
      <button
        onClick={() => onMarkAttendance(Number(drive.id))}
        className={`${baseClass} bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-100`}
      >
        <ShieldCheck size={14} />
        Mark Attendance
      </button>
    );
  }

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

  if (participation.status === "Approved") {
    return (
      <button
        disabled
        className={`${baseClass} bg-emerald-50 text-emerald-700 border border-emerald-200`}
      >
        <CheckCircle2 size={14} />
        Approved · Certificate Available
      </button>
    );
  }

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
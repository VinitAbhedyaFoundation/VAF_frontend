import React, { useRef } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import toast from "react-hot-toast";

import { scanAttendance } from "../../../api/attendance";

interface AttendanceScannerProps {
  onClose: () => void;
}

const AttendanceScanner: React.FC<AttendanceScannerProps> = ({
  onClose,
}) => {
  const scanned = useRef(false);

  const handleScan = async (
    results: { rawValue: string }[]
  ) => {
    if (scanned.current) return;
    if (!results?.length) return;

    scanned.current = true;

    try {
      const qr = JSON.parse(results[0].rawValue);

      if (!qr.participationId) {
        throw new Error("Invalid QR");
      }

      const response = await scanAttendance(
        qr.participationId
      );

      toast.success(response.message);

      setTimeout(() => {
        onClose();

        // Temporary refresh
        window.location.reload();
      }, 700);
    } catch (err: any) {
      scanned.current = false;

      toast.error(
        err?.response?.data?.message ||
          "Invalid QR Code"
      );
    }
  };

  return (
    <div className="space-y-4">
      <Scanner
        onScan={handleScan}
        styles={{
          container: {
            width: "100%",
          },
        }}
      />

      <button
        onClick={() => {
          scanned.current = false;
          onClose();
        }}
        className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
      >
        Close Scanner
      </button>
    </div>
  );
};

export default AttendanceScanner;
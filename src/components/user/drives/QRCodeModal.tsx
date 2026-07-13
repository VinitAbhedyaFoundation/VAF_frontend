import React from "react";
import QRCode from "react-qr-code";

interface Props {
  open: boolean;
  onClose: () => void;
  participationId: number;
  driveTitle: string;
}

const QRCodeModal: React.FC<Props> = ({
  open,
  onClose,
  participationId,
  driveTitle,
}) => {
  if (!open) return null;

  const qrData = JSON.stringify({
    participationId,
  });

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 relative">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-400 hover:text-red-500"
        >
          ×
        </button>

        <h2 className="text-2xl font-bold text-center mb-2">
          Volunteer QR
        </h2>

        <p className="text-center text-gray-500 mb-6">
          {driveTitle}
        </p>

        <div className="flex justify-center bg-white p-4 rounded-xl">
          <QRCode
            value={qrData}
            size={220}
          />
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Participation ID
          </p>

          <p className="text-xl font-bold">
            #{participationId}
          </p>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          Show this QR to the event organizer for attendance.
        </p>
      </div>
    </div>
  );
};

export default QRCodeModal;
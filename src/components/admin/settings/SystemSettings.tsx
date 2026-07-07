import React from "react";
import { AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";

import SettingsCard from "./SettingsCard";

interface SystemSettingsProps {
  setShowDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

const SystemSettings: React.FC<SystemSettingsProps> = ({
  setShowDeleteConfirm,
}) => {
  const handleResetSettings = () => {
    toast.success("Settings reset");
  };

  return (
    <SettingsCard
      title="Danger Zone"
      description="Irreversible actions — proceed with caution"
      icon={AlertTriangle}
      danger
    >
      <div className="space-y-3">
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-semibold themed-text">
              Reset All Settings
            </p>

            <p className="text-xs themed-muted">
              Restore all settings to default values
            </p>
          </div>

          <button
            onClick={handleResetSettings}
            className="text-sm font-bold text-orange-600 px-4 py-2 bg-orange-50 rounded-xl hover:bg-orange-100 transition"
          >
            Reset
          </button>
        </div>

        <div className="flex items-center justify-between py-2 border-t border-red-100">
          <div>
            <p className="text-sm font-semibold text-red-700">
              Delete All Data
            </p>

            <p className="text-xs text-red-400">
              Permanently erase all volunteers, drives, and records
            </p>
          </div>

          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="text-sm font-bold text-red-600 px-4 py-2 bg-red-50 rounded-xl hover:bg-red-100 transition border border-red-200"
          >
            Delete
          </button>
        </div>
      </div>
    </SettingsCard>
  );
};

export default SystemSettings;
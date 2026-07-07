import React from "react";
import { AlertTriangle, Key, Lock } from "lucide-react";
import toast from "react-hot-toast";

import SettingsCard from "./SettingsCard";
import InputField from "../common/InputField";

interface SecuritySettingsProps {
  currentPassword: string;
  setCurrentPassword: React.Dispatch<React.SetStateAction<string>>;

  newPassword: string;
  setNewPassword: React.Dispatch<React.SetStateAction<string>>;

  confirmPassword: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
}

const SecuritySettings: React.FC<SecuritySettingsProps> = ({
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
}) => {
  const handlePasswordUpdate = () => {
    toast.success("Password updated!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <SettingsCard
      title="Change Password"
      description="Update your admin account password"
      icon={Key}
    >
      <div className="space-y-3">
        <InputField
          label="Current Password"
          type="password"
          value={currentPassword}
          onChange={setCurrentPassword}
          placeholder="••••••••"
        />

        <InputField
          label="New Password"
          type="password"
          value={newPassword}
          onChange={setNewPassword}
          placeholder="••••••••"
        />

        <InputField
          label="Confirm New Password"
          type="password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          placeholder="••••••••"
        />

        {newPassword &&
          confirmPassword &&
          newPassword !== confirmPassword && (
            <p className="text-xs text-red-500 flex items-center gap-1">
              <AlertTriangle size={12} />
              Passwords do not match
            </p>
          )}

        <button
          onClick={handlePasswordUpdate}
          disabled={
            !currentPassword ||
            !newPassword ||
            newPassword !== confirmPassword
          }
          className="flex items-center gap-2 accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition disabled:opacity-40"
        >
          <Lock size={14} />
          Update Password
        </button>
      </div>
    </SettingsCard>
  );
};

export default SecuritySettings;
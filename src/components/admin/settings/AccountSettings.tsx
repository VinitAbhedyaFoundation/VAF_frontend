import React from "react";
import { Save, UserCircle } from "lucide-react";

import SettingsCard from "./SettingsCard";
import InputField from "../common/InputField";

interface AccountSettingsProps {
  orgName: string;
  setOrgName: React.Dispatch<React.SetStateAction<string>>;

  adminName: string;
  setAdminName: React.Dispatch<React.SetStateAction<string>>;

  adminEmail: string;
  setAdminEmail: React.Dispatch<React.SetStateAction<string>>;

  saving: boolean;
  handleSave: () => void;

  Spinner: React.FC<{ size?: number }>;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({
  orgName,
  setOrgName,
  adminName,
  setAdminName,
  adminEmail,
  setAdminEmail,
  saving,
  handleSave,
  Spinner,
}) => {
  return (
    <SettingsCard
      title="Organization Profile"
      description="Basic details about your organization"
      icon={UserCircle}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <InputField
          label="Organization Name"
          value={orgName}
          onChange={setOrgName}
          placeholder="Organization Name"
        />

        <InputField
          label="Admin Name"
          value={adminName}
          onChange={setAdminName}
          placeholder="Admin Name"
        />

        <InputField
          label="Admin Email"
          type="email"
          value={adminEmail}
          onChange={setAdminEmail}
          placeholder="admin@vaf.org"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition disabled:opacity-60"
      >
        {saving ? <Spinner size={14} /> : <Save size={14} />}
        Save Changes
      </button>
    </SettingsCard>
  );
};

export default AccountSettings;
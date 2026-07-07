import React from "react";
import toast from "react-hot-toast";
import {
  Cloud,
  Download,
  HardDrive,
  Save,
  Upload,
} from "lucide-react";

import SettingsCard from "./SettingsCard";
import Toggle from "./Toggle";
import InputField from "../common/InputField";
import SelectField from "../common/SelectField";

interface ExportItem {
  label: string;
  count: number;
  icon: string;
  data: any[];
}

interface DataSettingsProps {
  autoBackup: boolean;
  setAutoBackup: React.Dispatch<React.SetStateAction<boolean>>;

  backupFrequency: string;
  setBackupFrequency: React.Dispatch<React.SetStateAction<string>>;

  retentionDays: string;
  setRetentionDays: React.Dispatch<React.SetStateAction<string>>;

  exportFormat: string;
  setExportFormat: React.Dispatch<React.SetStateAction<string>>;

  exportItems: ExportItem[];

  handleExport: (label: string, data: any[]) => void;
  handleSave: () => void;

  saving: boolean;

  Spinner: React.FC<{ size?: number }>;
}

const DataSettings: React.FC<DataSettingsProps> = ({
  autoBackup,
  setAutoBackup,
  backupFrequency,
  setBackupFrequency,
  retentionDays,
  setRetentionDays,
  exportFormat,
  setExportFormat,
  exportItems,
  handleExport,
  handleSave,
  saving,
  Spinner,
}) => {
  return (
    <>
      <SettingsCard
        title="Automated Backups"
        description="Configure scheduled data backups"
        icon={Cloud}
      >
        <Toggle
          enabled={autoBackup}
          onChange={setAutoBackup}
          label="Enable Auto Backup"
          description="Automatically backup all data on schedule"
        />

        <div
          className={`mt-4 grid grid-cols-2 gap-3 transition-opacity ${
            autoBackup ? "" : "opacity-40 pointer-events-none"
          }`}
        >
          <SelectField
            label="Frequency"
            value={backupFrequency}
            onChange={setBackupFrequency}
            options={["Daily", "Weekly", "Monthly"]}
          />

          <InputField
            label="Retention (days)"
            type="number"
            value={retentionDays}
            onChange={setRetentionDays}
          />
        </div>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => toast.success("Manual backup started!")}
            className="flex items-center gap-1.5 text-sm font-semibold accent-text px-4 py-2 accent-bg-soft rounded-xl hover:accent-bg-soft-dark transition"
          >
            <HardDrive size={14} />
            Backup Now
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 accent-bg accent-bg-hover text-white px-4 py-2 rounded-xl text-sm font-bold transition disabled:opacity-60"
          >
            {saving ? <Spinner size={14} /> : <Save size={14} />}
            Save Settings
          </button>
        </div>
      </SettingsCard>

      <SettingsCard
        title="Export Data"
        description="Download your data"
        icon={Download}
      >
        <div className="flex gap-2 mb-4 flex-wrap">
          {["CSV"].map((format) => (
            <button
              key={format}
              onClick={() => setExportFormat(format)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                exportFormat === format
                  ? "accent-bg text-white"
                  : "themed-subtle themed-secondary themed-hover"
              }`}
            >
              {format}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {exportItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleExport(item.label, item.data)}
              className="flex items-center justify-between p-3 themed-subtle rounded-xl border themed-border themed-hover transition text-left group"
            >
              <div>
                <p className="text-xs font-bold themed-muted uppercase tracking-widest">
                  {item.icon} {item.label}
                </p>

                <p className="font-black themed-text mt-0.5">
                  {item.count} records
                </p>
              </div>

              <Download
                size={16}
                className="themed-muted group-hover:accent-text transition"
              />
            </button>
          ))}
        </div>
      </SettingsCard>

      <SettingsCard
        title="Import Data"
        description="Bulk upload volunteers or drives via CSV"
        icon={Upload}
      >
        <div
          onClick={() => toast("CSV upload coming soon!")}
          className="border-2 border-dashed themed-border rounded-2xl p-8 text-center hover:border-current themed-hover transition cursor-pointer group"
        >
          <Upload
            size={24}
            className="mx-auto themed-muted group-hover:accent-text transition mb-2"
          />

          <p className="text-sm font-semibold themed-secondary">
            Click to upload a CSV file
          </p>

          <p className="text-xs themed-muted mt-1">
            Max 5MB · Supported: volunteers, drives
          </p>
        </div>
      </SettingsCard>
    </>
  );
};

export default DataSettings;
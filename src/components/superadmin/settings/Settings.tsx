"use client";

import { Dispatch, FC, SetStateAction } from "react";

import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  Settings as SettingsIcon,
  Trash2,
} from "lucide-react";

import toast from "react-hot-toast";

import InputField from "../common/InputField";

import type {
  AppSettings,
  NavSection,
} from "@/types/superadmin";

interface SettingsProps {
  settings: AppSettings;
  setSettings: Dispatch<SetStateAction<AppSettings>>;
  goTo: (section: NavSection) => void;
}

const Settings: FC<SettingsProps> = ({
  settings,
  setSettings,
  goTo,
}) => {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">
          System Settings
        </h1>

        <p className="text-slate-500 mt-1">
          Configure platform-wide preferences and access
          rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Organisation */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <SettingsIcon size={20} />
            </div>

            <h3 className="font-black text-slate-900">
              Organisation
            </h3>
          </div>

          <InputField
            label="Organisation Name"
            value={settings.orgName}
            onChange={(value) =>
              setSettings((prev) => ({
                ...prev,
                orgName: value,
              }))
            }
            placeholder="e.g. Volunteer Action Force"
          />

          <InputField
            label="Contact Email"
            type="email"
            value={settings.contactEmail}
            onChange={(value) =>
              setSettings((prev) => ({
                ...prev,
                contactEmail: value,
              }))
            }
          />

          <InputField
            label="Max Drive Hours"
            type="number"
            value={String(settings.maxDriveHours)}
            onChange={(value) =>
              setSettings((prev) => ({
                ...prev,
                maxDriveHours: Number(value),
              }))
            }
          />
        </div>

        {/* Toggles */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Bell size={20} />
            </div>

            <h3 className="font-black text-slate-900">
              Notifications & Access
            </h3>
          </div>

          {(
            [
              {
                key: "notifyNewDrive",
                label: "Notify on new drive",
                desc: "Email alert when a drive is created",
              },
              {
                key: "notifyNewVolunteer",
                label: "Notify on new volunteer",
                desc: "Alert when a new user registers",
              },
              {
                key: "notifyWeeklyReport",
                label: "Weekly report email",
                desc: "Auto-send report every Sunday",
              },
              {
                key: "allowSelfRegistration",
                label: "Allow self-registration",
                desc: "Volunteers can sign up themselves",
              },
              {
                key: "requireApproval",
                label: "Require admin approval",
                desc: "New users need approval to join drives",
              },
              {
                key: "maintenanceMode",
                label: "Maintenance mode",
                desc: "Disable access for non-admins",
              },
            ] as {
              key: keyof AppSettings;
              label: string;
              desc: string;
            }[]
          ).map((option) => (
            <div
              key={option.key}
              className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0"
            >
              <div>
                <p className="text-sm font-bold text-slate-900">
                  {option.label}
                </p>

                <p className="text-xs text-slate-400 mt-0.5">
                  {option.desc}
                </p>
              </div>

              <button
                onClick={() =>
                  setSettings((prev) => ({
                    ...prev,
                    [option.key]:
                      !prev[option.key],
                  }))
                }
                className={`w-11 h-6 rounded-full transition-all relative flex-shrink-0 ${
                  settings[option.key]
                    ? "bg-emerald-500"
                    : "bg-slate-200"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-all ${
                    settings[option.key]
                      ? "left-5.5 translate-x-0.5"
                      : "left-0.5"
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-white rounded-3xl border border-red-200 p-6 shadow-sm mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center">
            <AlertTriangle size={20} />
          </div>

          <h3 className="font-black text-red-600">
            Danger Zone
          </h3>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="font-bold text-slate-900 text-sm">
              Reset all platform data
            </p>

            <p className="text-xs text-slate-500 mt-0.5">
              Permanently delete all drives,
              attendance and volunteer records.
              This action cannot be undone.
            </p>
          </div>

          <button
            onClick={() =>
              toast.error(
                "Action blocked in demo mode"
              )
            }
            className="bg-red-100 text-red-600 hover:bg-red-200 transition px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
          >
            <Trash2 size={14} />
            Reset Data
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => goTo("overview")}
          className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
        >
          Back to Dashboard
        </button>

        <button
          onClick={() =>
            toast.success("Settings saved ✅")
          }
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition flex items-center gap-2"
        >
          <CheckCircle2 size={16} />
          Save Settings
        </button>
      </div>
    </div>
  );
};

export default Settings;
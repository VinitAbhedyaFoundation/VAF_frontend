// ─── SETTINGS SECTION ─────────────────────────────────────────────────────────
import React, { useState } from "react";
import type {
  Volunteer,
  Drive,
  AttendanceRecord,
  MessageItem,
  SectionId,
  SettingsTab,
} from "@/types/admin";
import Spinner from "../common/Spinner";
import AccountSettings from "./AccountSettings";
import SecuritySettings from "./SecuritySettings";
import AppearanceSettings from "./AppearanceSettings";
import DataSettings from "./DataSettings";
import SystemSettings from "./SystemSettings";
import { ThemeContext, useTheme } from "../contexts/ThemeContext";
import { AnimatePresence, motion } from "framer-motion";
import { UserCircle, Shield, Palette, Database, Server, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";



const SettingsSection: React.FC<{
    volunteers: Volunteer[];
    drives: Drive[];
    attendance: AttendanceRecord[];
    messages: MessageItem[];
    onLogout: () => void;
    onNavigate: (s: SectionId) => void;
}> = ({ volunteers, drives, attendance, messages, onLogout, onNavigate }) => {
    const { theme, accent, setTheme, setAccent } = useTheme();
    const [activeTab, setActiveTab] = useState<SettingsTab>("account");
    const [saving, setSaving] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const [orgName, setOrgName] = useState("Volunteer Action Foundation");
    const [adminEmail, setAdminEmail] = useState("admin@vaf.org");
    const [adminName, setAdminName] = useState("Admin User");

    const [notifEmail, setNotifEmail] = useState(true);
    const [notifNewVolunteer, setNotifNewVolunteer] = useState(true);
    const [notifDriveReminder, setNotifDriveReminder] = useState(true);
    const [notifAttendance, setNotifAttendance] = useState(false);
    const [notifWeeklyReport, setNotifWeeklyReport] = useState(true);
    const [notifSystemAlerts, setNotifSystemAlerts] = useState(true);
    const [slackEnabled, setSlackEnabled] = useState(false);

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [compactMode, setCompactMode] = useState(false);
    const [animationsEnabled, setAnimationsEnabled] = useState(true);

    const [autoBackup, setAutoBackup] = useState(true);
    const [backupFrequency, setBackupFrequency] = useState("Weekly");
    const [retentionDays, setRetentionDays] = useState("90");
    const [exportFormat, setExportFormat] = useState("CSV");

    const [maintenanceMode, setMaintenanceMode] = useState(false);
    const [debugMode, setDebugMode] = useState(false);
    const [apiRateLimit, setApiRateLimit] = useState("100");
    const [cacheEnabled, setCacheEnabled] = useState(true);

    const TABS: { id: SettingsTab; label: string; icon: React.ElementType }[] = [
        { id: "account", label: "Account", icon: UserCircle },
        { id: "security", label: "Security", icon: Shield },
        { id: "appearance", label: "Appearance", icon: Palette },
        { id: "data", label: "Data & Backup", icon: Database },
        { id: "system", label: "System", icon: Server },
    ];

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => { setSaving(false); toast.success("Settings saved successfully ✅"); }, 900);
    };

    const exportItems = [
        { label: "Volunteers", count: volunteers.length, icon: "👥", data: volunteers },
        { label: "Drives", count: drives.length, icon: "🌊", data: drives },
        { label: "Attendance", count: attendance.length, icon: "📋", data: attendance },
        { label: "Messages", count: messages.length, icon: "📧", data: messages },
    ];

    const handleExport = (label: string, data: any[]) => {
        if (!data?.length) { toast.error("No data available"); return; }

        if (exportFormat === "JSON") {
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = `${label}.json`; a.click();
            URL.revokeObjectURL(url);
            toast.success(`${label} exported`);
            return;
        }

        if (exportFormat === "CSV") {
            const headers = Object.keys(data[0]);
            const rows = data.map(row => headers.map(h => row[h]));
            const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url; a.download = `${label}.csv`; a.click();
            URL.revokeObjectURL(url);
            toast.success(`${label} exported`);
            return;
        }

        toast("Excel export coming soon");
    };

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold themed-text">Settings</h1>
                <p className="themed-secondary mt-1">Manage your organization's configuration, security, and integrations.</p>
            </div>

            <div className="flex gap-6">
                <div className="w-52 flex-shrink-0">
                    <nav className="space-y-1 sticky top-4">
                        {TABS.map(tab => (
                            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                                className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all text-left ${activeTab === tab.id ? "accent-nav-active shadow-md" : "themed-secondary themed-hover"}`}>
                                <tab.icon size={16} />{tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="flex-1 min-w-0 space-y-5">

                    {activeTab === "account" && (
                        <AccountSettings
                            orgName={orgName}
                            setOrgName={setOrgName}
                            adminName={adminName}
                            setAdminName={setAdminName}
                            adminEmail={adminEmail}
                            setAdminEmail={setAdminEmail}
                            saving={saving}
                            handleSave={handleSave}
                            Spinner={Spinner}
                        />
                    )}

                    {activeTab === "security" && (
                        <SecuritySettings
                            currentPassword={currentPassword}
                            setCurrentPassword={setCurrentPassword}
                            newPassword={newPassword}
                            setNewPassword={setNewPassword}
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}
                        />
                    )}

                    {activeTab === "appearance" && (
                        <AppearanceSettings
                            theme={theme}
                            setTheme={setTheme}
                        />
                    )}

                    {activeTab === "data" && (
  <DataSettings
    autoBackup={autoBackup}
    setAutoBackup={setAutoBackup}
    backupFrequency={backupFrequency}
    setBackupFrequency={setBackupFrequency}
    retentionDays={retentionDays}
    setRetentionDays={setRetentionDays}
    exportFormat={exportFormat}
    setExportFormat={setExportFormat}
    exportItems={exportItems}
    handleExport={handleExport}
    handleSave={handleSave}
    saving={saving}
    Spinner={Spinner}
  />
)}

                    {activeTab === "system" && (
  <SystemSettings
    setShowDeleteConfirm={setShowDeleteConfirm}
  />
)}
                </div>
            </div>

            <AnimatePresence>
                {showDeleteConfirm && (
                    <>
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={() => setShowDeleteConfirm(false)} />
                        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                            className="fixed inset-0 flex items-center justify-center z-50 px-4">
                            <div className="themed-card w-full max-w-sm rounded-2xl shadow-2xl p-6 text-center border themed-border">
                                <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <AlertTriangle size={24} className="text-red-600" />
                                </div>
                                <h3 className="text-lg font-black themed-text mb-2">Delete All Data?</h3>
                                <p className="text-sm themed-secondary mb-6">This will permanently erase all volunteers, drives, attendance, and messages. This action cannot be undone.</p>
                                <div className="flex gap-3">
                                    <button onClick={() => setShowDeleteConfirm(false)} className="flex-1 py-2.5 themed-subtle rounded-xl font-semibold text-sm themed-secondary">Cancel</button>
                                    <button onClick={() => { setShowDeleteConfirm(false); toast.error("All data deleted (demo only)"); }} className="flex-1 py-2.5 bg-red-600 text-white rounded-xl font-bold text-sm hover:bg-red-700 transition">Yes, Delete</button>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SettingsSection;
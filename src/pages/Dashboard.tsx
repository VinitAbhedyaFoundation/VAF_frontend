"use client";

import React, { useEffect, useMemo, useState, useCallback, createContext, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid,
  PieChart, Pie, Cell, BarChart, Bar, Legend,
} from "recharts";
import {
  LayoutDashboard, Waves, ShieldCheck, Mail, Calendar, Droplets, Clock,
  TrendingUp, UserCircle, Plus, CheckCircle2, Leaf, Menu, X, Bell,
  ChevronRight, LogOut, Settings, Award, Users, MapPin, Send, Eye,
  Filter, Search, MoreVertical, Trash2, Edit, Download, RefreshCw,
  Loader2, Shield, Key, Palette, Globe, Database, Webhook, AlertTriangle,
  ToggleLeft, ToggleRight, Lock, Unlock, ChevronDown, Server, Activity,
  FileText, Sliders, Monitor, Smartphone, Zap, CheckSquare, Square,
  Upload, HardDrive, Cloud, Cpu, Wifi, WifiOff, Info, ExternalLink,
  BarChart2, PieChart as PieChartIcon, Moon, Sun, Volume2, VolumeX,
  Mail as MailIcon, MessageSquare, Phone, Save, RotateCcw, Copy,
  Terminal, Bug, Code2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AnimatePresence } from "framer-motion";

// ─── THEME SYSTEM ─────────────────────────────────────────────────────────────

type ThemeMode = "light" | "dark" | "system";

interface AccentPalette {
  hex: string;
  name: string;
  50: string; 100: string; 200: string; 400: string;
  500: string; 600: string; 700: string; 900: string;
  shadow: string;
}

const DARK_TOKENS = {
  "--bg-base": "#0f172a",
  "--bg-card": "#1e293b",
  "--bg-sidebar": "#0f172a",
  "--bg-header": "#0f172a",
  "--border-color": "#334155",
  "--text-primary": "#f1f5f9",
  "--text-secondary": "#94a3b8",
  "--text-muted": "#64748b",
  "--bg-input": "#1e293b",
  "--bg-subtle": "#1e293b",
  "--bg-hover": "#334155",
};

const LIGHT_TOKENS = {
  "--bg-base": "#F8FAFC",
  "--bg-card": "#ffffff",
  "--bg-sidebar": "#ffffff",
  "--bg-header": "rgba(255,255,255,0.8)",
  "--border-color": "#e2e8f0",
  "--text-primary": "#0f172a",
  "--text-secondary": "#475569",
  "--text-muted": "#94a3b8",
  "--bg-input": "#ffffff",
  "--bg-subtle": "#f8fafc",
  "--bg-hover": "#f1f5f9",
};

function applyTheme(mode: ThemeMode, accent: AccentPalette) {
  const root = document.documentElement;
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const isDark = mode === "dark" || (mode === "system" && prefersDark);

  const tokens = isDark ? DARK_TOKENS : LIGHT_TOKENS;
  Object.entries(tokens).forEach(([k, v]) => root.style.setProperty(k, v));

  root.style.setProperty("--accent-50", accent[50]);
  root.style.setProperty("--accent-100", accent[100]);
  root.style.setProperty("--accent-200", accent[200]);
  root.style.setProperty("--accent-400", accent[400]);
  root.style.setProperty("--accent-500", accent[500]);
  root.style.setProperty("--accent-600", accent[600]);
  root.style.setProperty("--accent-700", accent[700]);
  root.style.setProperty("--accent-900", accent[900]);
  root.style.setProperty("--accent-shadow", accent.shadow);
  root.style.setProperty("--accent-hex", accent.hex);

  if (isDark) root.classList.add("dark"); else root.classList.remove("dark");
}

// ─── THEME CONTEXT ────────────────────────────────────────────────────────────

interface ThemeContextValue {
  theme: ThemeMode;
  accent: AccentPalette;
  setTheme: (t: ThemeMode) => void;
  setAccent: (a: AccentPalette) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  accent: { hex: "#10b981", name: "Emerald", 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0", 400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 900: "#064e3b", shadow: "rgba(16,185,129,0.25)" },
  setTheme: () => { },
  setAccent: () => { },
});

const useTheme = () => useContext(ThemeContext);

// ─── GLOBAL STYLE INJECTION ───────────────────────────────────────────────────

const GlobalThemeStyle = () => (
  <style>{`
    body { background: var(--bg-base); color: var(--text-primary); }

    .themed-card      { background: var(--bg-card); border-color: var(--border-color); }
    .themed-sidebar   { background: var(--bg-sidebar); border-color: var(--border-color); }
    .themed-header    { background: var(--bg-header); border-color: var(--border-color); }
    .themed-input     { background: var(--bg-input); border-color: var(--border-color); color: var(--text-primary); }
    .themed-text      { color: var(--text-primary); }
    .themed-muted     { color: var(--text-muted); }
    .themed-secondary { color: var(--text-secondary); }
    .themed-subtle    { background: var(--bg-subtle); }
    .themed-hover:hover { background: var(--bg-hover); }
    .themed-border    { border-color: var(--border-color); }
    .themed-divide > * + * { border-color: var(--border-color); }

    .accent-bg        { background: var(--accent-600); }
    .accent-bg-hover:hover { background: var(--accent-700); }
    .accent-text      { color: var(--accent-600); }
    .accent-text-hover:hover { color: var(--accent-700); }
    .accent-bg-soft   { background: var(--accent-50); }
    .accent-bg-soft-dark { background: var(--accent-100); }
    .accent-border    { border-color: var(--accent-500); }
    .accent-ring:focus { outline: none; box-shadow: 0 0 0 2px var(--accent-400); }
    .accent-badge     { background: var(--accent-100); color: var(--accent-700); }
    .accent-icon-bg   { background: var(--accent-50); color: var(--accent-600); }
    .accent-nav-active { background: var(--accent-900); color: #fff; }
    .accent-shadow    { box-shadow: 0 10px 30px -5px var(--accent-shadow); }

    .table-row-hover:hover { background: var(--bg-hover); }

    .input-themed {
      background: var(--bg-input);
      border-color: var(--border-color);
      color: var(--text-primary);
    }
    .input-themed:focus {
      outline: none;
      box-shadow: 0 0 0 2px var(--accent-400);
      border-color: var(--accent-400);
    }
    .input-themed::placeholder { color: var(--text-muted); }

    select.input-themed option { background: var(--bg-card); color: var(--text-primary); }

    .milestone-card { background: var(--accent-900); }
    .milestone-progress { background: var(--accent-400); }
  `}</style>
);

// ─── AXIOS INSTANCE ──────────────────────────────────────────────────────────

const baseURL = import.meta.env.VITE_API_URL;
if (!baseURL) throw new Error("API URL not configured");

const API = axios.create({ baseURL, withCredentials: true });
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── TYPES ──────────────────────────────────────────────────────────────────

type SectionId = "overview" | "drives" | "attendance" | "volunteers" | "messages" | "settings";
type SettingsTab = "account" | "security" | "appearance" | "data" | "system";

interface NavItem { label: string; icon: React.ElementType; id: SectionId; badge?: string; }
interface DashboardStats {
  totalDrives: number; totalHours: number; wasteCollected: number; totalVolunteers: number;
  chartData: { name: string; waste: number; volunteers: number }[];
}
interface Drive {
  id: number;
  title?: string;
  date: string;
  totalHours: number;
  location?: string;
  certificateIssued?: boolean;
  completed?: boolean;
  driveLocation?: {
    location: string;
  };
}
interface AttendanceRecord { id: number; user: { name: string; email: string; }; drive: { date: string; }; hours: number; createdAt: string; status?: "Pending" | "Approved" | "Rejected"; }
interface Volunteer { id: number; name: string; email: string; drives: number; status: "Approved" | "Pending"; city: string; age: number; joined: string; isNew: boolean; }
interface MessageItem { id: number; title: string; content: string; date: string; status: "Sent"; recipients: number; }
interface ApiMessage { id: number; subject?: string; title?: string; content?: string; createdAt?: string; recipients?: number; }

// ─── NAV ITEMS ───────────────────────────────────────────────────────────────

const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, id: "overview" },
  { label: "Drives", icon: Waves, id: "drives" },
  { label: "Attendance", icon: ShieldCheck, id: "attendance" },
  { label: "Volunteers", icon: UserCircle, id: "volunteers" },
  { label: "Messages", icon: Mail, id: "messages" },
  { label: "Settings", icon: Settings, id: "settings" },
];

const PIE_COLORS = ["#10b981", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6"];

// ─── HELPERS ─────────────────────────────────────────────────────────────────

const getStatusClass = (s: string) => {
  switch (s) {
    case "Active":
    case "Approved":
    case "Sent":
      return "bg-green-100 text-green-700";
    case "Pending":
      return "bg-yellow-100 text-yellow-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "";
  }
};

const getRankColor = (r: number) =>
  r === 1 ? "text-yellow-400" : r === 2 ? "text-gray-300" : r === 3 ? "text-orange-400" : "text-white";

// ─── LOADING SPINNER ─────────────────────────────────────────────────────────

const Spinner: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Loader2 size={size} className="animate-spin accent-text" />
);

const SectionLoader: React.FC = () => (
  <div className="flex items-center justify-center py-20"><Spinner size={32} /></div>
);

// ─── MODAL WRAPPER ────────────────────────────────────────────────────────────

const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="themed-card w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border">
            <div className="flex items-center justify-between px-6 py-4 border-b themed-border">
              <h2 className="text-lg font-black themed-text">{title}</h2>
              <button onClick={onClose} className="p-1.5 themed-hover rounded-full transition themed-muted"><X size={18} /></button>
            </div>
            <div className="px-6 py-5">{children}</div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const InputField: React.FC<{ label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string }> =
  ({ label, type = "text", value, onChange, placeholder }) => (
    <div className="mb-4">
      <label className="block text-xs font-bold themed-muted uppercase tracking-widest mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border rounded-xl px-4 py-2.5 text-sm transition input-themed" />
    </div>
  );

const SelectField: React.FC<{ label: string; value: string; onChange: (v: string) => void; options: string[] }> =
  ({ label, value, onChange, options }) => (
    <div className="mb-4">
      <label className="block text-xs font-bold themed-muted uppercase tracking-widest mb-1.5">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full border rounded-xl px-4 py-2.5 text-sm transition input-themed">
        <option value="">Select…</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
    </div>
  );

// ─── TOGGLE COMPONENT ─────────────────────────────────────────────────────────

const Toggle: React.FC<{ enabled: boolean; onChange: (v: boolean) => void; label?: string; description?: string }> =
  ({ enabled, onChange, label, description }) => (
    <div className="flex items-center justify-between py-3">
      <div>
        {label && <p className="text-sm font-semibold themed-text">{label}</p>}
        {description && <p className="text-xs themed-muted mt-0.5">{description}</p>}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? "accent-bg" : "bg-slate-200 dark:bg-slate-600"}`}
      >
        <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${enabled ? "translate-x-6" : "translate-x-1"}`} />
      </button>
    </div>
  );

// ─── SETTINGS CARD ────────────────────────────────────────────────────────────

const SettingsCard: React.FC<{ title: string; description?: string; children: React.ReactNode; icon?: React.ElementType; danger?: boolean }> =
  ({ title, description, children, icon: Icon, danger }) => (
    <div className={`themed-card rounded-2xl border shadow-sm overflow-hidden ${danger ? "border-red-200" : ""}`}>
      <div className={`px-6 py-4 border-b flex items-center gap-3 ${danger ? "border-red-100 bg-red-50/50" : "themed-border themed-subtle"}`}>
        {Icon && <div className={`p-2 rounded-xl ${danger ? "bg-red-100 text-red-600" : "accent-icon-bg"}`}><Icon size={16} /></div>}
        <div>
          <h3 className={`font-bold text-sm ${danger ? "text-red-700" : "themed-text"}`}>{title}</h3>
          {description && <p className="text-xs themed-muted mt-0.5">{description}</p>}
        </div>
      </div>
      <div className="px-6 py-4">{children}</div>
    </div>
  );

// ─── VOLUNTEER DETAIL DRAWER ──────────────────────────────────────────────────

const VolunteerDrawer: React.FC<{ volunteer: Volunteer | null; onClose: () => void; onApprove: (v: Volunteer) => void }> =
  ({ volunteer, onClose, onApprove }) => (
    <AnimatePresence>
      {volunteer && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm themed-card z-50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b themed-border">
              <h3 className="font-black themed-text">Volunteer Profile</h3>
              <button onClick={onClose} className="p-1.5 themed-hover rounded-full themed-muted"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 accent-bg rounded-full flex items-center justify-center text-white text-3xl font-black mb-3">
                  {volunteer.name[0]}
                </div>
                <h2 className="text-xl font-black themed-text">{volunteer.name}</h2>
                <p className="text-sm themed-secondary">{volunteer.email}</p>
                <span className={`mt-2 text-xs px-3 py-1 rounded-full font-bold ${getStatusClass(volunteer.status)}`}>{volunteer.status}</span>
                {volunteer.isNew && <span className="mt-1 text-xs px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full font-bold">🆕 New Member</span>}
              </div>
              <div className="grid grid-cols-2 gap-3 mb-6">
                {[
                  { label: "City", val: volunteer.city, icon: "📍" },
                  { label: "Age", val: `${volunteer.age} yrs`, icon: "🎂" },
                  { label: "Drives Joined", val: volunteer.drives, icon: "🌊" },
                  { label: "Member Since", val: volunteer.joined, icon: "📅" },
                ].map(item => (
                  <div key={item.label} className="themed-subtle rounded-xl p-3 border themed-border">
                    <p className="text-xs themed-muted font-bold uppercase tracking-widest mb-1">{item.icon} {item.label}</p>
                    <p className="font-black themed-text">{item.val}</p>
                  </div>
                ))}
              </div>
              {volunteer.status === "Pending" && (
                <button onClick={() => onApprove(volunteer)}
                  className="w-full accent-bg accent-bg-hover text-white py-3 rounded-xl font-bold transition">
                  ✓ Approve Volunteer
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

// ─── FIX #4: DriveDetailsModal — replaced empty status card with real content ─

const DriveDetailsModal: React.FC<{
  drive: Drive | null;
  onClose: () => void;
}> = ({ drive, onClose }) => (
  <AnimatePresence>
    {drive && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
        >
          <div className="themed-card w-full max-w-lg rounded-3xl border themed-border shadow-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black themed-text">
                {drive.title || "Cleanup Drive"}
              </h2>
              <button onClick={onClose} className="p-2 rounded-full themed-hover">
                <X size={18} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="themed-subtle rounded-2xl p-4">
                <p className="text-xs themed-muted uppercase font-bold mb-1">Location</p>
                <p className="font-semibold themed-text">
                  {drive.location ?? drive.driveLocation?.location ?? "Unknown Location"}
                </p>
              </div>
              <div className="themed-subtle rounded-2xl p-4">
                <p className="text-xs themed-muted uppercase font-bold mb-1">Date</p>
                <p className="font-semibold themed-text">
                  {new Date(drive.date).toLocaleString()}
                </p>
              </div>
              <div className="themed-subtle rounded-2xl p-4">
                <p className="text-xs themed-muted uppercase font-bold mb-1">Planned Hours</p>
                <p className="font-semibold themed-text">{drive.totalHours} hours</p>
              </div>
              {/* FIX: was an empty card — now shows drive status */}
              <div className="themed-subtle rounded-2xl p-4">
                <p className="text-xs themed-muted uppercase font-bold mb-1">Status</p>
                <p className="font-semibold themed-text">
                  {drive.completed ? "Completed ✅" : "Pending ⏳"}
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── SETTINGS SECTION ─────────────────────────────────────────────────────────

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
            <SettingsCard title="Organization Profile" description="Basic details about your organization" icon={UserCircle}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {[
                  { label: "Organization Name", val: orgName, set: setOrgName, type: "text" },
                  { label: "Admin Name", val: adminName, set: setAdminName, type: "text" },
                  { label: "Admin Email", val: adminEmail, set: setAdminEmail, type: "email" },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-bold themed-muted uppercase tracking-widest mb-1.5">{f.label}</label>
                    <input type={f.type} value={f.val} onChange={e => f.set(e.target.value)}
                      className="w-full border rounded-xl px-4 py-2.5 text-sm transition input-themed" />
                  </div>
                ))}
              </div>
              <button onClick={handleSave} disabled={saving}
                className="flex items-center gap-2 accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition disabled:opacity-60">
                {saving ? <Spinner size={14} /> : <Save size={14} />} Save Changes
              </button>
            </SettingsCard>
          )}

          {activeTab === "security" && (
            <SettingsCard title="Change Password" description="Update your admin account password" icon={Key}>
              <div className="space-y-3">
                {[
                  { label: "Current Password", val: currentPassword, set: setCurrentPassword },
                  { label: "New Password", val: newPassword, set: setNewPassword },
                  { label: "Confirm New Password", val: confirmPassword, set: setConfirmPassword },
                ].map(f => (
                  <div key={f.label}>
                    <label className="block text-xs font-bold themed-muted uppercase tracking-widest mb-1.5">{f.label}</label>
                    <input type="password" value={f.val} onChange={e => f.set(e.target.value)} placeholder="••••••••"
                      className="w-full border rounded-xl px-4 py-2.5 text-sm transition input-themed" />
                  </div>
                ))}
                {newPassword && confirmPassword && newPassword !== confirmPassword && (
                  <p className="text-xs text-red-500 flex items-center gap-1"><AlertTriangle size={12} /> Passwords do not match</p>
                )}
                <button
                  onClick={() => { toast.success("Password updated!"); setCurrentPassword(""); setNewPassword(""); setConfirmPassword(""); }}
                  disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                  className="flex items-center gap-2 accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition disabled:opacity-40">
                  <Lock size={14} /> Update Password
                </button>
              </div>
            </SettingsCard>
          )}

          {activeTab === "appearance" && (
            <SettingsCard title="Theme" description="Choose how the portal looks" icon={Palette}>
              <div className="flex gap-3 mb-6">
                {([
                  { val: "light", label: "Light", icon: Sun },
                  { val: "dark", label: "Dark", icon: Moon },
                  { val: "system", label: "System", icon: Monitor },
                ] as const).map(t => (
                  <button key={t.val} onClick={() => setTheme(t.val)}
                    className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition font-semibold text-sm ${theme === t.val ? "accent-border accent-bg-soft accent-text" : "border-slate-200 themed-secondary themed-hover"}`}>
                    <t.icon size={22} />
                    {t.label}
                  </button>
                ))}
              </div>
            </SettingsCard>
          )}

          {activeTab === "data" && (
            <>
              <SettingsCard title="Automated Backups" description="Configure scheduled data backups" icon={Cloud}>
                <Toggle enabled={autoBackup} onChange={setAutoBackup} label="Enable Auto Backup" description="Automatically backup all data on schedule" />
                <div className={`mt-4 grid grid-cols-2 gap-3 transition-opacity ${autoBackup ? "" : "opacity-40 pointer-events-none"}`}>
                  <div>
                    <label className="block text-xs font-bold themed-muted uppercase tracking-widest mb-1.5">Frequency</label>
                    <select value={backupFrequency} onChange={e => setBackupFrequency(e.target.value)} className="w-full border rounded-xl px-4 py-2.5 text-sm transition input-themed">
                      <option>Daily</option><option>Weekly</option><option>Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold themed-muted uppercase tracking-widest mb-1.5">Retention (days)</label>
                    <input type="number" value={retentionDays} onChange={e => setRetentionDays(e.target.value)} className="w-full border rounded-xl px-4 py-2.5 text-sm transition input-themed" />
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <button onClick={() => toast.success("Manual backup started!")} className="flex items-center gap-1.5 text-sm font-semibold accent-text px-4 py-2 accent-bg-soft rounded-xl hover:accent-bg-soft-dark transition">
                    <HardDrive size={14} /> Backup Now
                  </button>
                  <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 accent-bg accent-bg-hover text-white px-4 py-2 rounded-xl text-sm font-bold transition disabled:opacity-60">
                    {saving ? <Spinner size={14} /> : <Save size={14} />} Save Settings
                  </button>
                </div>
              </SettingsCard>

              <SettingsCard title="Export Data" description="Download your data" icon={Download}>
                <div className="flex gap-2 mb-4 flex-wrap">
                  {["CSV"].map(f => (
                    <button key={f} onClick={() => setExportFormat(f)}
                      className={`px-4 py-2 rounded-xl text-sm font-bold transition ${exportFormat === f ? "accent-bg text-white" : "themed-subtle themed-secondary themed-hover"}`}>{f}</button>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {exportItems.map(item => (
                    <button key={item.label} onClick={() => handleExport(item.label, item.data)}
                      className="flex items-center justify-between p-3 themed-subtle rounded-xl border themed-border themed-hover transition text-left group">
                      <div>
                        <p className="text-xs font-bold themed-muted uppercase tracking-widest">{item.icon} {item.label}</p>
                        <p className="font-black themed-text mt-0.5">{item.count} records</p>
                      </div>
                      <Download size={16} className="themed-muted group-hover:accent-text transition" />
                    </button>
                  ))}
                </div>
              </SettingsCard>

              <SettingsCard title="Import Data" description="Bulk upload volunteers or drives via CSV" icon={Upload}>
                <div className="border-2 border-dashed themed-border rounded-2xl p-8 text-center hover:border-current themed-hover transition cursor-pointer group"
                  onClick={() => toast("CSV upload coming soon!")}>
                  <Upload size={24} className="mx-auto themed-muted group-hover:accent-text transition mb-2" />
                  <p className="text-sm font-semibold themed-secondary">Click to upload a CSV file</p>
                  <p className="text-xs themed-muted mt-1">Max 5MB · Supported: volunteers, drives</p>
                </div>
              </SettingsCard>
            </>
          )}

          {activeTab === "system" && (
            <SettingsCard title="Danger Zone" description="Irreversible actions — proceed with caution" icon={AlertTriangle} danger>
              <div className="space-y-3">
                {[
                  { label: "Reset All Settings", desc: "Restore all settings to default values", action: () => toast.success("Settings reset"), btnLabel: "Reset" },
                ].map((item, i) => (
                  <div key={i} className={`flex items-center justify-between py-2 ${i > 0 ? "border-t themed-border" : ""}`}>
                    <div>
                      <p className="text-sm font-semibold themed-text">{item.label}</p>
                      <p className="text-xs themed-muted">{item.desc}</p>
                    </div>
                    <button onClick={item.action} className="text-sm font-bold text-orange-600 px-4 py-2 bg-orange-50 rounded-xl hover:bg-orange-100 transition">{item.btnLabel}</button>
                  </div>
                ))}
                <div className="flex items-center justify-between py-2 border-t border-red-100">
                  <div>
                    <p className="text-sm font-semibold text-red-700">Delete All Data</p>
                    <p className="text-xs text-red-400">Permanently erase all volunteers, drives, and records</p>
                  </div>
                  <button onClick={() => setShowDeleteConfirm(true)} className="text-sm font-bold text-red-600 px-4 py-2 bg-red-50 rounded-xl hover:bg-red-100 transition border border-red-200">Delete</button>
                </div>
              </div>
            </SettingsCard>
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

// ─── EYE OFF WORKAROUND ───────────────────────────────────────────────────────

const EyeOff: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function AdvancedDashboard() {
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [accent, setAccentState] = useState<AccentPalette>({
    hex: "#10b981", name: "Emerald", 50: "#ecfdf5", 100: "#d1fae5", 200: "#a7f3d0",
    400: "#34d399", 500: "#10b981", 600: "#059669", 700: "#047857", 900: "#064e3b",
    shadow: "rgba(16,185,129,0.25)",
  });

  const setTheme = useCallback((t: ThemeMode) => {
    setThemeState(t);
    applyTheme(t, accent);
  }, [accent]);

  const setAccent = useCallback((a: AccentPalette) => {
    setAccentState(a);
    applyTheme(theme, a);
    toast.success(`Accent changed to ${a.name} 🎨`);
  }, [theme]);

  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);

  useEffect(() => { applyTheme(theme, accent); }, []); // eslint-disable-line

  useEffect(() => {
    if (theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const handler = () => applyTheme("system", accent);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [theme, accent]);

  const [appLoading, setAppLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<SectionId>("overview");
  const navigate = useNavigate();

  const [adminUser, setAdminUser] = useState<any>(null);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<{ name: string; kg: number; drives: number; rank: number }[]>([]);
  const [drives, setDrives] = useState<Drive[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);

  const [loadingDrives, setLoadingDrives] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [showDriveModal, setShowDriveModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  const [driveForm, setDriveForm] = useState({ title: "", location: "", date: "", totalHours: "" });
  const [attendanceForm, setAttendanceForm] = useState({ name: "", email: "", drive: "", hours: "" });
  const [volunteerForm, setVolunteerForm] = useState({ name: "", email: "", city: "", age: "", password: "" });
  const [messageForm, setMessageForm] = useState({ title: "", content: "" });

  const [volunteerSearch, setVolunteerSearch] = useState("");
  const [volunteerFilter, setVolunteerFilter] = useState<"All" | "New" | "Recurring" | "Pending">("All");

  // ── Data fetchers ─────────────────────────────────────────────────────────

  const fetchDashboardStats = useCallback(async () => {
    try {
      const res = await API.get("/admin/dashboard-stats");
      setDashboardStats(res.data);
      setLeaderboard((res.data.leaderboard ?? []).map((u: any, i: number) => ({ ...u, rank: i + 1 })));
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed to load dashboard stats"); }
  }, []);

  const fetchDrives = useCallback(async () => {
    setLoadingDrives(true);
    try {
      const res = await API.get("/drive/alldrives", { params: { page: 1, limit: 50 } });
      setDrives(res.data.drives ?? res.data);
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed to load drives"); }
    finally { setLoadingDrives(false); }
  }, []);

  const fetchAttendance = useCallback(async () => {
    setLoadingAttendance(true);
    try {
      const res = await API.get("/attendance/all");
      setAttendance(res.data.records ?? res.data);
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed to load attendance"); }
    finally { setLoadingAttendance(false); }
  }, []);

  const handleApproveAttendance = async (id: number) => {
    try {
      await API.patch(`/attendance/approve/${id}`);
      toast.success("Attendance approved");
      await fetchAttendance();
      await fetchDashboardStats();
    } catch (err) {
      toast.error("Failed to approve attendance");
    }
  };

  const fetchVolunteers = useCallback(async () => {
    setLoadingVolunteers(true);
    try {
      const res = await API.get("/user/all");
      const data = res.data.users ?? res.data;
      const mapped = data.map((v: any) => ({
        id: v.id, name: v.name, email: v.email, city: v.city ?? "Unknown", age: v.age ?? 0,
        drives: v.drives ?? 0, status: v.status ?? "Pending",
        joined: new Date(v.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
        isNew: Date.now() - new Date(v.createdAt).getTime() < 7 * 24 * 60 * 60 * 1000,
      }));
      setVolunteers(mapped);
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed to load volunteers"); }
    finally { setLoadingVolunteers(false); }
  }, []);

  const fetchMessages = useCallback(async () => {
    setLoadingMessages(true);
    try {
      const res = await API.get("/message/all");
      const data = res.data.messages ?? res.data;
      const mapped: MessageItem[] = data.map((msg: ApiMessage) => ({
        id: msg.id,
        title: msg.subject ?? msg.title ?? "Untitled",
        content: msg.content ?? "",
        date: msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : new Date().toLocaleDateString(),
        status: "Sent",
        recipients: msg.recipients ?? 0,
      }));
      setMessages(mapped);
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed to load messages"); }
    finally { setLoadingMessages(false); }
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) setAdminUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    const init = async () => { await fetchDashboardStats(); setAppLoading(false); };
    init();
  }, [fetchDashboardStats]);

  useEffect(() => {
    fetchDrives();
    fetchAttendance();
    fetchVolunteers();
    fetchMessages();
  }, [fetchDrives, fetchAttendance, fetchVolunteers, fetchMessages]);

  const goTo = (section: SectionId) => { setActiveNav(section); setIsMobileMenuOpen(false); };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out");
    setTimeout(() => navigate("/login"), 600);
  };

  const METRICS = dashboardStats ? [
    { id: "m1", label: "Drives Conducted", value: dashboardStats.totalDrives, icon: Calendar, trend: "+12%", color: "accent-text", bgLight: "accent-bg-soft" },
    { id: "m2", label: "Volunteer Hours", value: dashboardStats.totalHours, icon: Clock, trend: "+5.4%", color: "text-blue-600", bgLight: "bg-blue-50" },
    { id: "m3", label: "Waste Collected (kg)", value: dashboardStats.wasteCollected, icon: Droplets, trend: "+18.2%", color: "text-purple-600", bgLight: "bg-purple-50" },
    { id: "m4", label: "Active Volunteers", value: dashboardStats.totalVolunteers, icon: TrendingUp, trend: "+8%", color: "text-orange-600", bgLight: "bg-orange-50" },
  ] : [];

  const chartData = dashboardStats?.chartData ?? [];
  const newVolunteers = volunteers.filter(v => v.isNew).length;
  const recurringVolunteers = volunteers.filter(v => !v.isNew && v.status === "Approved").length;
  const pendingVolunteers = volunteers.filter(v => v.status === "Pending").length;

  const cityData = useMemo(() => {
    const map: Record<string, number> = {};
    volunteers.forEach(v => { map[v.city] = (map[v.city] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [volunteers]);

  const ageData = useMemo(() => {
    const buckets: Record<string, number> = { "18-21": 0, "22-24": 0, "25-28": 0, "29+": 0 };
    volunteers.forEach(v => {
      if (v.age <= 21) buckets["18-21"]++;
      else if (v.age <= 24) buckets["22-24"]++;
      else if (v.age <= 28) buckets["25-28"]++;
      else buckets["29+"]++;
    });
    return Object.entries(buckets).map(([range, count]) => ({ range, count }));
  }, [volunteers]);

  const filteredVolunteers = useMemo(() => {
    let list = volunteers;
    if (volunteerFilter === "New") list = list.filter(v => v.isNew);
    else if (volunteerFilter === "Recurring") list = list.filter(v => !v.isNew && v.status === "Approved");
    else if (volunteerFilter === "Pending") list = list.filter(v => v.status === "Pending");
    if (volunteerSearch) list = list.filter(v =>
      v.name.toLowerCase().includes(volunteerSearch.toLowerCase()) ||
      v.email.toLowerCase().includes(volunteerSearch.toLowerCase())
    );
    return list;
  }, [volunteers, volunteerFilter, volunteerSearch]);

  // ── Action handlers ────────────────────────────────────────────────────────

  const handleCreateDrive = async () => {
    if (!driveForm.title || !driveForm.location || !driveForm.date || !driveForm.totalHours) {
      toast.error("Fill all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const res = await API.post("/drive/newdrive", {
        title: driveForm.title,
        location: driveForm.location,
        date: new Date(driveForm.date).toISOString(),
        totalHours: Number(driveForm.totalHours),
      });
      setDrives(prev => [res.data.drive ?? res.data, ...prev]);
      setShowDriveModal(false);
      setDriveForm({ title: "", location: "", date: "", totalHours: "" });
      toast.success("Drive created 🚀");
      await fetchDashboardStats();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create drive");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAttendance = async () => {
    if (!attendanceForm.name || !attendanceForm.hours || !attendanceForm.drive) { toast.error("Name, hours and drive are required"); return; }
    setSubmitting(true);
    try {
      const selectedDriveForAttendance = drives.find(d => d.id === Number(attendanceForm.drive));
      if (!selectedDriveForAttendance?.id) { toast.error("Invalid drive selected"); setSubmitting(false); return; }
      const res = await API.post("/user/attendance", {
        driveId: selectedDriveForAttendance.id, name: attendanceForm.name,
        email: attendanceForm.email, hours: Number(attendanceForm.hours),
      });
      const raw = res.data.record ?? res.data;
      const safeRecord: AttendanceRecord = {
        id: raw.id,
        user: { name: raw.user?.name ?? attendanceForm.name, email: raw.user?.email ?? attendanceForm.email },
        drive: { date: raw.drive?.date ?? selectedDriveForAttendance.date },
        hours: raw.hours ?? Number(attendanceForm.hours),
        createdAt: raw.createdAt ?? new Date().toISOString(),
        status: raw.status ?? "Pending",
      };
      setAttendance(prev => [safeRecord, ...prev]);
      setAttendanceForm({ name: "", email: "", drive: "", hours: "" });
      setShowAttendanceModal(false);
      toast.success("Attendance marked ✅");
      await fetchDashboardStats();
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed to mark attendance"); }
    finally { setSubmitting(false); }
  };

  const handleAddVolunteer = async () => {
    if (!volunteerForm.name || !volunteerForm.email || !volunteerForm.city) { toast.error("Fill all required fields"); return; }
    setSubmitting(true);
    try {
      const res = await API.post("/auth/register", {
        name: volunteerForm.name, email: volunteerForm.email, city: volunteerForm.city,
        age: parseInt(volunteerForm.age) || 0, password: volunteerForm.password || "Volunteer@123",
      });
      const newVol: Volunteer = res.data.user ?? {
        id: Date.now(), name: volunteerForm.name, email: volunteerForm.email, drives: 0,
        status: "Pending", city: volunteerForm.city, age: parseInt(volunteerForm.age) || 0,
        joined: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }), isNew: true,
      };
      setVolunteers(prev => [...prev, newVol]);
      setShowVolunteerModal(false);
      setVolunteerForm({ name: "", email: "", city: "", age: "", password: "" });
      toast.success(`${volunteerForm.name} added as volunteer 👤`);
      await fetchDashboardStats();
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed to add volunteer"); }
    finally { setSubmitting(false); }
  };

  // ── FIX #1: handleApproveVolunteer — added missing fetchDashboardStats() ──
  const handleApproveVolunteer = async (vol: Volunteer) => {
    try {
      await API.patch(`/user/approve/${vol.id}`);
      setVolunteers(prev => prev.map(v => v.id === vol.id ? { ...v, status: "Approved" as const } : v));
      setSelectedVolunteer(null);
      toast.success(`${vol.name} approved ✅`);
      await fetchDashboardStats();
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed to approve volunteer"); }
  };

  const handleSendMessage = async () => {
    if (!messageForm.title || !messageForm.content) { toast.error("Fill all fields"); return; }
    setSubmitting(true);
    try {
      let user = null;
      try { user = JSON.parse(localStorage.getItem("user") || "{}"); } catch { user = null; }
      if (!user?.id) { toast.error("User not logged in"); setSubmitting(false); return; }
      const res = await API.post("/message/send", {
        subject: messageForm.title, content: messageForm.content, senderId: user.id,
      });
      const msg = res.data.message ?? res.data;
      const newMsg: MessageItem = {
        id: msg.id, title: msg.subject ?? msg.title ?? "Untitled", content: msg.content,
        date: new Date(msg.createdAt).toLocaleDateString(), status: "Sent", recipients: msg.recipients ?? 0,
      };

      await fetchMessages();

      setShowMessageModal(false);
      setMessageForm({ title: "", content: "" });
      toast.success("Message sent 📧");
    } catch (err: any) { toast.error(err?.response?.data?.message || "Failed to send message"); }
    finally { setSubmitting(false); }
  };

  // ── FIX #3: handleGenerateCertificates — added await + fetchDashboardStats ─
  const handleGenerateCertificates = async (driveId: number) => {
    const drive = drives.find(d => d.id === driveId);
    if (!drive?.completed) {
      toast.error("Complete the drive first before generating certificates");
      return;
    }
    try {
      const res = await API.post(`/certificate/generate/${driveId}`);
      toast.success(res.data.message || "Certificates generated successfully");
      await fetchDrives();
      await fetchDashboardStats();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to generate certificates");
    }
  };

  // ── FIX #2: handleCompleteDrive — added await + fetchDashboardStats ────────
  const handleCompleteDrive = async (driveId: number) => {
    try {
      await API.patch(`/drive/${driveId}/complete`);
      toast.success("Drive marked as completed");
      await fetchDrives();
      await fetchDashboardStats();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to complete drive");
    }
  };

  const sectionTitle: Record<SectionId, string> = {
    overview: "Dashboard Overview", drives: "Drives", attendance: "Attendance",
    volunteers: "Volunteers", messages: "Messages", settings: "Settings",
  };

  const pendingBadge = pendingVolunteers > 0 ? `${pendingVolunteers} Pending` : undefined;

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col themed-sidebar ${mobile ? "p-8 w-80" : "w-80 border-r themed-border p-8 hidden xl:flex sticky top-0 h-screen"}`}>
      <div className="flex items-center gap-2 mb-12">
        <div className="w-10 h-10 accent-bg rounded-xl rotate-12 flex items-center justify-center accent-shadow">
          <Leaf className="text-white -rotate-12" size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tighter themed-text">VAF</h2>
          <p className="text-[10px] font-bold accent-text uppercase tracking-widest -mt-1">Portal</p>
        </div>
      </div>
      <nav className="space-y-2 flex-1">
        {NAV_ITEMS.map(item => {
          const badge = item.id === "volunteers" ? pendingBadge : undefined;
          return (
            <button key={item.id} onClick={() => goTo(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeNav === item.id ? "accent-nav-active accent-shadow" : "themed-secondary themed-hover"}`}>
              <div className="flex items-center gap-3"><item.icon size={20} />{item.label}</div>
              {badge && <span className="text-[10px] opacity-60">{badge}</span>}
            </button>
          );
        })}
      </nav>
    </div>
  );

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent }}>
      <GlobalThemeStyle />
      <div className="flex min-h-screen font-sans overflow-hidden" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
        <Toaster position="bottom-center" toastOptions={{ duration: 2500 }} />

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 xl:hidden" />
              <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 left-0 h-full z-50 xl:hidden shadow-2xl">
                <div className="flex justify-end p-4">
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 themed-subtle rounded-full"><X size={20} /></button>
                </div>
                <Sidebar mobile />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <Sidebar />

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <header className="h-20 themed-header backdrop-blur-md border-b themed-border flex items-center justify-between px-6 lg:px-12 flex-shrink-0 z-30">
            <div className="flex items-center gap-4">
              <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden p-2 themed-hover rounded-full">
                <Menu size={20} className="themed-secondary" />
              </button>
              <div>
                <p className="text-xs font-bold accent-text uppercase tracking-[0.2em]">Volunteer Admin</p>
                <h1 className="text-xl lg:text-2xl font-black tracking-tight themed-text">{sectionTitle[activeNav]}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5" />
              <div className="h-8 w-px" style={{ background: "var(--border-color)" }} />
              <button onClick={() => goTo("messages")} className="relative p-2 themed-hover rounded-full transition">
                <Bell size={20} className="themed-secondary" />
              </button>
              <button onClick={() => goTo("settings")} className="p-2 themed-hover rounded-full transition">
                <Settings size={20} className="themed-secondary" />
              </button>
              <button onClick={handleLogout} className="p-2 themed-hover rounded-full transition">
                <LogOut size={20} className="themed-secondary" />
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-6 lg:p-10">

            {/* ── OVERVIEW ── */}
            {activeNav === "overview" && (
              <>
                <motion.div
                  initial={{ opacity: 0, y: -16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mb-8 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl"
                  style={{ background: "linear-gradient(135deg, var(--accent-900) 0%, #1e293b 100%)" }}
                >
                  <div className="relative z-10">
                    <p className="text-sm font-semibold mb-2" style={{ color: "var(--accent-400)" }}>Welcome back 👋</p>
                    <h1 className="text-4xl lg:text-5xl font-black tracking-tight mb-3">{adminUser?.name || "Admin"}</h1>
                    <p className="text-white/60 text-base lg:text-lg">Manage drives, volunteers, attendance and impact metrics.</p>
                  </div>
                  <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
                    <Leaf size={240} />
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                  {appLoading
                    ? Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="themed-card p-6 rounded-3xl border themed-border shadow-sm animate-pulse h-36" />
                    ))
                    : METRICS.map(m => (
                      <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                        className="themed-card p-6 rounded-3xl border themed-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
                        <div className="flex justify-between items-start mb-5">
                          <div className={`p-3 rounded-xl ${m.bgLight} ${m.color}`}><m.icon size={22} /></div>
                          <span className="accent-badge px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">{m.trend}</span>
                        </div>
                        <h3 className="text-4xl font-black tracking-tighter mb-1 themed-text"><CountUp end={m.value} duration={2} /></h3>
                        <p className="text-xs font-bold themed-muted uppercase tracking-widest">{m.label}</p>
                      </motion.div>
                    ))
                  }
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 themed-card p-8 rounded-[2.5rem] border themed-border shadow-sm h-96">
                    <h3 className="text-xl font-black mb-1 themed-text">Weekly Velocity</h3>
                    <p className="text-sm themed-muted mb-6">Waste collection vs Volunteers</p>
                    {appLoading ? (
                      <div className="flex items-center justify-center h-64"><Spinner size={28} /></div>
                    ) : (
                      <ResponsiveContainer width="100%" height="80%">
                        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                          <defs>
                            <linearGradient id="gWaste" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={accent.hex} stopOpacity={0.2} />
                              <stop offset="95%" stopColor={accent.hex} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient id="gVol" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12, fontWeight: 700 }} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: "var(--text-muted)", fontSize: 12 }} />
                          <Tooltip contentStyle={{ borderRadius: 16, border: "none", padding: 16, boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)", background: "var(--bg-card)", color: "var(--text-primary)" }} />
                          <Area type="monotone" dataKey="waste" name="Waste (kg)" stroke={accent.hex} strokeWidth={3} fill="url(#gWaste)" />
                          <Area type="monotone" dataKey="volunteers" name="Volunteers" stroke="#6366f1" strokeWidth={3} fill="url(#gVol)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    )}
                  </div>

                  <div className="milestone-card p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16" />
                    <h3 className="text-xl font-black mb-1 relative z-10">Leaderboard</h3>
                    <p className="text-white/40 text-xs uppercase tracking-widest mb-6 relative z-10">Top Contributors</p>
                    {appLoading ? (
                      <div className="flex items-center justify-center py-8"><Spinner /></div>
                    ) : (
                      <div className="space-y-3 relative z-10">
                        {leaderboard.map(u => (
                          <div key={u.name} className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
                            <div className="flex items-center gap-3">
                              <span className={`text-lg font-black ${getRankColor(u.rank)}`}>#{u.rank}</span>
                              <div>
                                <p className="font-bold text-sm">{u.name}</p>
                                <p className="text-xs text-white/40">{u.drives} Drives</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-black">{u.kg} kg</p>
                              <p className="text-xs text-white/30">Collected</p>
                            </div>
                          </div>
                        ))}
                        {leaderboard.length === 0 && <p className="text-white/30 text-sm text-center py-4">No data yet.</p>}
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* ── DRIVES ── */}
            {activeNav === "drives" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-bold themed-text">Drives</h1>
                    <p className="themed-secondary text-sm">Manage and track all cleanup drives.</p>
                  </div>
                  <button onClick={() => setShowDriveModal(true)} className="accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition accent-shadow flex items-center gap-2">
                    <Plus size={16} /> Create Drive
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: "Total Drives", val: drives.length },
                    { label: "Completed", val: drives.filter(d => d.completed).length },
                    { label: "Upcoming", val: drives.filter(d => !d.completed && new Date(d.date) >= new Date()).length },
                  ].map(s => (
                    <div key={s.label} className="themed-card rounded-2xl p-5 border themed-border shadow-sm">
                      <p className="text-xs font-bold themed-muted uppercase tracking-widest mb-1">{s.label}</p>
                      <p className="text-3xl font-black themed-text">{s.val}</p>
                    </div>
                  ))}
                </div>

                {loadingDrives ? <SectionLoader /> : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {drives.map(drive => (
                      <motion.div key={drive.id} layout className="themed-card p-5 rounded-2xl shadow-sm border themed-border themed-hover transition flex flex-col">
                        <div className="mb-4 flex-1">
                          <div className="flex items-start justify-between gap-3 mb-2">
                            <h2 className="font-bold text-lg themed-text">
                              {drive.title || "Cleanup Drive"}
                            </h2>
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold whitespace-nowrap shrink-0 ${drive.completed
                                ? "bg-green-100 text-green-700"
                                : new Date(drive.date) < new Date()
                                  ? "bg-amber-100 text-amber-700"
                                  : "bg-blue-100 text-blue-700"
                              }`}>
                              {drive.completed ? "Completed" : new Date(drive.date) < new Date() ? "Active" : "Upcoming"}
                            </span>
                          </div>

                          <p className="text-sm themed-muted">
                            {new Date(drive.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
                          </p>

                          <div className="mt-3 space-y-1.5">
                            <p className="text-sm themed-secondary flex items-center gap-2">
                              <MapPin size={14} className="accent-text shrink-0" />
                              {drive.location ?? drive.driveLocation?.location ?? "Unknown Location"}
                            </p>
                            <p className="text-sm themed-secondary flex items-center gap-2">
                              <Clock size={14} className="text-blue-500 shrink-0" />
                              {drive.totalHours} hrs planned
                            </p>
                          </div>
                        </div>

                        {/* View Details */}
                        <div className="pt-3 border-t themed-border mb-3">
                          <button
                            onClick={() => setSelectedDrive(drive)}
                            className="accent-text text-sm font-semibold inline-flex items-center gap-1 accent-text-hover">
                            View Details <ChevronRight size={16} />
                          </button>
                        </div>

                        {/* Complete Drive — only shown while not yet completed */}
                        
                        {!drive.completed && (
                          <button
                            onClick={() => handleCompleteDrive(drive.id)}
                            className="w-full py-2.5 mb-2 rounded-xl font-semibold text-sm transition-all duration-300 bg-slate-700 hover:bg-slate-800 text-white"
                          >
                            Mark as Completed ✓
                          </button>

                        )}

                        {/* Generate Certificates — requires drive to be completed */}
                        <button
                          disabled={drive.certificateIssued || !drive.completed}
                          onClick={() => handleGenerateCertificates(drive.id)}
                          className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-300 ${drive.certificateIssued
                              ? "bg-gray-200 cursor-not-allowed text-gray-500"
                              : !drive.completed
                                ? "bg-gray-200 cursor-not-allowed text-gray-400"
                                : "bg-indigo-600 hover:bg-indigo-700 text-white"
                            }`}
                        >
                          {drive.certificateIssued
                            ? "Certificates Issued ✅"
                            : !drive.completed
                              ? "Complete drive to unlock"
                              : "Generate Certificates"}
                        </button>
                      </motion.div>
                    ))}
                    {drives.length === 0 && <p className="col-span-3 text-center themed-muted py-10">No drives found. Create one!</p>}
                  </div>
                )}
              </div>
            )}

            {/* ── ATTENDANCE ── */}
            {activeNav === "attendance" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-bold themed-text">Attendance</h1>
                    <p className="themed-secondary text-sm">Mark and track volunteer attendance across drives.</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Total Records", val: attendance.length, icon: "📋" },
                    { label: "Marked", val: attendance.filter(item => item.status === "Approved").length, icon: "✅" },
                    { label: "Pending", val: attendance.filter(item => item.status === "Pending").length, icon: "⏳" },
                  ].map(s => (
                    <div key={s.label} className="themed-card rounded-2xl p-5 border themed-border shadow-sm">
                      <p className="text-2xl mb-1">{s.icon}</p>
                      <p className="text-3xl font-black themed-text">{s.val}</p>
                      <p className="text-xs font-bold themed-muted uppercase tracking-widest">{s.label}</p>
                    </div>
                  ))}
                </div>
                {loadingAttendance ? <SectionLoader /> : (
                  <div className="themed-card rounded-2xl shadow-sm border themed-border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="themed-subtle text-left">
                        <tr>{["Volunteer", "Email", "Drive", "Hours", "Date", "Status", "Action"].map(h => <th key={h} className="p-4 text-xs font-bold themed-muted uppercase tracking-wider">{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {attendance.map(item => (
                          <tr key={item.id} className="border-t themed-border table-row-hover transition">
                            <td className="p-4 font-semibold themed-text">{item.user?.name}</td>
                            <td className="p-4 themed-muted text-xs">{item.user?.email}</td>
                            <td className="p-4 themed-secondary">{item.drive ? new Date(item.drive.date).toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }) : "-"}</td>
                            <td className="p-4 themed-secondary">{item.hours} hrs</td>
                            <td className="p-4 themed-muted">{item.createdAt ? new Date(item.createdAt).toLocaleDateString("en-IN") : "-"}</td>
                            <td className="p-4">
                              <span className={`text-xs px-2 py-1 rounded-full font-medium ${item.status === "Approved" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                                {item.status}
                              </span>
                            </td>
                            <td className="p-4">
                              {item.status === "Pending" ? (
                                <button
                                  onClick={() => handleApproveAttendance(item.id)}
                                  className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-xs"
                                >
                                  Approve
                                </button>
                              ) : (
                                <span className="text-green-600 text-xs">Approved</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {attendance.length === 0 && <p className="text-center themed-muted py-8 text-sm">No attendance records yet.</p>}
                  </div>
                )}
              </div>
            )}

            {/* ── VOLUNTEERS ── */}
            {activeNav === "volunteers" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-bold themed-text">Volunteers</h1>
                    <p className="themed-secondary text-sm">Manage your volunteer community.</p>
                  </div>
                  <button onClick={() => setShowVolunteerModal(true)} className="accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition accent-shadow flex items-center gap-2">
                    <Plus size={16} /> Add Volunteer
                  </button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                  {[
                    { label: "Total", val: volunteers.length, icon: Users, color: "themed-subtle themed-secondary" },
                    { label: "New Members", val: newVolunteers, icon: Plus, color: "bg-purple-50 text-purple-600" },
                    { label: "Recurring", val: recurringVolunteers, icon: RefreshCw, color: "accent-icon-bg" },
                    { label: "Pending Approval", val: pendingVolunteers, icon: Clock, color: "bg-orange-50 text-orange-600" },
                  ].map(s => (
                    <div key={s.label} className="themed-card rounded-2xl p-5 border themed-border shadow-sm">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon size={20} /></div>
                      <p className="text-3xl font-black themed-text">{s.val}</p>
                      <p className="text-xs font-bold themed-muted uppercase tracking-widest mt-1">{s.label}</p>
                    </div>
                  ))}
                </div>
                {loadingVolunteers ? <SectionLoader /> : (
                  <>
                    <div className="flex flex-col sm:flex-row gap-3 mb-4">
                      <div className="relative flex-1">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 themed-muted" />
                        <input value={volunteerSearch} onChange={e => setVolunteerSearch(e.target.value)} placeholder="Search volunteers..."
                          className="w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm input-themed" />
                      </div>
                      <div className="flex gap-2">
                        {(["All", "New", "Recurring", "Pending"] as const).map(f => (
                          <button key={f} onClick={() => setVolunteerFilter(f)}
                            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${volunteerFilter === f ? "accent-bg text-white" : "themed-card border themed-border themed-secondary themed-hover"}`}>{f}</button>
                        ))}
                      </div>
                    </div>
                    <div className="themed-card rounded-2xl shadow-sm border themed-border overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="themed-subtle text-left">
                          <tr>{["Name", "Email", "City", "Drives", "Status", "Type", "Action"].map(h => <th key={h} className="p-4 text-xs font-bold themed-muted uppercase tracking-wider">{h}</th>)}</tr>
                        </thead>
                        <tbody>
                          {filteredVolunteers.map(v => (
                            <tr key={v.id} className="border-t themed-border table-row-hover transition cursor-pointer" onClick={() => setSelectedVolunteer(v)}>
                              <td className="p-4 font-semibold themed-text">{v.name}</td>
                              <td className="p-4 themed-muted text-xs">{v.email}</td>
                              <td className="p-4 themed-secondary">{v.city}</td>
                              <td className="p-4 themed-secondary">{v.drives}</td>
                              <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(v.status)}`}>{v.status}</span></td>
                              <td className="p-4">
                                {v.isNew
                                  ? <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-bold">New</span>
                                  : <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">Recurring</span>}
                              </td>
                              <td className="p-4" onClick={e => e.stopPropagation()}>
                                {v.status === "Pending"
                                  ? <button onClick={() => handleApproveVolunteer(v)} className="accent-text font-semibold text-sm accent-text-hover">Approve</button>
                                  : <button onClick={() => setSelectedVolunteer(v)} className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1"><Eye size={14} /> View</button>}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {filteredVolunteers.length === 0 && <p className="text-center themed-muted py-8 text-sm">No volunteers found.</p>}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* ── MESSAGES ── */}
            {activeNav === "messages" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h1 className="text-2xl font-bold themed-text">Messages</h1>
                    <p className="themed-secondary text-sm">Compose and send messages to your volunteers via email.</p>
                  </div>
                  <button onClick={() => setShowMessageModal(true)} className="accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition accent-shadow flex items-center gap-2">
                    <Send size={16} /> New Message
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: "Sent", val: messages.filter(m => m.status === "Sent").length, icon: "✉️" },
                    { label: "Total Reach", val: messages.filter(m => m.status === "Sent").reduce((s, m) => s + m.recipients, 0), icon: "👥" },
                  ].map(s => (
                    <div key={s.label} className="themed-card rounded-2xl p-5 border themed-border shadow-sm">
                      <p className="text-2xl mb-1">{s.icon}</p>
                      <p className="text-3xl font-black themed-text">{s.val}</p>
                      <p className="text-xs font-bold themed-muted uppercase tracking-widest">{s.label}</p>
                    </div>
                  ))}
                </div>
                {loadingMessages ? <SectionLoader /> : (
                  <div className="space-y-4">
                    {messages.map(msg => (
                      <div key={msg.id} className="themed-card p-5 rounded-2xl shadow-sm border themed-border themed-hover transition">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h2 className="font-bold text-lg themed-text">{msg.title}</h2>
                            {msg.status === "Sent" && <p className="text-xs themed-muted">Sent to all volunteers</p>}
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(msg.status)}`}>{msg.status}</span>
                        </div>
                        <p className="text-sm themed-secondary mb-3">{msg.content}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-xs themed-muted">{msg.date}</span>
                          <button onClick={() => setSelectedMessage(msg)} className="accent-text text-sm font-semibold inline-flex items-center gap-1 accent-text-hover">
                            View <ChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    ))}
                    {messages.length === 0 && <p className="text-center themed-muted py-10 text-sm">No messages yet. Send your first one!</p>}
                  </div>
                )}
              </div>
            )}

            {/* ── SETTINGS ── */}
            {activeNav === "settings" && (
              <SettingsSection
                volunteers={volunteers}
                drives={drives}
                attendance={attendance}
                messages={messages}
                onLogout={handleLogout}
                onNavigate={goTo}
              />
            )}

          </div>
        </main>

        {/* ── MODALS ── */}

        <Modal open={showDriveModal} onClose={() => setShowDriveModal(false)} title="Create New Drive">
          <InputField label="Title *" value={driveForm.title} onChange={v => setDriveForm(p => ({ ...p, title: v }))} placeholder="e.g. Community Cleanup" />
          <InputField label="Location *" value={driveForm.location} onChange={v => setDriveForm(p => ({ ...p, location: v }))} placeholder="e.g. Central Park" />
          <InputField label="Date & Time *" type="datetime-local" value={driveForm.date} onChange={v => setDriveForm(p => ({ ...p, date: v }))} />
          <InputField label="Total Hours *" type="number" value={driveForm.totalHours} onChange={v => setDriveForm(p => ({ ...p, totalHours: v }))} placeholder="e.g. 3" />
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowDriveModal(false)} className="px-4 py-2 text-sm themed-subtle rounded-xl font-semibold themed-secondary">Cancel</button>
            <button onClick={handleCreateDrive} disabled={submitting}
              className="px-5 py-2 text-sm accent-bg accent-bg-hover text-white rounded-xl font-bold transition flex items-center gap-2 disabled:opacity-60">
              {submitting ? <Spinner size={16} /> : null} Create Drive 🚀
            </button>
          </div>
        </Modal>

        <Modal open={showVolunteerModal} onClose={() => setShowVolunteerModal(false)} title="Add New Volunteer">
          <InputField label="Full Name *" value={volunteerForm.name} onChange={v => setVolunteerForm(p => ({ ...p, name: v }))} placeholder="e.g. Priya Sharma" />
          <InputField label="Email *" type="email" value={volunteerForm.email} onChange={v => setVolunteerForm(p => ({ ...p, email: v }))} placeholder="priya@gmail.com" />
          <InputField label="City *" value={volunteerForm.city} onChange={v => setVolunteerForm(p => ({ ...p, city: v }))} placeholder="e.g. Pune" />
          <InputField label="Age" type="number" value={volunteerForm.age} onChange={v => setVolunteerForm(p => ({ ...p, age: v }))} placeholder="e.g. 23" />
          <InputField label="Temporary Password" type="password" value={volunteerForm.password} onChange={v => setVolunteerForm(p => ({ ...p, password: v }))} placeholder="Default: Volunteer@123" />
          <p className="text-xs themed-muted mb-4 themed-subtle rounded-xl p-3">New volunteer will be added as <strong>Pending</strong> and must be approved before they can participate.</p>
          <div className="flex justify-end gap-3 pt-2">
            <button onClick={() => setShowVolunteerModal(false)} className="px-4 py-2 text-sm themed-subtle rounded-xl font-semibold themed-secondary">Cancel</button>
            <button onClick={handleAddVolunteer} disabled={submitting}
              className="px-5 py-2 text-sm accent-bg accent-bg-hover text-white rounded-xl font-bold transition flex items-center gap-2 disabled:opacity-60">
              {submitting ? <Spinner size={16} /> : null} Add Volunteer 👤
            </button>
          </div>
        </Modal>

        <Modal open={showMessageModal} onClose={() => setShowMessageModal(false)} title="Compose Message">
          <div className="accent-bg-soft rounded-xl p-3 mb-4 text-sm accent-text font-medium">
            📧 Message will be sent to <strong>{volunteers.filter(v => v.status === "Approved").length} approved volunteers</strong> via email.
          </div>
          <InputField label="Subject / Title *" value={messageForm.title} onChange={v => setMessageForm(p => ({ ...p, title: v }))} placeholder="e.g. Sunday Drive Reminder" />
          <div className="mb-4">
            <label className="block text-xs font-bold themed-muted uppercase tracking-widest mb-1.5">Message Content *</label>
            <textarea value={messageForm.content} onChange={e => setMessageForm(p => ({ ...p, content: e.target.value }))} placeholder="Write your message here..."
              className="w-full border rounded-xl px-4 py-2.5 text-sm transition input-themed h-28 resize-none" />
          </div>
          <div className="flex justify-end gap-3">
            <button onClick={() => setShowMessageModal(false)} className="px-4 py-2 text-sm themed-subtle rounded-xl font-semibold themed-secondary">Cancel</button>
            <button onClick={handleSendMessage} disabled={submitting}
              className="px-5 py-2 text-sm accent-bg accent-bg-hover text-white rounded-xl font-bold transition flex items-center gap-2 disabled:opacity-60">
              {submitting ? <Spinner size={16} /> : <Send size={14} />} Send Message
            </button>
          </div>
        </Modal>

        <Modal open={!!selectedMessage} onClose={() => setSelectedMessage(null)} title={selectedMessage?.title ?? ""}>
          {selectedMessage && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(selectedMessage.status)}`}>{selectedMessage.status}</span>
                <span className="text-xs themed-muted">{selectedMessage.date}</span>
                {selectedMessage.status === "Sent" && <span className="text-xs themed-muted">• {selectedMessage.recipients} recipients</span>}
              </div>
              <div className="themed-subtle rounded-xl p-4 text-sm themed-secondary leading-7">{selectedMessage.content}</div>
              <div className="flex justify-end mt-4">
                <button onClick={() => setSelectedMessage(null)} className="px-4 py-2 text-sm themed-subtle rounded-xl font-semibold themed-secondary">Close</button>
              </div>
            </div>
          )}
        </Modal>

        <VolunteerDrawer volunteer={selectedVolunteer} onClose={() => setSelectedVolunteer(null)} onApprove={handleApproveVolunteer} />
        <DriveDetailsModal drive={selectedDrive} onClose={() => setSelectedDrive(null)} />
      </div>
    </ThemeContext.Provider>
  );
}
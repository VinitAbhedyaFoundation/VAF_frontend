"use client";

import React, { useState, useMemo, useCallback } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  LayoutDashboard, BarChart3, ShieldCheck, UserCircle, Waves, ClipboardList,
  FileBarChart2, Settings, LogOut, Plus, Trash2, Eye, Search,
  Menu, X, Bell, ChevronRight, AlertTriangle, CheckCircle2,
  Loader2, Leaf, Clock, Users, Download, RefreshCw, ToggleLeft,
  ToggleRight, MapPin, Award, Filter,
} from "lucide-react";
import { useEffect } from "react";
import API from "../api/api";



// ─── TYPES ────────────────────────────────────────────────────────────────────

type AdminStatus = "Active" | "Suspended";
type UserStatus = "Active" | "Inactive";
type DriveStatus = "Completed" | "Upcoming" | "Active";
type AttendanceStatus = "Marked" | "Pending";
type ReportType = "Monthly" | "Quarterly" | "Annual";
type NavSection = "overview" | "admins" | "users" | "drives" | "settings";

interface Admin {
  id: number; name: string; email: string; role: string;
  status: AdminStatus; city: string; joined: string; lastActive?: string;
}
interface User {
  id: number; name: string; email: string; city: string;
  drives: number; status: UserStatus; joined: string;
  totalHours?: number; wasteKg?: number;
}
interface Drive {
  id: number; date: string; location: string; volunteers: number;
  wasteKg: number; status: DriveStatus; hours: number; coordinator?: string;
}
interface AttendanceRecord {
  id: number; volunteer: string; email: string; drive: string;
  driveId: number; date: string; hours: number; status: AttendanceStatus;
}
interface Report {
  id: number; title: string; type: ReportType; generated: string;
  drives: number; volunteers: number; wasteKg: number; totalHours: number;
}
interface AppSettings {
  orgName: string; contactEmail: string; notifyNewDrive: boolean;
  notifyNewVolunteer: boolean; notifyWeeklyReport: boolean;
  maxDriveHours: number; allowSelfRegistration: boolean;
  requireApproval: boolean; maintenanceMode: boolean;
}
interface ConfirmState { type: "admin" | "user"; id: number; name: string; }



const INITIAL_SETTINGS: AppSettings = {
  orgName: "Volunteer Action Force", contactEmail: "admin@vaf.org",
  notifyNewDrive: true, notifyNewVolunteer: true, notifyWeeklyReport: false,
  maxDriveHours: 8, allowSelfRegistration: true, requireApproval: true, maintenanceMode: false,
};

const PIE_COLORS = ["#10b981", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6"];

// ─── NAV CONFIG ───────────────────────────────────────────────────────────────

const NAV_ITEMS: { label: string; icon: React.ElementType; id: NavSection }[] = [
  { label: "Dashboard", icon: LayoutDashboard, id: "overview" },
  { label: "Admins", icon: ShieldCheck, id: "admins" },
  { label: "Users", icon: UserCircle, id: "users" },
  { label: "Drive Management", icon: Waves, id: "drives" },
  { label: "NGO Profile", icon: Settings, id: "settings" },
];
// ─── HELPERS ─────────────────────────────────────────────────────────────────

const getStatusClass = (s: string) => {
  switch (s) {
    case "Approved":
  return "bg-green-100 text-green-700";

case "Pending":
  return "bg-yellow-100 text-yellow-700";

case "Suspended":
  return "bg-red-100 text-red-700";
    case "Active": case "Approved": case "Marked": case "Sent": case "Completed":
      return "bg-green-100 text-green-700";
    case "Upcoming": return "bg-blue-100 text-blue-700";
    case "Pending": case "Draft": case "Suspended":
      return "bg-orange-100 text-orange-700";
    case "Inactive": return "bg-slate-100 text-slate-600";
    case "Monthly": return "bg-purple-100 text-purple-700";
    case "Quarterly": return "bg-blue-100 text-blue-700";
    case "Annual": return "bg-orange-100 text-orange-700";
    default: return "bg-slate-100 text-slate-600";
  }
};

const Avatar: React.FC<{ name: string; size?: "sm" | "md" | "lg" }> = ({ name, size = "md" }) => {
  const initials = name.split(" ").map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const colors = ["from-emerald-400 to-emerald-600", "from-indigo-400 to-indigo-600", "from-amber-400 to-amber-600", "from-sky-400 to-sky-600", "from-pink-400 to-pink-600"];
  const gradient = colors[name.charCodeAt(0) % colors.length];
  const sz = size === "sm" ? "w-8 h-8 text-xs" : size === "lg" ? "w-20 h-20 text-3xl" : "w-9 h-9 text-sm";
  return (
    <div className={`${sz} bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-black flex-shrink-0`}>
      {initials}
    </div>
  );
};

// ─── LOADING ─────────────────────────────────────────────────────────────────

const Spinner: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Loader2 size={size} className="animate-spin text-emerald-600" />
);

// ─── MODAL ────────────────────────────────────────────────────────────────────

const Modal: React.FC<{ open: boolean; onClose: () => void; title: string; children: React.ReactNode }> = ({ open, onClose, title, children }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm" onClick={onClose} />
        <motion.div initial={{ opacity: 0, scale: 0.92, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }} transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center z-50 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">{title}</h2>
              <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition"><X size={18} /></button>
            </div>
            <div className="px-6 py-5 max-h-[70vh] overflow-y-auto">{children}</div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const InputField: React.FC<{ label: string; type?: string; value: string; onChange: (v: string) => void; placeholder?: string; required?: boolean }> =
  ({ label, type = "text", value, onChange, placeholder, required }) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">
        {label}{required && <span className="text-red-500 ml-0.5">*</span>}
      </label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
    </div>
  );

const SelectField: React.FC<{ label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }> =
  ({ label, value, onChange, options }) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );

// ─── CONFIRM DIALOG ───────────────────────────────────────────────────────────

const ConfirmDialog: React.FC<{ open: boolean; message: string; onConfirm: () => void; onCancel: () => void }> = ({ open, message, onConfirm, onCancel }) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm" onClick={onCancel} />
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center z-[70] px-4">
          <div className="bg-white rounded-2xl shadow-2xl p-7 max-w-sm w-full text-center">
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4 text-red-600">
              <AlertTriangle size={26} />
            </div>
            <p className="font-black text-slate-900 mb-2">Are you sure?</p>
            <p className="text-sm text-slate-500 mb-6">{message}</p>
            <div className="flex gap-3 justify-center">
              <button onClick={onCancel} className="px-5 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition">Cancel</button>
              <button onClick={onConfirm} className="px-5 py-2 rounded-xl bg-red-600 text-white font-bold text-sm hover:bg-red-700 transition">Delete</button>
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── ADMIN DETAIL DRAWER ──────────────────────────────────────────────────────

const AdminDrawer: React.FC<{ admin: Admin | null; onClose: () => void }> = ({ admin, onClose }) => (
  <AnimatePresence>
    {admin && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 className="font-black text-slate-900">Admin Profile</h3>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar name={admin.name} size="lg" />
              <h2 className="text-xl font-black mt-3">{admin.name}</h2>
              <p className="text-sm text-slate-500">{admin.email}</p>
              <div className="flex gap-2 mt-2">
                <span className={`text-xs px-3 py-1 rounded-full font-bold ${getStatusClass(admin.status)}`}>{admin.status}</span>
                <span className="text-xs px-3 py-1 rounded-full font-bold bg-indigo-100 text-indigo-700">{admin.role}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "City", val: admin.city, icon: "📍" },
                { label: "Joined", val: admin.joined, icon: "📅" },
                { label: "Last Active", val: admin.lastActive ?? "—", icon: "🕐" },
                { label: "Role", val: admin.role, icon: "🛡️" },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{item.icon} {item.label}</p>
                  <p className="font-black text-slate-900">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

// ─── USER DETAIL DRAWER ───────────────────────────────────────────────────────

const UserDrawer: React.FC<{ user: User | null; onClose: () => void }> = ({ user, onClose }) => (
  <AnimatePresence>
    {user && (
      <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
        <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
          <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
            <h3 className="font-black text-slate-900">Volunteer Profile</h3>
            <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full"><X size={18} /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-6">
            <div className="flex flex-col items-center mb-6">
              <Avatar name={user.name} size="lg" />
              <h2 className="text-xl font-black mt-3">{user.name}</h2>
              <p className="text-sm text-slate-500">{user.email}</p>
              <span className={`mt-2 text-xs px-3 py-1 rounded-full font-bold ${getStatusClass(user.status)}`}>{user.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "City", val: user.city, icon: "📍" },
                { label: "Joined", val: user.joined, icon: "📅" },
                { label: "Drives Joined", val: String(user.drives), icon: "🌊" },
                { label: "Total Hours", val: `${user.totalHours ?? 0} hrs`, icon: "🕐" },
                { label: "Waste Collected", val: `${user.wasteKg ?? 0} kg`, icon: "♻️" },
              ].map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                  <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{item.icon} {item.label}</p>
                  <p className="font-black text-slate-900">{item.val}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);



// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SuperAdminDashboard() {

  const [settings, setSettings] =
    useState<AppSettings>(INITIAL_SETTINGS);
  const [active, setActive] = useState<NavSection>("overview");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [settingsTab, setSettingsTab] = useState("profile");

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");
  // ── data ────────────────────────────────────────────────────────────────────
const [admins, setAdmins] = useState<any[]>([]);
const [users, setUsers] = useState<any[]>([]);
const [drives, setDrives] = useState<any[]>([]);
 const [attendance, setAttendance] = useState<any[]>([]);
const [reports, setReports] = useState<any[]>([]);
  // ── modals ──────────────────────────────────────────────────────────────────
  const [adminModal, setAdminModal] = useState(false);
  const [userModal, setUserModal] = useState(false);
  const [reportModal, setReportModal] = useState(false);
  const [viewAdmin, setViewAdmin] = useState<Admin | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [confirm, setConfirm] = useState<ConfirmState | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // ── forms ───────────────────────────────────────────────────────────────────
  const [adminForm, setAdminForm] = useState({ name: "", email: "", role: "Admin", city: "" });
  const [userForm, setUserForm] = useState({ name: "", email: "", city: "", password: "" });
  const [reportForm, setReportForm] = useState<{ type: ReportType }>({ type: "Monthly" });

  // ── search / filter ─────────────────────────────────────────────────────────
  const [adminSearch, setAdminSearch] = useState("");
  const [userSearch, setUserSearch] = useState("");
  const [driveFilter, setDriveFilter] = useState<"All" | DriveStatus>("All");
  const [attendanceFilter, setAttendanceFilter] = useState<"All" | AttendanceStatus>("All");

  // ── computed ─────────────────────────────────────────────────────────────────
const totalWaste = (drives || []).reduce(
  (s, d) => s + (d.wasteKg || 0),
  0
);

const totalHours = (drives || []).reduce(
  (s, d) => s + (d.hours || 0),
  0
);
const today = new Date();

const completedDrives = drives.filter((d) =>
  new Date(d.date) < today
).length;

const upcomingDrives = drives.filter((d) =>
  new Date(d.date) >= today
).length;
  const pendingAttendance =
  (attendance || []).filter(
    a => a.status === "Pending"
  ).length;
  const filteredAdmins = useMemo(() =>
    admins.filter(a => a.name.toLowerCase().includes(adminSearch.toLowerCase()) || a.email.toLowerCase().includes(adminSearch.toLowerCase())),
    [admins, adminSearch]);

  const filteredUsers = useMemo(() =>
    users.filter(u => u.name.toLowerCase().includes(userSearch.toLowerCase()) || u.email.toLowerCase().includes(userSearch.toLowerCase())),
    [users, userSearch]);

 const filteredDrives = useMemo(() => {
  if (driveFilter === "All") return drives;

  return drives.filter((d) => {
    const isCompleted =
      new Date(d.date) < new Date();

    if (driveFilter === "Completed")
      return isCompleted;

    if (driveFilter === "Upcoming")
      return !isCompleted;

    return true;
  });
}, [drives, driveFilter]);

  const filteredAttendance = useMemo(() =>
    attendanceFilter === "All" ? attendance : attendance.filter(a => a.status === attendanceFilter),
    [attendance, attendanceFilter]);

  const cityData = useMemo(() => {
    const map: Record<string, number> = {};
    users.forEach(u => { map[u.city] = (map[u.city] || 0) + 1; });
    return Object.entries(map).map(([name, value]) => ({ name, value }));
  }, [users]);

  const wasteBarData = drives.filter(d => d.wasteKg > 0).map(d => ({
    name: d.location.split(",")[0].split(" ").slice(-1)[0],
    waste: d.wasteKg,
  }));

  const volunteerBarData = drives.filter(d => d.volunteers > 0).map(d => ({
    name: d.location.split(",")[0].split(" ").slice(-1)[0],
    volunteers: d.volunteers,
  }));

  const monthlyWasteData = useMemo(() => {
  const months: Record<string, number> = {};
  console.log("Drives Data:", drives);

  drives.forEach((drive) => {
    const month = new Date(drive.date).toLocaleString(
      "default",
      { month: "short" }
    );

    months[month] =
      (months[month] || 0) +
      (drive.wasteKg || 0);
  });

  return Object.entries(months).map(
    ([month, waste]) => ({
      month,
      waste,
    })
  );
}, [drives]);
console.log(users);
const monthlyVolunteerData = useMemo(() => {
  const months: Record<string, number> = {};
console.log("Users Data:", users);
  users.forEach((user) => {
    const month = new Date(
      user.joined
    ).toLocaleString(
      "default",
      { month: "short" }
    );

    months[month] =
      (months[month] || 0) + 1;
  });

  return Object.entries(months).map(
    ([month, volunteers]) => ({
      month,
      volunteers,
    })
  );
}, [users]);

  const fetchUsers = async () => {

    try {

      const res =
        await API.get("/user/all");

console.log("Raw Users:", res.data.users);
res.data.users.forEach((u: any) => {
 console.log("USER OBJECT", u);
});
      const formatted =
        res.data.users
          .filter(
            (u: any) =>
              u.role === "User"
          )
          .map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            city: u.city || "N/A",
            drives: u.drivesCount || 0,
            status: u.status,
joined: u.createdAt || new Date().toISOString(),            totalHours:
              u.totalHours || 0,
            wasteKg:
              u.wasteKg || 0,
          }));

      setUsers(formatted);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchAdmins = async () => {

    try {

      const res =
        await API.get("/user/all");

      const formatted =
        res.data.users
          .filter(
            (u: any) =>
              u.role === "Admin" ||
              u.role === "SuperAdmin"
          )
          .map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            city: u.city || "N/A",
            joined: new Date(
              u.createdAt
            ).toLocaleDateString(),
            lastActive: "Recently",
            status:
              u.status === "Approved"
                ? "Active"
                : "Suspended",
          }));

      setAdmins(formatted);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchDrives = async () => {

    try {

      const res =
        await API.get("/drive/alldrives");
console.log("DRIVES RESPONSE", res.data);

const drives = res.data.drives || res.data || [];

const formatted = drives.map(
  (d: any) => ({
    id: d.id,
    date: d.date,
    location: d.location,
    volunteers: d.volunteerCount || 0,
    wasteKg: d.wasteKg || 0,
    status: d.status,
    hours: d.hours || 0,
  })
);
setDrives(formatted);

    } catch (error) {

      console.error(error);
    }
  };

  const fetchAttendance =
    async () => {

      try {

        const res =
          await API.get(
            "/attendance/all"
          );

        console.log("ATTENDANCE RESPONSE", res.data);

const attendance =
  res.data.attendance || res.data || [];

const formatted = attendance.map(
  (a: any) => ({
    id: a.id,
    volunteer: a.user.name,
    email: a.user.email,
    drive: a.drive.location,
    driveId: a.drive.id,
    date: new Date(
      a.createdAt || a.date
    ).toLocaleDateString(),
    hours: a.hours,
    status:
      a.status || "Pending",
  })
);

setAttendance(formatted);
      } catch (error) {

        console.error(error);
      }
    };

  const fetchReports =
    async () => {

      try {

        const res =
          await API.get(
            "/reports"
          );

        setReports(
          res.data.reports
        );

      } catch (error) {

        console.error(error);
      }
    };

  // ── handlers ─────────────────────────────────────────────────────────────────
  const handleAddAdmin = async () => {

    if (!adminForm.name || !adminForm.email) {
      toast.error("Name and email required");
      return;
    }

    try {

      setSubmitting(true);

      await API.post(
        "/auth/adminregister",
        {
          name: adminForm.name,
          email: adminForm.email,
          password: "Admin@123",
        }
      );

      toast.success("Admin created");

      setAdminModal(false);

      setAdminForm({
        name: "",
        email: "",
        role: "Admin",
        city: "",
      });

      fetchAdmins();

    } catch (error: any) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to create admin"
      );

    } finally {

      setSubmitting(false);
    }
  };

  const handleAddUser = async () => {

    if (
      !userForm.name ||
      !userForm.email ||
      !userForm.password
    ) {
      toast.error("Fill all required fields");
      return;
    }

    try {

      setSubmitting(true);

      await API.post(
        "/auth/register",
        {
          name: userForm.name,
          email: userForm.email,
          password: userForm.password,
          city: userForm.city,
        }
      );

      toast.success("Volunteer added");

      setUserModal(false);

      setUserForm({
        name: "",
        email: "",
        city: "",
        password: "",
      });

      fetchUsers();

    } catch (error: any) {

      console.error(error);

      toast.error(
        error?.response?.data?.message ||
        "Failed to add user"
      );

    } finally {

      setSubmitting(false);
    }
  };

  const confirmDelete = async () => {

    if (!confirm) return;

    try {

      if (confirm.type === "admin") {

        await API.delete(
          `/user/${confirm.id}`
        );

        fetchAdmins();

      } else {

        await API.delete(
          `/user/${confirm.id}`
        );

        fetchUsers();
      }

      toast.success("Deleted successfully");

    } catch (error) {

      console.error(error);

      toast.error("Delete failed");

    } finally {

      setConfirm(null);
    }
  };

  const toggleAdminStatus = async (
    id: number,
    currentStatus: string
  ) => {

    try {

      if (currentStatus === "Active") {

        await API.patch(
          `/user/suspend/${id}`
        );

        toast.success(
          "Admin suspended"
        );

      } else {

        await API.patch(
          `/user/approve/${id}`
        );

        toast.success(
          "Admin activated"
        );
      }

      fetchAdmins();

    } catch (error) {

      console.error(error);

      toast.error("Action failed");
    }
  };

  const markAttendance = async (
    id: number
  ) => {

    try {

      await API.patch(
        `/attendance/mark/${id}`
      );

      toast.success(
        "Attendance marked"
      );

      fetchAttendance();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to mark attendance"
      );
    }
  };

  const generateReport = async () => {

    try {

      setSubmitting(true);

      await API.post(
        "/reports/generate",
        {
          type: reportForm.type,
        }
      );

      toast.success(
        "Report generated"
      );

      setReportModal(false);

      fetchReports();

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to generate report"
      );

    } finally {

      setSubmitting(false);
    }
  };

  const goTo = (section: NavSection) => { setActive(section); setIsMobileMenuOpen(false); };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  useEffect(() => {

    fetchUsers();
    fetchAdmins();
    fetchDrives();
    fetchAttendance();
   // fetchReports();

  }, []);

  // ── section titles ───────────────────────────────────────────────────────────
  const sectionTitle: Record<NavSection, string> = {
  overview: "Dashboard",
  admins: "Admin Management",
  users: "Volunteer Management",
  drives: "Drive Management",
  settings: "NGO Profile",
};

  const pendingBadge = pendingAttendance > 0 ? `${pendingAttendance} Pending` : undefined;

  // ── SIDEBAR ──────────────────────────────────────────────────────────────────

  const SidebarContent = ({ mobile = false }) => (
    <div className={`flex flex-col ${mobile ? "p-8 w-80" : "w-80 border-r border-slate-200 bg-white p-8 hidden xl:flex sticky top-0 h-screen"}`}>
      {/* Logo */}
      <div className="flex items-center gap-2 mb-12">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl rotate-12 flex items-center justify-center shadow-lg shadow-emerald-200">
          <ShieldCheck className="text-white -rotate-12" size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-emerald-950">VAF</h2>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest -mt-1">SuperAdmin</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="space-y-2 flex-1">
        {NAV_ITEMS.map(item => {
const badge = undefined;
          return (
            <button key={item.id} onClick={() => goTo(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${active === item.id ? "bg-emerald-900 text-white shadow-xl shadow-emerald-200" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"}`}>
              <div className="flex items-center gap-3"><item.icon size={20} />{item.label}</div>
              {badge && <span className="text-[10px] opacity-60">{badge}</span>}
            </button>
          );
        })}
      </nav>

      {/* Bottom card */}
      <div className="bg-slate-950 p-6 rounded-[2rem] text-white relative overflow-hidden mt-auto">
        <div className="absolute -right-4 -bottom-4 text-emerald-500/20 rotate-45"><Leaf size={120} /></div>
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-emerald-400 uppercase mb-2">Logged in as</p>
          <h4 className="text-lg font-bold mb-1">Super Admin</h4>
          <p className="text-[11px] text-slate-400">admin@vaf.org</p>
        </div>
      </div>
    </div>
  );

  // ─────────────────────────────────────────────────────────────────────────────
  // SECTIONS
  // ─────────────────────────────────────────────────────────────────────────────

  const renderOverview = () => {
    const METRICS = [
      { id: "m1", label: "Total Drives", value: drives.length, icon: Waves, color: "text-emerald-600", bgLight: "bg-emerald-50" },
      { id: "m2", label: "Admins", value: admins.length, icon: ShieldCheck,  color: "text-indigo-600", bgLight: "bg-indigo-50" },
      { id: "m3", label: "Volunteers", value: users.length, icon: Users,  color: "text-amber-600", bgLight: "bg-amber-50" },
      { id: "m4", label: "Waste Collected (kg)", value: totalWaste, icon: Leaf, trend: ` `, color: "text-sky-600", bgLight: "bg-sky-50" },
    ];

    const topVolunteer = [...users].sort((a, b) => (b.drives ?? 0) - (a.drives ?? 0))[0];
    const upcomingDrives = drives
  .filter(d => d.status === "Upcoming")
  .slice(0, 3);

const topVolunteers = [...users]
  .sort((a, b) => (b.drives ?? 0) - (a.drives ?? 0))
  .slice(0, 3);

    return (
      <>
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-slate-500 mt-1">Platform-wide metrics and activity at a glance.</p>
        </div>

        {/* Metric cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {METRICS.map(m => (
            <motion.div key={m.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300">
              <div className="flex justify-between items-start mb-5">
                <div className={`p-3 rounded-xl ${m.bgLight} ${m.color}`}><m.icon size={22} /></div>
                <span className="bg-emerald-100 text-emerald-700 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase">{m.trend}</span>
              </div>
              <h3 className="text-4xl font-black tracking-tighter mb-1">
                <CountUp end={m.value} duration={2} />
              </h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{m.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-1"> Monthly Impact Analytics</h3>
            <p className="text-sm text-slate-400 mb-6">Per completed drive</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Waste Collected (kg)</p>
                <ResponsiveContainer
  width="100%"
  height={220}
>
  <LineChart
    data={monthlyWasteData}
  >
    <CartesianGrid
      strokeDasharray="3 3"
      vertical={false}
      stroke="#f1f5f9"
    />

    <XAxis
      dataKey="month"
      axisLine={false}
      tickLine={false}
    />

    <YAxis
      axisLine={false}
      tickLine={false}
    />

    <Tooltip />

    <Line
      type="monotone"
      dataKey="waste"
      stroke="#10b981"
      strokeWidth={3}
    />
  </LineChart>
</ResponsiveContainer>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">New Volunteers Joined</p>
                <ResponsiveContainer
  width="100%"
  height={220}
>
  <BarChart
    data={monthlyVolunteerData}
  >
    <CartesianGrid
      strokeDasharray="3 3"
      vertical={false}
      stroke="#f1f5f9"
    />

    <XAxis
      dataKey="month"
      axisLine={false}
      tickLine={false}
    />

    <YAxis
      axisLine={false}
      tickLine={false}
    />

    <Tooltip />

    <Bar
      dataKey="volunteers"
      fill="#6366f1"
      radius={[8, 8, 0, 0]}
    />
  </BarChart>
</ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Platform health */}
          <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
  <h3 className="text-xl font-black mb-4">
    Upcoming Drives
  </h3>

  <div className="space-y-3 mb-8">
    {upcomingDrives.map((drive) => (
      <div
        key={drive.id}
        className="bg-white/5 p-3 rounded-xl"
      >
        <p className="font-bold">
          {drive.location}
        </p>

        <p className="text-xs text-slate-400">
          {new Date(
            drive.date
          ).toLocaleDateString()}
        </p>

        <p className="text-xs text-emerald-400">
          {drive.volunteers} Volunteers
        </p>
      </div>
    ))}
  </div>

  <h3 className="text-xl font-black mb-4">
    🏆 Leaderboard
  </h3>

  <div className="space-y-3">
    {topVolunteers.map((u, index) => (
      <div
        key={u.id}
        className="flex items-center gap-3"
      >
        <span>
          {["🥇","🥈","🥉"][index]}
        </span>

        <Avatar
          name={u.name}
          size="sm"
        />

        <div>
          <p className="font-semibold">
            {u.name}
          </p>

          <p className="text-xs text-slate-400">
            {u.drives} drives
          </p>
        </div>
      </div>
    ))}
  </div>
</div>
</div>
        {/* Recent drives table */}
        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-black">Recent Drives</h3>
            <button onClick={() => goTo("drives")} className="text-emerald-600 text-sm font-semibold inline-flex items-center gap-1 hover:text-emerald-700">
              View all <ChevronRight size={16} />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-slate-50 text-slate-600 text-left">
  <tr>
    {[
      "Location",
      "Date",
      "Volunteers",
      "Hours",
      "Waste (kg)",
    ].map(h => (
      <th key={h} className="p-4 text-xs font-bold uppercase tracking-wider">
        {h}
      </th>
    ))}
  </tr>
</thead>
              <tbody>
  {drives.slice(0, 4).map((d) => (
    <tr key={d.id} className="border-t hover:bg-slate-50 transition">
      <td className="p-4 font-semibold flex items-center gap-2">
        <MapPin size={13} className="text-emerald-500" />
        {d.location}
      </td>

      <td className="p-4 text-slate-500">
        {new Date(d.date).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </td>

      <td className="p-4">
        {d.volunteers}
      </td>

      <td className="p-4">
        {d.hours} hrs
      </td>

      <td className="p-4">
        {d.wasteKg} kg
      </td>
    </tr>
  ))}
</tbody>
            </table>
          </div>
        </div>
      </>
    );
  };

  const renderAdmins = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div><h1 className="text-2xl font-bold">Manage Admins</h1><p className="text-slate-500 text-sm">Add, suspend, or remove admin accounts.</p></div>
        <button onClick={() => setAdminModal(true)} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center gap-2">
          <Plus size={16} /> Add Admin
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Admins", val: admins.length, icon: ShieldCheck, color: "text-indigo-600", bg: "bg-indigo-50" },
          { label: "Active", val: admins.filter(a => a.status === "Active").length, icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Suspended", val: admins.filter(a => a.status === "Suspended").length, icon: AlertTriangle, color: "text-red-600", bg: "bg-red-50" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg} ${s.color}`}><s.icon size={20} /></div>
            <p className="text-3xl font-black text-slate-900">{s.val}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={adminSearch} onChange={e => setAdminSearch(e.target.value)} placeholder="Search admins…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-left">
            <tr>{["Admin", "Email", "City", "Joined", "Last Active", "Status", "Actions"].map(h => (
              <th key={h} className="p-4 text-xs font-bold uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filteredAdmins.map(a => (
              <tr key={a.id} className="border-t hover:bg-slate-50 transition">
                <td className="p-4">
                  <div className="flex items-center gap-3"><Avatar name={a.name} /><span className="font-semibold">{a.name}</span></div>
                </td>
                <td className="p-4 text-slate-400 text-xs">{a.email}</td>
                <td className="p-4 text-slate-500">{a.city}</td>
                <td className="p-4 text-slate-500">{a.joined}</td>
                <td className="p-4 text-slate-400 text-xs">{a.lastActive ?? "—"}</td>
                <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(a.status)}`}>{a.status}</span></td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button onClick={() => setViewAdmin(a)} className="text-blue-600 font-semibold text-xs hover:text-blue-700 flex items-center gap-1 bg-blue-50 px-2.5 py-1.5 rounded-lg">
                      <Eye size={12} /> View
                    </button>
                    <button onClick={() =>
                      toggleAdminStatus(
                        a.id,
                        a.status
                      )
                    }
                      className="text-slate-600 font-semibold text-xs hover:text-slate-900 bg-slate-100 px-2.5 py-1.5 rounded-lg">
                      {a.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                    <button onClick={() => setConfirm({ type: "admin", id: a.id, name: a.name })}
                      className="text-red-600 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition">
                      <Trash2 size={13} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredAdmins.length === 0 && <p className="text-center text-slate-400 py-10 text-sm">No admins found.</p>}
      </div>
    </div>
  );

  const renderUsers = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div><h1 className="text-2xl font-bold">Manage Users</h1><p className="text-slate-500 text-sm">View, add, or remove volunteer accounts.</p></div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
  {
    label: "Total Users",
    val: users.length,
    icon: Users,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    label: "Approved",
    val: users.filter(
      u => u.status === "Approved"
    ).length,
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    label: "Pending",
    val: users.filter(
      u => u.status === "Pending"
    ).length,
    icon: Clock,
    color: "text-orange-600",
    bg: "bg-orange-50",
  },
  {
    label: "Suspended",
    val: users.filter(
      u => u.status === "Suspended"
    ).length,
    icon: AlertTriangle,
    color: "text-red-600",
    bg: "bg-red-50",
  },
].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg} ${s.color}`}><s.icon size={20} /></div>
            <p className="text-3xl font-black text-slate-900">{s.val}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      
      {/* Search + table */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative flex-1 max-w-xs">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={userSearch} onChange={e => setUserSearch(e.target.value)} placeholder="Search volunteers…"
            className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-600 text-left">
            <tr>{["Volunteer", "Email", "Drives", "Status", "Action"].map(h => (
              <th key={h} className="p-4 text-xs font-bold uppercase tracking-wider">{h}</th>
            ))}</tr>
          </thead>
          <tbody>
            {filteredUsers.map(u => (
              <tr key={u.id} className="border-t hover:bg-slate-50 transition cursor-pointer" onClick={() => setViewUser(u)}>
                <td className="p-4">
                  <div className="flex items-center gap-3"><Avatar name={u.name} /><span className="font-semibold">{u.name}</span></div>
                </td>
                <td className="p-4 text-slate-400 text-xs">{u.email}</td>
                <td className="p-4">{u.drives}</td>
                <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(u.status)}`}>{u.status}</span></td>
                <td className="p-4" onClick={e => e.stopPropagation()}>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setViewUser(u)} className="text-blue-600 font-semibold text-xs bg-blue-50 px-2.5 py-1.5 rounded-lg flex items-center gap-1">
                      <Eye size={12} /> View
                    </button>
                    <button onClick={() => setConfirm({ type: "user", id: u.id, name: u.name })}
                      className="text-red-600 bg-red-50 hover:bg-red-100 p-1.5 rounded-lg transition"><Trash2 size={13} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredUsers.length === 0 && <p className="text-center text-slate-400 py-10 text-sm">No users found.</p>}
      </div>
    </div>
  );

  const renderDrives = () => (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div><h1 className="text-2xl font-bold">All Drives</h1><p className="text-slate-500 text-sm">View all beach cleanup drives across the platform.</p></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          { label: "Total Drives", val: drives.length, icon: Waves, color: "text-emerald-600", bg: "bg-emerald-50" },
          { label: "Completed", val: completedDrives, icon: CheckCircle2, color: "text-indigo-600", bg: "bg-indigo-50" },
          {
  label: "Upcoming",
  val: upcomingDrives,
  icon: Bell,
  color: "text-amber-600",
  bg: "bg-amber-50",
},
        ].map(s => (
          <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.bg} ${s.color}`}><s.icon size={20} /></div>
            <p className="text-3xl font-black text-slate-900">{s.val}</p>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 mb-4">
        {(["All", "Completed", "Upcoming"] as const).map(f => (
          <button key={f} onClick={() => setDriveFilter(f as typeof driveFilter)}
            className={`px-4 py-2 rounded-xl text-sm font-bold transition ${driveFilter === f ? "bg-emerald-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{f}</button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
        <table className="w-full text-sm">
         <thead className="bg-slate-50 text-slate-600 text-left">
  <tr>
    <th className="p-4 text-xs font-bold uppercase tracking-wider">
      Location
    </th>

    <th className="p-4 text-xs font-bold uppercase tracking-wider">
      Date
    </th>

    {driveFilter !== "Upcoming" && (
      <>
        <th className="p-4 text-xs font-bold uppercase tracking-wider">
          Volunteers
        </th>

        <th className="p-4 text-xs font-bold uppercase tracking-wider">
          Hours
        </th>

        <th className="p-4 text-xs font-bold uppercase tracking-wider">
          Waste (kg)
        </th>
      </>
    )}
  </tr>
</thead>
          <tbody>
  {filteredDrives.map((d) => (
    <motion.tr
      key={d.id}
      layout
      className="border-t hover:bg-slate-50 transition"
    >
      <td className="p-4 font-semibold">
        <div className="flex items-center gap-2">
          <MapPin
            size={13}
            className="text-emerald-500 shrink-0"
          />
          {d.location}
        </div>
      </td>

      <td className="p-4 text-slate-500">
        {new Date(d.date).toLocaleDateString(
          "en-IN",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          }
        )}
      </td>

      {driveFilter !== "Upcoming" && (
        <>
          <td className="p-4">{d.volunteers}</td>
          <td className="p-4">{d.hours} hrs</td>
          <td className="p-4">{d.wasteKg} kg</td>
        </>
      )}
    </motion.tr>
  ))}
</tbody>
        </table>
        {filteredDrives.length === 0 && <p className="text-center text-slate-400 py-10 text-sm">No drives found.</p>}
      </div>
    </div>
  );
const handlePasswordUpdate = async () => {
  if (newPassword !== confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  console.log("Updating password...");
};
const renderSettings = () => (
  <div>
   <div className="mb-6">
  <h1 className="text-2xl font-bold">
    Settings
  </h1>

  <p className="text-slate-500 mt-1">
    Manage organisation information and security.
  </p>
</div>

<div className="flex gap-2 mb-6">
  <button
    onClick={() => setSettingsTab("profile")}
    className={`px-4 py-2 rounded-xl ${
      settingsTab === "profile"
        ? "bg-emerald-600 text-white"
        : "bg-white border"
    }`}
  >
    NGO Profile
  </button>

  <button
    onClick={() => setSettingsTab("security")}
    className={`px-4 py-2 rounded-xl ${
      settingsTab === "security"
        ? "bg-emerald-600 text-white"
        : "bg-white border"
    }`}
  >
    Security
  </button>
</div>
{settingsTab === "profile" && (
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Settings size={20} />
          </div>
          <h3 className="font-black text-slate-900">Organisation</h3>
        </div>

        <InputField
          label="Organisation Name"
          value={settings.orgName}
          onChange={(v) =>
            setSettings((p) => ({ ...p, orgName: v }))
          }
          placeholder="Volunteer Action Force"
        />

        <InputField
          label="Contact Email"
          type="email"
          value={settings.contactEmail}
          onChange={(v) =>
            setSettings((p) => ({ ...p, contactEmail: v }))
          }
        />

        </div>
        

      {/* Notifications */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
  <h3 className="font-black text-slate-900 mb-4">
    Platform Statistics
  </h3>

  <div className="space-y-4">
    <div className="flex justify-between">
      <span>Total Volunteers</span>
      <span className="font-bold">{users.length}</span>
    </div>

    <div className="flex justify-between">
      <span>Total Drives</span>
      <span className="font-bold">{drives.length}</span>
    </div>

    <div className="flex justify-between">
      <span>Total Admins</span>
      <span className="font-bold">{admins.length}</span>
    </div>

    <div className="flex justify-between">
  <span>Total Waste Collected</span>
  <span className="font-bold">{totalWaste} kg</span>
</div>
  </div>
</div>
</div>
)}
{  settingsTab === "security" && (
  <div className="bg-white rounded-3xl border border-slate-200 p-6">
    <h3 className="text-xl font-bold mb-6">
      Change Password
    </h3>

    <input
  type="password"
  placeholder="Current Password"
  value={currentPassword}
  onChange={(e) => setCurrentPassword(e.target.value)}
  className="w-full border rounded-xl p-3 mb-4"
/>

    <input
  type="password"
  placeholder="New Password"
  value={newPassword}
  onChange={(e) => setNewPassword(e.target.value)}
  className="w-full border rounded-xl p-3 mb-4"
/>

    <input
  type="password"
  placeholder="Confirm Password"
  value={confirmPassword}
  onChange={(e) => setConfirmPassword(e.target.value)}
  className="w-full border rounded-xl p-3 mb-4"
/>

<button
  onClick={handlePasswordUpdate}
  className="bg-emerald-600 text-white px-5 py-2 rounded-xl"
>      Update Password
    </button>
  </div>
)}

</div>
);
  const SECTION_COMPONENTS: Record<
    NavSection,
    React.ReactNode
  > = {
    overview: renderOverview(),
    admins: renderAdmins(),
    users: renderUsers(),
    drives: renderDrives(),
    settings: renderSettings(),
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Desktop Sidebar */}
      <SidebarContent />

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 xl:hidden"
              onClick={() =>
                setIsMobileMenuOpen(false)
              }
            />

            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{ type: "spring", damping: 28 }}
              className="fixed left-0 top-0 h-full bg-white z-50 xl:hidden"
            >
              <SidebarContent mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex-1 min-w-0">

        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-slate-200 px-4 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              className="xl:hidden p-2 rounded-xl hover:bg-slate-100"
              onClick={() =>
                setIsMobileMenuOpen(true)
              }
            >
              <Menu size={20} />
            </button>

            <div>
              <h1 className="text-xl font-black text-slate-900">
                {sectionTitle[active]}
              </h1>

              <p className="text-xs text-slate-400">
                Volunteer Action Force
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 rounded-xl hover:bg-slate-100 relative">
              <Bell size={18} />
              {pendingAttendance > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              )}
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 transition"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="p-4 lg:p-8">
          {SECTION_COMPONENTS[active]}
        </main>
      </div>

      {/* Toasts */}
      <Toaster position="top-right" />

      {/* Drawers */}
      <AdminDrawer
        admin={viewAdmin}
        onClose={() => setViewAdmin(null)}
      />

      <UserDrawer
        user={viewUser}
        onClose={() => setViewUser(null)}
      />

      {/* Confirm */}
      <ConfirmDialog
        open={!!confirm}
        message={`Delete ${confirm?.name}?`}
        onConfirm={confirmDelete}
        onCancel={() => setConfirm(null)}
      />

      {/* Add Admin Modal */}
      <Modal
        open={adminModal}
        onClose={() => setAdminModal(false)}
        title="Add Admin"
      >
        <InputField
          label="Name"
          value={adminForm.name}
          onChange={(v) =>
            setAdminForm((p) => ({
              ...p,
              name: v,
            }))
          }
        />

        <InputField
          label="Email"
          type="email"
          value={adminForm.email}
          onChange={(v) =>
            setAdminForm((p) => ({
              ...p,
              email: v,
            }))
          }
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={handleAddAdmin}
            disabled={submitting}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm"
          >
            {submitting ? "Creating..." : "Create Admin"}
          </button>
        </div>
      </Modal>

      {/* Add User Modal */}
      <Modal
        open={userModal}
        onClose={() => setUserModal(false)}
        title="Add Volunteer"
      >
        <InputField
          label="Name"
          value={userForm.name}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              name: v,
            }))
          }
        />

        <InputField
          label="Email"
          type="email"
          value={userForm.email}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              email: v,
            }))
          }
        />

        <InputField
          label="City"
          value={userForm.city}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              city: v,
            }))
          }
        />

        <InputField
          label="Password"
          type="password"
          value={userForm.password}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              password: v,
            }))
          }
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={handleAddUser}
            disabled={submitting}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm"
          >
            {submitting ? "Adding..." : "Add Volunteer"}
          </button>
        </div>
      </Modal>

      {/* Report Modal */}
      <Modal
        open={reportModal}
        onClose={() => setReportModal(false)}
        title="Generate Report"
      >
        <SelectField
          label="Report Type"
          value={reportForm.type}
          onChange={(v) =>
            setReportForm({
              type: v as ReportType,
            })
          }
          options={[
            {
              value: "Monthly",
              label: "Monthly",
            },
            {
              value: "Quarterly",
              label: "Quarterly",
            },
            {
              value: "Annual",
              label: "Annual",
            },
          ]}
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={generateReport}
            disabled={submitting}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm"
          >
            {submitting
              ? "Generating..."
              : "Generate"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
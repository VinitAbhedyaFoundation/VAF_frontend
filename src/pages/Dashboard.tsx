"use client";

import React, { useEffect, useMemo, useState, useCallback } from "react";
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
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AnimatePresence } from 'framer-motion';

// ─── AXIOS INSTANCE ──────────────────────────────────────────────────────────

const baseURL = import.meta.env.VITE_API_URL;

if (!baseURL) {
  throw new Error("API URL not configured");
}

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

// Attach auth token from localStorage if present
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ─── TYPES ──────────────────────────────────────────────────────────────────

type SectionId = "overview" | "drives" | "attendance" | "volunteers" | "messages" | "settings";

interface NavItem { label: string; icon: React.ElementType; id: SectionId; badge?: string; }

interface DashboardStats {
  totalDrives: number;
  totalHours: number;
  wasteCollected: number;
  totalVolunteers: number;
  chartData: { name: string; waste: number; volunteers: number }[];
}


interface Drive {
  id: number;
  date: string;
  totalHours: number;
  expiryDate: string;

  location?: string;

  driveLocation?: {
    location: string;
  };
}

interface AttendanceRecord {
  id: number;
  user: {
    name: string;
    email: string;
  };
  drive: {
    date: string;
  };
  hours: number;
  createdAt: string;
  status?: "Marked" | "Pending";
}

interface Volunteer {
  id: number;
  name: string;
  email: string;
  drives: number;
  status: "Approved" | "Pending";
  city: string;
  age: number;
  joined: string;
  isNew: boolean;
}

interface MessageItem {
  id: number;
  title: string;
  content: string;
  date: string;
  status: "Sent",
  recipients: number;
}

interface ApiMessage {
  id: number;
  subject?: string;
  title?: string;
  content?: string;
  createdAt?: string;
  recipients?: number;
}

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
    case "Active": case "Approved": case "Marked": case "Sent": return "bg-green-100 text-green-700";
    case "Upcoming": return "bg-blue-100 text-blue-700";
    case "Pending": case "Draft": return "bg-orange-100 text-orange-700";
    case "Completed": return "bg-slate-100 text-slate-600";
    default: return "bg-slate-100 text-slate-600";
  }
};

const getRankColor = (r: number) =>
  r === 1 ? "text-yellow-400" : r === 2 ? "text-gray-300" : r === 3 ? "text-orange-400" : "text-white";

// ─── LOADING SPINNER ─────────────────────────────────────────────────────────

const Spinner: React.FC<{ size?: number }> = ({ size = 20 }) => (
  <Loader2 size={size} className="animate-spin text-emerald-600" />
);

const SectionLoader: React.FC = () => (
  <div className="flex items-center justify-center py-20">
    <Spinner size={32} />
  </div>
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
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h2 className="text-lg font-black text-slate-900">{title}</h2>
              <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full transition"><X size={18} /></button>
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
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition" />
    </div>
  );

const SelectField: React.FC<{ label: string; value: string; onChange: (v: string) => void; options: string[] }> =
  ({ label, value, onChange, options }) => (
    <div className="mb-4">
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition">
        <option value="">Select…</option>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
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
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
              <h3 className="font-black text-slate-900">Volunteer Profile</h3>
              <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded-full"><X size={18} /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center text-white text-3xl font-black mb-3">
                  {volunteer.name[0]}
                </div>
                <h2 className="text-xl font-black">{volunteer.name}</h2>
                <p className="text-sm text-slate-500">{volunteer.email}</p>
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
                  <div key={item.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">{item.icon} {item.label}</p>
                    <p className="font-black text-slate-900">{item.val}</p>
                  </div>
                ))}
              </div>
              {volunteer.status === "Pending" && (
                <button onClick={() => onApprove(volunteer)}
                  className="w-full bg-emerald-600 text-white py-3 rounded-xl font-bold hover:bg-emerald-700 transition">
                  ✓ Approve Volunteer
                </button>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────

export default function AdvancedDashboard() {
  const [appLoading, setAppLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<SectionId>("overview");
  const navigate = useNavigate();

  // ── Data state ──
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [leaderboard, setLeaderboard] = useState<{ name: string; kg: number; drives: number; rank: number }[]>([]);
  const [drives, setDrives] = useState<Drive[]>([]);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
  const [messages, setMessages] = useState<MessageItem[]>([]);

  // ── Section loading states ──
  const [loadingDrives, setLoadingDrives] = useState(false);
  const [loadingAttendance, setLoadingAttendance] = useState(false);
  const [loadingVolunteers, setLoadingVolunteers] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ── Modal states ──
  const [showDriveModal, setShowDriveModal] = useState(false);
  const [showAttendanceModal, setShowAttendanceModal] = useState(false);
  const [showVolunteerModal, setShowVolunteerModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(null);
  const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(null);

  // ── Form states ──
  const [driveForm, setDriveForm] = useState({ date: "", locationId: "", totalHours: "", expiryDate: "" });
  const [attendanceForm, setAttendanceForm] = useState({ name: "", email: "", drive: "", hours: "" });
  const [volunteerForm, setVolunteerForm] = useState({ name: "", email: "", city: "", age: "", password: "" });
  const [messageForm, setMessageForm] = useState({ title: "", content: "" });

  // ── Search / filter ──
  const [volunteerSearch, setVolunteerSearch] = useState("");
  const [volunteerFilter, setVolunteerFilter] = useState<"All" | "New" | "Recurring" | "Pending">("All");

  // ─── FETCH HELPERS ────────────────────────────────────────────────────────

  const fetchDashboardStats = useCallback(async () => {
    try {
      const res = await API.get("/admin/dashboard-stats");
      setDashboardStats(res.data);
      setLeaderboard((res.data.leaderboard ?? []).map((u: any, i: number) => ({ ...u, rank: i + 1 })));
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load dashboard stats");
    }
  }, []);

  const fetchDrives = useCallback(async () => {
    setLoadingDrives(true);
    try {
      const res = await API.get("/drive/alldrives", { params: { page: 1, limit: 50 } });
      setDrives(res.data.drives ?? res.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load drives");
    } finally {
      setLoadingDrives(false);
    }
  }, []);

  const fetchAttendance = useCallback(async () => {
    setLoadingAttendance(true);
    try {
      const res = await API.get("/attendance/all");
      setAttendance(res.data.records ?? res.data);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load attendance");
    } finally {
      setLoadingAttendance(false);
    }
  }, []);

  const fetchVolunteers = useCallback(async () => {
    setLoadingVolunteers(true);
    try {
      const res = await API.get("/user/all");
      const data = res.data.users ?? res.data;

      const mapped = data.map((v: any) => ({
        id: v.id,
        name: v.name,
        email: v.email,
        city: v.city ?? "Unknown",
        age: v.age ?? 0,
        drives: v.drives ?? 0,
        status: v.status ?? "Pending",
        joined: new Date(v.createdAt).toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
        isNew: v.isNew ?? false,
      }));

      setVolunteers(mapped);

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load volunteers");
    } finally {
      setLoadingVolunteers(false);
    }
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
        date: msg.createdAt
          ? new Date(msg.createdAt).toLocaleDateString()
          : new Date().toLocaleDateString(),
        status: "Sent",
        recipients: msg.recipients ?? 0,
      }));

      setMessages(mapped);

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to load messages");
    } finally {
      setLoadingMessages(false);
    }
  }, []);

  // ─── INITIAL LOAD ─────────────────────────────────────────────────────────

  useEffect(() => {
    const init = async () => {
      await fetchDashboardStats();
      setAppLoading(false);
    };
    init();
  }, [fetchDashboardStats]);

  // Fetch section data when navigating to it
  useEffect(() => {
    if (activeNav === "drives") fetchDrives();

    if (activeNav === "attendance") {
      fetchAttendance();
      if (drives.length === 0) fetchDrives();
    }

    if (activeNav === "volunteers") fetchVolunteers();
    if (activeNav === "messages") fetchMessages();
  }, [
    activeNav,
    drives.length,
    fetchDrives,
    fetchAttendance,
    fetchVolunteers,
    fetchMessages
  ]);

  // ─── NAV ─────────────────────────────────────────────────────────────────

  const goTo = (section: SectionId) => { setActiveNav(section); setIsMobileMenuOpen(false); };
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out");
    setTimeout(() => navigate("/login"), 600);
  };

  // ─── COMPUTED METRICS ─────────────────────────────────────────────────────

  const METRICS = dashboardStats ? [
    { id: "m1", label: "Drives Conducted", value: dashboardStats.totalDrives, icon: Calendar, trend: "+12%", color: "text-emerald-600", bgLight: "bg-emerald-50" },
    { id: "m2", label: "Volunteer Hours", value: dashboardStats.totalHours, icon: Clock, trend: "+5.4%", color: "text-blue-600", bgLight: "bg-blue-50" },
    { id: "m3", label: "Waste Collected (kg)", value: dashboardStats.wasteCollected, icon: Droplets, trend: "+18.2%", color: "text-purple-600", bgLight: "bg-purple-50" },
    { id: "m4", label: "Active Volunteers", value: dashboardStats.totalVolunteers, icon: TrendingUp, trend: "+8%", color: "text-orange-600", bgLight: "bg-orange-50" },
  ] : [];

  const chartData = dashboardStats?.chartData ?? [];

  // ─── VOLUNTEER COMPUTED ───────────────────────────────────────────────────

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

  // ─── HANDLERS ────────────────────────────────────────────────────────────

  const handleCreateDrive = async () => {
    if (!driveForm.date || !driveForm.locationId || !driveForm.totalHours || !driveForm.expiryDate) {
      toast.error("Fill all required fields"); return;
    }
    setSubmitting(true);
    try {
      const locationId = Number(driveForm.locationId);

      if (!locationId) {
        toast.error("Invalid location ID");
        setSubmitting(false);
        return;
      }

      const res = await API.post("/drive/newdrive", {
        date: new Date(driveForm.date).toISOString(),
        locationId: locationId,
        totalHours: Number(driveForm.totalHours),
        expiryDate: new Date(driveForm.expiryDate).toISOString(),
      });
      setDrives(prev => [res.data.drive ?? res.data, ...prev]);
      setShowDriveModal(false);
      setDriveForm({ date: "", locationId: "", totalHours: "", expiryDate: "" });
      toast.success("Drive created 🚀");
      fetchDashboardStats();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to create drive");
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkAttendance = async () => {
    // 🔴 Basic validation
    if (!attendanceForm.name || !attendanceForm.hours || !attendanceForm.drive) {
      toast.error("Name, hours and drive are required");
      return;
    }

    setSubmitting(true);

    try {
      // 🔍 Find selected drive
      const selectedDrive = drives.find(
        (d) => d.id === Number(attendanceForm.drive)
      );

      if (!selectedDrive || !selectedDrive.id) {
        toast.error("Invalid drive selected");
        setSubmitting(false);
        return;
      }

      // 📡 API call
      const res = await API.post("/user/attendance", {
        driveId: selectedDrive.id,
        name: attendanceForm.name,
        email: attendanceForm.email,
        hours: Number(attendanceForm.hours),
      });

      // 🧠 Safe mapping (don’t trust backend blindly)
      const raw = res.data.record ?? res.data;

      const safeRecord: AttendanceRecord = {
        id: raw.id,
        user: {
          name: raw.user?.name ?? attendanceForm.name,
          email: raw.user?.email ?? attendanceForm.email,
        },
        drive: {
          date: raw.drive?.date ?? selectedDrive.date,
        },
        hours: raw.hours ?? Number(attendanceForm.hours),
        createdAt: raw.createdAt ?? new Date().toISOString(),
        status: raw.status ?? "Marked",
      };

      setAttendance((prev) => [safeRecord, ...prev]);

      // 🧹 Reset form
      setAttendanceForm({
        name: "",
        email: "",
        drive: "",
        hours: "",
      });

      setShowAttendanceModal(false);

      toast.success("Attendance marked ✅");

      // 🔄 Refresh stats
      fetchDashboardStats();

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to mark attendance");
    } finally {
      setSubmitting(false);
    }
  };

  const handleAddVolunteer = async () => {
    if (!volunteerForm.name || !volunteerForm.email || !volunteerForm.city) {
      toast.error("Fill all required fields"); return;
    }
    setSubmitting(true);
    try {
      const res = await API.post("/auth/register", {
        name: volunteerForm.name,
        email: volunteerForm.email,
        city: volunteerForm.city,
        age: parseInt(volunteerForm.age) || 0,
        password: volunteerForm.password || "Volunteer@123",
      });
      const newVol: Volunteer = res.data.user ?? {
        id: res.data?.user?.id || Date.now(), // ✅ force number
        name: volunteerForm.name,
        email: volunteerForm.email,
        drives: 0,
        status: "Pending",
        city: volunteerForm.city,
        age: parseInt(volunteerForm.age) || 0,
        joined: new Date().toLocaleDateString("en-IN", { month: "short", year: "numeric" }),
        isNew: true,
      };
      setVolunteers(prev => [...prev, newVol]);
      setShowVolunteerModal(false);
      setVolunteerForm({ name: "", email: "", city: "", age: "", password: "" });
      toast.success(`${volunteerForm.name} added as volunteer 👤`);
      fetchDashboardStats();
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to add volunteer");
    } finally {
      setSubmitting(false);
    }
  };

  const handleApproveVolunteer = async (vol: Volunteer) => {
    try {
      await API.patch(`/user/approve/${vol.id}`);
      setVolunteers(prev => prev.map(v => (v.id === vol.id) ? { ...v, status: "Approved" as const } : v));
      setSelectedVolunteer(null);
      toast.success(`${vol.name} approved ✅`);
    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to approve volunteer");
    }
  };


  const handleSendMessage = async () => {
    if (!messageForm.title || !messageForm.content) {
      toast.error("Fill all fields");
      return;
    }

    setSubmitting(true);


    try {
      let user = null;
      try {
        user = JSON.parse(localStorage.getItem("user") || "{}");
      } catch {
        user = null;
      }

      if (!user?.id) {
        toast.error("User not logged in");
        setSubmitting(false);
        return;
      }

      const res = await API.post("/message/send", {
        subject: messageForm.title,
        content: messageForm.content,
        senderId: user.id, // ✅ dynamic sender
      });

      const msg = res.data.message ?? res.data;

      const newMsg: MessageItem = {
        id: msg.id,
        title: msg.subject ?? msg.title ?? "Untitled",
        content: msg.content,
        date: new Date(msg.createdAt).toLocaleDateString(),
        status: "Sent",
        recipients: msg.recipients ?? 0,
      };

      setMessages(prev => [newMsg, ...prev]);

      setShowMessageModal(false);
      setMessageForm({ title: "", content: "" });

      toast.success("Message sent 📧");

    } catch (err: any) {
      toast.error(err?.response?.data?.message || "Failed to send message");
    } finally {
      setSubmitting(false);
    }
  };

  const sectionTitle: Record<SectionId, string> = {
    overview: "Dashboard Overview", drives: "Drives", attendance: "Attendance",
    volunteers: "Volunteers", messages: "Messages", settings: "Settings",
  };

  // ── SIDEBAR ──────────────────────────────────────────────────────────────────

  const pendingBadge = pendingVolunteers > 0 ? `${pendingVolunteers} Pending` : undefined;

  const Sidebar = ({ mobile = false }) => (
    <div className={`flex flex-col ${mobile ? "p-8 w-80" : "w-80 border-r border-slate-200 bg-white p-8 hidden xl:flex sticky top-0 h-screen"}`}>
      <div className="flex items-center gap-2 mb-12">
        <div className="w-10 h-10 bg-emerald-600 rounded-xl rotate-12 flex items-center justify-center shadow-lg shadow-emerald-200">
          <Leaf className="text-white -rotate-12" size={20} />
        </div>
        <div>
          <h2 className="text-2xl font-black tracking-tighter text-emerald-950">VAF</h2>
          <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest -mt-1">Portal</p>
        </div>
      </div>
      <nav className="space-y-2 flex-1">
        {NAV_ITEMS.map(item => {
          const badge = item.id === "volunteers" ? pendingBadge : undefined;
          return (
            <button key={item.id} onClick={() => goTo(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeNav === item.id ? "bg-emerald-900 text-white shadow-xl shadow-emerald-200" : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"}`}>
              <div className="flex items-center gap-3"><item.icon size={20} />{item.label}</div>
              {badge && <span className="text-[10px] opacity-60">{badge}</span>}
            </button>
          );
        })}
      </nav>
      <div className="bg-slate-950 p-6 rounded-[2rem] text-white relative overflow-hidden mt-auto">
        <div className="absolute -right-4 -bottom-4 text-emerald-500/20 rotate-45"><Leaf size={120} /></div>
        <div className="relative z-10">
          <p className="text-[10px] font-bold text-emerald-400 uppercase mb-2">Next Milestone</p>
          <h4 className="text-lg font-bold mb-4">Platinum Status</h4>
          <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
            <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} className="h-full bg-emerald-400" />
          </div>
          <p className="text-[10px] mt-3 text-slate-400 font-medium">14/20 Sundays Completed</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans overflow-hidden">
      <Toaster position="bottom-center" toastOptions={{ duration: 2500 }} />

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)} className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 xl:hidden" />
            <motion.div initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full bg-white z-50 xl:hidden shadow-2xl">
              <div className="flex justify-end p-4"><button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full"><X size={20} /></button></div>
              <Sidebar mobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-12 flex-shrink-0 z-30">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden p-2 hover:bg-slate-100 rounded-full"><Menu size={20} className="text-slate-600" /></button>
            <div>
              <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em]">Volunteer Admin</p>
              <h1 className="text-xl lg:text-2xl font-black tracking-tight">{sectionTitle[activeNav]}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => { setShowAttendanceModal(true); }}
              className="hidden sm:flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
              <Plus size={18} /> Quick Attendance
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1" />
            <button onClick={() => goTo("messages")} className="relative p-2 hover:bg-slate-100 rounded-full transition">
              <Bell size={20} className="text-slate-600" />
            </button>
            <button onClick={() => goTo("settings")} className="p-2 hover:bg-slate-100 rounded-full transition"><Settings size={20} className="text-slate-600" /></button>
            <button onClick={handleLogout} className="p-2 hover:bg-slate-100 rounded-full transition"><LogOut size={20} className="text-slate-600" /></button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 lg:p-10">

          {/* ── OVERVIEW ─────────────────────────────────────────────────────── */}
          {activeNav === "overview" && (
            <>
              <div className="mb-8">
                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1">Track drive performance, volunteer engagement, and impact metrics.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
                {appLoading
                  ? Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm animate-pulse h-36" />
                  ))
                  : METRICS.map(m => (
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
                  ))
                }
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-96">
                  <h3 className="text-xl font-black mb-1">Weekly Velocity</h3>
                  <p className="text-sm text-slate-400 mb-6">Waste collection vs Volunteers</p>
                  {appLoading ? (
                    <div className="flex items-center justify-center h-64"><Spinner size={28} /></div>
                  ) : (
                    <ResponsiveContainer width="100%" height="80%">
                      <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="gWaste" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.2} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
                          <linearGradient id="gVol" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} /><stop offset="95%" stopColor="#6366f1" stopOpacity={0} /></linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                        <Tooltip contentStyle={{ borderRadius: 16, border: "none", padding: 16, boxShadow: "0 10px 30px -5px rgba(0,0,0,0.1)" }} />
                        <Area type="monotone" dataKey="waste" name="Waste (kg)" stroke="#10b981" strokeWidth={3} fill="url(#gWaste)" />
                        <Area type="monotone" dataKey="volunteers" name="Volunteers" stroke="#6366f1" strokeWidth={3} fill="url(#gVol)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </div>
                <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
                  <h3 className="text-xl font-black mb-1 relative z-10">Leaderboard</h3>
                  <p className="text-slate-400 text-xs uppercase tracking-widest mb-6 relative z-10">Top Contributors</p>
                  {appLoading ? (
                    <div className="flex items-center justify-center py-8"><Spinner /></div>
                  ) : (
                    <div className="space-y-3 relative z-10">
                      {leaderboard.map(u => (
                        <div key={u.name} className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition">
                          <div className="flex items-center gap-3">
                            <span className={`text-lg font-black ${getRankColor(u.rank)}`}>#{u.rank}</span>
                            <div><p className="font-bold text-sm">{u.name}</p><p className="text-xs text-slate-400">{u.drives} Drives</p></div>
                          </div>
                          <div className="text-right"><p className="font-black">{u.kg} kg</p><p className="text-xs text-slate-500">Collected</p></div>
                        </div>
                      ))}
                      {leaderboard.length === 0 && <p className="text-slate-500 text-sm text-center py-4">No data yet.</p>}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* ── DRIVES ───────────────────────────────────────────────────────── */}
          {activeNav === "drives" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div><h1 className="text-2xl font-bold">Drives</h1><p className="text-slate-500 text-sm">Manage and track all cleanup drives.</p></div>
                <button onClick={() => setShowDriveModal(true)} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center gap-2"><Plus size={16} /> Create Drive</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { label: "Total Drives", val: drives.length },
                  { label: "Upcoming", val: drives.filter(d => new Date(d.expiryDate) > new Date()).length },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{s.label}</p>
                    <p className="text-3xl font-black text-slate-900">{s.val}</p>
                  </div>
                ))}
              </div>
              {loadingDrives ? <SectionLoader /> : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {drives.map(drive => (
                    <motion.div key={drive.id} layout className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
                      <div className="mb-4">
                        <h2 className="font-bold text-lg text-slate-900">
                          Drive — {new Date(drive.date).toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })}
                        </h2>
                        <div className="mt-3 space-y-1.5">
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <MapPin size={14} className="text-emerald-500 shrink-0" />
                            {drive.location ?? "Unknown Location"}
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Clock size={14} className="text-blue-500 shrink-0" />
                            {drive.totalHours} hrs planned
                          </p>
                          <p className="text-sm text-gray-500 flex items-center gap-2">
                            <Calendar size={14} className="text-orange-500 shrink-0" />
                            Expires {new Date(drive.expiryDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                          </p>
                        </div>
                      </div>
                      <div className="pt-3 border-t border-slate-100">
                        <button
                          onClick={() => toast.success(`Viewing drive on ${new Date(drive.date).toLocaleDateString()}`)}
                          className="text-emerald-600 text-sm font-semibold inline-flex items-center gap-1 hover:text-emerald-700"
                        >
                          View Details <ChevronRight size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                  {drives.length === 0 && <p className="col-span-3 text-center text-slate-400 py-10">No drives found. Create one!</p>}
                </div>
              )}
            </div>
          )}

          {/* ── ATTENDANCE ───────────────────────────────────────────────────── */}
          {activeNav === "attendance" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div><h1 className="text-2xl font-bold">Attendance</h1><p className="text-slate-500 text-sm">Mark and track volunteer attendance across drives.</p></div>
                <button onClick={() => setShowAttendanceModal(true)} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center gap-2"><Plus size={16} /> Mark Attendance</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Total Records", val: attendance.length, icon: "📋" },
                  { label: "Marked", val: attendance.length, icon: "✅" },
                  { label: "Pending", val: 0, icon: "⏳" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <p className="text-2xl mb-1">{s.icon}</p>
                    <p className="text-3xl font-black text-slate-900">{s.val}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
              {loadingAttendance ? <SectionLoader /> : (
                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-slate-50 text-slate-600 text-left">
                      <tr>{["Volunteer", "Email", "Drive", "Hours", "Date", "Status", "Action"].map(h => <th key={h} className="p-4 text-xs font-bold uppercase tracking-wider">{h}</th>)}</tr>
                    </thead>
                    <tbody>
                      {attendance.map(item => (
                        <tr key={item.id} className="border-t hover:bg-slate-50 transition">

                          <td className="p-4 font-semibold">{item.user?.name}</td>

                          <td className="p-4 text-slate-400 text-xs">{item.user?.email}</td>

                          <td className="p-4">
                            {item.drive
                              ? new Date(item.drive.date).toLocaleDateString("en-IN", {
                                weekday: "short",
                                day: "numeric",
                                month: "short",
                              })
                              : "-"}
                          </td>

                          <td className="p-4">{item.hours} hrs</td>

                          <td className="p-4 text-slate-400">
                            {item.createdAt
                              ? new Date(item.createdAt).toLocaleDateString("en-IN")
                              : "-"}
                          </td>

                          <td className="p-4">
                            <span className="text-xs px-2 py-1 rounded-full font-medium bg-green-100 text-green-700">
                              {item.status ?? "Marked"}
                            </span>
                          </td>

                          <td className="p-4">
                            <span className="text-slate-400 text-xs">Done</span>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {attendance.length === 0 && <p className="text-center text-slate-400 py-8 text-sm">No attendance records yet.</p>}
                </div>
              )}
            </div>
          )}

          {/* ── VOLUNTEERS ───────────────────────────────────────────────────── */}
          {activeNav === "volunteers" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div><h1 className="text-2xl font-bold">Volunteers</h1><p className="text-slate-500 text-sm">Manage your volunteer community.</p></div>
                <button onClick={() => setShowVolunteerModal(true)} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center gap-2"><Plus size={16} /> Add Volunteer</button>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Total", val: volunteers.length, icon: Users, color: "bg-slate-50 text-slate-600" },
                  { label: "New Members", val: newVolunteers, icon: Plus, color: "bg-purple-50 text-purple-600" },
                  { label: "Recurring", val: recurringVolunteers, icon: RefreshCw, color: "bg-emerald-50 text-emerald-600" },
                  { label: "Pending Approval", val: pendingVolunteers, icon: Clock, color: "bg-orange-50 text-orange-600" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}><s.icon size={20} /></div>
                    <p className="text-3xl font-black text-slate-900">{s.val}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{s.label}</p>
                  </div>
                ))}
              </div>

              {loadingVolunteers ? <SectionLoader /> : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                      <h3 className="font-black text-slate-900 mb-4">📍 City Distribution</h3>
                      <div className="flex items-center gap-4">
                        <ResponsiveContainer width="50%" height={180}>
                          <PieChart>
                            <Pie data={cityData} cx="50%" cy="50%" outerRadius={70} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={11}>
                              {cityData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                        <div className="space-y-2">
                          {cityData.map((d, i) => (
                            <div key={d.name} className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full" style={{ background: PIE_COLORS[i % PIE_COLORS.length] }} />
                              <span className="text-sm text-slate-600 font-medium">{d.name} — {d.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
                      <h3 className="font-black text-slate-900 mb-4">🎂 Age Demographics</h3>
                      <ResponsiveContainer width="100%" height={180}>
                        <BarChart data={ageData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                          <XAxis dataKey="range" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                          <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
                          <Bar dataKey="count" name="Volunteers" fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 mb-4">
                    <div className="relative flex-1">
                      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input value={volunteerSearch} onChange={e => setVolunteerSearch(e.target.value)} placeholder="Search volunteers..."
                        className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400" />
                    </div>
                    <div className="flex gap-2">
                      {(["All", "New", "Recurring", "Pending"] as const).map(f => (
                        <button key={f} onClick={() => setVolunteerFilter(f)}
                          className={`px-4 py-2 rounded-xl text-sm font-bold transition ${volunteerFilter === f ? "bg-emerald-600 text-white" : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"}`}>{f}</button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-50 text-slate-600 text-left">
                        <tr>{["Name", "Email", "City", "Drives", "Status", "Type", "Action"].map(h => <th key={h} className="p-4 text-xs font-bold uppercase tracking-wider">{h}</th>)}</tr>
                      </thead>
                      <tbody>
                        {filteredVolunteers.map(v => (
                          <tr key={v.id} className="border-t hover:bg-slate-50 transition cursor-pointer" onClick={() => setSelectedVolunteer(v)}>
                            <td className="p-4 font-semibold">{v.name}</td>
                            <td className="p-4 text-slate-400 text-xs">{v.email}</td>
                            <td className="p-4 text-slate-500">{v.city}</td>
                            <td className="p-4">{v.drives}</td>
                            <td className="p-4"><span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(v.status)}`}>{v.status}</span></td>
                            <td className="p-4">
                              {v.isNew ? <span className="text-xs px-2 py-1 bg-purple-100 text-purple-700 rounded-full font-bold">New</span>
                                : <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-bold">Recurring</span>}
                            </td>
                            <td className="p-4" onClick={e => e.stopPropagation()}>
                              {v.status === "Pending" ? (
                                <button onClick={() => handleApproveVolunteer(v)} className="text-emerald-600 font-semibold text-sm hover:text-emerald-700">Approve</button>
                              ) : (
                                <button onClick={() => setSelectedVolunteer(v)} className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1"><Eye size={14} /> View</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {filteredVolunteers.length === 0 && <p className="text-center text-slate-400 py-8 text-sm">No volunteers found.</p>}
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── MESSAGES ─────────────────────────────────────────────────────── */}
          {activeNav === "messages" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div><h1 className="text-2xl font-bold">Messages</h1><p className="text-slate-500 text-sm">Compose and send messages to your volunteers via email.</p></div>
                <button onClick={() => setShowMessageModal(true)} className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center gap-2"><Send size={16} /> New Message</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {[
                  { label: "Sent", val: messages.filter(m => m.status === "Sent").length, icon: "✉️" },
                  { label: "Total Reach", val: messages.filter(m => m.status === "Sent").reduce((sum, m) => sum + m.recipients, 0), icon: "👥" },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
                    <p className="text-2xl mb-1">{s.icon}</p>
                    <p className="text-3xl font-black">{s.val}</p>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{s.label}</p>
                  </div>
                ))}
              </div>
              {loadingMessages ? <SectionLoader /> : (
                <div className="space-y-4">
                  {messages.map(msg => (
                    <div key={msg.id} className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h2 className="font-bold text-lg">{msg.title}</h2>
                          {msg.status === "Sent" && <p className="text-xs text-slate-400">
                            Sent to all volunteers
                          </p>}
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(msg.status)}`}>{msg.status}</span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{msg.content}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">{msg.date}</span>
                        <button onClick={() => setSelectedMessage(msg)} className="text-emerald-600 text-sm font-semibold inline-flex items-center gap-1 hover:text-emerald-700">View <ChevronRight size={16} /></button>
                      </div>
                    </div>
                  ))}
                  {messages.length === 0 && <p className="text-center text-slate-400 py-10 text-sm">No messages yet. Send your first one!</p>}
                </div>
              )}
            </div>
          )}

          {/* ── SETTINGS ─────────────────────────────────────────────────────── */}
          {activeNav === "settings" && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Settings</h1>
                <p className="text-slate-500 mt-1">Manage account access and platform preferences.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {[
                  { title: "Portal Preferences", desc: "Notification routing, default sections, and action shortcuts.", icon: Settings, color: "bg-emerald-50 text-emerald-600" },
                  { title: "Notification Center", desc: "Review message alerts and routing flows from the Messages section.", icon: Bell, color: "bg-blue-50 text-blue-600" },
                  { title: "Milestones & Access", desc: "Track account achievements and coordinator privileges.", icon: Award, color: "bg-orange-50 text-orange-600" },
                ].map(s => (
                  <div key={s.title} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${s.color}`}><s.icon size={22} /></div>
                    <h2 className="text-lg font-black mb-2">{s.title}</h2>
                    <p className="text-sm text-slate-500">{s.desc}</p>
                  </div>
                ))}
              </div>
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div><h3 className="text-lg font-black">Account Actions</h3><p className="text-sm text-slate-500 mt-1">Jump to dashboard or exit the portal.</p></div>
                  <div className="flex gap-3">
                    <button onClick={() => goTo("overview")} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition">Back to Dashboard</button>
                    <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition">Logout</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── MODALS ─────────────────────────────────────────────────────────── */}

      {/* Create Drive Modal */}
      <Modal open={showDriveModal} onClose={() => setShowDriveModal(false)} title="Create New Drive">
        <InputField label="Date & Time *" type="datetime-local" value={driveForm.date} onChange={v => setDriveForm(p => ({ ...p, date: v }))} />
        <InputField label="Location ID *" type="number" value={driveForm.locationId} onChange={v => setDriveForm(p => ({ ...p, locationId: v }))} placeholder="e.g. 3" />
        <InputField label="Total Hours *" type="number" value={driveForm.totalHours} onChange={v => setDriveForm(p => ({ ...p, totalHours: v }))} placeholder="e.g. 3" />
        <InputField label="Expiry Date *" type="datetime-local" value={driveForm.expiryDate} onChange={v => setDriveForm(p => ({ ...p, expiryDate: v }))} />
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => setShowDriveModal(false)} className="px-4 py-2 text-sm bg-slate-100 rounded-xl font-semibold">Cancel</button>
          <button onClick={handleCreateDrive} disabled={submitting}
            className="px-5 py-2 text-sm bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition flex items-center gap-2 disabled:opacity-60">
            {submitting ? <Spinner size={16} /> : null} Create Drive 🚀
          </button>
        </div>
      </Modal>

      {/* Mark Attendance Modal */}
      <Modal open={showAttendanceModal} onClose={() => setShowAttendanceModal(false)} title="Mark Attendance">
        <InputField label="Volunteer Name *" value={attendanceForm.name} onChange={v => setAttendanceForm(p => ({ ...p, name: v }))} placeholder="e.g. Mayuresh" />
        <InputField label="Email" value={attendanceForm.email} onChange={v => setAttendanceForm(p => ({ ...p, email: v }))} placeholder="volunteer@gmail.com" />
        <SelectField label="Drive *" value={attendanceForm.drive} onChange={v => setAttendanceForm(p => ({ ...p, drive: v }))} options={drives.map(d => String(d.id))} />
        <InputField label="Hours Volunteered *" type="number" value={attendanceForm.hours} onChange={v => setAttendanceForm(p => ({ ...p, hours: v }))} placeholder="e.g. 2.5" />
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => setShowAttendanceModal(false)} className="px-4 py-2 text-sm bg-slate-100 rounded-xl font-semibold">Cancel</button>
          <button onClick={handleMarkAttendance} disabled={submitting}
            className="px-5 py-2 text-sm bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition flex items-center gap-2 disabled:opacity-60">
            {submitting ? <Spinner size={16} /> : null} Mark Attendance ✅
          </button>
        </div>
      </Modal>

      {/* Add Volunteer Modal */}
      <Modal open={showVolunteerModal} onClose={() => setShowVolunteerModal(false)} title="Add New Volunteer">
        <InputField label="Full Name *" value={volunteerForm.name} onChange={v => setVolunteerForm(p => ({ ...p, name: v }))} placeholder="e.g. Priya Sharma" />
        <InputField label="Email *" type="email" value={volunteerForm.email} onChange={v => setVolunteerForm(p => ({ ...p, email: v }))} placeholder="priya@gmail.com" />
        <InputField label="City *" value={volunteerForm.city} onChange={v => setVolunteerForm(p => ({ ...p, city: v }))} placeholder="e.g. Pune" />
        <InputField label="Age" type="number" value={volunteerForm.age} onChange={v => setVolunteerForm(p => ({ ...p, age: v }))} placeholder="e.g. 23" />
        <InputField label="Temporary Password" type="password" value={volunteerForm.password} onChange={v => setVolunteerForm(p => ({ ...p, password: v }))} placeholder="Default: Volunteer@123" />
        <p className="text-xs text-slate-400 mb-4 bg-slate-50 rounded-xl p-3">New volunteer will be added as <strong>Pending</strong> and must be approved before they can participate.</p>
        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => setShowVolunteerModal(false)} className="px-4 py-2 text-sm bg-slate-100 rounded-xl font-semibold">Cancel</button>
          <button onClick={handleAddVolunteer} disabled={submitting}
            className="px-5 py-2 text-sm bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition flex items-center gap-2 disabled:opacity-60">
            {submitting ? <Spinner size={16} /> : null} Add Volunteer 👤
          </button>
        </div>
      </Modal>

      {/* Compose Message Modal */}
      <Modal open={showMessageModal} onClose={() => setShowMessageModal(false)} title="Compose Message">
        <div className="bg-emerald-50 rounded-xl p-3 mb-4 text-sm text-emerald-700 font-medium">
          📧 Message will be sent to <strong>{volunteers.filter(v => v.status === "Approved").length} approved volunteers</strong> via email.
        </div>
        <InputField label="Subject / Title *" value={messageForm.title} onChange={v => setMessageForm(p => ({ ...p, title: v }))} placeholder="e.g. Sunday Drive Reminder" />
        <div className="mb-4">
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-1.5">Message Content *</label>
          <textarea value={messageForm.content} onChange={e => setMessageForm(p => ({ ...p, content: e.target.value }))} placeholder="Write your message here..."
            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition h-28 resize-none" />
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={() => setShowMessageModal(false)} className="px-4 py-2 text-sm bg-slate-100 rounded-xl font-semibold">Cancel</button>
          <button onClick={handleSendMessage} disabled={submitting}
            className="px-5 py-2 text-sm bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition flex items-center gap-2 disabled:opacity-60">
            {submitting ? <Spinner size={16} /> : <Send size={14} />}
            Send Message
          </button>
        </div>
      </Modal>

      {/* Message Detail Modal */}
      <Modal open={!!selectedMessage} onClose={() => setSelectedMessage(null)} title={selectedMessage?.title ?? ""}>
        {selectedMessage && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(selectedMessage.status)}`}>{selectedMessage.status}</span>
              <span className="text-xs text-slate-400">{selectedMessage.date}</span>
              {selectedMessage.status === "Sent" && <span className="text-xs text-slate-400">• {selectedMessage.recipients} recipients</span>}
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-sm text-slate-700 leading-7">{selectedMessage.content}</div>
            <div className="flex justify-end mt-4"><button onClick={() => setSelectedMessage(null)} className="px-4 py-2 text-sm bg-slate-100 rounded-xl font-semibold">Close</button></div>
          </div>
        )}
      </Modal>

      {/* Volunteer Detail Drawer */}
      <VolunteerDrawer volunteer={selectedVolunteer} onClose={() => setSelectedVolunteer(null)} onApprove={handleApproveVolunteer} />
    </div>
  );
}
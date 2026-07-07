"use client";
import API from "@/api/api";
import Attendance from "@/components/admin/attendance/Attendance";
import Certificates from "@/components/admin/certificates/Certificates";
import DriveDetailsModal from "@/components/admin/drives/DriveDetailModal";
import Drives from "@/components/admin/drives/Drives";
import ComposeMessageModal from "@/components/admin/messages/ComposeMessageModal";
import MessageDetailsModal from "@/components/admin/messages/MessageDetailsModal";
import Messages from "@/components/admin/messages/Messages";
import SettingsSection from "@/components/admin/settings/SettingsSection";
import GlobalThemeStyle from "@/components/admin/theme/GlobalThemeStyle";
import { applyTheme } from "@/components/admin/theme/ThemeUtils";
import AddVolunteerModal from "@/components/admin/volunteers/AddVolunteerModal";
import VolunteerDrawer from "@/components/admin/volunteers/VolunteerDrawer";
import Volunteers from "@/components/admin/volunteers/Volunteers";
import type {
  AccentPalette,
  ApiMessage,
  AttendanceRecord,
  DashboardStats,
  Drive,
  MessageItem,
  SectionId,
  ThemeMode,
  Volunteer
} from "@/types/admin";
import { AnimatePresence, motion } from "framer-motion";
import {
  Calendar,
  Clock,
  Droplets,
  TrendingUp,
  X
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ThemeContext } from "../components/admin/contexts/ThemeContext";
import CreateDriveModal from "../components/admin/drives/CreateDriveModal";
import Header from "../components/admin/layout/Header";
import Sidebar from "../components/admin/layout/Sidebar";
import Overview from "../components/admin/overview/Overview";
;

// ─── TYPES ──────────────────────────────────────────────────────────────────


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
  const [volunteerFilter, setVolunteerFilter] = useState<"All" | "New" | "Pending">("All");

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
    overview: "Dashboard Overview", drives: "Drives", attendance: "Attendance", certificates: "Certificates",
    volunteers: "Volunteers", messages: "Messages", settings: "Settings",
  };

  const pendingBadge = pendingVolunteers > 0 ? `${pendingVolunteers} Pending` : undefined;

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
                <Sidebar
                  mobile
                  activeNav={activeNav}
                  goTo={goTo}
                  pendingBadge={pendingBadge}
                />
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <Sidebar
          activeNav={activeNav}
          goTo={goTo}
          pendingBadge={pendingBadge}
        />

        <main className="flex-1 flex flex-col h-screen overflow-hidden">
          <Header
            activeNav={activeNav}
            sectionTitle={sectionTitle}
            goTo={goTo}
            handleLogout={handleLogout}
            onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          />

          <div className="flex-1 overflow-y-auto p-6 lg:p-10">

            {activeNav === "overview" && (
              <Overview
                adminUser={adminUser}
                appLoading={appLoading}
                metrics={METRICS}
                chartData={chartData}
                accent={accent}
                leaderboard={leaderboard}
                getRankColor={getRankColor}
              />
            )}

            {activeNav === "drives" && (
              <Drives
                drives={drives}
                loadingDrives={loadingDrives}
                setShowDriveModal={setShowDriveModal}
                setSelectedDrive={setSelectedDrive}
                handleCompleteDrive={handleCompleteDrive}
                handleGenerateCertificates={handleGenerateCertificates}
              />
            )}

            {activeNav === "attendance" && (
              <Attendance
                attendance={attendance}
                loadingAttendance={loadingAttendance}
                handleApproveAttendance={handleApproveAttendance}
              />
            )}

            {activeNav === "volunteers" && (
              <Volunteers
                volunteers={volunteers}
                loadingVolunteers={loadingVolunteers}
                volunteerSearch={volunteerSearch}
                setVolunteerSearch={setVolunteerSearch}
                volunteerFilter={volunteerFilter}
                setVolunteerFilter={setVolunteerFilter}
                filteredVolunteers={filteredVolunteers}
                newVolunteers={newVolunteers}
                pendingVolunteers={pendingVolunteers}
                setShowVolunteerModal={setShowVolunteerModal}
                setSelectedVolunteer={setSelectedVolunteer}
                handleApproveVolunteer={handleApproveVolunteer}
                getStatusClass={getStatusClass}
              />
            )}

            {activeNav === "messages" && (
              <Messages
                messages={messages}
                loadingMessages={loadingMessages}
                setShowMessageModal={setShowMessageModal}
                setSelectedMessage={setSelectedMessage}
                getStatusClass={getStatusClass}
              />
            )}

            {/* ── CERTIFICATES ── */}
            {activeNav === "certificates" && (
              <Certificates />
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

        <CreateDriveModal
          open={showDriveModal}
          onClose={() => setShowDriveModal(false)}
          driveForm={driveForm}
          setDriveForm={setDriveForm}
          submitting={submitting}
          handleCreateDrive={handleCreateDrive}
        />

        <AddVolunteerModal
          open={showVolunteerModal}
          onClose={() => setShowVolunteerModal(false)}
          volunteerForm={volunteerForm}
          setVolunteerForm={setVolunteerForm}
          submitting={submitting}
          handleAddVolunteer={handleAddVolunteer}
        />

        <ComposeMessageModal
          open={showMessageModal}
          onClose={() => setShowMessageModal(false)}
          volunteers={volunteers}
          messageForm={messageForm}
          setMessageForm={setMessageForm}
          submitting={submitting}
          handleSendMessage={handleSendMessage}
        />

        <MessageDetailsModal
          message={selectedMessage}
          onClose={() => setSelectedMessage(null)}
          getStatusClass={getStatusClass}
        />

        <VolunteerDrawer
          volunteer={selectedVolunteer}
          onClose={() => setSelectedVolunteer(null)}
          onApprove={handleApproveVolunteer}
          getStatusClass={getStatusClass}
        />
        <DriveDetailsModal drive={selectedDrive} onClose={() => setSelectedDrive(null)} />
      </div>
    </ThemeContext.Provider>
  );
}
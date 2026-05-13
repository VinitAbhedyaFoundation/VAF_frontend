"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
    LayoutDashboard,
    Waves,
    ShieldCheck,
    Calendar,
    Droplets,
    Clock,
    UserCircle,
    CheckCircle2,
    Leaf,
    Menu,
    X,
    Bell,
    ChevronRight,
    LogOut,
    Award,
    MapPin,
    Star,
    Download,
    Trophy,
    Flame,
    Heart,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- TYPES ---

type SectionId = "overview" | "upcoming" | "drives" | "attendance" | "certificates" | "profile";

interface NavItem {
    label: string;
    icon: React.ElementType;
    id: SectionId;
    badge?: string;
}

interface MetricData {
    id: string;
    label: string;
    value: number;
    unit?: string;
    icon: React.ElementType;
    color: string;
    bg: string;
}

interface Drive {
    id: string;
    title: string;
    location: string;
    date: string;
    status: "Joined" | "Completed" | "Upcoming";
    volunteers: number;
    hoursLogged?: number;
    description: string;
    type: string;
}

interface UpcomingDrive {
    id: string;
    title: string;
    location: string;
    date: string;
    time: string;
    slots: number;
    slotsLeft: number;
    type: string;
    organizer: string;
}

interface AttendanceRecord {
    id: string;
    drive: string;
    hours: number;
    date: string;
    status: "Marked" | "Pending";
    points: number;
}

interface Certificate {
    id: string;
    title: string;
    issueDate: string;
    drive: string;
    hours: number;
    type: "participation" | "excellence" | "milestone";
}

interface User {
    name: string;
    email: string;
    createdAt?: string;
    address?: string;
}

// --- MOCK DATA ---

const NAV_ITEMS: NavItem[] = [
    { label: "Home", icon: LayoutDashboard, id: "overview" },
    { label: "Upcoming Drives", icon: Calendar, id: "upcoming" },
    { label: "My Drives", icon: Waves, id: "drives" },
    { label: "My Activity", icon: ShieldCheck, id: "attendance" },
    { label: "Certificates", icon: Award, id: "certificates", badge: "New" },
    { label: "Profile", icon: UserCircle, id: "profile" },
];

const UPCOMING_DRIVES: UpcomingDrive[] = [
    
];

const ATTENDANCE: AttendanceRecord[] = [

];

const CERTIFICATES: Certificate[] = [
  
];


// --- UTILS ---

const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case "Completed":
        case "Marked":
            return "bg-emerald-100 text-emerald-700";
        case "Joined":
        case "Active":
            return "bg-blue-100 text-blue-700";
        case "Pending":
            return "bg-orange-100 text-orange-700";
        case "Upcoming":
            return "bg-slate-100 text-slate-600";
        default:
            return "bg-slate-100 text-slate-600";
    }
};

const getCertIcon = (type: Certificate["type"]) => {
    if (type === "excellence") return <Trophy size={28} className="text-yellow-500" />;
    if (type === "milestone") return <Flame size={28} className="text-orange-500" />;
    return <Heart size={28} className="text-emerald-500" />;
};

/// --- COMPONENTS ---

const StatCard: React.FC<{ metric: MetricData; loading: boolean }> = ({ metric, loading }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
        <div className={`w-12 h-12 rounded-2xl ${metric.bg} ${metric.color} flex items-center justify-center mb-5`}>
            <metric.icon size={22} />
        </div>
        {loading ? (
            <div className="animate-pulse space-y-2">
                <div className="h-9 w-24 bg-slate-100 rounded-lg" />
                <div className="h-4 w-32 bg-slate-100 rounded-lg" />
            </div>
        ) : (
            <>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">
                    <CountUp end={metric.value} duration={1.8} />
                    {metric.unit && <span className="text-xl font-bold text-slate-400 ml-1">{metric.unit}</span>}
                </h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{metric.label}</p>
            </>
        )}
    </motion.div>
);

export default function UserDashboard() {
    const [loading, setLoading] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeNav, setActiveNav] = useState<SectionId>("overview");
    const [joinedDrives, setJoinedDrives] = useState<Set<string>>(new Set());
    const [user, setUser] = useState<User | null>(null);
    const [data, setdata] = useState<any>(null);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [openNotif, setOpenNotif] = useState(false);
    const drives = data?.stats?.drivesJoined ?? 0;

const getLevel = (drives: number) => {
  if (drives >= 20) return "Elite";
  if (drives >= 12) return "Platinum";
  if (drives >= 8) return "Gold";
  if (drives >= 4) return "Silver";
  return "Bronze";
};

const getNextLevelTarget = (drives: number) => {
  if (drives >= 20) return 20;
  if (drives >= 12) return 20;
  if (drives >= 8) return 12;
  if (drives >= 4) return 8;
  return 4;
};

const level = getLevel(drives);
const total = getNextLevelTarget(drives);

const levelStyles: any = {
  Bronze: "text-orange-400",
  Silver: "text-gray-300",
  Gold: "text-yellow-400",
  Platinum: "text-emerald-400",
  Elite: "text-purple-400",
};
    const [certificates, setCertificates] = useState<Certificate[]>([]);
    const [upcomingDrives, setUpcomingDrives] = useState<UpcomingDrive[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1400);
        return () => clearTimeout(t);
    }, []);

// ✅ 1. Fetch user
useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await fetch("http://localhost:3000/api/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        console.error("User API failed");
        return;
      }

      const data = await res.json();

      console.log("USER API 👉", data); // 🔥 DEBUG

      // ✅ HANDLE BOTH CASES
      if (data.user) {
        setUser(data.user);
      } else {
        setUser(data);
      }

    } catch (err) {
      console.error("User fetch failed", err);
    }
  };

  fetchUser();
}, []);

// ✅ 2. Fetch dashboard
useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await fetch("http://localhost:3000/api/dashboard/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) return;

      const data = await res.json();

      setdata(data);
      setCertificates(data?.certificates || []);

    } catch (err) {
      console.error(err);
    }
  };

  fetchDashboard();
}, []);
useEffect(() => {
  const fetchUpcoming = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/drive/upcoming");
      const data = await res.json();

      console.log("UPCOMING API:", data);

      const formatted = data.map((d: any) => ({
        id: d.id.toString(),
        title: d.title,
        location: d.location,
        date: new Date(d.date).toLocaleDateString(),
        time: d.time,
        slots: d.slots,
        slotsLeft: d.slots,
        type: d.type || "General",
        organizer: "VAF",
      }));

      setUpcomingDrives(formatted);
    } catch (err) {
      console.error("Upcoming fetch failed", err);
    }
  };

  fetchUpcoming();
}, []);

    const goToSection = (id: SectionId) => {
        setActiveNav(id);
        setIsMobileMenuOpen(false);
        document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
    };

    const handleJoin = (drive: UpcomingDrive) => {
        setJoinedDrives((prev) => {
            const next = new Set(prev);
            if (next.has(drive.id)) {
                next.delete(drive.id);
                toast("Left the drive", { icon: "👋" });
            } else {
                next.add(drive.id);
                toast.success(`Joined "${drive.title}" 🎉`);            }
            return next;
        });
    };

    const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch("http://localhost:3000/dashboard/notifications", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setNotifications(data);

  } catch (err) {
    console.error("Notification fetch error", err);
  }
};

useEffect(() => {
  const handleClickOutside = (e: any) => {
    if (!e.target.closest(".notification-wrapper")) {
      setOpenNotif(false);
    }
  };

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

const handleBellClick = () => {
  setOpenNotif((prev) => !prev);

  if (!openNotif) {
    fetchNotifications();
  }
};
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Logged out");
        navigate("/login");
    };

const totalHours = data?.stats?.hoursVolunteered || 0;

/* 🔥 WEEKLY STREAK LOGIC START */

const calculateWeeklyStreak = (activity: any[]) => {
  if (!activity || activity.length === 0) return 0;

  const weeks = new Set();

  activity.forEach((a) => {
    const date = new Date(a.date);

    const firstDay = new Date(date.getFullYear(), 0, 1);
    const pastDays = Math.floor(
      (date.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)
    );

    const week = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);

    weeks.add(`${date.getFullYear()}-${week}`);
  });

  return weeks.size;
};

const streak = calculateWeeklyStreak(data?.activity || []);
const getWeeklyHeatmapData = (activity: any[]) => {
  const weeks = Array.from({ length: 53 }, () => ({
    hours: 0,
    waste: 0,
    location: "",
    date: "",
  }));

  activity?.forEach((a) => {
    const date = new Date(a.date);

    const firstDay = new Date(date.getFullYear(), 0, 1);
    const pastDays = Math.floor(
      (date.getTime() - firstDay.getTime()) / (1000 * 60 * 60 * 24)
    );

    const week = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
    const index = Math.min(week - 1, 52);

    weeks[index].hours += a.hours || 0;
    weeks[index].waste += a.waste || 0;
    weeks[index].location = a.location || "Unknown";
    weeks[index].date = date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });
  });

  return weeks;
};
const HEATMAP_DATA = getWeeklyHeatmapData(data?.activity || []);

/* 🔥 WEEKLY STREAK LOGIC END */
/* 🔥 ADD HERE (exactly here) */

const USER_METRICS: MetricData[] = [
  {
    id: "m1",
    label: "Drives Joined",
    value: data?.stats?.drivesJoined || 0,
    icon: Waves,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    id: "m2",
    label: "Hours Volunteered",
    value: data?.stats?.hoursVolunteered || 0,
    unit: "hrs",
    icon: Clock,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    id: "m3",
    label: "Waste Collected",
    value: data?.stats?.wasteCollected || 0,
    unit: "kg",
    icon: Droplets,
    color: "text-purple-600",
    bg: "bg-purple-50",
  },
  {
    id: "m4",
    label: "Impact Points",
    value: data?.stats?.impactPoints || 0,
    icon: Star,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const CHART_DATA = data?.activity || [];

const MY_DRIVES: Drive[] =
  data?.recentDrives?.map((d: any, i: number) => ({
    id: i.toString(),
    title: d.title,
    location: d.location,
    date: d.date,
    status: "Completed",
    volunteers: 0,
    hoursLogged: d.hours,
    description: "",
    type: "Cleanup",
  })) || [];

    const sectionLabel: Record<SectionId, string> = {
        overview: "My Dashboard",
        upcoming: "Upcoming Drives",
        drives: "My Drives",
        attendance: "My Activity",
        certificates: "Certificates",
        profile: "My Profile",
    };

    return (
        <div className="flex min-h-screen bg-[#F4F7F5] text-slate-900 font-sans overflow-hidden">
            <Toaster position="bottom-center" />

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm z-40 xl:hidden"
                        />
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 h-full w-72 bg-white z-50 p-8 shadow-2xl xl:hidden"
                        >
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-emerald-600 rounded-lg rotate-12 flex items-center justify-center">
                                        <Leaf className="text-white -rotate-12" size={16} />
                                    </div>
                                    <span className="text-xl font-black tracking-tighter text-emerald-950">VAF</span>
                                </div>
                                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 bg-slate-100 rounded-full">
                                    <X size={18} />
                                </button>
                            </div>
                            <nav className="space-y-1">
                                {NAV_ITEMS.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => goToSection(item.id)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeNav === item.id ? "bg-emerald-50 text-emerald-700" : "text-slate-500 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={18} />
                                            {item.label}
                                        </div>
                                        {item.badge && <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full">{item.badge}</span>}
                                    </button>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <aside className="w-72 border-r border-slate-200 bg-white p-8 hidden xl:flex flex-col sticky top-0 h-screen">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl rotate-12 flex items-center justify-center shadow-lg shadow-emerald-200">
                        <Leaf className="text-white -rotate-12" size={20} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tighter text-emerald-950">VAF</h2>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest -mt-1">Volunteer Portal</p>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center">
                        <UserCircle size={28} className="text-emerald-600" />
                    </div>
                    <div>
                        <p className="font-black text-sm text-slate-900">{user?.name || "Loading..."}</p>
                        <p className="text-[11px] text-emerald-600 font-bold">🔥 {streak > 0 ? `${streak}-week streak` : "No streak yet"}</p>
                    </div>
                </div>

                <nav className="space-y-1 flex-1">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => goToSection(item.id)}
                            className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl text-sm font-bold transition-all ${activeNav === item.id
                                    ? "bg-emerald-900 text-white shadow-xl shadow-emerald-200"
                                    : "text-slate-400 hover:bg-slate-50 hover:text-slate-900"
                                }`}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon size={18} />
                                {item.label}
                            </div>
                            {item.badge && (
                                <span
                                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeNav === item.id ? "bg-white/20 text-white" : "bg-emerald-100 text-emerald-700"
                                        }`}
                                >
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="bg-slate-950 p-5 rounded-[1.8rem] text-white relative overflow-hidden mt-4">
  <div className="absolute -right-4 -bottom-4 text-emerald-500/20 rotate-45">
    <Leaf size={100} />
  </div>

  <div className="relative z-10">
    <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">
      Next Milestone
    </p>

    <h3 className={`text-lg font-black mt-1 ${levelStyles[level]}`}>
      {level} 
    </h3>

    {/* ✅ FIXED PROGRESS BAR */}
    <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2">
      <motion.div
        initial={{ width: 0 }}
        animate={{
          width: `${total ? (drives / total) * 100 : 0}%`,
        }}
        transition={{ delay: 0.5, duration: 1 }}
        className="h-full bg-emerald-400 rounded-full"
      />
    </div>

    <p className="text-xs text-white/70">
  {drives} drives completed
</p>
  </div>
</div>            </aside>

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 flex-shrink-0 z-30">
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsMobileMenuOpen(true)} className="xl:hidden p-2 hover:bg-slate-100 rounded-full" aria-label="Open menu">
                            <Menu size={20} className="text-slate-600" />
                        </button>
                        <div>
                            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">Volunteer</p>
                            <h1 className="text-xl font-black tracking-tight">{sectionLabel[activeNav]}</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <button onClick={() => goToSection("upcoming")} className="hidden sm:flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all">
                            <Calendar size={16} /> Find Drives
                        </button>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="relative notification-wrapper">

  {/* 🔔 Bell */}
  <button
    onClick={handleBellClick}
    className="relative p-2 hover:bg-slate-100 rounded-full"
  >
    <Bell size={20} className="text-slate-600" />

    {notifications.length > 0 && (
      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
    )}
  </button>

  {/* 🔽 DROPDOWN */}
  {openNotif && (
    <div className="absolute right-0 mt-3 w-80 bg-white border border-slate-200 rounded-2xl shadow-xl z-50 overflow-hidden">

      <div className="px-4 py-3 border-b font-bold text-sm">
        Notifications
      </div>

      <div className="max-h-80 overflow-y-auto">
        {notifications.length === 0 ? (
          <p className="p-4 text-sm text-slate-500 text-center">
            No notifications
          </p>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="p-3 border-b hover:bg-slate-50 transition"
            >
              <p className="text-sm font-semibold text-slate-900">
                {n.subject || "Update"}
              </p>

              <p className="text-xs text-slate-500 mt-1">
                {n.content}
              </p>

              <p className="text-[10px] text-slate-400 mt-1">
               {n?.createdAt
  ? new Date(n.createdAt).toLocaleString()
  : "Just now"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  )}
</div>
                        <button onClick={handleLogout} className="p-2 hover:bg-slate-100 rounded-full" aria-label="Logout">
                            <LogOut size={20} className="text-slate-600" />
                        </button>
                    </div>
                </header>

                <div id="top" className="flex-1 overflow-y-auto p-6 lg:p-10">
                    {activeNav === "overview" && (
                        <div className="space-y-8">
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-emerald-900 to-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-400/10 rounded-full blur-3xl -mr-20 -mt-20" />
                                <div className="relative z-10">
                                    <p className="text-emerald-400 text-sm font-bold mb-1">Welcome back 👋</p>
                                    <h2 className="text-3xl font-black tracking-tight mb-2">{user?.name || "Loading..."}</h2>
<p className="text-slate-300 text-sm mb-5">
  You've contributed <strong className="text-white">{data?.stats?.hoursVolunteered || 0} hours</strong> 
  and collected <strong className="text-white">{data?.stats?.wasteCollected || 0} kg</strong> of waste. Keep going!
</p>                                    <div className="flex gap-3 flex-wrap">
                                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
                                            <Flame size={16} className="text-orange-400" /> {streak > 0 ? `${streak}-week streak` : "No streak yet"}
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
                                            <Trophy size={16} className="text-yellow-400" /> {certificates.length} Certificates
                                        </div>
                                        <button onClick={() => goToSection("upcoming")} className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 px-4 py-2 rounded-xl text-sm font-bold transition">
                                            <Calendar size={16} /> Join Next Drive
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                                {USER_METRICS.map((m) => <StatCard key={m.id} metric={m} loading={loading} />)}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7 flex flex-col justify-between">
                                    <h3 className="text-lg font-black text-slate-900 mb-1">My Activity</h3>
                                    <p className="text-sm text-slate-400 mb-6">Hours volunteered vs waste collected</p>
                                    <div className="h-52">
                                        {loading ? (
                                            <div className="h-full bg-slate-50 rounded-2xl flex items-center justify-center">
                                                <span className="text-slate-400 font-bold animate-pulse">Loading...</span>
                                            </div>
                                        ) : (
<div className="flex flex-col justify-center py-4">
        <div className="space-y-1 flex flex-col items-start justify-center">
<div className="flex justify-center">
  <div className="grid grid-cols-10 gap-2">
    {Array.from({ length: 53 }).map((_, index) => {
const item = HEATMAP_DATA[index] || {
  hours: 0,
  waste: 0,
  location: "",
  date: "",
};

const value = item.hours + item.waste;
      let color = "bg-slate-100";
      if (value > 0 && value < 5) color = "bg-emerald-200";
      else if (value < 10) color = "bg-emerald-400";
      else if (value < 20) color = "bg-emerald-600";
      else if (value >= 20) color = "bg-emerald-800";

      return (
        <div
          key={index}
          title={`📅 ${item.date || "No activity"}
📍 ${item.location || "N/A"}
⏱ ${item.hours} hrs
♻️ ${item.waste} kg`}
          className={`w-6 h-6 rounded-md ${color}`}
        />
      );
    })}
  </div>
</div>

  </div>
</div>
 )}
                                    </div>
                                </div>

                                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
                                    <h3 className="text-lg font-black text-slate-900 mb-4">Recent Drives</h3>
                                    <div className="space-y-3">
                                        {MY_DRIVES.slice(0, 3).map((drive) => (
                                            <div key={drive.id} className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-100">
                                                <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                                                    <Leaf size={14} className="text-emerald-600" />
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-bold text-sm text-slate-900 truncate">{drive.title}</p>
                                                    <p className="text-xs text-slate-400">{drive.location} · {drive.date}</p>
                                                    <p className="text-xs text-emerald-600 font-bold mt-0.5">{drive.hoursLogged} hrs logged</p>
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => goToSection("drives")} className="w-full text-center text-sm text-emerald-600 font-bold py-2 hover:text-emerald-700 transition">
                                            View All Drives →
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
                                <div className="flex items-center justify-between mb-5">
                                    <div>
                                        <h3 className="text-lg font-black">Upcoming Near You</h3>
                                        <p className="text-sm text-slate-400 mt-0.5">{UPCOMING_DRIVES.length} drives available to join</p>
                                    </div>
                                    <button onClick={() => goToSection("upcoming")} className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                                        See all <ChevronRight size={16} />
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                    {upcomingDrives.slice(0, 3).map((drive) => (
                                        <div key={drive.id} className="rounded-2xl border border-slate-100 p-4 hover:border-emerald-200 hover:shadow-sm transition">
                                            <div className="flex justify-between items-start mb-2">
                                               
                                            </div>
                                            <h4 className="font-bold text-sm text-slate-900 mb-1">{drive.title}</h4>
                                            <p className="text-xs text-slate-400 flex items-center gap-1 mb-3"><MapPin size={11} /> {drive.location}</p>
                                            <button onClick={() => handleJoin(drive)}
                                                className={`w-full py-2 rounded-xl text-xs font-bold transition ${joinedDrives.has(drive.id) ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : "bg-emerald-600 text-white hover:bg-emerald-700"}`}>
                                                {joinedDrives.has(drive.id) ? "✓ Joined" : "Join Drive"}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

{activeNav === "upcoming" && (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black">Upcoming Drives</h1>
      <p className="text-slate-500 text-sm mt-1">
        Find and join drives near you. Make an impact this week.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {upcomingDrives.map((drive) => (
        <motion.div
          key={drive.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all"
        >
          {/* removed type + slots */}

          <h3 className="text-lg font-black text-slate-900 mb-1">
            {drive.title}
          </h3>

          <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-1">
            <MapPin size={13} /> {drive.location}
          </p>

          <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-1">
            <Calendar size={13} /> {drive.date}
          </p>

          <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-4">
            <Clock size={13} /> {drive.time}
          </p>

          <div className="w-full bg-slate-100 h-1.5 rounded-full mb-4 overflow-hidden">
            <div
              className="h-full bg-emerald-500 rounded-full"
              style={{
                width: `${((drive.slots - drive.slotsLeft) / drive.slots) * 100}%`,
              }}
            />
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => handleJoin(drive)}
              className={`flex-1 py-2.5 rounded-2xl text-sm font-bold transition ${
                joinedDrives.has(drive.id)
                  ? "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                  : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100"
              }`}
            >
              {joinedDrives.has(drive.id)
                ? "✓ Joined — Leave?"
                : "Join Drive"}
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-3 font-medium">
            by {drive.organizer}
          </p>
        </motion.div>
      ))}
    </div>
  </div>
)}

{activeNav === "drives" && (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black">My Drives</h1>
      <p className="text-slate-500 text-sm mt-1">
        All drives you've participated in.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {MY_DRIVES.map((drive) => (
        <motion.div
          key={drive.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all"
        >
          <div className="flex justify-end items-center mb-4">
            <span
              className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${getStatusBadgeClass(
                drive.status
              )}`}
            >
              {drive.status}
            </span>
          </div>

          <h3 className="text-lg font-black text-slate-900 mb-1">
            {drive.title}
          </h3>

          <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-1">
            <MapPin size={13} /> {drive.location}
          </p>

          <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-3">
            <Calendar size={13} /> {drive.date}
          </p>

          <p className="text-xs text-slate-400 mb-4 leading-relaxed">
            {drive.description}
          </p>

          <div className="flex justify-between items-center pt-4 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
              <Clock size={14} className="text-emerald-500" />
              {drive.hoursLogged} hrs logged
            </div>

            <div className="flex items-center gap-1.5 text-sm text-slate-400">
              <UserCircle size={14} />
              {drive.volunteers} volunteers
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)}
{activeNav === "attendance" && (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-black">My Activity</h1>
      <p className="text-slate-500 text-sm mt-1">
        Track your hours and attendance records.
      </p>
    </div>

    {/* STATS */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[
        {
          label: "TOTAL DRIVES",
          value: data?.stats?.drivesJoined || 0,
          bg: "bg-emerald-50",
          color: "text-emerald-600",
        },
        {
          label: "HOURS LOGGED",
          value: data?.stats?.hoursVolunteered || 0,
          bg: "bg-blue-50",
          color: "text-blue-600",
        },
        {
          label: "POINTS EARNED",
          value: data?.stats?.impactPoints || 0,
          bg: "bg-amber-50",
          color: "text-amber-600",
        },
        {
          label: "PENDING",
          value: 0,
          bg: "bg-orange-50",
          color: "text-orange-600",
        },
      ].map((s, i) => (
        <div
          key={i}
          className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm"
        >
          <div
            className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-3`}
          >
            {/* simple dot icon instead of s.icon */}
            <div className="w-2 h-2 bg-current rounded-full" />
          </div>

          <p className="text-2xl font-black text-slate-900">
            {s.value}
          </p>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">
            {s.label}
          </p>
        </div>
      ))}
    </div>

    {/* TABLE */}
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-100">
        <h2 className="font-black text-slate-900">Attendance Log</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="p-4 text-left font-bold">Drive</th>
              <th className="p-4 text-left font-bold">Date</th>
              <th className="p-4 text-left font-bold">Hours</th>
              <th className="p-4 text-left font-bold">Waste</th>
              <th className="p-4 text-left font-bold">Status</th>
            </tr>
          </thead>

          <tbody>
            {!data?.activity?.length ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-slate-400">
                  No attendance yet
                </td>
              </tr>
            ) : (
              data.activity.map((a: any, index: number) => (
                <tr
                  key={index}
                  className="border-t border-slate-50 hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-semibold text-slate-900">
                    Drive #{index + 1}
                  </td>

                  <td className="p-4 text-slate-500">
                    {new Date(a.date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                    })}
                  </td>

                  <td className="p-4 font-bold text-slate-700">
                    {a.hours} hrs
                  </td>

                  <td className="p-4 font-bold text-emerald-600">
                    {a.waste} kg
                  </td>

                  <td className="p-4">
                    <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-green-100 text-green-600">
                      Marked
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  </div>
)}
{activeNav === "certificates" && (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-black">My Certificates</h1>
            <p className="text-slate-500 text-sm mt-1">Download and share your volunteer achievements.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
{certificates.map((cert) => (
                    <motion.div key={cert.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-all">
                    
                    <div className={`h-2 w-full ${cert.type === "excellence" ? "bg-gradient-to-r from-yellow-400 to-amber-500" : cert.type === "milestone" ? "bg-gradient-to-r from-orange-400 to-red-500" : "bg-gradient-to-r from-emerald-400 to-teal-500"}`} />
                    
                    <div className="p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                                {getCertIcon(cert.type)}
                            </div>
                            <div>
                                <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${cert.type === "excellence" ? "bg-yellow-100 text-yellow-700" : cert.type === "milestone" ? "bg-orange-100 text-orange-700" : "bg-emerald-100 text-emerald-700"}`}>
                                    {cert.type}
                                </span>
                            </div>
                        </div>

                        <h3 className="text-lg font-black text-slate-900 mb-1">{cert.title}</h3>
                        <p className="text-sm text-slate-500 mb-1">{cert.drive}</p>
                        <p className="text-xs text-slate-400 mb-4">{cert.hours} hours · Issued {cert.issueDate}</p>

                        <button
                            onClick={() => toast.success("Certificate download started!")}
                            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-700 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50 transition"
                        >
                            <Download size={15} /> Download PDF
                        </button>
                    </div>
                </motion.div>
            ))}
        </div>
    </div>
)}

 {activeNav === "profile" && (
    <div className="space-y-6 max-w-2xl">
        <div>
            <h1 className="text-2xl font-black">My Profile</h1>
            <p className="text-slate-500 text-sm mt-1">Your volunteer identity and impact summary.</p>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
            <div className="relative z-10 flex items-center gap-5 mb-6">
                <div className="w-20 h-20 rounded-full bg-emerald-600/30 border-2 border-emerald-500/50 flex items-center justify-center">
                    <UserCircle size={48} className="text-emerald-400" />
                </div>
                <div>
                    <h2 className="text-2xl font-black">{user ? user.name : "—"}</h2>
                    <p className="text-slate-400 text-sm">{user ? user.email : "—"}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-bold">Verified Volunteer</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Drives", value: data?.stats?.drivesJoined || 0 },
{ label: "Hours", value: data?.stats?.hoursVolunteered || 0 },
{ label: "Points", value: data?.stats?.impactPoints || 0 },
                ].map((s) => (
                    <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                        <p className="text-2xl font-black">{s.value}</p>
                        <p className="text-xs text-slate-400 font-bold mt-0.5">{s.label}</p>
                    </div>
                ))}
            </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
            <h3 className="font-black text-slate-900 mb-2">Account Info</h3>
            {[
                { label: "Full Name", value: user?.name || "Loading..." },
                { label: "Email", value: user?.email || "Loading..." },
                { label: "City", value: user?.address || "N/A" },
                {
                    label: "Joined",
                    value: user?.createdAt
                        ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                              month: "long",
                              year: "numeric",
                          })
                        : "Loading...",
                },
                { label: "Role", value: "Field Volunteer" },
            ].map((row) => (
                <div
                    key={row.label}
                    className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0"
                >
                    <span className="text-sm font-bold text-slate-400">{row.label}</span>
                    <span className="text-sm font-bold text-slate-900">
                        {row.value ?? "N/A"}
                    </span>
                </div>
            ))}
        </div>

        <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 text-red-600 font-bold border border-red-100 hover:bg-red-100 transition"
        >
            <LogOut size={16} /> Logout
        </button>
    </div>
)}
    </div>
</main>
</div>
);
}
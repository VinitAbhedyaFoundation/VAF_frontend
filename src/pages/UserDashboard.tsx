"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import CountUp from "react-countup";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
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
    { label: "My Attendance", icon: ShieldCheck, id: "attendance" },
    { label: "Certificates", icon: Award, id: "certificates", badge: "New" },
    { label: "Profile", icon: UserCircle, id: "profile" },
];

const UPCOMING_DRIVES: UpcomingDrive[] = [
    {
        id: "u1",
        title: "Sunday Plogging Drive",
        location: "Aurangabad Riverfront",
        date: "Apr 20, 2025",
        time: "6:00 AM",
        slots: 30,
        slotsLeft: 12,
        type: "Cleanup",
        organizer: "VAF Team",
    },
    {
        id: "u2",
        title: "Cloth Donation Camp",
        location: "Pune, Ward 4",
        date: "Apr 26, 2025",
        time: "10:00 AM",
        slots: 20,
        slotsLeft: 7,
        type: "Donation",
        organizer: "Social Shelf",
    },
    {
        id: "u3",
        title: "Blood Donation Drive",
        location: "Mumbai General Hospital",
        date: "May 3, 2025",
        time: "9:00 AM",
        slots: 50,
        slotsLeft: 23,
        type: "Health",
        organizer: "LifeLine Foundation",
    },
    {
        id: "u4",
        title: "Park Beautification",
        location: "Nashik City Park",
        date: "May 10, 2025",
        time: "7:30 AM",
        slots: 25,
        slotsLeft: 18,
        type: "Cleanup",
        organizer: "GreenCity",
    },
    {
        id: "u5",
        title: "Food Distribution",
        location: "Pune Shelter Home",
        date: "May 17, 2025",
        time: "11:00 AM",
        slots: 15,
        slotsLeft: 5,
        type: "Food",
        organizer: "Annadaan Trust",
    },
];

const ATTENDANCE: AttendanceRecord[] = [
    { id: "a1", drive: "Plogging Drive", hours: 2, date: "Apr 13", status: "Marked", points: 40 },
    { id: "a2", drive: "Beach Cleanup", hours: 3, date: "Apr 6", status: "Marked", points: 60 },
    { id: "a3", drive: "Tree Plantation", hours: 1.5, date: "Mar 30", status: "Marked", points: 30 },
    { id: "a4", drive: "Food Drive", hours: 2.5, date: "Mar 16", status: "Pending", points: 0 },
];

const CERTIFICATES: Certificate[] = [
    { id: "c1", title: "Volunteer of the Month", issueDate: "Apr 2025", drive: "Plogging Drive", hours: 8, type: "excellence" },
    { id: "c2", title: "Beach Guardian", issueDate: "Mar 2025", drive: "Beach Cleanup", hours: 3, type: "participation" },
    { id: "c3", title: "10 Drives Milestone", issueDate: "Feb 2025", drive: "All Drives", hours: 24, type: "milestone" },
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

const getDriveTypeColor = (type: string) => {
    switch (type) {
        case "Cleanup":
            return "bg-emerald-100 text-emerald-700";
        case "Plantation":
            return "bg-green-100 text-green-700";
        case "Donation":
            return "bg-purple-100 text-purple-700";
        case "Health":
            return "bg-red-100 text-red-700";
        case "Food":
            return "bg-amber-100 text-amber-700";
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
    const [upcomingDrives, setUpcomingDrives] = useState<UpcomingDrive[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const t = setTimeout(() => setLoading(false), 1400);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:3000/auth/me", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                const data = await res.json();
                setUser(data);
            } catch (err) {
                console.error("User fetch failed", err);
            }
        };

        fetchUser();
    }, []);

    useEffect(() => {
  const fetchDashboard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:3000/dashboard/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setdata(data);
    } catch (err) {
      console.error("Dashboard fetch failed", err);
    }
  };

  fetchDashboard();
}, []);

useEffect(() => {
  const fetchUpcoming = async () => {
    try {
      const res = await fetch("http://localhost:3000/drive/upcoming");
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

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        toast.success("Logged out");
        navigate("/login");
    };

const totalHours = data?.stats?.hoursVolunteered || 0;
const streak = 4;

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
        attendance: "My Attendance",
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
                        <p className="text-[11px] text-emerald-600 font-bold">🔥 {streak}-week streak</p>
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
                        <p className="text-[10px] font-bold text-emerald-400 uppercase mb-1">Next Milestone</p>
                        <h4 className="text-base font-black mb-3">Platinum Status</h4>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <motion.div initial={{ width: 0 }} animate={{ width: "65%" }} transition={{ delay: 0.5, duration: 1 }} className="h-full bg-emerald-400 rounded-full" />
                        </div>
                        <p className="text-[10px] mt-2 text-slate-400 font-medium">8 / 12 drives completed</p>
                    </div>
                </div>
            </aside>

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
                        <button className="relative p-2 hover:bg-slate-100 rounded-full" aria-label="Notifications">
                            <Bell size={20} className="text-slate-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>
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
                                    <p className="text-slate-300 text-sm mb-5">You've contributed <strong className="text-white">{data?.stats?.hoursVolunteered || 0} hours</strong> and collected <strong className="text-white">120 kg</strong> of waste. Keep going!</p>
                                    <div className="flex gap-3 flex-wrap">
                                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
                                            <Flame size={16} className="text-orange-400" /> {streak}-Week Streak
                                        </div>
                                        <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl text-sm font-bold border border-white/10">
                                            <Trophy size={16} className="text-yellow-400" /> {CERTIFICATES.length} Certificates
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

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
                                    <h3 className="text-lg font-black text-slate-900 mb-1">My Activity</h3>
                                    <p className="text-sm text-slate-400 mb-6">Hours volunteered vs waste collected</p>
                                    <div className="h-52">
                                        {loading ? (
                                            <div className="h-full bg-slate-50 rounded-2xl flex items-center justify-center">
                                                <span className="text-slate-400 font-bold animate-pulse">Loading...</span>
                                            </div>
                                        ) : (
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={CHART_DATA} margin={{ top: 5, right: 5, left: -25, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="gh" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                        </linearGradient>
                                                        <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                                                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 700 }} dy={8} />
                                                    <YAxis hide />
                                                    <Tooltip contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", padding: 14 }} />
                                                    <Area type="monotone" dataKey="hours" name="Hours" stroke="#10b981" strokeWidth={2.5} fill="url(#gh)" />
                                                    <Area type="monotone" dataKey="waste" name="Waste (kg)" stroke="#6366f1" strokeWidth={2.5} fill="url(#gw)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
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
            <h1 className="text-2xl font-black">My Attendance</h1>
            <p className="text-slate-500 text-sm mt-1">Track your hours and attendance records.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
                { label: "Total Drives", value: ATTENDANCE.length, icon: Waves, color: "text-emerald-600", bg: "bg-emerald-50" },
                { label: "Hours Logged", value: totalHours, icon: Clock, color: "text-blue-600", bg: "bg-blue-50" },
                { label: "Points Earned", value: ATTENDANCE.reduce((s, a) => s + a.points, 0), icon: Star, color: "text-amber-600", bg: "bg-amber-50" },
                { label: "Pending", value: ATTENDANCE.filter((a) => a.status === "Pending").length, icon: ShieldCheck, color: "text-orange-600", bg: "bg-orange-50" },
            ].map((s, i) => (
                <div key={i} className="bg-white rounded-3xl border border-slate-100 p-5 shadow-sm">
                    <div className={`w-10 h-10 rounded-xl ${s.bg} ${s.color} flex items-center justify-center mb-3`}>
                        <s.icon size={18} />
                    </div>
                    <p className="text-2xl font-black text-slate-900">{s.value}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
            ))}
        </div>

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
                            <th className="p-4 text-left font-bold">Points</th>
                            <th className="p-4 text-left font-bold">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ATTENDANCE.map((item) => (
                            <tr key={item.id} className="border-t border-slate-50 hover:bg-slate-50 transition">
                                <td className="p-4 font-semibold text-slate-900">{item.drive}</td>
                                <td className="p-4 text-slate-500">{item.date}</td>
                                <td className="p-4 font-bold text-slate-700">{item.hours} hrs</td>
                                <td className="p-4">
                                    {item.points > 0 ? (
                                        <span className="text-amber-600 font-bold flex items-center gap-1">
                                            <Star size={13} />
                                            {item.points}
                                        </span>
                                    ) : (
                                        <span className="text-slate-300 font-bold">—</span>
                                    )}
                                </td>
                                <td className="p-4">
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${getStatusBadgeClass(item.status)}`}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
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
            {CERTIFICATES.map((cert) => (
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
                    <h2 className="text-2xl font-black">{user?.name || "Loading..."}</h2>
                    <p className="text-slate-400 text-sm">{user?.email || "Loading..."}</p>
                    <div className="flex items-center gap-1.5 mt-1">
                        <CheckCircle2 size={14} className="text-emerald-400" />
                        <span className="text-xs text-emerald-400 font-bold">Verified Volunteer</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {[
                    { label: "Drives", value: "8" },
                    { label: "Hours", value: "24" },
                    { label: "Points", value: "480" },
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
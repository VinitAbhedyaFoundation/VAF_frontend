"use client";

import React, { useEffect, useMemo, useState } from "react";
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
    Mail,
    Calendar,
    Droplets,
    Clock,
    TrendingUp,
    UserCircle,
    Plus,
    CheckCircle2,
    Leaf,
    Menu,
    X,
    Bell,
    ChevronRight,
    LogOut,
    Settings,
    Award,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- 1. TYPES & INTERFACES ---

type SectionId =
    | "overview"
    | "drives"
    | "attendance"
    | "volunteers"
    | "messages"
    | "settings";

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
    icon: React.ElementType;
    trend: string;
    trendValue: string;
    color: string;
    bgLight: string;
}

interface ChartDataPoint {
    name: string;
    waste: number;
    volunteers: number;
}

interface LeaderboardUser {
    name: string;
    kg: number;
    drives: number;
    rank: number;
}

interface Drive {
    id: string;
    title: string;
    location: string;
    date: string;
    status: "Active" | "Upcoming" | "Completed";
    volunteers: number;
    description: string;
}

interface AttendanceRecord {
    id: string;
    name: string;
    drive: string;
    hours: number;
    date: string;
    status: "Marked" | "Pending";
}

interface Volunteer {
    id: string;
    name: string;
    email: string;
    drives: number;
    status: "Approved" | "Pending";
}

interface MessageItem {
    id: string;
    title: string;
    content: string;
    date: string;
    status: "Sent" | "Draft";
}

// --- 2. MOCK DATA ---

const USERS = [
    { name: "Mayuresh K.", kg: 120, drives: 8 },
    { name: "Rohit S.", kg: 95, drives: 6 },
    { name: "Ankit P.", kg: 150, drives: 10 },
    { name: "Siddhesh R.", kg: 80, drives: 5 },
];

const NAV_ITEMS: NavItem[] = [
    { label: "Dashboard", icon: LayoutDashboard, id: "overview" },
    { label: "Drives", icon: Waves, id: "drives", badge: "3 Active" },
    { label: "Attendance", icon: ShieldCheck, id: "attendance" },
    { label: "Volunteers", icon: UserCircle, id: "volunteers" },
    { label: "Messages", icon: Mail, id: "messages", badge: "12 New" },
    { label: "Settings", icon: Settings, id: "settings" },
];

const METRICS: MetricData[] = [
    {
        id: "m1",
        label: "Drives Conducted",
        value: 124,
        icon: Calendar,
        trend: "+12%",
        trendValue: "vs last week",
        color: "text-emerald-600",
        bgLight: "bg-emerald-50",
    },
    {
        id: "m2",
        label: "Volunteer Hours",
        value: 850,
        icon: Clock,
        trend: "+5.4%",
        trendValue: "vs last week",
        color: "text-blue-600",
        bgLight: "bg-blue-50",
    },
    {
        id: "m3",
        label: "Waste Collected",
        value: 4200,
        icon: Droplets,
        trend: "+18.2%",
        trendValue: "vs last week",
        color: "text-purple-600",
        bgLight: "bg-purple-50",
    },
    {
        id: "m4",
        label: "Active Volunteers",
        value: 3500,
        icon: TrendingUp,
        trend: "#4",
        trendValue: "positions up",
        color: "text-orange-600",
        bgLight: "bg-orange-50",
    },
];

const CHART_DATA = [
    { name: "W1", waste: 120, volunteers: 120 },
    { name: "W2", waste: 180, volunteers: 80 },
    { name: "W3", waste: 150, volunteers: 95 },
    { name: "W4", waste: 240, volunteers: 100 },
];

const INITIAL_DRIVES: Drive[] = [
    {
        id: "d1",
        title: "Plogging Drive",
        location: "Aurangabad",
        date: "Sunday, 6 AM",
        status: "Active",
        volunteers: 25,
        description:
            "A weekly city cleanup drive focused on collecting litter while jogging through key public roads.",
    },
    {
        id: "d2",
        title: "Beach Cleanup",
        location: "Mumbai",
        date: "Saturday, 7 AM",
        status: "Upcoming",
        volunteers: 18,
        description:
            "A coastal cleanup campaign designed to reduce plastic waste and improve shoreline awareness.",
    },
    {
        id: "d3",
        title: "Tree Plantation",
        location: "Pune",
        date: "Last Week",
        status: "Completed",
        volunteers: 30,
        description:
            "A completed reforestation initiative with local volunteers planting native saplings in urban zones.",
    },
];

const INITIAL_ATTENDANCE: AttendanceRecord[] = [
    {
        id: "a1",
        name: "Mayuresh",
        drive: "Plogging Drive",
        hours: 2,
        date: "Today",
        status: "Marked",
    },
    {
        id: "a2",
        name: "Rohit",
        drive: "Beach Cleanup",
        hours: 3,
        date: "Yesterday",
        status: "Marked",
    },
    {
        id: "a3",
        name: "Ankit",
        drive: "Tree Plantation",
        hours: 1.5,
        date: "2 days ago",
        status: "Pending",
    },
];

const INITIAL_VOLUNTEERS: Volunteer[] = [
    {
        id: "v1",
        name: "Mayuresh",
        email: "mayuresh@gmail.com",
        drives: 8,
        status: "Approved",
    },
    {
        id: "v2",
        name: "Rohit",
        email: "rohit@gmail.com",
        drives: 5,
        status: "Approved",
    },
    {
        id: "v3",
        name: "Ankit",
        email: "ankit@gmail.com",
        drives: 2,
        status: "Pending",
    },
];

const INITIAL_MESSAGES: MessageItem[] = [
    {
        id: "msg1",
        title: "Sunday Drive Reminder",
        content: "Don’t forget the plogging drive this Sunday at 6 AM.",
        date: "Today",
        status: "Sent",
    },
    {
        id: "msg2",
        title: "New Initiative Launch",
        content: "We are launching Social Shelf this weekend.",
        date: "Yesterday",
        status: "Sent",
    },
    {
        id: "msg3",
        title: "Volunteer Meeting",
        content: "Internal discussion scheduled for next week.",
        date: "2 days ago",
        status: "Draft",
    },
];

// --- 3. UI UTILITIES ---

const getRankColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400";
    if (rank === 2) return "text-gray-300";
    if (rank === 3) return "text-orange-400";
    return "text-white";
};

const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case "Active":
        case "Approved":
        case "Marked":
        case "Sent":
        case "Confirmed":
            return "bg-green-100 text-green-700";
        case "Upcoming":
            return "bg-blue-100 text-blue-700";
        case "Pending":
        case "Draft":
            return "bg-orange-100 text-orange-700";
        case "Completed":
            return "bg-slate-100 text-slate-600";
        default:
            return "bg-slate-100 text-slate-600";
    }
};

const Badge: React.FC<{
    children: React.ReactNode;
    color?: "emerald" | "slate" | "orange";
}> = ({ children, color = "emerald" }) => {
    const colors = {
        emerald: "bg-emerald-100 text-emerald-700",
        slate: "bg-slate-100 text-slate-600",
        orange: "bg-orange-100 text-orange-700",
    };

    return (
        <span
            className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${colors[color]}`}
        >
            {children}
        </span>
    );
};

const SkeletonLine: React.FC<{
    width?: string;
    height?: string;
    className?: string;
}> = ({ width = "w-full", height = "h-4", className = "" }) => (
    <div
        className={`animate-pulse bg-slate-200 rounded ${width} ${height} ${className}`}
    />
);

// --- 4. SUB-COMPONENTS ---

const StatCard: React.FC<{ metric: MetricData; loading: boolean }> = ({
    metric,
    loading,
}) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
    >
        <div className="flex justify-between items-start mb-6">
            {loading ? (
                <div className="w-12 h-12 rounded-xl bg-slate-100" />
            ) : (
                <div className={`p-3 rounded-xl ${metric.bgLight} ${metric.color}`}>
                    <metric.icon size={24} />
                </div>
            )}
            {loading ? (
                <SkeletonLine width="w-16" height="h-6" />
            ) : (
                <Badge color="emerald">{metric.trend}</Badge>
            )}
        </div>

        <div>
            {loading ? (
                <SkeletonLine width="w-24" height="h-10" />
            ) : (
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter mb-1">
                    <CountUp end={metric.value} duration={2} />
                </h3>
            )}

            {loading ? (
                <SkeletonLine width="w-32" height="h-4" />
            ) : (
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {metric.label}
                </p>
            )}
        </div>
    </motion.div>
);

const ImpactChart: React.FC<{ loading: boolean }> = ({ loading }) => (
    <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm h-[500px] flex flex-col">
        <div className="flex justify-between items-center mb-10">
            <div>
                <h3 className="text-xl font-black text-slate-900">Weekly Velocity</h3>
                <p className="text-sm text-slate-400 font-medium mt-1">
                    Waste collection vs Volunteers
                </p>
            </div>

            <div className="flex gap-4">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-slate-600">
                        Waste (kg)
                    </span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span className="text-xs font-bold text-slate-600">Volunteers</span>
                </div>
            </div>
        </div>

        <div className="flex-1 w-full">
            {loading ? (
                <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-2xl">
                    <span className="text-slate-400 font-bold animate-pulse">
                        Loading Chart Data...
                    </span>
                </div>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={CHART_DATA}
                        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorWaste" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                            </linearGradient>

                            <linearGradient id="colorVolunteers" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2} />
                                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#f1f5f9"
                        />

                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 700 }}
                            dy={10}
                        />

                        <YAxis />

                        <Tooltip
                            contentStyle={{
                                borderRadius: "16px",
                                border: "none",
                                padding: "20px",
                                boxShadow: "0 10px 30px -5px rgba(0, 0, 0, 0.1)",
                            }}
                            labelStyle={{
                                color: "#1e293b",
                                fontWeight: 800,
                                marginBottom: 5,
                            }}
                        />

                        {/* WASTE */}
                        <Area
                            type="monotone"
                            dataKey="waste"
                            name="Waste Collected (kg)"
                            stroke="#10b981"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorWaste)"
                        />

                        {/* VOLUNTEERS */}
                        <Area
                            type="monotone"
                            dataKey="volunteers"
                            name="Volunteers"
                            stroke="#6366f1"
                            strokeWidth={3}
                            fillOpacity={1}
                            fill="url(#colorVolunteers)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    </div>
);

const UserProfile: React.FC<{
    loading: boolean;
    rankedUsers: LeaderboardUser[];
}> = ({ loading, rankedUsers }) => (
    <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden shadow-2xl shadow-slate-200 h-full">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -ml-16 -mb-16" />

        <div className="relative z-10 flex flex-col items-center">
            <div className="flex justify-center mb-8">
                {loading ? (
                    <div className="w-28 h-28 rounded-full bg-slate-800" />
                ) : (
                    <div className="relative">
                        <div className="w-28 h-28 bg-gradient-to-br from-slate-700 to-slate-800 rounded-full p-1 border-2 border-slate-700 shadow-xl">
                            <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                                <UserCircle size={64} className="text-slate-400" />
                            </div>
                        </div>
                        <div className="absolute bottom-1 right-1 bg-emerald-500 text-white p-2 rounded-full shadow-lg border-4 border-slate-900">
                            <CheckCircle2 size={16} />
                        </div>
                    </div>
                )}
            </div>

            <div className="w-full space-y-4 mb-8">
                <div className="text-center">
                    <h2 className="text-2xl font-black tracking-tight">Leaderboard</h2>
                    <p className="text-slate-400 text-xs uppercase tracking-widest">
                        Top Contributors
                    </p>
                </div>

                {loading ? (
                    <>
                        <SkeletonLine width="w-full" height="h-12" />
                        <SkeletonLine width="w-full" height="h-12" />
                        <SkeletonLine width="w-full" height="h-12" />
                    </>
                ) : (
                    rankedUsers.map((user) => (
                        <div
                            key={user.name}
                            className="flex items-center justify-between px-4 py-3 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition"
                        >
                            <div className="flex items-center gap-3">
                                <span
                                    className={`text-lg font-black ${getRankColor(user.rank)}`}
                                >
                                    #{user.rank}
                                </span>

                                <div>
                                    <p className="font-bold">{user.name}</p>
                                    <p className="text-xs text-slate-400 uppercase tracking-widest">
                                        {user.drives} Drives
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-lg font-black">{user.kg} kg</p>
                                <p className="text-xs text-slate-500">Collected</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    </div>
);

const DetailPanel: React.FC<{
    title: string;
    subtitle: string;
    icon: React.ElementType;
    children: React.ReactNode;
}> = ({ title, subtitle, icon: Icon, children }) => (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 lg:p-8 shadow-sm mb-8">
        <div className="flex items-start gap-4 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Icon size={22} />
            </div>
            <div>
                <h2 className="text-xl font-black text-slate-900">{title}</h2>
                <p className="text-sm text-slate-500 mt-1">{subtitle}</p>
            </div>
        </div>
        {children}
    </div>
);

// --- 5. MAIN LAYOUT ---

export default function AdvancedDashboard() {
    const [loading, setLoading] = useState<boolean>(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
    const [activeNav, setActiveNav] = useState<SectionId>("overview");

    const [drives, setDrives] = useState<Drive[]>(INITIAL_DRIVES);
    const [attendance] = useState<AttendanceRecord[]>(INITIAL_ATTENDANCE);
    const [volunteers, setVolunteers] =
        useState<Volunteer[]>(INITIAL_VOLUNTEERS);
    const [messages] = useState<MessageItem[]>(INITIAL_MESSAGES);

    const [showDriveModal, setShowDriveModal] = useState<boolean>(false);
    const [driveForm, setDriveForm] = useState({ title: "", date: "", type: "" });

    const [drivePanelMode, setDrivePanelMode] = useState<"create" | "details">(
        "details"
    );
    const [attendancePanelMode, setAttendancePanelMode] = useState<
        "mark" | "details"
    >("details");
    const [volunteerPanelMode, setVolunteerPanelMode] = useState<
        "add" | "details"
    >("details");
    const [messagePanelMode, setMessagePanelMode] = useState<
        "compose" | "details"
    >("details");

    const [selectedDrive, setSelectedDrive] = useState<Drive | null>(
        INITIAL_DRIVES[0]
    );
    const [selectedAttendance, setSelectedAttendance] =
        useState<AttendanceRecord | null>(INITIAL_ATTENDANCE[0]);
    const [selectedVolunteer, setSelectedVolunteer] = useState<Volunteer | null>(
        INITIAL_VOLUNTEERS[0]
    );
    const [selectedMessage, setSelectedMessage] = useState<MessageItem | null>(
        INITIAL_MESSAGES[0]
    );

    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    const rankedUsers = useMemo<LeaderboardUser[]>(() => {
        return [...USERS]
            .sort((a, b) => b.kg - a.kg || b.drives - a.drives)
            .map((user, index) => ({
                ...user,
                rank: index + 1,
            }));
    }, []);

    const sectionTitleMap: Record<SectionId, string> = {
        overview: "Dashboard Overview",
        drives: "Drives",
        attendance: "Attendance",
        volunteers: "Volunteers",
        messages: "Messages",
        settings: "Settings",
    };

    const goToSection = (section: SectionId, toastMessage?: string) => {
        setActiveNav(section);
        setIsMobileMenuOpen(false);

        const pageTop = document.getElementById("dashboard-top");
        pageTop?.scrollIntoView({ behavior: "smooth", block: "start" });

        if (toastMessage) {
            toast.success(toastMessage);
        }
    };

    const handleLogout = () => {
    localStorage.removeItem("user");

    toast.dismiss(); // 💥 clears old toasts

    toast.success("Logged out successfully", {
        duration: 2000,
    });

    setTimeout(() => {
        navigate("/login");
    }, 500); // small delay so toast renders properly
};

    const openDriveDetails = (drive: Drive) => {
        setDrivePanelMode("details");
        setSelectedDrive(drive);
        goToSection("drives", `Opened ${drive.title}`);
    };

    const openAttendanceDetails = (record: AttendanceRecord) => {
        setAttendancePanelMode("details");
        setSelectedAttendance(record);
        goToSection("attendance", `Opened ${record.name}'s attendance`);
    };

    const openVolunteerDetails = (volunteer: Volunteer) => {
        setVolunteerPanelMode("details");
        setSelectedVolunteer(volunteer);
        goToSection("volunteers", `Opened ${volunteer.name}'s profile`);
    };

    const openMessageDetails = (message: MessageItem) => {
        setMessagePanelMode("details");
        setSelectedMessage(message);
        goToSection("messages", `Opened "${message.title}"`);
    };

    const handleApproveVolunteer = (volunteer: Volunteer) => {
        const updatedVolunteer = { ...volunteer, status: "Approved" as const };

        setVolunteers((prev) =>
            prev.map((item) =>
                item.id === volunteer.id ? updatedVolunteer : item
            )
        );
        setSelectedVolunteer(updatedVolunteer);
        setVolunteerPanelMode("details");
        goToSection("volunteers", `${volunteer.name} approved successfully`);
    };

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-emerald-100 overflow-hidden">
            <Toaster
  position="bottom-center"
  toastOptions={{
    duration: 2000,
  }}
/>

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-40 xl:hidden"
                        />
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 left-0 h-full w-80 bg-white z-50 xl:hidden p-8 shadow-2xl"
                        >
                            <div className="flex items-center justify-between mb-12">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-emerald-600 rounded-lg rotate-12" />
                                    <h2 className="text-xl font-black tracking-tighter">VAF</h2>
                                </div>

                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 bg-slate-100 rounded-full"
                                    aria-label="Close menu"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <nav className="space-y-2">
                                {NAV_ITEMS.map((item) => (
                                    <button
                                        key={item.id}
                                        onClick={() => goToSection(item.id)}
                                        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${activeNav === item.id
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "text-slate-500 hover:bg-slate-50"
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon size={20} />
                                            {item.label}
                                        </div>
                                        {item.badge && (
                                            <span className="text-[10px] bg-slate-200 px-2 py-0.5 rounded-full">
                                                {item.badge}
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <aside className="w-80 border-r border-slate-200 bg-white p-8 hidden xl:flex flex-col sticky top-0 h-screen">
                <div className="flex items-center gap-2 mb-12">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl rotate-12 flex items-center justify-center shadow-lg shadow-emerald-200">
                        <Leaf className="text-white -rotate-12" size={20} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tighter text-emerald-950">
                            VAF
                        </h2>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest -mt-1">
                            Portal
                        </p>
                    </div>
                </div>

                <nav className="space-y-2 flex-1">
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
                                <item.icon size={20} />
                                {item.label}
                            </div>
                            {item.badge && (
                                <span className="text-[10px] opacity-60">{item.badge}</span>
                            )}
                        </button>
                    ))}
                </nav>

                <div className="bg-slate-950 p-6 rounded-[2rem] text-white relative overflow-hidden mt-auto">
                    <div
                        className="absolute -right-4 -bottom-4 text-emerald-500/20 rotate-45"
                        style={{ width: 120, height: 120 }}
                    >
                        <Leaf size={120} />
                    </div>
                    <div className="relative z-10">
                        <p className="text-[10px] font-bold text-emerald-400 uppercase mb-2">
                            Next Milestone
                        </p>
                        <h4 className="text-lg font-bold mb-4">Platinum Status</h4>
                        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: "65%" }}
                                className="h-full bg-emerald-400"
                            />
                        </div>
                        <p className="text-[10px] mt-3 text-slate-400 font-medium">
                            14/20 Sundays Completed
                        </p>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-12 flex-shrink-0 z-30">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsMobileMenuOpen(true)}
                            className="xl:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu size={20} className="text-slate-600" />
                        </button>

                        <div>
                            <p className="text-xs font-bold text-emerald-600 uppercase tracking-[0.2em]">
                                Volunteer Admin
                            </p>
                            <h1 className="text-xl lg:text-2xl font-black tracking-tight">
                                {sectionTitleMap[activeNav]}
                            </h1>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => {
                                setAttendancePanelMode("mark");
                                setSelectedAttendance(attendance[0] ?? null);
                                goToSection("attendance", "Opening attendance actions");
                            }}
                            className="hidden sm:flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                        >
                            <Plus size={18} />
                            Quick Action
                        </button>

                        <div className="h-8 w-px bg-slate-200 mx-1" />

                        <button
                            onClick={() => goToSection("messages", "Opening messages")}
                            className="relative p-2 hover:bg-slate-100 rounded-full transition-colors"
                            aria-label="Notifications"
                        >
                            <Bell size={20} className="text-slate-600" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        </button>

                        <button
                            onClick={() => goToSection("settings", "Opening settings")}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            aria-label="Settings"
                        >
                            <Settings size={20} className="text-slate-600" />
                        </button>

                        <button
                            onClick={handleLogout}
                            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                            aria-label="Logout"
                        >
                            <LogOut size={20} className="text-slate-600" />
                        </button>
                    </div>
                </header>

                <div
                    id="dashboard-top"
                    className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar"
                >
                    {activeNav === "overview" && (
                        <>
                            <section className="mb-8">
                                <h1 className="text-3xl font-bold">Dashboard Overview</h1>
                                <p className="text-slate-500 mt-2">
                                    Track drive performance, volunteer engagement, and impact
                                    metrics in one place.
                                </p>
                            </section>

                            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                                {METRICS.map((metric) => (
                                    <StatCard key={metric.id} metric={metric} loading={loading} />
                                ))}
                            </section>

                            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <ImpactChart loading={loading} />
                                </div>
                                <UserProfile loading={loading} rankedUsers={rankedUsers} />
                            </section>
                        </>
                    )}

                    {activeNav === "drives" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Drives</h1>

                                <>
                                    <button
                                        onClick={() => setShowDriveModal(true)}
                                        className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
                                    >
                                        + Create Drive
                                    </button>

                                    <AnimatePresence>
                                        {showDriveModal && (
                                            <>
                                                {/* BACKDROP */}
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="fixed inset-0 bg-black/40 z-40"
                                                    onClick={() => setShowDriveModal(false)}
                                                />

                                                {/* MODAL */}
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.9, y: 40 }}
                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                    exit={{ opacity: 0, scale: 0.9, y: 40 }}
                                                    transition={{ duration: 0.25 }}
                                                    className="fixed inset-0 flex items-center justify-center z-50 px-4"
                                                >
                                                    <div className="bg-white w-full max-w-md p-6 rounded-2xl shadow-xl">

                                                        <h2 className="text-xl font-bold mb-4">Create Drive</h2>

                                                        {/* TITLE */}
                                                        <input
                                                            type="text"
                                                            placeholder="Drive Title"
                                                            className="w-full border px-3 py-2 rounded-lg mb-3"
                                                            value={driveForm.title}
                                                            onChange={(e) =>
                                                                setDriveForm({ ...driveForm, title: e.target.value })
                                                            }
                                                        />

                                                        {/* DATE */}
                                                        <input
                                                            type="date"
                                                            className="w-full border px-3 py-2 rounded-lg mb-3"
                                                            value={driveForm.date}
                                                            onChange={(e) =>
                                                                setDriveForm({ ...driveForm, date: e.target.value })
                                                            }
                                                        />

                                                        {/* TYPE */}
                                                        <select
                                                            className="w-full border px-3 py-2 rounded-lg mb-4"
                                                            value={driveForm.type}
                                                            onChange={(e) =>
                                                                setDriveForm({ ...driveForm, type: e.target.value })
                                                            }
                                                        >
                                                            <option value="">Select Drive Type</option>
                                                            <option>Weekly Cleanup Drive</option>
                                                            <option>Blood Donation Drive</option>
                                                            <option>Mental Health Drive</option>
                                                            <option>Cloth Donation</option>
                                                            <option>Food Donation</option>
                                                        </select>

                                                        {/* ACTIONS */}
                                                        <div className="flex justify-end gap-3">
                                                            <button
                                                                onClick={() => setShowDriveModal(false)}
                                                                className="px-4 py-2 text-sm bg-gray-200 rounded-lg"
                                                            >
                                                                Cancel
                                                            </button>

                                                            <button
                                                                onClick={() => {
                                                                    if (!driveForm.title || !driveForm.date || !driveForm.type) {
                                                                        toast.error("Fill all fields");
                                                                        return;
                                                                    }

                                                                    console.log("Drive Created:", driveForm);
                                                                    toast.success("Drive created 🚀");

                                                                    setShowDriveModal(false);
                                                                    setDriveForm({ title: "", date: "", type: "" });
                                                                }}
                                                                className="px-4 py-2 text-sm bg-emerald-600 text-white rounded-lg"
                                                            >
                                                                Create
                                                            </button>
                                                        </div>

                                                    </div>
                                                </motion.div>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </>
                            </div>

                            {drivePanelMode === "create" ? (
                                <DetailPanel
                                    title="Create Drive"
                                    subtitle="This action panel is where a new cleanup drive flow can begin."
                                    icon={Plus}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Suggested Title
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Sunday Riverfront Cleanup
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Preferred Location
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Riverside Walk, Ward 3
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Next Step
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Add volunteers and confirm schedule
                                            </p>
                                        </div>
                                    </div>
                                </DetailPanel>
                            ) : selectedDrive ? (
                                <DetailPanel
                                    title={selectedDrive.title}
                                    subtitle={`${selectedDrive.location} • ${selectedDrive.date}`}
                                    icon={Waves}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Status
                                            </p>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeClass(
                                                    selectedDrive.status
                                                )}`}
                                            >
                                                {selectedDrive.status}
                                            </span>
                                        </div>

                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Volunteers
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                {selectedDrive.volunteers} joined
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Summary
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                {selectedDrive.description}
                                            </p>
                                        </div>
                                    </div>
                                </DetailPanel>
                            ) : null}

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {drives.map((drive) => (
                                    <div
                                        key={drive.id}
                                        className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition"
                                    >
                                        <div className="flex justify-between items-center mb-3">
                                            <h2 className="font-semibold text-lg">{drive.title}</h2>

                                            <span
                                                className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeClass(
                                                    drive.status
                                                )}`}
                                            >
                                                {drive.status}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-500 mb-1">
                                            📍 {drive.location}
                                        </p>
                                        <p className="text-sm text-gray-500 mb-3">
                                            🕒 {drive.date}
                                        </p>

                                        <div className="flex justify-between items-center mt-4">
                                            <span className="text-sm font-medium text-gray-600">
                                                {drive.volunteers} Volunteers
                                            </span>

                                            <button
                                                onClick={() => openDriveDetails(drive)}
                                                className="text-emerald-600 text-sm font-semibold inline-flex items-center gap-1 hover:text-emerald-700"
                                            >
                                                View <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeNav === "attendance" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Attendance</h1>

                                <button
                                    onClick={() => {
                                        setAttendancePanelMode("mark");
                                        setSelectedAttendance(attendance[0] ?? null);
                                        toast.success("Opening attendance marker");
                                    }}
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
                                >
                                    + Mark Attendance
                                </button>
                            </div>

                            {attendancePanelMode === "mark" ? (
                                <DetailPanel
                                    title="Mark Attendance"
                                    subtitle="Quick attendance workflow for today’s drive."
                                    icon={ShieldCheck}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Default Drive
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Plogging Drive
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Batch Action
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Mark checked-in volunteers
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Pending Records
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                {
                                                    attendance.filter((item) => item.status === "Pending")
                                                        .length
                                                }{" "}
                                                volunteers pending
                                            </p>
                                        </div>
                                    </div>
                                </DetailPanel>
                            ) : selectedAttendance ? (
                                <DetailPanel
                                    title={selectedAttendance.name}
                                    subtitle={`${selectedAttendance.drive} • ${selectedAttendance.date}`}
                                    icon={Clock}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Hours Logged
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                {selectedAttendance.hours} hrs
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Status
                                            </p>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeClass(
                                                    selectedAttendance.status
                                                )}`}
                                            >
                                                {selectedAttendance.status}
                                            </span>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Last Activity
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Record reviewed for coordinator approval
                                            </p>
                                        </div>
                                    </div>
                                </DetailPanel>
                            ) : null}

                            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-600 text-left">
                                        <tr>
                                            <th className="p-4">Volunteer</th>
                                            <th className="p-4">Drive</th>
                                            <th className="p-4">Hours</th>
                                            <th className="p-4">Date</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {attendance.map((item) => (
                                            <tr
                                                key={item.id}
                                                className="border-t hover:bg-gray-50 transition"
                                            >
                                                <td className="p-4 font-medium">{item.name}</td>
                                                <td className="p-4">{item.drive}</td>
                                                <td className="p-4">{item.hours} hrs</td>
                                                <td className="p-4 text-gray-500">{item.date}</td>
                                                <td className="p-4">
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeClass(
                                                            item.status
                                                        )}`}
                                                    >
                                                        {item.status}
                                                    </span>
                                                </td>
                                                <td className="p-4">
                                                    <button
                                                        onClick={() => openAttendanceDetails(item)}
                                                        className="text-emerald-600 font-semibold text-sm inline-flex items-center gap-1 hover:text-emerald-700"
                                                    >
                                                        Open <ChevronRight size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeNav === "volunteers" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Volunteers</h1>

                                <button
                                    onClick={() => {
                                        setVolunteerPanelMode("add");
                                        setSelectedVolunteer(null);
                                        toast.success("Opening volunteer onboarding panel");
                                    }}
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
                                >
                                    + Add Volunteer
                                </button>
                            </div>

                            {volunteerPanelMode === "add" ? (
                                <DetailPanel
                                    title="Add Volunteer"
                                    subtitle="Use this section to onboard new community members."
                                    icon={UserCircle}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Suggested Role
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Field Volunteer
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Recommended Access
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Attendance + Drive participation
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Follow-up
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Send welcome message after approval
                                            </p>
                                        </div>
                                    </div>
                                </DetailPanel>
                            ) : selectedVolunteer ? (
                                <DetailPanel
                                    title={selectedVolunteer.name}
                                    subtitle={selectedVolunteer.email}
                                    icon={UserCircle}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Status
                                            </p>
                                            <span
                                                className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeClass(
                                                    selectedVolunteer.status
                                                )}`}
                                            >
                                                {selectedVolunteer.status}
                                            </span>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Drives Joined
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                {selectedVolunteer.drives} drives
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Next Step
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                {selectedVolunteer.status === "Pending"
                                                    ? "Approve and assign upcoming drive"
                                                    : "Review performance and attendance"}
                                            </p>
                                        </div>
                                    </div>
                                </DetailPanel>
                            ) : null}

                            <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 text-gray-600 text-left">
                                        <tr>
                                            <th className="p-4">Name</th>
                                            <th className="p-4">Email</th>
                                            <th className="p-4">Drives</th>
                                            <th className="p-4">Status</th>
                                            <th className="p-4">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {volunteers.map((user) => (
                                            <tr
                                                key={user.id}
                                                className="border-t hover:bg-gray-50 transition"
                                            >
                                                <td className="p-4 font-medium">{user.name}</td>

                                                <td className="p-4 text-gray-500">{user.email}</td>

                                                <td className="p-4">{user.drives}</td>

                                                <td className="p-4">
                                                    <span
                                                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeClass(
                                                            user.status
                                                        )}`}
                                                    >
                                                        {user.status}
                                                    </span>
                                                </td>

                                                <td className="p-4">
                                                    {user.status === "Pending" ? (
                                                        <button
                                                            onClick={() => handleApproveVolunteer(user)}
                                                            className="text-emerald-600 font-semibold text-sm hover:text-emerald-700"
                                                        >
                                                            Approve
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => openVolunteerDetails(user)}
                                                            className="text-blue-600 font-semibold text-sm hover:text-blue-700"
                                                        >
                                                            View
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}

                    {activeNav === "messages" && (
                        <div>
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-bold">Messages</h1>

                                <button
                                    onClick={() => {
                                        setMessagePanelMode("compose");
                                        setSelectedMessage(null);
                                        toast.success("Opening message composer");
                                    }}
                                    className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-700 transition"
                                >
                                    + New Message
                                </button>
                            </div>

                            {messagePanelMode === "compose" ? (
                                <DetailPanel
                                    title="Compose Message"
                                    subtitle="Prepare updates for volunteers, coordinators, or drive leads."
                                    icon={Mail}
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Audience
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                All active volunteers
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Suggested Topic
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Upcoming Sunday drive reminder
                                            </p>
                                        </div>
                                        <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
                                            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold mb-2">
                                                Delivery Mode
                                            </p>
                                            <p className="font-semibold text-slate-900">
                                                Save draft or send instantly
                                            </p>
                                        </div>
                                    </div>
                                </DetailPanel>
                            ) : selectedMessage ? (
                                <DetailPanel
                                    title={selectedMessage.title}
                                    subtitle={`${selectedMessage.date} • ${selectedMessage.status}`}
                                    icon={Mail}
                                >
                                    <div className="rounded-2xl bg-slate-50 p-5 border border-slate-200">
                                        <p className="text-sm text-slate-700 leading-7">
                                            {selectedMessage.content}
                                        </p>
                                    </div>
                                </DetailPanel>
                            ) : null}

                            <div className="space-y-4">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <h2 className="font-semibold text-lg">{msg.title}</h2>

                                            <span
                                                className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusBadgeClass(
                                                    msg.status
                                                )}`}
                                            >
                                                {msg.status}
                                            </span>
                                        </div>

                                        <p className="text-sm text-gray-500 mb-3">
                                            {msg.content}
                                        </p>

                                        <div className="flex justify-between items-center">
                                            <span className="text-xs text-gray-400">{msg.date}</span>

                                            <button
                                                onClick={() => openMessageDetails(msg)}
                                                className="text-emerald-600 text-sm font-semibold inline-flex items-center gap-1 hover:text-emerald-700"
                                            >
                                                View <ChevronRight size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeNav === "settings" && (
                        <div>
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold">Settings</h1>
                                <p className="text-slate-500 mt-2">
                                    Manage account access, notification behavior, and platform
                                    preferences.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                                        <Settings size={22} />
                                    </div>
                                    <h2 className="text-lg font-black mb-2">Portal Preferences</h2>
                                    <p className="text-sm text-slate-500">
                                        Notification routing, default landing section, and action
                                        shortcuts can be managed here.
                                    </p>
                                </div>

                                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                                        <Bell size={22} />
                                    </div>
                                    <h2 className="text-lg font-black mb-2">Notification Center</h2>
                                    <p className="text-sm text-slate-500">
                                        Review message alerts and routing flows from the Messages
                                        section.
                                    </p>
                                </div>

                                <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
                                        <Award size={22} />
                                    </div>
                                    <h2 className="text-lg font-black mb-2">Milestones & Access</h2>
                                    <p className="text-sm text-slate-500">
                                        Track account achievements and coordinator privileges in one
                                        place.
                                    </p>
                                </div>
                            </div>

                            <div className="mt-8 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div>
                                        <h3 className="text-lg font-black">Account Actions</h3>
                                        <p className="text-sm text-slate-500 mt-1">
                                            Use the buttons below to jump to your dashboard or exit
                                            the portal.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button
                                            onClick={() =>
                                                goToSection("overview", "Returned to dashboard")
                                            }
                                            className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                                        >
                                            Back to Dashboard
                                        </button>

                                        <button
                                            onClick={handleLogout}
                                            className="px-4 py-2 rounded-xl bg-red-600 text-white font-semibold hover:bg-red-700 transition"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
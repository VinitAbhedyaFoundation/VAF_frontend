import type { LevelInfo } from "@/components/user/utils/level";
import type { SectionId, User } from "@/types/user";
import { AnimatePresence, motion } from "framer-motion";

import {
    Leaf,
    UserCircle,
    X,
} from "lucide-react";

import { NAV_ITEMS } from "@/constants/user";

interface SidebarProps {
    activeNav: SectionId;
    goToSection: (id: SectionId) => void;

    isMobileMenuOpen: boolean;
    setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;

    user: User | null;

    streak: number;
    levelInfo: LevelInfo;
    levelStyles: Record<string, string>;

    drives: number;
}

const Sidebar: React.FC<SidebarProps> = ({
    activeNav,
    goToSection,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    user,
    streak,
    levelInfo,
    levelStyles,
    drives,
}) => {
    const progress =
        levelInfo.next === null
            ? 100
            : ((drives - levelInfo.currentTarget) /
                (levelInfo.nextTarget - levelInfo.currentTarget)) *
            100;

    const drivesRemaining =
        levelInfo.next === null
            ? 0
            : levelInfo.nextTarget - drives;
    return (
        <>
            {/* ── MOBILE SIDEBAR ── */}
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
                                    <span className="text-xl font-black tracking-tighter text-emerald-950">
                                        VAF
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="p-2 bg-slate-100 rounded-full"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                            <nav className="space-y-1">
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
                                            <item.icon size={18} />
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
            {/* ── DESKTOP SIDEBAR ── */}

            <aside className="w-72 border-r border-slate-200 bg-white p-8 hidden xl:flex flex-col sticky top-0 h-screen overflow-y-auto">
                <div className="flex items-center gap-2 mb-10">
                    <div className="w-10 h-10 bg-emerald-600 rounded-xl rotate-12 flex items-center justify-center shadow-lg shadow-emerald-200">
                        <Leaf className="text-white -rotate-12" size={20} />
                    </div>
                    <div>
                        <h2 className="text-2xl font-black tracking-tighter text-emerald-950">
                            VAF
                        </h2>
                        <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest -mt-1">
                            Volunteer Portal
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3 mb-8 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="w-11 h-11 bg-emerald-100 rounded-full flex items-center justify-center">
                        <UserCircle size={28} className="text-emerald-600" />
                    </div>
                    <div>
                        <p className="font-black text-sm text-slate-900">
                            {user?.name || "Loading..."}
                        </p>
                        <p className="text-[11px] text-emerald-600 font-bold">
                            🔥{" "}
                            {streak > 0 ? `${streak}-week streak` : "No streak yet"}
                        </p>
                    </div>
                </div>

                <nav className="space-y-1">
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
                                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${activeNav === item.id
                                        ? "bg-white/20 text-white"
                                        : "bg-emerald-100 text-emerald-700"
                                        }`}
                                >
                                    {item.badge}
                                </span>
                            )}
                        </button>
                    ))}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
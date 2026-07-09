import type {
    FC,
    Dispatch,
    SetStateAction,
} from "react";

import {
    Bell,
    Calendar,
    LogOut,
    Menu,
} from "lucide-react";

import type { SectionId, Notification } from "@/types/user";

interface HeaderProps {
    title: string;

    notifications: Notification[];
    openNotif: boolean;

    setIsMobileMenuOpen: Dispatch<
        SetStateAction<boolean>
    >;

    handleBellClick: () => void;
    handleLogout: () => void;
    goToSection: (id: SectionId) => void;
}

const Header: FC<HeaderProps> = ({
    title,
    notifications,
    openNotif,
    setIsMobileMenuOpen,
    handleBellClick,
    handleLogout,
    goToSection,
}) => {
    return (
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 flex-shrink-0 z-30">
            <div className="flex items-center gap-4">
                <button
                    onClick={() => setIsMobileMenuOpen(true)}
                    className="xl:hidden p-2 hover:bg-slate-100 rounded-full"
                    aria-label="Open menu"
                >
                    <Menu size={20} className="text-slate-600" />
                </button>
                <div>
                    <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.2em]">
                        Volunteer
                    </p>
                    <h1 className="text-xl font-black tracking-tight">
                        {title}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={() => goToSection("upcoming")}
                    className="hidden sm:flex items-center gap-2 bg-emerald-600 text-white px-4 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                >
                    <Calendar size={16} /> Find Drives
                </button>
                <div className="h-8 w-px bg-slate-200" />

                {/* NOTIFICATIONS */}
                <div className="relative notification-wrapper">
                    <button
                        onClick={handleBellClick}
                        className="relative p-2 hover:bg-slate-100 rounded-full"
                    >
                        <Bell size={20} className="text-slate-600" />
                        {notifications.length > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
                        )}
                    </button>
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
                                                {n.createdAt
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

                <button
                    onClick={handleLogout}
                    className="p-2 hover:bg-slate-100 rounded-full"
                    aria-label="Logout"
                >
                    <LogOut size={20} className="text-slate-600" />
                </button>
            </div>
        </header>
    );
};
export default Header;
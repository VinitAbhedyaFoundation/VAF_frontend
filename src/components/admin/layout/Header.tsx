import { Bell, LogOut, Menu, Settings } from "lucide-react";
import type { SectionId } from "../../../types/admin";

interface HeaderProps {
    activeNav: SectionId;
    sectionTitle: Record<SectionId, string>;
    goTo: (section: SectionId) => void;
    handleLogout: () => void;
    onOpenMobileMenu: () => void;
}

export default function Header({
    activeNav,
    sectionTitle,
    goTo,
    handleLogout,
    onOpenMobileMenu,
}: HeaderProps) {
    return (
        <header className="h-20 themed-header backdrop-blur-md border-b themed-border flex items-center justify-between px-6 lg:px-12 flex-shrink-0 z-30">

            <div className="flex items-center gap-4">
                <button
                    onClick={onOpenMobileMenu}
                    className="xl:hidden p-2 themed-hover rounded-full"
                >
                    <Menu size={20} className="themed-secondary" />
                </button>

                <div>
                    <p className="text-xs font-bold accent-text uppercase tracking-[0.2em]">
                        Volunteer Admin
                    </p>

                    <h1 className="text-xl lg:text-2xl font-black tracking-tight themed-text">
                        {sectionTitle[activeNav]}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5" />

                <div
                    className="h-8 w-px"
                    style={{ background: "var(--border-color)" }}
                />

                <button
                    onClick={() => goTo("messages")}
                    className="relative p-2 themed-hover rounded-full transition"
                >
                    <Bell size={20} className="themed-secondary" />
                </button>

                <button
                    onClick={() => goTo("settings")}
                    className="p-2 themed-hover rounded-full transition"
                >
                    <Settings size={20} className="themed-secondary" />
                </button>

                <button
                    onClick={handleLogout}
                    className="p-2 themed-hover rounded-full transition"
                >
                    <LogOut size={20} className="themed-secondary" />
                </button>
            </div>

        </header>
    );
}
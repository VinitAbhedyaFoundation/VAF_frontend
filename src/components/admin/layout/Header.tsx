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
        <header className="min-h-20 h-auto themed-header backdrop-blur-md border-b themed-border flex items-center justify-between px-4 sm:px-6 lg:px-12 py-3 flex-shrink-0 z-30">
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                <button
                    type="button"
                    onClick={onOpenMobileMenu}
                    className="xl:hidden p-2 themed-hover rounded-full flex-shrink-0"
                    aria-label="Open menu"
                >
                    <Menu
                        size={20}
                        className="themed-secondary"
                        aria-hidden="true"
                    />
                </button>

                <div className="min-w-0">
                    <p className="text-[10px] sm:text-xs font-bold accent-text uppercase tracking-[0.15em] sm:tracking-[0.2em] leading-tight">
                        Volunteer Admin
                    </p>

                    <h1 className="text-lg sm:text-xl lg:text-2xl font-black tracking-tight themed-text leading-tight">
                        {sectionTitle[activeNav]}
                    </h1>
                </div>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5" />

                <div
                    className="h-8 w-px hidden sm:block"
                    style={{ background: "var(--border-color)" }}
                />

                <button
                    type="button"
                    onClick={() => goTo("messages")}
                    className="relative p-2 themed-hover rounded-full transition"
                    aria-label="Messages"
                >
                    <Bell
                        size={20}
                        className="themed-secondary"
                        aria-hidden="true"
                    />
                </button>

                <button
                    type="button"
                    onClick={() => goTo("settings")}
                    className="p-2 themed-hover rounded-full transition"
                    aria-label="Settings"
                >
                    <Settings
                        size={20}
                        className="themed-secondary"
                        aria-hidden="true"
                    />
                </button>

                <button
                    type="button"
                    onClick={handleLogout}
                    className="p-2 themed-hover rounded-full transition"
                    aria-label="Logout"
                >
                    <LogOut
                        size={20}
                        className="themed-secondary"
                        aria-hidden="true"
                    />
                </button>
            </div>
        </header>
    );
}
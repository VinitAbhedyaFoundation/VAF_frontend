"use client";

import { useMemo, useState } from "react";
import type { FC } from "react";
import type { UpcomingDrivesProps } from "@/types/user";
import { motion } from "framer-motion";

import {
    Calendar,
    Clock,
    MapPin,
    Search,
    Users,
} from "lucide-react";

import DriveActionButton from "../common/DriveActionButton";

const UpcomingDrives: FC<UpcomingDrivesProps> = ({
    upcomingDrives,
    actionLoadingId,
    getParticipation,
    handleJoin,
    handleMarkAttendance,
}) => {
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("all");

    const locations = useMemo(
        () => Array.from(new Set(upcomingDrives.map((d) => d.location))),
        [upcomingDrives]
    );

    const filteredDrives = useMemo(() => {
        return upcomingDrives.filter((drive) => {
            const matchesQuery = drive.title
                .toLowerCase()
                .includes(query.trim().toLowerCase());
            const matchesLocation =
                location === "all" || drive.location === location;
            return matchesQuery && matchesLocation;
        });
    }, [upcomingDrives, query, location]);

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black">Upcoming Drives</h1>
                <p className="text-slate-500 text-sm mt-1">
                    Find and join drives near you. Make an impact this week.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search
                        size={16}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search drives..."
                        className="w-full rounded-2xl border border-slate-200 pl-11 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                </div>

                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                    <option value="all">All Locations</option>
                    {locations.map((loc) => (
                        <option key={loc} value={loc}>
                            {loc}
                        </option>
                    ))}
                </select>
            </div>

            {filteredDrives.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400">
                    <div className="text-4xl mb-3">🌱</div>
                    <p className="font-bold text-slate-600">
                        No drives available near you.
                    </p>
                    <p className="text-sm mt-1">
                        Check back tomorrow or explore another city.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filteredDrives.map((drive) => {
                        const participation = getParticipation(drive.id);
                        const joined = drive.slots - drive.slotsLeft;
                        const progress = drive.slots
                            ? Math.min(100, Math.max(0, (joined / drive.slots) * 100))
                            : 0;

                        const status = drive.completed
                            ? { label: "Completed", className: "bg-slate-100 text-slate-500" }
                            : participation
                              ? { label: "Joined", className: "bg-blue-100 text-blue-700" }
                              : { label: "Available", className: "bg-emerald-100 text-emerald-700" };

                        return (
                            <motion.div
                                key={drive.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.98 }}
                                className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-xl transition-all duration-300"
                            >
                                <div className="flex items-start justify-between gap-2 mb-3">
                                    <h3 className="text-lg font-black text-slate-900">
                                        {drive.title}
                                    </h3>

                                    <span
                                        className={`shrink-0 rounded-full text-xs font-semibold px-3 py-1 ${status.className}`}
                                    >
                                        {status.label}
                                    </span>
                                </div>

                                <div className="space-y-1.5 mb-4">
                                    <p className="text-sm text-slate-500 flex items-center gap-1.5">
                                        <MapPin size={13} /> {drive.location}
                                    </p>
                                    <p className="text-sm text-slate-500 flex items-center gap-1.5">
                                        <Calendar size={13} /> {drive.date}
                                    </p>
                                    <p className="text-sm text-slate-500 flex items-center gap-1.5">
                                        <Clock size={13} /> {drive.time}
                                    </p>
                                </div>

                                <div className="mb-4">

                                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                                        <div
                                            className="h-full rounded-full bg-emerald-500"
                                            style={{ width: `${progress}%` }}
                                        />
                                    </div>
                                </div>

                                <DriveActionButton
                                    drive={drive}
                                    participation={participation}
                                    onJoin={handleJoin}
                                    onMarkAttendance={handleMarkAttendance}
                                    loadingId={actionLoadingId}
                                />

                                <p className="text-xs text-slate-400 mt-3 font-medium">
                                    Organized by {drive.organizer}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default UpcomingDrives;
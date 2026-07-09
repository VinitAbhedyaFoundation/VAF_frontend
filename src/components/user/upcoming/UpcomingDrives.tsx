import type { FC } from "react";
import type { UpcomingDrivesProps } from "@/types/user";
import { motion } from "framer-motion";

import {
    Calendar,
    Clock,
    MapPin,
} from "lucide-react";

import DriveActionButton from "../common/DriveActionButton";

const UpcomingDrives: FC<UpcomingDrivesProps> = ({
    upcomingDrives,
    actionLoadingId,
    getParticipation,
    handleJoin,
    handleMarkAttendance,
}) => {
    return (
            <div className="space-y-6">
                <div>
                    <h1 className="text-2xl font-black">Upcoming Drives</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        Find and join drives near you. Make an impact this week.
                    </p>
                </div>

                {upcomingDrives.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400">
                        <Calendar size={36} className="mx-auto mb-3 opacity-30" />
                        <p className="font-bold">No upcoming drives right now.</p>
                        <p className="text-sm mt-1">Check back soon!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {upcomingDrives.map((drive) => {
                            const participation = getParticipation(drive.id);
                            return (
                                <motion.div
                                    key={drive.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all"
                                >
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
                                    <DriveActionButton
                                        drive={drive}
                                        participation={participation}
                                        onJoin={handleJoin}
                                        onMarkAttendance={handleMarkAttendance}
                                        loadingId={actionLoadingId}
                                    />
                                    <p className="text-xs text-slate-400 mt-3 font-medium">
                                        by {drive.organizer}
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


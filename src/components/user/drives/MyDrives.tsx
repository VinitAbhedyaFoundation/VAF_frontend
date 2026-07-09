import type { FC } from "react";
import { motion } from "framer-motion";
import {
    Calendar,
    Clock,
    MapPin,
    UserCircle,
    Waves,
} from "lucide-react";

import type { MyDrivesProps } from "@/types/user";
import { getStatusBadgeClass } from "@/components/user/utils/status";

const MyDrives: FC<MyDrivesProps> = ({ drives }) => {
    return (

        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-black">My Drives</h1>
                <p className="text-slate-500 text-sm mt-1">
                    All drives you've participated in.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {drives.length === 0 ? (
                    <div className="col-span-3 bg-white rounded-3xl border border-slate-100 p-12 text-center text-slate-400">
                        <Waves size={36} className="mx-auto mb-3 opacity-30" />
                        <p className="font-bold">No drives yet.</p>
                        <p className="text-sm mt-1">
                            Join one from the Upcoming section.
                        </p>
                    </div>
                ) : (
                    drives.map((drive) => (
                        <motion.div
                            key={drive.id}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6 hover:shadow-md transition-all"
                        >
                            <div className="flex justify-end items-center mb-4">
                                <span
                                    className={`text-[10px] px-2.5 py-1 rounded-full font-bold ${getStatusBadgeClass(drive.status)}`}
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
                    ))
                )}
            </div>
        </div>
    );
};

export default MyDrives;
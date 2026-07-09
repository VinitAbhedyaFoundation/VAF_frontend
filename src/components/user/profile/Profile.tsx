import type { FC } from "react";
import type { ProfileProps } from "@/types/user";

import {
    CheckCircle2,
    LogOut,
    UserCircle,
} from "lucide-react";

const Profile: FC<ProfileProps> = ({
    user,
    data,
    handleLogout,
}) => {
    const stats = [
        {
            label: "Drives",
            value: data?.stats?.drivesJoined ?? 0,
        },
        {
            label: "Hours",
            value: data?.stats?.hoursVolunteered ?? 0,
        },
        {
            label: "Points",
            value: data?.stats?.impactPoints ?? 0,
        },
    ];

    const accountInfo = [
        {
            label: "Full Name",
            value: user?.name ?? "Loading...",
        },
        {
            label: "Email",
            value: user?.email ?? "Loading...",
        },
        {
            label: "City",
            value: user?.address ?? "N/A",
        },
        {
            label: "Joined",
            value: user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString("en-IN", {
                      month: "long",
                      year: "numeric",
                  })
                : "Loading...",
        },
        {
            label: "Role",
            value: "Field Volunteer",
        },
    ];

    return (
        <div className="space-y-6 max-w-2xl">
            <div>
                <h1 className="text-2xl font-black">My Profile</h1>
                <p className="text-slate-500 text-sm mt-1">
                    Your volunteer identity and impact summary.
                </p>
            </div>

            <div className="bg-slate-900 rounded-3xl p-8 text-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-56 h-56 bg-emerald-500/10 rounded-full blur-3xl -mr-16 -mt-16" />

                <div className="relative z-10 flex items-center gap-5 mb-6">
                    <div className="w-20 h-20 rounded-full bg-emerald-600/30 border-2 border-emerald-500/50 flex items-center justify-center">
                        <UserCircle size={48} className="text-emerald-400" />
                    </div>

                    <div>
                        <h2 className="text-2xl font-black">
                            {user?.name ?? "—"}
                        </h2>

                        <p className="text-slate-400 text-sm">
                            {user?.email ?? "—"}
                        </p>

                        <div className="flex items-center gap-1.5 mt-1">
                            <CheckCircle2
                                size={14}
                                className="text-emerald-400"
                            />

                            <span className="text-xs text-emerald-400 font-bold">
                                Verified Volunteer
                            </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center"
                        >
                            <p className="text-2xl font-black">
                                {stat.value}
                            </p>

                            <p className="text-xs text-slate-400 font-bold mt-0.5">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                <h3 className="font-black text-slate-900 mb-2">
                    Account Info
                </h3>

                {accountInfo.map((row) => (
                    <div
                        key={row.label}
                        className="flex justify-between items-center py-3 border-b border-slate-50 last:border-0"
                    >
                        <span className="text-sm font-bold text-slate-400">
                            {row.label}
                        </span>

                        <span className="text-sm font-bold text-slate-900">
                            {row.value}
                        </span>
                    </div>
                ))}
            </div>

            <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-50 text-red-600 font-bold border border-red-100 hover:bg-red-100 transition"
            >
                <LogOut size={16} />
                Logout
            </button>
        </div>
    );
};

export default Profile;
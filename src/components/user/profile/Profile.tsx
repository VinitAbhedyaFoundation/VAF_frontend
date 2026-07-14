"use client";

import { useRef, useState } from "react";
import type { FC } from "react";
import type { ProfileProps } from "@/types/user";
import { useEffect } from "react";

import {
    Camera,
    CheckCircle2,
    Eye,
    EyeOff,
    Loader2,
    LogOut,
    Pencil,
    ShieldCheck,
    UserCircle,
    X,
} from "lucide-react";

const Profile: FC<ProfileProps> = ({
    user,
    data,
    handleLogout,
    onUpdateAvatar,
    onUpdateProfile,
    onChangePassword,
}) => {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [avatarUploading, setAvatarUploading] = useState(false);

    const [isEditingInfo, setIsEditingInfo] = useState(false);
    const [nameDraft, setNameDraft] = useState(user?.name ?? "");
    const [addressDraft, setAddressDraft] = useState(user?.address ?? "");
    const [savingInfo, setSavingInfo] = useState(false);

    const [showPasswordForm, setShowPasswordForm] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPasswords, setShowPasswords] = useState(false);
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [passwordSuccess, setPasswordSuccess] = useState(false);
    const [changingPassword, setChangingPassword] = useState(false);

    const stats = [
        {
            label: "Drives",
            value: data?.stats?.drivesJoined ?? 0,
        },
        {
            label: "Hours",
            value: data?.stats?.hoursVolunteered ?? 0,
        },
    ];

    const accountInfo = [
        {
            label: "Email",
            value: user?.email ?? "Loading...",
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

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleAvatarChange = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const previewUrl = URL.createObjectURL(file);
        setAvatarPreview(previewUrl);

        if (!onUpdateAvatar) return;

        try {
            setAvatarUploading(true);
            await onUpdateAvatar(file);
        } finally {
            setAvatarUploading(false);
        }
    };

    const startEditingInfo = () => {
        setNameDraft(user?.name ?? "");
        setAddressDraft(user?.address ?? "");
        setIsEditingInfo(true);
    };

    const cancelEditingInfo = () => {
        setIsEditingInfo(false);
    };

    const saveInfo = async () => {
        if (!onUpdateProfile) {
            setIsEditingInfo(false);
            return;
        }

        try {
            setSavingInfo(true);
            await onUpdateProfile({
                name: nameDraft.trim(),
                address: addressDraft.trim(),
            });
            setIsEditingInfo(false);
        } finally {
            setSavingInfo(false);
        }
    };

    const resetPasswordForm = () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setPasswordError(null);
        setPasswordSuccess(false);
    };

    const submitPasswordChange = async () => {
        setPasswordError(null);
        setPasswordSuccess(false);

        if (!currentPassword || !newPassword || !confirmPassword) {
            setPasswordError("Please fill in all password fields.");
            return;
        }

        if (newPassword.length < 8) {
            setPasswordError("New password must be at least 8 characters.");
            return;
        }

        if (newPassword !== confirmPassword) {
            setPasswordError("New password and confirmation don't match.");
            return;
        }

        if (!onChangePassword) {
            setPasswordSuccess(true);
            return;
        }

        try {
            setChangingPassword(true);
            await onChangePassword({ currentPassword, newPassword });
            setPasswordSuccess(true);
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch {
            setPasswordError("Couldn't update your password. Check your current password and try again.");
        } finally {
            setChangingPassword(false);
        }
    };

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
                    <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-emerald-600/30 border-2 border-emerald-500/50 flex items-center justify-center overflow-hidden">
                            {avatarPreview || user?.avatarUrl ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={avatarPreview ?? user?.avatarUrl}
                                    alt={user?.name ?? "Profile picture"}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <UserCircle size={48} className="text-emerald-400" />
                            )}

                            {avatarUploading && (
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                                    <Loader2 size={20} className="animate-spin text-white" />
                                </div>
                            )}
                        </div>

                        <button
                            onClick={handleAvatarClick}
                            className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-emerald-500 hover:bg-emerald-400 transition flex items-center justify-center border-2 border-slate-900"
                            aria-label="Change profile picture"
                        >
                            <Camera size={13} />
                        </button>

                        <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarChange}
                        />
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

            {/* BASIC INFO */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm space-y-4">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-slate-900">
                        Basic Info
                    </h3>

                    {!isEditingInfo && (
                        <button
                            onClick={startEditingInfo}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                        >
                            <Pencil size={13} />
                            Edit
                        </button>
                    )}
                </div>

                {isEditingInfo ? (
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-bold text-slate-400 mb-1 block">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={nameDraft}
                                onChange={(e) => setNameDraft(e.target.value)}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 mb-1 block">
                                City
                            </label>
                            <input
                                type="text"
                                value={addressDraft}
                                onChange={(e) => setAddressDraft(e.target.value)}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div className="flex gap-3 pt-1">
                            <button
                                onClick={saveInfo}
                                disabled={savingInfo}
                                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition py-2.5 text-sm font-bold text-white disabled:opacity-60"
                            >
                                {savingInfo && <Loader2 size={14} className="animate-spin" />}
                                Save Changes
                            </button>

                            <button
                                onClick={cancelEditingInfo}
                                disabled={savingInfo}
                                className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 transition flex items-center gap-1"
                            >
                                <X size={14} />
                                Cancel
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center py-3 border-b border-slate-50">
                            <span className="text-sm font-bold text-slate-400">
                                Full Name
                            </span>
                            <span className="text-sm font-bold text-slate-900">
                                {user?.name ?? "Loading..."}
                            </span>
                        </div>

                        <div className="flex justify-between items-center py-3 border-b border-slate-50">
                            <span className="text-sm font-bold text-slate-400">
                                City
                            </span>
                            <span className="text-sm font-bold text-slate-900">
                                {user?.address ?? "N/A"}
                            </span>
                        </div>

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
                    </>
                )}
            </div>

            {/* SECURITY / PASSWORD */}
            <div className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                    <h3 className="font-black text-slate-900 flex items-center gap-2">
                        <ShieldCheck size={16} className="text-emerald-600" />
                        Password &amp; Security
                    </h3>

                    {!showPasswordForm && (
                        <button
                            onClick={() => {
                                resetPasswordForm();
                                setShowPasswordForm(true);
                            }}
                            className="text-xs font-bold text-emerald-600 hover:text-emerald-700"
                        >
                            Change Password
                        </button>
                    )}
                </div>

                {!showPasswordForm ? (
                    <p className="text-sm text-slate-400 mt-2">
                        Keep your account secure with a strong, unique password.
                    </p>
                ) : (
                    <div className="space-y-4 mt-4">
                        <div className="relative">
                            <label className="text-xs font-bold text-slate-400 mb-1 block">
                                Current Password
                            </label>
                            <input
                                type={showPasswords ? "text" : "password"}
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 mb-1 block">
                                New Password
                            </label>
                            <input
                                type={showPasswords ? "text" : "password"}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-400 mb-1 block">
                                Confirm New Password
                            </label>
                            <input
                                type={showPasswords ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                        </div>

                        <button
                            onClick={() => setShowPasswords((v) => !v)}
                            className="text-xs font-bold text-slate-400 hover:text-slate-600 flex items-center gap-1"
                        >
                            {showPasswords ? <EyeOff size={13} /> : <Eye size={13} />}
                            {showPasswords ? "Hide" : "Show"} passwords
                        </button>

                        {passwordError && (
                            <p className="text-xs font-bold text-red-600">
                                {passwordError}
                            </p>
                        )}

                        {passwordSuccess && (
                            <p className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                <CheckCircle2 size={13} />
                                Password updated successfully.
                            </p>
                        )}

                        <div className="flex gap-3 pt-1">
                            <button
                                onClick={submitPasswordChange}
                                disabled={changingPassword}
                                className="flex-1 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition py-2.5 text-sm font-bold text-white disabled:opacity-60"
                            >
                                {changingPassword && (
                                    <Loader2 size={14} className="animate-spin" />
                                )}
                                Update Password
                            </button>

                            <button
                                onClick={() => setShowPasswordForm(false)}
                                disabled={changingPassword}
                                className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-500 hover:bg-slate-50 transition flex items-center gap-1"
                            >
                                <X size={14} />
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
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
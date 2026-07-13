"use client";

import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import API from "../api/api";

import {
    AppSettings,
    Admin,
    User,
    Drive,
    AttendanceRecord,
    Report,
    ConfirmState,
    ReportType,
    DriveStatus,
    AttendanceStatus,
    NavSection,
} from "@/types/superadmin";

import { INITIAL_SETTINGS } from "@/constants/superadmin";
import { Await } from "react-router-dom";

export const useSuperAdminDashboard = () => {
    // ── settings ─────────────────────────────────────
    const [settings, setSettings] = useState<AppSettings>(INITIAL_SETTINGS);

    const [active, setActive] = useState<NavSection>("overview");

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // ── data ─────────────────────────────────────────
    const [admins, setAdmins] = useState<Admin[]>([]);
    const [users, setUsers] = useState<User[]>([]);
    const [drives, setDrives] = useState<Drive[]>([]);
    const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
    const [reports, setReports] = useState<Report[]>([]);

    // ── modals ───────────────────────────────────────
    const [adminModal, setAdminModal] = useState(false);
    const [userModal, setUserModal] = useState(false);
    const [reportModal, setReportModal] = useState(false);

    const [viewAdmin, setViewAdmin] = useState<Admin | null>(null);
    const [viewUser, setViewUser] = useState<User | null>(null);
    const [confirm, setConfirm] = useState<ConfirmState | null>(null);

    const [submitting, setSubmitting] = useState(false);

    // ── forms ────────────────────────────────────────
    const [adminForm, setAdminForm] = useState({
        name: "",
        email: "",
        role: "Admin",
        city: "",
    });

    const [userForm, setUserForm] = useState({
        name: "",
        email: "",
        city: "",
        password: "",
    });

    const [reportForm, setReportForm] = useState<{ type: ReportType }>({
        type: "Monthly",
    });

    // ── filters ──────────────────────────────────────
    const [adminSearch, setAdminSearch] = useState("");
    const [userSearch, setUserSearch] = useState("");

    const [driveFilter, setDriveFilter] = useState<"All" | DriveStatus>("All");

    const [attendanceFilter, setAttendanceFilter] = useState<
        "All" | AttendanceStatus
    >("All");

    // ── computed values ──────────────────────────────

    const totalWaste = drives.reduce((s, d) => s + d.wasteKg, 0);
    const totalHours = drives.reduce((s, d) => s + d.hours, 0);

    const completedDrives = drives.filter(
        d => d.status === "Completed"
    ).length;

    const pendingAttendance = attendance.filter(
        a => a.status === "Pending"
    ).length;

    const filteredAdmins = useMemo(
        () =>
            admins.filter(
                a =>
                    a.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
                    a.email.toLowerCase().includes(adminSearch.toLowerCase())
            ),
        [admins, adminSearch]
    );

    const filteredUsers = useMemo(
        () =>
            users.filter(
                u =>
                    u.name.toLowerCase().includes(userSearch.toLowerCase()) ||
                    u.email.toLowerCase().includes(userSearch.toLowerCase())
            ),
        [users, userSearch]
    );

    const filteredDrives = useMemo(
        () =>
            driveFilter === "All"
                ? drives
                : drives.filter(d => d.status === driveFilter),
        [drives, driveFilter]
    );

    const filteredAttendance = useMemo(
        () =>
            attendanceFilter === "All"
                ? attendance
                : attendance.filter(a => a.status === attendanceFilter),
        [attendance, attendanceFilter]
    );

    const cityData = useMemo(() => {
        const map: Record<string, number> = {};

        users.forEach(u => {
            map[u.city] = (map[u.city] || 0) + 1;
        });

        return Object.entries(map).map(([name, value]) => ({
            name,
            value,
        }));
    }, [users]);

    const wasteBarData = useMemo(
        () =>
            drives
                .filter(d => d.wasteKg > 0)
                .map(d => ({
                    name: d.location.split(",")[0].split(" ").slice(-1)[0],
                    waste: d.wasteKg,
                })),
        [drives]
    );

    const volunteerBarData = useMemo(
        () =>
            drives
                .filter(d => d.volunteers > 0)
                .map(d => ({
                    name: d.location.split(",")[0].split(" ").slice(-1)[0],
                    volunteers: d.volunteers,
                })),
        [drives]
    );

    // ── fetchers ─────────────────────────────────────

    const fetchUsers = async () => {
        try {
            const res = await API.get("/user/all");

            const formatted = res.data.users
                .filter((u: any) => u.role === "User")
                .map((u: any) => ({
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    city: u.city || "N/A",
                    drives: u.drivesCount || 0,
                    status: u.status === "Approved" ? "Active" : "Inactive",
                    joined: new Date(u.createdAt).toLocaleDateString(),
                    totalHours: u.totalHours || 0,
                    wasteKg: u.wasteKg || 0,
                }));

            setUsers(formatted);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAdmins = async () => {
        try {
            const res = await API.get("/user/all");

            const formatted = res.data.users
                .filter(
                    (u: any) => u.role === "Admin" || u.role === "SuperAdmin"
                )
                .map((u: any) => ({
                    id: u.id,
                    name: u.name,
                    email: u.email,
                    role: u.role,
                    city: u.city || "N/A",
                    joined: new Date(u.createdAt).toLocaleDateString(),
                    lastActive: "Recently",
                    status: u.status === "Approved" ? "Active" : "Suspended",
                }));

            setAdmins(formatted);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchDrives = async () => {
        try {
            const res = await API.get("/drives");

            const formatted = res.data.drives.map((d: any) => ({
                id: d.id,
                date: d.date,
                location: d.location,
                volunteers: d.volunteersCount || 0,
                wasteKg: d.wasteKg || 0,
                status: d.status,
                hours: d.hours || 0,
                coordinator: d.coordinator?.name,
            }));

            setDrives(formatted);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchAttendance = async () => {
        try {
            const res = await API.get("/attendance");

            const formatted = res.data.attendance.map((a: any) => ({
                id: a.id,
                volunteer: a.user.name,
                email: a.user.email,
                drive: a.drive.location,
                driveId: a.drive.id,
                date: new Date(a.date).toLocaleDateString(),
                hours: a.hours,
                status: a.marked ? "Marked" : "Pending",
            }));

            setAttendance(formatted);
        } catch (error) {
            console.error(error);
        }
    };

    const fetchReports = async () => {
        try {
            const res = await API.get("/reports");
            setReports(res.data.reports);
        } catch (error) {
            console.error(error);
        }
    };

    // ── handlers ─────────────────────────────────────

    const handleAddAdmin = async () => {
        if (!adminForm.name || !adminForm.email) {
            toast.error("Name and email required");
            return;
        }

        try {
            setSubmitting(true);

            await API.post("/auth/adminregister", {
                name: adminForm.name,
                email: adminForm.email,
                password: "Admin@123",
            });

            toast.success("Admin created");

            setAdminModal(false);

            setAdminForm({
                name: "",
                email: "",
                role: "Admin",
                city: "",
            });

            await fetchAdmins();
        } catch (error: any) {
            console.error(error);
            toast.error(
                error?.response?.data?.message || "Failed to create admin"
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleAddUser = async () => {
        if (!userForm.name || !userForm.email || !userForm.password) {
            toast.error("Fill all required fields");
            return;
        }

        try {
            setSubmitting(true);

            await API.post("/auth/register", {
                name: userForm.name,
                email: userForm.email,
                password: userForm.password,
                city: userForm.city,
            });

            toast.success("Volunteer added");

            setUserModal(false);

            setUserForm({
                name: "",
                email: "",
                city: "",
                password: "",
            });

            await fetchUsers();
        } catch (error: any) {
            console.error(error);
            toast.error(error?.response?.data?.message || "Failed to add user");
        } finally {
            setSubmitting(false);
        }
    };

    const confirmDelete = async () => {
        if (!confirm) return;

        try {
            if (confirm.type === "admin") {
                await API.delete(`/user/${confirm.id}`);
                fetchAdmins();
            } else {
                await API.delete(`/user/${confirm.id}`);
                fetchUsers();
            }

            toast.success("Deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("Delete failed");
        } finally {
            setConfirm(null);
        }
    };

    const toggleAdminStatus = async (id: number, currentStatus: string) => {
        try {
            if (currentStatus === "Active") {
                await API.patch(`/user/suspend/${id}`);
                toast.success("Admin suspended");
            } else {
                await API.patch(`/user/approve/${id}`);
                toast.success("Admin activated");
            }

            fetchAdmins();
        } catch (error) {
            console.error(error);
            toast.error("Action failed");
        }
    };

    const markAttendance = async (id: number) => {
        try {
            await API.patch(`/attendance/mark/${id}`);
            toast.success("Attendance marked");
            await fetchAttendance();
        } catch (error) {
            console.error(error);
            toast.error("Failed to mark attendance");
        }
    };

    const generateReport = async () => {
        try {
            setSubmitting(true);

            await API.post("/reports/generate", {
                type: reportForm.type,
            });

            toast.success("Report generated");

            setReportModal(false);

            await fetchReports();
        } catch (error) {
            console.error(error);
            toast.error("Failed to generate report");
        } finally {
            setSubmitting(false);
        }
    };

    const goTo = (section: NavSection) => {
        setActive(section);
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    };

    // ── effects ──────────────────────────────────────

    useEffect(() => {
        fetchUsers();
        fetchAdmins();
        fetchDrives();
        fetchAttendance();
        fetchReports();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return {
        settings,
        setSettings,

        active,
        setActive,

        isMobileMenuOpen,
        setIsMobileMenuOpen,

        admins,
        setAdmins,

        users,
        setUsers,

        drives,
        setDrives,

        attendance,
        setAttendance,

        reports,
        setReports,

        adminModal,
        setAdminModal,

        userModal,
        setUserModal,

        reportModal,
        setReportModal,

        viewAdmin,
        setViewAdmin,

        viewUser,
        setViewUser,

        confirm,
        setConfirm,

        submitting,
        setSubmitting,

        adminForm,
        setAdminForm,

        userForm,
        setUserForm,

        reportForm,
        setReportForm,

        adminSearch,
        setAdminSearch,

        userSearch,
        setUserSearch,

        driveFilter,
        setDriveFilter,

        attendanceFilter,
        setAttendanceFilter,

        totalWaste,
        totalHours,
        completedDrives,
        pendingAttendance,

        filteredAdmins,
        filteredUsers,
        filteredDrives,
        filteredAttendance,

        cityData,
        wasteBarData,
        volunteerBarData,

        fetchUsers,
        fetchAdmins,
        fetchDrives,
        fetchAttendance,
        fetchReports,

        handleAddAdmin,
        handleAddUser,
        confirmDelete,
        toggleAdminStatus,
        markAttendance,
        generateReport,
        goTo,
        handleLogout,
    };
};
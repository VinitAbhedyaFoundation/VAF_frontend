"use client";

import api from "@/api/api";
import Attendance from "@/components/user/attendance/Attendance";
import Certificates from "@/components/user/certificates/Certificates";
import MyDrives from "@/components/user/drives/MyDrives";
import Header from "@/components/user/layout/Header";
import Sidebar from "@/components/user/layout/Sidebar";
import Overview from "@/components/user/overview/Overview";
import Profile from "@/components/user/profile/Profile";
import UpcomingDrives from "@/components/user/upcoming/UpcomingDrives";
import {
  calculateWeeklyStreak,
  getWeeklyHeatmapData,
} from "@/components/user/utils/activity";
import {
  createMyDrives,
  createUserMetrics,
  sectionLabel,
} from "@/components/user/utils/dashboard";
import {
  getLevelInfo,
  LEVEL_STYLES,
} from "@/components/user/utils/level";
import { useUserDashboard } from "@/hooks/useUserDashboard";
import type {
  Participation,
  SectionId,
  UpcomingDrive
} from "@/types/user";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// =========================
// MAIN DASHBOARD
// =========================

export default function UserDashboard() {
  const [loading, setLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState<SectionId>("overview");

  const [openNotif, setOpenNotif] = useState(false);

  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const navigate = useNavigate();
  const {
    user,
    data,
    certificates,
    upcomingDrives,
    participations,
    notifications,
    fetchParticipations,
    fetchNotifications,
  } = useUserDashboard();

  const drives = data?.stats?.drivesJoined ?? 0;

  // =========================
  // PARTICIPATION HELPERS
  // =========================

  const getParticipation = (driveId: string): Participation | undefined => {
    return participations.find((p) => p.driveId === Number(driveId));

  };

  // =========================
  // LEVEL SYSTEM
  // =========================

  const streak = calculateWeeklyStreak(data?.activity || []);

  const HEATMAP_DATA = getWeeklyHeatmapData(data?.activity || []);

  const levelInfo = getLevelInfo(drives);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1400);
    return () => clearTimeout(t);
  }, []);

  // =========================
  // ACTIONS
  // =========================

  const handleJoin = async (drive: UpcomingDrive) => {
    setActionLoadingId(drive.id);
    try {
      const token = localStorage.getItem("token");
      await api.post(
        `/attendance/join`,
        { driveId: Number(drive.id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Drive joined successfully");
      await fetchParticipations();
    } catch (err) {
      toast.error("Could not join drive. Already joined or server error.");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleMarkAttendance = async (driveId: number) => {
    setActionLoadingId(driveId.toString());
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/attendance/mark",
        { driveId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Attendance submitted");
      await fetchParticipations();
    } catch (err) {
      toast.error("Attendance submission failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.success("Logged out");
    navigate("/login");
  };

  const goToSection = (id: SectionId) => {
    setActiveNav(id);
    setIsMobileMenuOpen(false);
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest(".notification-wrapper")) {
        setOpenNotif(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleBellClick = () => {
    setOpenNotif((prev) => !prev);

    if (!openNotif) {
      fetchNotifications();
    }
  };

  // =========================
  // DERIVED DATA
  // =========================

  const USER_METRICS = createUserMetrics(data);
  const MY_DRIVES = createMyDrives(data);

  // =========================
  // RENDER
  // =========================

  return (
    <div className="flex min-h-screen bg-[#F4F7F5] text-slate-900 font-sans overflow-hidden">
      <Toaster position="bottom-center" />

      <Sidebar
        activeNav={activeNav}
        goToSection={goToSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
        streak={streak}
        levelInfo={levelInfo}
levelStyles={LEVEL_STYLES}
drives={drives}
      />


      {/* ── MAIN CONTENT ── */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* HEADER */}
        <Header
          title={sectionLabel[activeNav]}
          notifications={notifications}
          openNotif={openNotif}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
          handleBellClick={handleBellClick}
          handleLogout={handleLogout}
          goToSection={goToSection}
        />

        {/* PAGE CONTENT */}
        <div id="top" className="flex-1 overflow-y-auto p-6 lg:p-10">

          {/* ── OVERVIEW ── */}
          {activeNav === "overview" && (
            <Overview
              user={user}
              data={data}
              streak={streak}
              certificates={certificates}
              USER_METRICS={USER_METRICS}
              loading={loading}
              MY_DRIVES={MY_DRIVES}
              upcomingDrives={upcomingDrives}
              HEATMAP_DATA={HEATMAP_DATA}
              getParticipation={getParticipation}
              handleJoin={handleJoin}
              handleMarkAttendance={handleMarkAttendance}
              actionLoadingId={actionLoadingId}
              goToSection={goToSection}
              levelInfo={levelInfo}
drives={drives}
            />
          )}

          {/* ── UPCOMING DRIVES ── */}
          {activeNav === "upcoming" && (
            <UpcomingDrives
              upcomingDrives={upcomingDrives}
              actionLoadingId={actionLoadingId}
              getParticipation={getParticipation}
              handleJoin={handleJoin}
              handleMarkAttendance={handleMarkAttendance}
            />
          )}

          {/* ── MY DRIVES ── */}
          {activeNav === "drives" && (
            <MyDrives drives={MY_DRIVES} />
          )}

          {/* ── ATTENDANCE / ACTIVITY ── */}
          {activeNav === "attendance" && (
            <Attendance
              data={data}
              participations={participations}
            />
          )}

          {/* ── CERTIFICATES ── */}
          {activeNav === "certificates" && (
            <Certificates certificates={certificates} />
          )}

          {/* ── PROFILE ── */}
          {activeNav === "profile" && (
            <Profile
              user={user}
              data={data}
              handleLogout={handleLogout}
            />
          )}

        </div>
      </main>
    </div>
  );
}
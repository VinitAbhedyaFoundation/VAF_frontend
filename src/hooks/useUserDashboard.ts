import { useEffect, useState } from "react";

import type {
  Certificate,
  DashboardData,
  Notification,
  Participation,
  UpcomingDrive,
  User,
} from "@/types/user";

export function useUserDashboard() {
  const [user, setUser] = useState<User | null>(null);

  const [data, setData] = useState<DashboardData | null>(null);

  const [certificates, setCertificates] = useState<Certificate[]>([]);

  const [upcomingDrives, setUpcomingDrives] = useState<UpcomingDrive[]>([]);

  const [participations, setParticipations] = useState<Participation[]>([]);

  const [notifications, setNotifications] = useState<Notification[]>([]);

  // =========================
  // FETCH: PARTICIPATIONS
  // =========================

  const fetchParticipations = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:3000/api/attendance/my",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const json = await res.json();

      setParticipations(Array.isArray(json) ? json : []);
    } catch (err) {
      console.error("fetchParticipations failed", err);
    }
  };

  // =========================
  // FETCH: USER
  // =========================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await fetch(
          "http://localhost:3000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) return;

        const json = await res.json();

        setUser(json.user ?? json);
      } catch (err) {
        console.error("User fetch failed", err);
      }
    };

    fetchUser();
  }, []);

  // =========================
  // FETCH: DASHBOARD
  // =========================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) return;

        const res = await fetch(
          "http://localhost:3000/api/dashboard/me",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) return;

        const json = await res.json();

        setData(json);

        setCertificates(
          (json?.certificates || []).map((c: any) => ({
            ...c,
            file: c.fileUrl,
          }))
        );
      } catch (err) {
        console.error("Dashboard fetch failed", err);
      }
    };

    fetchDashboard();
  }, []);

  // =========================
  // FETCH: PARTICIPATIONS
  // =========================

  useEffect(() => {
    fetchParticipations();
  }, []);

  // =========================
  // FETCH: UPCOMING DRIVES
  // =========================

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await fetch(
          "http://localhost:3000/api/drive/upcoming"
        );

        const json = await res.json();

        const formatted: UpcomingDrive[] = json.map((d: any) => ({
          id: d.id.toString(),
          title: d.title,
          completed: d.completed ?? false,
          location: d.location || "Unknown",
          date: new Date(d.date).toLocaleDateString(),
          time: new Date(d.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          slots: d.slots,
          slotsLeft: d.slots,
          type: d.type || "General",
          organizer: "VAF",
        }));

        setUpcomingDrives(formatted);
      } catch (err) {
        console.error("Upcoming fetch failed", err);
      }
    };

    fetchUpcoming();
  }, []);

  // =========================
  // FETCH: NOTIFICATIONS
  // =========================

  const fetchNotifications = async () => {
    try {
      const res = await fetch(
        "http://localhost:3000/api/drive/upcoming"
      );

      const json = await res.json();

      const formatted: Notification[] = json
        .slice(0, 3)
        .map((d: any) => ({
          id: d.id,
          subject: "New Drive Created 🚀",
          content: `${d.title} at ${d.location} — Join now!`,
          createdAt: d.date,
        }));

      setNotifications(formatted);
    } catch (err) {
      console.error("Notification fetch failed", err);
    }
  };

  return {
    user,
    data,
    certificates,
    upcomingDrives,
    participations,
    notifications,

    fetchParticipations,
    fetchNotifications,
  };
}
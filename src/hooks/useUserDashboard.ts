
import { useEffect, useState } from "react";
import API from "@/api/api";

import type {
  Certificate,
  DashboardData,
  Notification,
  Participation,
  UpcomingDrive,
  User,
} from "@/types/user";

interface ApiDrive {
  id: number | string;
  title?: string | null;
  completed?: boolean | null;
  location?: string | null;
  date: string;
}

interface DashboardResponse extends DashboardData {
  certificates: Array<Certificate & { fileUrl?: string | null }>;
}

type UpcomingDriveResponse = ApiDrive;

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
      const res = await API.get<Participation[]>("/attendance/my");

      const json: unknown = res.data;

      setParticipations(
        Array.isArray(json) ? (json as Participation[]) : [],
      );
    } catch (err: unknown) {
      console.error("fetchParticipations failed", err);
    }
  };

  // =========================
  // FETCH: USER
  // =========================

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get<{ user?: User } & Partial<User>>(
          "/auth/me",
        );

        const json = res.data;

        setUser(json.user ?? (json as User));
      } catch (err: unknown) {
        console.error("User fetch failed", err);
      }
    };

    void fetchUser();
  }, []);

  // =========================
  // FETCH: DASHBOARD
  // =========================

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await API.get<DashboardResponse>("/dashboard/me");

        const json = res.data;

        setData(json);

        setCertificates(
          (json.certificates ?? []).map((certificate) => ({
            ...certificate,
            file: certificate.fileUrl ?? "",
          })),
        );
      } catch (err: unknown) {
        console.error("Dashboard fetch failed", err);
      }
    };

    void fetchDashboard();
  }, []);

  // =========================
  // FETCH: PARTICIPATIONS
  // =========================

  useEffect(() => {
    void fetchParticipations();

    // This fetch is intentionally performed once when the hook mounts.
  }, []);

  // =========================
  // FETCH: UPCOMING DRIVES
  // =========================

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        const res = await API.get<unknown>("/drive/upcoming");

        const json = res.data;

        if (!Array.isArray(json)) {
          throw new Error("Invalid drives response");
        }

        const drives = json as UpcomingDriveResponse[];

        const formatted: UpcomingDrive[] = drives.map((drive) => ({
          id: String(drive.id),
          title: drive.title || "Untitled Drive",
          completed: drive.completed ?? false,
          location: drive.location || "Unknown",
          date: new Date(drive.date).toLocaleDateString(),
          time: new Date(drive.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          slots: 0,
          slotsLeft: 0,
          type: "General",
          organizer: "VAF",
        }));

        setUpcomingDrives(formatted);
      } catch (err: unknown) {
        console.error("Upcoming fetch failed", err);
      }
    };

    void fetchUpcoming();
  }, []);

  // =========================
  // FETCH: NOTIFICATIONS
  // =========================

  const fetchNotifications = async () => {
    try {
      const res = await API.get<unknown>("/drive/upcoming");

      const json = res.data;

      if (!Array.isArray(json)) {
        throw new Error("Invalid notifications source response");
      }

      const drives = (json as ApiDrive[]).slice(0, 3);

      const formatted: Notification[] = drives.map((drive) => ({
        id: Number(drive.id),
        subject: "New Drive Created 🚀",
        content: `${drive.title ?? "Untitled Drive"} at ${drive.location ?? "Unknown"} — Join now!`,
        createdAt: drive.date,
      }));

      setNotifications(formatted);
    } catch (err: unknown) {
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

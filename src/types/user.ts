// =========================
// TYPES
// =========================

import { LevelInfo } from "@/components/user/utils/level";
import type { LucideIcon } from "lucide-react";

export type SectionId =
  | "overview"
  | "upcoming"
  | "drives"
  | "attendance"
  | "certificates"
  | "profile";

export type ParticipationStatus =
  | "Registered"
  | "Pending"
  | "Approved"
  | "Rejected";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  id: SectionId;
  badge?: string;
}

export interface MetricData {
  id: string;
  label: string;
  value: number;
  unit?: string;
  icon: LucideIcon;
  color: string;
  bg: string;
}

export interface Drive {
  id: string;

  participationId: number;
  driveId: number; // <-- add this
  attendanceMarked: boolean;

  title: string;
  location: string;
  date: string;

  status: "Registered" | "Pending" | "Approved" | "Rejected";

  volunteers: number;
  hoursLogged?: number;

  description?: string;
  type?: string;
}

export interface UpcomingDrive {
  id: string;
  title: string;
  location: string;
  date: string;
  time: string;
  slots: number;
  slotsLeft: number;
  type: string;
  organizer: string;
  completed: boolean;
}

export interface Participation {
  id: number;
  driveId: number;
  status: ParticipationStatus;
  attendanceMarked: boolean;
  hours?: number;
  waste?: number;
}

export interface AttendanceRecord {
  id: string;
  drive: string;
  hours: number;
  date: string;
  status: "Marked" | "Pending";
  points: number;
}

export interface Certificate {
  id: string;
  title: string;
  issueDate: string;
  drive: string;
  hours: number;
  type: "participation" | "excellence" | "milestone";
  file?: string;
}

export interface User {
  id?: number;

  name: string;

  email: string;

  address?: string;

  avatarUrl?: string;

  createdAt?: string;
}

export interface Notification {
  id: number;
  subject: string;
  content: string;
  createdAt?: string;
}

export interface Activity {
  title?: string;
  date: string;
  hours: number;
  waste: number;
  location?: string;
  status?: string;
}

export interface DashboardStats {
  drivesJoined: number;
  hoursVolunteered: number;
  wasteCollected: number;
}
export interface DashboardRecentDrive {
  driveId: number;
  participationId: number;
  attendanceMarked: boolean;

  title: string;
  location: string;
  date: string;

  status: "Registered" | "Pending" | "Approved" | "Rejected";

  hours: number;

  description?: string;
  type?: string;
}

export interface DashboardData {
  stats: DashboardStats;
  activity: Activity[];
recentDrives: DashboardRecentDrive[];  certificates: Certificate[];
}

export interface HeatmapData {
  hours: number;
  waste: number;
  location: string;
  date: string;
}

// =========================
// COMPONENT PROPS
// =========================

export interface UpcomingDrivesProps {
  upcomingDrives: UpcomingDrive[];
  actionLoadingId: string | null;

  getParticipation: (
    driveId: string
  ) => Participation | undefined;

  handleJoin: (
    drive: UpcomingDrive
  ) => Promise<void>;

  handleMarkAttendance: (
    driveId: number
  ) => Promise<void>;
}

export interface MyDrivesProps {
  drives: Drive[];
}

export interface AttendanceProps {
  data: DashboardData | null;
  participations: Participation[];
}

export interface OverviewProps {
  user: User | null;
  data: DashboardData | null;

  streak: number;
  loading: boolean;

  certificates: Certificate[];

  USER_METRICS: MetricData[];
  MY_DRIVES: Drive[];
  upcomingDrives: UpcomingDrive[];
  HEATMAP_DATA: HeatmapData[];

  getParticipation: (
    id: string
  ) => Participation | undefined;

  handleJoin: (
    drive: UpcomingDrive
  ) => Promise<void>;

  handleMarkAttendance: (
    driveId: number
  ) => Promise<void>;

  actionLoadingId: string | null;

  goToSection: (
    section: SectionId
  ) => void;
  levelInfo: LevelInfo;
drives: number;
}

export interface CertificatesProps {
  certificates: Certificate[];
}

export interface ProfileProps {
    user: User | null;
    data: DashboardData | null;
    handleLogout: () => void;

    onUpdateAvatar?: (file: File) => Promise<void>;

    onUpdateProfile?: (data: {
        name: string;
        address: string;
    }) => Promise<void>;

    onChangePassword?: (data: {
        currentPassword: string;
        newPassword: string;
    }) => Promise<void>;
}
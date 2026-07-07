import type { LucideIcon } from "lucide-react";

export type SectionId =
  | "overview"
  | "drives"
  | "attendance"
  | "volunteers"
  | "messages"
  | "certificates"
  | "settings";

export interface NavItem {
  label: string;
  icon: LucideIcon;
  id: SectionId;
}

export interface SidebarProps {
  mobile?: boolean;
  activeNav: SectionId;
  goTo: (section: SectionId) => void;
  pendingBadge?: string;
}

export interface Drive {
  id: number;
  title?: string;
  date: string;
  totalHours: number;
  location?: string;
  certificateIssued?: boolean;
  completed?: boolean;
  driveLocation?: {
    location: string;
  };
}

export interface AttendanceRecord {
  id: number;
  user: {
    name: string;
    email: string;
  };
  drive: {
    date: string;
  };
  hours: number;
  createdAt: string;
  status?: "Pending" | "Approved" | "Rejected";
}

export interface Volunteer {
  id: number;
  name: string;
  email: string;
  city: string;
  age: number;
  drives: number;
  status: "Approved" | "Pending";
  joined: string;
  isNew: boolean;
}

export interface DashboardStats {
  totalDrives: number;
  totalHours: number;
  wasteCollected: number;
  totalVolunteers: number;
  chartData: {
    name: string;
    waste: number;
    volunteers: number;
  }[];
}

export interface MessageItem {
  id: number;
  title: string;
  content: string;
  date: string;
  status: "Sent";
  recipients: number;
}

// ─── THEME SYSTEM ─────────────────────────────────────────────────────────────

export type ThemeMode = "light" | "dark" | "system";

export interface AccentPalette {
  hex: string;
  name: string;
  50: string; 100: string; 200: string; 400: string;
  500: string; 600: string; 700: string; 900: string;
  shadow: string;
}

export type SettingsTab =
  | "account"
  | "security"
  | "appearance"
  | "data"
  | "system";

export interface ApiMessage { id: number; subject?: string; title?: string; content?: string; createdAt?: string; recipients?: number; }
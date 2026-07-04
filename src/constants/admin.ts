import {
  LayoutDashboard,
  Waves,
  ShieldCheck,
  UserCircle,
  Mail,
  Award,
  Settings,
} from "lucide-react";

import type { NavItem } from "../types/admin";

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", icon: LayoutDashboard, id: "overview" },
  { label: "Drives", icon: Waves, id: "drives" },
  { label: "Attendance", icon: ShieldCheck, id: "attendance" },
  { label: "Volunteers", icon: UserCircle, id: "volunteers" },
  { label: "Messages", icon: Mail, id: "messages" },
  { label: "Certificates", icon: Award, id: "certificates" },
  { label: "Settings", icon: Settings, id: "settings" },
];
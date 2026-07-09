// src/constants/user.ts

import {
  LayoutDashboard,
  Calendar,
  Waves,
  ShieldCheck,
  Award,
  UserCircle,
} from "lucide-react";

import type { NavItem } from "@/types/user";

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", icon: LayoutDashboard, id: "overview" },
  { label: "Upcoming Drives", icon: Calendar, id: "upcoming" },
  { label: "My Drives", icon: Waves, id: "drives" },
  { label: "My Activity", icon: ShieldCheck, id: "attendance" },
  {
    label: "Certificates",
    icon: Award,
    id: "certificates",
    badge: "New",
  },
  { label: "Profile", icon: UserCircle, id: "profile" },
];
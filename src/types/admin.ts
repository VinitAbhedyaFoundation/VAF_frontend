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
import { AppSettings } from "@/types/superadmin";

export const INITIAL_SETTINGS: AppSettings = {
  orgName: "Volunteer Action Force",
  contactEmail: "admin@vaf.org",
  maxDriveHours: 8,
  notifyNewDrive: true,
  notifyNewVolunteer: true,
  notifyWeeklyReport: false,
  allowSelfRegistration: true,
  requireApproval: false,
  maintenanceMode: false,
};

export const PIE_COLORS = ["#10b981", "#6366f1", "#f59e0b", "#ef4444", "#8b5cf6"];
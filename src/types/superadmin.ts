export type AdminStatus = "Active" | "Suspended";

export type UserStatus = "Active" | "Pending" | "Suspended";

export type DriveStatus = "Completed" | "Upcoming" | "Active";

export type AttendanceStatus =
  | "Registered"
  | "Pending"
  | "Approved"
  | "Rejected";

export type ReportType =
  | "Monthly"
  | "Quarterly"
  | "Annual";

export type NavSection =
  | "overview"
  | "admins"
  | "users"
  | "drives"
  | "attendance"
  | "reports"
  | "settings";

export interface Admin {
  id: number;
  name: string;
  email: string;
  role: string;
  status: AdminStatus;
  city: string;
  joined: string;
  lastActive?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  city: string;
  drives: number;
  status: UserStatus;
  joined: string;
  totalHours?: number;
  wasteKg?: number;
}

export interface Drive {
  id: number;
  date: string;
  location: string;
  volunteers: number;
  wasteKg: number;
  status: DriveStatus;
  hours: number;
  coordinator?: string;
}

export interface AttendanceRecord {
  id: number;
  volunteer: string;
  email: string;
  drive: string;
  driveId: number;
  date: string;
  hours: number;
  waste: number;
  status: AttendanceStatus;
}

export interface Report {
  id: number;
  title: string;
  type: ReportType;
  generated: string;
  drives: number;
  volunteers: number;
  wasteKg: number;
  totalHours: number;
}

export interface AppSettings {
  orgName: string;
  contactEmail: string;
  notifyNewDrive: boolean;
  notifyNewVolunteer: boolean;
  notifyWeeklyReport: boolean;
  maxDriveHours: number;
  allowSelfRegistration: boolean;
  requireApproval: boolean;
  maintenanceMode: boolean;
}

export interface ConfirmState {
  type: "admin" | "user";
  id: number;
  name: string;
}

export interface WasteBarData {
  name: string;
  waste: number;
}

export interface VolunteerBarData {
  name: string;
  volunteers: number;
}

export interface CityData {
  name: string;
  value: number;
}
import {
  Clock,
  Droplets,
  Star,
  Waves,
} from "lucide-react";

import type {
  DashboardData,
  Drive,
  MetricData,
  SectionId,
} from "@/types/user";

export const sectionLabel: Record<SectionId, string> = {
  overview: "My Dashboard",
  upcoming: "Upcoming Drives",
  drives: "My Drives",
  attendance: "My Activity",
  certificates: "Certificates",
  profile: "My Profile",
};

export const createUserMetrics = (
  data: DashboardData | null
): MetricData[] => [
    {
      id: "m1",
      label: "Drives Joined",
      value: data?.stats?.drivesJoined || 0,
      icon: Waves,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      id: "m2",
      label: "Hours Volunteered",
      value: data?.stats?.hoursVolunteered || 0,
      unit: "hrs",
      icon: Clock,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      id: "m3",
      label: "Waste Collected",
      value: data?.stats?.wasteCollected || 0,
      unit: "kg",
      icon: Droplets,
      color: "text-purple-600",
      bg: "bg-purple-50",
    },
  ];

export const createMyDrives = (
  data: DashboardData | null
): Drive[] =>
  data?.recentDrives?.map((d) => {
    const driveDate = new Date(d.date);

    return {
      id: d.driveId.toString(),

      driveId: d.driveId,

      participationId: d.participationId,

      attendanceMarked: d.attendanceMarked,

      title: d.title,

      location: d.location,

      date:
        driveDate.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) +
        ", " +
        driveDate.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),

      status: d.status,

      volunteers: 0,

      hoursLogged: d.hours,

      description: d.description,

      type: d.type,
    };
  }) || [];
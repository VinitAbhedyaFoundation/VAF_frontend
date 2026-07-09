import type { Activity } from "@/types/user";

export const calculateWeeklyStreak = (activity: Activity[]) => {
    if (!activity?.length) return 0;

    const weeks = new Set<string>();

    activity.forEach((a) => {
        const date = new Date(a.date);
        const firstDay = new Date(date.getFullYear(), 0, 1);

        const pastDays = Math.floor(
            (date.getTime() - firstDay.getTime()) /
                (1000 * 60 * 60 * 24)
        );

        const week = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);

        weeks.add(`${date.getFullYear()}-${week}`);
    });

    return weeks.size;
};

export const getWeeklyHeatmapData = (activity: Activity[]) => {
    const weeks = Array.from({ length: 53 }, () => ({
        hours: 0,
        waste: 0,
        location: "",
        date: "",
    }));

    activity?.forEach((a) => {
        const date = new Date(a.date);
        const firstDay = new Date(date.getFullYear(), 0, 1);

        const pastDays = Math.floor(
            (date.getTime() - firstDay.getTime()) /
                (1000 * 60 * 60 * 24)
        );

        const week = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
        const index = Math.min(week - 1, 52);

        weeks[index].hours += a.hours ?? 0;
        weeks[index].waste += a.waste ?? 0;
        weeks[index].location = a.location ?? "Unknown";
        weeks[index].date = date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
        });
    });

    return weeks;
};
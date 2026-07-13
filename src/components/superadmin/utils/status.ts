export const getStatusClass = (status: string): string => {
    switch (status) {
        case "Active":
        case "Approved":
        case "Marked":
        case "Sent":
        case "Completed":
            return "bg-green-100 text-green-700";

        case "Upcoming":
        case "Quarterly":
            return "bg-blue-100 text-blue-700";

        case "Pending":
        case "Draft":
        case "Suspended":
        case "Annual":
            return "bg-orange-100 text-orange-700";

        case "Monthly":
            return "bg-purple-100 text-purple-700";

        case "Inactive":
        default:
            return "bg-slate-100 text-slate-600";
    }
};
export const getStatusBadgeClass = (status: string): string => {
  switch (status) {
    case "Completed":
      return "bg-emerald-100 text-emerald-700";

    case "Joined":
      return "bg-blue-100 text-blue-700";

    case "Upcoming":
      return "bg-amber-100 text-amber-700";

    case "Pending":
      return "bg-yellow-100 text-yellow-700";

    case "Approved":
      return "bg-emerald-100 text-emerald-700";

    case "Rejected":
      return "bg-red-100 text-red-700";

    case "Marked":
      return "bg-emerald-100 text-emerald-700";

    default:
      return "bg-slate-100 text-slate-600";
  }
};

import API from "@/api/api";

export const getDashboard = async () => {
  try {
    const res = await API.get("/dashboard/me");
    return res.data;
  } catch (error) {
    console.error("Dashboard fetch failed:", error);
    throw new Error("Failed to fetch dashboard");
  }
};

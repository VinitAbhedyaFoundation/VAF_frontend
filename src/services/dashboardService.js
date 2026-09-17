const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:3000/api";

export const getDashboard = async (token) => {
  const res = await fetch(
    `${API_URL}/dashboard/me`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
};
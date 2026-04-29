export const getDashboard = async (token) => {
  const res = await fetch("http://localhost:3000/dashboard/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard");
  }

  return res.json();
};
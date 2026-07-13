import API from "./api";

export const scanAttendance = async (
  participationId: number
) => {
  const response = await API.post(
    "/attendance/scan",
    {
      participationId,
    }
  );

  return response.data;
};
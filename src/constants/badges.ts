export interface Badge {
  name: string;
  minDrives: number;
}

export const BADGES = [
  {
    name: "Bronze",
    minDrives: 0,
  },
  {
    name: "Silver",
    minDrives: 5,
  },
  {
    name: "Gold",
    minDrives: 10,
  },
  {
    name: "Platinum",
    minDrives: 25,
  },
  {
    name: "Diamond",
    minDrives: 50,
  },
] as const;
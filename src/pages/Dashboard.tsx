"use client";

import React, { useEffect, useMemo, useState } from "react";
import { getDashboard } from "../services/dashboardService";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  Calendar,
  Droplets,
  Clock,
  TrendingUp,
  Menu,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function AdvancedDashboard() {
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  // 🔥 FETCH DATA FROM BACKEND
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        const data = await getDashboard(token);
        console.log("Dashboard API:", data);

        setDashboardData(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ❌ ERROR UI
  if (error) {
    return (
      <div className="p-10 text-red-500 font-bold text-center">
        {error}
      </div>
    );
  }

  // 🔥 METRICS FROM API
  const metrics = dashboardData
    ? [
        {
          id: "1",
          label: "Drives Joined",
          value: dashboardData.stats.drivesJoined,
          icon: Calendar,
        },
        {
          id: "2",
          label: "Hours Volunteered",
          value: dashboardData.stats.hoursVolunteered,
          icon: Clock,
        },
        {
          id: "3",
          label: "Waste Collected",
          value: dashboardData.stats.wasteCollected,
          icon: Droplets,
        },
        {
          id: "4",
          label: "Impact Points",
          value: dashboardData.stats.impactPoints,
          icon: TrendingUp,
        },
      ]
    : [];

  // 🔐 LOGOUT FIX
  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    toast.success("Logged out");
    setTimeout(() => navigate("/login"), 500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <Toaster />

      {/* HEADER */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-500"
        >
          <LogOut size={18} />
          Logout
        </button>
      </div>

      {/* METRICS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {loading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-28 bg-gray-200 animate-pulse rounded-xl"
                />
              ))
          : metrics.map((m) => (
              <motion.div
                key={m.id}
                className="bg-white p-6 rounded-xl shadow"
              >
                <div className="flex justify-between mb-4">
                  <m.icon className="text-emerald-500" />
                </div>

                <h2 className="text-3xl font-bold">
                  <CountUp end={m.value} duration={1.5} />
                </h2>
                <p className="text-sm text-gray-500">{m.label}</p>
              </motion.div>
            ))}
      </div>

      {/* CHART */}
      <div className="bg-white p-6 rounded-xl shadow h-[400px]">
        <h2 className="font-bold mb-4">Activity</h2>

        {loading ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            Loading chart...
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={dashboardData?.activity || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />

              <Area
                type="monotone"
                dataKey="hours"
                stroke="#10b981"
                fill="#10b98133"
              />

              <Area
                type="monotone"
                dataKey="waste"
                stroke="#6366f1"
                fill="#6366f133"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* RECENT DRIVES */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">Recent Drives</h2>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="space-y-3">
            {dashboardData?.recentDrives?.map((d: any, i: number) => (
              <div
                key={i}
                className="p-4 border rounded-lg flex justify-between"
              >
                <div>
                  <p className="font-semibold">{d.title}</p>
                  <p className="text-sm text-gray-500">
                    {d.location} • {d.date}
                  </p>
                </div>

                <span className="text-sm text-emerald-600">
                  {d.hours} hrs
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
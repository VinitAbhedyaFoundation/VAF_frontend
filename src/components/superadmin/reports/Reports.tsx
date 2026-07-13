"use client";

import { Dispatch, FC, SetStateAction } from "react";

import { motion } from "framer-motion";
import { Download, Plus } from "lucide-react";
import toast from "react-hot-toast";

import { getStatusClass } from "../utils/status";

import type { Report } from "@/types/superadmin";

interface ReportsProps {
  reports: Report[];
  setReportModal: Dispatch<SetStateAction<boolean>>;
}

const Reports: FC<ReportsProps> = ({
  reports,
  setReportModal,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Reports</h1>
          <p className="text-slate-500 text-sm">
            Generate and download impact reports.
          </p>
        </div>

        <button
          onClick={() => setReportModal(true)}
          className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-100 flex items-center gap-2"
        >
          <Plus size={16} />
          Generate Report
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Total Reports",
            val: reports.length,
            icon: "📊",
          },
          {
            label: "Monthly",
            val: reports.filter(
              (r) => r.type === "Monthly"
            ).length,
            icon: "📅",
          },
          {
            label: "Quarterly",
            val: reports.filter(
              (r) => r.type === "Quarterly"
            ).length,
            icon: "📈",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm"
          >
            <p className="text-2xl mb-1">
              {stat.icon}
            </p>

            <p className="text-3xl font-black">
              {stat.val}
            </p>

            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Report Cards */}
      <div className="space-y-4">
        {reports.map((report) => (
          <motion.div
            key={report.id}
            layout
            className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                      report.type
                    )}`}
                  >
                    {report.type}
                  </span>

                  <span className="text-xs text-slate-400">
                    Generated: {report.generated}
                  </span>
                </div>

                <h2 className="font-bold text-lg">
                  {report.title}
                </h2>
              </div>

              <button
                onClick={() =>
                  toast.success("Report downloaded")
                }
                className="bg-slate-100 text-slate-600 hover:bg-slate-200 transition px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-1.5"
              >
                <Download size={14} />
                Download
              </button>
            </div>

            <div className="flex gap-6 text-sm text-slate-500">
              {[
                {
                  label: "Drives",
                  val: report.drives,
                },
                {
                  label: "Volunteers",
                  val: report.volunteers,
                },
                {
                  label: "Waste (kg)",
                  val: report.wasteKg,
                },
                {
                  label: "Hours",
                  val: report.totalHours,
                },
              ].map((item) => (
                <div key={item.label}>
                  <span className="font-black text-slate-900">
                    {item.val}
                  </span>{" "}
                  <span className="text-xs text-slate-400">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Reports;
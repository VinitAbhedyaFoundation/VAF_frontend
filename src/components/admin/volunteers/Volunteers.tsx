import React from "react";
import { Plus, Users, Clock, Search, Eye } from "lucide-react";

import SectionLoader from "../common/SectionLoader";
import type { Volunteer } from "../../../types/admin";

interface VolunteersProps {
  volunteers: Volunteer[];
  loadingVolunteers: boolean;

  volunteerSearch: string;
  setVolunteerSearch: React.Dispatch<React.SetStateAction<string>>;

  volunteerFilter: "All" | "New" | "Pending";
  setVolunteerFilter: React.Dispatch<
    React.SetStateAction<"All" | "New" | "Pending">
  >;

  filteredVolunteers: Volunteer[];
  newVolunteers: number;
  pendingVolunteers: number;

  setShowVolunteerModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedVolunteer: React.Dispatch<
    React.SetStateAction<Volunteer | null>
  >;

  handleApproveVolunteer: (volunteer: Volunteer) => void;
  getStatusClass: (status: string) => string;
}

const Volunteers: React.FC<VolunteersProps> = ({
  volunteers,
  loadingVolunteers,
  volunteerSearch,
  setVolunteerSearch,
  volunteerFilter,
  setVolunteerFilter,
  filteredVolunteers,
  newVolunteers,
  pendingVolunteers,
  setShowVolunteerModal,
  setSelectedVolunteer,
  handleApproveVolunteer,
  getStatusClass,
}) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold themed-text">Volunteers</h1>
          <p className="themed-secondary text-sm">
            Manage your volunteer community.
          </p>
        </div>

        <button
          onClick={() => setShowVolunteerModal(true)}
          className="accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition accent-shadow flex items-center gap-2"
        >
          <Plus size={16} />
          Add Volunteer
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            label: "Total",
            val: volunteers.length,
            icon: Users,
            color: "themed-subtle themed-secondary",
          },
          {
            label: "New Members",
            val: newVolunteers,
            icon: Plus,
            color: "bg-purple-50 text-purple-600",
          },
          {
            label: "Pending Approval",
            val: pendingVolunteers,
            icon: Clock,
            color: "bg-orange-50 text-orange-600",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="themed-card rounded-2xl p-5 border themed-border shadow-sm"
          >
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${s.color}`}
            >
              <s.icon size={20} />
            </div>

            <p className="text-3xl font-black themed-text">{s.val}</p>

            <p className="text-xs font-bold themed-muted uppercase tracking-widest mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {loadingVolunteers ? (
        <SectionLoader />
      ) : (
        <>
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 themed-muted"
              />

              <input
                value={volunteerSearch}
                onChange={(e) => setVolunteerSearch(e.target.value)}
                placeholder="Search volunteers..."
                className="w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm input-themed"
              />
            </div>

            <div className="flex gap-2">
              {(["All", "New", "Pending"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setVolunteerFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                    volunteerFilter === f
                      ? "accent-bg text-white"
                      : "themed-card border themed-border themed-secondary themed-hover"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="themed-card rounded-2xl shadow-sm border themed-border overflow-hidden">
            <table className="w-full text-sm">
              <thead className="themed-subtle text-left">
                <tr>
                  {[
                    "Name",
                    "Email",
                    "City",
                    "Drives",
                    "Status",
                    "Action",
                  ].map((h) => (
                    <th
                      key={h}
                      className="p-4 text-xs font-bold themed-muted uppercase tracking-wider"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {filteredVolunteers.map((v) => (
                  <tr
                    key={v.id}
                    className="border-t themed-border table-row-hover transition cursor-pointer"
                    onClick={() => setSelectedVolunteer(v)}
                  >
                    <td className="p-4 font-semibold themed-text">{v.name}</td>

                    <td className="p-4 themed-muted text-xs">{v.email}</td>

                    <td className="p-4 themed-secondary">{v.city}</td>

                    <td className="p-4 themed-secondary">{v.drives}</td>

                    <td className="p-4">
                      <span
                        className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                          v.status
                        )}`}
                      >
                        {v.status}
                      </span>
                    </td>

                    <td
                      className="p-4"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {v.status === "Pending" ? (
                        <button
                          onClick={() => handleApproveVolunteer(v)}
                          className="accent-text font-semibold text-sm accent-text-hover"
                        >
                          Approve
                        </button>
                      ) : (
                        <button
                          onClick={() => setSelectedVolunteer(v)}
                          className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1"
                        >
                          <Eye size={14} />
                          View
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredVolunteers.length === 0 && (
              <p className="text-center themed-muted py-8 text-sm">
                No volunteers found.
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Volunteers;
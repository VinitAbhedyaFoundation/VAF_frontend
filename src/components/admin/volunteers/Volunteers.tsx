import React from "react";
import {
  Plus,
  Users,
  Clock,
  Search,
  Eye,
  Trash2,
} from "lucide-react";

import SectionLoader from "../common/SectionLoader";
import type { Volunteer } from "../../../types/admin";

interface VolunteersProps {
  volunteers: Volunteer[];
  loadingVolunteers: boolean;
  isSuperAdmin: boolean;

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

  handleRemoveVolunteer: (volunteer: Volunteer) => void;

  getStatusClass: (status: string) => string;
}

const Volunteers: React.FC<VolunteersProps> = ({
  volunteers,
  loadingVolunteers,
  isSuperAdmin,
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
  handleRemoveVolunteer,
  getStatusClass,
}) => {
  const handleRemove = (
    e: React.MouseEvent,
    volunteer: Volunteer
  ) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to remove ${volunteer.name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    handleRemoveVolunteer(volunteer);
  };

  return (
    <div>
      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold themed-text">
            Volunteers
          </h1>

          <p className="themed-secondary text-sm">
            Manage your volunteer community.
          </p>
        </div>

        {isSuperAdmin && (
          <button
            onClick={() => setShowVolunteerModal(true)}
            className="accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition accent-shadow flex items-center gap-2"
          >
            <Plus size={16} />
            Add Volunteer
          </button>
        )}
      </div>

      {/* =====================================================
          STAT CARDS
      ===================================================== */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
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

            <p className="text-3xl font-black themed-text">
              {s.val}
            </p>

            <p className="text-xs font-bold themed-muted uppercase tracking-widest mt-1">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      {loadingVolunteers ? (
        <SectionLoader />
      ) : (
        <>
          {/* Search + Filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-4">
            <div className="relative flex-1">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 themed-muted"
              />

              <input
                value={volunteerSearch}
                onChange={(e) =>
                  setVolunteerSearch(e.target.value)
                }
                placeholder="Search volunteers..."
                className="w-full pl-9 pr-4 py-2.5 border rounded-xl text-sm input-themed"
              />
            </div>

            <div className="flex gap-2">
              {(["All", "New", "Pending"] as const).map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() =>
                      setVolunteerFilter(filter)
                    }
                    className={`px-4 py-2 rounded-xl text-sm font-bold transition ${volunteerFilter === filter
                        ? "accent-bg text-white"
                        : "themed-card border themed-border themed-secondary themed-hover"
                      }`}
                  >
                    {filter}
                  </button>
                )
              )}
            </div>
          </div>

          {/* =================================================
              VOLUNTEER TABLE
          ================================================= */}
          <div className="themed-card rounded-2xl shadow-sm border themed-border overflow-hidden">
            <div className="overflow-x-auto">
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
                    ].map((heading) => (
                      <th
                        key={heading}
                        className="p-4 text-xs font-bold themed-muted uppercase tracking-wider whitespace-nowrap"
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {filteredVolunteers.map((volunteer) => (
                    <tr
                      key={volunteer.id}
                      className="border-t themed-border table-row-hover transition cursor-pointer"
                      onClick={() =>
                        setSelectedVolunteer(volunteer)
                      }
                    >
                      {/* Name */}
                      <td className="p-4 font-semibold themed-text whitespace-nowrap">
                        {volunteer.name}
                      </td>

                      {/* Email */}
                      <td className="p-4 themed-muted text-xs">
                        {volunteer.email}
                      </td>

                      {/* City */}
                      <td className="p-4 themed-secondary">
                        {volunteer.city}
                      </td>

                      {/* Drives */}
                      <td className="p-4 themed-secondary">
                        {volunteer.drives}
                      </td>

                      {/* Status */}
                      <td className="p-4">
                        <span
                          className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                            volunteer.status
                          )}`}
                        >
                          {volunteer.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td
                        className="p-4"
                        onClick={(e) =>
                          e.stopPropagation()
                        }
                      >
                        <div className="flex items-center gap-3">
                          {volunteer.status === "Pending" ? (
                            <button
                              onClick={() =>
                                handleApproveVolunteer(
                                  volunteer
                                )
                              }
                              className="accent-text font-semibold text-sm accent-text-hover"
                            >
                              Approve
                            </button>
                          ) : (
                            <button
                              onClick={() =>
                                setSelectedVolunteer(
                                  volunteer
                                )
                              }
                              className="text-blue-600 font-semibold text-sm hover:text-blue-700 flex items-center gap-1"
                            >
                              <Eye size={14} />
                              View
                            </button>
                          )}

                          {/* Remove */}
                          {isSuperAdmin && (
                            <button
                              onClick={(e) => handleRemove(e, volunteer)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition"
                              title={`Remove ${volunteer.name}`}
                              aria-label={`Remove ${volunteer.name}`}
                            >
                              <Trash2 size={15} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty state */}
            {filteredVolunteers.length === 0 && (
              <div className="text-center themed-muted py-10">
                <Users
                  size={28}
                  className="mx-auto mb-3 opacity-40"
                />

                <p className="text-sm font-semibold">
                  No volunteers found.
                </p>

                <p className="text-xs mt-1 opacity-70">
                  Try changing your search or filter.
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Volunteers;
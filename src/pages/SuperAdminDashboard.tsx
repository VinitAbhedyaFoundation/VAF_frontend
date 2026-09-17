"use client";

import React from "react";

import Admins from "@/components/superadmin/admins/Admins";
import Attendance from "@/components/superadmin/attendance/Attendance";
import ConfirmDialog from "@/components/superadmin/common/ConfirmDialog";
import InputField from "@/components/superadmin/common/InputField";
import Modal from "@/components/superadmin/common/Modal";
import AdminDrawer from "@/components/superadmin/drawers/AdminDrawer";
import UserDrawer from "@/components/superadmin/drawers/UserDrawer";
import Drives from "@/components/superadmin/drives/Drives";
import Header from "@/components/superadmin/layout/Header";
import Sidebar from "@/components/superadmin/layout/Sidebar";
import Overview from "@/components/superadmin/overview/Overview";
import Settings from "@/components/superadmin/settings/Settings";
import Users from "@/components/superadmin/users/Users";
import { useSuperAdminDashboard } from "@/hooks/useSuperAdminDashboard";

import type { NavSection } from "@/types/superadmin";

import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";


// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SuperAdminDashboard() {
  // ── dashboard state ─────────────────────────────────────────────────────────

  const {
    settings,
    setSettings,

    active,

    isMobileMenuOpen,
    setIsMobileMenuOpen,

    admins,
    users,
    drives,
    attendance,

    adminModal,
    userModal,

    viewAdmin,
    viewUser,

    confirm,

    submitting,

    adminForm,
    userForm,

    adminSearch,
    userSearch,

    driveFilter,
    attendanceFilter,

    totalWaste,
    totalHours,
    completedDrives,
    pendingAttendance,

    filteredAdmins,
    filteredUsers,
    filteredDrives,
    filteredAttendance,

    cityData,
    wasteBarData,
    volunteerBarData,

    handleAddAdmin,
    handleAddUser,
    confirmDelete,
    toggleAdminStatus,
    toggleUserStatus,
    approveSelectedAttendance,
    goTo,
    handleLogout,

    setAdminSearch,
    setUserSearch,
    setDriveFilter,
    setAttendanceFilter,

    setAdminModal,
    setUserModal,

    setViewAdmin,
    setViewUser,

    setConfirm,
    setAdminForm,
    setUserForm,
  } = useSuperAdminDashboard();

  const pendingBadge =
    pendingAttendance > 0
      ? `${pendingAttendance} Pending`
      : undefined;

  // ─────────────────────────────────────────────────────────────────────────────
  // SECTIONS
  // ─────────────────────────────────────────────────────────────────────────────

  const SECTION_COMPONENTS: Record<
    NavSection,
    React.ReactNode
  > = {
    overview: (
      <Overview
        drives={drives}
        admins={admins}
        users={users}
        attendance={attendance}
        totalWaste={totalWaste}
        totalHours={totalHours}
        completedDrives={completedDrives}
        wasteBarData={wasteBarData}
        volunteerBarData={volunteerBarData}
        cityData={cityData}
        goTo={goTo}
      />
    ),

    admins: (
      <Admins
        admins={admins}
        filteredAdmins={filteredAdmins}
        adminSearch={adminSearch}
        setAdminSearch={setAdminSearch}
        setAdminModal={setAdminModal}
        setViewAdmin={setViewAdmin}
        setConfirm={setConfirm}
        toggleAdminStatus={toggleAdminStatus}
      />
    ),

    users: (
      <Users
        users={users}
        filteredUsers={filteredUsers}
        userSearch={userSearch}
        setUserSearch={setUserSearch}
        setUserModal={setUserModal}
        setViewUser={setViewUser}
        setConfirm={setConfirm}
        toggleUserStatus={toggleUserStatus}
      />
    ),

    drives: (
      <Drives
        drives={drives}
        filteredDrives={filteredDrives}
        driveFilter={driveFilter}
        setDriveFilter={setDriveFilter}
        completedDrives={completedDrives}
      />
    ),

    attendance: (
      <Attendance
        attendance={attendance}
        filteredAttendance={filteredAttendance}
        attendanceFilter={attendanceFilter}
        setAttendanceFilter={setAttendanceFilter}
        pendingAttendance={pendingAttendance}
        approveSelectedAttendance={approveSelectedAttendance}
      />
    ),

    reports: null,

    settings: (
      <Settings
        settings={settings}
        setSettings={setSettings}
        goTo={goTo}
      />
    ),
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* ─────────────────────────────────────────────────────────────
          DESKTOP SIDEBAR
      ───────────────────────────────────────────────────────────── */}

      <Sidebar
        active={active}
        pendingBadge={pendingBadge}
        goTo={goTo}
      />

      {/* ─────────────────────────────────────────────────────────────
          MOBILE SIDEBAR
      ───────────────────────────────────────────────────────────── */}

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-40 xl:hidden"
              onClick={() =>
                setIsMobileMenuOpen(false)
              }
            />

            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              transition={{
                type: "spring",
                damping: 28,
              }}
              className="fixed left-0 top-0 h-full bg-white z-50 xl:hidden"
            >
              <Sidebar
                mobile
                active={active}
                pendingBadge={pendingBadge}
                goTo={goTo}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────────────────────────────────────
          MAIN
      ───────────────────────────────────────────────────────────── */}

      <div className="flex-1 min-w-0">

        {/* Header */}

        <Header
          active={active}
          pendingAttendance={pendingAttendance}
          onOpenMobileMenu={() =>
            setIsMobileMenuOpen(true)
          }
          onLogout={handleLogout}
        />

        {/* Content */}

        <main className="p-4 lg:p-8">
          {SECTION_COMPONENTS[active]}
        </main>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          TOASTS
      ───────────────────────────────────────────────────────────── */}

      <Toaster position="top-right" />

      {/* ─────────────────────────────────────────────────────────────
          DRAWERS
      ───────────────────────────────────────────────────────────── */}

      <AdminDrawer
        admin={viewAdmin}
        onClose={() => setViewAdmin(null)}
      />

      <UserDrawer
        user={viewUser}
        onClose={() => setViewUser(null)}
      />

      {/* ─────────────────────────────────────────────────────────────
          CONFIRM DELETE
      ───────────────────────────────────────────────────────────── */}

      <ConfirmDialog
        open={!!confirm}
        message={`Delete ${confirm?.name}?`}
        onConfirm={confirmDelete}
        onCancel={() => setConfirm(null)}
      />

      {/* ─────────────────────────────────────────────────────────────
    ADD ADMIN MODAL
───────────────────────────────────────────────────────────── */}

      <Modal
        open={adminModal}
        onClose={() => setAdminModal(false)}
        title="Add Admin"
      >
        {/* Name */}
        <InputField
          label="Name *"
          value={adminForm.name}
          onChange={(v) =>
            setAdminForm((p) => ({
              ...p,
              name: v,
            }))
          }
          placeholder="e.g. Rahul Sharma"
        />

        {/* Email */}
        <InputField
          label="Email *"
          type="email"
          value={adminForm.email}
          onChange={(v) =>
            setAdminForm((p) => ({
              ...p,
              email: v,
            }))
          }
          placeholder="e.g. rahul@gmail.com"
        />

        {/* City */}
        <InputField
          label="City *"
          value={adminForm.city}
          onChange={(v) =>
            setAdminForm((p) => ({
              ...p,
              city: v,
            }))
          }
          placeholder="e.g. Pune"
        />

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Gender *
          </label>

          <select
            value={adminForm.gender}
            onChange={(e) =>
              setAdminForm((p) => ({
                ...p,
                gender: e.target.value as
                  | ""
                  | "Male"
                  | "Female"
                  | "Other",
              }))
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">Select gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Password */}
        <InputField
          label="Temporary Password *"
          type="password"
          value={adminForm.password}
          onChange={(v) =>
            setAdminForm((p) => ({
              ...p,
              password: v,
            }))
          }
          placeholder="e.g. Admin@123"
        />

        {/* Temporary Password Instructions */}
        <div className="mt-2 mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs font-semibold text-amber-800 mb-1">
            Important: Temporary Password
          </p>

          <p className="text-xs text-amber-700 leading-relaxed">
            This is a temporary password assigned to the new Admin.
            The Admin must log in using this password and change it
            immediately from the <strong>Settings</strong> section.
          </p>
        </div>

        {/* Submit */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleAddAdmin}
            disabled={submitting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition disabled:opacity-60"
          >
            {submitting ? "Creating..." : "Create Admin"}
          </button>
        </div>
      </Modal>

      {/* ─────────────────────────────────────────────────────────────
          ADD VOLUNTEER MODAL
      ───────────────────────────────────────────────────────────── */}

      <Modal
        open={userModal}
        onClose={() => setUserModal(false)}
        title="Add Volunteer"
      >
        {/* Name */}

        <InputField
          label="Name *"
          value={userForm.name}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              name: v,
            }))
          }
          placeholder="e.g. Priya Sharma"
        />

        {/* Email */}

        <InputField
          label="Email *"
          type="email"
          value={userForm.email}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              email: v,
            }))
          }
          placeholder="e.g. priya@gmail.com"
        />

        {/* City */}

        <InputField
          label="City *"
          value={userForm.city}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              city: v,
            }))
          }
          placeholder="e.g. Pune"
        />

        {/* Gender */}

        <div className="mb-4">
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Gender *
          </label>

          <select
            value={userForm.gender}
            onChange={(e) =>
              setUserForm((p) => ({
                ...p,
                gender: e.target.value as
                  | ""
                  | "Male"
                  | "Female"
                  | "Other",
              }))
            }
            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="">
              Select gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>
          </select>
        </div>

        {/* Password */}
        <InputField
          label="Temporary Password *"
          type="password"
          value={userForm.password}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              password: v,
            }))
          }
          placeholder="e.g. Volunteer@123"
        />

        {/* Temporary Password Instructions */}
        <div className="mt-2 mb-4 rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs font-semibold text-amber-800 mb-1">
            Important: Temporary Password
          </p>

          <p className="text-xs text-amber-700 leading-relaxed">
            This is a temporary password assigned to the new volunteer.
            The volunteer must log in using this password and change it
            immediately from the <strong>Settings</strong> section.
          </p>
        </div>

        {/* Information */}

        <p className="text-xs text-slate-500 bg-slate-50 border border-slate-100 rounded-xl p-3 mt-2">
          New volunteer will be created as{" "}
          <strong>Pending</strong> and must be
          approved before participating in
          drives.
        </p>

        {/* Submit */}

        <div className="flex justify-end mt-6">
          <button
            onClick={handleAddUser}
            disabled={submitting}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition disabled:opacity-60"
          >
            {submitting
              ? "Adding..."
              : "Add Volunteer"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
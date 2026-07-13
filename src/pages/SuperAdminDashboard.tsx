"use client";

import Admins from "@/components/superadmin/admins/Admins";
import Attendance from "@/components/superadmin/attendance/Attendance";
import ConfirmDialog from "@/components/superadmin/common/ConfirmDialog";
import InputField from "@/components/superadmin/common/InputField";
import Modal from "@/components/superadmin/common/Modal";
import SelectField from "@/components/superadmin/common/SelectField";
import AdminDrawer from "@/components/superadmin/drawers/AdminDrawer";
import UserDrawer from "@/components/superadmin/drawers/UserDrawer";
import Drives from "@/components/superadmin/drives/Drives";
import Header from "@/components/superadmin/layout/Header";
import Sidebar from "@/components/superadmin/layout/Sidebar";
import Overview from "@/components/superadmin/overview/Overview";
import Reports from "@/components/superadmin/reports/Reports";
import Settings from "@/components/superadmin/settings/Settings";
import Users from "@/components/superadmin/users/Users";
import { useSuperAdminDashboard } from "@/hooks/useSuperAdminDashboard";
import type {
  NavSection,
  ReportType
} from "@/types/superadmin";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "react-hot-toast";
import { PIE_COLORS } from "@/constants/superadmin";

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export default function SuperAdminDashboard() {

  

  // ── dashboard state ─────────────────────────────────────────────────────────────────
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
  reports,
  adminModal,
  userModal,
  reportModal,
  viewAdmin,
  viewUser,
  confirm,
  submitting,
  adminForm,
  userForm,
  reportForm,
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
  markAttendance,
  generateReport,
  goTo,
  handleLogout,
  setAdminSearch,
  setUserSearch,
  setDriveFilter,
  setAttendanceFilter,
  setAdminModal,
  setUserModal,
  setReportModal,
  setViewAdmin,
  setViewUser,
  setConfirm,
  setAdminForm,
  setUserForm,
  setReportForm,
} = useSuperAdminDashboard();

  const pendingBadge = pendingAttendance > 0 ? `${pendingAttendance} Pending` : undefined;

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
        cityData={cityData}
        pieColors={PIE_COLORS}
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
        markAttendance={markAttendance}
      />
    ),

    reports: (
      <Reports
        reports={reports}
        setReportModal={setReportModal}
      />
    ),

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

      {/* Desktop Sidebar */}
      <Sidebar
        active={active}
        pendingBadge={pendingBadge}
        goTo={goTo}
      />

      {/* Mobile Sidebar */}
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
              transition={{ type: "spring", damping: 28 }}
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

      {/* Main */}
      <div className="flex-1 min-w-0">

        {/* Header */}
        <Header
          active={active}
          pendingAttendance={pendingAttendance}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          onLogout={handleLogout}
        />

        {/* Content */}
        <main className="p-4 lg:p-8">
          {SECTION_COMPONENTS[active]}
        </main>
      </div>

      {/* Toasts */}
      <Toaster position="top-right" />

      {/* Drawers */}
      <AdminDrawer
        admin={viewAdmin}
        onClose={() => setViewAdmin(null)}
      />

      <UserDrawer
        user={viewUser}
        onClose={() => setViewUser(null)}
      />

      {/* Confirm */}
      <ConfirmDialog
        open={!!confirm}
        message={`Delete ${confirm?.name}?`}
        onConfirm={confirmDelete}
        onCancel={() => setConfirm(null)}
      />

      {/* Add Admin Modal */}
      <Modal
        open={adminModal}
        onClose={() => setAdminModal(false)}
        title="Add Admin"
      >
        <InputField
          label="Name"
          value={adminForm.name}
          onChange={(v) =>
            setAdminForm((p) => ({
              ...p,
              name: v,
            }))
          }
        />

        <InputField
          label="Email"
          type="email"
          value={adminForm.email}
          onChange={(v) =>
            setAdminForm((p) => ({
              ...p,
              email: v,
            }))
          }
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={handleAddAdmin}
            disabled={submitting}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm"
          >
            {submitting ? "Creating..." : "Create Admin"}
          </button>
        </div>
      </Modal>

      {/* Add User Modal */}
      <Modal
        open={userModal}
        onClose={() => setUserModal(false)}
        title="Add Volunteer"
      >
        <InputField
          label="Name"
          value={userForm.name}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              name: v,
            }))
          }
        />

        <InputField
          label="Email"
          type="email"
          value={userForm.email}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              email: v,
            }))
          }
        />

        <InputField
          label="City"
          value={userForm.city}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              city: v,
            }))
          }
        />

        <InputField
          label="Password"
          type="password"
          value={userForm.password}
          onChange={(v) =>
            setUserForm((p) => ({
              ...p,
              password: v,
            }))
          }
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={handleAddUser}
            disabled={submitting}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm"
          >
            {submitting ? "Adding..." : "Add Volunteer"}
          </button>
        </div>
      </Modal>

      {/* Report Modal */}
      <Modal
        open={reportModal}
        onClose={() => setReportModal(false)}
        title="Generate Report"
      >
        <SelectField
          label="Report Type"
          value={reportForm.type}
          onChange={(v) =>
            setReportForm({
              type: v as ReportType,
            })
          }
          options={[
            {
              value: "Monthly",
              label: "Monthly",
            },
            {
              value: "Quarterly",
              label: "Quarterly",
            },
            {
              value: "Annual",
              label: "Annual",
            },
          ]}
        />

        <div className="flex justify-end mt-6">
          <button
            onClick={generateReport}
            disabled={submitting}
            className="bg-emerald-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm"
          >
            {submitting
              ? "Generating..."
              : "Generate"}
          </button>
        </div>
      </Modal>
    </div>
  );
}
import React from "react";

import Modal from "../common/Modal";
import InputField from "../common/InputField";
import Spinner from "../common/Spinner";

interface VolunteerForm {
  name: string;
  email: string;
  city: string;
  gender: "" | "Male" | "Female" | "Other";
  password: string;
}

interface AddVolunteerModalProps {
  open: boolean;
  onClose: () => void;

  volunteerForm: VolunteerForm;
  setVolunteerForm: React.Dispatch<
    React.SetStateAction<VolunteerForm>
  >;

  submitting: boolean;

  handleAddVolunteer: () => void | Promise<void>;
}

const AddVolunteerModal: React.FC<AddVolunteerModalProps> = ({
  open,
  onClose,
  volunteerForm,
  setVolunteerForm,
  submitting,
  handleAddVolunteer,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add New Volunteer"
    >
      {/* Full Name */}
      <InputField
        label="Full Name *"
        value={volunteerForm.name}
        onChange={(v) =>
          setVolunteerForm((prev) => ({
            ...prev,
            name: v,
          }))
        }
        placeholder="e.g. Priya Sharma"
      />

      {/* Email */}
      <InputField
        label="Email *"
        type="email"
        value={volunteerForm.email}
        onChange={(v) =>
          setVolunteerForm((prev) => ({
            ...prev,
            email: v,
          }))
        }
        placeholder="priya@gmail.com"
      />

      {/* City */}
      <InputField
        label="City *"
        value={volunteerForm.city}
        onChange={(v) =>
          setVolunteerForm((prev) => ({
            ...prev,
            city: v,
          }))
        }
        placeholder="e.g. Pune"
      />

      {/* Gender */}
      <div className="mb-4">
        <label className="block text-sm font-semibold themed-secondary mb-2">
          Gender *
        </label>

        <select
          value={volunteerForm.gender}
          onChange={(e) =>
            setVolunteerForm((prev) => ({
              ...prev,
              gender: e.target.value as
                | ""
                | "Male"
                | "Female"
                | "Other",
            }))
          }
          className="w-full px-4 py-3 rounded-xl border themed-border themed-input outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="">Select gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {/* Temporary Password */}
      <InputField
        label="Temporary Password *"
        type="password"
        value={volunteerForm.password}
        onChange={(v) =>
          setVolunteerForm((prev) => ({
            ...prev,
            password: v,
          }))
        }
        placeholder="e.g. Volunteer@123"
      />

      {/* Information */}
      <p className="text-xs themed-muted mb-4 themed-subtle rounded-xl p-3">
        New volunteer will be added as{" "}
        <strong>Pending</strong> and must be approved before
        they can participate.
      </p>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={onClose}
          disabled={submitting}
          className="px-4 py-2 text-sm themed-subtle rounded-xl font-semibold themed-secondary disabled:opacity-60"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleAddVolunteer}
          disabled={submitting}
          className="px-5 py-2 text-sm accent-bg accent-bg-hover text-white rounded-xl font-bold transition flex items-center gap-2 disabled:opacity-60"
        >
          {submitting && <Spinner size={16} />}
          {submitting ? "Adding..." : "Add Volunteer 👤"}
        </button>
      </div>
    </Modal>
  );
};

export default AddVolunteerModal;
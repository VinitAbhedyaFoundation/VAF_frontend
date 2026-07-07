import React from "react";

import Modal from "../common/Modal";
import InputField from "../common/InputField";
import Spinner from "../common/Spinner";

interface VolunteerForm {
  name: string;
  email: string;
  city: string;
  age: string;
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

      <InputField
        label="Age"
        type="number"
        value={volunteerForm.age}
        onChange={(v) =>
          setVolunteerForm((prev) => ({
            ...prev,
            age: v,
          }))
        }
        placeholder="e.g. 23"
      />

      <InputField
        label="Temporary Password"
        type="password"
        value={volunteerForm.password}
        onChange={(v) =>
          setVolunteerForm((prev) => ({
            ...prev,
            password: v,
          }))
        }
        placeholder="Default: Volunteer@123"
      />

      <p className="text-xs themed-muted mb-4 themed-subtle rounded-xl p-3">
        New volunteer will be added as <strong>Pending</strong> and must be
        approved before they can participate.
      </p>

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm themed-subtle rounded-xl font-semibold themed-secondary"
        >
          Cancel
        </button>

        <button
          onClick={handleAddVolunteer}
          disabled={submitting}
          className="px-5 py-2 text-sm accent-bg accent-bg-hover text-white rounded-xl font-bold transition flex items-center gap-2 disabled:opacity-60"
        >
          {submitting && <Spinner size={16} />}
          Add Volunteer 👤
        </button>
      </div>
    </Modal>
  );
};

export default AddVolunteerModal;
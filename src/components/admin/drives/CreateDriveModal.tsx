import React from "react";

import Modal from "../common/Modal";
import InputField from "../common/InputField";
import Spinner from "../common/Spinner";

interface CreateDriveModalProps {
  open: boolean;
  onClose: () => void;

  driveForm: {
    title: string;
    location: string;
    date: string;
    totalHours: string;
  };

  setDriveForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      location: string;
      date: string;
      totalHours: string;
    }>
  >;

  submitting: boolean;

  handleCreateDrive: () => void;
}

const CreateDriveModal: React.FC<CreateDriveModalProps> = ({
  open,
  onClose,
  driveForm,
  setDriveForm,
  submitting,
  handleCreateDrive,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Create New Drive"
    >
      <InputField
        label="Title *"
        value={driveForm.title}
        onChange={(v) =>
          setDriveForm((prev) => ({
            ...prev,
            title: v,
          }))
        }
        placeholder="e.g. Community Cleanup"
      />

      <InputField
        label="Location *"
        value={driveForm.location}
        onChange={(v) =>
          setDriveForm((prev) => ({
            ...prev,
            location: v,
          }))
        }
        placeholder="e.g. Central Park"
      />

      <InputField
        label="Date & Time *"
        type="datetime-local"
        value={driveForm.date}
        onChange={(v) =>
          setDriveForm((prev) => ({
            ...prev,
            date: v,
          }))
        }
      />

      <InputField
        label="Total Hours *"
        type="number"
        value={driveForm.totalHours}
        onChange={(v) =>
          setDriveForm((prev) => ({
            ...prev,
            totalHours: v,
          }))
        }
        placeholder="e.g. 3"
      />

      <div className="flex justify-end gap-3 pt-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm themed-subtle rounded-xl font-semibold themed-secondary"
        >
          Cancel
        </button>

        <button
          onClick={handleCreateDrive}
          disabled={submitting}
          className="px-5 py-2 text-sm accent-bg accent-bg-hover text-white rounded-xl font-bold transition flex items-center gap-2 disabled:opacity-60"
        >
          {submitting && <Spinner size={16} />}
          Create Drive 🚀
        </button>
      </div>
    </Modal>
  );
};

export default CreateDriveModal;
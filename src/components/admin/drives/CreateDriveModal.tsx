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
    initiative: string;
    description: string;
  };
  setDriveForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      location: string;
      date: string;
      totalHours: string;
      initiative: string;
      description: string;
    }>
  >;
  submitting: boolean;
  isEditing?: boolean;
  handleCreateDrive: () => void;
}

const FIELD_LABEL_CLASS =
  "block text-xs font-semibold uppercase tracking-wider themed-subtle";

const FIELD_CONTROL_CLASS =
  "themed-text themed-secondary themed-border h-[44px] w-full rounded-xl border bg-transparent px-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20";

const CreateDriveModal: React.FC<CreateDriveModalProps> = ({
  open,
  onClose,
  driveForm,
  setDriveForm,
  submitting,
  isEditing = false,
  handleCreateDrive,
}) => {
  const updateField = (
    field: keyof CreateDriveModalProps["driveForm"],
    value: string,
  ) => {
    setDriveForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  return (
    <Modal open={open} onClose={onClose} title={isEditing ? "Edit Drive" : "Create New Drive"}>
      <div className="space-y-4">
        <InputField
          label="Title *"
          value={driveForm.title}
          onChange={(value) => updateField("title", value)}
          placeholder="e.g. Community Cleanup"
        />

        <InputField
          label="Location *"
          value={driveForm.location}
          onChange={(value) => updateField("location", value)}
          placeholder="e.g. Central Park"
        />

        <div className="space-y-2">
          <label htmlFor="drive-initiative" className={FIELD_LABEL_CLASS}>
            Initiative *
          </label>

          <div className="relative">
            <select
              id="drive-initiative"
              value={driveForm.initiative}
              onChange={(event) =>
                updateField("initiative", event.target.value)
              }
              required
              className={`${FIELD_CONTROL_CLASS} appearance-none cursor-pointer pr-10`}
            >
              <option value="">Select an initiative</option>
              <option value="LAAL_BINDI">Laal Bindi</option>
              <option value="SOCIAL_SHELF">Social Shelf</option>
              <option value="SAMBHAJINAGAR_PLOGGERS">
                Sambhajinagar Ploggers
              </option>
            </select>

            <svg
              aria-hidden="true"
              className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 themed-subtle"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </div>

        <InputField
          label="Date & Time *"
          type="datetime-local"
          value={driveForm.date}
          onChange={(value) => updateField("date", value)}
        />

        <InputField
          label="Total Hours *"
          type="number"
          value={driveForm.totalHours}
          onChange={(value) => updateField("totalHours", value)}
          placeholder="e.g. 3"
        />

        <div className="space-y-2">
          <label htmlFor="drive-description" className={FIELD_LABEL_CLASS}>
            Description <span className="normal-case tracking-normal">(Optional)</span>
          </label>

          <textarea
            id="drive-description"
            value={driveForm.description}
            onChange={(event) =>
              updateField("description", event.target.value)
            }
            placeholder="Add details about the drive..."
            rows={3}
            maxLength={2000}
            className={`${FIELD_CONTROL_CLASS} h-auto min-h-[88px] resize-y py-3 leading-relaxed`}
          />

          <p className="themed-subtle text-right text-xs">
            {driveForm.description.length}/2000
          </p>
        </div>

        <div className="themed-border flex justify-end gap-3 border-t pt-4">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="themed-secondary themed-text rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleCreateDrive}
            disabled={submitting}
            className="accent-bg accent-bg-hover flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting && <Spinner size={16} />}
            {submitting ? (isEditing ? "Saving..." : "Creating...") : (isEditing ? "Save Changes" : "Create Drive")}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateDriveModal;

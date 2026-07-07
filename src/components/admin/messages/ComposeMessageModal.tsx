import React from "react";
import { Send } from "lucide-react";

import Modal from "../common/Modal";
import InputField from "../common/InputField";
import Spinner from "../common/Spinner";
import type { Volunteer } from "@/types/admin";

interface MessageForm {
  title: string;
  content: string;
}

interface ComposeMessageModalProps {
  open: boolean;
  onClose: () => void;

  volunteers: Volunteer[];

  messageForm: MessageForm;
  setMessageForm: React.Dispatch<
    React.SetStateAction<MessageForm>
  >;

  submitting: boolean;

  handleSendMessage: () => void | Promise<void>;
}

const ComposeMessageModal: React.FC<ComposeMessageModalProps> = ({
  open,
  onClose,
  volunteers,
  messageForm,
  setMessageForm,
  submitting,
  handleSendMessage,
}) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Compose Message"
    >
      <div className="accent-bg-soft rounded-xl p-3 mb-4 text-sm accent-text font-medium">
        📧 Message will be sent to{" "}
        <strong>
          {volunteers.filter((v) => v.status === "Approved").length}
          {" "}approved volunteers
        </strong>{" "}
        via email.
      </div>

      <InputField
        label="Subject / Title *"
        value={messageForm.title}
        onChange={(v) =>
          setMessageForm((prev) => ({
            ...prev,
            title: v,
          }))
        }
        placeholder="e.g. Sunday Drive Reminder"
      />

      <div className="mb-4">
        <label className="block text-xs font-bold themed-muted uppercase tracking-widest mb-1.5">
          Message Content *
        </label>

        <textarea
          value={messageForm.content}
          onChange={(e) =>
            setMessageForm((prev) => ({
              ...prev,
              content: e.target.value,
            }))
          }
          placeholder="Write your message here..."
          className="w-full border rounded-xl px-4 py-2.5 text-sm transition input-themed h-28 resize-none"
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm themed-subtle rounded-xl font-semibold themed-secondary"
        >
          Cancel
        </button>

        <button
          onClick={handleSendMessage}
          disabled={submitting}
          className="px-5 py-2 text-sm accent-bg accent-bg-hover text-white rounded-xl font-bold transition flex items-center gap-2 disabled:opacity-60"
        >
          {submitting ? <Spinner size={16} /> : <Send size={14} />}
          Send Message
        </button>
      </div>
    </Modal>
  );
};

export default ComposeMessageModal;
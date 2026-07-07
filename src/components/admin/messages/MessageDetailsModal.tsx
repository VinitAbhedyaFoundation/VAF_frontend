import React from "react";

import Modal from "../common/Modal";
import type { MessageItem } from "@/types/admin";

interface MessageDetailsModalProps {
  message: MessageItem | null;
  onClose: () => void;
  getStatusClass: (status: string) => string;
}

const MessageDetailsModal: React.FC<MessageDetailsModalProps> = ({
  message,
  onClose,
  getStatusClass,
}) => {
  return (
    <Modal
      open={!!message}
      onClose={onClose}
      title={message?.title ?? ""}
    >
      {message && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                message.status
              )}`}
            >
              {message.status}
            </span>

            <span className="text-xs themed-muted">
              {message.date}
            </span>

            {message.status === "Sent" && (
              <span className="text-xs themed-muted">
                • {message.recipients} recipients
              </span>
            )}
          </div>

          <div className="themed-subtle rounded-xl p-4 text-sm themed-secondary leading-7">
            {message.content}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm themed-subtle rounded-xl font-semibold themed-secondary"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default MessageDetailsModal;
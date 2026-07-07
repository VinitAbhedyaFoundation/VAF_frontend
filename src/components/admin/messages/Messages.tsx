import React from "react";
import { Send, ChevronRight } from "lucide-react";

import SectionLoader from "../common/SectionLoader";
import type { MessageItem } from "../../../types/admin";

interface MessagesProps {
  messages: MessageItem[];
  loadingMessages: boolean;

  setShowMessageModal: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMessage: React.Dispatch<
    React.SetStateAction<MessageItem | null>
  >;

  getStatusClass: (status: string) => string;
}

const Messages = ({
  messages,
  loadingMessages,
  setShowMessageModal,
  setSelectedMessage,
  getStatusClass,
}: MessagesProps) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold themed-text">Messages</h1>
          <p className="themed-secondary text-sm">
            Compose and send messages to your volunteers via email.
          </p>
        </div>

        <button
          onClick={() => setShowMessageModal(true)}
          className="accent-bg accent-bg-hover text-white px-5 py-2.5 rounded-xl text-sm font-bold transition accent-shadow flex items-center gap-2"
        >
          <Send size={16} />
          New Message
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {[
          {
            label: "Sent",
            val: messages.filter((m) => m.status === "Sent").length,
            icon: "✉️",
          },
          {
            label: "Total Reach",
            val: messages
              .filter((m) => m.status === "Sent")
              .reduce((s, m) => s + m.recipients, 0),
            icon: "👥",
          },
        ].map((s) => (
          <div
            key={s.label}
            className="themed-card rounded-2xl p-5 border themed-border shadow-sm"
          >
            <p className="text-2xl mb-1">{s.icon}</p>
            <p className="text-3xl font-black themed-text">{s.val}</p>
            <p className="text-xs font-bold themed-muted uppercase tracking-widest">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      {loadingMessages ? (
        <SectionLoader />
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className="themed-card p-5 rounded-2xl shadow-sm border themed-border themed-hover transition"
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h2 className="font-bold text-lg themed-text">
                    {msg.title}
                  </h2>

                  {msg.status === "Sent" && (
                    <p className="text-xs themed-muted">
                      Sent to all volunteers
                    </p>
                  )}
                </div>

                <span
                  className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusClass(
                    msg.status
                  )}`}
                >
                  {msg.status}
                </span>
              </div>

              <p className="text-sm themed-secondary mb-3">
                {msg.content}
              </p>

              <div className="flex justify-between items-center">
                <span className="text-xs themed-muted">
                  {msg.date}
                </span>

                <button
                  onClick={() => setSelectedMessage(msg)}
                  className="accent-text text-sm font-semibold inline-flex items-center gap-1 accent-text-hover"
                >
                  View
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}

          {messages.length === 0 && (
            <p className="text-center themed-muted py-10 text-sm">
              No messages yet. Send your first one!
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default Messages;
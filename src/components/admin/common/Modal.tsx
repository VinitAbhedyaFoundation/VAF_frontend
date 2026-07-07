import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  title,
  children,
}) => (
  <AnimatePresence>
    {open && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={onClose}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 30 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 flex items-center justify-center z-50 px-4"
        >
          <div className="themed-card w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border">
            <div className="flex items-center justify-between px-6 py-4 border-b themed-border">
              <h2 className="text-lg font-black themed-text">
                {title}
              </h2>

              <button
                onClick={onClose}
                className="p-1.5 themed-hover rounded-full transition themed-muted"
              >
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-5">
              {children}
            </div>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

export default Modal;
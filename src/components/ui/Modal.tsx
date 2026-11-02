"use client";

import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import { twMerge } from "tailwind-merge";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  panelClassName?: string;
};

export default function Modal({
  open,
  onClose,
  children,
  panelClassName = "",
}: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} transition className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/80 duration-300 ease-out data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel
          transition
          className={twMerge(
            "relative duration-300 ease-out data-closed:opacity-0 data-closed:scale-95",
            panelClassName
          )}
        >
          {children}
        </DialogPanel>
      </div>
    </Dialog>
  );
}

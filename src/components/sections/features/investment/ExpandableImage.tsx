"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";

type ExpandableImageProps = {
  src: string;
  alt?: string;
  className?: string;
};

export default function ExpandableImage({
  src,
  alt = "",
  className = "",
}: ExpandableImageProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={`group relative ${className}`}>
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="w-full h-full rounded-lg object-cover"
        />
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Expand image"
          className="absolute top-2 right-2 flex items-center justify-center h-8 w-8 rounded-full bg-white/90 text-[#333333] shadow-md opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 3H3V9M15 3H21V9M21 15V21H15M3 15V21H9"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      <Modal open={open} onClose={() => setOpen(false)}>
        <img
          src={src}
          alt={alt}
          className="block max-w-[80vw] max-h-[80vh] w-auto h-auto rounded-lg object-contain"
        />
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Close"
          className="absolute top-2 right-2 flex items-center justify-center h-9 w-9 rounded-full bg-white text-[#333333] shadow-md cursor-pointer"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6L18 18M18 6L6 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Modal>
    </>
  );
}

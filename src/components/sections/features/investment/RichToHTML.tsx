"use client";

import Bold from "@tiptap/extension-bold";
import Link from "@tiptap/extension-link";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { twJoin } from "tailwind-merge";

type RichToHTMLProps = {
  content: string | object;
  className?: string;
};

export default function RichToHTML({
  content,
  className = "",
}: RichToHTMLProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Configure paragraph to handle line breaks properly
        paragraph: {
          HTMLAttributes: {
            class: "mb-4 last:mb-0",
          },
        },
        // Enable hard breaks for \n characters
        hardBreak: {
          HTMLAttributes: {
            class: "block",
          },
        },
      }),
      Bold,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline hover:text-primary-dark",
        },
      }),
    ],
    content, // Accepts both JSON and HTML string
    editable: false,
    immediatelyRender: false,
    parseOptions: {
      preserveWhitespace: "full",
    },
  });

  return (
    <div
      className={twJoin(className, "typo-p", "it-links", "whitespace-pre-line")}
    >
      <EditorContent editor={editor} />
    </div>
  );
}

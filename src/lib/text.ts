import { JSONContent } from "@tiptap/react";

export function extractLists(text: string) {
  if (!text) return [];
  const output = text.split("- ");
  return output;
}

export function serialize(text: string) {
  let output: string[] | string = text;
  output = extractLists(output);
  return output;
}

export function formatPublisherForCardBadge(
  text: string,
  maxLength: number = 32
) {
  if (!text) return "";
  if (text.length > maxLength) {
    return text.slice(0, maxLength) + "...";
  }
  return text;
}

export function parseImageUrls(text: string | null | undefined): string[] {
  if (!text) return [];
  // Split only on commas that precede the start of the next URL, since a
  // single URL (e.g. Substack's CDN fetch URLs) can itself contain commas.
  return text
    .split(/,(?=\s*https?:\/\/)/)
    .map((url) => url.trim().replace(/,+$/, ""))
    .filter(Boolean);
}

export const hasContent = (
  content: string | JSONContent | null | undefined
): boolean => {
  if (!content) return false;

  // If content is JSON
  if (typeof content === "object") {
    // Check if content has any text nodes
    const hasText = (node: JSONContent): boolean => {
      if (node.type === "text" && node.text?.trim()) {
        return true;
      }

      if (node.content) {
        return node.content.some(hasText);
      }

      return false;
    };

    return hasText(content);
  }

  return false;
};

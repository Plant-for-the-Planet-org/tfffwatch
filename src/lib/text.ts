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

export function serializePersons(text: string) {
  if (!text) return [];
  const persons = text.split("\n\n").map((block) => {
    const [nameOrgLine, emailLine] = block.trim().split("\n");
    const [name, organization] = nameOrgLine?.split(" · ");
    const email = emailLine?.trim();
    return { name, organization, email };
  });
  return persons;
}

export function serializeEndorsements(text: string) {
  if (!text) return [];
  // Split blocks by blank lines (robust to multiple blank lines / spaces)
  const blocks = text
    .trim()
    .split(/\n\s*\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  const endorsements = blocks.map((block) => {
    const lines = block
      .split(/\n+/)
      .map((line) => line.trim())
      .filter((line) => line.length > 0);

    // Find the last line that looks like an author line, starting with -, – or —
    let authorIndex = -1;
    for (let i = lines.length - 1; i >= 0; i -= 1) {
      if (/^[-–—]\s*/.test(lines[i])) {
        authorIndex = i;
        break;
      }
    }

    // If no explicit author line, treat entire block as statement
    if (authorIndex === -1) {
      return {
        statement: lines.join(" ").replace(/\s+/g, " ").trim(),
        name: "",
        position: "",
      };
    }

    const statement = lines
      .slice(0, authorIndex)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    const authorLine = lines[authorIndex].replace(/^[-–—]\s*/, "").trim();
    const [namePart, ...rest] = authorLine.split(",");
    const name = (namePart || "").trim();
    const position = rest.join(",").trim();

    return { statement, name, position };
  });

  return endorsements;
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

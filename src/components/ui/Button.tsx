import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ComponentProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type ButtonIcon = "arrow" | "chevron" | "none";

type Props = {
  type: "button" | "link";
  href?: string;
  cn?: string;
  external?: boolean;
  /** `solid` is the Planet green pill; `soft` is the light green one for a second action. */
  variant?: "solid" | "soft";
  /**
   * Icon on the right. Defaults to `arrow` for links that leave the site,
   * `chevron` for links inside it, and `none` for plain buttons.
   */
  icon?: ButtonIcon;
  children?: ReactNode;
  onClick?: ComponentProps<"button">["onClick"];
};

const VARIANTS = {
  solid:
    "bg-primary-planet-green hover:bg-primary-planet-green/85 text-white",
  soft: "bg-primary-light text-primary-planet-green hover:bg-primary hover:text-white",
};

function defaultIcon(type: Props["type"], href: string): ButtonIcon {
  if (type !== "link") return "none";
  return href.startsWith("/") || href.startsWith("#") ? "chevron" : "arrow";
}

/** CTA pill, shared with Cali Watch: centred label, icon on the right. */
export function Button({
  type = "button",
  href = "#",
  cn = "",
  external = false,
  variant = "solid",
  icon,
  children,
  onClick,
}: Props) {
  // The arrow asset is white, so it would vanish on the soft surface.
  const wanted = icon ?? defaultIcon(type, href);
  const resolvedIcon = variant === "soft" && wanted === "arrow" ? "chevron" : wanted;

  const body = (
    <span className="flex justify-between items-center flex-nowrap">
      <span></span>
      <span className="font-semibold typo-p px-3">{children}</span>
      <span>
        {resolvedIcon === "arrow" && (
          <Image
            width={12}
            height={12}
            src="/assets/ui/Arrow.svg"
            alt=""
            aria-hidden
          />
        )}
        {resolvedIcon === "chevron" && (
          <ChevronRight aria-hidden strokeWidth={3} className="size-4" />
        )}
      </span>
    </span>
  );

  const className = twMerge(
    "inline-block min-w-40 px-5 py-3 rounded-full cursor-pointer transition-colors",
    VARIANTS[variant],
    resolvedIcon === "chevron" && "min-w-0",
    cn,
  );

  if (type === "link")
    return (
      <Link
        href={href}
        target={external ? "_blank" : "_self"}
        rel={external ? "noopener noreferrer" : undefined}
        className={className}
      >
        {body}
      </Link>
    );

  return (
    <button className={className} onClick={onClick}>
      {body}
    </button>
  );
}

type IconButtonProps = {
  small?: boolean;
  href?: string;
  cn?: string;
  external?: boolean;
  children?: ReactNode;
};

export function IconButton({
  small = false,
  href = "#",
  cn = "",
  external = false,
  children = null,
}: IconButtonProps) {
  return (
    <Link
      href={href}
      target={external ? "_blank" : "_self"}
      rel={external ? "noopener noreferrer" : ""}
      className={twMerge(
        "block bg-primary-planet-green hover:bg-primary-planet-green/85 text-white h-10 w-10 rounded-full cursor-pointer transition-colors",
        small && "h-8 w-8",
        cn,
      )}
    >
      <span className="h-full flex justify-center items-center">
        {children && <span>{children}</span>}
        {external && (
          <Image
            className={twMerge("", small && "w-3 h-3")}
            width={16}
            height={16}
            src="/assets/ui/Arrow.svg"
            alt=""
            aria-hidden
          />
        )}
      </span>
    </Link>
  );
}

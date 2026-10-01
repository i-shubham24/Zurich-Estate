"use client";

import type { ReactNode } from "react";
import { site } from "@/lib/site";

/**
 * Email link that reliably opens a *new* message to compose on every device:
 *
 * - href is a standard `mailto:` so the link is copyable, works without JS,
 *   and on phones/tablets (Android, iPhone, iPad) opens the device's default
 *   mail app, which is Gmail when Gmail is set as the default.
 * - On a desktop/laptop (fine pointer, e.g. Windows, macOS) the click instead
 *   opens Gmail's web compose window in a new tab, so it works even when no
 *   desktop mail client is configured (which is what caused the old download).
 */
export default function MailLink({
  className = "",
  children,
  ariaLabel,
}: {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const gmailCompose = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    site.email
  )}`;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Respect new-tab / modifier clicks.
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) {
      return;
    }
    // Primary input is a mouse → desktop/laptop: open Gmail web compose.
    // Primary input is touch → let the mailto href open the native mail app.
    const touchPrimary =
      typeof window !== "undefined" &&
      window.matchMedia("(pointer: coarse)").matches;
    if (!touchPrimary) {
      e.preventDefault();
      window.open(gmailCompose, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <a
      href={site.emailHref}
      aria-label={ariaLabel}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}

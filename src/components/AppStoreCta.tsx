import type { ReactNode } from "react";
import { APP_STORE_URL } from "@/lib/appstore";

const iconClass = "h-[1.125rem] w-[1.125rem] shrink-0";

export function IosIcon({ className = iconClass }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="7" y="2.5" width="10" height="19" rx="2.2" />
      <path d="M10.5 5h3" />
      <circle cx="12" cy="18.6" r="0.85" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function MacIcon({ className = iconClass }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <rect x="3.5" y="3.5" width="17" height="11.5" rx="1.4" />
      <path d="M2 18.5h20" />
      <path d="M8 18.5v1.4c0 .6.6 1.1 1.4 1.1h5.2c.8 0 1.4-.5 1.4-1.1V18.5" />
    </svg>
  );
}

export function PlatformIcons({
  className = "inline-flex items-center gap-1.5",
  iconClassName,
}: {
  className?: string;
  iconClassName?: string;
}) {
  return (
    <span className={className} aria-hidden="true">
      <IosIcon className={iconClassName} />
      <MacIcon className={iconClassName} />
    </span>
  );
}

type AppStoreCtaProps = {
  children: ReactNode;
  className?: string;
  icons?: boolean;
  iconClassName?: string;
  /** Accessible name; should mention App Store and platforms when icons are shown. */
  ariaLabel?: string;
};

export default function AppStoreCta({
  children,
  className,
  icons = false,
  iconClassName,
  ariaLabel,
}: AppStoreCtaProps) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      aria-label={ariaLabel}
    >
      {icons ? <PlatformIcons iconClassName={iconClassName} /> : null}
      {children}
    </a>
  );
}

"use client";
import { usePathname, useRouter } from "next/navigation";
import { locales, nativeNames, COOKIE, isLocale, type Locale } from "@/lib/i18n";
export default function LangSwitcher({ l, label }: { l: Locale; label: string }) {
  const path = usePathname(), router = useRouter();
  const go = (n: string) => {
    document.cookie = `${COOKIE}=${n}; path=/; max-age=31536000; samesite=lax`;
    const parts = (path || "/").split("/");
    if (isLocale(parts[1])) parts[1] = n; else parts.splice(1, 0, n);
    router.push(parts.join("/") + window.location.hash);
  };
  return (<label className="relative inline-flex items-center"><span className="sr-only">{label}</span>
    <svg aria-hidden className="pointer-events-none absolute start-2 h-4 w-4 text-navy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14.5 0 18M12 3c-3 3.5-3 14.5 0 18"/></svg>
    <select value={l} onChange={(e) => go(e.target.value)} className="cursor-pointer appearance-none rounded-[5px] border border-line bg-white py-1.5 pe-3 ps-8 text-sm font-medium text-navy hover:border-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand">
      {locales.map((x) => <option key={x} value={x} lang={x}>{nativeNames[x]}</option>)}
    </select></label>);
}

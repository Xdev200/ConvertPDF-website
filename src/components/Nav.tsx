import Link from "next/link";
import type { Locale, Messages } from "@/lib/i18n";

export default function Nav({ l, m }: { l: Locale; m: Messages }) {
  const n = m.nav;
  return (
    <header className="border-b border-line bg-white">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href={`/${l}`} className="flex items-center gap-2 text-lg font-bold text-navy" dir="ltr">
          <span aria-hidden className="grid h-8 w-8 place-items-center rounded-[5px] bg-brand text-sm font-black text-white">
            C
          </span>
          <span>
            Convert<span className="text-brand">PDF</span>
          </span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-4 text-sm font-semibold sm:gap-6">
          <a href={`/${l}#apps`} className="text-navy hover:text-brand">
            {n.getApp}
          </a>
          <a href={`/${l}#pricing`} className="text-navy hover:text-brand">
            {n.pricing}
          </a>
          <Link href={`/${l}/support`} className="btn !px-5 !py-2">
            {n.support}
          </Link>
        </nav>
      </div>
    </header>
  );
}

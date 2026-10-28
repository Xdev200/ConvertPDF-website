import Link from "next/link";
import LangSwitcher from "./LangSwitcher";
import type { Locale, Messages } from "@/lib/i18n";
export default function Nav({ l, m }: { l: Locale; m: Messages }) {
  const n = m.nav;
  return (<header className="border-b border-line bg-white">
    <div className="wrap flex h-16 items-center justify-between gap-4">
      <Link href={`/${l}`} className="flex items-center gap-2 text-lg font-bold text-navy" dir="ltr">
        <span aria-hidden className="grid h-8 w-8 place-items-center rounded-[5px] bg-brand text-sm font-black text-white">C</span>
        <span>Convert<span className="text-brand">PDF</span></span></Link>
      <nav aria-label="Main" className="hidden items-center gap-7 text-sm font-medium text-navy lg:flex">
        {[["#tools",n.tools],["#merge",n.merge],["#sign",n.sign],["#pricing",n.pricing],["#files",n.files]].map(([h,t])=>(<a key={h} href={`/${l}${h}`} className="hover:text-brand">{t}</a>))}</nav>
      <div className="flex items-center gap-3 text-sm font-semibold sm:gap-4"><LangSwitcher l={l} label={n.language} /><Link href={`/${l}/support`} className="hidden text-navy hover:text-brand sm:inline">{n.login}</Link><a href={`/${l}#pricing`} className="btn !px-5 !py-2">{n.signup}</a></div>
    </div></header>);
}

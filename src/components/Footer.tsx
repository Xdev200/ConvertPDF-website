import Link from "next/link";
import type { Locale, Messages } from "@/lib/i18n";
export default function Footer({ l, m }: { l: Locale; m: Messages }) {
  return (
    <footer className="border-t border-line bg-white">
      <div className="wrap flex flex-col gap-4 py-8 text-sm text-muted md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} ConvertPDF. {m.footer.rights}</p>
        <nav aria-label="Footer" className="flex flex-wrap gap-6 font-medium text-navy">
          <Link href={`/${l}/privacy`} className="hover:text-brand">{m.footer.privacy}</Link>
          <Link href={`/${l}/terms`} className="hover:text-brand">{m.footer.terms}</Link>
          <Link href={`/${l}/support`} className="hover:text-brand">{m.footer.support}</Link>
          <a href={`/${l}#pricing`} className="hover:text-brand">{m.footer.pricing}</a>
        </nav>
      </div>
    </footer>
  );
}

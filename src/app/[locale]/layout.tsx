import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Poppins, Noto_Sans_Devanagari, Noto_Sans_Arabic } from "next/font/google";
import "../globals.css";
import { locales, isLocale, rtlLocales, getMessages } from "@/lib/i18n";
const p = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-p", display: "swap", fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"] });
const hi = Noto_Sans_Devanagari({ subsets: ["devanagari", "latin"], weight: ["400", "500", "600", "700"], variable: "--font-hi", display: "swap", fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"] });
const ar = Noto_Sans_Arabic({ subsets: ["arabic"], weight: ["400", "500", "600", "700"], variable: "--font-ar", display: "swap", fallback: ["system-ui", "Segoe UI", "Arial", "sans-serif"] });
export const dynamicParams = false;
export function generateStaticParams() { return locales.map((locale) => ({ locale })); }
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  if (!isLocale(params.locale)) return {};
  const m = await getMessages(params.locale);
  return {
    title: m.meta.title, description: m.meta.description,
    alternates: { canonical: `/${params.locale}`, languages: { ...Object.fromEntries(locales.map((l) => [l, `/${l}`])), "x-default": "/en" } },
  };
}
export default async function RootLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const m = await getMessages(params.locale);
  return (<html lang={params.locale} dir={rtlLocales.includes(params.locale) ? "rtl" : "ltr"} className={`${p.variable} ${hi.variable} ${ar.variable}`}><body>
    <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:start-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2">{m.skip}</a>
    {children}</body></html>);
}

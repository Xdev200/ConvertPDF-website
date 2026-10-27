export const locales = ["en","hi","ar","de","es","fr","id","it","ja","ko","pt","vi","zh","zh-TW"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const nativeNames: Record<Locale, string> = {
  en: "English", hi: "हिन्दी", ar: "العربية", de: "Deutsch", es: "Español", fr: "Français", id: "Bahasa Indonesia",
  it: "Italiano", ja: "日本語", ko: "한국어", pt: "Português", vi: "Tiếng Việt", zh: "简体中文", "zh-TW": "繁體中文",
};
export const rtlLocales: Locale[] = ["ar"];
export const isLocale = (s: string): s is Locale => (locales as readonly string[]).includes(s);
export const COOKIE = "NEXT_LOCALE";
export function matchLocale(header: string | null | undefined): Locale {
  if (!header) return defaultLocale;
  const items = header.split(",").map((p) => { const [t, q] = p.trim().split(";q="); return { t: t.toLowerCase(), q: q ? parseFloat(q) : 1 }; }).filter((x) => x.t && x.t !== "*").sort((a, b) => b.q - a.q);
  for (const { t } of items) {
    if (t === "zh-tw" || t === "zh-hk" || t === "zh-mo" || t.startsWith("zh-hant")) return "zh-TW";
    if (t.startsWith("zh")) return "zh";
    const base = t.split("-")[0];
    if (base === "in") return "id";
    const hit = locales.find((l) => l.toLowerCase() === base);
    if (hit) return hit;
  }
  return defaultLocale;
}
export type Messages = typeof import("../messages/en.json");
export async function getMessages(l: Locale): Promise<Messages> {
  return (await import(`../messages/${l}.json`)).default as Messages;
}
// "<b>x</b>" markup helper
export function rich(s: string, cls = "text-brand") {
  return s.split(/(<b>.*?<\/b>)/g).map((p, i) => p.startsWith("<b>") ? <span key={i} className={cls}>{p.slice(3, -4)}</span> : p);
}

import Legal from "@/components/Legal";
import { isLocale, getMessages, locales } from "@/lib/i18n";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) return {};
  const m = await getMessages(params.locale);
  return { title: m.meta.privacyTitle, alternates: { canonical: `/${params.locale}/privacy`, languages: Object.fromEntries(locales.map((l) => [l, `/${l}/privacy`])) } };
}
export default async function Page({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const m = await getMessages(params.locale);
  return <Legal l={params.locale} m={m} doc={m.privacy} />;
}

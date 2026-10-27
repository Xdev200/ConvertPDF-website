import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import { Tools, Converter, Pricing, Faq, Cta, Apps } from "@/components/Sections";
import { isLocale, getMessages } from "@/lib/i18n";
import { notFound } from "next/navigation";
export default async function Home({ params }: { params: { locale: string } }) {
  if (!isLocale(params.locale)) notFound();
  const l = params.locale, m = await getMessages(l);
  return (<><Nav l={l} m={m} /><main id="main"><Hero m={m} /><Tools m={m} /><Converter m={m} /><Pricing m={m} /><Faq m={m} /><Apps m={m} /><Cta m={m} /><div id="files" /></main><Footer l={l} m={m} /></>);
}

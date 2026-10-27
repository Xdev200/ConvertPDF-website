"use client";
import dynamic from "next/dynamic";
import { rich, type Messages } from "@/lib/i18n";
const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false, loading: () => <div className="h-[360px] md:h-[460px]" /> });
export default function Hero({ m }: { m: Messages }) {
  const h = m.hero;
  return (<section className="bg-white"><div className="wrap grid items-center gap-6 py-12 md:grid-cols-2 md:py-16">
    <div>
      <h1 className="text-4xl font-bold leading-tight text-navy md:text-5xl">{rich(h.title)}</h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-muted">{h.text}</p>
      <div className="mt-8 flex flex-wrap gap-3"><a href="#tools" className="btn">{h.explore}</a><a href="#converter" className="btn-o">{h.demo}</a></div>
    </div>
    <Hero3D />
  </div></section>);
}

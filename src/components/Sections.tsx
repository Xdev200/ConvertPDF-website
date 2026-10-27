import { rich, type Messages } from "@/lib/i18n";
const I = (c: string, t: string) => <span aria-hidden dir="ltr" className="grid h-9 w-9 shrink-0 place-items-center rounded text-[10px] font-bold text-white" style={{ background: c }}>{t}</span>;
const ICONS: [string, string][] = [["#2B6CE0","W"],["#E5484D","PDF"],["#1E9E5A","X"],["#E5484D","PDF"],["#E5484D","PDF"],["#0EA5A4","EPUB"],["#F08A24","P"],["#E31E24","IMG"],["#E5484D","PDF"],["#E31E24","PNG"],["#E5484D","PDF"],["#E31E24","JPG"],["#E31E24","BMP"],["#8B5CF6","✎"],["#8B5CF6","▤"],["#1E9E5A","⧉"],["#E5484D","✂"]];
type P = { m: Messages };
export function Tools({ m }: P) {
  const t = m.tools;
  return (<section id="tools" className="bg-white"><div className="wrap py-16">
    <h2 className="text-center text-2xl font-semibold text-navy md:text-3xl">{t.title}</h2>
    <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {t.items.map(([n, d], i) => (<li key={i} id={i === 15 ? "merge" : i === 13 ? "sign" : undefined} className="rounded-md border border-line bg-white p-4 transition hover:border-brand">
        <div className="flex items-center gap-3">{I(ICONS[i][0], ICONS[i][1])}<h3 className="text-sm font-semibold text-navy">{n}</h3></div>
        <p className="mt-2 text-xs leading-relaxed text-muted">{d}</p></li>))}
    </ul>
    <p className="mt-8 text-center"><a href="#tools" className="text-sm font-semibold text-brand hover:underline">{t.all} <span aria-hidden className="inline-block rtl:rotate-180">→</span></a></p>
  </div></section>);
}
export function Converter({ m }: P) {
  const c = m.converter;
  return (<section id="converter" className="bg-bg"><div className="wrap grid items-start gap-10 py-16 md:grid-cols-2">
    <div className="card !p-8 text-center">
      <h2 className="text-3xl font-bold leading-tight text-navy md:text-4xl">{rich(c.title)}</h2>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-muted">{c.demo}</p>
      <div className="mt-6 rounded-md border-2 border-dashed border-brand bg-[#FEF2F2] px-6 py-10">
        <span aria-hidden className="mx-auto grid h-14 w-12 place-items-center rounded bg-[#E5484D] text-xs font-bold text-white">PDF</span>
        <button type="button" disabled aria-disabled="true" className="btn mt-6 cursor-not-allowed opacity-90">{c.choose}</button>
        <p className="mt-3 text-sm text-muted">{c.drop}</p></div>
      <button type="button" disabled aria-disabled="true" className="btn mt-6 cursor-not-allowed !px-10 uppercase tracking-wide opacity-90">{c.convert}</button>
    </div>
    <div id="how" className="md:pt-6">
      <h2 className="text-2xl font-semibold text-navy">{c.howTitle}</h2>
      <ol className="mt-6 space-y-5">{c.steps.map((s, i) => (<li key={i} className="flex gap-4"><span className="grid h-8 w-8 shrink-0 place-items-center rounded bg-brand text-sm font-bold text-white">{i + 1}</span><p className="pt-1 text-muted">{s}</p></li>))}</ol>
    </div></div></section>);
}
export function Pricing({ m }: P) {
  const p = m.pricing;
  const price = [["$0",0],["$6",1],["$15",2]] as const;
  return (<section id="pricing" className="bg-white"><div className="wrap py-16">
    <h2 className="text-center text-2xl font-semibold md:text-3xl">{p.title}</h2>
    <p className="mt-2 text-center text-sm text-muted">{p.note}</p>
    <div className="mt-10 grid gap-5 md:grid-cols-3">{p.plans.map((pl, i) => { const hot = i === 1; return (
      <div key={i} className={`rounded-md border bg-white p-6 ${hot ? "border-brand ring-1 ring-brand" : "border-line"}`}>
        {hot && <span className="mb-2 inline-block rounded bg-brand px-2 py-0.5 text-xs font-semibold text-white">{p.popular}</span>}
        <h3 className="text-lg font-semibold">{pl.name}</h3><p className="mt-2"><span className="text-4xl font-bold">{price[i][0]}</span><span className="text-sm text-muted">{pl.unit}</span></p>
        <ul className="mt-5 space-y-2 text-sm text-muted">{pl.features.map((x) => <li key={x}><span className="me-2 text-brand">✓</span>{x}</li>)}</ul>
        <a href="#apps" className={`${hot ? "btn" : "btn-o"} mt-6 w-full`}>{pl.cta}</a></div>);})}</div>
  </div></section>);
}
export function Faq({ m }: P) {
  return (<section id="faq" className="bg-bg"><div className="mx-auto max-w-3xl px-5 py-16">
    <h2 className="text-center text-2xl font-semibold md:text-3xl">{m.faq.title}</h2>
    <div className="mt-8 space-y-3">{m.faq.items.map(([q, a]) => (<details key={q} className="group rounded-md border border-line bg-white p-4"><summary className="cursor-pointer list-none font-semibold text-navy marker:hidden">{q}<span className="float-end text-brand group-open:rotate-45">+</span></summary><p className="mt-2 text-sm text-muted">{a}</p></details>))}</div>
  </div></section>);
}
export function Cta({ m }: P) {
  return (<section className="bg-white"><div className="wrap py-12"><div className="flex flex-col items-start justify-between gap-6 rounded-md bg-ink px-8 py-10 md:flex-row md:items-center">
    <h2 className="text-3xl font-bold text-white">{rich(m.cta.title, "text-[#7FA8FF]")}</h2>
    <a href="#apps" className="btn !px-8">{m.cta.button}</a></div></div></section>);
}
export function Apps({ m }: P) {
  const a = m.apps;
  const A = [[a.mac[0], a.mac[1], "⌘"], [a.ios[0], a.ios[1], "▢"]];
  return (<section id="apps" className="bg-bg"><div className="wrap py-16 text-center">
    <h2 className="text-2xl font-semibold md:text-3xl">{a.title}</h2>
    <p className="mt-2 text-sm text-muted">{a.note}</p>
    <div className="mt-8 flex flex-wrap justify-center gap-4">{A.map(([t, s, ic]) => (<a key={t} href="#" className="card flex min-w-[240px] items-center gap-4 !py-4 text-start hover:border-brand"><span aria-hidden className="grid h-10 w-10 place-items-center rounded bg-ink text-white">{ic}</span><span><span className="block text-sm font-semibold">{t}</span><span className="block text-xs text-muted">{s}</span></span></a>))}</div>
  </div></section>);
}

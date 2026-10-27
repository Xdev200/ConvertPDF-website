import Nav from "./Nav";
import Footer from "./Footer";
import type { Locale, Messages } from "@/lib/i18n";
type Doc = { title: string; updated: string; sections: (string | string[])[][] };
export default function Legal({ l, m, doc }: { l: Locale; m: Messages; doc: Doc }) {
  return (<><Nav l={l} m={m} />
    <main id="main" className="mx-auto max-w-3xl px-5 py-12">
      <div role="note" className="mb-6 rounded-md border border-[#F5D58A] bg-[#FFF8E6] p-4 text-sm"><strong>{m.legal.noticeLabel}</strong> {m.legal.notice}</div>
      <div className="card !p-8"><h1 className="text-3xl font-bold">{doc.title}</h1><p className="mt-1 text-sm text-muted">{m.legal.updated}: {doc.updated}</p>
      <div className="mt-8 space-y-6 leading-relaxed text-[#4B5563] [&_h2]:mb-2 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-navy [&_ul]:list-disc [&_ul]:ps-6">
        {doc.sections.map(([h, b], i) => (<section key={i}><h2>{i + 1}. {h as string}</h2>{Array.isArray(b) ? <ul>{b.map((x) => <li key={x}>{x}</li>)}</ul> : <p>{b}</p>}</section>))}
      </div></div>
    </main><Footer l={l} m={m} /></>);
}

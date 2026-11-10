import { rich, type Messages } from "@/lib/i18n";
import AppStoreCta, { IosIcon, MacIcon } from "./AppStoreCta";
import ToolsGrid from "./ToolsGrid";

type P = { m: Messages };

export function Tools({ m }: P) {
  const t = m.tools;
  return (
    <section id="tools" className="bg-white">
      <div className="wrap py-16">
        <h2 className="text-center text-2xl font-semibold text-navy md:text-3xl">{t.title}</h2>
        <ToolsGrid items={t.items as [string, string][]} cta={t.cta} note={t.note} />
      </div>
    </section>
  );
}

export function Pricing({ m }: P) {
  const p = m.pricing;
  const single = p.plans.length === 1;
  const cols = single
    ? "md:grid-cols-1 md:max-w-md md:mx-auto"
    : p.plans.length === 2
      ? "md:grid-cols-2 md:max-w-3xl md:mx-auto"
      : "md:grid-cols-3";
  return (
    <section id="pricing" className="bg-white">
      <div className="wrap py-16">
        <h2 className="text-center text-2xl font-semibold md:text-3xl">{p.title}</h2>
        <p className="mt-2 text-center text-sm text-muted">{p.note}</p>
        {"refundBadge" in p && p.refundBadge ? (
          <p
            className="mx-auto mt-4 max-w-xl rounded-md border border-[#F5D58A] bg-[#FFF8E6] px-4 py-3 text-center text-sm font-semibold text-navy"
            role="note"
          >
            {p.refundBadge}
          </p>
        ) : null}
        <div className={`mt-10 grid gap-5 ${cols}`}>
          {p.plans.map((pl, i) => {
            const hot = single || i === p.plans.length - 1;
            return (
              <div key={i} className={`rounded-md border bg-white p-6 ${hot ? "border-brand ring-1 ring-brand" : "border-line"}`}>
                {hot && (
                  <span className="mb-2 inline-block rounded bg-brand px-2 py-0.5 text-xs font-semibold text-white">{p.popular}</span>
                )}
                <h3 className="text-lg font-semibold">{pl.name}</h3>
                <p className="mt-2">
                  <span className="text-4xl font-bold">{pl.price}</span>
                  <span className="ms-1 text-sm text-muted">{pl.unit}</span>
                </p>
                <ul className="mt-5 space-y-2 text-sm text-muted">
                  {pl.features.map((x) => (
                    <li key={x}>
                      <span className="me-2 text-brand">✓</span>
                      {x}
                    </li>
                  ))}
                </ul>
                <AppStoreCta
                  className={`${hot ? "btn" : "btn-o"} mt-6 w-full gap-2`}
                  icons
                  ariaLabel={`${pl.cta} — App Store, iPhone and Mac`}
                >
                  {pl.cta}
                </AppStoreCta>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Faq({ m }: P) {
  return (
    <section id="faq" className="bg-bg">
      <div className="mx-auto max-w-3xl px-5 py-16">
        <h2 className="text-center text-2xl font-semibold md:text-3xl">{m.faq.title}</h2>
        <div className="mt-8 space-y-3">
          {m.faq.items.map(([q, a]) => (
            <details key={q} className="group rounded-md border border-line bg-white p-4">
              <summary className="cursor-pointer list-none font-semibold text-navy marker:hidden">
                {q}
                <span className="float-end text-brand group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm text-muted">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Cta({ m }: P) {
  return (
    <section className="bg-white">
      <div className="wrap py-12">
        <div className="flex flex-col items-start justify-between gap-6 rounded-md bg-ink px-8 py-10 md:flex-row md:items-center">
          <h2 className="text-3xl font-bold text-white">{rich(m.cta.title, "text-[#7FA8FF]")}</h2>
          <AppStoreCta className="btn !px-8 gap-2" icons ariaLabel={`${m.cta.button} — App Store, iPhone and Mac`}>
            {m.cta.button}
          </AppStoreCta>
        </div>
      </div>
    </section>
  );
}

export function Apps({ m }: P) {
  const a = m.apps;
  const cards = [
    { title: a.mac[0], sub: a.mac[1], icon: <MacIcon className="h-5 w-5" />, label: `${a.mac[0]} — App Store` },
    { title: a.ios[0], sub: a.ios[1], icon: <IosIcon className="h-5 w-5" />, label: `${a.ios[0]} — App Store` },
  ];
  return (
    <section id="apps" className="bg-bg">
      <div className="wrap py-16 text-center">
        <h2 className="text-2xl font-semibold md:text-3xl">{a.title}</h2>
        <p className="mt-2 text-sm text-muted">{a.note}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {cards.map((c) => (
            <AppStoreCta
              key={c.title}
              className="card flex min-w-[240px] items-center gap-4 !py-4 text-start transition hover:border-brand"
              ariaLabel={c.label}
            >
              <span aria-hidden className="grid h-10 w-10 place-items-center rounded bg-ink text-white">
                {c.icon}
              </span>
              <span>
                <span className="block text-sm font-semibold">{c.title}</span>
                <span className="block text-xs text-muted">{c.sub}</span>
              </span>
            </AppStoreCta>
          ))}
        </div>
        <p className="mt-6">
          <AppStoreCta className="btn !px-8 gap-2" icons ariaLabel={`${m.nav.getApp} — App Store, iPhone and Mac`}>
            {m.nav.getApp}
          </AppStoreCta>
        </p>
      </div>
    </section>
  );
}

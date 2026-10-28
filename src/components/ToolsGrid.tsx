"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Item = [string, string];

const COLORS = ["#2B6CE0", "#E5484D", "#1E9E5A", "#F08A24", "#8B5CF6", "#0EA5A4", "#E31E24", "#64748B", "#DB2777", "#0891B2"];
const BATCH = 16;

function iconLabel(name: string) {
  const cleaned = name.replace(/[^A-Za-z0-9]+/g, " ").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase().slice(0, 3);
  return cleaned.slice(0, 3).toUpperCase() || "PDF";
}

function iconColor(i: number) {
  return COLORS[i % COLORS.length];
}

export default function ToolsGrid({
  items,
  cta,
  note,
}: {
  items: Item[];
  cta: string;
  note?: string;
}) {
  const [visible, setVisible] = useState(() => Math.min(BATCH, items.length));
  const sentinel = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    setVisible(Math.min(BATCH, items.length));
  }, [items]);

  useEffect(() => {
    if (visible >= items.length) return;
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible((v) => Math.min(v + BATCH, items.length));
        }
      },
      { rootMargin: "240px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [visible, items.length]);

  const shown = useMemo(() => items.slice(0, visible), [items, visible]);

  return (
    <>
      {note ? <p className="mx-auto mt-3 max-w-2xl text-center text-sm text-muted">{note}</p> : null}
      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {shown.map(([name, desc], i) => (
          <li key={`${name}-${i}`} className="rounded-md border border-line bg-white p-4 transition hover:border-brand">
            <div className="flex items-center gap-3">
              <span
                aria-hidden
                dir="ltr"
                className="grid h-9 w-9 shrink-0 place-items-center rounded text-[10px] font-bold text-white"
                style={{ background: iconColor(i) }}
              >
                {iconLabel(name)}
              </span>
              <h3 className="text-sm font-semibold text-navy">{name}</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted">{desc}</p>
            <a href="#apps" className="mt-3 inline-block text-xs font-semibold text-brand hover:underline">
              {cta} <span aria-hidden className="inline-block rtl:rotate-180">→</span>
            </a>
          </li>
        ))}
        {visible < items.length ? (
          <li ref={sentinel} className="col-span-full flex min-h-12 items-center justify-center text-sm text-muted" aria-live="polite">
            Loading more tools…
          </li>
        ) : null}
      </ul>
    </>
  );
}

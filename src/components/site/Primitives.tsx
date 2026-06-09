import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

export function FAQ({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i} className="card-surface overflow-hidden">
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              className="w-full flex items-center justify-between text-left p-5 md:p-6"
            >
              <span className="font-semibold text-base md:text-lg pr-4">{item.q}</span>
              <ChevronDown className={`w-5 h-5 text-[oklch(0.82_0.13_85)] flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>
            {isOpen && (
              <div className="px-5 md:px-6 pb-6 text-muted-foreground leading-relaxed animate-fade-in">
                {item.a}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-surface p-6 text-center">
      <div className="text-3xl md:text-4xl font-bold text-gradient-gold">{value}</div>
      <div className="text-xs uppercase tracking-widest text-muted-foreground mt-2">{label}</div>
    </div>
  );
}

export function FeatureCard({ icon, title, children, to }: { icon: ReactNode; title: string; children: ReactNode; to?: string }) {
  const content = (
    <div className="card-surface card-hover p-7 h-full">
      <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-[oklch(0.68_0.17_245/0.12)] border border-[oklch(0.68_0.17_245/0.3)] text-[oklch(0.78_0.15_245)] mb-5">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed">{children}</p>
    </div>
  );
  return to ? <Link to={to}>{content}</Link> : content;
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 text-muted-foreground">
          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[oklch(0.82_0.13_85)] flex-shrink-0" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

export function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="grid sm:grid-cols-2 gap-3">
      {items.map((it) => (
        <li key={it} className="flex items-start gap-3 card-surface p-4">
          <span className="mt-1 w-5 h-5 rounded-full bg-[oklch(0.82_0.13_85/0.15)] border border-[oklch(0.82_0.13_85/0.4)] flex items-center justify-center text-[oklch(0.82_0.13_85)] text-xs">✓</span>
          <span className="text-sm">{it}</span>
        </li>
      ))}
    </ul>
  );
}

import Link from "next/link";
import type { ProductFamilyData } from "@/lib/content-types";
import { buildFamilyPath } from "@/lib/routes";

type Props = {
  family: ProductFamilyData;
};

export function FamilyCard({ family }: Props) {
  return (
    <Link
      className="group flex h-full flex-col rounded-[2rem] border border-foreground/8 bg-white p-6 shadow-[0_16px_40px_rgba(15,23,42,0.06)] transition-transform duration-300 hover:-translate-y-1"
      href={buildFamilyPath(family.locale, family.slug)}
    >
      <div className="aspect-[4/3] rounded-[1.5rem] bg-[radial-gradient(circle_at_top_left,_rgba(30,75,182,0.20),_transparent_55%),linear-gradient(180deg,_#f7f9ff,_#e7edf9)]" />
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <span
            className={`inline-flex rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.25em] ${
              family.recycled ? "bg-green/10 text-green" : "bg-primary/10 text-primary"
            }`}
          >
            {family.code.toUpperCase()}
          </span>
          <h3 className="mt-3 text-2xl tracking-tight text-foreground">
            {family.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-body">{family.excerpt}</p>
        </div>
        <span className="mt-1 text-lg text-primary transition-transform group-hover:translate-x-1">
          -&gt;
        </span>
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {family.variants.map((variant) => (
          <span
            key={variant}
            className="rounded-full border border-foreground/8 px-3 py-1 text-xs text-muted-strong"
          >
            {variant}
          </span>
        ))}
      </div>
    </Link>
  );
}

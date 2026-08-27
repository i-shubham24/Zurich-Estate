import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export type Crumb = { name: string; href: string };

export default function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  crumbs,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
  imageAlt?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink pb-14 pt-36 md:min-h-[70vh] md:pb-20 md:pt-40">
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            quality={82}
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/45" />
        </>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-slate to-ink" />
      )}

      <div className="container-lux relative z-10">
        <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
          {crumbs && (
            <nav aria-label="Breadcrumb" className={`mb-6 ${align === "center" ? "flex justify-center" : ""}`}>
              <ol className="flex flex-wrap items-center gap-1 text-xs text-white/55">
                {crumbs.map((c, i) => (
                  <li key={c.href} className="flex items-center gap-1">
                    {i > 0 && <ChevronRight className="h-3.5 w-3.5 text-white/30" />}
                    {i === crumbs.length - 1 ? (
                      <span className="text-gold-bright">{c.name}</span>
                    ) : (
                      <Link href={c.href} className="transition-colors hover:text-white">
                        {c.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          )}

          {eyebrow && (
            <p className={`eyebrow text-gold-bright ${align === "center" ? "text-center" : ""}`}>
              {eyebrow}
            </p>
          )}

          <h1 className="mt-6 font-serif text-4xl leading-[1.08] text-white sm:text-5xl lg:text-6xl">
            {title}
          </h1>

          {subtitle && (
            <p className={`mt-6 text-lg leading-relaxed text-white/75 md:text-xl ${align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"}`}>
              {subtitle}
            </p>
          )}

          {children && <div className="mt-9 flex flex-col gap-4 sm:flex-row">{children}</div>}
        </div>
      </div>
    </section>
  );
}

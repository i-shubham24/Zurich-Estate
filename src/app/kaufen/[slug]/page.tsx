import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MapPin, BedDouble, Maximize, Building2, ArrowLeft, Phone, Mail } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Eyebrow } from "@/components/ui";
import CtaBanner from "@/components/CtaBanner";
import { JsonLd } from "@/components/StructuredData";
import { projects, getProject } from "@/lib/projects";
import { breadcrumbJsonLd } from "@/lib/jsonld";
import { site, SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: `${p.title} – ${p.location}`,
    description: p.description,
    alternates: { canonical: `/kaufen/${p.slug}` },
    openGraph: {
      title: `${p.title} | Optimal Immobilien AG`,
      description: p.description,
      url: `${SITE_URL}/kaufen/${p.slug}`,
      images: [{ url: p.image, width: 2400, height: 1371, alt: p.title }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const specs = [
    { icon: Building2, label: "Objektart", value: project.type },
    { icon: BedDouble, label: "Zimmer", value: `${project.rooms}` },
    { icon: Maximize, label: "Wohnfläche", value: `${project.area} m²` },
    { icon: MapPin, label: "Lage", value: project.location },
  ];

  return (
    <main>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Startseite", url: "/" },
          { name: "Immobilien", url: "/kaufen" },
          { name: project.title, url: `/kaufen/${project.slug}` },
        ])}
      />

      {/* Hero */}
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-ink pb-14 pt-36 md:pt-40">
        <Image
          src={project.image}
          alt={project.title}
          fill
          priority
          quality={82}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/70 to-ink/40" />
        <div className="container-lux relative z-10">
          <Link
            href="/kaufen"
            className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Alle Objekte
          </Link>
          <span className="block text-xs uppercase tracking-[0.16em] text-gold-bright">
            {project.status} · {project.region}
          </span>
          <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-[1.08] text-white md:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-x-8 gap-y-2 text-white/80">
            <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-gold" /> {project.location}</span>
            <span className="font-serif text-2xl text-white">{project.price}</span>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="border-b border-line bg-white py-8">
        <div className="container-lux grid grid-cols-2 gap-6 md:grid-cols-4">
          {specs.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <s.icon className="h-6 w-6 text-gold" strokeWidth={1.4} />
              <div>
                <div className="text-xs uppercase tracking-[0.12em] text-graphite/50">{s.label}</div>
                <div className="font-medium text-ink">{s.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Body */}
      <section className="bg-cream py-20 md:py-24">
        <div className="container-lux grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-16">
          <Reveal>
            <Eyebrow>Das Objekt</Eyebrow>
            <p className="mt-6 text-lg leading-relaxed text-graphite/85">{project.description}</p>

            {project.highlights && (
              <>
                <h2 className="mt-12 font-serif text-2xl text-ink">Highlights</h2>
                <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-3 text-graphite/85">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" />
                      {h}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Reveal>

          {/* Contact card */}
          <Reveal delay={120}>
            <div className="sticky top-28 border border-line bg-white p-8">
              <div className="text-xs uppercase tracking-[0.14em] text-graphite/50">Interesse?</div>
              <h3 className="mt-2 font-serif text-2xl text-ink">Objekt anfragen</h3>
              <p className="mt-3 text-sm leading-relaxed text-graphite/70">
                Vereinbaren Sie eine unverbindliche Besichtigung oder fordern Sie die
                vollständige Dokumentation an.
              </p>
              <a
                href={site.phoneHref}
                className="mt-6 flex items-center justify-center gap-2 bg-gold py-4 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-colors hover:bg-gold-bright"
              >
                <Phone className="h-4 w-4" /> {site.phone}
              </a>
              <a
                href={site.emailHref}
                className="mt-3 flex items-center justify-center gap-2 border border-line py-4 text-sm font-medium text-ink transition-colors hover:border-gold"
              >
                <Mail className="h-4 w-4 text-gold" /> E-Mail schreiben
              </a>
            </div>
          </Reveal>
        </div>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 1 && (
          <div className="container-lux mt-16">
            <Eyebrow>Impressionen</Eyebrow>
            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {project.gallery.map((src, i) => (
                <Reveal key={src} delay={(i % 3) * 70}>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={src}
                      alt={`${project.title} – Ansicht ${i + 1}`}
                      fill
                      quality={75}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </section>

      <CtaBanner
        title="Ihr Objekt könnte das nächste sein."
        subtitle="Sie möchten verkaufen? Wir vermarkten Ihre Immobilie provisionsfrei zum Höchstpreis."
      />
    </main>
  );
}

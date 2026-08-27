import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Clock, Calendar, ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { SectionHeading, Eyebrow } from "@/components/ui";
import FaqAccordion from "@/components/FaqAccordion";
import ValuationCta from "@/components/ValuationCta";
import { JsonLd } from "@/components/StructuredData";
import { guides, getGuide } from "@/lib/guides";
import { articleJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/jsonld";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: g.metaTitle,
    description: g.excerpt,
    alternates: { canonical: `/ratgeber/${g.slug}` },
    openGraph: {
      type: "article",
      title: g.title,
      description: g.excerpt,
      url: `${SITE_URL}/ratgeber/${g.slug}`,
      publishedTime: g.date,
      images: [{ url: g.image, width: 2400, height: 1371, alt: g.title }],
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const related = guides.filter((g) => g.slug !== guide.slug).slice(0, 3);

  return (
    <main>
      <JsonLd
        data={[
          articleJsonLd({
            title: guide.title,
            description: guide.excerpt,
            slug: guide.slug,
            image: guide.image,
            datePublished: guide.date,
          }),
          ...(guide.faqs ? [faqJsonLd(guide.faqs)] : []),
          breadcrumbJsonLd([
            { name: "Startseite", url: "/" },
            { name: "Ratgeber", url: "/ratgeber" },
            { name: guide.title, url: `/ratgeber/${guide.slug}` },
          ]),
        ]}
      />

      {/* Hero */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-ink pb-14 pt-36 md:pt-40">
        <Image
          src={guide.image}
          alt={guide.title}
          fill
          priority
          quality={82}
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/75 to-ink/45" />
        <div className="container-lux relative z-10 max-w-3xl">
          <Link
            href="/ratgeber"
            className="mb-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.14em] text-white/60 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" /> Zum Ratgeber
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-[0.14em] text-white/70">
            <span className="bg-gold px-3 py-1 font-semibold text-ink">{guide.category}</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {guide.readTime}</span>
            <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {guide.dateLabel}</span>
          </div>
          <h1 className="mt-5 font-serif text-4xl leading-[1.1] text-white md:text-5xl">
            {guide.title}
          </h1>
        </div>
      </section>

      {/* Article body */}
      <article className="bg-cream py-16 md:py-20">
        <div className="container-lux max-w-3xl">
          <p className="border-l-2 border-gold pl-5 font-serif text-xl italic leading-relaxed text-ink">
            {guide.excerpt}
          </p>
          <div
            className="prose-lux mt-10"
            dangerouslySetInnerHTML={{ __html: guide.content }}
          />

          <div className="mt-12 border-t border-line pt-8">
            <Link
              href="/#bewertung"
              className="group inline-flex items-center gap-3 bg-ink px-7 py-4 text-xs font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-slate"
            >
              Kostenlose Bewertung starten
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </article>

      {/* FAQ */}
      {guide.faqs && guide.faqs.length > 0 && (
        <section className="bg-sand py-16 md:py-20">
          <div className="container-lux max-w-3xl">
            <SectionHeading eyebrow="Häufige Fragen" title="Kurz beantwortet" className="mb-10" />
            <FaqAccordion faqs={guide.faqs} />
          </div>
        </section>
      )}

      {/* Related */}
      <section className="bg-cream py-16 md:py-24">
        <div className="container-lux">
          <Eyebrow>Weiterlesen</Eyebrow>
          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
            {related.map((g, i) => (
              <Reveal key={g.slug} delay={i * 80}>
                <Link href={`/ratgeber/${g.slug}`} className="group flex h-full flex-col bg-white">
                  <div className="relative aspect-[3/2] overflow-hidden">
                    <Image
                      src={g.image}
                      alt={g.title}
                      fill
                      quality={70}
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-grow flex-col p-6">
                    <h3 className="font-serif text-lg leading-snug text-ink transition-colors group-hover:text-gold-deep">
                      {g.title}
                    </h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-gold-deep">
                      Lesen <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ValuationCta />
    </main>
  );
}

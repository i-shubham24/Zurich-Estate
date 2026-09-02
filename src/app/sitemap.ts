import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';
import { locations } from '@/lib/locations';
import { guides } from '@/lib/guides';
import { projects } from '@/lib/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticLastMod = new Date('2026-08-01');

  /* ── Static routes ────────────────────────────────────────────── */
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: staticLastMod,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/immobilie-verkaufen`,
      lastModified: staticLastMod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/immobilie-bewerten`,
      lastModified: staticLastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/immobilie-kaufen`,
      lastModified: staticLastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/investieren`,
      lastModified: staticLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/immobilienmakler`,
      lastModified: staticLastMod,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/kaufen`,
      lastModified: staticLastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/ueber-uns`,
      lastModified: staticLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/ratgeber`,
      lastModified: staticLastMod,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/kontakt`,
      lastModified: staticLastMod,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/impressum`,
      lastModified: staticLastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/datenschutz`,
      lastModified: staticLastMod,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];

  /* ── Location landing pages  /immobilienmakler/[slug] ─────────── */
  const locationRoutes: MetadataRoute.Sitemap = locations.map((loc) => ({
    url: `${SITE_URL}/immobilienmakler/${loc.slug}`,
    lastModified: staticLastMod,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  /* ── Property listings  /kaufen/[slug] ─────────────────────────── */
  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/kaufen/${p.slug}`,
    lastModified: staticLastMod,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  /* ── Guide articles  /ratgeber/[slug] ─────────────────────────── */
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/ratgeber/${guide.slug}`,
    lastModified: new Date(guide.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...locationRoutes, ...projectRoutes, ...guideRoutes];
}

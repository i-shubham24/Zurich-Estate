"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import { site, services } from "@/lib/site";

const nav = [
  { label: "Standorte", href: "/immobilienmakler" },
  { label: "Immobilien", href: "/kaufen" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Über uns", href: "/ueber-uns" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const servicesActive = services.some(
    (s) => pathname === s.href || pathname.startsWith(s.href + "/")
  );

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-slate backdrop-blur-md shadow-[0_10px_30px_-20px_rgba(0,0,0,0.8)]"
          : "bg-gradient-to-b from-black/60 to-transparent"
      }`}
    >
      <div className="container-lux flex items-center justify-between py-4 md:py-5">
        <Logo tone="onDark" />

        <nav className="hidden items-center gap-0.5 xl:gap-1 xl:flex" aria-label="Hauptnavigation">
          {/* Services dropdown — CSS hover for instant, state for click/keyboard */}
          <div
            className="group relative"
            onFocus={() => setServicesOpen(true)}
            onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setServicesOpen(false); }}
          >
            <button
              type="button"
              onClick={() => setServicesOpen((v) => !v)}
              aria-expanded={servicesOpen}
              aria-haspopup="true"
              aria-controls="services-menu"
              onKeyDown={(e) => { if (e.key === "Escape") setServicesOpen(false); }}
              className={`eyebrow flex items-center gap-1.5 rounded-full px-3 py-3 2xl:px-4 tracking-[0.14em] transition-colors focus-visible:ring-2 focus-visible:ring-gold ${
                servicesActive ? "text-gold-bright" : "text-white/75 hover:text-gold-bright group-hover:text-gold-bright"
              }`}
            >
              Dienstleistungen
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180" : "group-hover:rotate-180"}`}
              />
            </button>
            <div
              id="services-menu"
              role="menu"
              className={`absolute left-0 top-full pt-3 transition-all duration-150 ${
                servicesOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-1 opacity-0 group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100"
              }`}
            >
              <div className="w-72 overflow-hidden border border-white/10 bg-slate/95 shadow-2xl backdrop-blur-md">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={s.href}
                    className="block border-b border-white/5 px-5 py-3.5 transition-colors last:border-0 hover:bg-white/[0.05]"
                  >
                    <span className="block text-sm font-medium text-white/90">{s.title}</span>
                    <span className="mt-0.5 block text-[0.72rem] leading-snug text-white/45">
                      {s.short}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`eyebrow rounded-full px-3 py-3 2xl:px-4 tracking-[0.14em] transition-colors ${
                  active ? "text-gold-bright" : "text-white/75 hover:text-gold-bright"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 xl:gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 whitespace-nowrap text-sm font-semibold text-white/85 transition-colors hover:text-white xl:flex"
          >
            <Phone className="h-4 w-4 shrink-0 text-gold" />
            {site.phone}
          </a>
          <Magnetic>
            <Link
              href="/#bewertung"
              className="hidden rounded-full bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-all hover:bg-gold-bright sm:inline-flex"
            >
              Gratis-Bewertung
            </Link>
          </Magnetic>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schliessen" : "Menü öffnen"}
            aria-expanded={open}
            onKeyDown={(e) => { if (e.key === "Escape") setOpen(false); }}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-gold xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="max-h-[calc(100vh-72px)] overflow-y-auto xl:hidden">
          <nav
            className="container-lux flex flex-col border-t border-white/10 pb-8 pt-4"
            aria-label="Mobile Navigation"
          >
            {/* Services group */}
            <div className="border-b border-white/10 pb-4">
              <span className="eyebrow text-gold">Dienstleistungen</span>
              <div className="mt-3 flex flex-col">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    href={s.href}
                    className="py-2.5 font-serif text-xl text-white/90 transition-colors hover:text-gold-bright"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </div>

            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/5 py-4 font-serif text-2xl text-white/90 transition-colors hover:text-gold-bright"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex">
              <a
                href={site.phoneHref}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 text-white hover:bg-white/5 transition-colors"
              >
                <Phone className="h-4 w-4 text-gold" />
                {site.phone}
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

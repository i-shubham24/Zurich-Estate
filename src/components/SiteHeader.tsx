"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
import Logo from "./Logo";
import { site } from "@/lib/site";

const nav = [
  { label: "Verkaufen", href: "/immobilie-verkaufen" },
  { label: "Standorte", href: "/immobilienmakler" },
  { label: "Immobilien", href: "/kaufen" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Über uns", href: "/ueber-uns" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Hauptnavigation">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`eyebrow tracking-[0.14em] transition-colors ${
                  active ? "text-gold-bright" : "text-white/75 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-sm font-semibold text-white/85 transition-colors hover:text-white xl:flex"
          >
            <Phone className="h-4 w-4 text-gold" />
            {site.phone}
          </a>
          <Link
            href="/#bewertung"
            className="hidden rounded-full bg-gold px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.14em] text-ink transition-all hover:bg-gold-bright sm:inline-flex"
          >
            Gratis-Bewertung
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schliessen" : "Menü öffnen"}
            aria-expanded={open}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden">
          <nav
            className="container-lux flex flex-col gap-1 border-t border-white/10 pb-8 pt-4"
            aria-label="Mobile Navigation"
          >
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="border-b border-white/5 py-4 font-serif text-2xl text-white/90 transition-colors hover:text-gold-bright"
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-6 flex flex-col gap-3">
              <Link
                href="/#bewertung"
                className="rounded-full bg-gold px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.14em] text-ink"
              >
                Kostenlose Bewertung
              </Link>
              <a
                href={site.phoneHref}
                className="flex items-center justify-center gap-2 rounded-full border border-white/25 px-6 py-4 text-white"
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

'use client';

import { useState, useEffect } from 'react';
import { useLang } from '@/hooks/useLang';
import { COPY } from '@/lib/constants';
import Toggle, { ToggleOption } from '@/components/ui/Toggle';
import Monogram from '@/components/ui/Monogram';

export default function Nav() {
  const { lang, setLang } = useLang();
  const nav = COPY[lang].nav;
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const baseOverlay = 'transition-all duration-500 pointer-events-auto';
  const scrolledEffect =
    'bg-white/60 border border-white/50 backdrop-blur-md shadow-[0_2px_10px_rgba(18,48,91,0.06)] rounded-full';

  const pillClass = `${baseOverlay} border ${
    scrolled ? `${scrolledEffect} px-3.5 py-1.5` : 'border-transparent bg-transparent px-3.5 py-1.5'
  }`;
  const logoPillClass = `${baseOverlay} flex items-center justify-center border ${
    scrolled ? `${scrolledEffect} p-2` : 'border-transparent bg-transparent p-2'
  }`;

  // Section anchors, in page order
  const links = [
    { href: '#venue', label: nav.venue },
    { href: '#schedule', label: nav.schedule },
    { href: '#dresscode', label: nav.dresscode },
    { href: '#visa', label: nav.visa },
    { href: '#stay', label: nav.stay },
    { href: '#food', label: nav.food },
    { href: '#rsvp', label: nav.rsvp },
  ];

  const langOptions: ToggleOption<'en' | 'vi'>[] = [
    { label: 'EN', value: 'en' },
    { label: 'VI', value: 'vi' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-30 pointer-events-none">
      <div className="mx-auto max-w-7xl px-3 md:px-6 py-4 md:py-6 flex items-center justify-between">
        {/* Monogram */}
        <div className={logoPillClass}>
          <a href="#hero" className="inline-block w-8 h-8 md:w-11 md:h-11 shrink-0 text-ink">
            <Monogram className="w-full h-full" />
          </a>
        </div>

        {/* Center links - desktop only */}
        <div className={`hidden lg:block ${pillClass}`}>
          <ul className="flex items-center gap-4 xl:gap-7 whitespace-nowrap font-body text-[11px] xl:text-xs font-medium tracking-[0.2em] xl:tracking-[0.26em] uppercase text-ink-soft">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-ink transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Right controls: language toggle & mobile menu button */}
        <div className="flex items-center gap-2">
          <div className={pillClass}>
            <Toggle options={langOptions} value={lang} onChange={setLang} variant="plain" />
          </div>

          <button
            className={`lg:hidden flex items-center justify-center ${pillClass} !px-2.5 hover:text-ink-soft transition-colors`}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="4" y1="9" x2="20" y2="9" />
              <line x1="4" y1="15" x2="20" y2="15" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-sky/95 backdrop-blur-xl z-50 flex flex-col items-center justify-center transition-all duration-500 lg:hidden pointer-events-auto ${
          mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <button
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-4 text-ink-soft hover:text-ink transition-colors"
          aria-label="Close menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="6" y1="18" x2="18" y2="6" />
          </svg>
        </button>

        <ul className="flex flex-col items-center gap-7 font-display text-2xl md:text-3xl tracking-widest uppercase text-ink-soft">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="absolute bottom-16 w-px h-16 bg-ink/20"></div>
      </div>
    </nav>
  );
}

'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BarChart3 } from 'lucide-react';

const navLinks = [
  { href: '#problem',  label: 'The Problem' },
  { href: '#solution', label: 'Our Approach' },
  { href: '#offer',    label: 'The Offer' },
  { href: '#process',  label: 'Process' },
  { href: '#who',      label: 'Who It\'s For' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleAnchor = (e, href) => {
    e.preventDefault();
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass border-b border-white/[0.06] shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-[#00d4ff] flex items-center justify-center shadow-[0_0_16px_rgba(0,212,255,0.4)]">
            <BarChart3 size={16} className="text-black" strokeWidth={2.5} />
          </div>
          <span className="text-base font-bold tracking-tight text-white group-hover:text-[#00d4ff] transition-colors">
            Coventry Analytics
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleAnchor(e, href)}
              className="px-3 py-2 text-sm text-white/50 hover:text-white/90 transition-colors rounded-lg hover:bg-white/[0.04]"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:block">
          <a
            href="#contact"
            onClick={(e) => handleAnchor(e, '#contact')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#00d4ff] text-black text-sm font-semibold hover:bg-[#00bfe8] transition-colors shadow-[0_0_20px_rgba(0,212,255,0.3)]"
          >
            Book Operational Leak Audit
          </a>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden text-white/60 hover:text-white transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden glass border-t border-white/[0.06] overflow-hidden"
          >
            <div className="px-6 py-4 space-y-1">
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  onClick={(e) => handleAnchor(e, href)}
                  className="block px-3 py-2.5 text-sm text-white/60 hover:text-white transition-colors rounded-lg hover:bg-white/[0.04]"
                >
                  {label}
                </a>
              ))}
              <div className="pt-3 pb-1">
                <a
                  href="#contact"
                  onClick={(e) => handleAnchor(e, '#contact')}
                  className="block text-center px-4 py-3 rounded-lg bg-[#00d4ff] text-black text-sm font-semibold"
                >
                  Book Operational Leak Audit
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

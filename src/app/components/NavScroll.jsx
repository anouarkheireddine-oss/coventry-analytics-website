'use client';
import { useState, useEffect } from 'react';

export default function NavScroll({ email, phone }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav className={`ca-nav${scrolled ? ' ca-nav--scrolled' : ''}`}>
      <div className="ca-wrap ca-nav__row">
        <a href="#top" className="ca-logo">
          Coventry <span>Analytics</span>
        </a>
        <div className="ca-nav__actions">
          {phone && (
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="ca-nav__phone">
              {phone}
            </a>
          )}
          <a href={`mailto:${email}?subject=Free Audit Enquiry`} className="ca-pill">
            Book Free Audit
          </a>
        </div>
      </div>
    </nav>
  );
}

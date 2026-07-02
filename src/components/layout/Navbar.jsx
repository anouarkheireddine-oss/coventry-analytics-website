'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, BarChart3 } from 'lucide-react'

const navLinks = [
  { href: '/solutions', label: 'Solutions' },
  { href: '/case-studies', label: 'Case Studies' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-navy-950/95 backdrop-blur-md border-b border-navy-800' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-white">Coventry <span className="text-brand-400">Analytics</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-sm text-slate-300 hover:text-white transition-colors">
                {link.label}
              </Link>
            ))}
            <Link href="/tools" className="text-sm font-medium px-3 py-1.5 rounded-full bg-brand-600/20 text-brand-400 border border-brand-600/30 hover:bg-brand-600/30 transition-colors">
              Free Tools
            </Link>
            <Link href="/book" className="text-sm font-semibold px-4 py-2 rounded-lg bg-brand-600 hover:bg-brand-500 text-white transition-colors">
              Book Free Audit
            </Link>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-slate-300 hover:text-white">
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-navy-900 border-b border-navy-800 px-4 py-4 flex flex-col gap-3">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className="text-sm text-slate-300 hover:text-white py-2 border-b border-navy-800">
              {link.label}
            </Link>
          ))}
          <Link href="/tools" onClick={() => setMobileOpen(false)} className="text-sm font-medium text-brand-400 py-2">Free Tools</Link>
          <Link href="/book" onClick={() => setMobileOpen(false)} className="text-sm font-semibold px-4 py-2 rounded-lg bg-brand-600 text-white text-center mt-2">Book Free Audit</Link>
        </div>
      )}
    </nav>
  )
}

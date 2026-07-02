import Link from 'next/link'
import { BarChart3 } from 'lucide-react'

const footerLinks = {
  Platform: [
    { href: '/solutions', label: 'Solutions' },
    { href: '/pricing', label: 'Pricing' },
    { href: '/case-studies', label: 'Case Studies' },
    { href: '/book', label: 'Book Free Audit' },
  ],
  Tools: [
    { href: '/tools', label: 'All Tools' },
    { href: '/tools/business-health-score', label: 'Business Health Score' },
    { href: '/resources', label: 'Resources' },
  ],
  Company: [
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-navy-900 border-t border-navy-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-4">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-white" />
              </div>
              <span>Coventry <span className="text-brand-400">Analytics</span></span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
              Operational control systems and business intelligence for UK SMEs. Stop flying blind.
            </p>
            <p className="text-slate-500 text-xs mt-4">Coventry, United Kingdom</p>
          </div>
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-sm font-semibold text-white mb-4">{group}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-slate-400 hover:text-white transition-colors">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-navy-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">&copy; {new Date().getFullYear()} Coventry Analytics Ltd. All rights reserved.</p>
          <p className="text-slate-600 text-xs">Registered in England &amp; Wales</p>
        </div>
      </div>
    </footer>
  )
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Dumbbell,
  Apple,
  TrendingUp,
  CheckSquare,
  Settings,
  Zap,
} from 'lucide-react';

const navItems = [
  { href: '/',           label: 'Dashboard',  icon: LayoutDashboard },
  { href: '/training',   label: 'Training',   icon: Dumbbell        },
  { href: '/nutrition',  label: 'Nutrition',  icon: Apple           },
  { href: '/metrics',    label: 'Metrics',    icon: TrendingUp      },
  { href: '/discipline', label: 'Discipline', icon: CheckSquare     },
  { href: '/settings',   label: 'Settings',   icon: Settings        },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 bottom-0 w-64 flex-col z-50">
        <div className="glass border-r border-white/[0.06] h-full flex flex-col">
          {/* Logo */}
          <div className="px-6 py-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#00d4ff] flex items-center justify-center shadow-glow">
                <Zap size={16} className="text-black" strokeWidth={2.5} />
              </div>
              <span className="text-lg font-bold tracking-wider text-white">AK APICE</span>
            </div>
            <p className="text-xs text-white/30 mt-1 ml-11">Al vertice. Ogni giorno.</p>
          </div>

          {/* Nav links */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href}>
                  <motion.div
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                      active
                        ? 'bg-[#00d4ff10] text-[#00d4ff]'
                        : 'text-white/40 hover:text-white/80 hover:bg-white/[0.04]'
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 rounded-xl bg-[#00d4ff0d] border border-[#00d4ff20]"
                        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      />
                    )}
                    <Icon size={18} strokeWidth={active ? 2 : 1.5} className="relative z-10 flex-shrink-0" />
                    <span className="relative z-10 text-sm font-medium">{label}</span>
                    {active && (
                      <div className="ml-auto w-1 h-4 rounded-full bg-[#00d4ff] relative z-10 shadow-[0_0_8px_#00d4ff]" />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </nav>

          {/* Bottom info */}
          <div className="px-6 py-6 border-t border-white/[0.06]">
            <div className="text-xs text-white/20 space-y-1">
              <p className="font-medium text-white/30">v1.0.0</p>
              <p>Al vertice. Ogni giorno.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="glass border-t border-white/[0.08] px-2 py-2 safe-area-inset">
          <div className="flex items-center justify-around">
            {navItems.map(({ href, label, icon: Icon }) => {
              const active = pathname === href;
              return (
                <Link key={href} href={href} className="flex-1">
                  <motion.div
                    whileTap={{ scale: 0.9 }}
                    className={`flex flex-col items-center gap-1 py-1 rounded-xl transition-colors ${
                      active ? 'text-[#00d4ff]' : 'text-white/30'
                    }`}
                  >
                    <div className="relative">
                      <Icon size={20} strokeWidth={active ? 2 : 1.5} />
                      {active && (
                        <motion.div
                          layoutId="activeMobileNav"
                          className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#00d4ff]"
                        />
                      )}
                    </div>
                    <span className="text-[10px] font-medium leading-none">{label}</span>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}

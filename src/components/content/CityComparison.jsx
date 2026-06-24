import Link from 'next/link';
import { LOCATIONS } from '@/data/locations';
import { computeSalaries } from '@/lib/content-engine/salary';
import { calcTakeHome, formatGBP } from '@/lib/tax/uk-income-tax';
import { getDisposable, CITY_COSTS } from '@/lib/tax/cost-of-living';

export default function CityComparison({ role, currentLocationSlug }) {
  const rows = LOCATIONS
    .filter(loc => CITY_COSTS[loc.slug])
    .map(loc => {
      const { mid } = computeSalaries(role, loc);
      const tax = calcTakeHome(mid);
      const disposable = getDisposable(tax.netMonthly, loc.slug);
      return { loc, gross: mid, net: tax.netAnnual, monthly: tax.netMonthly, disposable: disposable?.disposable };
    })
    .sort((a, b) => b.disposable - a.disposable);

  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-gray-900 mb-2">{role.title} Salary: All UK Cities Compared</h2>
      <p className="text-sm text-black/50 mb-4">
        Ranked by monthly disposable income (take-home after estimated living costs).
        This is the metric that matters — not gross salary.
      </p>
      <div className="rounded-2xl border border-black/[0.07] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-black/[0.07] bg-black/[0.025]">
                {['#', 'City', 'Gross', 'Monthly Net', 'Est. Costs', 'Disposable'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-[11px] font-semibold text-black/30 uppercase tracking-wider whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ loc, gross, monthly, disposable }, i) => {
                const costs = CITY_COSTS[loc.slug];
                const isCurrent = loc.slug === currentLocationSlug;
                return (
                  <tr
                    key={loc.slug}
                    className={`border-b border-black/[0.04] transition-colors ${isCurrent ? 'bg-[#818cf808] border-[#818cf815]' : i % 2 === 0 ? '' : 'bg-black/[0.015]'} hover:bg-black/[0.025]`}
                  >
                    <td className="px-4 py-3 text-black/30 font-mono text-xs">{i + 1}</td>
                    <td className="px-4 py-3">
                      <Link href={`/salary/${role.slug}/${loc.slug}`} className="font-semibold text-black/80 hover:text-gray-900 transition-colors">
                        {loc.name} {isCurrent && <span className="text-[10px] text-[#818cf8] ml-1">← current</span>}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-black/50 text-xs">{formatGBP(gross)}</td>
                    <td className="px-4 py-3 font-semibold text-[#818cf8]">{formatGBP(monthly)}</td>
                    <td className="px-4 py-3 text-black/40 text-xs">{formatGBP(costs?.total ?? 0)}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold text-sm ${disposable > 1000 ? 'text-[#34d399]' : disposable > 0 ? 'text-[#f59e0b]' : 'text-[#ef4444]'}`}>
                        {formatGBP(disposable ?? 0)}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-[11px] text-black/25 mt-2">Living costs are estimates for a single person renting a 1-bed flat (rent + transport + groceries).</p>
    </section>
  );
}

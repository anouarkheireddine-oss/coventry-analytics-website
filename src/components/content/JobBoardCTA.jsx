import { ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

const JOB_BOARDS = [
  { name: 'Reed',      url: 'https://www.reed.co.uk/jobs', color: '#e63946', tagline: 'UK\'s #1 job site' },
  { name: 'Totaljobs', url: 'https://www.totaljobs.com',   color: '#00b4d8', tagline: '280k+ live vacancies' },
  { name: 'Indeed',    url: 'https://uk.indeed.com',       color: '#003a9b', tagline: 'Search millions of jobs' },
  { name: 'LinkedIn',  url: 'https://www.linkedin.com/jobs', color: '#0a66c2', tagline: 'Professional network' },
];

export default function JobBoardCTA({ roleTitle, locationName }) {
  return (
    <section className="my-8 rounded-2xl border border-[#818cf820] bg-[#818cf808] p-6">
      <div className="flex items-start gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-[#818cf815] border border-[#818cf825] flex items-center justify-center flex-shrink-0">
          <Briefcase size={18} className="text-[#818cf8]" />
        </div>
        <div>
          <h3 className="text-base font-bold text-gray-900">Find {roleTitle} Jobs in {locationName}</h3>
          <p className="text-sm text-black/50 mt-0.5">Apply today — thousands of live vacancies across the UK</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {JOB_BOARDS.map(({ name, url, color, tagline }) => (
          <a
            key={name}
            href={url}
            target="_blank"
            rel="noopener sponsored"
            className="flex flex-col items-center gap-1.5 p-3 rounded-xl border border-black/[0.07] bg-black/[0.025] hover:bg-black/[0.04] transition-all group"
          >
            <span className="text-sm font-bold" style={{ color }}>{name}</span>
            <span className="text-[10px] text-black/40 text-center leading-tight">{tagline}</span>
            <ArrowRight size={10} className="text-black/20 group-hover:text-black/40 transition-colors" />
          </a>
        ))}
      </div>
    </section>
  );
}

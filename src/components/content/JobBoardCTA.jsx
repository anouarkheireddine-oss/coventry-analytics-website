import { ArrowRight, Briefcase } from 'lucide-react';

const UTM = 'utm_source=salarystack&utm_medium=salary-page&utm_campaign=job-search';

function buildUrl(board, roleTitle, locationName) {
  const q = encodeURIComponent(roleTitle);
  const l = encodeURIComponent(locationName);

  switch (board) {
    case 'Reed':
      return `https://www.reed.co.uk/jobs/?keywords=${q}&location=${l}&${UTM}`;
    case 'Totaljobs':
      return `https://www.totaljobs.com/jobs/${encodeURIComponent(roleTitle.toLowerCase().replace(/\s+/g, '-'))}/in-${encodeURIComponent(locationName.toLowerCase())}?${UTM}`;
    case 'Adzuna':
      return `https://www.adzuna.co.uk/search?q=${q}&loc=${l}&${UTM}`;
    case 'LinkedIn':
      return `https://www.linkedin.com/jobs/search/?keywords=${q}&location=${l}%2C+UK`;
    default:
      return '#';
  }
}

const JOB_BOARDS = [
  { name: 'Reed',      color: '#e63946', tagline: "UK's #1 job site"        },
  { name: 'Totaljobs', color: '#0891b2', tagline: '280k+ live vacancies'    },
  { name: 'Adzuna',    color: '#ef7c00', tagline: 'Real-time job data'      },
  { name: 'LinkedIn',  color: '#0a66c2', tagline: 'Professional network'    },
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
          <p className="text-sm text-black/50 mt-0.5">Search live vacancies — all links go directly to {roleTitle} roles in {locationName}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {JOB_BOARDS.map(({ name, color, tagline }) => (
          <a
            key={name}
            href={buildUrl(name, roleTitle, locationName)}
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
      <p className="text-[10px] text-black/20 mt-3">Sponsored links · SalaryStack may earn a commission at no cost to you</p>
    </section>
  );
}

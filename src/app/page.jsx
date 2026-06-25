import NavScroll from './components/NavScroll';
import ContactForm from './components/ContactForm';

const EMAIL = 'info.coventryanalytics@gmail.com';
const PHONE = '024 0000 0000';

export default function Home() {
  return (
    <>
      {/* ── NAV ─────────────────────────────────────────── */}
      <NavScroll email={EMAIL} phone={PHONE} />

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="ca-hero" id="top">
        <div className="ca-wrap">
          <p className="ca-eyebrow">Coventry · Earlsdon · Foleshill · City Centre</p>
          <h1 className="ca-display">
            Your business numbers,<br />
            <em>finally clear.</em>
          </h1>
          <p className="ca-hero-sub">
            A plain-English monthly report showing what changed in your business,
            why it matters, and what to do next. Written for busy owners — not accountants.
          </p>
          <div className="ca-hero-actions">
            <a href="#services" className="ca-btn-primary">See How It Works</a>
            <a href={`mailto:${EMAIL}?subject=Free Audit Enquiry`} className="ca-btn-ghost">
              Book Free Audit
            </a>
          </div>
          <p className="ca-trust">
            Cafés <span>·</span> Restaurants <span>·</span> Taxi Operators
            <span>·</span> Retail Shops <span>·</span> Local Services
          </p>
        </div>
      </section>

      {/* ── PROBLEM ──────────────────────────────────────── */}
      <section className="ca-problem">
        <div className="ca-wrap">
          <div className="ca-problem__inner">
            <p className="ca-problem__quote">
              Most business owners make important decisions based on gut feeling —
              because their numbers are either unavailable, late, or impossible to interpret.
            </p>
            <p className="ca-problem__fix">We fix that.</p>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="ca-services" id="services">
        <div className="ca-wrap">
          <div className="ca-sh">
            <p className="ca-sh-kicker">Two simple services</p>
            <h2 className="ca-h2">Choose where to start</h2>
            <p className="ca-sh-sub">We offer two things. Nothing more.</p>
          </div>

          <div className="ca-cards">
            {/* AUDIT */}
            <div className="ca-card">
              <div className="ca-card__top">
                <span className="ca-badge">Start here</span>
                <span className="ca-card__type">One-off</span>
              </div>
              <h3 className="ca-card__name">Business Clarity Audit</h3>
              <p className="ca-card__timing">Delivered within 5 working days</p>
              <p className="ca-card__promise">
                Find out exactly where your money is going — and what to fix first.
              </p>
              <ul className="ca-list">
                {[
                  "90-minute discovery call",
                  "3 months of your data reviewed",
                  "Top 3 profit leaks identified",
                  "Top 3 quick wins with £ impact estimates",
                  "Plain-English Clarity Report (single page)",
                  "Delivered within 5 working days",
                ].map((item) => (
                  <li key={item}><span className="ca-tick">✓</span>{item}</li>
                ))}
              </ul>
              <a href={`mailto:${EMAIL}?subject=Business Clarity Audit Enquiry`} className="ca-card-cta ca-card-cta--plain">
                Book Your Audit
              </a>
              <p className="ca-card__note">Most clients convert to monthly reports after their audit.</p>
            </div>

            {/* MONTHLY */}
            <div className="ca-card ca-card--featured">
              <div className="ca-card__top">
                <span className="ca-badge ca-badge--amber">Most popular</span>
                <span className="ca-card__type">Monthly</span>
              </div>
              <h3 className="ca-card__name">Monthly Intelligence Report</h3>
              <p className="ca-card__timing">Delivered by the 5th of every month</p>
              <p className="ca-card__promise">
                Know exactly how your business performed — every month, in plain English.
              </p>
              <ul className="ca-list">
                {[
                  "Monthly report delivered by the 5th",
                  "Revenue and cost trend analysis",
                  "Best and worst performing periods",
                  "One specific action with estimated £ impact",
                  "Industry-specific KPIs for your business type",
                  "Optional 15-minute walkthrough call",
                ].map((item) => (
                  <li key={item}><span className="ca-tick ca-tick--amber">✓</span>{item}</li>
                ))}
              </ul>
              <a href={`mailto:${EMAIL}?subject=Monthly Intelligence Report Enquiry`} className="ca-card-cta ca-card-cta--amber">
                Get Started
              </a>
              <p className="ca-card__note">No contracts. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="ca-process" id="process">
        <div className="ca-wrap">
          <div className="ca-sh">
            <p className="ca-sh-kicker">How it works</p>
            <h2 className="ca-h2">Three steps to clarity</h2>
          </div>
          <div className="ca-steps">
            {[
              {
                n: "01",
                title: "Share your data",
                body: "Send us your till exports, spreadsheets, or booking records. If you use Square, Zettle, or similar — one file is enough.",
              },
              {
                n: "02",
                title: "We write your report",
                body: "We analyse your numbers and produce a plain-English summary — what changed, why it matters, what it means for your business.",
              },
              {
                n: "03",
                title: "Receive clear actions",
                body: "Your report arrives within 5 working days (or by the 5th each month). One specific thing to do, with an estimated £ impact.",
              },
            ].map((s) => (
              <div className="ca-step" key={s.n}>
                <div className="ca-step__n">{s.n}</div>
                <div className="ca-step__body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REPORT ANATOMY ───────────────────────────────── */}
      <section className="ca-report" id="report">
        <div className="ca-wrap">
          <div className="ca-sh">
            <p className="ca-sh-kicker">What you receive</p>
            <h2 className="ca-h2">Inside your monthly report</h2>
            <p className="ca-sh-sub">
              Every report follows the same five-part structure. Consistent. Clear. Actionable.
            </p>
          </div>
          <div className="ca-report__grid">
            <div className="ca-doc">
              <div className="ca-doc__header">
                <p className="ca-doc__client">The Copper Kettle · Monthly Report</p>
                <p className="ca-doc__period">May 2026</p>
              </div>
              {[
                { n: "1", t: "This Month at a Glance", p: "Revenue £14,820 ▲ 8% vs April. Best day: Saturday. Quietest: Tuesday morning." },
                { n: "2", t: "What Changed", p: "Tuesday revenue down 22% since March. Likely cause: school holiday pattern shift." },
                { n: "3", t: "Your 3 Numbers to Watch", p: "Labour %: 34% ✓  ·  Avg transaction: £6.40 ↑  ·  Dead hours cost: £310/month ⚠" },
                { n: "4", t: "One Thing to Do This Month", p: "Close Tuesdays before 10am. Estimated saving: £240–£310/month." },
                { n: "5", t: "Next Month Preview", p: "June half-term: expect Thursday–Friday uplift. Increase staff cover 26–27 June." },
              ].map((row) => (
                <div className="ca-doc__row" key={row.n}>
                  <div className="ca-doc__row-n">{row.n}</div>
                  <div>
                    <p className="ca-doc__row-t">{row.t}</p>
                    <p className="ca-doc__row-p">{row.p}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ca-report__pts">
              {[
                { title: "Plain English", body: "No analytics jargon. No technical terms. Written the same way you'd explain it to a trusted friend." },
                { title: "One action, always", body: "Every report ends with one specific recommendation and what it's estimated to save or earn you." },
                { title: "Industry-specific", body: "Your KPIs match your business type. A café report looks different from a taxi operator report." },
                { title: "Delivered monthly", body: "In your inbox by the 5th. Optional 15-minute walkthrough call included." },
              ].map((pt) => (
                <div className="ca-report__pt" key={pt.title}>
                  <div className="ca-report__pt-line" />
                  <div>
                    <p className="ca-report__pt-title">{pt.title}</p>
                    <p className="ca-report__pt-body">{pt.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── WHO IT'S FOR ─────────────────────────────────── */}
      <section className="ca-for" id="for">
        <div className="ca-wrap">
          <div className="ca-sh">
            <p className="ca-sh-kicker">Who it&apos;s for</p>
            <h2 className="ca-h2">Local Coventry businesses</h2>
          </div>
          <div className="ca-industries">
            {[
              { label: "Cafés & Coffee Shops", desc: "Identify dead hours, labour cost vs. revenue, and your most profitable items.", href: "/business-analytics-coventry-cafes" },
              { label: "Restaurants & Takeaways", desc: "Track covers, food cost %, delivery platform margin erosion, and peak night performance.", href: "/business-analytics-coventry-restaurants" },
              { label: "Taxi & Private Hire", desc: "Driver efficiency, peak utilisation, dead miles, and revenue-per-hour by shift.", href: "/business-analytics-coventry-taxi" },
              { label: "Retail Shops", desc: "Dead stock, basket size trends, footfall conversion, and slow-moving product flags.", href: null },
              { label: "Local Service Businesses", desc: "Job profitability, repeat client tracking, and seasonal demand patterns.", href: null },
            ].map((ind) => (
              <div className="ca-industry" key={ind.label}>
                <div className="ca-industry__accent" />
                <div>
                  <p className="ca-industry__label">{ind.label}</p>
                  <p className="ca-industry__desc">{ind.desc}</p>
                  {ind.href && (
                    <a href={ind.href} className="ca-industry__link">See what we track →</a>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="ca-qualifier">
            <p className="ca-qualifier__title">You&apos;re a good fit if:</p>
            <ul className="ca-qualifier__list">
              {[
                "You rely on gut feeling or Excel for most business decisions",
                "You want to know your numbers but don't have time to dig through data",
                "You've never had a business analyst — but could use one",
                "You want one clear action each month, not a report you won't read",
              ].map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIAL ──────────────────────────────────── */}
      <section className="ca-testimonial">
        <div className="ca-wrap">
          <blockquote className="ca-quote">
            <p className="ca-quote__text">
              I had no idea Tuesday mornings were costing me £300 a month.
              The first report paid for itself within a week.
            </p>
            <footer className="ca-quote__attr">
              <p className="ca-quote__name">Sarah M.</p>
              <p className="ca-quote__role">Café owner, Coventry city centre</p>
              <p className="ca-quote__note">Name changed at client request · Result verified</p>
            </footer>
          </blockquote>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section className="ca-about" id="about">
        <div className="ca-wrap">
          <div className="ca-about__grid">
            <div className="ca-about__photo">
              <div className="ca-about__avatar" aria-label="Anouar Kheireddine, founder of Coventry Analytics" />
            </div>
            <div className="ca-about__text">
              <p className="ca-sh-kicker">Who we are</p>
              <h2 className="ca-h2">A Coventry analyst,<br />not a faceless agency</h2>
              <p className="ca-about__bio">
                I&apos;m Anouar, and I started Coventry Analytics because I kept seeing local
                business owners make costly decisions without reliable numbers — not because they
                didn&apos;t care, but because nobody had made the data easy to understand.
              </p>
              <p className="ca-about__bio">
                I work directly with every client. You won&apos;t speak to an account manager.
                You won&apos;t receive a generic template. Every report I write is specific to
                your business, your figures, and your situation in Coventry.
              </p>
              <div className="ca-about__badges">
                <span className="ca-about__badge">Based in Coventry CV1</span>
                <span className="ca-about__badge">Analytics background</span>
                <span className="ca-about__badge">Local business specialist</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────── */}
      <section className="ca-faq" id="faq">
        <div className="ca-wrap">
          <div className="ca-sh">
            <p className="ca-sh-kicker">Common questions</p>
            <h2 className="ca-h2">Straight answers</h2>
          </div>
          <div className="ca-faq__list">
            {[
              {
                q: "How much does a business report cost?",
                a: "We don't publish prices on the site because every business is different — a café with one location needs a different report to a taxi operator with twelve drivers. The free audit call lets us give you an exact figure. Most clients tell us the first month pays for itself.",
              },
              {
                q: "What data do I need to provide?",
                a: "If you use a till system like Square, Zettle, or Lightspeed — one data export is enough. No specialist software needed. If you work from spreadsheets or paper records, we'll tell you exactly what to send on the audit call.",
              },
              {
                q: "Is this right for a café with just one location?",
                a: "Yes. Most of our clients are single-location businesses. The reports are most valuable when you're too busy running the business to analyse it yourself — which is exactly the situation most solo owners are in.",
              },
              {
                q: "How is this different from my accountant?",
                a: "Your accountant tells you what happened after the year ends — for tax purposes. We tell you what's happening now, month by month, in plain English, with one specific action to take. It's operational clarity, not compliance reporting.",
              },
              {
                q: "Do you work with businesses outside Coventry?",
                a: "Right now we focus exclusively on Coventry and the immediate surrounding area — Earlsdon, Foleshill, Kenilworth, Rugby. This lets us give local context that a national service can't. If you're nearby, get in touch and we'll let you know if we can help.",
              },
              {
                q: "What if I want to cancel?",
                a: "No contracts. No lock-in. Cancel the monthly report with one email, any time. We ask for 30 days' notice so we can finalise your last report properly — that's it.",
              },
            ].map(({ q, a }) => (
              <details className="ca-faq__item" key={q}>
                <summary className="ca-faq__q">{q}</summary>
                <p className="ca-faq__a">{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section className="ca-contact" id="contact">
        <div className="ca-wrap">
          <div className="ca-contact__grid">
            <div className="ca-contact__text">
              <p className="ca-contact__kicker">Free · 20 minutes · No obligation</p>
              <h2 className="ca-h2">Book your free<br />audit call</h2>
              <p className="ca-contact__sub">
                We&apos;ll look at your current numbers and tell you exactly
                what we&apos;d report on — and whether it would be worth it for your
                business. You&apos;ll get a straight answer either way.
              </p>
              <p className="ca-contact__human">
                We&apos;re a small team based in Coventry, CV1. You speak directly
                to us — not an account manager, not a chatbot.
              </p>
              <ul className="ca-contact__pts">
                {[
                  "Identify your 2–3 biggest number blind spots",
                  "See what your report would actually cover",
                  "Get a straight answer on whether it's right for you",
                ].map((p) => (
                  <li key={p}><span className="ca-tick ca-tick--green">✓</span>{p}</li>
                ))}
              </ul>
            </div>

            <div className="ca-form-wrap">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* ── AREAS SERVED ─────────────────────────────────── */}
      <section className="ca-areas">
        <div className="ca-wrap">
          <p className="ca-areas__label">Areas we serve</p>
          <div className="ca-areas__grid">
            {[
              { area: "Coventry City Centre", post: "CV1" },
              { area: "Earlsdon", post: "CV5" },
              { area: "Foleshill", post: "CV6" },
              { area: "Tile Hill", post: "CV4" },
              { area: "Binley", post: "CV3" },
              { area: "Coundon", post: "CV6" },
              { area: "Cheylesmore", post: "CV3" },
              { area: "Canley", post: "CV4" },
              { area: "Kenilworth", post: "CV8" },
              { area: "Rugby", post: "CV21–22" },
              { area: "Warwick", post: "CV34" },
              { area: "Leamington Spa", post: "CV31–32" },
            ].map(({ area, post }) => (
              <div className="ca-areas__item" key={area}>
                <span className="ca-areas__name">{area}</span>
                <span className="ca-areas__post">{post}</span>
              </div>
            ))}
          </div>
          <p className="ca-areas__note">
            Not sure if we cover your area?{' '}
            <a href={`mailto:${EMAIL}?subject=Area Enquiry`}>Get in touch</a> — if you&apos;re in
            Warwickshire or the West Midlands, we can almost certainly help.
          </p>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────────── */}
      <footer className="ca-footer">
        <div className="ca-wrap ca-footer__inner">
          <div>
            <a href="#top" className="ca-logo">
              Coventry <span>Analytics</span>
            </a>
            <p className="ca-footer__tag">
              Plain-English business reports for local SMEs.<br />
              Coventry, West Midlands, CV1.
            </p>
          </div>
          <nav className="ca-footer__nav">
            {[
              ["services", "Services"],
              ["process", "How It Works"],
              ["for", "Who It's For"],
              ["faq", "FAQ"],
              ["contact", "Book Audit"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`}>{label}</a>
            ))}
          </nav>
          <div className="ca-footer__legal">
            <p>© 2026 Coventry Analytics. All rights reserved.</p>
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
        </div>
      </footer>
    </>
  );
}

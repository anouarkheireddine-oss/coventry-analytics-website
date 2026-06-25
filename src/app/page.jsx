'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const to = (id) => (e) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ── NAV ────────────────────────────────────────── */}
      <nav className={`ca-nav${scrolled ? ' ca-nav--scrolled' : ''}`}>
        <div className="ca-wrap ca-nav__row">
          <a href="#top" className="ca-logo" onClick={to('top')}>
            Coventry <span>Analytics</span>
          </a>
          <a href="#contact" className="ca-pill" onClick={to('contact')}>
            Book Free Audit
          </a>
        </div>
      </nav>

      {/* ── HERO ───────────────────────────────────────── */}
      <section className="ca-hero" id="top">
        <div className="ca-wrap">
          <p className="ca-eyebrow">Business reporting for Coventry SMEs</p>
          <h1 className="ca-display">
            Your business numbers,<br />
            <em>finally clear.</em>
          </h1>
          <p className="ca-hero-sub">
            A plain-English monthly report showing what changed in your business,
            why it matters, and what to do next. Written for busy owners — not accountants.
          </p>
          <div className="ca-hero-actions">
            <a href="#services" className="ca-btn-primary" onClick={to('services')}>
              See How It Works
            </a>
            <a href="#contact" className="ca-btn-ghost" onClick={to('contact')}>
              Book Free Audit
            </a>
          </div>
          <p className="ca-trust">
            Cafés <span>·</span> Restaurants <span>·</span> Taxi Operators
            <span>·</span> Retail Shops <span>·</span> Local Services
          </p>
        </div>
      </section>

      {/* ── PROBLEM ────────────────────────────────────── */}
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

      {/* ── SERVICES ───────────────────────────────────── */}
      <section className="ca-services" id="services">
        <div className="ca-wrap">
          <div className="ca-sh">
            <span className="ca-label">Two simple services</span>
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
              <p className="ca-card__price">£297</p>
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
              <a href="#contact" className="ca-card-cta ca-card-cta--plain" onClick={to('contact')}>
                Book Clarity Audit — £297
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
              <p className="ca-card__price">
                From £149<span className="ca-card__unit">/month</span>
              </p>
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
              <a href="#contact" className="ca-card-cta ca-card-cta--amber" onClick={to('contact')}>
                Start Monthly Reports — From £149
              </a>
              <p className="ca-card__note">No contracts. Cancel anytime.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ────────────────────────────────────── */}
      <section className="ca-process" id="process">
        <div className="ca-wrap">
          <div className="ca-sh">
            <span className="ca-label">Simple process</span>
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

      {/* ── REPORT ANATOMY ─────────────────────────────── */}
      <section className="ca-report" id="report">
        <div className="ca-wrap">
          <div className="ca-sh">
            <span className="ca-label">What you receive</span>
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
                { icon: "📋", title: "Plain English", body: "No analytics jargon. No technical terms. Written the same way you'd explain it to a trusted friend." },
                { icon: "⚡", title: "One action, always", body: "Every report ends with one specific recommendation and what it's estimated to save or earn you." },
                { icon: "📐", title: "Industry-specific", body: "Your KPIs match your business type. A café report looks different from a taxi operator report." },
                { icon: "📬", title: "Delivered monthly", body: "In your inbox by the 5th. Optional 15-minute walkthrough call included." },
              ].map((pt) => (
                <div className="ca-report__pt" key={pt.title}>
                  <span className="ca-report__pt-icon">{pt.icon}</span>
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

      {/* ── WHO IT'S FOR ───────────────────────────────── */}
      <section className="ca-for" id="for">
        <div className="ca-wrap">
          <div className="ca-sh">
            <span className="ca-label">Who it&apos;s for</span>
            <h2 className="ca-h2">Local Coventry businesses</h2>
          </div>
          <div className="ca-industries">
            {[
              { icon: "☕", label: "Cafés & Coffee Shops", desc: "Identify dead hours, labour cost vs. revenue, and your most profitable items." },
              { icon: "🍽", label: "Restaurants & Takeaways", desc: "Track covers, food cost %, delivery platform margin erosion, and peak night performance." },
              { icon: "🚕", label: "Taxi & Private Hire", desc: "Driver efficiency, peak utilisation, dead miles, and revenue-per-hour by shift." },
              { icon: "🛍", label: "Retail Shops", desc: "Dead stock, basket size trends, footfall conversion, and slow-moving product flags." },
              { icon: "🔧", label: "Local Service Businesses", desc: "Job profitability, repeat client tracking, and seasonal demand patterns." },
            ].map((ind) => (
              <div className="ca-industry" key={ind.label}>
                <span className="ca-industry__icon">{ind.icon}</span>
                <div>
                  <p className="ca-industry__label">{ind.label}</p>
                  <p className="ca-industry__desc">{ind.desc}</p>
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

      {/* ── CONTACT ────────────────────────────────────── */}
      <section className="ca-contact" id="contact">
        <div className="ca-wrap">
          <div className="ca-contact__grid">
            <div className="ca-contact__text">
              <span className="ca-label ca-label--light">Free to start</span>
              <h2 className="ca-h2">Book your free<br />audit call</h2>
              <p className="ca-contact__sub">
                20 minutes. Free. We&apos;ll look at your current numbers and tell you exactly
                what we&apos;d report on — and whether it would be worth it for your business.
                No obligation.
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
              {submitted ? (
                <div className="ca-success">
                  <div className="ca-success__mark">✓</div>
                  <h3>Received.</h3>
                  <p>We&apos;ll be in touch within 1 business day to schedule your call.</p>
                </div>
              ) : (
                <form className="ca-form" onSubmit={onSubmit}>
                  <h3 className="ca-form__title">Get in touch</h3>
                  <p className="ca-form__sub">We respond within 1 business day.</p>
                  <div className="ca-field">
                    <label>Your name</label>
                    <input type="text" placeholder="Sarah Ahmed" required />
                  </div>
                  <div className="ca-field">
                    <label>Business name</label>
                    <input type="text" placeholder="The Copper Kettle" required />
                  </div>
                  <div className="ca-field">
                    <label>Business type</label>
                    <select required defaultValue="">
                      <option value="" disabled>Select your type</option>
                      <option>Café or coffee shop</option>
                      <option>Restaurant or takeaway</option>
                      <option>Taxi or private hire</option>
                      <option>Retail shop</option>
                      <option>Local service business</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="ca-field">
                    <label>Email address</label>
                    <input type="email" placeholder="sarah@copperkettle.co.uk" required />
                  </div>
                  <div className="ca-field">
                    <label>Which service interests you?</label>
                    <select required defaultValue="">
                      <option value="" disabled>Select a service</option>
                      <option>Business Clarity Audit — £297</option>
                      <option>Monthly Intelligence Report — From £149/month</option>
                      <option>Not sure yet</option>
                    </select>
                  </div>
                  <button type="submit" className="ca-submit">
                    Book Free Audit Call →
                  </button>
                  <p className="ca-form__note">
                    Coventry-based businesses only. We respond within 1 working day.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ─────────────────────────────────────── */}
      <footer className="ca-footer">
        <div className="ca-wrap ca-footer__inner">
          <div>
            <a href="#top" className="ca-logo" onClick={to('top')}>
              Coventry <span>Analytics</span>
            </a>
            <p className="ca-footer__tag">
              Plain-English business reports for local SMEs.<br />
              Coventry, United Kingdom.
            </p>
          </div>
          <nav className="ca-footer__nav">
            {[
              ["services", "Services"],
              ["process", "How It Works"],
              ["for", "Who It's For"],
              ["contact", "Book Audit"],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={to(id)}>{label}</a>
            ))}
          </nav>
          <div className="ca-footer__legal">
            <p>© 2026 Coventry Analytics. All rights reserved.</p>
            <a href="mailto:hello@coventryanalytics.co.uk">
              hello@coventryanalytics.co.uk
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

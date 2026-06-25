'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function smoothScroll(e, id) {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      {/* NAV */}
      <nav className={`ca-nav${scrolled ? ' ca-nav--scrolled' : ''}`} id="nav">
        <div className="ca-container ca-nav__inner">
          <a href="#hero" className="ca-nav__logo" onClick={e => smoothScroll(e, 'hero')}>
            Coventry <span>Analytics</span>
          </a>
          <a href="#audit" className="ca-btn ca-btn--sm ca-btn--primary" onClick={e => smoothScroll(e, 'audit')}>
            Book Free Audit
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="ca-hero" id="hero">
        <div className="ca-container ca-hero__inner">
          <div className="ca-hero__tag">Operational Intelligence for UK SMEs</div>
          <h1 className="ca-hero__headline">
            Know Your Business Position<br />
            <span className="ca-highlight">By 8am. Every Morning.</span>
          </h1>
          <p className="ca-hero__sub">
            We build real-time operational control systems for logistics, fulfilment, and
            operations-heavy SMEs — so your decisions are driven by today&apos;s data, not
            last week&apos;s spreadsheet.
          </p>
          <div className="ca-hero__ctas">
            <a href="#audit" className="ca-btn ca-btn--primary ca-btn--lg" onClick={e => smoothScroll(e, 'audit')}>
              Book Operational Leak Audit <span className="ca-btn__tag">20 min · No commitment</span>
            </a>
            <a href="#offer" className="ca-btn ca-btn--ghost ca-btn--lg" onClick={e => smoothScroll(e, 'offer')}>
              See the 5-Day System
            </a>
          </div>
          <div className="ca-hero__trust">
            <span>Power BI</span>
            <span className="ca-dot">·</span>
            <span>Automated Data Pipelines</span>
            <span className="ca-dot">·</span>
            <span>Deployed in 5 Days</span>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section className="ca-problem" id="problem">
        <div className="ca-container">
          <div className="ca-section-label">The Problem</div>
          <h2 className="ca-section-title">
            You&apos;re Making <em>Yesterday&apos;s</em> Decisions<br />With Yesterday&apos;s Data.
          </h2>
          <div className="ca-problem__grid">
            {[
              { icon: '⏱', title: 'Decision Lag', desc: "Your ops data is 2–3 days old by the time it reaches you. You’re reacting, not leading." },
              { icon: '📊', title: 'Excel Chaos', desc: "Multiple spreadsheets, manual updates, version conflicts. You can’t trust the numbers — so you don’t act on them." },
              { icon: '🔦', title: 'Operational Blind Spots', desc: "Fulfilment delays, revenue dips, cashflow gaps — you’re finding out too late to do anything about them." },
              { icon: '🔁', title: 'Reporting Overhead', desc: "Someone is spending hours each week compiling reports that are already outdated the moment they’re sent." },
            ].map(card => (
              <div className="ca-problem__card" key={card.title}>
                <div className="ca-problem__icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section className="ca-solution" id="solution">
        <div className="ca-container ca-solution__inner">
          <div className="ca-solution__text">
            <div className="ca-section-label">The Solution</div>
            <h2 className="ca-section-title">An Operational Control System.<br />Not a Dashboard.</h2>
            <p>A dashboard shows you data. An <strong>Operational Control System</strong> gives you command of your business.</p>
            <p>We replace your fragmented Excel-based reporting with a single, live operational view — built around how your business actually runs. You see what matters. You act immediately. You stop guessing.</p>
            <ul className="ca-solution__list">
              <li><span className="ca-check">✓</span> Real-time visibility into your core operations</li>
              <li><span className="ca-check">✓</span> Decision-ready data by 8am every morning</li>
              <li><span className="ca-check">✓</span> Automated — no manual input, no spreadsheet maintenance</li>
              <li><span className="ca-check">✓</span> Built on Microsoft Power BI — no new software to learn</li>
            </ul>
          </div>
          <div className="ca-solution__visual">
            <div className="ca-mockup">
              <div className="ca-mockup__bar">
                <span /><span /><span />
              </div>
              <div className="ca-mockup__body">
                <div className="ca-mockup__kpi-row">
                  <div className="ca-mockup__kpi ca-mockup__kpi--green">
                    <div className="ca-mockup__kpi-label">Today&apos;s Revenue</div>
                    <div className="ca-mockup__kpi-value">£24,830</div>
                    <div className="ca-mockup__kpi-change">↑ 12% vs yesterday</div>
                  </div>
                  <div className="ca-mockup__kpi ca-mockup__kpi--amber">
                    <div className="ca-mockup__kpi-label">Fulfilment Rate</div>
                    <div className="ca-mockup__kpi-value">94.2%</div>
                    <div className="ca-mockup__kpi-change">↓ 2.1% — action needed</div>
                  </div>
                </div>
                <div className="ca-mockup__kpi-row">
                  <div className="ca-mockup__kpi ca-mockup__kpi--blue">
                    <div className="ca-mockup__kpi-label">Orders in Transit</div>
                    <div className="ca-mockup__kpi-value">387</div>
                    <div className="ca-mockup__kpi-change">On track</div>
                  </div>
                  <div className="ca-mockup__kpi ca-mockup__kpi--green">
                    <div className="ca-mockup__kpi-label">Cash Position</div>
                    <div className="ca-mockup__kpi-value">£142K</div>
                    <div className="ca-mockup__kpi-change">↑ Healthy</div>
                  </div>
                </div>
                <div className="ca-mockup__chart">
                  <div className="ca-mockup__chart-label">7-Day Performance Trend</div>
                  <div className="ca-mockup__bars">
                    {[55, 70, 60, 80, 75, 90, 95].map((h, i) => (
                      <div
                        key={i}
                        className={`ca-mockup__bar-item${i === 6 ? ' ca-mockup__bar-item--active' : ''}`}
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OFFER */}
      <section className="ca-offer" id="offer">
        <div className="ca-container">
          <div className="ca-section-label">Core Offer</div>
          <h2 className="ca-section-title">The 5-Day Operational<br />Control System</h2>
          <p className="ca-section-sub">
            We design and deploy your operational control system in 5 working days. You go
            from Excel chaos to full operational visibility — without disrupting how your team works.
          </p>
          <div className="ca-offer__grid">
            <div className="ca-offer__includes">
              <h3>What&apos;s Included</h3>
              <ul className="ca-offer__list">
                {[
                  { n: '01', title: 'Power BI Operational Control System', desc: 'Tailored to your core function — logistics, revenue, fulfilment, or cashflow.' },
                  { n: '02', title: 'Automated Data Pipeline', desc: 'Excel or existing data sources connected and automated. No manual updates.' },
                  { n: '03', title: 'KPI System Design', desc: 'We define the right metrics for your operation — not vanity numbers, decision drivers.' },
                  { n: '04', title: 'Daily Operational View', desc: 'Decision-ready view of your business, refreshed and waiting for you each morning.' },
                  { n: '05', title: 'Operational Alerts (Optional)', desc: 'Email or Slack notifications when KPIs fall outside your defined thresholds.' },
                ].map(item => (
                  <li key={item.n}>
                    <div className="ca-offer__item-icon">{item.n}</div>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="ca-offer__sidebar">
              <div className="ca-offer__card">
                <div className="ca-offer__card-badge">5 Working Days</div>
                <h3>Start Seeing Your Business Clearly</h3>
                <p>From kickoff to live operational control system — in one working week.</p>
                <div className="ca-offer__suitable">
                  <div className="ca-offer__suitable-title">Built for:</div>
                  <span className="ca-tag">Logistics SMEs</span>
                  <span className="ca-tag">E-commerce &amp; Fulfilment</span>
                  <span className="ca-tag">Operations-heavy businesses</span>
                  <span className="ca-tag">10–200 person companies</span>
                </div>
                <a href="#audit" className="ca-btn ca-btn--primary ca-btn--full" onClick={e => smoothScroll(e, 'audit')}>
                  Book Operational Leak Audit
                </a>
                <p className="ca-offer__card-note">Free · 20 minutes · No obligation</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="ca-process" id="process">
        <div className="ca-container">
          <div className="ca-section-label">How It Works</div>
          <h2 className="ca-section-title">From Kickoff to Control<br />in 5 Days</h2>
          <div className="ca-process__steps">
            {[
              { day: 'Day 1', title: 'Discovery & KPI Design', desc: 'We map your operation, identify decision bottlenecks, and design the KPI framework that will power your control system.' },
              { day: 'Day 2', title: 'Data Pipeline Build', desc: 'We connect your data sources and automate the flow — eliminating manual reporting from day two.' },
              { day: 'Day 3–4', title: 'Control System Build & Test', desc: 'Your Power BI operational system is built, configured, and stress-tested against your live data.' },
              { day: 'Day 5', title: 'Handover & Go Live', desc: 'Full walkthrough with your team. You go live with complete operational visibility and the confidence to act on it.' },
            ].map((step, i, arr) => (
              <div key={step.day} style={{ display: 'contents' }}>
                <div className="ca-process__step">
                  <div className="ca-process__step-num">{step.day}</div>
                  <div className="ca-process__step-content">
                    <h3>{step.title}</h3>
                    <p>{step.desc}</p>
                  </div>
                </div>
                {i < arr.length - 1 && <div className="ca-process__connector" />}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="ca-for" id="for">
        <div className="ca-container">
          <div className="ca-section-label">Who It&apos;s For</div>
          <h2 className="ca-section-title">Built for Operators,<br />Not IT Departments.</h2>
          <div className="ca-for__grid">
            {[
              { icon: '🚚', title: 'Logistics & Distribution SMEs', desc: "You're managing routes, capacity, and delivery performance across shifting demand. You need live visibility, not a Monday morning report." },
              { icon: '📦', title: 'E-commerce & Fulfilment Operations', desc: "Order volumes fluctuate. Fulfilment rates need to stay near-perfect. You need to know exactly where you stand before your team starts each shift." },
              { icon: '⚙️', title: 'Operations-Heavy Businesses', desc: "If your business runs on people, processes, and throughput — and your current reporting can't keep up — this system was built for you." },
            ].map(card => (
              <div className="ca-for__card" key={card.title}>
                <div className="ca-for__icon">{card.icon}</div>
                <h3>{card.title}</h3>
                <p>{card.desc}</p>
              </div>
            ))}
          </div>
          <div className="ca-for__qualifier">
            <p>You&apos;re a good fit if:</p>
            <ul>
              <li>Your team is still using Excel for core operational reporting</li>
              <li>You&apos;re making decisions based on data that&apos;s 24–72 hours old</li>
              <li>You have 10–200 employees and operations that generate daily data</li>
              <li>You want control of your business — not just a prettier spreadsheet</li>
            </ul>
          </div>
        </div>
      </section>

      {/* AUDIT CTA */}
      <section className="ca-audit" id="audit">
        <div className="ca-container ca-audit__inner">
          <div className="ca-audit__text">
            <div className="ca-section-label ca-section-label--light">Free Diagnostic</div>
            <h2 className="ca-section-title ca-section-title--light">Operational Leak Audit</h2>
            <p className="ca-audit__sub">
              In 20 minutes, we&apos;ll identify the inefficiencies, blind spots, and decision
              delays in your current reporting — and show you exactly what an improved
              control system would look like for your business.
            </p>
            <ul className="ca-audit__list">
              <li><span className="ca-check ca-check--light">✓</span> Identify your biggest operational blind spots</li>
              <li><span className="ca-check ca-check--light">✓</span> Pinpoint where decision lag is costing you</li>
              <li><span className="ca-check ca-check--light">✓</span> See a clear picture of what your control system would look like</li>
              <li><span className="ca-check ca-check--light">✓</span> No obligation. No sales pressure.</li>
            </ul>
          </div>
          <div className="ca-audit__form">
            <div className="ca-form-card">
              <h3>Book Your Audit</h3>
              <p>20 minutes. Free. Immediate value.</p>
              {submitted ? (
                <div className="ca-form-success">
                  <div className="ca-form-success__icon">✓</div>
                  <p>Request sent! We&apos;ll be in touch within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="ca-form-group">
                    <label>Your Name</label>
                    <input type="text" placeholder="James Richardson" required />
                  </div>
                  <div className="ca-form-group">
                    <label>Business Email</label>
                    <input type="email" placeholder="james@yourcompany.co.uk" required />
                  </div>
                  <div className="ca-form-group">
                    <label>Company Name</label>
                    <input type="text" placeholder="Richardson Logistics Ltd" required />
                  </div>
                  <div className="ca-form-group">
                    <label>What&apos;s your biggest operational challenge?</label>
                    <select required defaultValue="">
                      <option value="" disabled>Select one</option>
                      <option>Delayed or unreliable reporting</option>
                      <option>No real-time view of operations</option>
                      <option>Excel chaos / manual data work</option>
                      <option>Can&apos;t track KPIs effectively</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <button type="submit" className="ca-btn ca-btn--primary ca-btn--full ca-btn--lg">
                    Book My Free Audit →
                  </button>
                  <p className="ca-form-note">We&apos;ll respond within 1 business day to schedule your 20-minute call.</p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="ca-footer">
        <div className="ca-container ca-footer__inner">
          <div className="ca-footer__brand">
            <a href="#hero" className="ca-nav__logo" onClick={e => smoothScroll(e, 'hero')}>
              Coventry <span>Analytics</span>
            </a>
            <p>Operational Control Systems for UK SMEs.<br />Powered by Power BI. Delivered in 5 days.</p>
          </div>
          <div className="ca-footer__links">
            {[
              ['problem', 'The Problem'],
              ['solution', 'The Solution'],
              ['offer', '5-Day System'],
              ['process', 'Process'],
              ['audit', 'Book Audit'],
            ].map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={e => smoothScroll(e, id)}>{label}</a>
            ))}
          </div>
          <div className="ca-footer__legal">
            <p>© 2026 Coventry Analytics Ltd. All rights reserved.</p>
            <p>Coventry, United Kingdom · <a href="mailto:hello@coventryanalytics.co.uk">hello@coventryanalytics.co.uk</a></p>
          </div>
        </div>
      </footer>
    </>
  );
}

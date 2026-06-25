import NavScroll from '../components/NavScroll';
import ContactForm from '../components/ContactForm';

const EMAIL = 'info.coventryanalytics@gmail.com';
const PHONE = '024 0000 0000';

export const metadata = {
  title: 'Business Analytics for Coventry Taxi & Private Hire Operators | Coventry Analytics',
  description:
    'Monthly business reports for taxi and private hire operators in Coventry. Track driver efficiency, peak utilisation, dead miles, and revenue per hour. Free audit call.',
  alternates: {
    canonical: 'https://coventryanalytics.co.uk/business-analytics-coventry-taxi',
  },
};

export default function TaxiAnalyticsPage() {
  return (
    <>
      <NavScroll email={EMAIL} phone={PHONE} />

      <section className="ca-hero ca-hero--inner" id="top">
        <div className="ca-wrap">
          <p className="ca-eyebrow">Taxi & Private Hire · Coventry & Warwickshire</p>
          <h1 className="ca-display">
            Business analytics for<br />
            <em>Coventry taxi operators.</em>
          </h1>
          <p className="ca-hero-sub">
            Know your revenue per hour, your dead mileage cost, and your most efficient
            drivers — every month, in plain English. Built for private hire operators in
            Coventry and Warwickshire.
          </p>
          <div className="ca-hero-actions">
            <a href={`mailto:${EMAIL}?subject=Taxi Analytics Enquiry`} className="ca-btn-primary">
              Book Free Audit Call
            </a>
          </div>
          <p className="ca-trust">Serving taxi operators across Coventry · Kenilworth · Warwick · Rugby</p>
        </div>
      </section>

      <section className="ca-services" style={{ background: 'var(--ca-surf)' }}>
        <div className="ca-wrap">
          <div className="ca-sh">
            <p className="ca-sh-kicker">What we track for taxi operators</p>
            <h2 className="ca-h2">Your fleet numbers, made clear</h2>
            <p className="ca-sh-sub">Whether you run 2 cars or 20, these are the metrics that determine whether your operation is profitable — and where it's leaking money.</p>
          </div>
          <div className="ca-industries">
            {[
              { label: "Revenue per hour by driver", desc: "Which drivers are generating the most revenue per shift — and which shifts are underperforming. Essential for fair, data-led performance conversations." },
              { label: "Dead mileage analysis", desc: "Miles driven without a fare. Dead mileage is pure cost. We quantify it by driver, by area, and by time of day so you can reduce it." },
              { label: "Peak utilisation", desc: "When is demand highest? Are your drivers available when fares are available? We map supply against demand so you're not missing revenue." },
              { label: "Shift profitability", desc: "Morning, afternoon, evening, night — which shifts generate real profit after fuel and driver costs? The answer often surprises operators." },
              { label: "Platform vs. account work split", desc: "Uber, Bolt, Ola, and direct accounts have different margins. We show you the true profitability of each channel." },
              { label: "Fuel cost per mile", desc: "Tracked against revenue. Fuel efficiency and routing decisions that look minor become significant at scale across a fleet." },
            ].map((ind) => (
              <div className="ca-industry" key={ind.label}>
                <div className="ca-industry__accent" />
                <div>
                  <p className="ca-industry__label">{ind.label}</p>
                  <p className="ca-industry__desc">{ind.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="ca-contact" id="contact">
        <div className="ca-wrap">
          <div className="ca-contact__grid">
            <div className="ca-contact__text">
              <p className="ca-contact__kicker">Free · 20 minutes · No obligation</p>
              <h2 className="ca-h2">Book your free<br />operator audit call</h2>
              <p className="ca-contact__sub">
                We&apos;ll look at your current trip data and tell you the top things
                your operation should be tracking — and what it would be worth to fix them.
              </p>
              <p className="ca-contact__human">Based in Coventry CV1. Licensed Coventry area knowledge.</p>
            </div>
            <div className="ca-form-wrap">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="ca-footer">
        <div className="ca-wrap ca-footer__inner">
          <div>
            <a href="/" className="ca-logo">Coventry <span>Analytics</span></a>
            <p className="ca-footer__tag">Plain-English business reports for local SMEs.<br />Coventry, West Midlands, CV1.</p>
          </div>
          <nav className="ca-footer__nav">
            <a href="/#services">Services</a>
            <a href="/#process">How It Works</a>
            <a href="/#faq">FAQ</a>
            <a href="/#contact">Book Audit</a>
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

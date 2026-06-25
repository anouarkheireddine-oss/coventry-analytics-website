import NavScroll from '../components/NavScroll';
import ContactForm from '../components/ContactForm';

const EMAIL = 'info.coventryanalytics@gmail.com';
const PHONE = '024 0000 0000';

export const metadata = {
  title: 'Business Analytics for Coventry Cafés & Coffee Shops | Coventry Analytics',
  description:
    'Plain-English monthly business reports for cafés and coffee shops in Coventry. Find your dead hours, reduce labour costs, and know your most profitable items. Free audit call.',
  alternates: {
    canonical: 'https://coventryanalytics.co.uk/business-analytics-coventry-cafes',
  },
};

export default function CafeAnalyticsPage() {
  return (
    <>
      <NavScroll email={EMAIL} phone={PHONE} />

      <section className="ca-hero ca-hero--inner" id="top">
        <div className="ca-wrap">
          <p className="ca-eyebrow">Cafés & Coffee Shops · Coventry</p>
          <h1 className="ca-display">
            Business analytics for<br />
            <em>Coventry cafés.</em>
          </h1>
          <p className="ca-hero-sub">
            Find out which hours are costing you money, what your busiest days really earn,
            and what one change would make the biggest difference — every month, in plain English.
          </p>
          <div className="ca-hero-actions">
            <a href={`mailto:${EMAIL}?subject=Café Analytics Enquiry`} className="ca-btn-primary">
              Book Free Audit Call
            </a>
          </div>
          <p className="ca-trust">Serving cafés in Coventry City Centre · Earlsdon · Foleshill · Tile Hill</p>
        </div>
      </section>

      <section className="ca-services" style={{ background: 'var(--ca-surf)' }}>
        <div className="ca-wrap">
          <div className="ca-sh">
            <p className="ca-sh-kicker">What we track for cafés</p>
            <h2 className="ca-h2">Your café KPIs, made clear</h2>
            <p className="ca-sh-sub">These are the numbers that determine whether a café is profitable — most owners never see them in one place.</p>
          </div>
          <div className="ca-industries">
            {[
              { label: "Dead hours analysis", desc: "Which time slots are costing more in labour than they earn in revenue — and whether closing or repricing would help." },
              { label: "Labour cost %", desc: "Your wage bill as a percentage of revenue, tracked month by month. The industry benchmark is 28–35%. We tell you where you sit." },
              { label: "Average transaction value", desc: "What your customers spend on average, and whether upselling opportunities (pastries, large coffees, add-ons) are being missed." },
              { label: "Best and worst trading days", desc: "Not just which days are busy — but which are profitable. A busy Saturday with high staffing can underperform a quiet Thursday." },
              { label: "Seasonal demand patterns", desc: "School holidays, local events, weather patterns — we map your revenue against these so you can plan staffing in advance." },
              { label: "Food cost percentage", desc: "For cafés that serve food, tracking food cost % prevents margin erosion before it becomes a problem." },
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

      <section className="ca-contact" id="contact">
        <div className="ca-wrap">
          <div className="ca-contact__grid">
            <div className="ca-contact__text">
              <p className="ca-contact__kicker">Free · 20 minutes · No obligation</p>
              <h2 className="ca-h2">Book your free<br />café audit call</h2>
              <p className="ca-contact__sub">
                We&apos;ll look at your till data and tell you exactly what we&apos;d
                report on for your café — and whether it would be worth it.
              </p>
              <p className="ca-contact__human">
                Based in Coventry CV1. You speak directly to us.
              </p>
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

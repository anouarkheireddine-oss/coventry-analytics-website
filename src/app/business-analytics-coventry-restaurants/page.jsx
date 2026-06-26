import NavScroll from '../components/NavScroll';
import ContactForm from '../components/ContactForm';

const EMAIL = 'info.coventryanalytics@gmail.com';
const PHONE = '07405 091054';

export const metadata = {
  title: 'Business Analytics for Coventry Restaurants & Takeaways | Coventry Analytics',
  description:
    'Monthly business reports for restaurants and takeaways in Coventry. Track covers, food cost %, delivery platform margins, and peak night performance. Free audit call.',
  alternates: {
    canonical: 'https://coventryanalytics.co.uk/business-analytics-coventry-restaurants',
  },
};

export default function RestaurantAnalyticsPage() {
  return (
    <>
      <NavScroll email={EMAIL} phone={PHONE} />

      <section className="ca-hero ca-hero--inner" id="top">
        <div className="ca-wrap">
          <p className="ca-eyebrow">Restaurants & Takeaways · Coventry</p>
          <h1 className="ca-display">
            Business analytics for<br />
            <em>Coventry restaurants.</em>
          </h1>
          <p className="ca-hero-sub">
            Know your covers, your kitchen margin, your delivery platform cost, and your
            peak performance — every month, in plain English. No dashboards. No jargon.
          </p>
          <div className="ca-hero-actions">
            <a href={`mailto:${EMAIL}?subject=Restaurant Analytics Enquiry`} className="ca-btn-primary">
              Book Free Audit Call
            </a>
          </div>
          <p className="ca-trust">Serving restaurants in Coventry City Centre · Foleshill · Earlsdon · Binley</p>
        </div>
      </section>

      <section className="ca-services" style={{ background: 'var(--ca-surf)' }}>
        <div className="ca-wrap">
          <div className="ca-sh">
            <p className="ca-sh-kicker">What we track for restaurants</p>
            <h2 className="ca-h2">Your restaurant numbers, finally visible</h2>
            <p className="ca-sh-sub">Restaurants are high-revenue, thin-margin businesses. These are the numbers that separate profit from loss.</p>
          </div>
          <div className="ca-industries">
            {[
              { label: "Covers and revenue per cover", desc: "How many tables you turned, what each cover earned on average, and which nights underperformed." },
              { label: "Food cost percentage", desc: "Your food spend as a proportion of revenue. Industry benchmark is 28–35%. We flag drift before it becomes a crisis." },
              { label: "Delivery platform margin erosion", desc: "Uber Eats, Deliveroo, and Just Eat take 25–35% commission. We show you your true margin per platform — and whether it's worth it." },
              { label: "Peak night analysis", desc: "Friday and Saturday might feel busy — but are they your most profitable? We measure revenue, staff cost, and margin by night." },
              { label: "Labour efficiency", desc: "Kitchen and front-of-house wage cost tracked against covers served. Overstaffing on quiet nights is the biggest hidden cost in restaurants." },
              { label: "Menu item performance", desc: "Which dishes are selling, which have the best margin, and which are dragging down kitchen efficiency." },
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
              <h2 className="ca-h2">Book your free<br />restaurant audit call</h2>
              <p className="ca-contact__sub">
                We&apos;ll look at your current numbers and tell you the top three things
                your restaurant should be tracking — and what fixing them would be worth.
              </p>
              <p className="ca-contact__human">Based in Coventry CV1. You speak directly to us.</p>
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

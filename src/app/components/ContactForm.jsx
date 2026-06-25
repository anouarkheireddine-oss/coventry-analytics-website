'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="ca-success">
        <div className="ca-success__mark">✓</div>
        <h3>Received.</h3>
        <p>We&apos;ll be in touch within 1 business day to arrange your call.</p>
      </div>
    );
  }

  return (
    <form className="ca-form" onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}>
      <h3 className="ca-form__title">Tell us about your business</h3>
      <p className="ca-form__sub">We&apos;ll come back to you within one working day.</p>
      <div className="ca-field">
        <label>Your name</label>
        <input type="text" placeholder="Sarah Ahmed" required />
      </div>
      <div className="ca-field">
        <label>Email address</label>
        <input type="email" placeholder="sarah@copperkettle.co.uk" required />
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
      <button type="submit" className="ca-submit">
        Book Free Audit Call →
      </button>
      <p className="ca-form__note">Coventry-based businesses only. No commitment required.</p>
    </form>
  );
}

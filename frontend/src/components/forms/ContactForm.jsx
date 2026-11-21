import { useEffect, useId, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import Button from '@/components/ui/Button';
import Icon from '@/components/ui/Icon';
import { validateAll, validateField, MESSAGE_MAX } from '@/lib/validation';
import { submitEnquiry } from '@/lib/contact';
import { getPublishedProducts } from '@/lib/products';
import { contact } from '@/content/pages';
import { site } from '@/content/site';
import { cx } from '@/lib/utils';
import styles from './ContactForm.module.css';

const LABELS = {
  name: 'Full name',
  email: 'Work email',
  enquiryType: 'Enquiry type',
  message: 'Message',
  consent: 'Privacy consent',
};

function Field({ id, label, required, error, hint, children }) {
  return (
    <div className={cx(styles.field, error && styles.hasError)}>
      <label htmlFor={id} className={styles.label}>
        {label} {required ? <span className={styles.req}>(required)</span> : <span className={styles.opt}>(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className={styles.hint}>
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className={styles.error}>
          <Icon name="X" size={14} /> {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const uid = useId();
  const [params] = useSearchParams();
  const products = getPublishedProducts();
  const [values, setValues] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    enquiryType: '',
    product: '',
    message: '',
    consent: false,
    company_website: '', // honeypot
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [copied, setCopied] = useState(false);
  const summaryRef = useRef(null);
  const successRef = useRef(null);

  // Prefill from ?product=slug&type=demo, or ?type=build (from "Build with us")
  useEffect(() => {
    const slug = params.get('product');
    const match = products.find((p) => p.slug === slug);
    if (match) {
      setValues((v) => ({ ...v, product: match.name, enquiryType: v.enquiryType || 'Product enquiry' }));
    } else if (params.get('type') === 'build') {
      setValues((v) => ({ ...v, enquiryType: v.enquiryType || 'Build a product with us' }));
    }
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (status === 'success') successRef.current?.focus();
  }, [status]);

  const id = (name) => `${uid}-${name}`;
  const describedBy = (name, hint) =>
    [errors[name] && `${id(name)}-error`, hint && !errors[name] && `${id(name)}-hint`].filter(Boolean).join(' ') || undefined;

  const onChange = (e) => {
    const { name, type, checked, value } = e.target;
    const next = type === 'checkbox' ? checked : value;
    setValues((v) => ({ ...v, [name]: next }));
    if (errors[name]) setErrors((err) => ({ ...err, [name]: validateField(name, next) }));
  };
  const onBlur = (e) => {
    const { name, type, checked, value } = e.target;
    if (!(name in LABELS)) return;
    const error = validateField(name, type === 'checkbox' ? checked : value);
    setErrors((err) => ({ ...err, [name]: error }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (values.company_website) return; // bot
    const found = validateAll(values);
    setErrors(found);
    if (Object.keys(found).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    setStatus('submitting');
    const result = await submitEnquiry(values);
    setStatus(result.ok ? 'success' : 'error');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* clipboard unavailable */
    }
  };

  if (status === 'success') {
    return (
      <div className={styles.success} role="status">
        <span className={styles.successIcon}>
          <Icon name="Check" size={28} />
        </span>
        <h2 ref={successRef} tabIndex={-1} className={styles.successTitle}>
          Thank you — your email is ready to send
        </h2>
        <p>
          We've opened your email app with your message addressed to{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>. Please press send there, and we'll be in touch.
        </p>
        <p className={styles.muted}>If nothing opened, email us directly at {site.email}.</p>
        <div className={styles.successActions}>
          <Button variant="secondary" iconLeft="Copy" onClick={copyEmail}>
            {copied ? 'Email address copied' : 'Copy email address'}
          </Button>
          <Button variant="ghost" iconRight="ArrowRight" onClick={() => setStatus('idle')}>
            Back to the form
          </Button>
        </div>
      </div>
    );
  }

  const errorList = Object.entries(errors).filter(([, v]) => v);
  const messageLength = values.message.length;

  return (
    <form className={styles.form} onSubmit={onSubmit} noValidate aria-describedby={`${uid}-intro`}>
      <p id={`${uid}-intro`} className={styles.intro}>
        Fields marked “required” must be completed. Sending opens your email app with your message ready to send to{' '}
        {site.email}.
      </p>

      {errorList.length > 0 && (
        <div ref={summaryRef} tabIndex={-1} className={styles.summary} role="alert">
          <h2 className={styles.summaryTitle}>Please fix the following:</h2>
          <ul>
            {errorList.map(([name, msg]) => (
              <li key={name}>
                <a href={`#${id(name)}`}>{msg}</a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.grid}>
        <Field id={id('name')} label="Full name" required error={errors.name}>
          <input id={id('name')} name="name" type="text" autoComplete="name" value={values.name} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(errors.name)} aria-describedby={describedBy('name')} className={styles.input} />
        </Field>
        <Field id={id('email')} label="Work email" required error={errors.email}>
          <input id={id('email')} name="email" type="email" autoComplete="email" inputMode="email" value={values.email} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(errors.email)} aria-describedby={describedBy('email')} className={styles.input} />
        </Field>
        <Field id={id('company')} label="Company">
          <input id={id('company')} name="company" type="text" autoComplete="organization" value={values.company} onChange={onChange} className={styles.input} />
        </Field>
        <Field id={id('phone')} label="Phone">
          <input id={id('phone')} name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={onChange} className={styles.input} />
        </Field>
        <Field id={id('enquiryType')} label="Enquiry type" required error={errors.enquiryType}>
          <div className={styles.selectWrap}>
            <select id={id('enquiryType')} name="enquiryType" value={values.enquiryType} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(errors.enquiryType)} aria-describedby={describedBy('enquiryType')} className={styles.input}>
              <option value="">Select an option</option>
              {contact.enquiryTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            <Icon name="ChevronDown" size={18} />
          </div>
        </Field>
        <Field id={id('product')} label="Product of interest">
          <div className={styles.selectWrap}>
            <select id={id('product')} name="product" value={values.product} onChange={onChange} className={styles.input}>
              <option value="">Not sure yet</option>
              {products.map((p) => (
                <option key={p.slug} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
            <Icon name="ChevronDown" size={18} />
          </div>
        </Field>
        <div className={styles.full}>
          <Field id={id('message')} label="Message" required error={errors.message} hint="Tell us about your organisation and what you'd like to discuss (at least 20 characters).">
            <textarea id={id('message')} name="message" rows={6} maxLength={MESSAGE_MAX} value={values.message} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(errors.message)} aria-describedby={describedBy('message', true)} className={cx(styles.input, styles.textarea)} />
          </Field>
          <p className={styles.counter} aria-live="polite">
            {messageLength} / {MESSAGE_MAX}
          </p>
        </div>
      </div>

      {/* Honeypot: hidden from people, often filled in by bots */}
      <div className={styles.honeypot} aria-hidden="true">
        <label htmlFor={id('company_website')}>Company website</label>
        <input id={id('company_website')} name="company_website" type="text" tabIndex={-1} autoComplete="off" value={values.company_website} onChange={onChange} />
      </div>

      <div className={cx(styles.consent, errors.consent && styles.hasError)}>
        <input id={id('consent')} name="consent" type="checkbox" checked={values.consent} onChange={onChange} onBlur={onBlur} aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? `${id('consent')}-error` : undefined} className={styles.checkbox} />
        <label htmlFor={id('consent')}>
          I agree to ANAYA processing my details to respond to this enquiry, as described in the{' '}
          <Link to="/legal/privacy">Privacy Policy</Link>. <span className={styles.req}>(required)</span>
        </label>
        {errors.consent && (
          <p id={`${id('consent')}-error`} className={styles.error}>
            <Icon name="X" size={14} /> {errors.consent}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p className={styles.formError} role="alert">
          Your message could not be prepared. Please email us directly at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}

      <div className={styles.actions}>
        <Button type="submit" size="lg" iconRight="ArrowRight" aria-busy={status === 'submitting'} disabled={status === 'submitting'} fullWidthOnMobile>
          {status === 'submitting' ? 'Preparing…' : 'Send message'}
        </Button>
        <p className={styles.privacy}>{contact.privacyLine}</p>
      </div>
    </form>
  );
}

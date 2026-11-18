// Contact form delivery. No backend: the default adapter opens the visitor's
// email app with a prefilled message to info@anaya.uk. See docs/06 §11.
import { site } from '@/content/site';

export function buildMailto(values) {
  const subject = `${values.enquiryType || 'Website enquiry'}${values.product ? ` — ${values.product}` : ''}`;
  const lines = [
    values.message?.trim(),
    '',
    '—',
    `Name: ${values.name?.trim()}`,
    `Email: ${values.email?.trim()}`,
    values.company?.trim() && `Company: ${values.company.trim()}`,
    values.phone?.trim() && `Phone: ${values.phone.trim()}`,
    values.product && `Product of interest: ${values.product}`,
    'Sent from the anaya.uk contact form',
  ].filter((line) => line !== undefined && line !== false && line !== null);
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
}

const adapters = {
  async mailto(values) {
    window.location.href = buildMailto(values);
    return { ok: true, mode: 'mailto' };
  },
  async endpoint(values) {
    const url = import.meta.env.VITE_CONTACT_ENDPOINT;
    if (!url) return { ok: false, error: 'Form endpoint is not configured.' };
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(values),
    });
    return res.ok ? { ok: true, mode: 'endpoint' } : { ok: false, error: 'The form could not be sent.' };
  },
};

export async function submitEnquiry(values) {
  const adapter = adapters[import.meta.env.VITE_CONTACT_ADAPTER] ?? adapters.mailto;
  try {
    return await adapter(values);
  } catch {
    return { ok: false, error: 'Something went wrong while sending your message.' };
  }
}

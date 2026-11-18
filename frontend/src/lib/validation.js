// Contact form validation, kept separate from the UI so it can be unit tested.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 2000;

export function validateField(name, value) {
  const v = typeof value === 'string' ? value.trim() : value;
  switch (name) {
    case 'name':
      return v ? '' : 'Enter your full name.';
    case 'email':
      if (!v) return 'Enter your email address.';
      return EMAIL_RE.test(v) ? '' : 'Enter an email address in the format name@company.com.';
    case 'enquiryType':
      return v ? '' : 'Choose an enquiry type.';
    case 'message':
      if (!v) return 'Enter your message.';
      if (v.length < MESSAGE_MIN) return `Your message must be at least ${MESSAGE_MIN} characters.`;
      if (v.length > MESSAGE_MAX) return `Your message must be ${MESSAGE_MAX} characters or fewer.`;
      return '';
    case 'consent':
      return v ? '' : 'Please confirm you agree so we can respond to your enquiry.';
    default:
      return '';
  }
}

export const REQUIRED_FIELDS = ['name', 'email', 'enquiryType', 'message', 'consent'];

export function validateAll(values) {
  const errors = {};
  for (const field of REQUIRED_FIELDS) {
    const error = validateField(field, values[field]);
    if (error) errors[field] = error;
  }
  return errors;
}

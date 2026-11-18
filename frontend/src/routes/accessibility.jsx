import LegalPage from '@/components/sections/LegalPage';
import { legalDocs } from '@/content/legal';
import { buildMeta } from '@/lib/seo';

export function meta() {
  const doc = legalDocs.accessibility;
  return buildMeta({ title: doc.title, description: doc.description, path: '/accessibility' });
}

export default function Accessibility() {
  return <LegalPage doc={legalDocs.accessibility} slug="/accessibility" />;
}

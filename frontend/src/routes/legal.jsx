import LegalPage from '@/components/sections/LegalPage';
import ErrorPage from '@/components/sections/ErrorPage';
import { legalDocs } from '@/content/legal';
import { buildMeta, notFoundMeta } from '@/lib/seo';

const DOCS = ['privacy', 'cookies', 'terms'];

export function meta({ params }) {
  const doc = DOCS.includes(params.doc) && legalDocs[params.doc];
  if (!doc) return notFoundMeta();
  return buildMeta({ title: doc.title, description: doc.description, path: `/legal/${params.doc}` });
}

export default function Legal({ params }) {
  const doc = DOCS.includes(params.doc) && legalDocs[params.doc];
  if (!doc) return <ErrorPage title="Page not found" message="The page you're looking for doesn't exist or has moved." />;
  return <LegalPage key={params.doc} doc={doc} slug={`/legal/${params.doc}`} />;
}

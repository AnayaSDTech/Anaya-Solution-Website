import ErrorPage from '@/components/sections/ErrorPage';
import { notFoundMeta } from '@/lib/seo';

export function meta() {
  return notFoundMeta();
}

export default function NotFound() {
  return <ErrorPage title="Page not found" message="The page you're looking for doesn't exist or has moved." />;
}

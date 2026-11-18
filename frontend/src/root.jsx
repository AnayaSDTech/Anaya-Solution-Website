import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse } from 'react-router';
import { MotionConfig, LazyMotion, domAnimation } from 'motion/react';

import '@fontsource-variable/inter';
import '@fontsource-variable/space-grotesk/wght.css';
import '@fontsource/jetbrains-mono/400.css';
import '@fontsource/jetbrains-mono/500.css';
import './styles/index.css';

import ErrorPage from '@/components/sections/ErrorPage';
import { withBase } from '@/lib/base';

export const links = () => [
  { rel: 'icon', href: withBase('/favicon.svg'), type: 'image/svg+xml' },
  { rel: 'apple-touch-icon', href: withBase('/favicon.svg') },
];

export function Layout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#05070D" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <Outlet />
      </MotionConfig>
    </LazyMotion>
  );
}

/**
 * Shell rendered into __spa-fallback.html, which the host serves for URLs that
 * were not pre-rendered (unknown pages → 404). The app then renders the right
 * page in the browser. The <noscript> message covers visitors without JavaScript.
 */
export function HydrateFallback() {
  return (
    <main style={{ minHeight: '100vh', background: '#05070D' }}>
      <noscript>
        <div style={{ padding: '96px 24px', color: '#C9D0DE', fontFamily: 'system-ui, sans-serif' }}>
          <h1 style={{ color: '#F5F7FB' }}>Page not found</h1>
          <p>
            The page you're looking for doesn't exist or has moved. <a href={withBase('/')}>Go to the ANAYA Solutions home page</a>.
          </p>
        </div>
      </noscript>
    </main>
  );
}

export function ErrorBoundary({ error }) {
  const notFound = isRouteErrorResponse(error) && error.status === 404;
  if (!notFound && import.meta.env.DEV) console.error(error);
  return (
    <ErrorPage
      title={notFound ? 'Page not found' : 'Something went wrong'}
      message={
        notFound
          ? "The page you're looking for doesn't exist or has moved."
          : 'An unexpected error occurred. Please try again, or go back to the home page.'
      }
      standalone
    />
  );
}

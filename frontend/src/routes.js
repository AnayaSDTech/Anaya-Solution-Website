import { index, layout, route } from '@react-router/dev/routes';

export default [
  layout('layouts/SiteLayout.jsx', [
    index('routes/home.jsx'),
    route('products', 'routes/products.jsx'),
    route('products/:productSlug', 'routes/product-detail.jsx'),
    route('build-with-us', 'routes/build-with-us.jsx'),
    route('technology', 'routes/technology.jsx'),
    route('services', 'routes/services.jsx'),
    route('about', 'routes/about.jsx'),
    route('careers', 'routes/careers.jsx'),
    route('contact', 'routes/contact.jsx'),
    route('legal/:doc', 'routes/legal.jsx'),
    route('accessibility', 'routes/accessibility.jsx'),
    route('*', 'routes/not-found.jsx'),
  ]),
];

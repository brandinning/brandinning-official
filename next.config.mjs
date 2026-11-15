import fs from "fs";

const blogsData = JSON.parse(fs.readFileSync("./src/lib/blogs-data.json", "utf8"));

const removedLandingPages = [
  // Greater Noida
  "/best-digital-marketing-agency-in-greater-noida",
  "/best-seo-agency-in-greater-noida",
  "/best-local-seo-agency-in-greater-noida",
  "/best-smo-company-in-greater-noida",
  "/best-geo-agency-in-greater-noida",
  "/best-aeo-agency-in-greater-noida",
  "/best-vso-agency-in-greater-noida",
  "/best-web-development-company-in-greater-noida",
  "/best-website-design-agency-in-greater-noida",
  "/best-ecommerce-web-development-in-greater-noida",
  "/wordpress-development-service-in-greater-noida",
  // Gurugram
  "/best-digital-marketing-agency-in-gurugram",
  "/best-seo-agency-in-gurugram",
  "/best-local-seo-agency-in-gurugram",
  "/best-smo-company-in-gurugram",
  "/best-geo-agency-in-gurugram",
  "/best-aeo-agency-in-gurugram",
  "/best-vso-agency-in-gurugram",
  "/best-web-development-company-in-gurugram",
  "/best-website-design-agency-in-gurugram",
  "/best-ecommerce-web-development-in-gurugram",
  "/wordpress-development-service-in-gurugram",
  // Ghaziabad
  "/best-digital-marketing-agency-in-ghaziabad",
  "/best-seo-agency-in-ghaziabad",
  "/best-local-seo-agency-in-ghaziabad",
  "/best-smo-company-in-ghaziabad",
  "/best-geo-agency-in-ghaziabad",
  "/best-aeo-agency-in-ghaziabad",
  "/best-vso-agency-in-ghaziabad",
  "/best-web-development-company-in-ghaziabad",
  "/best-website-design-agency-in-ghaziabad",
  "/best-ecommerce-web-development-in-ghaziabad",
  "/wordpress-development-service-in-ghaziabad",
  // Faridabad
  "/best-digital-marketing-agency-in-faridabad",
  "/best-seo-agency-in-faridabad",
  "/best-local-seo-agency-in-faridabad",
  "/best-smo-company-in-faridabad",
  "/best-geo-agency-in-faridabad",
  "/best-aeo-agency-in-faridabad",
  "/best-vso-agency-in-faridabad",
  "/best-web-development-company-in-faridabad",
  "/best-website-design-agency-in-faridabad",
  "/best-ecommerce-web-development-in-faridabad",
  "/wordpress-development-service-in-faridabad"
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compress: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    // 30 Blog post root redirects to /blog/:slug
    const blogRedirects = blogsData.map((b) => ({
      source: `/${b.slug}`,
      destination: `/blog/${b.slug}`,
      permanent: true,
    }));

    // Redirect /blogs/:slug to /blog/:slug
    const blogsToBlogRedirects = blogsData.map((b) => ({
      source: `/blogs/${b.slug}`,
      destination: `/blog/${b.slug}`,
      permanent: true,
    }));

    // Specific redirects for removed pages
    const specificRemovedRedirects = [
      { source: '/home-2', destination: '/', permanent: true },
      { source: '/blogs', destination: '/blog', permanent: true },
      { source: '/social-media-pacakege', destination: '/packages', permanent: true },
      { source: '/best-smo-company-in-delhi-2', destination: '/best-smo-company-in-delhi', permanent: true },
      { source: '/best-seo-services-in-noida-1', destination: '/best-seo-agency-in-noida', permanent: true },
      { source: '/best-woocommerce-devevelopment-company-in-noida1', destination: '/best-woocommerce-devevelopment-company-in-noida', permanent: true },
      { source: '/case-studies/ed-sathi', destination: '/case-studies', permanent: true },
      { source: '/case-studies/c3d-case-study', destination: '/case-studies', permanent: true },
      { source: '/case-studies/mitcham-dental', destination: '/case-studies', permanent: true },
      { source: '/case-studies/avc-india', destination: '/case-studies', permanent: true },
    ];

    // Redirect all 44 removed city landing pages to /contact
    const cityLandingRedirects = removedLandingPages.map((route) => ({
      source: route,
      destination: '/contact',
      permanent: true,
    }));

    return [
      ...specificRemovedRedirects,
      ...cityLandingRedirects,
      ...blogRedirects,
      ...blogsToBlogRedirects,
    ];
  },
  async headers() {
    return [
      {
        source: '/assets/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/wp-content/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/wp-includes/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*\\.(woff2|woff|ttf|webp|png|jpg|jpeg|svg)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;

import fs from "fs";

const blogsData = JSON.parse(fs.readFileSync("./src/lib/blogs-data.json", "utf8"));

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
    const blogRedirects = blogsData.map((b) => ({
      source: `/${b.slug}`,
      destination: `/blogs/${b.slug}`,
      permanent: true,
    }));

    const greenRemovedRedirects = [
      { source: '/home-2', destination: '/', permanent: true },
      { source: '/blog', destination: '/blogs', permanent: true },
      { source: '/social-media-pacakege', destination: '/packages', permanent: true },
      { source: '/best-smo-company-in-delhi-2', destination: '/best-smo-company-in-delhi', permanent: true },
      { source: '/best-seo-services-in-noida-1', destination: '/best-seo-agency-in-noida', permanent: true },
      { source: '/best-woocommerce-devevelopment-company-in-noida1', destination: '/best-woocommerce-devevelopment-company-in-noida', permanent: true },
      { source: '/case-studies/ed-sathi', destination: '/case-studies', permanent: true },
      { source: '/case-studies/c3d-case-study', destination: '/case-studies', permanent: true },
      { source: '/case-studies/mitcham-dental', destination: '/case-studies', permanent: true },
      { source: '/case-studies/avc-india', destination: '/case-studies', permanent: true },
    ];

    return [
      ...greenRemovedRedirects,
      ...blogRedirects,
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

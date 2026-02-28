/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production'

const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com",
  "form-action 'self'",
  "img-src 'self' data: blob: https: https://*.firebaseapp.com https://*.googleusercontent.com",
  "font-src 'self' data: https: https://fonts.gstatic.com",
  "style-src 'self' 'unsafe-inline' https: https://fonts.googleapis.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https: https://*.firebaseapp.com https://*.googleapis.com",
  "connect-src 'self' https: wss://*.firebaseio.com https://*.googleapis.com",
  'upgrade-insecure-requests',
].join('; ')

const securityHeaders = [
  ...(isProd
    ? [
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
      ]
    : []),
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Content-Security-Policy', value: csp },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
  },
  { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
  { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' },
]

const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default nextConfig

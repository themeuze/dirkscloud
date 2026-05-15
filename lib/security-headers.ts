/** Shared security headers for Next.js and Azure Static Web Apps. */
export const SECURITY_HEADERS: Record<string, string> = {
  'Content-Security-Policy': [
    "default-src 'self'",
    // Next.js static export embeds small inline bootstrap scripts (RSC payload); no eval.
    "script-src 'self' 'unsafe-inline'",
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' mailto:",
    "object-src 'none'",
    'upgrade-insecure-requests',
  ].join('; '),
  'X-Frame-Options': 'DENY',
  'X-Content-Type-Options': 'nosniff',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'X-DNS-Prefetch-Control': 'off',
}

export const HEADER_ENTRIES = Object.entries(SECURITY_HEADERS).map(([key, value]) => ({
  key,
  value,
}))

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const siteUrl = 'https://dirkscloud.nl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Dirks Cloud Engineering | Senior Azure Capaciteit',
  description:
    'Senior Azure capaciteit en architectuur voor MSP\'s en MKB. Security, FinOps, derdelijns troubleshooting — direct inzetbaar.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dirks Cloud Engineering',
    description:
      'Senior Azure capaciteit en architectuur — direct inzetbaar voor MSP\'s en MKB.',
    url: siteUrl,
    siteName: 'Dirks Cloud Engineering',
    locale: 'nl_NL',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#0b1120',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={inter.variable}>
      <body className="font-sans">
        <noscript>
          <div className="noscript-fallback">
            <p>
              Dirks Cloud Engineering — Senior Azure Capaciteit &amp; Architectuur. Schakel
              JavaScript in of mail naar{' '}
              <a href="mailto:mdirks@dirkscloud.nl">mdirks@dirkscloud.nl</a>.
            </p>
          </div>
        </noscript>
        {children}
      </body>
    </html>
  )
}

import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import { LanguageProvider } from '@/app/providers/LanguageProvider'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

const siteUrl = 'https://dirkscloud.nl'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Dirks Cloud Engineering | Hands-on Azure Beheer',
  description:
    'Hands-on Azure beheer en implementatie — direct inzetbaar. Extra capaciteit voor netwerk, identiteit, compute en monitoring.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dirks Cloud Engineering',
    description:
      'Hands-on Azure Beheer & Implementatie — direct inzetbaar wanneer u extra capaciteit nodig heeft.',
    url: siteUrl,
    siteName: 'Dirks Cloud Engineering',
    locale: 'nl_NL',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="nl" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <noscript>
          <div className="noscript-fallback">
            <p>
              Dirks Cloud Engineering — Hands-on Azure Beheer &amp; Implementatie. Mail{' '}
              <a href="mailto:mdirks@dirkscloud.nl">mdirks@dirkscloud.nl</a>.
            </p>
          </div>
        </noscript>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

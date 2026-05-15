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
    'ZZP Azure Cloud Engineering & Beheer — hands-on capaciteit, direct inzetbaar. Landing zones, security, FinOps en troubleshooting.',
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Dirks Cloud Engineering',
    description:
      'ZZP specialist voor Microsoft Azure — beheer, beveiliging en inrichting. Heldere communicatie en direct inzetbaar.',
    url: siteUrl,
    siteName: 'Dirks Cloud Engineering',
    locale: 'nl_NL',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#f8fafc',
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
              Dirks Cloud Engineering — Azure Cloud Engineering &amp; Beheer. Mail{' '}
              <a href="mailto:mdirks@dirkscloud.nl">mdirks@dirkscloud.nl</a>.
            </p>
          </div>
        </noscript>
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}

import type {Metadata} from 'next'
import './globals.css'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'
import WhatsAppButton from '@/components/shared/WhatsAppButton'

export const metadata: Metadata = {
  title: {
    default: 'SRF Bogotá — Grupo de Meditación Self-Realization Fellowship',
    template: '%s | SRF Bogotá',
  },
  description: 'Grupo de Meditación de Self-Realization Fellowship en Bogotá, Colombia. Enseñanzas de Paramahansa Yogananda, Kriya Yoga y meditación.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://yogananda-bogota.org'),
  openGraph: {
    type: 'website',
    locale: 'es_CO',
    siteName: 'SRF Bogotá',
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="es">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  )
}

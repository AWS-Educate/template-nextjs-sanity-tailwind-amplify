import type {Metadata} from 'next'
import './globals.css'
import Header from '@/components/shared/Header'
import Footer from '@/components/shared/Footer'

export const metadata: Metadata = {
  title: {
    default: '{{PROJECT_NAME}}',
    template: '%s | {{PROJECT_NAME}}',
  },
  description: '{{PROJECT_NAME}} — Built with Next.js, Sanity CMS, Tailwind CSS and AWS Amplify.',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://{{PROJECT_SLUG}}.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: '{{PROJECT_NAME}}',
  },
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}

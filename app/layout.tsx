import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://my-habit-tracker-orcin.vercel.app/'),
  title: 'Habit Tracker',
  description: 'Unlocking potential through habit tracking.',
  openGraph: {
    title: 'Habit Tracker',
    description: 'Unlocking potential through habit tracking.',
    url: 'https://my-habit-tracker-orcin.vercel.app/',
    siteName: 'Habit Tracker',
    images: [
      {
        url: 'https://nextjs.org/og.png',
        width: 800,
        height: 600,
      },
      {
        url: 'https://nextjs.org/og-alt.png',
        width: 1800,
        height: 1600,
        alt: 'My custom alt',
      },
    ],
    locale: 'en_NZ',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="cupcake">
      <body className={inter.className}>
        <NavBar />
        <main>{children}</main>
      </body>
    </html>
  )
}

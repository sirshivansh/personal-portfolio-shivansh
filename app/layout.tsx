import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://shivansh-mishra.vercel.app'),
  title: 'Shivansh Mishra — Java Developer & Computer Engineering Student',
  description:
    'Portfolio of Shivansh Mishra, a Java developer and computer engineering student specializing in backend development, Spring Boot, and building dependable software.',
  keywords: [
    'Shivansh Mishra',
    'Java Developer',
    'Computer Engineering',
    'Spring Boot',
    'Portfolio',
    'Backend Developer',
    'Software Developer',
  ],
  authors: [{ name: 'Shivansh Mishra' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Shivansh Mishra — Java Developer & Computer Engineering Student',
    description:
      'Portfolio of Shivansh Mishra — building dependable, thoughtful software with Java, Spring Boot, and modern backend technologies.',
    siteName: 'Shivansh Mishra Portfolio',
    images: [
      {
        url: '/shivansh-photo.jpg',
        width: 800,
        height: 600,
        alt: 'Shivansh Mishra — Java Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shivansh Mishra — Java Developer',
    description:
      'Portfolio of Shivansh Mishra — building dependable, thoughtful software.',
    images: ['/shivansh-photo.jpg'],
  },
  icons: {
    icon: [
      { url: '/icon.svg', type: 'image/svg+xml' },
      { url: '/icon-dark-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#ffffff',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="bg-white">
      <body className={`${inter.variable} ${jetbrains.variable} ${playfair.variable} antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

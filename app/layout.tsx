import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { headers } from 'next/headers'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans", // sesuaikan dengan kebutuhan
});

export const metadata: Metadata = {
  title: 'Masagi',
  description: 'Masagi - Your Trusted Partner in Coconut Products',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headersList = headers()
  const isAdminPage = headersList.get('x-is-admin') === 'true'

  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans`}>
        {!isAdminPage && <Navbar />}
        {children}
        {!isAdminPage && <Footer />}
      </body>
    </html>
  )
}
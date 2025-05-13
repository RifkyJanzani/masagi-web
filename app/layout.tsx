import './globals.css'
import { ReactNode } from 'react'
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plus-jakarta-sans", // sesuaikan dengan kebutuhan
});

export const metadata = {
  title: "Masagi",
  description: "Landing page Masagi",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={`${plusJakarta.variable} font-sans`}>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  )
}
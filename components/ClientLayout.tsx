'use client'

import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')
  const isLoginRoute = pathname === '/login'

  return (
    <>
      {!isAdminRoute && !isLoginRoute && <Navbar />}
      {children}
      {!isAdminRoute && !isLoginRoute && <Footer />}
    </>
  )
}
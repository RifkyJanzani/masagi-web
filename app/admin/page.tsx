'use client'

import Link from 'next/link'

export default function AdminPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/produk/tambah" 
          className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900">Tambah Produk</h2>
            <p className="mt-2 text-gray-600">Tambah produk baru ke katalog</p>
          </div>
        </Link>

        <Link href="/admin/produk" 
          className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900">Kelola Produk</h2>
            <p className="mt-2 text-gray-600">Lihat dan edit produk yang ada</p>
          </div>
        </Link>
      </div>
    </div>
  )
} 
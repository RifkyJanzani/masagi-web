'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function AdminPage() {

  const [loading, setLoading] = useState(true);
  const router = useRouter();
  

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/login'); // redirect kalau belum login
      } else {
        setLoading(false); // sudah login

        const userId = session.user.id;
        console.log('User ID:', userId);

        // Ambil role user dari tabel 'profiles'
        const { data: profile, error } = await supabase
          .from('users') // sesuaikan jika nama tabel berbeda
          .select('role')
          .eq('id', userId)
          .single();

        if (error) {
          console.error('Gagal mengambil data role:', error);
        } else {
          console.log('User role:', profile.role); // ✅ Ini yang kamu butuhkan
        }

      }
    };
    checkSession();
  }, [router]);

  if (loading) return <p className="p-10">Loading...</p>;

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
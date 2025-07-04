'use client';

import { useEffect, useState } from "react";
import { supabase } from '@/lib/supabase';
import { getCompanyProfile, CompanyProfile } from '@/lib/companyProfile';
import Link from 'next/link';

export default function HeroSection() {

  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getCompanyProfile();
      setCompanyProfile(profile);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  return (
    <section className="relative min-h-screen bg-[url('/img/hero.jpg')] bg-cover bg-center flex items-center justify-center px-4 pt-32 pb-20">
      {/* Overlay hijau transparan */}
      <div className="absolute inset-0 bg-green-900/30 z-0" />

      {/* Konten utama */}
      <div className="relative z-10 max-w-7xl w-full flex flex-col md:flex-row gap-8 justify-center items-stretch">

        {/* Box 1: Desiccated Coconut */}
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col justify-between w-full md:w-[280px] text-center">
          <img src="/img/line-art-coconut.png" alt="Line Art Coconut" className="w-14 h-14 mb-4 mx-auto" />
          <h3 className="text-green-800 text-xl font-bold mb-3">Desiccated Coconut</h3>
          <p className="text-gray-700 text-sm mb-6">
            Desiccated coconut adalah kelapa parut yang dikeringkan dan bebas dari air serta minyak. Produk ini banyak dimanfaatkan dalam industri makanan sebagai bahan tambahan pada kue, biskuit, cokelat, granola, dan makanan ringan karena memberikan aroma khas dan tekstur renyah. Selain itu, digunakan juga dalam industri kosmetik sebagai bahan alami pelembap dan eksfoliator.
          </p>
          <div className="flex flex-col gap-2 mt-auto">
            <Link href="/desiccated">
              <button className="bg-white text-green-700 border border-green-700 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-50 transition w-full">Detail</button>
            </Link>
            <a
              href="/produk?category=desiccated"
              className="bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-800 transition w-full text-center"
            >
              Beli
            </a>
          </div>
        </div>

        {/* Box 2: Mesin Manufaktur */}
        <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col justify-between w-full md:w-[280px] text-center">
          <img src="/img/line-art-mesin.png" alt="Line Art Mesin" className="w-14 h-14 mb-4 mx-auto" />
          <h3 className="text-green-800 text-xl font-bold mb-3">Mesin Manufaktur</h3>
          <p className="text-gray-700 text-sm mb-6">
            Perusahaan kami juga bergerak di bidang penyediaan solusi teknologi tepat guna, meliputi penjualan mesin pengolahan hasil pertanian dan perkebunan, mesin pengelolaan limbah organik dan anorganik, serta mesin konversi energi untuk menghasilkan sumber energi terbarukan. Kami berkomitmen mendukung produktivitas industri dan keberlanjutan lingkungan melalui inovasi teknologi.
          </p>
          <div className="flex flex-col gap-2 mt-auto">
            <Link href="/manufaktur">
              <button className="bg-white text-green-700 border border-green-700 px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-50 transition w-full">Detail</button>
            </Link>
            <a
              href="/produk?category=mesin"
              className="bg-green-700 text-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-green-800 transition w-full text-center"
            >
              Beli
            </a>
          </div>
        </div>

        {/* Box 3: Masagi Info */}
        <div className="bg-green-900/80 text-white p-6 rounded-2xl shadow-xl w-full md:w-[360px] flex flex-col justify-start text-left">
          <h2 className="text-4xl font-bold mb-4">Masagi</h2>
          <p className="text-sm leading-relaxed">
            {loading ? 'Loading...' : companyProfile?.about_us}
          </p>
        </div>
      </div>
    </section>
  );
}

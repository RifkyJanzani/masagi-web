// components/LandingPage.tsx
'use client'
import { useEffect, useState } from "react";
import HeroSection from "@/components/HeroSection2";
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { getCompanyProfile, CompanyProfile } from '@/lib/companyProfile';

interface Journal {
  id: number;
  title: string;
  university: string;
  p_issn: string;
  e_issn: string;
  cover: string;
  badges: { label: string; color: string }[];
  created_at: string;
}

export default function LandingPage() {
  const [journals, setJournals] = useState<Journal[]>([]);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const sectionId = window.location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch both journals and company profile
      const [journalsData, profileData] = await Promise.all([
        fetchJournals(),
        getCompanyProfile()
      ]);

      setJournals(journalsData);
      setCompanyProfile(profileData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchJournals = async (): Promise<Journal[]> => {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(3); // Ambil 3 jurnal terbaru

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching journals:', error);
      return [];
    }
  };

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <>
      <HeroSection />
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-0 py-0 bg-white text-center" id="beranda">
        {/* Tentang Kami Section */}
        <section id="tentangkami" className="w-full flex justify-center bg-green-200 py-16 px-2">
          <div className="bg-white rounded-[2rem] shadow-2xl p-8 md:p-12 max-w-2xl w-full text-center">
            <h2 className="text-green-900 text-4xl md:text-5xl font-bold mb-4">Tentang Kami</h2>
            <p className="text-gray-700 text-base md:text-lg">
              {companyProfile?.about_us}
            </p>
          </div>
        </section>

        {/* Produk dan Layanan */}
        <section id="produk" className="min-h-[50vh] px-4 py-16 text-center">
          <h2 className="text-4xl font-bold text-green-900 mb-4">Produk dan Layanan</h2>
          <p className="max-w-2xl mx-auto text-[#3F3F3F] mb-10">
            Temukan produk dan mesin kelapa berkualitas terbaik...
          </p>
          <div className="flex flex-wrap justify-center gap-8">
            {[
              {
                name: 'Desiccated Coconut A',
                image: '/img/dessicated.jpeg',
                desc: 'Kelapa parut kering kualitas premium.'
              },
              {
                name: 'Mesin Parut Kelapa',
                image: 'img/mesin.jpg',
                desc: 'Mesin efisien untuk memarut kelapa.'
              },
              {
                name: 'Mesin Pengering',
                image: 'img/mesin.jpg',
                desc: 'Pengering kelapa otomatis.'
              }
            ].map((product, i) => (
              <div key={i} className="bg-gray-100 rounded-2xl w-64 h-72 flex flex-col items-center justify-between p-4 shadow hover:shadow-md transition">
                <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded-xl mb-4" />
                <h3 className="font-bold text-lg text-green-900 mb-2">{product.name}</h3>
                <p className="text-gray-700 text-sm text-center">{product.desc}</p>
              </div>
            ))}
          </div>
          <a href="/produk" className="mt-4 inline-block text-sm text-green-900 font-semibold hover:underline transition-colors">Lihat lebih banyak...</a>
        </section>

        {/* Desiccated Coconut Section */}
        <section className="w-full py-16 bg-green-200">
          <div className="flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto p-0 md:p-4 gap-8 bg-transparent">
            <div className="flex-1 flex justify-center items-center">
              <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-end">
                <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Desiccated Coconut" className="w-full h-full object-cover rounded-2xl" />
                <span className="absolute bottom-4 left-4 bg-green-700 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">DESICCATED COCONUT</span>
              </div>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Desiccated Coconut</h3>
              <p className="text-gray-800 mb-8">
                Desiccated coconut adalah kelapa parut yang dikeringkan dan bebas dari air serta minyak...
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/desiccated">
                  <button className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-green-800 transition">Detail Lebih…</button>
                </Link>
                <Link href="/produk">
                  <button className="bg-white text-green-700 border border-green-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-green-50 transition">Beli Sekarang</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Manufaktur Mesin */}
        <section className="w-full py-16">
          <div className="flex flex-col md:flex-row-reverse items-center justify-between max-w-5xl mx-auto p-0 md:p-4 gap-8 bg-transparent">
            <div className="flex-1 flex justify-center items-center">
              <div className="relative w-64 h-64 md:w-72 md:h-72 flex items-end">
                <img src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80" alt="Manufaktur Mesin" className="w-full h-full object-cover rounded-2xl" />
                <span className="absolute bottom-4 left-4 bg-green-700 text-white px-4 py-1 rounded-full text-xs font-semibold shadow">DESICCATED COCONUT</span>
              </div>
            </div>
            <div className="flex-1 text-left">
              <h3 className="text-3xl md:text-4xl font-bold text-green-900 mb-4">Manufaktur Mesin</h3>
              <p className="text-gray-800 mb-8">
                Perusahaan kami juga bergerak di bidang penyediaan solusi teknologi tepat guna...
              </p>
              <div className="flex gap-4 flex-wrap">
                <Link href="/manufaktur">
                  <button className="bg-green-700 text-white px-6 py-2 rounded-full font-semibold shadow hover:bg-green-800 transition">Detail Lebih…</button>
                </Link>
                <Link href="/produk">
                  <button className="bg-white text-green-700 border border-green-700 px-6 py-2 rounded-full font-semibold shadow hover:bg-green-50 transition">Beli Sekarang</button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Jurnal Section */}
        <section className="w-full py-16 bg-green-200">
          <h2 className="text-4xl font-bold text-green-900 mb-10">Jurnal</h2>
          {loading ? (
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="w-52 h-72 bg-gray-300 rounded-2xl animate-pulse"></div>
              <div className="w-52 h-72 bg-gray-300 rounded-2xl animate-pulse"></div>
              <div className="w-52 h-72 bg-gray-300 rounded-2xl animate-pulse"></div>
            </div>
          ) : journals.length > 0 ? (
            <div className="flex justify-center gap-4 flex-wrap">
              {journals.map((journal) => (
                <div key={journal.id} className="w-52 h-72 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                  <div className="h-48 w-full relative">
                    {isValidImageUrl(journal.cover) ? (
                      <img 
                        src={journal.cover} 
                        alt={journal.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-green-900 mb-1 line-clamp-2">
                      {journal.title}
                    </h3>
                    <p className="text-xs text-gray-600 mb-2">
                      {journal.university}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="w-52 h-72 bg-gray-300 rounded-2xl flex items-center justify-center">
                <p className="text-gray-500 text-sm">Belum ada jurnal</p>
              </div>
            </div>
          )}
          <Link href="/jurnal" className="mt-4 inline-block text-sm text-green-900 font-semibold hover:underline transition-colors">
            Lihat lebih banyak...
          </Link>
        </section>
      </main>
    </>
  );
}

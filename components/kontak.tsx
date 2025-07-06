'use client'

import { useEffect, useState } from 'react'
import { getCompanyProfile, CompanyProfile } from '@/lib/companyProfile'

export default function Kontak() {
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompanyProfile();
  }, []);

  const fetchCompanyProfile = async () => {
    try {
      const profile = await getCompanyProfile();
      setCompanyProfile(profile);
    } catch (error) {
      console.error('Error fetching company profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-screen bg-[url('/img/hero.jpg')] bg-cover bg-center flex items-center justify-center px-4 pt-32 pb-20">
      {/* Overlay hijau transparan */}
      <div className="absolute inset-0 bg-green-900/30 z-0" />

      {/* Konten utama */}
      <div className="relative z-10 bg-white rounded-[2rem] shadow-2xl max-w-4xl w-full p-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-900 mb-10">Kontak</h2>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-sm md:text-base text-left items-center">
          {/* WhatsApp */}
          <div className="font-extrabold text-gray-700">WhatsApps</div>
          <div className="md:col-span-2 text-black">{companyProfile?.phone || '+62 812-1937-7033'}</div>
          <div className="md:col-span-2">
            <a
              href={`https://wa.me/${companyProfile?.phone?.replace(/[^0-9]/g, '') || '6281219377033'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold w-full md:w-auto inline-block text-center"
            >
              Hubungi
            </a>
          </div>

          {/* Email */}
          <div className="font-extrabold text-gray-700">Email</div>
          <div className="md:col-span-2 text-black">{companyProfile?.email}</div>
          <div className="md:col-span-2">
            <a
              href={`mailto:${companyProfile?.email || 'Masagienergihijau@gmail.com'}`}
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold w-full md:w-auto inline-block text-center"
            >
              Kirim Email
            </a>
          </div>

          {/* Website */}
          <div className="font-extrabold text-gray-700">Website Perusahaan</div>
          <div className="md:col-span-2 text-black">Masagi.com</div>
          <div className="md:col-span-2">
            <a
              href="/"
              className="bg-green-700 hover:bg-green-800 text-white px-4 py-1.5 rounded-full text-sm font-semibold w-full md:w-auto inline-block text-center"
            >
              Kunjungi
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

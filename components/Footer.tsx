'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getCompanyProfile, CompanyProfile } from '@/lib/companyProfile'

const Footer = () => {
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
    <footer className="bg-green-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">PT MASAGI Energi Hijau</h3>
            <p className="text-sm text-gray-300">
              Solusi energi terbarukan dan pengelolaan limbah yang ramah lingkungan.
            </p>
            <p className="text-sm text-gray-300">
              Tahun Berdiri: Desember 2024
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Tautan Cepat</h3>
            <ul className="space-y-2">
              {["Beranda", "Tentang Kami", "Produk", "Artikel", "Jurnal"].map((item, i) => (
                <li key={i}>
                  <Link 
                    href={`#${item.toLowerCase().replace(/\s/g, "")}`}
                    className="text-sm text-gray-300 hover:text-white transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Kontak</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <strong>Email:</strong> {companyProfile?.email || 'masagienergihijau@gmail.com'}
              </li>
              <li>
                <strong>Phone:</strong> {companyProfile?.phone || '+62 812 1937 7033'}
              </li>
              <li>
                <strong>Alamat:</strong> {companyProfile?.address || 'Jl. Raya Kelapa No. 123, Desa Kelapa Indah, Kecamatan Kelapa Sejahtera, Kabupaten Kelapa Makmur, Provinsi Kelapa Bahagia, 12345'}
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Media Sosial</h3>
            <div className="flex space-x-4">
              {companyProfile?.instagram_url ? (
                <a 
                  href={companyProfile.instagram_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Instagram
                </a>
              ) : (
                <span className="text-gray-500">Instagram</span>
              )}
              {companyProfile?.youtube_url ? (
                <a 
                  href={companyProfile.youtube_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Youtube
                </a>
              ) : (
                <span className="text-gray-500">Youtube</span>
              )}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-300">
          <p>&copy; {new Date().getFullYear()} PT MASAGI Energi Hijau. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

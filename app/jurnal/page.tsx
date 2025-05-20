import React from 'react';
import Container from '@/components/Container';

// Tipe data jurnal
interface Journal {
  cover: string;
  title: string;
  university: string;
  pIssn: string;
  eIssn: string;
  badges: { label: string; color: string }[];
}

const baseJournal: Journal = {
  cover: '/cover-jurnal.png', // Ganti dengan path gambar yang sesuai
  title: 'JURNAL TEKNOLOGI DAN MANAJEMEEN INDUSTRI TERAPAN',
  university: 'Universitas Pancasila Jakarta',
  pIssn: '1234-5678',
  eIssn: '1234-5678',
  badges: [
    { label: 'S1 Accredited', color: 'bg-yellow-200 text-yellow-800' },
    { label: 'Scopus Indexed', color: 'bg-orange-200 text-orange-800' },
    { label: 'Garuda Indexed', color: 'bg-red-200 text-red-800' },
  ],
};


const journals: Journal[] = Array.from({ length: 4 }, (_, i) => ({ ...baseJournal }));

export default function JurnalPage() {
  return (
    <main className="flex flex-col items-center min-h-screen px-2 pt-8 md:pt-32 bg-[#c3e2c1] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-[url('/img/bg.jpg')] bg-cover bg-center z-0" />

      {/* Overlay Gradient */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-black/50 to-[#c3e2c1] z-10" />
      <div className="relative z-20 flex flex-col items-center w-full px-4">
          <Container>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-green-900 mt-2 mb-0 md:mb-0">Jurnal</h1>
            <div className="flex items-center bg-[#f6f6f6] rounded-2xl shadow px-4 py-2 w-full md:w-auto">
              <input
                type="text"
                placeholder="Cari.................."
                className="flex-1 bg-transparent outline-none text-lg px-2 min-w-0"
              />
              <button className="bg-green-900 text-white rounded-xl px-8 py-2 font-semibold ml-2 hover:bg-green-700">Cari</button>
            </div>
          </div>
          {/* Journal Cards */}
          <div className="flex flex-col gap-8">
            {journals.map((journal, i) => (
              <div
                key={i}
                className="flex flex-row items-center bg-[#f6f6f6] rounded-2xl shadow px-4 py-4 gap-4"
              >
                {/* Cover */}
                <div className="flex-shrink-0">
                  <div className="bg-gray-200 rounded-xl w-28 h-36 flex items-center justify-center overflow-hidden">
                    {/* Gambar placeholder */}
                    <img src={journal.cover} alt="cover" className="object-cover w-full h-full" />
                  </div>
                </div>
                {/* Info */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="font-bold text-lg md:text-xl text-black leading-tight">
                    {journal.title}
                  </div>
                  <div className="text-blue-700 text-base font-medium">
                    {journal.university}
                  </div>
                  <div className="text-gray-500 text-xs">
                    P-ISSN: {journal.pIssn} | E-ISSN: {journal.eIssn}
                  </div>
                  <div className="flex flex-row gap-2 mt-1">
                    {journal.badges.map((badge, idx) => (
                      <span
                        key={idx}
                        className={`px-2 py-0.5 rounded text-xs font-semibold ${badge.color}`}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>
                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-2 ml-2">
                  <button className="bg-green-900 text-white rounded-xl px-8 py-2 font-semibold hover:bg-green-700">Detail</button>
                  <button className="border border-green-900 text-green-900 rounded-xl px-8 py-2 font-semibold bg-white hover:bg-green-100">Kunjungi</button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </div>
      
    </main>
  );
} 
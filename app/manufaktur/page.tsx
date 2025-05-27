import React from 'react';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';

export default function ManufakturPage() {
  return (
    <main className="relative flex flex-col items-center min-h-screen bg-[#c3e2c1] overflow-hidden">
      {/* Background Gambar Parallax */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-[url('/img/bg.jpg')] bg-cover bg-center z-0" />

      {/* Overlay Gradient */}
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-black/50 to-[#c3e2c1] z-10" />

      {/* Konten */}
      <div className="relative z-20 flex flex-col items-center w-full px-4">
        <Reveal>
          <h1 className="text-4xl md:text-9xl font-extrabold text-white text-center mt-20 md:mt-28 mb-6 leading-tight drop-shadow-lg">
            MANUFAKTUR<br />MESIN
          </h1>
        </Reveal>

        <Container>
          <Reveal delay={0.2}>
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-3xl h-64 bg-gray-300 rounded-2xl mb-8 shadow-xl scale-100 hover:scale-105 transition-transform duration-500" />

              <h2 className="text-2xl md:text-4xl font-semibold text-green-900 mb-4">
                Manufaktur Mesin
              </h2>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl px-2 md:px-0">
                Perusahaan kami juga bergerak di bidang penyediaan solusi teknologi tepat guna, 
                meliputi penjualan mesin pengolahan hasil pertanian dan perkebunan, mesin pengelolaan 
                limbah organik dan anorganik, serta mesin konversi energi untuk menghasilkan sumber energi 
                terbarukan. Kami berkomitmen mendukung produktivitas industri dan keberlanjutan lingkungan 
                melalui inovasi teknologi.
              </p>
            </div>
          </Reveal>
        </Container>
      </div>
    </main>
  );
}

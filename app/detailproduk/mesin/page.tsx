'use client'

import Image from 'next/image'

export default function DetailProduk() {
  return (
    <section className="relative min-h-screen bg-[#d8f0d2] overflow-hidden">
      {/* Background Gambar + Kotak Hijau Solid */}
      <div className="absolute top-0 left-0 w-full h-[500px] z-0">
        {/* Gambar */}
        <div className="absolute inset-0 bg-[url('/img/hero.jpg')] bg-cover bg-center" />

        {/* Kotak hijau solid */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 md:w-[100%] h-[100%] bg-green-900/30 shadow-md" />
      </div>

      {/* Konten Utama */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 pt-40 pb-20">
        {/* Judul Hero */}
        <h1 className="text-white text-center text-4xl md:text-5xl font-extrabold drop-shadow-xl mb-10">
          MANUFAKTUR <br className="md:hidden" /> MESIN
        </h1>

        {/* Box Putih utama */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-14">
          {/* Gambar pabrik */}
          <div className="rounded-2xl overflow-hidden mb-10">
            <Image
              src="/img/fotoMesin2.png"
              alt="Pabrik"
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </div>

          {/* Deskripsi Produk */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-green-900 text-2xl font-bold mb-4">
              Manufaktur Mesin
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Perusahaan kami juga bergerak di bidang penyediaan solusi teknologi tepat guna, meliputi penjualan mesin pengolahan hasil pertanian dan perkebunan, mesin pengelolaan limbah organik dan anorganik, serta mesin konversi energi untuk menghasilkan sumber energi terbarukan. Kami berkomitmen mendukung produktivitas industri dan keberlanjutan lingkungan melalui inovasi teknologi.
            </p>
          </div>

          {/* Jenis Mesin */}
          <div className="mt-14 ">
            <h3 className="text-center text-xl font-bold text-green-800 mb-6">Jenis Mesin yang Tersedia</h3>
            <div className="flex justify-center">
              {/* Card 1 */}
              <div className="relative bg-white rounded-[1.5rem] shadow-md w-[200px]">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#C7EAC0] rounded-[1.5rem] -z-10"></div>
                <div className="flex flex-col items-center p-4">
                  <Image src="/img/mesinpertanian.png" alt="Mesin Pertanian" width={200} height={200} className="mb-4" />
                  <div className="bg-green-800 text-white text-[11px] text-center font-bold py-2 px-3 rounded-b-[1rem] w-full">
                    Mesin pengolahan hasil pertanian & perkebunan
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="relative bg-white rounded-[1.5rem] shadow-md w-[200PX]">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#C7EAC0] rounded-[1.5rem] -z-10"></div>
                <div className="flex flex-col items-center p-4">
                  <Image src="/img/mesinorganik.png" alt="Mesin Organik" width={200} height={200} className="mb-4" />
                  <div className="bg-green-800 text-white text-[11px] text-center font-bold py-2 px-3 rounded-b-[1rem] w-full">
                    Mesin pengolahan limbah organik & anorganik
                  </div>
                </div>
              </div>

              {/* Card 3 */}
              <div className="relative bg-white rounded-[1.5rem] shadow-md w-[200PX]">
                <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#C7EAC0] rounded-[1.5rem] -z-10"></div>
                <div className="flex flex-col items-center p-4">
                  <Image src="/img/mesinenergi.png" alt="Mesin Energi" width={200} height={200} className="mb-4" />
                  <div className="bg-green-800 text-white text-[11px] text-center font-bold py-2 px-3 rounded-b-[1rem] w-full">
                    Mesin konversi energi untuk bahan terbarukan
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Toko */}
          <div className="mt-16">
            <h3 className="text-center text-4xl font-bold text-green-800 mb-6">Beli Sekarang Juga</h3>
            <div className="flex justify-center">
              <a
                href="/produk?category=mesin"
                className="bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition text-center"
              >
                Kunjungi Toko
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

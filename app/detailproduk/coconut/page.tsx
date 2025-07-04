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
          DESICCATED <br className="md:hidden" /> COCONUT
        </h1>

        {/* Box Putih utama */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-14">
          {/* Gambar pabrik */}
          <div className="rounded-2xl overflow-hidden mb-10">
            <Image
              src="/img/hero.jpg"
              alt="Pabrik"
              width={1200}
              height={600}
              className="w-full object-cover"
            />
          </div>

          {/* Deskripsi Produk */}
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-green-900 text-2xl font-bold mb-4">
              DESICCATED COCONUT
            </h2>
            <p className="text-gray-700 text-sm leading-relaxed">
              Desiccated coconut adalah kelapa parut yang dikeringkan dan bebas dari air serta minyak. Produk ini banyak dimanfaatkan dalam industri makanan sebagai bahan tambahan pada kue, biskuit, cokelat, granola, dan makanan ringan karena memberikan aroma khas dan tekstur renyah. Selain itu, digunakan juga dalam industri kosmetik sebagai bahan alami pelembap dan eksfoliator.
            </p>
          </div>

          {/* Manfaat */}
          <div className="mt-14">
            <h3 className="text-center text-xl font-bold text-green-800 mb-6">MANFAAT</h3>
            <div className="flex justify-center">
              
              {/* Manfaat Desiccated Coconut */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center">
                {/* 1. Tambahan Makanan */}
                <div className="relative bg-white rounded-[1.5rem] shadow-md w-[200px]">
                  <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#C7EAC0] rounded-[1.5rem] -z-10"></div>
                  <div className="flex flex-col items-center p-4">
                    <Image src="/img/klepon.jpg" alt="Makanan" width={120} height={120} className="mb-4 rounded-full" />
                    <div className="bg-green-800 text-white text-[11px] text-center font-bold py-2 px-3 rounded-b-[1rem] w-full">
                      Tambahan dalam makanan dan kue
                    </div>
                  </div>
                </div>

                {/* 2. Sumber Serat */}
                <div className="relative bg-white rounded-[1.5rem] shadow-md w-[200px]">
                  <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#C7EAC0] rounded-[1.5rem] -z-10"></div>
                  <div className="flex flex-col items-center p-4">
                    <Image src="/img/kelapaparut.jpg" alt="Serat" width={120} height={120} className="mb-4 rounded-full" />
                    <div className="bg-green-800 text-white text-[11px] text-center font-bold py-2 px-3 rounded-b-[1rem] w-full">
                      Sumber serat alami
                    </div>
                  </div>
                </div>

                {/* 3. Bahan Kosmetik */}
                <div className="relative bg-white rounded-[1.5rem] shadow-md w-[200px]">
                  <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#C7EAC0] rounded-[1.5rem] -z-10"></div>
                  <div className="flex flex-col items-center p-4">
                    <Image src="/img/kosmetik.jpg" alt="Kosmetik" width={120} height={120} className="mb-4 rounded-full" />
                    <div className="bg-green-800 text-white text-[11px] text-center font-bold py-2 px-3 rounded-b-[1rem] w-full">
                      Bahan alami dalam kosmetik
                    </div>
                  </div>
                </div>


                {/* 4. Pengganti Santan */}
                <div className="relative bg-white rounded-[1.5rem] shadow-md w-[200px]">
                  <div className="absolute -bottom-2 -right-2 w-full h-full bg-[#C7EAC0] rounded-[1.5rem] -z-10"></div>
                  <div className="flex flex-col items-center p-4">
                    <Image src="/img/santan.jpg" alt="Santan" width={120} height={120} className="mb-4 rounded-full" />
                    <div className="bg-green-800 text-white text-[11px] text-center font-bold py-2 px-3 rounded-b-[1rem] w-full">
                      Alternatif pengganti santan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Produk Terkait */}
          <br></br>
          <div className="mt-16">
            <h3 className="text-center text-4xl font-bold text-green-800 mb-6">Beli Sekarang Juga</h3>
            <div className="flex justify-center">
              <a
                href="/produk?category=desiccated"
                className="bg-green-700 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition text-center"
              >
                Kunjungi Toko
              </a>
            </div>
          </div>
          <br></br>
        </div>
      </div>
    </section>
  )
}

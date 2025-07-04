import React from 'react';
import Container from '@/components/Container';
import Reveal from '@/components/Reveal';
import { supabase } from '@/lib/supabase';
import Link from 'next/link';

async function getProducts(category?: string) {
  let query = supabase.from('products').select('*');
  
  if (category && category !== 'all') {
    query = query.eq('category', category);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Gagal ambil data:', error);
    return [];
  }

  return data || [];
}

export default async function DesiccatedPage({
  searchParams,
}: {
   searchParams: Promise<{ category?: string }>;
}) {
  const params = await searchParams;
  const products = await getProducts(params.category);
  const activeCategory = params.category || 'all';

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
            DESICATED<br />COCONUT
          </h1>
        </Reveal>

        <Container>
          <Reveal delay={0.2}>
            <div className="flex flex-col items-center text-center">
              <div className="w-full max-w-3xl h-64 bg-gray-300 rounded-2xl mb-8 shadow-xl scale-100 hover:scale-105 transition-transform duration-500" />

              <h2 className="text-2xl md:text-4xl font-semibold text-green-900 mb-4">
                Desiccated Coconut
              </h2>

              <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl px-2 md:px-0">
                Perusahaan kami juga bergerak di bidang penyediaan solusi teknologi tepat guna, 
                meliputi penjualan mesin pengolahan hasil pertanian dan perkebunan, mesin pengelolaan 
                limbah organik dan anorganik, serta mesin konversi energi untuk menghasilkan sumber energi 
                terbarukan. Kami berkomitmen mendukung produktivitas industri dan keberlanjutan lingkungan 
                melalui inovasi teknologi.
              </p>

              <h2 className="text-2xl md:text-4xl font-semibold text-green-900 mb-4">
               Beli Sekarang
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
            {products.map((product, i) => (
              <div
                key={product.id || i}
                className="bg-white border rounded-2xl shadow-md p-4 flex flex-col items-center justify-between"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
                <h3 className="font-semibold text-lg text-center text-gray-800">{product.name}</h3>
                <p className="text-green-900 font-bold text-center mb-4">
                  Rp. {product.price.toLocaleString('id-ID')}
                </p>
                <div className="flex gap-2">
                  <Link href={`/produk/${product.slug}`}>
                    <button className="bg-white border border-green-900 text-green-900 px-4 py-1 rounded-full text-sm hover:bg-green-50">
                      Detail
                    </button>
                  </Link>
                  <button className="bg-green-900 text-white px-4 py-1 rounded-full text-sm hover:bg-green-700">
                    Beli
                  </button>
                </div>
              </div>
            ))}
          </div>
              
            </div>
          </Reveal>
        </Container>
      </div>
    </main>
  );
}

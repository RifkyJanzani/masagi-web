import React from 'react';
import Link from 'next/link';
import Container from '@/components/Container';
import { supabase } from '@/lib/supabase';

const categories = [
  { label: 'Semua', value: 'all' },
  { label: 'Desiccated Coconut', value: 'desiccated' },
  { label: 'Mesin', value: 'mesin' },
];

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

export default async function ProdukPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const products = await getProducts(searchParams.category);
  const activeCategory = searchParams.category || 'all';

  return (
    <main className="flex flex-col items-center min-h-screen px-4 pt-24 md:pt-32 bg-[#e3f2e1]">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-[url('/img/bg.jpg')] bg-cover bg-center z-0" />
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-black/50 to-[#e3f2e1] z-10" />

      <div className="relative z-20 flex flex-col items-center w-full px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-8 mt-4 leading-tight drop-shadow-lg">PRODUK</h1>

        <div className="flex gap-3 mb-10 flex-wrap justify-center bg-white rounded-3xl shadow px-4 py-2">
          {categories.map((cat) => (
            <Link
              key={cat.value}
              href={`/produk?category=${cat.value}`}
              className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
                activeCategory === cat.value
                  ? 'bg-green-900 text-white'
                  : 'text-gray-800 hover:bg-green-100'
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>

        <Container>
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
        </Container>
      </div>
    </main>
  );
}

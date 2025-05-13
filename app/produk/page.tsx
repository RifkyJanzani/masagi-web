'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/Container';

const categories = [
  { label: 'Semua', value: 'all' },
  { label: 'Desiccated Coconut', value: 'desiccated' },
  { label: 'Mesin', value: 'mesin' },
];

const products = [
  {
    slug: 'desiccated-coconut-a',
    name: 'Desiccated Coconut A',
    image: 'https://via.placeholder.com/150',
    desc: 'Kelapa parut kering kualitas premium.',
    price: 12000000
  },
  {
    slug: 'desiccated-coconut-b',
    name: 'Desiccated Coconut B',
    image: 'https://via.placeholder.com/150',
    desc: 'Cocok untuk industri makanan.',
    price: 10000000
  },
  {
    slug: 'mesin-parut-kelapa',
    name: 'Mesin Parut Kelapa',
    image: 'https://via.placeholder.com/150',
    desc: 'Mesin efisien untuk memarut kelapa.',
    price: 15000000
  },
  {
    slug: 'mesin-pengering',
    name: 'Mesin Pengering',
    image: 'https://via.placeholder.com/150',
    desc: 'Pengering kelapa otomatis.',
    price: 20000000
  },
  {
    slug: 'desiccated-coconut-c',
    name: 'Desiccated Coconut C',
    image: 'https://via.placeholder.com/150',
    desc: 'Kelapa parut kering untuk ekspor.',
    price: 18000000
  },
  {
    slug: 'mesin-pemarut-mini',
    name: 'Mesin Pemarut Mini',
    image: 'https://via.placeholder.com/150',
    desc: 'Ukuran kecil, cocok untuk UMKM.',
    price: 8000000
  },
  {
    slug: 'desiccated-coconut-d',
    name: 'Desiccated Coconut D',
    image: 'https://via.placeholder.com/150',
    desc: 'Varian ekonomis, tetap berkualitas.',
    price: 9000000
  },
  {
    slug: 'mesin-industri',
    name: 'Mesin Industri',
    image: 'https://via.placeholder.com/150',
    desc: 'Mesin kapasitas besar untuk pabrik.',
    price: 25000000
  },
  {
    slug: 'desiccated-coconut-e',
    name: 'Desiccated Coconut E',
    image: 'https://via.placeholder.com/150',
    desc: 'Pilihan terbaik untuk bakery.',
    price: 11000000
  },
];

export default function ProdukPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p =>
        (activeCategory === 'desiccated' && p.name.toLowerCase().includes('desiccated')) ||
        (activeCategory === 'mesin' && p.name.toLowerCase().includes('mesin'))
      );

  return (
    <main className="flex flex-col items-center min-h-screen px-4 pt-24 md:pt-32 bg-[#e3f2e1]">
      <h1 className="text-5xl md:text-6xl font-bold text-green-900 text-center mb-8 mt-4">PRODUK</h1>
      <div className="flex gap-3 mb-10 flex-wrap justify-center bg-white rounded-3xl shadow px-4 py-2">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={`px-4 py-1 rounded-full text-sm font-semibold transition-colors duration-200 ${
              activeCategory === cat.value
                ? 'bg-green-500 text-white'
                : 'text-gray-800 hover:bg-green-100'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {filteredProducts.map((product, i) => (
          <div
            key={i}
            className="bg-white border rounded-2xl shadow-md p-4 flex flex-col items-center justify-between"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="font-semibold text-lg text-center text-gray-800">{product.name}</h3>
            <p className="text-green-700 font-bold text-center mb-4">
              Rp. {product.price.toLocaleString('id-ID')}
            </p>
            <div className="flex gap-2">
              <Link href={`/produk/${product.slug}`}>
                <button className="bg-white border border-green-600 text-green-600 px-4 py-1 rounded-full text-sm hover:bg-green-50">
                  Detail
                </button>
              </Link>
              <button className="bg-green-600 text-white px-4 py-1 rounded-full text-sm hover:bg-green-700">
                Beli
              </button>
            </div>
          </div>
        ))}
      </div>
      </Container>
      
    </main>
  );
} 
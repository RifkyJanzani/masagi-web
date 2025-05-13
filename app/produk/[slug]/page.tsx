'use client'

import { useParams } from 'next/navigation';
import Link from 'next/link';

const products = [
  {
    slug: 'desiccated-coconut-a',
    name: 'Desiccated Coconut A',
    image: 'https://via.placeholder.com/300',
    desc: 'Kelapa parut kering kualitas premium.'
  },
  {
    slug: 'desiccated-coconut-b',
    name: 'Desiccated Coconut B',
    image: 'https://via.placeholder.com/300',
    desc: 'Cocok untuk industri makanan.'
  },
  {
    slug: 'mesin-parut-kelapa',
    name: 'Mesin Parut Kelapa',
    image: 'https://via.placeholder.com/300',
    desc: 'Mesin efisien untuk memarut kelapa.'
  },
  {
    slug: 'mesin-pengering',
    name: 'Mesin Pengering',
    image: 'https://via.placeholder.com/300',
    desc: 'Pengering kelapa otomatis.'
  },
  {
    slug: 'desiccated-coconut-c',
    name: 'Desiccated Coconut C',
    image: 'https://via.placeholder.com/300',
    desc: 'Kelapa parut kering untuk ekspor.'
  },
  {
    slug: 'mesin-pemarut-mini',
    name: 'Mesin Pemarut Mini',
    image: 'https://via.placeholder.com/300',
    desc: 'Ukuran kecil, cocok untuk UMKM.'
  },
  {
    slug: 'desiccated-coconut-d',
    name: 'Desiccated Coconut D',
    image: 'https://via.placeholder.com/300',
    desc: 'Varian ekonomis, tetap berkualitas.'
  },
  {
    slug: 'mesin-industri',
    name: 'Mesin Industri',
    image: 'https://via.placeholder.com/300',
    desc: 'Mesin kapasitas besar untuk pabrik.'
  },
  {
    slug: 'desiccated-coconut-e',
    name: 'Desiccated Coconut E',
    image: 'https://via.placeholder.com/300',
    desc: 'Pilihan terbaik untuk bakery.'
  },
];

export default function ProductDetail() {
  const params = useParams();
  const slug = params?.slug;
  const product = products.find(p => p.slug === slug);

  if (!product) {
    return (
      <main className="flex flex-col items-center min-h-screen px-4 pt-24 md:pt-32 bg-white">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Produk tidak ditemukan</h1>
        <Link href="/produk" className="text-green-900 hover:underline">Kembali ke Daftar Produk</Link>
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center min-h-screen px-4 pt-24 md:pt-32 bg-white">
      <div className="max-w-xl w-full bg-gray-100 rounded-2xl shadow p-8 flex flex-col items-center">
        <img src={product.image} alt={product.name} className="w-48 h-48 object-cover rounded-xl mb-6" />
        <h1 className="text-3xl font-bold text-green-900 mb-4 text-center">{product.name}</h1>
        <p className="text-gray-700 text-base text-center mb-8">{product.desc}</p>
        <Link href="/produk" className="text-green-900 font-semibold hover:underline">&larr; Kembali ke Daftar Produk</Link>
      </div>
    </main>
  );
} 
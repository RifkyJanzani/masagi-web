'use client'
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import Container from '@/components/Container';

const product = {
  name: 'Mesin Pengolah Hasil Pertanian',
  price: 12000000,
  importStatus: 'Tersedia',
  stock: 43,
  description: `Desiccated coconut adalah kelapa parut yang dikeringkan dan bebas dari air serta minyak. Produk ini banyak dimanfaatkan dalam industri makanan sebagai bahan tambahan pada kue, biskuit, cokelat, granola, dan makanan ringan karena memberikan aroma khas dan tekstur renyah. Selain itu, digunakan juga dalam industri kosmetik sebagai ...`,
  images: [
    '/images/produk1.jpg',
    '/images/produk1.jpg',
    '/images/produk1.jpg',
    '/images/produk1.jpg',
    '/images/produk1.jpg'
  ]
};

const recommendedProducts = [
  {
    name: 'Mesin Pengolah Hasil Pertanian',
    price: 12000000,
    image: '/images/produk1.jpg',
    slug: 'mesin-pengolah-1',
  },
  {
    name: 'Mesin Pengolah Hasil Pertanian',
    price: 12000000,
    image: '/images/produk2.jpg',
    slug: 'mesin-pengolah-2',
  },
  {
    name: 'Mesin Pengolah Hasil Pertanian',
    price: 12000000,
    image: '/images/produk3.jpg',
    slug: 'mesin-pengolah-3',
  },
];

export default function ProductDetailPage() {
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  return (
    <main className="min-h-screen px-4 pt-8 md:pt-32 bg-[#e3f2e1] pb-12">
      <Container>
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Left: Image + Gallery */}
          <div className="flex-1 w-full">
            <div className="rounded-xl overflow-hidden border shadow-md">
              <Image
                src={selectedImage}
                alt={product.name}
                width={600}
                height={400}
                className="w-full object-cover"
              />
            </div>
            <div className="flex gap-2 mt-4 justify-center">
              {product.images.map((img, idx) => (
                <button key={idx} onClick={() => setSelectedImage(img)}>
                  <Image
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    width={70}
                    height={70}
                    className={`rounded-lg border ${
                      selectedImage === img ? 'border-green-900' : 'border-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Detail Info */}
          <div className="flex-1 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-green-900 mb-2">{product.name}</h2>
            <p className="text-green-900 text-xl font-semibold mb-4">
              Rp. {product.price.toLocaleString('id-ID')}
            </p>

            <div className="border-t border-b py-4 mb-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Import</span>
                <span className="text-green-900">{product.importStatus}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Stok</span>
                <span>{product.stock}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-2">{product.description.slice(0, 220)}...</p>
            <Link href="#" className="text-blue-600 underline text-sm">
              Lihat Selengkapnya....
            </Link>

            <div className="mt-6">
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-900 text-white px-6 py-2 rounded-full text-center hover:bg-green-700 block w-full text-sm font-semibold"
              >
                Hubungi Whatsapp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 w-full max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">Rekomendasi</h2>
          <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
            {recommendedProducts.map((product, i) => (
              <div
                key={i}
                className="min-w-[250px] bg-white rounded-3xl shadow-md p-4 flex flex-col items-center"
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
                <div className="flex gap-2 w-full">
                  <Link href={`/produk/${product.slug}`}>
                    <button className="w-full bg-green-900 text-white px-4 py-1 rounded-full text-sm hover:bg-green-700">
                      Detail
                    </button>
                  </Link>
                  <button className="w-full border border-green-900 text-green-900 px-4 py-1 rounded-full text-sm hover:bg-green-50">
                    Beli
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}

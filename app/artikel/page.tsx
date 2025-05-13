import React from 'react';

const articles = [
  {
    title: 'Manfaat Desiccated Coconut untuk Industri Makanan',
    image: 'https://via.placeholder.com/150',
    desc: 'Desiccated coconut banyak digunakan sebagai bahan baku makanan ringan dan bakery.'
  },
  {
    title: 'Tips Memilih Mesin Parut Kelapa',
    image: 'https://via.placeholder.com/150',
    desc: 'Pilih mesin parut kelapa yang efisien dan mudah dibersihkan untuk usaha Anda.'
  },
  {
    title: 'Peluang Ekspor Produk Kelapa',
    image: 'https://via.placeholder.com/150',
    desc: 'Produk kelapa Indonesia sangat diminati pasar internasional.'
  },
  {
    title: 'Inovasi Mesin Pengering Kelapa',
    image: 'https://via.placeholder.com/150',
    desc: 'Teknologi pengering terbaru untuk hasil kelapa yang lebih maksimal.'
  },
  {
    title: 'Strategi Pemasaran Produk Kelapa',
    image: 'https://via.placeholder.com/150',
    desc: 'Tips sukses memasarkan produk kelapa di era digital.'
  },
  {
    title: 'Keunggulan Mesin Industri Modern',
    image: 'https://via.placeholder.com/150',
    desc: 'Mesin modern meningkatkan efisiensi produksi kelapa.'
  },
];

export default function ArtikelPage() {
  return (
    <main className="flex flex-col items-center min-h-screen px-4 pt-24 md:pt-32 bg-white">
      <h1 className="text-5xl md:text-6xl font-bold text-green-900 text-center mb-8 mt-4">Artikel</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {articles.map((artikel, i) => (
          <div
            key={i}
            className="bg-gray-100 rounded-2xl flex flex-col items-center justify-between p-4 shadow hover:shadow-md transition"
          >
            <img src={artikel.image} alt={artikel.title} className="w-20 h-20 object-cover rounded-xl mb-4" />
            <h3 className="font-bold text-lg text-green-900 mb-2">{artikel.title}</h3>
            <p className="text-gray-700 text-sm text-center">{artikel.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
} 
'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import Container from '@/components/Container';

export default function TambahProdukPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    price: '',
    image: '',
    desc: '',
    category: '',
    slug: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.from('products').insert([
      {
        name: form.name,
        price: Number(form.price),
        image: form.image,
        desc: form.desc,
        category: form.category.toLowerCase(),
        slug: form.slug.toLowerCase().replace(/\s+/g, '-'),
      },
    ]);

    setLoading(false);

    if (error) {
      alert('Gagal menambahkan produk: ' + error.message);
    } else {
      alert('Produk berhasil ditambahkan!');
      router.push('/produk'); // arahkan ke halaman produk utama
    }
  };

  return (
    <main className="min-h-screen px-4 pt-24 pb-12 bg-white">
      <Container>
        <h1 className="text-3xl font-bold text-green-900 mb-6 text-center">Tambah Produk</h1>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Nama Produk"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="price"
            placeholder="Harga"
            value={form.price}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="image"
            placeholder="Link Gambar"
            value={form.image}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <textarea
            name="desc"
            placeholder="Deskripsi"
            value={form.desc}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          ></textarea>
          <input
            type="text"
            name="category"
            placeholder="Kategori"
            value={form.category}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="slug"
            placeholder="Slug (otomatis jadi-url-friendly)"
            value={form.slug}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-900 text-white py-2 rounded hover:bg-green-700"
          >
            {loading ? 'Menyimpan...' : 'Simpan Produk'}
          </button>
        </form>
      </Container>
    </main>
  );
}

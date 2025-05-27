'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from '@/components/Container';
import { supabase } from '@/lib/supabase';
import ImageUpload from '@/components/ImageUpload';

export default function TambahProdukPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'desiccated',
    image: '',
    stock: '',
    unit: 'kg',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('products').insert([
        {
          name: formData.name,
          description: formData.description,
          price: parseFloat(formData.price),
          category: formData.category,
          image: formData.image,
          stock: parseInt(formData.stock),
          unit: formData.unit,
          slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        },
      ]);

      if (error) throw error;

      router.push('/produk');
      router.refresh();
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <main className="flex flex-col items-center min-h-screen px-4 pt-24 md:pt-32 bg-[#e3f2e1]">
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-[url('/img/bg.jpg')] bg-cover bg-center z-0" />
      <div className="absolute top-0 left-0 w-full h-[60vh] bg-gradient-to-b from-black/50 to-[#e3f2e1] z-10" />

      <div className="relative z-20 flex flex-col items-center w-full px-4">
        <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-8 mt-4 leading-tight drop-shadow-lg">TAMBAH PRODUK</h1>

        <Container>
          <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gambar Produk
              </label>
              <ImageUpload
                onImageUploaded={(url) => setFormData(prev => ({ ...prev, image: url }))}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nama Produk
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harga (Rp)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kategori
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="desiccated">Desiccated Coconut</option>
                  <option value="mesin">Mesin</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stok
                </label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Satuan
                </label>
                <select
                  name="unit"
                  value={formData.unit}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="kg">Kilogram (kg)</option>
                  <option value="unit">Unit</option>
                </select>
              </div>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Spesifikasi
              </label>
              <textarea
                name="specifications"
                value={formData.specifications}
                onChange={handleChange}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan spesifikasi produk (opsional)"
              />
            </div> */}

            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Batal
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Menyimpan...' : 'Simpan'}
              </button>
            </div>
          </form>
        </Container>
      </div>
    </main>
  );
}

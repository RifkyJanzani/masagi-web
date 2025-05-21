'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/Container';
import { supabase } from '@/lib/supabase';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [recommended, setRecommended] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('slug', slug)
        .single();

      if (!error && data) {
        setProduct(data);
        setSelectedImage(data.image);
        fetchRecommended(data.category, data.id);
      }

      setLoading(false);
    }

    async function fetchRecommended(category: string, currentId: number) {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('category', category)
        .neq('id', currentId)
        .limit(5); // ambil max 5 produk serupa

      if (!error && data) {
        setRecommended(data);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) return <div className="text-center mt-32">Memuat produk...</div>;
  if (!product) return <div className="text-center mt-32">Produk tidak ditemukan.</div>;

  return (
    <main className="min-h-screen px-4 pt-8 md:pt-32 bg-[#e3f2e1] pb-12">
      <Container>
        <div className="flex flex-col md:flex-row items-start gap-10">
          {/* Left: Image */}
          <div className="flex-1 w-full">
            <div className="rounded-xl overflow-hidden border shadow-md">
              {/* <Image
                src={selectedImage || product.image}
                alt={product.name}
                width={600}
                height={400}
                className="w-full object-cover"
              /> */}
            </div>
          </div>

          {/* Right: Info */}
          <div className="flex-1 w-full max-w-lg">
            <h2 className="text-2xl font-bold text-green-900 mb-2">{product.name}</h2>
            <p className="text-green-900 text-xl font-semibold mb-4">
              Rp. {product.price.toLocaleString('id-ID')}
            </p>

            <div className="border-t border-b py-4 mb-4 space-y-2 text-sm text-gray-700">
              <div className="flex justify-between">
                <span className="text-gray-500">Kategori</span>
                <span className="text-green-900">{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Slug</span>
                <span>{product.slug}</span>
              </div>
            </div>

            <p className="text-gray-700 mb-2">{product.desc}</p>

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

        {/* Rekomendasi */}
        {recommended.length > 0 && (
          <div className="mt-12 w-full max-w-6xl px-4">
            <h2 className="text-3xl font-bold text-green-900 mb-6 text-center">
              Rekomendasi Produk Serupa
            </h2>
            <div className="flex space-x-6 overflow-x-auto pb-4 scrollbar-hide">
              {recommended.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[250px] bg-white rounded-3xl shadow-md p-4 flex flex-col items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-xl mb-4"
                  />
                  <h3 className="font-semibold text-lg text-center text-gray-800">{item.name}</h3>
                  <p className="text-green-900 font-bold text-center mb-4">
                    Rp. {item.price.toLocaleString('id-ID')}
                  </p>
                  <div className="flex gap-2 w-full">
                    <Link href={`/produk/${item.slug}`}>
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
        )}
      </Container>
    </main>
  );
}

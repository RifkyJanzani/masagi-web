import Container from '@/components/Container';
import { supabase } from '@/lib/supabase';
import ProductDetailClient from './ProductDetailClient';

async function getProduct(slug: string) {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) return null;
  return data;
}

async function getRecommendedProducts(category: string, currentId: number) {
  const { data } = await supabase
    .from('products')
    .select('*')
    .eq('category', category)
    .neq('id', currentId)
    .limit(5);

  return data || [];
}

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug);
  if (!product) return <div className="text-center mt-32">Produk tidak ditemukan.</div>;

  const recommended = await getRecommendedProducts(product.category, product.id);

  return (
    <ProductDetailClient product={product} recommended={recommended} />
  );
}

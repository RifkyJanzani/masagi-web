'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import ImageUpload from '@/components/ImageUpload';

const badgeOptions = [
  { label: 'S1 Accredited', color: 'bg-yellow-200 text-yellow-800' },
  { label: 'Garuda Indexed', color: 'bg-red-200 text-red-800' },
  { label: 'Sinta Indexed', color: 'bg-blue-200 text-blue-800' },
  { label: 'Scopus Indexed', color: 'bg-green-200 text-green-800' },
];

export default function TambahJurnalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    university: '',
    p_issn: '',
    e_issn: '',
    cover: '',
    badges: [] as { label: string; color: string }[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('journals').insert([
        {
          title: formData.title,
          university: formData.university,
          p_issn: formData.p_issn,
          e_issn: formData.e_issn,
          cover: formData.cover,
          badges: formData.badges,
        },
      ]);

      if (error) throw error;

      router.push('/admin/jurnal');
      router.refresh();
    } catch (error) {
      alert('Error: ' + (error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const toggleBadge = (badge: { label: string; color: string }) => {
    const isSelected = formData.badges.some(b => b.label === badge.label);
    if (isSelected) {
      setFormData(prev => ({
        ...prev,
        badges: prev.badges.filter(b => b.label !== badge.label)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        badges: [...prev.badges, badge]
      }));
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Tambah Jurnal Baru</h1>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cover Jurnal
            </label>
            <ImageUpload
              currentImage={formData.cover}
              onImageUploaded={(url) => setFormData(prev => ({ ...prev, cover: url }))}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Judul Jurnal
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Universitas
            </label>
            <input
              type="text"
              name="university"
              value={formData.university}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                P-ISSN
              </label>
              <input
                type="text"
                name="p_issn"
                value={formData.p_issn}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-ISSN
              </label>
              <input
                type="text"
                name="e_issn"
                value={formData.e_issn}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Badges
            </label>
            <div className="flex flex-wrap gap-2">
              {badgeOptions.map((badge) => (
                <button
                  key={badge.label}
                  type="button"
                  onClick={() => toggleBadge(badge)}
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    formData.badges.some(b => b.label === badge.label)
                      ? badge.color
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {badge.label}
                </button>
              ))}
            </div>
            {formData.badges.length > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                Badges yang dipilih: {formData.badges.map(b => b.label).join(', ')}
              </div>
            )}
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-800 rounded-lg text-gray-700 hover:bg-gray-50"
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
      </div>
    </div>
  )
} 
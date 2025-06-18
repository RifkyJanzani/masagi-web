'use client'

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import Modal from '@/components/Modal';

interface CompanyProfile {
  id: number;
  about_us: string;
  email: string;
  phone: string;
  address: string;
  instagram_url: string;
  youtube_url: string;
  created_at: string;
  updated_at: string;
}

export default function ProfilPage() {
  const [profile, setProfile] = useState<CompanyProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info'
  });

  const [formData, setFormData] = useState({
    about_us: '',
    email: '',
    phone: '',
    address: '',
    instagram_url: '',
    youtube_url: ''
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const showMessage = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setModalConfig({ title, message, type });
    setShowModal(true);
  };

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('company_profile')
        .select('*')
        .single();

      if (error) throw error;

      if (data) {
        setProfile(data);
        setFormData({
          about_us: data.about_us,
          email: data.email,
          phone: data.phone,
          address: data.address,
          instagram_url: data.instagram_url || '',
          youtube_url: data.youtube_url || ''
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      showMessage('Error', 'Gagal mengambil data profil perusahaan', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      let result;
      
      if (profile) {
        // Update existing profile
        result = await supabase
          .from('company_profile')
          .update(formData)
          .eq('id', profile.id);
      } else {
        // Create new profile
        result = await supabase
          .from('company_profile')
          .insert([formData]);
      }

      if (result.error) throw result.error;

      showMessage('Berhasil', 'Profil perusahaan berhasil diperbarui', 'success');
      
      // Refresh data
      await fetchProfile();
    } catch (error) {
      console.error('Error saving profile:', error);
      showMessage('Error', 'Gagal menyimpan profil perusahaan', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-900"></div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Profil Perusahaan</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* About Us Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Tentang Kami</h2>
            <div>
              <label htmlFor="about_us" className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi Perusahaan
              </label>
              <textarea
                id="about_us"
                name="about_us"
                value={formData.about_us}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan deskripsi tentang perusahaan..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Teks ini akan ditampilkan di section "Tentang Kami" di landing page.
              </p>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Informasi Kontak</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="info@perusahaan.com"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Email yang ditampilkan di footer website.
                </p>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="+62 812-3456-7890"
                  required
                />
                <p className="text-sm text-gray-500 mt-1">
                  Nomor telepon yang ditampilkan di footer website.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                Alamat
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Masukkan alamat lengkap perusahaan..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Alamat yang ditampilkan di footer website.
              </p>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Media Sosial</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="instagram_url" className="block text-sm font-medium text-gray-700 mb-2">
                  Link Instagram
                </label>
                <input
                  type="url"
                  id="instagram_url"
                  name="instagram_url"
                  value={formData.instagram_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://instagram.com/username"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Link Instagram perusahaan (opsional).
                </p>
              </div>

              <div>
                <label htmlFor="youtube_url" className="block text-sm font-medium text-gray-700 mb-2">
                  Link YouTube
                </label>
                <input
                  type="url"
                  id="youtube_url"
                  name="youtube_url"
                  value={formData.youtube_url}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="https://youtube.com/@channel"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Link YouTube perusahaan (opsional).
                </p>
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Preview</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Tentang Kami (Landing Page):</h3>
                <div className="bg-white p-4 rounded border">
                  <p className="text-gray-700 text-sm">{formData.about_us || 'Belum ada deskripsi'}</p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Footer Information:</h3>
                <div className="bg-white p-4 rounded border space-y-2">
                  <p className="text-gray-700 text-sm"><strong>Email:</strong> {formData.email || 'Belum diisi'}</p>
                  <p className="text-gray-700 text-sm"><strong>Phone:</strong> {formData.phone || 'Belum diisi'}</p>
                  <p className="text-gray-700 text-sm"><strong>Address:</strong> {formData.address || 'Belum diisi'}</p>
                  {formData.instagram_url && (
                    <p className="text-gray-700 text-sm"><strong>Instagram:</strong> {formData.instagram_url}</p>
                  )}
                  {formData.youtube_url && (
                    <p className="text-gray-700 text-sm"><strong>YouTube:</strong> {formData.youtube_url}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 font-semibold"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>

      {/* Modal for messages */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={modalConfig.title}
        type={modalConfig.type}
      >
        {modalConfig.message}
      </Modal>
    </>
  );
} 
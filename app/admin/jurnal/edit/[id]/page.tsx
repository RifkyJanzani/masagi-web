'use client'

import { useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Modal from '@/components/Modal'
import ImageUpload from '@/components/ImageUpload'

interface Journal {
  id: number
  title: string
  university: string
  p_issn: string
  e_issn: string
  cover: string
  badges: { label: string; color: string }[]
}

const badgeOptions = [
  { label: 'S1 Accredited', color: 'bg-yellow-200 text-yellow-800' },
  { label: 'Garuda Indexed', color: 'bg-red-200 text-red-800' },
  { label: 'Sinta Indexed', color: 'bg-blue-200 text-blue-800' },
  { label: 'Scopus Indexed', color: 'bg-green-200 text-green-800' },
];

export default function EditJurnalPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [journal, setJournal] = useState<Journal | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info'
  })
  const [formData, setFormData] = useState({
    title: '',
    university: '',
    p_issn: '',
    e_issn: '',
    cover: '',
    badges: [] as { label: string; color: string }[]
  })

  // Unwrap params using React.use()
  const resolvedParams = use(params)

  useEffect(() => {
    fetchJournal()
  }, [])

  const showMessage = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setModalConfig({ title, message, type })
    setShowModal(true)
  }

  const fetchJournal = async () => {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()

      if (error) throw error

      if (data) {
        setJournal(data)
        setFormData({
          title: data.title,
          university: data.university,
          p_issn: data.p_issn,
          e_issn: data.e_issn,
          cover: data.cover,
          badges: data.badges || []
        })
      }
    } catch (error) {
      console.error('Error fetching journal:', error)
      showMessage('Error', 'Gagal mengambil data jurnal', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('journals')
        .update({
          title: formData.title,
          university: formData.university,
          p_issn: formData.p_issn,
          e_issn: formData.e_issn,
          cover: formData.cover,
          badges: formData.badges
        })
        .eq('id', resolvedParams.id)

      if (error) throw error

      showMessage('Berhasil', 'Jurnal berhasil diperbarui', 'success')
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin/jurnal')
      }, 1500)
    } catch (error) {
      console.error('Error updating journal:', error)
      showMessage('Error', 'Gagal memperbarui jurnal', 'error')
    } finally {
      setSaving(false)
    }
  }

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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-900"></div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Edit Jurnal</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="cover" className="block text-sm font-medium text-gray-700">
              Cover Jurnal
            </label>
            <div className="mt-1">
              <ImageUpload
                currentImage={formData.cover}
                onImageUploaded={(url) => setFormData({ ...formData, cover: url })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Judul Jurnal
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="university" className="block text-sm font-medium text-gray-700">
              Universitas
            </label>
            <input
              type="text"
              id="university"
              value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="p_issn" className="block text-sm font-medium text-gray-700">
                P-ISSN
              </label>
              <input
                type="text"
                id="p_issn"
                value={formData.p_issn}
                onChange={(e) => setFormData({ ...formData, p_issn: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label htmlFor="e_issn" className="block text-sm font-medium text-gray-700">
                E-ISSN
              </label>
              <input
                type="text"
                id="e_issn"
                value={formData.e_issn}
                onChange={(e) => setFormData({ ...formData, e_issn: e.target.value })}
                className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
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

          <div className="flex justify-end gap-4 pt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
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
  )
} 
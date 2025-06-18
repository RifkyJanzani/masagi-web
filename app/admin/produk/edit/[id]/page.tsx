'use client'

import { useEffect, useState, use } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Modal from '@/components/Modal'

interface Product {
  id: number
  name: string
  price: number
  category: string
  stock: number
  image: string
  unit: string
}

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [product, setProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info'
  })
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    stock: '',
    unit: '',
    image: ''
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Unwrap params using React.use()
  const resolvedParams = use(params)

  useEffect(() => {
    fetchProduct()
  }, [])

  const showMessage = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setModalConfig({ title, message, type })
    setShowModal(true)
  }

  const fetchProduct = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()

      if (error) throw error

      if (data) {
        setProduct(data)
        setFormData({
          name: data.name,
          price: data.price.toString(),
          category: data.category,
          stock: data.stock.toString(),
          unit: data.unit,
          image: data.image
        })
        setImagePreview(data.image)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
      showMessage('Error', 'Gagal mengambil data produk', 'error')
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true)
      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = e.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      // Upload image
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath)

      // Delete old image if exists
      if (formData.image) {
        const oldImagePath = formData.image.split('/').pop()
        if (oldImagePath) {
          await supabase.storage
            .from('products')
            .remove([oldImagePath])
        }
      }

      setFormData(prev => ({ ...prev, image: publicUrl }))
      setImagePreview(publicUrl)
    } catch (error) {
      console.error('Error uploading image:', error)
      showMessage('Error', 'Gagal mengupload gambar', 'error')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: formData.name,
          price: parseInt(formData.price),
          category: formData.category,
          stock: parseInt(formData.stock),
          unit: formData.unit,
          image: formData.image
        })
        .eq('id', resolvedParams.id)

      if (error) throw error

      showMessage('Berhasil', 'Produk berhasil diperbarui', 'success')
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/admin/produk')
      }, 1500)
    } catch (error) {
      console.error('Error updating product:', error)
      showMessage('Error', 'Gagal memperbarui produk', 'error')
    } finally {
      setSaving(false)
    }
  }

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
          <h1 className="text-3xl font-bold text-gray-900">Edit Produk</h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Nama Produk
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">
              Harga
            </label>
            <input
              type="number"
              id="price"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Kategori
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            >
              <option value="">Pilih Kategori</option>
              <option value="desiccated">Desiccated Coconut</option>
              <option value="mesin">Mesin</option>
            </select>
          </div>

          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
              Stok
            </label>
            <input
              type="number"
              id="stock"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
              Satuan
            </label>
            <input
              type="text"
              id="unit"
              value={formData.unit}
              onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
              className="mt-1 block w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
              Gambar Produk
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageUpload}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0
                file:text-sm file:font-semibold
                file:bg-green-50 file:text-green-700
                hover:file:bg-green-100"
            />
            <p className="mt-1 text-sm text-gray-500">
              Format yang didukung: JPG, PNG, GIF. Maksimal 2MB
            </p>
          </div>

          {imagePreview && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-700 mb-2">Preview Gambar:</p>
              <div className="relative h-48 w-48">
                <Image
                  src={imagePreview}
                  alt="Product preview"
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => router.push('/admin/produk')}
              className="px-6 py-2 border  border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={saving || uploading}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </div>
        </form>
      </div>

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
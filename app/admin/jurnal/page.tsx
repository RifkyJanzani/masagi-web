'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import Modal from '@/components/Modal'
import ConfirmModal from '@/components/ConfirmModal'

interface Journal {
  id: number
  title: string
  university: string
  p_issn: string
  e_issn: string
  cover: string
  badges: { label: string; color: string }[]
  created_at: string
}

type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc'

export default function JurnalPage() {
  const router = useRouter()
  const [journals, setJournals] = useState<Journal[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [universityFilter, setUniversityFilter] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('newest')
  const [isDeleting, setIsDeleting] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [modalConfig, setModalConfig] = useState({
    title: '',
    message: '',
    type: 'info' as 'success' | 'error' | 'warning' | 'info'
  })
  const [journalToDelete, setJournalToDelete] = useState<Journal | null>(null)

  useEffect(() => {
    fetchJournals()
  }, [])

  const showMessage = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info') => {
    setModalConfig({ title, message, type })
    setShowModal(true)
  }

  const fetchJournals = async () => {
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setJournals(data || [])
    } catch (error) {
      console.error('Error fetching journals:', error)
      showMessage('Error', 'Gagal mengambil data jurnal', 'error')
    } finally {
      setLoading(false)
    }
  }

  const isValidImageUrl = (url: string) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleDelete = async (journalId: number) => {
    setIsDeleting(true)
    try {
      const { error } = await supabase
        .from('journals')
        .delete()
        .eq('id', journalId)

      if (error) throw error
      
      // Refresh journals list
      await fetchJournals()
      showMessage('Berhasil', 'Jurnal berhasil dihapus', 'success')
    } catch (error) {
      console.error('Error deleting journal:', error)
      showMessage('Error', 'Gagal menghapus jurnal', 'error')
    } finally {
      setIsDeleting(false)
      setShowConfirmModal(false)
      setJournalToDelete(null)
    }
  }

  const handleEdit = (journalId: number) => {
    router.push(`/admin/jurnal/edit/${journalId}`)
  }

  const confirmDelete = (journal: Journal) => {
    setJournalToDelete(journal)
    setShowConfirmModal(true)
  }

  // Get unique universities for filter
  const universities = Array.from(new Set(journals.map(j => j.university)))

  // Filter dan sort journals
  const filteredAndSortedJournals = journals
    .filter((journal) => {
      const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           journal.university.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesUniversity = universityFilter === 'all' || journal.university === universityFilter
      return matchesSearch && matchesUniversity
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        case 'oldest':
          return new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        default:
          return 0
      }
    })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-900"></div>
      </div>
    )
  }

  return (
    <>
      <div className="bg-white shadow rounded-lg h-screen flex flex-col p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Kelola Jurnal</h1>
        </div>

        {/* Search and Filters */}
        <div className="mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 text-gray-600">
              <input
                type="text"
                placeholder="Cari jurnal..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* University Filter */}
            <div className="w-full md:w-48 text-gray-600">
              <select
                value={universityFilter}
                onChange={(e) => setUniversityFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="all">Semua Publisher</option>
                {universities.map((university) => (
                  <option key={university} value={university}>
                    {university}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="w-full md:w-48 text-gray-600">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="newest">Terbaru</option>
                <option value="oldest">Terlama</option>
                <option value="title-asc">Judul (A-Z)</option>
                <option value="title-desc">Judul (Z-A)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">
          <div className="h-full overflow-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cover
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Judul Jurnal
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Publisher
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ISSN
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badges
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredAndSortedJournals.map((journal) => (
                  <tr key={journal.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="relative h-16 w-12">
                        {isValidImageUrl(journal.cover) ? (
                          <Image
                            src={journal.cover}
                            alt={journal.title}
                            fill
                            className="object-cover rounded-lg"
                          />
                        ) : (
                          <div className="h-16 w-12 bg-gray-200 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {journal.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{journal.university}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        P-ISSN: {journal.p_issn}<br />
                        E-ISSN: {journal.e_issn}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {journal.badges?.map((badge, idx) => (
                          <span
                            key={idx}
                            className={`px-2 py-1 text-xs rounded-full ${badge.color}`}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(journal.id)}
                        className="text-green-600 hover:text-green-900 mr-4"
                        disabled={isDeleting}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => confirmDelete(journal)}
                        className="text-red-600 hover:text-red-900"
                        disabled={isDeleting}
                      >
                        Hapus
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Journal Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => router.push('/admin/jurnal/tambah')}
            className="font-semibold px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            Tambah Jurnal
          </button>
        </div>
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

      {/* Confirm Modal for delete */}
      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => {
          setShowConfirmModal(false)
          setJournalToDelete(null)
        }}
        onConfirm={() => journalToDelete && handleDelete(journalToDelete.id)}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus jurnal "${journalToDelete?.title}"?`}
        confirmText="Hapus"
        cancelText="Batal"
        type="danger"
      />
    </>
  )
}

# Alur Jurnal Admin - Mengikuti Pola Produk

## Overview
Alur jurnal di admin sekarang mengikuti pola yang sama dengan alur produk, dengan struktur yang konsisten dan user experience yang seragam.

## Struktur Alur

### 1. **Halaman Utama** (`/admin/jurnal`)
- **Fitur**: Daftar semua jurnal dengan tabel
- **Fungsi**:
  - Search jurnal berdasarkan judul atau universitas
  - Filter berdasarkan universitas
  - Sort berdasarkan: Terbaru, Terlama, Judul (A-Z), Judul (Z-A)
  - Tombol Edit dan Hapus untuk setiap jurnal
  - Tombol "Tambah Jurnal" yang mengarah ke halaman terpisah
- **UI**: Tabel dengan kolom Cover, Judul, Universitas, ISSN, Badges, dan Aksi

### 2. **Halaman Tambah** (`/admin/jurnal/tambah`)
- **Fitur**: Form untuk menambah jurnal baru
- **Fungsi**:
  - Upload cover jurnal
  - Input judul jurnal
  - Input universitas
  - Input P-ISSN dan E-ISSN
  - Pilih badges (S1 Accredited, Garuda Indexed, Sinta Indexed, Scopus Indexed)
  - Tombol Simpan dan Batal
- **Navigation**: Setelah simpan, redirect ke halaman utama jurnal

### 3. **Halaman Edit** (`/admin/jurnal/edit/[id]`)
- **Fitur**: Form untuk edit jurnal existing
- **Fungsi**:
  - Load data jurnal berdasarkan ID
  - Edit semua field jurnal
  - Update cover image
  - Modifikasi badges
  - Tombol Simpan Perubahan dan Batal
- **Navigation**: Setelah update, redirect ke halaman utama jurnal

## Perbandingan dengan Alur Produk

| Aspek | Produk | Jurnal |
|-------|--------|--------|
| **Halaman Utama** | `/admin/produk` | `/admin/jurnal` |
| **Tambah** | `/admin/produk/tambah` | `/admin/jurnal/tambah` |
| **Edit** | `/admin/produk/edit/[id]` | `/admin/jurnal/edit/[id]` |
| **Search** | Nama produk | Judul/Universitas |
| **Filter** | Kategori | Universitas |
| **Sort** | Terbaru, Terlama, Nama | Terbaru, Terlama, Judul |
| **Image Upload** | ✅ | ✅ |
| **Modal Confirm** | ✅ | ✅ |
| **Loading States** | ✅ | ✅ |

## File yang Dibuat/Dimodifikasi

### File Baru:
- `app/admin/jurnal/tambah/page.tsx` - Halaman tambah jurnal
- `app/admin/jurnal/edit/[id]/page.tsx` - Halaman edit jurnal

### File yang Dimodifikasi:
- `app/admin/jurnal/page.tsx` - Halaman utama jurnal (dari modal ke halaman terpisah)

## Fitur-Fitur Konsisten

### 1. **Search & Filter**
```typescript
// Search berdasarkan judul atau universitas
const matchesSearch = journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                     journal.university.toLowerCase().includes(searchQuery.toLowerCase())

// Filter berdasarkan universitas
const matchesUniversity = universityFilter === 'all' || journal.university === universityFilter
```

### 2. **Sorting Options**
```typescript
type SortOption = 'newest' | 'oldest' | 'title-asc' | 'title-desc'
```

### 3. **Badge Management**
```typescript
const badgeOptions = [
  { label: 'S1 Accredited', color: 'bg-yellow-200 text-yellow-800' },
  { label: 'Garuda Indexed', color: 'bg-red-200 text-red-800' },
  { label: 'Sinta Indexed', color: 'bg-blue-200 text-blue-800' },
  { label: 'Scopus Indexed', color: 'bg-green-200 text-green-800' },
];
```

### 4. **Image Upload**
- Menggunakan komponen `ImageUpload` yang sama
- Fallback image untuk cover yang tidak valid
- Preview image di form

### 5. **Error Handling**
- Modal untuk menampilkan pesan sukses/error
- Loading states untuk semua operasi async
- Confirm modal untuk delete operation

## Navigation Flow

```
/admin/jurnal (Halaman Utama)
├── Search & Filter
├── Table View
├── Edit → /admin/jurnal/edit/[id]
├── Delete → Confirm Modal
└── Tambah Jurnal → /admin/jurnal/tambah
```

## Keuntungan Alur Baru

### 1. **Konsistensi UX**
- Pola yang sama dengan produk
- User tidak perlu belajar interface baru
- Navigation yang familiar

### 2. **Scalability**
- Mudah menambah fitur baru
- Struktur yang terorganisir
- Separation of concerns

### 3. **Maintainability**
- Kode yang terpisah dan fokus
- Mudah debug dan test
- Reusable components

### 4. **Performance**
- Lazy loading untuk halaman terpisah
- Optimized queries per halaman
- Better caching strategy

## Cara Penggunaan

### Menambah Jurnal Baru
1. Buka `/admin/jurnal`
2. Klik "Tambah Jurnal"
3. Isi form di `/admin/jurnal/tambah`
4. Klik "Simpan"
5. Redirect otomatis ke halaman utama

### Edit Jurnal
1. Di halaman utama, klik "Edit" pada jurnal
2. Form akan load dengan data existing
3. Modifikasi sesuai kebutuhan
4. Klik "Simpan Perubahan"
5. Redirect otomatis ke halaman utama

### Hapus Jurnal
1. Di halaman utama, klik "Hapus" pada jurnal
2. Confirm modal akan muncul
3. Klik "Hapus" untuk konfirmasi
4. Jurnal akan dihapus dan list di-refresh

## Dependencies
- `@/components/Modal` - Untuk pesan sukses/error
- `@/components/ConfirmModal` - Untuk konfirmasi delete
- `@/components/ImageUpload` - Untuk upload cover
- `@/lib/supabase` - Untuk database operations
- `next/navigation` - Untuk routing

## Testing Checklist
- [ ] Halaman utama load dengan benar
- [ ] Search berfungsi (judul & universitas)
- [ ] Filter universitas berfungsi
- [ ] Sort options berfungsi
- [ ] Tambah jurnal baru
- [ ] Edit jurnal existing
- [ ] Hapus jurnal dengan konfirmasi
- [ ] Image upload berfungsi
- [ ] Badge selection berfungsi
- [ ] Navigation flow lancar
- [ ] Error handling berfungsi
- [ ] Loading states tampil dengan benar 
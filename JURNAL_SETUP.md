# Setup Halaman Jurnal Dinamis

## Overview
Halaman jurnal sekarang sudah bersifat dinamis dan mengambil data dari Supabase. Berikut adalah langkah-langkah untuk setup dan penggunaan.

## 1. Setup Database

### Jalankan SQL di Supabase
Buka Supabase Dashboard > SQL Editor dan jalankan script dari file `database/journals.sql`

Script ini akan:
- Membuat tabel `journals` dengan struktur yang diperlukan
- Mengatur Row Level Security (RLS)
- Membuat index untuk performa
- Menambahkan sample data

### Struktur Tabel
```sql
CREATE TABLE journals (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  university TEXT NOT NULL,
  p_issn TEXT NOT NULL,
  e_issn TEXT NOT NULL,
  cover TEXT,
  badges JSONB DEFAULT '[]',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

## 2. Fitur yang Tersedia

### Halaman Publik (`/jurnal`)
- Menampilkan semua jurnal dari database
- Tampilan card yang menarik dengan cover, judul, universitas, ISSN, dan badges
- Responsive design

### Halaman Admin (`/admin/jurnal`)
- **CRUD Operations**: Create, Read, Update, Delete jurnal
- **Image Upload**: Upload cover jurnal menggunakan komponen ImageUpload
- **Badge Management**: Pilih badges dari predefined options
- **Table View**: Tampilan tabel untuk manajemen jurnal

## 3. Badge Options
Sistem mendukung badges berikut:
- S1 Accredited (Kuning)
- Garuda Indexed (Merah)
- Sinta Indexed (Biru)
- Scopus Indexed (Hijau)

## 4. Cara Penggunaan

### Menambah Jurnal Baru
1. Buka `/admin/jurnal`
2. Klik tombol "Tambah Jurnal"
3. Isi form:
   - Upload cover image
   - Masukkan judul jurnal
   - Masukkan nama universitas
   - Masukkan P-ISSN dan E-ISSN
   - Pilih badges yang sesuai
4. Klik "Simpan"

### Edit Jurnal
1. Di halaman admin, klik tombol "Edit" pada jurnal yang ingin diedit
2. Modifikasi data sesuai kebutuhan
3. Klik "Update"

### Hapus Jurnal
1. Di halaman admin, klik tombol "Hapus" pada jurnal yang ingin dihapus
2. Konfirmasi penghapusan

## 5. File yang Dimodifikasi/Dibuat

### File Baru:
- `app/admin/jurnal/page.tsx` - Halaman admin untuk manajemen jurnal
- `database/journals.sql` - Script SQL untuk setup database

### File yang Dimodifikasi:
- `app/jurnal/page.tsx` - Halaman publik jurnal (sekarang dinamis)

## 6. Dependencies
Pastikan komponen berikut sudah tersedia:
- `@/components/Modal` - Untuk modal form
- `@/components/ImageUpload` - Untuk upload gambar
- `@/lib/supabase` - Konfigurasi Supabase

## 7. Security
- Row Level Security (RLS) diaktifkan
- Public read access untuk halaman publik
- Authenticated users dapat melakukan CRUD operations

## 8. Performance
- Index pada `created_at` untuk sorting yang cepat
- Lazy loading untuk gambar
- Efficient queries dengan Supabase

## 9. Troubleshooting

### Error "Table does not exist"
- Pastikan script SQL sudah dijalankan di Supabase
- Cek nama tabel dan kolom sesuai dengan yang ada di kode

### Error "Permission denied"
- Pastikan RLS policies sudah dibuat dengan benar
- Cek apakah user sudah login untuk akses admin

### Image tidak muncul
- Pastikan URL gambar valid
- Cek apakah ImageUpload component berfungsi dengan benar
- Gunakan fallback image `/cover-jurnal.png` 
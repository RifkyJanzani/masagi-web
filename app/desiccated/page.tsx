'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/Container';

export default function ProdukPage() {
  return (
    <main className="flex flex-col items-center min-h-screen px-4 pt-8 md:pt-32 bg-[#e3f2e1]">
      <h1 className="text-5xl md:text-6xl font-bold text-green-900 text-center mb-8 mt-4">DESSICATED COCONUT</h1>
      <Container>
        <div className="flex flex-col items-center text-center">
            {/* Gambar ilustrasi */}
            <div className="w-full h-64 bg-gray-300 rounded-2xl mb-8"></div>

            {/* Judul */}
            <h2 className="text-3xl md:text-4xl font-semibold text-green-900 mb-4">Desiccated Coconut</h2>

            {/* Paragraf deskripsi */}
            <p className="text-gray-700 text-sm md:text-base leading-relaxed max-w-3xl">
            Perusahaan kami juga bergerak di bidang penyediaan solusi teknologi tepat guna, 
            meliputi penjualan mesin pengolahan hasil pertanian dan perkebunan, mesin pengelolaan 
            limbah organik dan anorganik, serta mesin konversi energi untuk menghasilkan sumber energi 
            terbarukan. Kami berkomitmen mendukung produktivitas industri dan keberlanjutan lingkungan 
            melalui inovasi teknologi.
            </p>
        </div>
      </Container> 
    </main>
  );
} 
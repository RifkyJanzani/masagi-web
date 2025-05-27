'use client'

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

interface ImageUploadProps {
  onImageUploaded: (url: string) => void;
  currentImage?: string;
}

export default function ImageUpload({ onImageUploaded, currentImage }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentImage || null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!e.target.files || e.target.files.length === 0) {
        throw new Error('Pilih gambar untuk diupload');
      }

      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      // Upload ke Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('products')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Dapatkan URL publik
      const { data: { publicUrl } } = supabase.storage
        .from('products')
        .getPublicUrl(filePath);

      setPreview(publicUrl);
      onImageUploaded(publicUrl);
    } catch (error) {
      alert('Error uploading image: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-4">
        {preview ? (
          <div className="relative w-full h-48 mb-4">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover rounded-lg"
            />
            <button
              onClick={() => {
                setPreview(null);
                onImageUploaded('');
              }}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
            >
              ✕
            </button>
          </div>
        ) : (
          <div className="w-full h-48 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center mb-4">
            <p className="text-gray-500">Belum ada gambar</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center w-full">
        <label className="w-full flex flex-col items-center justify-center bg-white border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:bg-gray-50">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
            </svg>
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Klik untuk upload</span> atau drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG atau JPEG (MAX. 2MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
          />
        </label>
      </div>
      {uploading && (
        <div className="mt-2 text-sm text-gray-500">
          Mengupload gambar...
        </div>
      )}
    </div>
  );
} 
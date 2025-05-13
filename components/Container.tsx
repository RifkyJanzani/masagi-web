'use client'

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-5xl bg-white rounded-3xl shadow-2xl px-4 md:px-10 py-6 md:py-10 mt-16 mb-8">
      {children}
    </div>
  );
}
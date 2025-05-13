import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[400px] flex items-center justify-center bg-white overflow-hidden p-0 m-0">
      <div className="relative w-full h-full flex items-center justify-center">
        <Image
          src="/img/hero.jpg"
          alt="Kelapa"
          fill
          className="object-center object-cover brightness-90"
          priority
        />
        <div className="absolute inset-0 bg-green-900/30" />
        <div className="relative z-10 w-full flex justify-center">
          <h1 className="text-white text-[8vw] md:text-[7vw] font-extrabold drop-shadow-lg select-none">
            Masagi
          </h1>
        </div>
      </div>
    </section>
  );
}
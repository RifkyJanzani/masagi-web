'use client'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const pathname = usePathname();
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Only for landing page section scroll
  const handleScroll = () => {
    const sections = ["beranda", "tentangkami"];
    const scrollPosition = window.scrollY + 100;
    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    }
  };

  useEffect(() => {
    if (pathname === "/") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [pathname]);

  // Navigation logic
  const handleNavClick = (item: string) => {
    const sectionId = item.toLowerCase().replace(/\s/g, "");
    setMenuOpen(false);
    if (item === "Tentang Kami") {
      if (pathname === "/") {
        // Scroll to section
        const element = document.getElementById(sectionId);
        if (element) {
          const offset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        } else {
          window.location.hash = sectionId;
        }
      } else {
        router.push(`/#${sectionId}`);
      }
    } else if (item === "Beranda") {
      router.push("/");
    } else if (item === "Produk") {
      router.push("/produk");
    } else if (item === "Artikel") {
      router.push("/artikel");
    } else if (item === "Jurnal") {
      router.push("/jurnal");
    } else if (item === "Kontak") {
      router.push("/#kontak");
    }
  };

  // Active logic
  const navItems = ["Beranda", "Tentang Kami", "Produk", "Jurnal"];
  const getIsActive = (item: string) => {
    if (item === "Beranda") {
      return pathname === "/";
    }
    if (item === "Produk") {
      return pathname === "/produk";
    }
    if (item === "Artikel") {
      return pathname === "/artikel";
    }
    if (item === "Jurnal") {
      return pathname === "/jurnal";
    }
    if (item === "Tentang Kami") {
      return activeSection === "tentangkami";
    }
    return false;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center items-center">
      <div className="bg-white rounded-b-2xl rounded-tl-2xl rounded-tr-2xl px-6 md:px-8 py-4 mt-4 flex items-center justify-between w-[98vw] max-w-5xl shadow-lg relative">
        {/* Logo */}
        <div className="text-xl font-bold text-green-900">Masagi</div>
        {/* Hamburger (mobile) */}
        <button className="md:hidden ml-2" onClick={toggleMenu} aria-label="Buka menu">
          {menuOpen ? <X className="w-7 h-7 text-green-900" /> : <Menu className="w-7 h-7 text-green-900" />}
        </button>
        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-6 items-center">
          {navItems.map((item, i) => (
            <button
              key={i}
              onClick={() => handleNavClick(item)}
              className={`text-base font-medium px-4 py-1 rounded-full transition-all duration-200 ${
                getIsActive(item)
                  ? "bg-green-900 text-white font-semibold"
                  : "text-black hover:bg-gray-100"
              }`}
            >
              {item}
            </button>
          ))}
        </nav>
        {/* Kontak Desktop */}
        <button
          onClick={() => handleNavClick("Kontak")}
          className="hidden md:block text-green-900 font-bold text-lg ml-6 hover:text-green-900"
        >
          Kontak
        </button>
        {/* Menu Mobile Dropdown */}
        {menuOpen && (
          <div className="absolute top-full left-0 w-full bg-white rounded-b-2xl shadow-lg flex flex-col items-center py-4 gap-2 md:hidden animate-fadeIn z-50">
            {navItems.map((item, i) => (
              <button
                key={i}
                onClick={() => handleNavClick(item)}
                className={`w-11/12 text-base font-medium px-4 py-2 rounded-full transition-all duration-200 text-center ${
                  getIsActive(item)
                    ? "bg-green-900 text-white font-semibold"
                    : "text-black hover:bg-gray-100"
                }`}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => handleNavClick("Kontak")}
              className="w-11/12 text-green-900 font-bold text-lg mt-2 py-2 rounded-full hover:text-green-900"
            >
              Kontak
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
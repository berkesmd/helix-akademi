"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-500/40 bg-yellow-500/10">
            <span className="text-xl font-black text-yellow-400">H</span>
          </div>

          <div>
            <div className="text-lg font-black tracking-wider text-white">
              HELIX
            </div>
            <div className="-mt-1 text-[10px] font-medium tracking-[0.35em] text-yellow-400">
              AKADEMİ
            </div>
          </div>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-white transition hover:text-yellow-400"
          >
            Ana Sayfa
          </Link>

          <Link
            href="/egitimler"
            className="text-sm font-medium text-gray-300 transition hover:text-yellow-400"
          >
            Eğitimler
          </Link>

          <Link
            href="/hakkimizda"
            className="text-sm font-medium text-gray-300 transition hover:text-yellow-400"
          >
            Hakkımızda
          </Link>

          <Link
            href="/blog"
            className="text-sm font-medium text-gray-300 transition hover:text-yellow-400"
          >
            Blog
          </Link>

          <Link
            href="/iletisim"
            className="text-sm font-medium text-gray-300 transition hover:text-yellow-400"
          >
            İletişim
          </Link>
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 md:flex">
          <Link
            href="/giris"
            className="rounded-xl px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            Giriş Yap
          </Link>

          <Link
            href="/kayit"
            className="rounded-xl bg-yellow-500 px-5 py-2.5 text-sm font-bold text-black shadow-lg shadow-yellow-500/20 transition hover:bg-yellow-400 hover:shadow-yellow-500/30"
          >
            Kayıt Ol
          </Link>
        </div>

        {/* Mobile Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-lg border border-white/10 p-2 text-white md:hidden"
          aria-label="Menüyü aç"
        >
          <div className="space-y-1.5">
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
            <span className="block h-0.5 w-6 bg-white" />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-black px-6 py-6 md:hidden">
          <nav className="flex flex-col gap-5">
            <Link href="/" className="text-white hover:text-yellow-400">
              Ana Sayfa
            </Link>

            <Link
              href="/egitimler"
              className="text-gray-300 hover:text-yellow-400"
            >
              Eğitimler
            </Link>

            <Link
              href="/hakkimizda"
              className="text-gray-300 hover:text-yellow-400"
            >
              Hakkımızda
            </Link>

            <Link
              href="/blog"
              className="text-gray-300 hover:text-yellow-400"
            >
              Blog
            </Link>

            <Link
              href="/iletisim"
              className="text-gray-300 hover:text-yellow-400"
            >
              İletişim
            </Link>

            <div className="mt-2 flex gap-3 border-t border-white/10 pt-5">
              <Link
                href="/giris"
                className="flex-1 rounded-xl border border-white/10 py-3 text-center text-sm font-semibold text-white"
              >
                Giriş Yap
              </Link>

              <Link
                href="/kayit"
                className="flex-1 rounded-xl bg-yellow-500 py-3 text-center text-sm font-bold text-black"
              >
                Kayıt Ol
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
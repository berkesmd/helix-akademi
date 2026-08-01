"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminGirisPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");
  const [loading, setLoading] = useState(false);

  async function girisYap(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);
    setHata("");

    const supabase = createClient();

    if (!supabase) {
      setHata("Supabase bağlantısı bulunamadı.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: sifre,
    });

    if (error) {
      setHata(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Admin Giriş
        </h1>

        <form onSubmit={girisYap} className="space-y-4">

          <input
            type="email"
            placeholder="E-posta"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="password"
            placeholder="Şifre"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            className="w-full rounded-lg border p-3"
            required
          />

          {hata && (
            <p className="text-red-600 text-sm">
              {hata}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-black p-3 text-white font-bold"
          >
            {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
          </button>

        </form>

      </div>
    </div>
  );
}
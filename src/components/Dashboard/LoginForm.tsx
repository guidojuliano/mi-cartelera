"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "app/services/supabase";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert("Error al iniciar sesión: " + error.message);
    } else {
      // Redirecciona al dashboard
      router.push("/dashboard");
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-4 max-w-sm mx-auto p-6 border rounded-md shadow-md bg-white"
    >
      <h2 className="text-lg font-bold text-center">Iniciar sesión</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Correo electrónico"
        required
        className="w-full px-4 py-2 border rounded"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Contraseña"
        required
        className="w-full px-4 py-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
      >
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>
    </form>
  );
}

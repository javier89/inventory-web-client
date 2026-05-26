"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useLogin";

export default function LoginPage() {
  const [usuario, setUsuario] = useState("");
  const [password, setPassworrd] = useState("");

  const { login, loading, error } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login({
      usuario,
      password,
    });
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-[#060C22] px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-8 shadow-2xl"
        >
          <h1 className="text-2xl font-bold text-slate-100 mb-2">Inventario</h1>
          <p className="text-slate-400 mb-6">Inicia sesion con tu usuario</p>
          <div className="mb-4">
            <label className="block text-salte-300 mb-2">Usuario</label>
            <input
              type="text"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#060c22] border borde-[#1E2A4A] text-slate-100 outline-none focus:ring-blue-500"
              placeholder="usuario"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm text-slate-300 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassworrd(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-blue-500"
              placeholder="*****"
              required
            />
          </div>

          {error && (
            <p className="mb-4 text-sm text-red-400">{error.message}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600  hover:bg-blue-500 disabled:opacity-60 text-white font-seniblod transition"
          >
            {loading ? "Ingresando.." : "Iniciar seción"}
          </button>
        </form>
      </div>
    </>
  );
}

"use client";
import { useState } from "react";

export default function ModalEliminarProductos({
  producto,
  open,
  loading,
  onClose,
  onConfirm,
}) {
  const [confirmacion, setConfirmacion] = useState("");

  if (!open || !producto) return null;
  return (
    <div
      className="fixed inset-0
        bg-black/70
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-50"
    >
      <div
        className="w-full max-w-md
      bg-[#111A3A]
      border border-[#1E2A4A]
      rounded-2xl
      shadow-2xl
      p-6
      "
      >
        <h2
          className="text-xl
        font-semibold
        text-slate-100
        mb-2"
        >
          confirmar eliminacion
        </h2>
        <div className="bg-[#0B122E] border borde-[#1E2A4A] rounded-lg p-3 mb-5">
          <p
            className="text-slate-100
          font-medium"
          >
            {producto.nombre}
          </p>
          <p className="text-slate-400 text-sm">{producto.sku}</p>
        </div>
        <p className="text-slate-300 mb-3">
          Escriba
          <span className="text-rose-300 font-bold"> ELIMINAR</span> para
          continuar.
        </p>
        <input
          type="text"
          value={confirmacion}
          onChange={(e) => setConfirmacion(e.target.value)}
          placeholder="ELIMINAR"
          className="w-full px-4 py-3 rounded-xl bg-[#0B122E] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-cyan-400"
        />
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="
          px-4 py-2 
          rounded-xl 
          bg-slate-700
          hover:bg-slate-600
          transition"
          >
            Cancelar
          </button>
          <button
            disabled={confirmacion !== "ELIMINAR" || loading}
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              confirmacion === "ELIMINAR"
                ? `
                  bg-rose-500
                  hover:bg-rose-400 
                  text-white 
                `
                : `
                 bg-slate-700
                 text-slate-500
                 cursor-not-allowed
                `
            }`}
          >
            {loading ? "Eliminando..." : "Eliminar"}
          </button>
        </div>
      </div>
    </div>
  );
}

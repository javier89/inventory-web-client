"use client";

import { useEffect, useState } from "react";

export default function FormEmpleado({
  empleadoEditar,
  onCreate,
  onActualizar,
  loading,
  onCancelarEdicion,
}) {
  const editando = !!empleadoEditar;

  const [nombre, setNombre] = useState(empleadoEditar?.nombre || "");
  const [cargo, setCargo] = useState(empleadoEditar?.cargo || "");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editando) {
      await onActualizar({
        id_empleado: empleadoEditar.id_empleado,
        nombre,
        cargo,
      });
    } else {
      await onCreate({
        nombre,
        cargo,
      });
      setNombre("");
      setCargo("");
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6 space-y-4"
      >
        <h2 className="text-xl font-semibold text-salte-100">
          {editando ? "Editar empleado" : "Nuevo empleado"}
        </h2>
        <input
          type="text"
          placeholder="Nombre empleado"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="text"
          placeholder="Cargo"
          value={cargo}
          onChange={(e) => setCargo(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={loading}
            className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold"
          >
            {loading
              ? "Guardando..."
              : editando
                ? "Actualizar empleado"
                : "Crear Empleado"}
          </button>
          {editando && (
            <button
              tyoe="button"
              onClick={onCancelarEdicion}
              className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white"
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </>
  );
}

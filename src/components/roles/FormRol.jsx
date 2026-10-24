"use client";

import { useState } from "react";

export default function FormRol({
  rolEditar,
  onCreate,
  onActualizar,
  onCancelar,
  loading,
}) {
  const editando = Boolean(rolEditar);
  const [nombre, setNombre] = useState(rolEditar?.activo.nombre || "");
  const [descripcion, setDescripcion] = useState(rolEditar?.descripcion || "");
  const [activo, setActivo] = useState(rolEditar?.activo ?? true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nombreLimpio = nombre.trim();
    if (!nombreLimpio) {
      return;
    }

    if (editando) {
      await onActualizar({
        id_rol: rolEditar.id_rol,
        nombre: nombreLimpio,
        descripcion: descripcion.trim(),
        activo,
      });
      return;
    }
    const resultado = await onCrear({
      nombre: nombreLimpio,
      descripcion: descripcion.trim(),
    });

    if (resultado === false) {
      return;
    }

    setNombre("");
    setDescripcion("");
    setActivo(true);
  };

  return (
    <form
      className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6 space-y-4"
      onSubmit={handleSubmit}
    >
      <div>
        <h2 className="text-xl font-bold text-slate-100">
          {editando ? "Editar rol" : "Crear rol"}
        </h2>
        <p className="text-sm text-slate-400 mt-1">
          Define los Perfiles de acceso de Inventario
        </p>
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-2">Nombre</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Administrador"
          className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm text-slate-300 mb-2">Descripcion</label>
        <textarea
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          placeholder="Describe el Alcance del Rol"
          rows={4}
          className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      {editando && (
        <label className="flex items-center gap-3 text-slate-300">
          <input
            type="checkbox"
            checked={activo}
            onChange={(e) => setActivo(e.target.checked)}
            className="h-4 w-4"
          />
          Rol Activo
        </label>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold"
        >
          {loading ? "Guardando..." : editando ? "Actualizar Rol" : "Crear rol"}
        </button>
        {editando && (
          <button
            type="button"
            onClick={onCancelar}
            className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

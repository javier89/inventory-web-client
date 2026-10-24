"use client";

import { KeyRound, Pencil, Trash2 } from "lucide-react";

export default function TablaRoles({
  roles = [],
  onEditar,
  onEliminar,
  onAdministrarPermisos,
  eliminando,
}) {
  if (roles.length === 0) {
    return (
      <div className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6">
        <p className="text-slate-400">No existen roles registrados</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-[#1E2A4A] bg-[#0B122E]">
      <table className="min-w-full text-sm text-slate-300">
        <thead className="bg-[#0F1736] text-slate-400 uppercase text-xs">
          <tr>
            <th className="px-6 py-4 text-left">Rol</th>
            <th className="px-6 py-4 text-left">Descripcion</th>
            <th className="px-6 py-4 text-center">Permisos</th>
            <th className="px-6 py-4 text-center">Estado</th>
            <th className="px-6 py-4 text-right">Acciones</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#1E2A4A]">
          {roles.map((rol) => (
            <tr key={rol.id_rol} className="hover:bg-[#111A3A]">
              <td className="px-6 py-4 font-semibold text-slate-100">
                {rol.nombre}
              </td>
              <td className="px-6 py-4 text-slate-400">
                {rol.descripcion || "Sin descripcion"}
              </td>
              <td className="px-6 py-4 text-center">
                {rol.permisos?.length || 0}
              </td>
              <td className="px-6 py-4 text-center">
                <span
                  className={rol.activo ? "text-green-400" : "text-red-400"}
                ></span>
              </td>
              <td className="px-6 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    className="p-2 rounded-lg bg-violet-500/10 text-violet-300 hover:bg-violet-500/20"
                    type="button"
                    onClick={() => onAdministrarPermisos(rol)}
                    title="Administrar permisos"
                  >
                    <KeyRound size={17} />
                  </button>

                  <button
                    type="button"
                    onClick={() => onEditar(rol)}
                    className="p-2 rounded-lg bg-blue-500/10 text-blue-300 hover:bg-blue-500/20"
                    title="Editar Rol"
                  >
                    <Pencil size={17} />
                  </button>
                  <button
                    type="button"
                    onClick={() => onEliminar(rol.id_rol)}
                    disbled={eliminado}
                    className="p-2 rounded-lg bg-red-500/10 text-red-300 hover:bg-red-500/20 disabled-opacity-50"
                    title="DesactivarRol"
                  >
                    <Trash2 size={17} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

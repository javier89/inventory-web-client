"use client";

import { Pencil, Trash2 } from "lucide-react";

export default function TablaEmpleado({
  empleados,
  onEditar,
  onEliminar,
  eliminando,
}) {
  return (
    <>
      <div className="overflow-x-auto rounded-2xl border borde-[#1E2A4A] bg-[#0B122E]">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-[#0F1736] text-gray-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">No</th>
              <th className="px-6 py-4 text-left">Nombre</th>
              <th className="px-6 py-4 text-left">Cargo</th>
              <th className="px-6 py-4 text-center">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2A4A]">
            {empleados.map((empleado) => (
              <tr
                key={empleado.id_empleado}
                className="hover:bg-[#111A3A] transition"
              >
                <td className="px-6 py-4">{empleado.id_empleado}</td>
                <td className="px-6 py-4 font-medium">{empleado.nombre}</td>
                <td className="px-6 py-4">{empleado.cargo || "sin cargo"} </td>

                <td className="px-6 py-3 text-center">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEditar(empleado)}
                      className="p-2 rounded-lg text-blue-400 hover:bg-blue-500/10"
                      title="Editar"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onEliminar(empleado.id_empleado)}
                      disabled={eliminando}
                      className="p-2 rounded-lg text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {empleados.length === 0 && (
              <tr>
                <td
                  colSpan="4"
                  className="px-6 py-8 text-center text-slate-400"
                >
                  No hay empleado registrados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

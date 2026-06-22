"use client";

export default function SelectorEmpleado({ empleados, idEmpleado, onChange }) {
  return (
    <>
      <div className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6">
        <label className="block text-sm text-slate-300 mb-2">
          Seleccion Empleado
        </label>
        <select
          value={idEmpleado}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona Empleado</option>
          {empleados.map((empleado) => (
            <option key={empleado.id_empleado} value={empleado.id_empleado}>
              {empleado.nombre}
              {empleado.cargo ? `- ${empleado.cargo}` : ""}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

"use client";
export default function TablaProductosAsignados({ productos = [] }) {
  if (productos.length === 0) {
    return (
      <>
        <div className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6">
          <p className="text-slate-400">
            Este Empleado no tiene Productos Asignado
          </p>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-[#1E2A4A] bg-[#0B122E]">
        <table className="min-w-full text-sm text-gray-300">
          <thead className="bg-[#0F1736] text-gray-400 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 text-left">ID Producto</th>
              <th className="px-6 py-4 text-left">Producto</th>
              <th className="px-6 py-4 text-center">Cantidad Asignada</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1E2A4A]">
            {productos.map((producto) => (
              <tr
                key={producto.id_producto}
                clasName="hover:bg-[#111A3A] transition"
              >
                <td className="px-6 py-4">{producto.id_producto}</td>
                <td className="px-6 py-4 font-medium">{producto.nombre}</td>
                <td className="py-4 px-6 text-center font-semibold">
                  {producto.cantidad_total}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

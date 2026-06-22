"use client";
export default function DocumentoAsignacion({ asignacion }) {
  const imprimir = () => {
    window.print();
  };
  if (!asignacion) {
    return (
      <>
        <div className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6">
          <p className="text-slate-400">
            Selecciona un Empleado para generar documento
          </p>
        </div>
      </>
    );
  }
  const empleado = asignacion.empleado;
  const producto = asignacion.producto || [];
  return;
  <div className="bg-white text-black rounded-2xl p-6">
    <div className="border-b pb-4 mb-4">
      <h2 className="text-xl font-bold">Documento de Productos asignados</h2>
      <p className="text-sm">Empleado: {empleado?.nombre}</p>
      <p className="text-sm">Fecha: {new Date().toLocaleDateString()}</p>
    </div>
    {productos.length == 0 ? (
      <p className="text-sm">Este empleado no tiene productos asignados</p>
    ) : (
      <table className="w-full text-sm border">
        <thead>
          <tr>
            <th className="border p-2 text-left">ID</th>
            <th className="border p-2 text-left">Producto</th>
            <th className="border p-2 text-center">Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id_producto}>
              <td className="border p-2">{producto.id_producto}</td>
              <td className="border p-2">{producto.nombre}</td>
              <td className="border p-2 text-center">
                {producto.cantidad_total}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )}

    <div className="mt-10 grid grid-cols-2 gap-10 text-center text-sm">
      <div>
        {/* Entrega */}
        <div className="border-t border-black pt-2">Entrega</div>
      </div>
      <div>
        {/* Recibe */}
        <div className="border-t border-black pt-2">Recibe</div>
      </div>
    </div>
  </div>;
  <button
    onClick={imprimir}
    className="nt-6 w-full py-3 rounded-xl bg-blue-600 text-white font-semibold print:hidden"
  >
    Imprimir Documento
  </button>;
}

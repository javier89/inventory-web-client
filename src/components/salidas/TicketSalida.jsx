"use client";
export default function TicketSalida({ movimientos }) {
  return (
    <>
      <div className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 mb-4">
          Ticket de salida
        </h2>
        {movimientos.length === 0 ? (
          <p className="text-slate-400 text-sm">
            Aun no hay movimientos de salida
          </p>
        ) : (
          <div className="space-y-3">
            {movimientos.map((mov) => (
              <div
                key={mov.id_movimiento}
                className="bg-[#060C22] border border-[#1E2A4A] rounded-xl p-4"
              >
                <p className="text-slate-100 font-semibold">
                  {mov.producto?.nombre || "Producto sin nombre"}
                </p>
                <p className="text-slate-400 text-sm">
                  Cantidad: {mov.cantidad}
                </p>
                {/* <p className="">
                  Stock: {mov.stock_anterior}→{mov.stock_nuevo}
                </p> */}
                {mov.empleado?.nombre && (
                  <p className="text-slate-400 text-sm">
                    Empleado: {mov.empleado.nombre}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

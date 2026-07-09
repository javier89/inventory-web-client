"use client";

export default function TicketEntrada({ entrada, onCerrarEntrada, cerrando }) {
  if (!entrada) {
    return (
      <div className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6">
        <h2 className="text-xl font-bold text-slate-100 mb-4">
          Ticket de entrada
        </h2>
        <p className="text-stale-400 text-sm">
          Registrada una entrada para visualizar el ticket
        </p>
      </div>
    );
  }
  const detalles = entrada.detalles || [];

  return (
    <div className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6 space-y-4">
      <h2 className="text-xl font-bold text-slate-100"> Ticket de Entrada</h2>
      <div className="text-sm text-slate-300 space-y-1">
        <p>Compra: #{entrada.id_compra}</p>
        <p>Factura: {entrada.num_factura || "Sin factura"}</p>
        <p>Forma de pago: {entrada.form_pago || "No especificado"}</p>
        <p>Estod: {entrada.estado}</p>
        <p>Total: ${entrada.total_compra || 0}</p>
      </div>
      <div className="space-y-2">
        {detalles.map((item) => (
          <div
            key={item.id_detalle}
            className="bg-[#060C22] border border-[#1E2A4A] rounded-xl p-3 text-sm"
          >
            <p className="text-slate-100">Producto ID: {item.id_producto}</p>
            <p className="text-slate-400">Cantidad: {item.cantidad}</p>
            <p className="text-slate-400">Precio: {item.precio_producto}</p>
            <p className="text-slate-400">Subtotal: ${item.costo_total || 0}</p>
          </div>
        ))}
      </div>
      {entrada.estado === "ABIERTA" && (
        <button
          tyoe="button"
          onClick={() => onCerrarEntrada(entrada.id_compra)}
          disabled={cerrando}
          className="w-full py-3 rounden-xl bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white font-semibold transition"
        >
          {cerrando ? "Cerrando compra..." : "Cerrar compra y actualizar stock"}
        </button>
      )}
    </div>
  );
}

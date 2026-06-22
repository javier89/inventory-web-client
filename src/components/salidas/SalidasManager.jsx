"use client";

import FormSalidaProducto from "./FormSalidaProducto";
import TicketSalidas from "./TicketSalida";
import { useSalidas } from "@/hooks/useSalidas";

export default function SalidasManager() {
  const { movimientosSalida, loadingMovimientos, errorMovimientos } =
    useSalidas();

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6 items-start">
        {/*Lado izquierdo: formulario de salida*/}
        <FormSalidaProducto />
        {/*Lado Derecho: ticket / movimientos */}
        <div>
          {loadingMovimientos ? (
            <p className="text-slate-300">Cargar Movimientos...</p>
          ) : errorMovimientos ? (
            <p className="text-red-400">Error al Cargar los Movimientos</p>
          ) : (
            <TicketSalidas movimientos={movimientosSalida} />
          )}
        </div>
      </div>
    </>
  );
}

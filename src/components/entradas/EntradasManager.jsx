"use client";

import { useState } from "react";
import { useEntradas } from "@/hooks/useEntradas";
import ErrorModal from "@/components/ui/ErrorModal";

import FormEntradaMercancia from "./FormEntradaMercancia";
import TicketEntrada from "./TicketEntrada";

export default function EntradasManager() {
  const [entradaActual, setEntradaActual] = useState(null);

  const [modalError, setModalError] = useState({
    open: false,
    message: "",
  });

  const { cerrarEntrada, cerrando } = useEntradas();

  const handleEntradaCreada = (entrada) => {
    setEntradaActual(entrada);
  };
  const handleCerrarEntrada = async (id_compra) => {
    try {
      const compraCerrada = await cerrarEntrada(id_compra);
      setEntradaActual((prev) => ({
        ...prev,
        ...compraCerrada,
        estado: compraCerrada.estado,
        total_compra: compraCerrada.total_compra,
      }));
    } catch (error) {
      setModalError({
        open: true,
        message: error.message || "No se pude cerrar la compra",
      });
    }
  };
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-6 items-start">
        <FormEntradaMercancia onEntradaCreada={handleEntradaCreada} />
        <TicketEntrada
          entrada={entradaActual}
          onCerrarEntrada={handleCerrarEntrada}
          cerrando={cerrando}
        />
      </div>
      <ErrorModal
        open={modalError.open}
        message={modalError.message}
        onClose={() => setModalError({ open: false, mesagge: "" })}
      />
    </>
  );
}

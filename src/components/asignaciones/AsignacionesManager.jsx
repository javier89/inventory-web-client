"use client";

import { useState } from "react";
import { useAsignaciones } from "@/hooks/useAsignaciones";
import SelectorEmpleado from "./SelectorEmpleado";
import TablaProductoAsignados from "./TablaProductosAsignados";
import DocumentoAsignacion from "./DocumentoAsignacion";

export default function AsignacionesManager() {
  const [idEmpleado, setIdEmpleado] = useState("");
  const {
    empleados,
    loadingEmpleados,
    errorEmpleados,
    asignacion,
    loadingAsignacion,
    errorAsignacion,
  } = useAsignaciones(idEmpleado);

  if (loadingEmpleados) {
    return (
      <>
        <p className="text-slate-300">Cargando empleados...</p>
      </>
    );
  }

  if (errorEmpleados) {
    return (
      <>
        <p className="text-red-400">
          Error al cargar empleados: {errorEmpleados.message}
        </p>
      </>
    );
  }
  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_480px] gap-6 items-start">
        <div className="space-y-6">
          <SelectorEmpleado
            empleados={empleados}
            idEmpleado={idEmpleado}
            onChange={setIdEmpleado}
          />
          {loadingAsignacion ? (
            <p className="text-slate-300">Cargando Asignaciones...</p>
          ) : errorAsignacion ? (
            <p className="text-red-400">
              Error al cargar asignaciones: {errorAsignacion.message}
            </p>
          ) : (
            <TablaProductoAsignados productos={asignacion?.productos || []} />
          )}
        </div>
        <DocumentoAsignacion asignacion={asignacion} />
      </div>
    </>
  );
}

"use client";

import { useState } from "react";
import { useEmpleados } from "@/hooks/useEmpleado";

import FormEmpleado from "./FormEmpleado";
import TablaEmpleado from "./TablaEmpleados";

export default function EmpleadosManager() {
  const [empleadoEditar, setEmpleadoEditar] = useState(null);

  const {
    empleados,
    isLoading,
    error,
    crearEmpleado,
    actualizarEmpleado,
    eliminarEmpleado,

    creando,
    actualizando,
    eliminando,
  } = useEmpleados();

  const handleCrear = async (data) => {
    await crearEmpleado(data);
  };

  const handleActualizar = async (data) => {
    await actualizarEmpleado(data);
    setEmpleadoEditar(null);
  };

  const handleEliminar = async (id_empleado) => {
    const confirmar = confirm("Seguro que deseas eliminar este empleado?");
    //Admin2026
    if (!confirmar) return;
    await eliminarEmpleado(id_empleado);
  };

  if (isLoading) {
    return <p className="text-slate-300">Cargando Empleados...</p>;
  }
  if (error) {
    return (
      <p className="text-red-400">
        Error al cargar empleados...{error.message}
      </p>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <FormEmpleado
          key={empleadoEditar?.id_empleado || "nuevo"}
          empleadoEditar={empleadoEditar}
          onCreate={handleCrear}
          onActualizar={handleActualizar}
          loading={creando || actualizando}
          onCancelarEdicion={() => setEmpleadoEditar(null)}
        />
        <TablaEmpleado
          empleados={empleados}
          onEditar={setEmpleadoEditar}
          onEliminar={handleEliminar}
          eliminando={eliminando}
        />
      </div>
    </>
  );
}

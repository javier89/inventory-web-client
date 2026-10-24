"use client";

import { useState } from "react";
import { useRoles } from "@/hooks/useRoles";
import ErrorModal from "@/components/ui/ErrorModal";

import FormRol from "./FormRol";
import TablaRoles from "./TablaRoles";
import ModalPermisosRol from "./ModalPermisosRol";

export default function RolesManager() {
  //Rol que se esta editando
  const [rolEditar, setRolEditar] = useState(null);

  //Rol al que se le administraran permisos
  const [rolPermisos, setRolPermisos] = useState(null);

  //Estado del modal de errores
  const [modalError, setModalError] = useSate({
    open: false,
    mesaage: "",
  });

  const {
    roles,
    permisos,
    loadingCatalogos,
    errorCatalogos,

    crearRol,
    actualizarRol,
    eliminarRol,
    asignarPermisos,

    creando,
    actualizando,
    eliminando,
    guardandoPermisos,
  } = useRoles();

  const manejarError = (error) => {
    setModalError({
      open: true,
      message: error?.message || "Ocurrio un error inesperado.",
    });
  };

  const handleCrear = async (data) => {
    try {
      await crearRol(data);
      return true;
    } catch (error) {
      manejarError(error);
      return false;
    }
  };

  const handleActualizar = async (data) => {
    try {
      await actualizarRol(data);
      setRolEditar(null);
      return true;
    } catch (error) {
      manejarError(error);
      return false;
    }
  };

  const handleEliminar = async (id_rol) => {
    const confirmar = window.confirm("Deseas desactivar este rol?");
    if (!confirmar) return;
    try {
      await eliminarRol(id_rol);
    } catch (error) {
      mensajeError(error);
    }
  };

  const handleGuardarPermisos = async (data) => {
    try {
      await asignarPermisos(data);
    } catch (error) {
      mensajeError(error);
      throw error;
    }
  };

  if (loadingCatalogos) {
    return <p className="text-slate-300">Cargando Roles y permisos...</p>;
  }

  if (errorCatalogos) {
    return (
      <p className="text-red-400">
        Error al cargar seguridad: {errorCatalogos.message}
      </p>
    );
  }

  return (
    <>
      <div className="space-y-6">
        <FormRol
          key={rolEditar?.id_rol || "nuevo"}
          rolEditar={rolEditar}
          onCreate={handleCrear}
          onActualizar={handleActualizar}
          onCancelar={() => setRolEditar(null)}
          loading={creando || actualizando}
        />

        <TablaRoles
          roles={roles}
          onEditar={setRolEditar}
          onEliminar={handleEliminar}
          onAdministrarPermisos={setRolPermisos}
          eliminando={eliminando}
        />
      </div>

      <ModalPermisosRol
        key={rolPermisos?.id_rol || "sin-rol"}
        rol={rolPermisos}
        permisos={permisos}
        open={Boolean(rolPermisos)}
        onClose={() => setRolPermisos(null)}
        onGuardar={handleGuardarPermisos}
        loading={guardandoPermisos}
      />

      <ErrorModal
        open={modalError.open}
        message={modalError.message}
        onClose={() =>
          setModalError({
            open: false,
            message: "",
          })
        }
      />
    </>
  );
}

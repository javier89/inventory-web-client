"use client";

import { useMemo, useState } from "react";

export default function ModalPermisoRol({
  rol,
  permisos = [],
  open,
  onClose,
  onGuardar,
  loading,
}) {
  const permisosIniciales =
    rol?.permisos?.map((permisos) => String(permisos.id_permiso)) || [];

  const [seleccionado, setSeleccionados] = useState(permisosIniciales);

  const permisosPorModulo = useMemo(() => {
    return permisos.reduce((grupos, permiso) => {
      const modulo = permiso.modulo || "GENERAL";

      if (!grupos[modulo]) {
        grupos[modulo] = [];
      }
      grupos[modulo].push(permiso);

      return grupos;
    }, {});
  }, [permisos]);

  if (!open || !rol) return null;

  const alternarPermisos = (idPermiso) => {
    const id = String(idPermiso);

    setSeleccionados((actuales) => {
      if (actuales.includes(id)) {
        return actuales.filter((item) => item !== id);
      }
      return [...actuales, id];
    });
  };

  const seleccionarModulo = (permisoModulo) => {
    const idsModulo = permisoModulo.map((permiso) =>
      String(permiso.id_permiso),
    );
    setSeleccionados((actuales) => {
      const todosSeleccionados = idsModulo.every((id) => actuales.includes(id));
      if (todosSeleccionados) {
        return actuales.filter((id) => !idsModulo.includes(id));
      }
      return Array.from(new Set([...actuales, ...idsModulo]));
    });
  };
  const guardar = async () => {
    await onGuardar({
      id_rol: rol.id_rol,
      permisos: seleccionados,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 ">
      <div className="w-full max-w-3xl max-h-[85v] overflow-y-auto bg-[#0B122E] border border-[#1E2A4A] ronded-2xl p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-100">
            Permisos del rol:{rol.nombre}
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Selecciona las acciones que podra realizar este rol.
          </p>
        </div>

        <div className="space-y-5">
          {Object.entries(permisosPorModelo).map(([modulo, permisosModulo]) => (
            <section
              key={modulo}
              className="border border-[#1E2A4A] ronded-xl p-4"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-slate-100">{modulo}</h3>
                <button
                  type="button"
                  onClick={() => seleccionarModulo(permisosModulo)}
                  className="text-sm text-blue-400 hover:text-blue-300"
                >
                  Seleccionar Modulo
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {permisosMosulo.map((permiso) => (
                  <label
                    key={permiso.id_permiso}
                    className="flex gap-3 items-start bg-[#060C22] border border-[#1E2A4A] rounded-xl p-3 cursos-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={seleccionados.includes(
                        String(permiso.id_permiso),
                      )}
                      onChange={() => alternarPermisos(permiso.id_permiso)}
                      className="mt-1"
                    />
                    <span>
                      <span className="block text-slate-100 font-medium">
                        {permiso.nombre}
                      </span>
                      <span className="block text-xs text-slate-500">
                        {permiso.codigo}
                      </span>
                    </span>
                  </label>
                ))}
              </div>
            </section>
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-3 rounded-xl bg-slate-700 hover:bg-slate-600 text-white"
          >
            Cancelar
          </button>
          <button className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-smibold">
            {loading ? "Guardando..." : "Guardar Permiso"}
          </button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import ErrorModal from "@/components/ui/ErrorModal";
import { useSalidas } from "@/hooks/useSalidas";

export default function FormSalidaProducto() {
  const [idEmpleado, setIdEmpleado] = useState("");
  const [motivo, setMotivo] = useState("");

  // Modal para mostrar los errores controlados
  const [modalError, setModalError] = useState({ open: false, message: "" });
  // Lista de productos de salida
  const [productosSalida, setProductosSalida] = useState([
    {
      id_producto: "",
      cantidad: "",
    },
  ]);

  const {
    empleados,
    productos,
    loadingCatalogos,
    errorCatalogos,
    crearSalida,
    loading,
    success,
  } = useSalidas();

  //Agregar salida de producto
  const agregarProducto = () => {
    setProductosSalida([
      ...productosSalida,
      {
        id_producto: "",
        cantidad: "",
      },
    ]);
  };

  // Actualizar porducto o cantidad por fila
  const actualizarProductoSalida = (index, campo, valor) => {
    const copia = [...productosSalida];
    copia[index][campo] = valor;
    setProductosSalida(copia);
  };

  // Quitar una fila de producto
  const quitarProducto = (index) => {
    if (productosSalida.length === 1) return;

    setProductosSalida(productosSalida.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Limpiar filas vacias antes de enviar
    const detalle = productosSalida
      .filter((item) => item.id_producto && item.cantidad)
      .map((item) => ({
        id_producto: Number(item.id_producto),
        cantidad: Number(item.cantidad),
      }));

    if (!idEmpleado) {
      setModalError({
        open: true,
        message: "selecciona un empleado",
      });
      return;
    }
    if (detalle.length === 0) {
      setModalError({
        open: true,
        message: "Agregar al menos un producto",
      });
      return;
    }

    const productosDuplicado = detalle.some(
      (item, index, array) =>
        array.findIndex((p) => p.id_producto === item.id_producto) !== index,
    );

    if (productosDuplicado) {
      setModalError({
        open: true,
        message:
          "No puedes agregar el mismo producto mas de una vez en la misma salida",
      });
      return;
    }
    const input = {
      id_empleado: Number(idEmpleado),
      motivo,
      detalle,
    };

    try {
      await crearSalida(input);

      // Limpiar formulario solo si la salida fue exitosa
      setIdEmpleado("");
      setMotivo("");
      setProductosSalida([
        {
          id_producto: "",
          cantidad: "",
        },
      ]);
    } catch (error) {
      // Aqui cacheamos los errores como el "Stock"
      setModalError({
        open: true,
        message: error.message || "No se pude registrar la salida",
      });
    }
  };

  if (loadingCatalogos) {
    return <p className="text-slate-300">Cargando empleados y productos...</p>;
  }
  if (errorCatalogos) {
    return (
      <p className="text-red-400"> Error al cargar empleados o productos..</p>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="max-w-2xl bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6 space-y-5"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-100">
            Registrar Salida
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Selecciona un empleado y uno o varios productos
          </p>
        </div>

        {/* ========================= */}
        {/* EMPLEADO */}
        {/* ========================= */}

        <div>
          <label className="block text-sm text-slate-300 mb-2">Empleado</label>
          <select
            value={idEmpleado}
            onChange={(e) => setIdEmpleado(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona empleado</option>
            {empleados.map((empleado) => (
              <option key={empleado.id_empleado} value={empleado.id_empleado}>
                {empleado.nombre}
                {empleado.cargo ? ` - ${empleado.cargo}` : ""}
              </option>
            ))}
          </select>
        </div>

        {/* ========================= */}
        {/* MOTIVO */}
        {/* ========================= */}
        <div>
          <label className="block text-sm text-slate-300 mb-2">Motivo</label>
          <input
            type="text"
            value={motivo}
            onChange={(e) => setMotivo(e.target.value)}
            placeholder="Ej bacheo, reparacion calle ..."
            className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* ========================= */}
        {/* PRODUCTOS MÚLTIPLES */}
        {/* ========================= */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-slate-100">
              Agregar Productos
            </h3>
            <button
              type="button"
              onClick={agregarProducto}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              <Plus size={18} />
            </button>
          </div>
          {productosSalida.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[1fr_160px_60px] gap-3 items-end"
            >
              {/* PRODUCTO */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Producto #{index + 1}
                </label>
                <select
                  value={item.id_producto}
                  onChange={(e) =>
                    actualizarProductoSalida(
                      index,
                      "id_producto",
                      e.target.value,
                    )
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecciona productos</option>
                  {productos.map((producto) => (
                    <option
                      key={producto.id_producto}
                      value={producto.id_producto}
                    >
                      {producto.nombre}-Stock:{producto.stock}
                    </option>
                  ))}
                </select>
              </div>
              {/* CANTIDAD */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Cantidad
                </label>
                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) =>
                    actualizarProductoSalida(index, "cantidad", e.target.value)
                  }
                  placeholder="Cantidad"
                  className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              {/* QUITAR PRODUCTO */}
              <button
                type="button"
                onClick={() => quitarProducto(index)}
                disabled={productosSalida.length === 1}
                className="h-[50px] flex items-center justify-center rounded-xl bg-red-500/20 disabled:opacity-40 transition"
                title="Quitar Producto"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        {/* ========================= */}
        {/* MENSAJES */}
        {/* ========================= */}

        {/* {error && <p className="text-gray-400 text-sm">{error.message}</p>} */}
        {success && (
          <p className="text-green-400 text-sm">
            Salida Registrada correctamente
          </p>
        )}

        {/* ========================= */}
        {/* SUBMIT */}
        {/* ========================= */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold transition"
        >
          {loading ? "Registrado..." : "Registrar Salida"}
        </button>
      </form>
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

"use client";
import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useEntradas } from "@/hooks/useEntradas";
import ErrorModal from "@/components/ui/ErrorModal";

export default function FormEntradaMercancia({ onEntradaCreada }) {
  const [idProveedor, setIdProveedor] = useState("");
  const [numFactura, setNumFactura] = useState("");
  const [formPago, setFormPago] = useState("");
  const [modalError, setModalError] = useState({
    open: false,
    message: "",
  });

  const [detalles, setDetalles] = useState([
    {
      id_producto: "",
      cantidad: "",
      precio_producto: "",
    },
  ]);

  const {
    proveedores,
    productos,
    loadingCatalogos,
    errorCatalogos,
    crearEntrada,
    creando,
  } = useEntradas();

  const safeProveedores = proveedores || [];
  const safeProductos = productos || [];

  const agregarProducto = () => {
    setDetalles([
      ...detalles,
      {
        id_producto: "",
        cantidad: "",
        precio_producto: "",
      },
    ]);
  };

  const actualizarDetalle = (index, campo, valor) => {
    const copia = [...detalles];
    copia[index][campo] = valor;
    setDetalles(copia);
  };

  const quitarProducto = (index) => {
    if (detalles.length === 1) return;
    setDetalles(detalles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const detallesValidos = detalles
      .filter(
        (item) => item.id_producto && item.cantidad && item.precio_producto,
      )
      .map((item) => ({
        id_producto: Number(item.id_producto),
        cantidad: Number(item.cantidad),
        precio_producto: Number(item.precio_producto),
      }));
    if (!idProveedor) {
      setModalError({
        open: true,
        message: "selecciona un proveedor.",
      });
      return;
    }
    if (detallesValidos.length === 0) {
      setModalError({
        open: true,
        message: "Agregar almenos un producto",
      });
      return;
    }

    const input = {
      id_proveedor: Number(idProveedor),
      num_factura: numFactura,
      form_pago: formPago,
      detalles: detallesValidos,
    };

    try {
      const compra = await crearEntrada(input);
      onEntradaCreada?.(compra);
      setIdProveedor("");
      setNumFactura("");
      setFormPago("");
      setDetalles([
        {
          id_producto: "",
          cantidad: "",
          precio_producto: "",
        },
      ]);
    } catch (error) {
      setModalError({
        open: true,
        message: error.messaage || "no se pudo registrar la entrada",
      });
    }
  };

  if (loadingCatalogos) {
    return (
      <>
        <p className="text-slate-300"> Cargando Proveedores y productos...</p>
      </>
    );
  }
  if (errorCatalogos) {
    return (
      <>
        <p className="text-red-400">Error al cargar proveedores o productos</p>
      </>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="w-full bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6 space-y-5"
      >
        <div>
          <h2 className="text-2xl font-bold text-slate-100">
            Registrar Entrada
          </h2>

          <p className="text-slate-400 text-sm mt-1">
            Registra una compra abierta con uno o varios productos.
          </p>
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-2">Proveedor</label>

          <select
            value={idProveedor}
            onChange={(e) => setIdProveedor(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Selecciona proveedor</option>

            {safeProveedores.map((proveedor) => (
              <option
                key={proveedor.id_proveedor}
                value={proveedor.id_proveedor}
              >
                {proveedor.nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Número de factura
            </label>

            <input
              type="text"
              value={numFactura}
              onChange={(e) => setNumFactura(e.target.value)}
              placeholder="Ej. FAC-001"
              className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Forma de pago
            </label>

            <input
              type="text"
              value={formPago}
              onChange={(e) => setFormPago(e.target.value)}
              placeholder="Ej. Transferencia"
              className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center gap-3">
            <h3 className="text-lg font-semibold text-slate-100">
              Productos de la compra
            </h3>

            <button
              type="button"
              onClick={agregarProducto}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-white transition"
            >
              <Plus size={18} />
              Agregar
            </button>
          </div>

          {detalles.map((item, index) => (
            <div
              key={index}
              className="grid grid-cols-1 md:grid-cols-[1fr_120px_160px_60px] gap-3 items-end"
            >
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Producto #{index + 1}
                </label>

                <select
                  value={item.id_producto}
                  onChange={(e) =>
                    actualizarDetalle(index, "id_producto", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Selecciona producto</option>

                  {safeProductos.map((producto) => (
                    <option
                      key={producto.id_producto}
                      value={producto.id_producto}
                    >
                      {producto.nombre} - Stock: {producto.stock}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Cantidad
                </label>

                <input
                  type="number"
                  min="1"
                  value={item.cantidad}
                  onChange={(e) =>
                    actualizarDetalle(index, "cantidad", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Precio
                </label>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={item.precio_producto}
                  onChange={(e) =>
                    actualizarDetalle(index, "precio_producto", e.target.value)
                  }
                  className="w-full px-4 py-3 rounded-xl bg-[#060C22] border border-[#1E2A4A] text-slate-100 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <button
                type="button"
                onClick={() => quitarProducto(index)}
                disabled={detalles.length === 1}
                className="h-[50px] flex items-center justify-center rounded-xl bg-red-500/20 text-red-300 hover:bg-red-500/30 disabled:opacity-40 transition"
                title="Quitar producto"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={creando}
          className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-60 text-white font-semibold transition"
        >
          {creando ? "Registrando..." : "Registrar entrada"}
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

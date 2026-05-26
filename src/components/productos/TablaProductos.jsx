"use client";

import { useEffect, useState } from "react";
import { useProductos } from "@/hooks/useProductos";
import BuscadorProductos from "./BuscadorProductos";
import ProductoRow from "./ProductoRow";
import PaginacionProductos from "./PaginacionProductos";
import ModalEliminarProductos from "./ModalEliminarProductos";

export default function TablaProductos() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebounceSearch] = useState("");

  const [orderBy, setOrderBy] = useState({
    field: "id_producto",
    direction: "asc",
  });

  const [eliminarProducto, setEliminarProducto] = useState(null);

  // =========================
  // Debounce
  // =========================
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceSearch(search);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  // =========================
  // Query Productos
  // =========================

  const { productos, totalPages, isLoading, error, eliminar, eliminado } =
    useProductos({ page, search: debouncedSearch, orderBy });

  // =========================
  // Loading
  // =========================

  if (isLoading) {
    return <div className="px-6 text-gray-300">Cargando Productos...</div>;
  }

  // =========================
  // Error
  // =========================
  if (error) {
    return <div className="px-6 text-red-400">Error:{error.massage}</div>;
  }

  // =========================
  // Empty State
  // =========================
  if (!productos.length) {
    return (
      <div className="px-6 text-gray-400">No hay productos disponibles</div>
    );
  }

  return (
    <>
      <div className="p-6 bg-[#060C22] min-h-screen text-gray-200">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Poductos</h1>
        </div>

        {/*=========================*/}
        {/*======== Buscador =======*/}
        {/*=========================*/}
        <BuscadorProductos
          search={search}
          setSearch={setSearch}
          setPage={setPage}
        />

        {/*=========================*/}
        {/*========= Tabla =========*/}
        {/*=========================*/}

        <div className="overflow-x-auto rounded-2xl border border-[#1E2A4A] bg-[#0B1122E]">
          <table className="min-w-full text-sm text-gray-300">
            <thead className="bg-[#0F1736] text-gray-400 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-4 text-left">ID</th>
                <th className="px-6 py-4 text-left">SKU</th>
                <th className="px-6 py-4 text-left">NOMBRE</th>
                <th className="px-6 py-4 text-left">STOCK</th>
                <th className="px-6 py-4 text-left">ACCIONES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1E2A4A]">
              {productos.map((producto) => (
                <ProductoRow
                  key={producto.id_producto}
                  producto={producto}
                  onEliminar={() => setEliminarProducto(producto)}
                />
              ))}
            </tbody>
          </table>
        </div>

        {/*=========================*/}
        {/*===== Paginacion  =======*/}
        {/*=========================*/}
        <PaginacionProductos
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

        {/*=========================*/}
        {/*==== Modal Eliminar =====*/}
        {/*=========================*/}
        <ModalEliminarProductos
          producto={eliminarProducto}
          open={!!eliminarProducto}
          loading={eliminado}
          onClose={() => setEliminarProducto(null)}
          onConfirm={async () => {
            await eliminar(eliminarProducto.id_producto);
            setEliminarProducto(null);
          }}
        />
      </div>
    </>
  );
}

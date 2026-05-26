"use client";
export default function BuscadorProductos({ search, setSearch, setPage }) {
  return (
    <input
      type="text"
      placeholder="Buscar Producto..."
      value={search}
      onChange={(e) => {
        setPage(1);
        setSearch(e.target.value);
      }}
      className="mb-6 px-4 py-3 w-full 
      max-w-md bg-[#0B122E] 
      textgray-200 
      border borde-[#1E2A4A]
      rounded-xl
      outline-none
      focus:ring-2
      focus:ring-blue-500"
    />
  );
}

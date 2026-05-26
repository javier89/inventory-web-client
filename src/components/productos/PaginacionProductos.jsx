"use client";

export default function PaginacionProductos({ page, totalPages, setPage }) {
  return (
    <div className="flex justify-between items-center mt-6 ">
      <button
        onClick={() => setPage((prev) => prev - 1)}
        disabled={page === 1}
        className="px-4 py-2 bg-[#0B122E] border border-[#1E2A4A] rounded-lg disbled:opacity-50"
      >
        ⬅ Anterior
      </button>
      <span className="text-gray-300">
        Página{page}de{totalPages}
      </span>
      <button
        onClick={() => setPage((prev) => prev + 1)}
        disabled={page >= totalPages}
        className="px-4 py-2 bg-[#0B122E] border border-[#1E2A4A] rounded-lg disabled:opacity-50"
      >
        Siguiente ➡
      </button>
    </div>
  );
}

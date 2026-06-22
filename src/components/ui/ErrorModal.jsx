"use client";

export default function ErrorModal({ open, message, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-[#0B122E] border border-red-500/30 rounded-2xl p-6 shadown-2xl">
        <h2 className="text-xl font-bold text-red-400 mb-3">Error</h2>
        <p className="text-slate-300 mb-6">{message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold transition"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
}

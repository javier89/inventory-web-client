"use client";
import { Trash2 } from "lucide-react";

export default function productoRow({ producto, onEliminar }) {
  return (
    <tr className="hover:bg-[#111A3A] transition">
      <td className="px-6 py-4">{producto.id_producto}</td>
      <td className="px-6 py-4">{producto.sku}</td>
      <td className="px-6 py-4 font-medium">{producto.nombre}</td>
      <td
        className={`px-6 py-4 text-center font-simbold 
         ${producto.stock < 5 ? "text-red-400" : "text-slate-100"}`}
      >
        {producto.stock}
      </td>
      <td className="px-6 py-4 text-center">
        <button
          onClick={onEliminar}
          className=" p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}

"use client";

import Link from "next/link";
import { LayoutDashboard, Package, LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useLogout";

export default function Sidebar() {
  const { logout } = useLogout();

  return (
    <>
      <aside className="w-64 min-h-screen bg-[#060V22] border-r border-[#1E24A4] p-5 text-slate-200">
        <h1 className="text-xl font-bold mb-8">Inventia</h1>
        <nav className="space-y-2">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 px-3 rounded-xl hover:bg-[#111A3A]"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </Link>
          <Link
            href="productos"
            className="flex items-center gap-3 py-3 rounded-xl hover:bg-[#111A3A]"
          >
            <Package size={18} />
            Productos
          </Link>
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10"
          >
            <LogOut size={18} />
            Salir
          </button>
        </nav>
      </aside>
    </>
  );
}

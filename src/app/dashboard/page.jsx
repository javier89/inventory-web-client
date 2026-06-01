import Image from "next/image";
import AdminLayout from "@/components/layout/AdminLayout";
export default function DashboardPage() {
  return (
    <>
      <AdminLayout>
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6">
            <p className="text-slate-400"> Productos </p>
            <h2 className="text-3xl font-bold mt-2">128</h2>
          </div>

          <div className="bg-[#0B122E] border border-[#1E2A4A] rounded-2xl p-6 ">
            <p className="text-slate-400">Stock bajo</p>
            <h2 className="text-3xl font-bold mt-2 text-red-400">8</h2>
          </div>

          <div className="bg-[#0B122E] border borde-[#1E2A4A] rounded-2xl p-6">
            <p className="text-slate-400">Proveedores</p>
            <h2 className="text-3xl font-bold mt-2">24</h2>
          </div>
        </div>
        <div className="w-full h-90 relative flex justify-center items-center">
          <Image
            src="/images/logo.png"
            alt="logo"
            width={620}
            height={920}
            className="object-contain object-center p-4"
          />
        </div>
      </AdminLayout>
    </>
  );
}

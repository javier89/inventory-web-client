import AdminLayout from "@/components/layout/AdminLayout";
import SalidasManager from "@/components/salidas/SalidasManager";

export default function SalidasPage() {
  return (
    <>
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-slate-100">
            Salidas de Productos
          </h1>
          <SalidasManager />
        </div>
      </AdminLayout>
    </>
  );
}

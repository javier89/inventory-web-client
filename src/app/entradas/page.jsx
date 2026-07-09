import AdminLayout from "@/components/layout/AdminLayout";
import EntradasManager from "@/components/entradas/EntradasManager";

export default function EntradaPage() {
  return (
    <>
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-slate-100">
            Entradas de Mercancia
          </h1>
          <EntradasManager />
        </div>
      </AdminLayout>
    </>
  );
}

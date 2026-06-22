import AdminLayout from "@/components/layout/AdminLayout";
import AsignacionesManager from "@/components/asignaciones/AsignacionesManager";

export default function AsignacionesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-slate-100">
          Productos Asignados
        </h1>
        <AsignacionesManager />
      </div>
    </AdminLayout>
  );
}

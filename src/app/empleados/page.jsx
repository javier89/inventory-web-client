import AdminLayout from "@/components/layout/AdminLayout";
import EmpleadosManager from "../../components/empleados/EmpleadosManager";

export default function EmpleadosPage() {
  return (
    <>
      <AdminLayout>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-slate-100">Empleados</h1>
          <EmpleadosManager />
        </div>
      </AdminLayout>
    </>
  );
}

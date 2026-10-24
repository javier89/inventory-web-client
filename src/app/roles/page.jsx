import AdminLayout from "@/components/layout/AdminLayout";
import RolesManager from "@/components/roles/RolesManager";

export default function RolesPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="">Roles y permisos</h1>
          <p className="text-slate-400 mt-1">
            Configurar los permisos de acceso de Inventia.
          </p>
        </div>
        <RolesManager />
      </div>
    </AdminLayout>
  );
}

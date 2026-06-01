import AdminLayout from "@/components/layout/AdminLayout";
import TablaProductos from "@/components/productos/TablaProductos";

export default function Page() {
  return (
    <>
      <AdminLayout>
        <TablaProductos />
      </AdminLayout>
    </>
  );
}

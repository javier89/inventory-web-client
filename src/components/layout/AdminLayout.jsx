import Sidebar from "./Sidebar";

export default function AdminLayout({ children }) {
  return (
    <>
      <div className="flex min-h-screen bg-[#060C22]">
        <Sidebar />
        <main className="flex-1 p-6 text-slate-100">{children}</main>
      </div>
    </>
  );
}

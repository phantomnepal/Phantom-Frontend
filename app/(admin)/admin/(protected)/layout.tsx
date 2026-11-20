// app/admin/(protected)/layout.tsx
import axios from "axios";
import { cache } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// import AdminSidebar from "@/app/components/admin_components/admin_globals/sidebar";
import SessionMonitor from "@/components/admin_components/session_monitoring";
const verifyAdmin = cache(async () => {
  const refresh = (await cookies()).get("refresh_token")?.value;
  if (!refresh) return false;

  try {
    await axios.get(`${process.env.DJANGO_API_URL}/api/admin/auth/check/`, {
      headers: { Cookie: `refresh_token=${refresh}` },
      timeout: 5000,
    });
    return true;
  } catch (err) {
    if (axios.isAxiosError(err) && [401, 403,400].includes(err.response?.status ?? 0)) return false;
    throw err; 
  }
});

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  if (!(await verifyAdmin())) redirect("/admin/login");

  return (
    <div className="min-h-screen">
      {/* <AdminSidebar /> */}
      <SessionMonitor />
      <main className="ml-70 pt-5 min-h-screen">{children}</main>
    </div>
  );
}
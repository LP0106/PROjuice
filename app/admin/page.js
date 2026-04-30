import AdminDashboard from "@/components/AdminDashboard";
import { getAdminSummary } from "@/lib/lead-store";

export const metadata = {
  title: "PROjuice Admin | Launch Dashboard"
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const hasAdminPass = Boolean(process.env.PROJUICE_ADMIN_PASS);
  const initialSummary = hasAdminPass ? null : await getAdminSummary();

  return <AdminDashboard initialSummary={initialSummary} initialDemoMode={!hasAdminPass} />;
}

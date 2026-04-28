import { getAdminSummary } from "@/lib/lead-store";

export async function GET(request) {
  const expectedPass = process.env.PROJUICE_ADMIN_PASS || "";
  const providedPass = request.headers.get("x-admin-pass") || "";

  if (expectedPass && providedPass !== expectedPass) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const summary = await getAdminSummary();

  return Response.json({
    demoMode: !expectedPass,
    summary
  });
}

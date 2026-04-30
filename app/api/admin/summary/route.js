import { adminAuthResponse, getAdminPass, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { getAdminSummary } from "@/lib/lead-store";

export async function GET(request) {
  if (!isAdminRequestAuthorized(request)) {
    return adminAuthResponse();
  }

  const summary = await getAdminSummary();

  return Response.json({
    demoMode: !getAdminPass(),
    summary
  });
}

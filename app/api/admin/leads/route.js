import { adminAuthResponse, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { leadStatuses, listLeads } from "@/lib/lead-store";

export async function GET(request) {
  if (!isAdminRequestAuthorized(request)) {
    return adminAuthResponse();
  }

  const leads = await listLeads();

  return Response.json({
    statuses: leadStatuses,
    leads
  });
}

import { adminAuthResponse, isAdminRequestAuthorized } from "@/lib/admin-auth";
import { deleteLead, updateLeadStatus } from "@/lib/lead-store";

export async function PATCH(request, { params }) {
  if (!isAdminRequestAuthorized(request)) {
    return adminAuthResponse();
  }

  try {
    const { id } = await params;
    const payload = await request.json();
    const lead = await updateLeadStatus(id, payload.status);
    return Response.json({ ok: true, lead });
  } catch (error) {
    return Response.json({ ok: false, error: error.message || "Unable to update lead." }, { status: 400 });
  }
}

export async function DELETE(request, { params }) {
  if (!isAdminRequestAuthorized(request)) {
    return adminAuthResponse();
  }

  try {
    const { id } = await params;
    const deleted = await deleteLead(id);
    return Response.json({ ok: true, deleted });
  } catch (error) {
    return Response.json({ ok: false, error: error.message || "Unable to delete lead." }, { status: 400 });
  }
}

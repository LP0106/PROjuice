import { createLead, listLeads } from "@/lib/lead-store";

export async function GET() {
  const leads = await listLeads();
  return Response.json({
    total: leads.length,
    latest: leads.slice(0, 3).map(({ id, organisation, segment, flavour, status, createdAt }) => ({
      id,
      organisation,
      segment,
      flavour,
      status,
      createdAt
    }))
  });
}

export async function POST(request) {
  try {
    const payload = await request.json();
    const lead = await createLead(payload);

    return Response.json(
      {
        ok: true,
        lead: {
          id: lead.id,
          status: lead.status,
          createdAt: lead.createdAt
        }
      },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error.message || "Unable to save enquiry."
      },
      { status: 400 }
    );
  }
}

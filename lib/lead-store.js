import { promises as fs } from "fs";
import path from "path";
import { channels, products, seedLeads } from "@/lib/site-data";

const fallbackDataDirectory = process.env.VERCEL ? path.join("/tmp", "projuice") : path.join(process.cwd(), ".data");
const dataDirectory = process.env.PROJUICE_DATA_DIR || fallbackDataDirectory;
const leadsFile = path.join(dataDirectory, "leads.json");
const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseTable = process.env.SUPABASE_LEADS_TABLE || "projuice_leads";
const hasSupabase = Boolean(supabaseUrl && supabaseServiceKey);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const leadStatuses = ["New", "Contacted", "Qualified", "Archived"];

const clean = (value, maxLength = 240) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

const toLead = (row) => ({
  id: row.id,
  name: row.name,
  email: row.email,
  organisation: row.organisation || "",
  segment: row.segment || "General enquiry",
  flavour: row.flavour || "Mixed range",
  message: row.message || "",
  status: row.status || "New",
  createdAt: row.created_at || row.createdAt || new Date().toISOString()
});

const toSupabaseRow = (lead) => ({
  id: lead.id,
  name: lead.name,
  email: lead.email,
  organisation: lead.organisation,
  segment: lead.segment,
  flavour: lead.flavour,
  message: lead.message,
  status: lead.status,
  created_at: lead.createdAt
});

async function supabaseRequest(pathname, options = {}) {
  const response = await fetch(`${supabaseUrl}/rest/v1/${pathname}`, {
    ...options,
    headers: {
      apikey: supabaseServiceKey,
      Authorization: `Bearer ${supabaseServiceKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
      ...(options.headers || {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Supabase request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

async function listSupabaseLeads() {
  const rows = await supabaseRequest(`${supabaseTable}?select=*&order=created_at.desc`);
  return Array.isArray(rows) ? rows.map(toLead) : seedLeads;
}

async function createSupabaseLead(lead) {
  const rows = await supabaseRequest(supabaseTable, {
    method: "POST",
    body: JSON.stringify(toSupabaseRow(lead))
  });
  return toLead(rows?.[0] || lead);
}

async function updateSupabaseLeadStatus(id, status) {
  const rows = await supabaseRequest(`${supabaseTable}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({ status })
  });
  const lead = rows?.[0];

  if (!lead) {
    throw new Error("Lead not found.");
  }

  return toLead(lead);
}

async function deleteSupabaseLead(id) {
  await supabaseRequest(`${supabaseTable}?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE"
  });
}

export async function listLeads() {
  if (hasSupabase) {
    return listSupabaseLeads();
  }

  try {
    const raw = await fs.readFile(leadsFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(toLead) : seedLeads;
  } catch (error) {
    if (error.code === "ENOENT") {
      return seedLeads;
    }

    throw error;
  }
}

async function writeLeads(leads) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(leadsFile, JSON.stringify(leads, null, 2), "utf8");
}

export async function createLead(input) {
  const name = clean(input.name, 120);
  const email = clean(input.email, 160).toLowerCase();
  const organisation = clean(input.organisation, 160);
  const segment = clean(input.segment, 80) || "General enquiry";
  const flavour = clean(input.flavour, 80) || "Mixed range";
  const message = clean(input.message, 600);

  if (name.length < 2) {
    throw new Error("Please enter your name.");
  }

  if (!emailPattern.test(email)) {
    throw new Error("Please enter a valid email address.");
  }

  if (message.length < 8) {
    throw new Error("Please add a little more detail.");
  }

  const lead = {
    id: `lead-${Date.now().toString(36)}`,
    name,
    email,
    organisation,
    segment,
    flavour,
    message,
    status: "New",
    createdAt: new Date().toISOString()
  };

  if (hasSupabase) {
    return createSupabaseLead(lead);
  }

  const leads = await listLeads();
  await writeLeads([lead, ...leads]);
  return lead;
}

export async function updateLeadStatus(id, status) {
  const cleanId = clean(id, 120);
  const cleanStatus = clean(status, 40);

  if (!leadStatuses.includes(cleanStatus)) {
    throw new Error("Invalid lead status.");
  }

  if (hasSupabase) {
    return updateSupabaseLeadStatus(cleanId, cleanStatus);
  }

  const leads = await listLeads();
  const index = leads.findIndex((lead) => lead.id === cleanId);

  if (index === -1) {
    throw new Error("Lead not found.");
  }

  const nextLead = { ...leads[index], status: cleanStatus };
  const nextLeads = [...leads];
  nextLeads[index] = nextLead;
  await writeLeads(nextLeads);
  return nextLead;
}

export async function deleteLead(id) {
  const cleanId = clean(id, 120);

  if (hasSupabase) {
    await deleteSupabaseLead(cleanId);
    return { id: cleanId };
  }

  const leads = await listLeads();
  const nextLeads = leads.filter((lead) => lead.id !== cleanId);

  if (nextLeads.length === leads.length) {
    throw new Error("Lead not found.");
  }

  await writeLeads(nextLeads);
  return { id: cleanId };
}

export async function getAdminSummary() {
  const leads = await listLeads();
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const qualified = leads.filter((lead) => lead.status === "Qualified").length;
  const contacted = leads.filter((lead) => lead.status === "Contacted").length;
  const productCounts = products.map((product) => ({
    name: product.name,
    count: leads.filter((lead) => lead.flavour === product.name).length + product.name.length * 13
  }));

  return {
    metrics: [
      { label: "Total leads", value: leads.length + 1240, delta: "+18%" },
      { label: "Qualified", value: qualified + 842, delta: "+16%" },
      { label: "New enquiries", value: newLeads + 312, delta: "+12%" },
      { label: "Contacted", value: contacted + 68, delta: "+9%" }
    ],
    leads: leads.slice(0, 8),
    products: productCounts,
    channels,
    trend: [240, 290, 360, 410, 560, 640, 690, 720, 810, 900, 980]
  };
}

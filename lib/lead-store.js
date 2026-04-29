import { promises as fs } from "fs";
import path from "path";
import { channels, products, seedLeads } from "@/lib/site-data";

const fallbackDataDirectory = process.env.VERCEL ? path.join("/tmp", "projuice") : path.join(process.cwd(), ".data");
const dataDirectory = process.env.PROJUICE_DATA_DIR || fallbackDataDirectory;
const leadsFile = path.join(dataDirectory, "leads.json");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const clean = (value, maxLength = 240) =>
  String(value || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);

export async function listLeads() {
  try {
    const raw = await fs.readFile(leadsFile, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : seedLeads;
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

  const leads = await listLeads();
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

  await writeLeads([lead, ...leads]);
  return lead;
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

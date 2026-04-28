import { products } from "@/lib/site-data";

export async function GET() {
  return Response.json({ products });
}

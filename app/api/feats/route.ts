import { mockFeats } from "@/mock-data/FeatsData";

export async function GET() {
  return Response.json(mockFeats);
}
import { mockEquipment } from "@/mock-data/EquipmentData";

export async function GET() {
  return Response.json(mockEquipment);
}
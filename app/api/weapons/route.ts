import { mockWeapons } from "@/mock-data/WeaponData";

export async function GET() {
  return Response.json(mockWeapons);
}
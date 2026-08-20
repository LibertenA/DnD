import { mockCharacters } from "@/mock-data/CharactersData";

export async function GET() {
  return Response.json(mockCharacters);
}
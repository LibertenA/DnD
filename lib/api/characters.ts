export async function getCharacters() {
  const response = await fetch("/api/characters");

  if(!response.ok) {
    throw new Error("Не удалось получить данные")
  }

  return response.json();
}
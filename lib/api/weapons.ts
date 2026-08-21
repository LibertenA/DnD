export async function getWeapons() {
  const response = await fetch("/api/weapons");

  if(!response.ok) {
    throw new Error("Не удалось получить данные")
  }

  return response.json();
}
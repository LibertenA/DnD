export async function getEquipment() {
  const response = await fetch("/api/equipment");

  if(!response.ok) {
    throw new Error("Не удалось получить данные")
  }

  return response.json();
}
export async function getFeats() {
  const response = await fetch("/api/feats");

  if(!response.ok) {
    throw new Error("Не удалось получить данные")
  }

  return response.json();
}
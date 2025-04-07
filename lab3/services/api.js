const API_URL = 'https://wizard-world-api.herokuapp.com/Elixirs';

export async function getElixirs() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Error can't load data");
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

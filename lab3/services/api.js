const API_URL = 'https://wizard-world-api.herokuapp.com/Elixirs';

export async function getElixirs() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        throw new Error("Error server response not OK: ${response.status}");
    } 
    return await response.json(); 
  } catch (error) {
    console.error(error);
    throw error;
  }
}
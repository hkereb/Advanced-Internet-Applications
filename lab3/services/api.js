const API_URL = 'https://wizard-world-api.herokuapp.com/Elixirs';

export async function getElixirs() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
        let errorText = `Server error ${response.status}`;
        console.error(errorText);
        throw new Error(errorText);
    } 
    return await response.json(); 
  } catch (error) {
    console.error("Fetch failed:", error.message);
    throw error;
  }
}
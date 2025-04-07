import { getElixirs } from './services/api.js';
import { renderElixirsList } from './components/ElixirsList.js';

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const elixirs = await getElixirs();
    renderElixirsList(elixirs);
  } catch (error) {
    document.getElementById('elixirs-list').textContent = "Error can't load data";
  }
});
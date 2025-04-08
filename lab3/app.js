import { getElixirs } from './services/api.js';
import { renderElixirsList } from './components/ElixirsList.js';
import { createSearchBar } from './components/SearchBar.js';
import { createDifficultyFilter } from './components/DifficultyFilter.js';

let allElixirs = [];
let searchTerm = '';
let selectedDifficulty = 'all'; 

document.addEventListener('DOMContentLoaded', async () => {
  try {
    allElixirs = await getElixirs();

    const searchBarContainer = document.getElementById('search-bar');
    const searchBar = createSearchBar(term => {
      searchTerm = term.toLowerCase();
      filterAndRender();
    });
    searchBarContainer.appendChild(searchBar);

    const difficultyFilterContainer = document.getElementById('difficulty-filter');
    const difficultyFilter = createDifficultyFilter(diff => {
      selectedDifficulty = diff;
      filterAndRender();
    });
    difficultyFilterContainer.appendChild(difficultyFilter);

    renderElixirsList(allElixirs);
  } catch (error) {
    console.error("Error cannot load data: ", error);
  }
});


function filterAndRender() {
  const filtered = allElixirs.filter(elixir => {
    const nameMatches = elixir.name.toLowerCase().includes(searchTerm);
    const difficulty = elixir.difficulty?.toLowerCase() || 'unknown';
    const difficultyMatches = selectedDifficulty === 'all' || difficulty === selectedDifficulty;

    return nameMatches && difficultyMatches;
  });

  renderElixirsList(filtered);
}
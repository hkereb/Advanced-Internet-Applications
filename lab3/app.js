import { getElixirs } from './services/api.js';
import { renderElixirsList } from './components/ElixirsList.js';
import { createSearchBar } from './components/SearchBar.js';
import { createDifficultyFilter } from './components/DifficultyFilter.js'; // <--- nowy import

let allElixirs = [];
let searchTerm = '';
let selectedDifficulty = 'all'; // domyślnie pokazuj wszystko

document.addEventListener('DOMContentLoaded', async () => {
  try {
    allElixirs = await getElixirs();

    const searchBarContainer = document.getElementById('search-bar');

    // Tworzymy i dodajemy searchbar
    const searchBar = createSearchBar(term => {
      searchTerm = term.toLowerCase();
      filterAndRender();
    });

    // Zamiast tworzyć filtr difficulty w JavaScript, przypisujemy go do istniejącego elementu
    const difficultyFilterContainer = document.getElementById('difficulty-filter');
    const difficultyFilter = createDifficultyFilter(diff => {
      selectedDifficulty = diff;
      filterAndRender();
    });

    searchBarContainer.appendChild(searchBar);
    difficultyFilterContainer.appendChild(difficultyFilter);

    // Początkowe wyświetlenie eliksirów
    renderElixirsList(allElixirs);
  } catch (error) {
    console.error("Error cannot load data: ", error);
  }
});

// Łączne filtrowanie po nazwie i difficulty
function filterAndRender() {
  const filtered = allElixirs.filter(elixir => {
    const nameMatches = elixir.name.toLowerCase().includes(searchTerm);
    const difficulty = elixir.difficulty?.toLowerCase() || 'unknown';
    const difficultyMatches = selectedDifficulty === 'all' || difficulty === selectedDifficulty;

    return nameMatches && difficultyMatches;
  });

  renderElixirsList(filtered);
}
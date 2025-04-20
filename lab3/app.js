import { getElixirs } from './services/api.js';
import { renderElixirsList } from './components/ElixirsList.js';
import { createSearchBar } from './components/SearchBar.js';
import { createDifficultyFilter } from './components/DifficultyFilter.js';

let elixirs = [];
let searchKey = '';
let chosenDifficulty = 'all'; 

document.addEventListener('DOMContentLoaded', async () => {
  try {
    elixirs = await getElixirs();

    document.getElementById('search-bar').appendChild(
        createSearchBar(key => {
            searchKey = key.toLowerCase();
            filterAndRender();
        })
    );
    document.getElementById('difficulty-filter').appendChild(
        createDifficultyFilter(level => {
            chosenDifficulty = level;
            filterAndRender();
        })
    );

    renderElixirsList(elixirs);
  } catch (error) {
    console.error("Error cannot load data: ", error);
    showError(error.message);
  }
});

function filterAndRender() {
    let filtered = elixirs.filter(elixir => {
        let nameMatches = elixir.name.toLowerCase().includes(searchKey);
        let difficulty = elixir.difficulty;
        let difficultyMatches = (chosenDifficulty === 'all' || difficulty === chosenDifficulty);

        return nameMatches && difficultyMatches;
  });

  renderElixirsList(filtered);
}

function showError(message) {
    const container = document.getElementById('elixirs-list');
    container.innerHTML = '';

    const errorBox = document.createElement('div');
    errorBox.textContent = `${message}`;
    errorBox.style.fontWeight = 'bold';
    errorBox.style.fontSize = '60px';
    
    container.appendChild(errorBox);
}
  
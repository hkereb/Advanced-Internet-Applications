import { renderElixirDetails } from './ElixirDetails.js';

export function renderElixirsList(elixirs) {
  const listContainer = document.getElementById('elixirs-list');
  listContainer.innerHTML = '';

  elixirs.forEach(elixir => {
    const newElixir = document.createElement('div');
    newElixir.textContent = `${elixir.name} - ${elixir.difficulty}`;
    newElixir.classList.add('elixir-item');

    newElixir.addEventListener('click', () => {
      renderElixirDetails(elixir);
    });

    listContainer.appendChild(newElixir);
  });
}

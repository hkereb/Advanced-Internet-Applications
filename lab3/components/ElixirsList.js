import { renderElixirDetails } from './ElixirDetails.js';

export function renderElixirsList(elixirs) {
  const listContainer = document.getElementById('elixirs-list');
  listContainer.innerHTML = '';

  elixirs.forEach(elixir => {
    // create a new html to represent an elixir from api
    const newElixir = document.createElement('div');
    newElixir.textContent = `${elixir.name}`;
    newElixir.classList.add('elixir-item');

    newElixir.addEventListener('click', () => {
        // switch item under selected class (for highlight)
        document.querySelectorAll('.elixir-item.selected').forEach(el => {
            el.classList.remove('selected');
        });
        newElixir.classList.add('selected');

        renderElixirDetails(elixir);
    });

    listContainer.appendChild(newElixir);
  });
}

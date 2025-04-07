export function renderElixirsList(elixirs) {
    const listContainer = document.getElementById('elixirs-list');
    listContainer.innerHTML = '';
  
    elixirs.forEach(elixir => {
      const newElixir = document.createElement('div');
      newElixir.textContent = `${elixir.name} - ${elixir.difficulty}`;
      newElixir.addEventListener('click', () => {
        // details later
        console.log(elixir);
      });
      listContainer.appendChild(newElixir);
    });
  }
  
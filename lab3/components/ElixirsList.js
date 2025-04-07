export function renderElixirsList(elixirs) {
    const listContainer = document.getElementById('elixirs-list');
    listContainer.innerHTML = '';
  
    elixirs.forEach(elixir => {
      const el = document.createElement('div');
      el.textContent = `${elixir.name} (${elixir.difficulty})`;
      el.addEventListener('click', () => {
        // details here later
        console.log(elixir);
      });
      listContainer.appendChild(el);
    });
  }
  
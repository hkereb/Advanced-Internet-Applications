export function renderElixirDetails(elixir) {
  const detailsContainer = document.getElementById('elixir-details');
  detailsContainer.innerHTML = ''; // Clear previous details

  const details = document.createElement('div');
  details.classList.add('elixir-details');

  details.innerHTML = `
    <h2>${elixir.name}</h2>
    <p><strong>Effect:</strong> ${elixir.effect || 'Unknown'}</p>
    <p><strong>Side effects:</strong> ${elixir.sideEffects || 'None'}</p>
    <p><strong>Characteristics:</strong> ${elixir.characteristics || 'None'}</p>
    <p><strong>Difficulty:</strong> ${elixir.difficulty || 'Unknown'}</p>
    <p><strong>Ingredients:</strong> ${elixir.ingredients?.map(i => i.name).join(', ') || 'None'}</p>
    <p><strong>Inventors:</strong> ${elixir.inventors?.map(i => i.firstName + ' ' + i.lastName).join(', ') || 'Unknown'}</p>
  `;

  detailsContainer.appendChild(details);
}

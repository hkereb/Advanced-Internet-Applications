export function renderElixirDetails(elixir) {
  // clean previous details
  const detailsContainer = document.getElementById('elixir-details');
  detailsContainer.innerHTML = ''; 

  // create new details
  const details = document.createElement('div');
  details.classList.add('elixir-details');

  details.innerHTML = `
    <h2>${elixir.name}</h2>
    <p><strong>Effect:</strong> ${elixir.effect || 'Unknown'}</p>
    <p><strong>Side effects:</strong> ${elixir.sideEffects || 'Unknown'}</p>
    <p><strong>Characteristics:</strong> ${elixir.characteristics || 'Unknown'}</p>
    <p><strong>Difficulty:</strong> ${elixir.difficulty}</p>
    <p><strong>Ingredients:</strong> ${elixir.ingredients?.map(i => i.name).join(', ') || 'Unknown'}</p>
    <p><strong>Inventors:</strong> ${elixir.inventors?.map(i => i.firstName + ' ' + i.lastName).join(', ') || 'Unknown'}</p>
  `;

  detailsContainer.appendChild(details);
}

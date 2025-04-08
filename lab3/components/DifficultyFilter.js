export function createDifficultyFilter(onChange) {
    const select = document.createElement('select');
    select.classList.add('difficulty-select');
  
    // Definiujemy trudności i odpowiadające im nazwy z przestrzeniami
    const difficulties = [
      { display: 'All', value: 'all' },
      { display: 'Beginner', value: 'beginner' },
      { display: 'Moderate', value: 'moderate' },
      { display: 'Advanced', value: 'advanced' },
      { display: 'Ordinary Wizarding Level', value: 'ordinarywizardinglevel' },
      { display: 'One Of A Kind', value: 'oneofakind' },
      { display: 'Unknown', value: 'unknown' }
    ];
  
    difficulties.forEach(diff => {
      const option = document.createElement('option');
      option.value = diff.value;  // Przesyłamy nazwę bez spacji
      option.textContent = diff.display;  // Wyświetlamy nazwę z spacjami
      select.appendChild(option);
    });
  
    select.addEventListener('change', () => {
      onChange(select.value);
    });
  
    return select;
  }  
export function createDifficultyFilter(onChange) {
    const select = document.createElement('select');
    select.classList.add('difficulty-select');
  
    const difficulties = ['All', 'Beginner', 'Moderate', 'Advanced', 'OrdinaryWizardingLevel', 'OneOfAKind', 'Unknown'];
    difficulties.forEach(diff => {
      const option = document.createElement('option');
      option.value = diff.toLowerCase();
      option.textContent = diff;
      select.appendChild(option);
    });
  
    select.addEventListener('change', () => {
      onChange(select.value);
    });
  
    return select;
  }
  
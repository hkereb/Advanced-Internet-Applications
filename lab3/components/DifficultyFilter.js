export function createDifficultyFilter(onChange) {
    const select = document.createElement('select');
    select.classList.add('difficulty-select');
  
    const difficulties = [
        { display: 'All', value: 'all' },
        { display: 'Beginner', value: 'Beginner' },
        { display: 'Moderate', value: 'Moderate' },
        { display: 'Advanced', value: 'Advanced' },
        { display: 'Ordinary Wizarding Level', value: 'OrdinaryWizardingLevel' },
        { display: 'One Of A Kind', value: 'OneOfAKind' },
        { display: 'Unknown', value: 'Unknown' }
    ];
  
    difficulties.forEach(diff => {
        const option = document.createElement('option');
        option.value = diff.value;
        option.textContent = diff.display; 
        select.appendChild(option);
    });
  
    select.addEventListener('change', () => {
        onChange(select.value);
    });
  
    return select;
  }  
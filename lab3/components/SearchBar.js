export function createSearchBar(onSearch) {
    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search elixirs...';
    input.classList.add('search-input');
  
    input.addEventListener('input', () => {
      const searchTerm = input.value.toLowerCase();
      onSearch(searchTerm);
    });
  
    return input;
  }
  
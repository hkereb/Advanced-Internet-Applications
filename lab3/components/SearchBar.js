export function createSearchBar(onSearch) { // searching func as arg
    const inputBox = document.createElement('input');
    inputBox.type = 'text';
    inputBox.placeholder = 'Search elixirs...';
    inputBox.classList.add('search-input');
  
    inputBox.addEventListener('input', () => {
        const searchKey = inputBox.value.toLowerCase();
        onSearch(searchKey);
    });
  
    return inputBox;
  }
  
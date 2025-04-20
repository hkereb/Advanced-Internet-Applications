import Sort from "./Sort.jsx"

export default function SearchBar({ searchTerm, onSearchChange, sortOrder, onSortChange }) {
    return (
        <div className="search">
            <div className="search-bar">
                <input 
                type="text" 
                placeholder="Search..." 
                className="search-input" 
                value={searchTerm}  
                onChange={onSearchChange}
                />
            </div>
            <div className="sort">
                <Sort 
                    sortOrder={sortOrder} 
                    onSortChange={onSortChange}
                />
            </div>
        </div>
    );
  }
  
import SearchBar from "./SearchBar"

export default function Header({ searchTerm, onSearchChange, sortOrder, onSortChange }) {
    return (
        <header>
            <div className="logo-and-title">
                {/* <img src="images/rock-geo-logo.png" alt="rocks-icon" /> */}
                <h1>rockollection</h1>
            </div>
            <SearchBar 
                searchTerm={searchTerm} 
                onSearchChange={onSearchChange}
                sortOrder={sortOrder}
                onSortChange={onSortChange}
            />
        </header>
    )
}
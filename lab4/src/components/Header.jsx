import SearchBar from "./SearchBar"

export default function Header() {
    return (
        <header>
            <div className="logo-and-title">
                <img src="images/rocks-logo.png" alt="rocks icon" />
                <h1>my rock collection</h1>
            </div>
            <SearchBar />
        </header>
    )
}
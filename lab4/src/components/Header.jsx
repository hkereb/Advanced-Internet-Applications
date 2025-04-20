import rocksLogo from "../images/rocks-logo.png"

export default function Header() {
    return (
        <header>
            <img src={rocksLogo} alt="rocks icon" />
            <h1>my rock collection</h1>
        </header>
    )
}
import EntryOptions from "./EntryOptions";

export default function Entry(props) {
    const stars = "⭐".repeat(props.entry.rating);

    return (
        <article className="collection-entry">
            <div className= "main-image-container">
                <img 
                    className="main-image"
                    src={props.entry.img.src}
                    alt={props.entry.img.alt}
                />
            </div>
            <div className="info-container">
                <h2 className="entry-name">{props.entry.name}</h2>
                <p className="entry-rating"><strong>Rating:</strong> {stars}</p>
                <p className="entry-size"><strong>Size:</strong> {props.entry.size}cm</p>
                <p className="entry-desc">{props.entry.description}</p>
            </div>
            <EntryOptions onDelete={props.onDelete} />
        </article>
    )
}
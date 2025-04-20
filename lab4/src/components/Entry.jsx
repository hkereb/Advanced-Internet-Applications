export default function Entry(props) {
    return (
        <article className="collection-entry">
            <div className="main-image-container">
                <img 
                    className="main-image"
                    src={props.entry.img.src}
                    alt={props.entry.img.alt}
                />
            </div>
            <div className="info-container">
                <h2 className="entry-name">{props.entry.name}</h2>
                <p className="entry-rating">rating: {props.entry.rating}</p>
                <p className="entry-size">size: {props.entry.size}cm</p>
                <p className="entry-desc">{props.entry.description}</p>
            </div>
            <button className="delete-button" onClick={props.onDelete}>
              <img src="images/trash.png" alt="trash-icon" />
            </button>
        </article>
    )
}
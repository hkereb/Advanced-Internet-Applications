import { useState, useRef, useEffect } from "react";

export default function EntryOptions({ onDelete, onRatingChange, currentRating }) {

  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [rating, setRating] = useState(currentRating);
  const menuRef = useRef(null); // to detect outside clicks

  const onClickOutsideMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
      setEditing(false);
    }
  };

  // mousedown reacts right away, click reacts after releasing
  useEffect(() => {
    if (!showMenu) return;
  
    document.addEventListener("mousedown", onClickOutsideMenu);
    return () => {
      document.removeEventListener("mousedown", onClickOutsideMenu);
    };
  }, [showMenu]);

  const onSaveEditForm = () => {
    onRatingChange(rating);
    setEditing(false);
    setShowMenu(false);
  };

  return (
    <div className="options-wrapper" ref={menuRef}>
      <button className="options-button" onClick={() => setShowMenu(prev => !prev)}>
        <img src="images/dots_purple.png" alt="dots-icon" />
      </button>

      {/* show menu options */}
      {showMenu && !editing && (
        <ul className="options-menu">
          <li onClick={() => setEditing(true)}>edit</li>
          <li onClick={() => {
            onDelete();
            setShowMenu(false);
          }}>delete</li>
        </ul>
      )}

      {/* show editing options */}
      {showMenu && editing && (
        <div className="edit-form">
          <input
            type="number"
            min="1"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          />
          <button onClick={onSaveEditForm}>Save</button>
        </div>
      )}
    </div>
  );
}
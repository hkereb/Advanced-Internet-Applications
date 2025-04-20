import { useState, useRef, useEffect } from "react";

export default function EntryOptions({ onDelete, onEdit, currentRating }) {
  const [showMenu, setShowMenu] = useState(false);
  const [editing, setEditing] = useState(false);
  const [newRating, setNewRating] = useState(currentRating);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
      setEditing(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleEditSubmit = () => {
    onEdit(newRating);
    setEditing(false);
    setShowMenu(false);
  };

  return (
    <div className="options-wrapper" ref={menuRef}>
      <button className="options-button" onClick={() => setShowMenu(prev => !prev)}>
        <img src="images/dots_purple.png" alt="dots-icon" />
      </button>

      {showMenu && !editing && (
        <ul className="options-menu">
          <li onClick={() => setEditing(true)}>edit</li>
          <li onClick={() => {
            onDelete();
            setShowMenu(false);
          }}>
            delete
          </li>
        </ul>
      )}

      {showMenu && editing && (
        <div className="edit-form">
          <input
            type="number"
            min="1"
            max="5"
            value={newRating}
            onChange={(e) => setNewRating(Number(e.target.value))}
          />
          <button onClick={handleEditSubmit}>Save</button>
        </div>
      )}
    </div>
  );
}
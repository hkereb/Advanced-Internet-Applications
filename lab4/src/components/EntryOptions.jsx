import { useState, useRef, useEffect } from "react";

export default function EntryOptions({ onDelete }) {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="options-wrapper" ref={menuRef}>
      <button className="options-button" onClick={() => setShowMenu(prev => !prev)}>
        <img src="images/dots_purple.png" alt="dots-icon" />
      </button>

      {showMenu && (
        <ul className="options-menu">
          <li onClick={() => setShowMenu(false)}>edit</li>
          <li onClick={() => {
            onDelete();
            setShowMenu(false);
          }}>
            delete
          </li>
        </ul>
      )}
    </div>
  );
}

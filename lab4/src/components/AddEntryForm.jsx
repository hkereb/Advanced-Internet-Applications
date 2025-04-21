import { useState } from "react";

export default function AddEntryForm({ onAdd, existingEntries }) {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    size: "",
    description: "",
  });

  function handleToggle() {
    setIsOpen(prev => !prev);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const maxKey = Math.max(...existingEntries.map(entry => entry.key));
    const newEntry = {
      key: maxKey + 1,
      name: formData.name,
      rating: parseInt(formData.rating),
      size: formData.size,
      description: formData.description,
      img: {
        src: "images/rocks-logo.png",
        alt: "default picture"
      },
    };

    onAdd(newEntry);
    setFormData({ name: "", rating: "", size: "", description: "" });
    setIsOpen(false);
  }

  return (
    <div className="entry-card add-entry" onClick={handleToggle}>
      {!isOpen ? (
        <div className="plus-image">
            <img src="images/plus_darker.png" alt="plus-icon" />
        </div>
      ) : (
        <form className="new-entry-content" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="rating"
            placeholder="rating (1 to 5)"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="size"
            placeholder="size"
            value={formData.size}
            onChange={handleChange}
          />
          <textarea
            name="description"
            placeholder="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          />
          <button type="submit">Add</button>
        </form>
      )}
    </div>
  );
}

import Header from "./components/Header"
import Entry from "./components/Entry"
import Footer from "./components/Footer"
import AddEntryForm from "./components/AddEntryForm";
import data from "./data.json"
import { useState } from 'react'

export default function App() {

  const [entries, setEntries] = useState(data)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortOrder, setSortOrder] = useState('');

  function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this element?");
    if (confirmed) {
      setEntries(prev => prev.filter(entry => entry.key !== id));
    }
  }

  function handleSearchChange(event) {
    setSearchTerm(event.target.value);
  }

  function handleSortChange(order) {
    setSortOrder(order);
  }  

  function handleAddEntry(newEntry) {
    setEntries(prev => [...prev, newEntry]);
    setSearchTerm('');
  }

  function handleRatingChange(id, newRating) {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.key === id ? { ...entry, rating: newRating } : entry
      )
    );
  }  

  const filteredEntries = entries
  .filter(entry => 
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .sort((a, b) => {
    if (sortOrder === 'asc') return a.rating - b.rating;
    if (sortOrder === 'desc') return b.rating - a.rating;
    return 0; 
  });
  
  const entryElements = filteredEntries.map((entry) => {
    return (
      <Entry
        key={entry.key}
        entry={entry}
        onDelete={() => handleDelete(entry.key)}
        onRatingChange={handleRatingChange}
      />
    )
  });

  entryElements.push(
    <AddEntryForm
      key="add-form"
      onAdd={handleAddEntry}
      existingEntries={entries}
    />
  );

  return (
    <div className="app-wrapper">
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={handleSearchChange} 
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
      />

      <main className="container">
        {entryElements}
      </main>

      <Footer />
    </div>
  )
}
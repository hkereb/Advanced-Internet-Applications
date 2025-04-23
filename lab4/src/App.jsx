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

  function onSearchTermChange(event) {
    setSearchTerm(event.target.value);
  }

  function onSortOrderChange(order) {
    setSortOrder(order);
  }  

  function onEntryAdd(newEntry) {
    setEntries(prev => [...prev, newEntry]);
    setSearchTerm('');
  }

  function onEntryDelete(id) {
    if (window.confirm("Are you sure you want to delete this element?")) {
      setEntries(prev => prev.filter(entry => entry.key !== id));
    }
  }

  function onEntryEdit(id, newRating) {
    setEntries(prevEntries =>
      prevEntries.map(entry =>
        entry.key === id ? { ...entry, rating: newRating } : entry
      )
    );
  }  

  const filteredEntries = entries.filter(entry => 
    entry.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    entry.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  filteredEntries.sort((a, b) => {
    if (sortOrder === 'asc') return a.rating - b.rating;
    if (sortOrder === 'desc') return b.rating - a.rating;
    return 0; 
  });
  
  const entryElements = filteredEntries.map((entry) => {
    return (
      <Entry
        key={entry.key}
        entry={entry}
        onDelete={() => onEntryDelete(entry.key)}
        onRatingChange={onEntryEdit}
      />
    )
  });

  return (
    <div className="app-wrapper">

      <Header 
        searchTerm={searchTerm} 
        onSearchChange={onSearchTermChange} 
        sortOrder={sortOrder}
        onSortChange={onSortOrderChange}
      />

      <main className="container">
        {entryElements}
        <AddEntryForm
          key="add-form"
          onAdd={onEntryAdd}
          existingEntries={entries}
        />
      </main>

      <Footer />

    </div>
  )
}